# PART 7 — Edge Functions Design

> All serverless functions needed for StartupAI
> Supabase Edge Functions (Deno runtime)

---

## A. Function Inventory

### Core (Ship First)
| Function | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `chat` | POST | Main chat orchestrator — routes to agents | Yes |
| `dashboard-summary` | GET | Aggregated dashboard data | Yes |
| `ai-insights` | POST | Context-aware AI insights for right panel | Yes |

### MVP
| Function | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `profile-extract` | POST | Extract structured profile from chat text | Yes |
| `canvas-generate` | POST | Generate lean canvas from profile data | Yes |
| `validation-score` | POST | Score validation topics | Yes |
| `task-generate` | POST | Generate tasks from validation gaps | Yes |

### Post-MVP
| Function | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `market-research` | POST | Research market data for a startup | Yes |
| `competition-analyze` | POST | Analyze competitive landscape | Yes |
| `revenue-simulate` | POST | Model revenue scenarios | Yes |
| `risk-analyze` | POST | Assess startup risks | Yes |
| `vector-search` | POST | Query knowledge base | Yes |
| `vector-ingest` | POST | Add content to knowledge base | Yes (Admin) |

### Advanced
| Function | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `strategic-plan` | POST | Generate strategic roadmap | Yes |
| `report-generate` | POST | Generate BCG-style detail report | Yes |
| `export-pdf` | POST | Export reports as PDF | Yes |

---

## B. Shared Utilities

### `_shared/cors.ts`
```typescript
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
```

### `_shared/auth.ts`
```typescript
import { createClient } from '@supabase/supabase-js';

export async function getAuthUser(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) throw new Error('Missing authorization header');

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('Unauthorized');

  return { user, supabase };
}
```

### `_shared/claude.ts`
```typescript
export async function callClaude(params: {
  system: string;
  messages: Array<{ role: string; content: string }>;
  max_tokens?: number;
}) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': Deno.env.get('ANTHROPIC_API_KEY')!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: params.max_tokens || 2048,
      system: params.system,
      messages: params.messages,
    }),
  });

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`);
  }

  return await response.json();
}
```

### `_shared/embeddings.ts`
```typescript
export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text,
    }),
  });

  const data = await response.json();
  return data.data[0].embedding;
}
```

---

## C. Core Function Details

### 1. `chat/index.ts` — Chat Orchestrator

The most important function. Routes messages to the right agent.

```typescript
// POST /functions/v1/chat
// Input:
{
  message: string;           // User's chat message
  conversation_id?: string;  // Existing conversation (null = new)
  context?: {                // Current page context
    page: string;            // 'dashboard' | 'canvas' | 'validation' | etc.
    entity_id?: string;      // ID of entity being viewed
    entity_type?: string;    // 'task' | 'deal' | 'contact' | etc.
  };
}

// Output:
{
  response: string;          // AI response text
  conversation_id: string;
  suggestions: Array<{       // Clickable next actions
    label: string;
    action: string;          // 'ask' | 'run_agent' | 'update_canvas' | 'create_task'
    payload?: any;
  }>;
  agent_results?: {          // If an agent was triggered
    agent: string;
    status: 'completed' | 'running' | 'failed';
    data?: any;
  };
  proposed_actions?: Array<{ // Actions needing approval
    type: string;
    description: string;
    payload: any;
  }>;
}
```

**Intent Detection Logic:**
```
Message → Classify intent:
  - "general_chat" → Respond directly with startup knowledge
  - "profile_update" → Route to Profile Extractor
  - "canvas_question" → Route to Canvas Builder
  - "market_question" → Route to Market Research
  - "competitor_question" → Route to Competition Analyzer
  - "revenue_question" → Route to Revenue Simulator
  - "risk_question" → Route to Risk Analyzer
  - "planning_question" → Route to Strategic Planner
  - "task_request" → Route to Task Generator
  - "score_request" → Route to Validation Scorer
```

### 2. `dashboard-summary/index.ts`

```typescript
// GET /functions/v1/dashboard-summary
// Output:
{
  kpis: {
    overall_validation_score: number;
    canvas_completeness: number;
    tasks_completed: number;
    tasks_total: number;
    days_since_last_validation: number;
  };
  top_priorities: Array<{
    id: string;
    title: string;
    type: 'task' | 'validation_gap' | 'risk';
    urgency: 'low' | 'medium' | 'high' | 'critical';
  }>;
  risks: Array<{
    id: string;
    title: string;
    severity: 'low' | 'medium' | 'high';
    topic: string;
  }>;
  recent_activity: Array<{
    type: string;
    description: string;
    timestamp: string;
  }>;
  validation_summary: {
    scores: Record<string, number>;  // topic → score
    trends: Record<string, number>;  // topic → change since last
    archetype: string;
  };
}
```

### 3. `ai-insights/index.ts`

```typescript
// POST /functions/v1/ai-insights
// Input:
{
  context_type: 'dashboard' | 'canvas' | 'validation' | 'detail_report';
  context_data?: any;  // Current page state
}

// Output:
{
  summary: string;                    // 2-3 sentence executive summary
  next_steps: Array<{
    action: string;
    action_type: 'navigate' | 'run_agent' | 'create_task' | 'edit_canvas';
    priority: 'low' | 'medium' | 'high';
    target?: string;                  // Route or entity ID
  }>;
  risks: Array<{
    title: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
  }>;
  suggestions: Array<{               // Chat suggestion chips
    label: string;
    prompt: string;                   // Pre-filled chat message
  }>;
}
```

---

## D. Agent Function Details

### `profile-extract/index.ts`
```typescript
// Input: { messages: ChatMessage[], existing_profile?: StartupProfile }
// Output: { extracted_fields: Partial<StartupProfile>, confidence: Record<string, number>, follow_up_questions: string[] }

// System prompt includes:
// - Field definitions and expected formats
// - Extraction rules (don't infer, ask)
// - Confidence scoring criteria
// - Follow-up question generation
```

### `canvas-generate/index.ts`
```typescript
// Input: { profile: StartupProfile, existing_canvas?: LeanCanvas }
// Output: { blocks: Array<{ block_type: string, content: string, confidence: 'low'|'medium'|'high', needs_validation: boolean }> }

// System prompt includes:
// - Lean Canvas best practices (from vector DB)
// - Industry-specific examples
// - Content quality rubric
```

### `validation-score/index.ts`
```typescript
// Input: { canvas: LeanCanvas, profile: StartupProfile, chat_history?: ChatMessage[], topic?: string }
// Output: { scores: Array<{ topic: string, composite: number, sub_scores: Record<string, number>, verdict: string, evidence: string[], gap_analysis: { ambition: number, evidence: number } }> }

// System prompt includes:
// - Scoring rubrics (from vector DB)
// - Sub-score definitions per topic
// - Evidence strength classification
// - Benchmark data
```

### `task-generate/index.ts`
```typescript
// Input: { scores: ValidationScore[], existing_tasks: Task[], startup_stage: string }
// Output: { tasks: Array<{ title: string, description: string, topic: string, expected_impact: number, effort: 'low'|'medium'|'high', experiment_type: string }> }
```

### `report-generate/index.ts`
```typescript
// Input: { topic: string, score: ValidationScore, canvas: LeanCanvas, profile: StartupProfile }
// Output: { tension_headline: string, flow_diagram: FlowDiagramData, score_breakdown: ScoreBreakdown, analysis: string, evidence_assessment: EvidenceSection, gap_analysis: GapData, benchmarks: BenchmarkData, actions: ActionItem[], related_topics: string[] }
```

---

## E. Middleware Pattern

Every edge function follows this pattern:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { getAuthUser } from '../_shared/auth.ts';

serve(async (req: Request) => {
  // 1. CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 2. Auth
    const { user, supabase } = await getAuthUser(req);

    // 3. Rate limit check
    // (implemented via Supabase table or KV)

    // 4. Parse input
    const body = await req.json();

    // 5. Business logic
    const result = await handleRequest(body, user, supabase);

    // 6. Return response
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: error.status || 500,
    });
  }
});
```

---

## F. Rate Limiting Strategy

| Function | Limit | Window | Reason |
|----------|-------|--------|--------|
| `chat` | 30 requests | per minute | Conversational pace |
| `dashboard-summary` | 10 requests | per minute | Page load caching |
| `ai-insights` | 10 requests | per minute | Context changes |
| `profile-extract` | 5 requests | per minute | Heavy processing |
| `canvas-generate` | 3 requests | per minute | Expensive generation |
| `validation-score` | 5 requests | per minute | Scoring computation |
| `market-research` | 2 requests | per minute | External API calls |
| `report-generate` | 2 requests | per minute | Long-form generation |
| `strategic-plan` | 1 request | per 5 minutes | Most expensive |

---

## G. Environment Variables Required

```bash
# Supabase (auto-injected in edge functions)
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI APIs
ANTHROPIC_API_KEY=           # Claude for all agent logic
OPENAI_API_KEY=              # text-embedding-3-small for vector search

# Optional
SERPER_API_KEY=              # Web search for market research agent
TAVILY_API_KEY=              # Alternative web search
```

---

## H. Deployment Order

```
Phase 1 (Core):
  _shared/cors.ts
  _shared/auth.ts
  _shared/claude.ts
  chat/index.ts
  dashboard-summary/index.ts
  ai-insights/index.ts

Phase 2 (MVP):
  profile-extract/index.ts
  canvas-generate/index.ts
  validation-score/index.ts
  task-generate/index.ts

Phase 3 (Post-MVP):
  _shared/embeddings.ts
  vector-search/index.ts
  vector-ingest/index.ts
  market-research/index.ts
  competition-analyze/index.ts

Phase 4 (Advanced):
  revenue-simulate/index.ts
  risk-analyze/index.ts
  strategic-plan/index.ts
  report-generate/index.ts
  export-pdf/index.ts
```
