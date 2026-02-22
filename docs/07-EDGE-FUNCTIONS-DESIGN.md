# PART 7 — Edge Functions Design

> All serverless functions needed for StartupAI
> Supabase Edge Functions (Deno runtime)
> **Architecture decision: Single "fat function" with Hono router** (see EDGE-FUNCTIONS-best-practices.md)

---

## A. Function Architecture

### Decision: Fat Function with Hono Router

All agent endpoints are served by a **single edge function** (`ai-agents`) using a Hono router. This avoids 15+ separate Deno isolates and cold starts.

**URL pattern:** `POST /functions/v1/ai-agents/{route}`

### Route Inventory

#### Core (Ship First)
| Route | Method | Purpose | Auth Required |
|-------|--------|---------|---------------|
| `/chat` | POST | Main chat orchestrator — routes to agents | Yes |
| `/chat/stream` | POST | Streaming chat via SSE | Yes |
| `/dashboard-summary` | POST | Aggregated dashboard data | Yes |
| `/ai-insights` | POST | Context-aware AI insights for right panel | Yes |

#### MVP
| Route | Method | Purpose | Auth Required |
|-------|--------|---------|---------------|
| `/extract-profile` | POST | Extract structured profile from chat text | Yes |
| `/build-canvas` | POST | Generate lean canvas from profile data | Yes |
| `/score-validation` | POST | Score validation topics | Yes |
| `/generate-tasks` | POST | Generate tasks from validation gaps | Yes |

#### Post-MVP
| Route | Method | Purpose | Auth Required |
|-------|--------|---------|---------------|
| `/research-market` | POST | Research market data for a startup | Yes |
| `/analyze-competition` | POST | Analyze competitive landscape | Yes |
| `/simulate-revenue` | POST | Model revenue scenarios | Yes |
| `/analyze-risks` | POST | Assess startup risks | Yes |
| `/vector-search` | POST | Query knowledge base | Yes |
| `/vector-ingest` | POST | Add content to knowledge base | Yes (Admin) |

#### Advanced
| Route | Method | Purpose | Auth Required |
|-------|--------|---------|---------------|
| `/strategic-plan` | POST | Generate strategic roadmap | Yes |
| `/generate-report` | POST | Generate BCG-style detail report | Yes |
| `/export-pdf` | POST | Export reports as PDF | Yes |

---

## B. Shared Utilities

### `import_map.json`
```json
{
  "imports": {
    "@anthropic-ai/sdk": "npm:@anthropic-ai/sdk@0.39.0",
    "hono": "npm:hono@4.7.0",
    "hono/": "npm:hono@4.7.0/",
    "jose": "npm:jose@5.9.0",
    "@supabase/supabase-js": "npm:@supabase/supabase-js@2.49.0"
  }
}
```

### `_shared/cors.ts`
```typescript
export const corsHeaders = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') || '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
};
```
> **Note:** Set `ALLOWED_ORIGIN` to your frontend domain in production. Never ship `*` to production.

### `_shared/auth.ts`
```typescript
import { jwtVerify } from "jose"

export async function verifyAuth(req: Request): Promise<{ userId: string } | null> {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return null

  const token = authHeader.replace('Bearer ', '')

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(Deno.env.get('JWT_SECRET')!)
    )
    return { userId: payload.sub as string }
  } catch {
    return null
  }
}
```
> **Decision:** Local JWT verification via `jose` — no network call needed. `JWT_SECRET` is auto-injected by Supabase.

### `_shared/claude-client.ts`
```typescript
import Anthropic from "@anthropic-ai/sdk"

// Module-level initialization (runs once on cold start, reused across requests)
export const anthropic = new Anthropic({
  apiKey: Deno.env.get("ANTHROPIC_API_KEY")
})

export const CLAUDE_MODEL = "claude-sonnet-4-20250514"
export const DEFAULT_MAX_TOKENS = 2048
export const REPORT_MAX_TOKENS = 4096

export async function callClaude(params: {
  system: string;
  messages: Array<{ role: string; content: string }>;
  max_tokens?: number;
}) {
  const response = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: params.max_tokens || DEFAULT_MAX_TOKENS,
    system: params.system,
    messages: params.messages,
  })

  return response
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

### `_shared/error-handler.ts`
```typescript
import { corsHeaders } from "./cors.ts"

export interface ErrorResponse {
  success: false
  error: string
  code: string
  details?: unknown
}

export function handleError(error: unknown): Response {
  console.error('[Edge Function Error]', error)
  const message = error instanceof Error ? error.message : 'Unknown error'
  const body: ErrorResponse = {
    success: false,
    error: message,
    code: 'INTERNAL_ERROR',
  }
  return new Response(JSON.stringify(body), {
    status: 500,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
```

---

## C. Core Function Details

### 1. `/chat` — Chat Orchestrator

The most important route. Routes messages to the right agent.

```typescript
// POST /functions/v1/ai-agents/chat
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

### 2. `/dashboard-summary`

```typescript
// POST /functions/v1/ai-agents/dashboard-summary
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

### 3. `/ai-insights`

```typescript
// POST /functions/v1/ai-agents/ai-insights
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

### `/extract-profile`
```typescript
// Input: { messages: ChatMessage[], existing_profile?: StartupProfile }
// Output: { extracted_fields: Partial<StartupProfile>, confidence: Record<string, number>, follow_up_questions: string[] }

// System prompt includes:
// - Field definitions and expected formats
// - Extraction rules (don't infer, ask)
// - Confidence scoring criteria
// - Follow-up question generation
```

### `/build-canvas`
```typescript
// Input: { profile: StartupProfile, existing_canvas?: LeanCanvas }
// Output: { blocks: Array<{ block_type: string, content: string, confidence: 'low'|'medium'|'high', needs_validation: boolean }> }

// System prompt includes:
// - Lean Canvas best practices (from vector DB)
// - Industry-specific examples
// - Content quality rubric
```

### `/score-validation`
```typescript
// Input: { canvas: LeanCanvas, profile: StartupProfile, chat_history?: ChatMessage[], topic?: string }
// Output: { scores: Array<{ topic: string, composite: number, sub_scores: Record<string, number>, verdict: string, evidence: string[], gap_analysis: { ambition: number, evidence: number } }> }

// System prompt includes:
// - Scoring rubrics (from vector DB)
// - Sub-score definitions per topic
// - Evidence strength classification
// - Benchmark data
```

### `/generate-tasks`
```typescript
// Input: { scores: ValidationScore[], existing_tasks: Task[], startup_stage: string }
// Output: { tasks: Array<{ title: string, description: string, topic: string, expected_impact: number, effort: 'low'|'medium'|'high', experiment_type: string }> }
```

### `report-generate` (route: `/generate-report`)
```typescript
// Input: { topic: string, score: ValidationScore, canvas: LeanCanvas, profile: StartupProfile }
// Output: { success: true, data: { tension_headline: string, flow_diagram: FlowDiagramData, score_breakdown: ScoreBreakdown, analysis: string, evidence_assessment: EvidenceSection, gap_analysis: GapData, benchmarks: BenchmarkData, actions: ActionItem[], related_topics: string[] } }
// Note: Uses REPORT_MAX_TOKENS (4096) — detail reports need more output than standard 2048
```

---

## E. Fat Function Entry Point

The single `ai-agents/index.ts` uses Hono for routing and middleware:

```typescript
import { Hono } from "hono"
import { cors } from "hono/cors"
import { verifyAuth } from "../_shared/auth.ts"

const app = new Hono().basePath("/ai-agents")

// Global middleware
app.use("*", cors())
app.use("*", async (c, next) => {
  if (c.req.method === 'OPTIONS') return next()
  const auth = await verifyAuth(c.req.raw)
  if (!auth) return c.json({ success: false, error: 'Unauthorized', code: 'AUTH_ERROR' }, 401)
  c.set('userId', auth.userId)
  await next()
})

// Standardized response envelope
// All routes return: { success: boolean, data?: T, error?: string, metadata?: object }

// Core routes
app.post("/chat", handleChat)
app.post("/chat/stream", handleChatStream)
app.post("/dashboard-summary", handleDashboardSummary)
app.post("/ai-insights", handleAIInsights)

// MVP routes
app.post("/extract-profile", handleProfileExtraction)
app.post("/build-canvas", handleCanvasBuild)
app.post("/score-validation", handleValidationScoring)
app.post("/generate-tasks", handleTaskGeneration)

// Post-MVP routes
app.post("/research-market", handleMarketResearch)
app.post("/analyze-competition", handleCompetitionAnalysis)
app.post("/simulate-revenue", handleRevenueSimulation)
app.post("/analyze-risks", handleRiskAnalysis)

// Advanced routes
app.post("/strategic-plan", handleStrategicPlanning)
app.post("/generate-report", handleReportGeneration)
app.post("/export-pdf", handleExportPDF)

// Health check (for keep-warm)
app.get("/health", (c) => c.json({ status: "ok" }))

// Error handler
app.onError((err, c) => {
  console.error('[Edge Function Error]', err)
  return c.json({ success: false, error: err.message, code: 'INTERNAL_ERROR' }, 500)
})

Deno.serve(app.fetch)
```

### Standardized Response Envelope

All routes return this shape:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;       // Error code for client-side handling
  metadata?: {
    agent?: string;    // Which agent handled this
    tokens_used?: number;
    duration_ms?: number;
  };
}
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

All routes are part of the single `ai-agents` fat function. Phases indicate when each route handler and shared utility is implemented.

```
Phase 1 (Core):
  import_map.json
  _shared/cors.ts
  _shared/auth.ts
  _shared/claude-client.ts
  _shared/error-handler.ts
  _shared/embeddings.ts          ← Needed by Phase 2+ agents
  ai-agents/index.ts             ← Hono router with Core routes
    routes: /chat, /chat/stream, /dashboard-summary, /ai-insights

Phase 2 (MVP):
  ai-agents/index.ts             ← Add MVP routes
    routes: /extract-profile, /build-canvas, /score-validation, /generate-tasks

Phase 3 (Post-MVP):
  ai-agents/index.ts             ← Add Post-MVP routes
    routes: /research-market, /analyze-competition, /simulate-revenue,
            /analyze-risks, /vector-search, /vector-ingest

Phase 4 (Advanced):
  ai-agents/index.ts             ← Add Advanced routes
    routes: /strategic-plan, /generate-report, /export-pdf
```

### Heavy Agent Pattern

For agents exceeding 30s (market-research, strategic-plan), use `EdgeRuntime.waitUntil()` with the `agent_jobs` table (see Doc 08):
1. Insert `agent_jobs` row (status: `pending`)
2. Return `{ jobId, status: 'queued' }` immediately
3. Process in background via `EdgeRuntime.waitUntil()`
4. Frontend subscribes to `agent_jobs` changes via Supabase Realtime
