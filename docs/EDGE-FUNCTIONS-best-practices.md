# Supabase Edge Functions — Best Practices & Architecture Guide

## Key Findings vs Our Current Plan

Our plan in `PLAN-startup-copilot.md` proposed individual edge functions per agent. Based on current best practices, here are the improvements we should make.

---

## Improvement 1: Use "Fat Functions" with Hono Router

Supabase recommends **few large functions** instead of many small ones. Each function spins up an isolate — fewer functions = fewer cold starts.

**Instead of:**
```
supabase/functions/
  agents/profile-extractor/index.ts
  agents/lean-canvas-builder/index.ts
  agents/validation-scorer/index.ts
  agents/task-generator/index.ts
  agents/report-generator/index.ts
  agents/market-research/index.ts
  agents/competition-analyzer/index.ts
  agents/revenue-model-sim/index.ts
  agents/risk-analyzer/index.ts
  agents/strategic-planner/index.ts
  chat/index.ts
```

**Do this:**
```
supabase/functions/
  ai-agents/index.ts          # Single fat function with Hono router
  _shared/
    cors.ts                    # CORS headers
    supabase-admin.ts          # Service role client
    claude-client.ts           # Anthropic SDK setup
    embeddings.ts              # Vector embedding helper
    vector-search.ts           # pgvector similarity search
    auth.ts                    # JWT verification helper
    error-handler.ts           # Centralized error handling
  agents/                      # Agent logic (imported by ai-agents/index.ts)
    profile-extractor.ts
    lean-canvas-builder.ts
    validation-scorer.ts
    task-generator.ts
    report-generator.ts
    market-research.ts
    competition-analyzer.ts
    revenue-model-sim.ts
    risk-analyzer.ts
    strategic-planner.ts
```

**The fat function routes:**
```ts
import { Hono } from "npm:hono"

const app = new Hono().basePath("/ai-agents")

// Chat orchestrator
app.post("/chat", handleChat)

// Individual agent endpoints
app.post("/extract-profile", handleProfileExtraction)
app.post("/build-canvas", handleCanvasBuild)
app.post("/score-validation", handleValidationScoring)
app.post("/generate-tasks", handleTaskGeneration)
app.post("/generate-report", handleReportGeneration)

// Phase 2 agents
app.post("/research-market", handleMarketResearch)
app.post("/analyze-competition", handleCompetitionAnalysis)
app.post("/simulate-revenue", handleRevenueSimulation)
app.post("/analyze-risks", handleRiskAnalysis)

// Phase 3
app.post("/strategic-plan", handleStrategicPlanning)

// Streaming endpoint for chat
app.post("/chat/stream", handleChatStream)

Deno.serve(app.fetch)
```

**Why**: One cold start (~400ms) instead of 10. Hot requests are ~125ms.

---

## Improvement 2: Use `Deno.serve` (Not Legacy `serve` Import)

**Bad (deprecated):**
```ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
serve(async (req) => { ... })
```

**Good (modern):**
```ts
Deno.serve(async (req) => { ... })
```

---

## Improvement 3: Proper Claude API Streaming

For the chat panel, use Server-Sent Events with the Anthropic SDK:

```ts
import Anthropic from "npm:@anthropic-ai/sdk"
import { corsHeaders } from "../_shared/cors.ts"

async function handleChatStream(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { messages, startupContext } = await req.json()
  const client = new Anthropic({ apiKey: Deno.env.get("ANTHROPIC_API_KEY") })

  // Use low-level stream: true (more reliable than .stream() in edge environments)
  const stream = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    stream: true,
    system: buildSystemPrompt(startupContext),
    messages,
  })

  const body = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
          )
        }
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      controller.close()
    },
  })

  return new Response(body, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
```

**Important**: Use `stream: true` (low-level) instead of `client.messages.stream()` (high-level) — the low-level approach is more reliable in Deno edge environments and avoids "Unexpected end of JSON input" errors.

**Alternative for long-running agents**: Instead of streaming directly, write results to a DB table and have the frontend subscribe via Supabase Realtime. This decouples the LLM call from the user connection and avoids timeout issues.

---

## Improvement 4: Background Job Queue for Heavy Agents

For agents that take >30 seconds (market research, strategic planning), use a table-based job queue instead of synchronous invocation:

```sql
CREATE TABLE agent_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_id UUID REFERENCES startups(id),
  user_id UUID REFERENCES auth.users(id),
  agent_type TEXT NOT NULL,        -- 'market_research', 'strategic_planner', etc.
  input_payload JSONB NOT NULL,
  output_payload JSONB,
  status TEXT DEFAULT 'pending',   -- pending, processing, completed, failed
  error_message TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable realtime for frontend subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE agent_jobs;
```

**Flow:**
1. User triggers agent → insert `agent_jobs` row (status: `pending`)
2. Edge function picks up pending job → sets `processing` → runs Claude call → sets `completed`
3. Frontend subscribes to `agent_jobs` changes via Supabase Realtime
4. Chat panel shows progress in real-time

**Trigger via pg_cron or direct invocation:**
```ts
// In the edge function, for heavy agents:
app.post("/run-heavy-agent", async (c) => {
  const { startupId, agentType, payload } = await c.req.json()

  // Insert job
  const { data: job } = await supabase
    .from('agent_jobs')
    .insert({ startup_id: startupId, agent_type: agentType, input_payload: payload })
    .select()
    .single()

  // Process in background (doesn't block response)
  EdgeRuntime.waitUntil(processAgentJob(job.id))

  return c.json({ jobId: job.id, status: 'queued' })
})
```

**`EdgeRuntime.waitUntil()`**: Runs a promise in the background after the response is sent. Up to 400 seconds on Pro plan.

---

## Improvement 5: Proper Auth Pattern

Verify JWT in every request and extract user ID:

```ts
// _shared/auth.ts
import { jwtVerify } from "npm:jose"

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

**Use as Hono middleware:**
```ts
import { verifyAuth } from "../_shared/auth.ts"

app.use("*", async (c, next) => {
  if (c.req.method === 'OPTIONS') return next()

  const auth = await verifyAuth(c.req.raw)
  if (!auth) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  c.set('userId', auth.userId)
  await next()
})
```

---

## Improvement 6: CORS — Shared Module

```ts
// _shared/cors.ts
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
}
```

**Critical**: Include CORS headers in ALL responses (success AND error). Handle OPTIONS preflight as the first check in every function.

With Hono, use the built-in CORS middleware:
```ts
import { cors } from "npm:hono/cors"
app.use("*", cors())
```

---

## Improvement 7: Centralized Error Handling

```ts
// _shared/error-handler.ts
export interface ErrorResponse {
  error: string
  code: string
  details?: unknown
}

export function handleError(error: unknown): Response {
  console.error('[Edge Function Error]', error)

  const message = error instanceof Error ? error.message : 'Unknown error'
  const body: ErrorResponse = {
    error: message,
    code: 'INTERNAL_ERROR',
  }

  return new Response(JSON.stringify(body), {
    status: 500,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
```

**With Hono:**
```ts
app.onError((err, c) => {
  console.error('[Edge Function Error]', err)
  return c.json({ error: err.message, code: 'INTERNAL_ERROR' }, 500)
})
```

---

## Improvement 8: Environment Variables

**Pre-populated (no setup needed):**
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_DB_URL`
- `JWT_SECRET`

**We need to set:**
```bash
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
```

**Local dev:**
```bash
# Create supabase/.env.local
ANTHROPIC_API_KEY=sk-ant-...

# Serve with env file
supabase functions serve --env-file ./supabase/.env.local
```

---

## Improvement 9: Performance Optimizations

1. **Module-level initialization** — create clients once, not per request:
```ts
// TOP LEVEL (runs once on cold start)
import Anthropic from "npm:@anthropic-ai/sdk"
const anthropic = new Anthropic({ apiKey: Deno.env.get("ANTHROPIC_API_KEY") })

// HANDLER (runs per request, reuses client)
async function handleChat(c: Context) {
  const response = await anthropic.messages.create({ ... })
}
```

2. **Minimize dependencies** — use Web APIs (`fetch`, `crypto`, `WebSocket`) instead of npm packages

3. **Pin all import versions**: `npm:@anthropic-ai/sdk@0.39.0` not `npm:@anthropic-ai/sdk`

4. **Use import map** for shared versions:
```json
// supabase/functions/import_map.json
{
  "imports": {
    "@anthropic-ai/sdk": "npm:@anthropic-ai/sdk@0.39.0",
    "hono": "npm:hono@4.7.0",
    "hono/": "npm:hono@4.7.0/",
    "jose": "npm:jose@5.9.0"
  }
}
```

5. **Keep-warm with pg_cron** (optional):
```sql
SELECT cron.schedule(
  'keep-warm-ai-agents',
  '*/5 * * * *',  -- every 5 minutes
  $$SELECT net.http_post(
    url := 'https://ouverjherohazwadfgud.supabase.co/functions/v1/ai-agents/health',
    headers := '{"Authorization": "Bearer ' || current_setting('app.settings.service_role_key') || '"}'::jsonb
  )$$
);
```

---

## Improvement 10: Testing

```ts
// supabase/functions/tests/agents.test.ts
import { assertEquals } from "jsr:@std/assert"

const BASE_URL = Deno.env.get('SUPABASE_URL') + '/functions/v1/ai-agents'
const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')

Deno.test("profile extraction returns structured data", async () => {
  const res = await fetch(`${BASE_URL}/extract-profile`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: "I'm building an AI operating system for startup founders"
    }),
  })

  assertEquals(res.status, 200)
  const data = await res.json()
  assertEquals(typeof data.problem, 'string')
  assertEquals(typeof data.solution, 'string')
  assertEquals(typeof data.target_customers, 'object')
})
```

Run with:
```bash
deno test --allow-all supabase/functions/tests/
```

---

## Improvement 11: Rate Limiting for AI Calls

AI API calls are expensive. Implement per-user rate limiting:

```ts
// Simple in-memory rate limiter (resets on cold start — fine for edge)
const rateLimits = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(userId: string, maxPerMinute: number = 10): boolean {
  const now = Date.now()
  const limit = rateLimits.get(userId)

  if (!limit || now > limit.resetAt) {
    rateLimits.set(userId, { count: 1, resetAt: now + 60_000 })
    return true
  }

  if (limit.count >= maxPerMinute) return false
  limit.count++
  return true
}
```

For production, use Upstash Redis for persistent rate limiting across isolates.

---

## Revised Edge Function Architecture

```
supabase/
  functions/
    import_map.json
    _shared/
      cors.ts
      auth.ts
      supabase-admin.ts
      claude-client.ts
      embeddings.ts
      vector-search.ts
      error-handler.ts
    ai-agents/
      index.ts                  # Hono router — single fat function
      routes/
        chat.ts                 # POST /chat, POST /chat/stream
        canvas.ts               # POST /build-canvas
        validation.ts           # POST /score-validation
        reports.ts              # POST /generate-report
        tasks.ts                # POST /generate-tasks
        research.ts             # POST /research-market, /analyze-competition
        planning.ts             # POST /strategic-plan
      agents/
        profile-extractor.ts    # Agent logic (pure functions)
        lean-canvas-builder.ts
        validation-scorer.ts
        task-generator.ts
        report-generator.ts
        market-research.ts
        competition-analyzer.ts
        revenue-model-sim.ts
        risk-analyzer.ts
        strategic-planner.ts
      prompts/
        system-prompts.ts       # All Claude system prompts
        extraction-prompts.ts
        scoring-prompts.ts
    tests/
      chat.test.ts
      canvas.test.ts
      validation.test.ts
```

**Key timeouts to respect:**
- CPU time: 200ms (soft limit per request)
- Request idle timeout: 150 seconds
- Background tasks (Pro): 400 seconds via `EdgeRuntime.waitUntil()`
- For agents exceeding 150s → use job queue pattern

---

## Client-Side Invocation Pattern

```ts
// src/hooks/useAgentRunner.ts
import { supabase } from '@/lib/supabase'

export function useAgentRunner() {
  const runAgent = async (route: string, payload: unknown) => {
    const { data, error } = await supabase.functions.invoke('ai-agents', {
      body: { route, ...payload },
    })

    if (error) {
      // error is FunctionsHttpError | FunctionsRelayError | FunctionsFetchError
      throw error
    }
    return data
  }

  const streamChat = async (
    messages: Array<{ role: string; content: string }>,
    onChunk: (text: string) => void,
  ) => {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-agents/chat/stream`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      }
    )

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    while (reader) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n').filter(l => l.startsWith('data: '))

      for (const line of lines) {
        const data = line.slice(6)
        if (data === '[DONE]') return
        const parsed = JSON.parse(data)
        onChunk(parsed.text)
      }
    }
  }

  return { runAgent, streamChat }
}
```

---

## Summary of Improvements Over Original Plan

| Original Plan | Improved Approach | Benefit |
|--------------|-------------------|---------|
| 10+ separate edge functions | 1 fat function with Hono router | 10x fewer cold starts |
| No streaming | SSE streaming for chat | Real-time AI responses |
| Synchronous agent calls | Job queue + `EdgeRuntime.waitUntil()` for heavy agents | No timeouts, better UX |
| No auth in functions | JWT verification middleware | Secure by default |
| No error handling pattern | Centralized error handler + Hono `onError` | Consistent error responses |
| No rate limiting | Per-user rate limiting | Cost control |
| Legacy `serve` import | `Deno.serve` + Hono | Modern, maintainable |
| Separate shared utils | `_shared/` directory + import map | DRY, version-pinned |
| No testing plan | Deno test runner + integration tests | Reliable deployments |
| Direct fetch to Claude | Anthropic SDK with module-level client | Cleaner code, connection reuse |
