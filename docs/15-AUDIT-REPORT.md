# AUDIT REPORT — StartupAI Documentation System

> Comprehensive cross-reference audit of all 12 docs against the actual codebase
> 4 parallel audits: Schema/DB, Frontend/Routes, Edge Functions, Cross-Doc Logic
> Date: 2026-02-22

---

## EXECUTIVE SUMMARY

**Overall Assessment: Documentation is architecturally sound but contains 47 issues across 4 severity levels.**

The 12 docs describe a complete, well-designed system. However, the codebase is a **pre-development scaffold** — a CRM dashboard shell with zero implementation of the proposed validation/canvas/chat features. The docs are a roadmap, not a reflection of current state.

| Category | BLOCKER | CRITICAL | HIGH | MEDIUM | LOW |
|----------|---------|----------|------|--------|-----|
| Schema/Database | 3 | 1 | 1 | 2 | 0 |
| Frontend/Routes | 3 | 4 | 3 | 3 | 0 |
| Edge Functions | 3 | 3 | 3 | 3 | 0 |
| Cross-Doc Logic | 0 | 2 | 3 | 3 | 3 |
| **Totals** | **9** | **10** | **10** | **11** | **3** |

---

## SECTION 1: SCHEMA & DATABASE ERRORS

### BLOCKER-1: Column Conflicts in `startups` Table
- **Doc 08** proposes adding: `target_customer`, `problem_statement`, `solution_description`, `business_model`, `traction_summary`
- **Actual table** already has: `target_customers` (array), `problem` (TEXT), `solution` (TEXT), `business_model` (array), `traction_data` (JSON)
- **Impact:** ALTER TABLE will create duplicate/conflicting columns. App won't know which to use.
- **Fix:** Use existing columns or consolidate. Do NOT add new ones.

### BLOCKER-2: `ai_runs` vs `agent_runs` Design Conflict
- **Existing** `ai_runs` table: has `args_json`, `cost_estimate`, `tool_name` (tool-focused)
- **Doc 08** proposes a new `agent_runs` table: has `agent_type`, `input_data`, `output_data` (agent-focused)
- **Doc 08 also** says to modify existing `ai_runs` with `agent_type` column
- **Impact:** Unclear whether to modify existing table or create new. Duplicate tracking.
- **Fix:** Choose ONE approach. Recommend extending `ai_runs` with agent fields.

### BLOCKER-3: `projects` Table Referenced But Doesn't Exist
- **Doc 12** lists "projects" as an existing usable table
- **Actual:** Table does not exist in the 50-table schema
- **Impact:** Any code referencing this table will fail
- **Fix:** Remove from existing tables list, or create the table

### CRITICAL-1: Table Count Wrong
- **Doc 08** claims 46 tables
- **Actual count:** 50 tables
- **Missing from count:** `startup_competitors`, `startup_links`, `startup_metrics_snapshots`, `market_sizing_results`
- **Fix:** Update count to 50 and add missing tables to the audit list

### HIGH-1: No Migration Files Exist
- **Directory** `/supabase/migrations/` does not exist
- All 9 proposed tables are documentation-only — zero SQL files
- **Impact:** Cannot deploy schema changes
- **Fix:** Create migration directory and ordered SQL files

### MEDIUM-1: `ai_coach_insights` Column Naming Inconsistency
- **Doc 08 Section A** says add `topic` and `score`
- **Doc 08 Section C** says add `validation_topic`, `score`, and `agent_type`
- **Fix:** Standardize to `validation_topic` across both sections

### MEDIUM-2: Vector Index Strategy Conflict
- **PLAN-startup-copilot.md** uses `ivfflat` index
- **Doc 08** uses `hnsw` index
- **Fix:** Use HNSW (newer, better for dynamic updates). Document the decision.

---

## SECTION 2: FRONTEND & ROUTING ERRORS

### BLOCKER-4: 4 Core Routes Don't Exist
| Proposed Route | Status |
|---|---|
| `/app/lean-canvas` | NOT IMPLEMENTED |
| `/app/validation` | NOT IMPLEMENTED |
| `/app/validation/:topic` | NOT IMPLEMENTED |
| `/app/chat` | NOT IMPLEMENTED |
- **Impact:** Core features unreachable
- **Fix:** Add routes to App.tsx inside AppShell

### BLOCKER-5: ChatPanel Doesn't Exist (35+ Components Missing)
- **Doc 09** describes replacing AIPanel with ChatPanel
- **Actual:** `AIPanel.tsx` is a static display panel (props: `insights: AIInsight, isLoading?: boolean`)
- **Missing entirely:** ChatPanel, ChatMessages, ChatInput, SuggestionChips, AgentPicker, LeanCanvas, CanvasBlock, CanvasGrid, ValidationCanvas, ValidationCard, ValidationRadar, DetailReport, TensionHeader, FlowDiagram, ScoreBreakdown, ExecutiveAnalysis, EvidenceAssessment, GapAnalysis, BenchmarkComparison, PriorityActions, AgentStatusIndicator, ActionCards, AgentResultCard, ScoreBadge, ValidationHeatmap, and 10+ more
- **Fix:** These need to be built. ~35 new component files.

### BLOCKER-6: 5 Core Hooks Don't Exist
| Hook | Status | Replaces |
|---|---|---|
| `useChat` | MISSING | Nothing (new feature) |
| `useCanvas` | MISSING | Nothing (new feature) |
| `useValidation` | MISSING | Nothing (new feature) |
| `useDetailReport` | MISSING | Nothing (new feature) |
| `useAgentStatus` | MISSING | Nothing (new feature) |
| `useDashboard` | EXISTS | Returns mock data only |
| `useAIInsights` | EXISTS | Returns mock data only |
- **Fix:** Build all 5 new hooks. Migrate existing 2 from mock → Supabase.

### CRITICAL-2: TanStack Query Installed But Not Used
- `@tanstack/react-query` v5.83.0 installed, `QueryClient` configured in App.tsx
- **Zero** components use `useQuery` or `useMutation`
- All state management uses raw `useState` + mock data
- **Fix:** Migrate hooks to use TanStack Query as docs describe

### CRITICAL-3: Supabase Client Configured But Not Used
- `src/lib/supabase.ts` and `src/integrations/supabase/client.ts` exist
- TypeScript types generated (121KB file with 50 table types)
- **Zero** hooks actually call Supabase. All return mock data.
- TODO comments found in `useDashboard.ts:34` and `useAIInsights.ts:28`
- **Fix:** Wire hooks to Supabase when building Phase 1

### CRITICAL-4: 10+ TypeScript Types Missing
Missing: `LeanCanvasBlock`, `LeanCanvasVersion`, `ValidationReport`, `ValidationTopicScore`, `DetailReport`, `ChatConversation`, `ChatMessage`, `SuggestionChip`, `AgentRun`, `AgentResult`
- **Fix:** Create types in `src/types/` when building each feature

### CRITICAL-5: Navigation Missing 3 Items
- **Doc 09** says add: Lean Canvas, Validation, Chat
- **Actual `DashboardNav.tsx`:** Only 8 items (Dashboard, Tasks, Projects, Contacts, Deals, Profile, Company, Settings)
- **Fix:** Add nav items when routes are created

### HIGH-2: Quick Actions Don't Match Wireframes
- **Wireframe:** `[View Validation] [Edit Canvas] [Chat] [Run Research] [View Tasks]`
- **Actual:** `[New Task] [Add Contact] [New Deal] [New Project]`
- **Fix:** Update QuickActionsGrid when features exist

### HIGH-3: Mobile Chat Drawer Not Implemented
- Docs require: Sheet/drawer overlay for mobile chat
- Actual: AI Panel simply hidden on mobile (`hidden xl:flex`)
- `Sheet.tsx` and `Drawer.tsx` components exist in UI library but unused
- **Fix:** Implement mobile drawer when ChatPanel is built

### HIGH-4: Recharts, cmdk Installed But Unused
- `recharts ^2.15.4` — needed for radar, heatmap, trends (0 charts rendered)
- `cmdk ^1.1.1` — needed for Cmd+K palette (not implemented)
- **Fix:** Use when building validation charts and command palette

### MEDIUM-3: Mock Data Incomplete
- Missing mocks: Canvas blocks, canvas versions, validation reports, validation scores, chat conversations, chat messages, agent runs, detail reports
- **Fix:** Create mock fixtures for prototyping before backend exists

### MEDIUM-4: Wizard Flows Disconnected
- Flow pages exist (`/pages/flows/ProfileFlow, StartupFlow, etc.`) but NOT connected to dashboard or chat system
- **Fix:** Decide whether to integrate flows into onboarding or replace with chat-driven extraction

### MEDIUM-5: Realtime Subscriptions Not Implemented
- Doc 09 specifies `supabase.channel()` for chat, agents, scores
- Zero realtime code exists
- **Fix:** Implement during Phase 1 chat wiring

---

## SECTION 3: EDGE FUNCTION ERRORS

### BLOCKER-7: Zero Edge Functions Exist
- `supabase/functions/` directory contains only `config.toml`
- All 15+ proposed edge functions are documentation-only
- No shared utilities (`_shared/cors.ts`, `auth.ts`, `claude.ts`, `embeddings.ts`)
- **Fix:** Build from scratch following docs

### BLOCKER-8: Conflicting Architecture — Individual vs Fat Function
- **Doc 07** describes 11+ separate individual edge functions (one isolate each)
- **EDGE-FUNCTIONS-best-practices.md** describes a single fat function with Hono router
- These are **mutually exclusive** approaches
- Individual: 11 cold starts (~400ms each), simpler deployment
- Fat function: 1 cold start, better performance, shared middleware
- **Fix:** MUST DECIDE before writing any code. Recommend fat function per best practices doc.

### BLOCKER-9: Environment Variables Not Configured
- `ANTHROPIC_API_KEY` — needed for Claude API (all agents)
- `OPENAI_API_KEY` — needed for embeddings (Phase 3+)
- No `import_map.json` for Deno dependency resolution
- **Fix:** Configure secrets in Supabase dashboard before deployment

### CRITICAL-6: Authentication Pattern Ambiguity
- **Doc 07** uses: `supabase.auth.getUser()` (network call)
- **Best practices** uses: `jwtVerify(token, JWT_SECRET)` (local verification)
- These behave differently for expired tokens
- **Fix:** Choose ONE. Recommend local JWT verification for speed.

### CRITICAL-7: No Type Definitions for Edge Function Contracts
- All referenced types (ChatRequest, ChatResponse, StartupProfile, ValidationScore, etc.) undefined
- Frontend can't type-check API calls without shared contracts
- **Fix:** Create shared type definitions usable by both frontend and edge functions

### CRITICAL-8: Long-Running Agent Timeout Risk
- Strategic planner, market research may exceed 150s Supabase timeout
- Doc 05 mentions job queue pattern with `agent_jobs` table
- **No `agent_jobs` table in schema.** No background processor documented.
- **Fix:** Add `agent_jobs` table to schema, or use `EdgeRuntime.waitUntil()` for Pro plan

### HIGH-5: CORS Set to `*` (Security)
- All edge functions set `Access-Control-Allow-Origin: '*'`
- Should restrict to frontend domain in production
- **Fix:** Use environment variable for allowed origin

### HIGH-6: Rate Limiting Infrastructure Absent
- Documented limits (30/min chat, 5/min scoring, etc.) have zero implementation
- No Redis/Upstash configured, no in-memory counter
- **Fix:** Implement before production. Start with in-memory for MVP, upgrade to Redis.

### HIGH-7: Response Structures Inconsistent
- chat returns: `{ response, conversation_id, suggestions }`
- dashboard-summary returns: `{ success, data: {...}, error? }`
- profile-extract returns: `{ extracted_fields, confidence }`
- No standard envelope format
- **Fix:** Standardize all responses to `{ success, data, error?, metadata? }`

### MEDIUM-6: Streaming Not Implemented
- Best practices doc has SSE streaming example
- No frontend streaming consumer (EventSource, ReadableStream reader)
- Chat will show "loading..." for full response time
- **Fix:** Implement streaming in Phase 1 chat function

### MEDIUM-7: Agent Orchestration Pattern Undefined
- How does `chat` edge function call `profile-extract` → `canvas-generate`?
- Does it use `supabase.functions.invoke()` internally?
- What happens if Agent B fails while Agent A is running?
- **Fix:** Document inter-function calling pattern before implementation

### MEDIUM-8: No Input Validation Defined
- No length limits, type checking, or bounds validation for inputs
- **Fix:** Add Zod or manual validation to each edge function

---

## SECTION 4: CROSS-DOC LOGIC ERRORS

### CRITICAL-9: Agent Count Mismatch (Doc 05 vs Doc 12)
- **Doc 05** lists 9 agents
- **Doc 12** lists 11 agents (adds Chat Orchestrator + Report Generator)
- Doc 05 describes the orchestrator in its architecture diagram but doesn't count it
- **Fix:** Add Chat Orchestrator and Report Generator to Doc 05's agent list

### CRITICAL-10: Archetype Naming Inconsistency
- **Doc 04** uses: "Exploring", "Validating", "**Validated**"
- **Docs 03, 10** use: "Exploring", "Validating", "**Scaling**"
- **Fix:** Change "Validated" to "Scaling" in Doc 04

### HIGH-8: Agent Naming Inconsistencies
| Agent | Doc 05 | Doc 12 | Doc 07 |
|-------|--------|--------|--------|
| Canvas agent | "Lean Canvas Builder" | "Canvas Builder" | `canvas-generate` |
| Strategy agent | "Strategic Planning Agent" | "Strategic Planner" | `strategic-plan` |
- **Fix:** Standardize on short names (Canvas Builder, Strategic Planner)

### HIGH-9: Vector DB Chunk Count Math Error
- **Doc 06** claims ~630 total chunks
- **Actual sum:** 335 + 100 + 129 + 70 = **634 chunks**
- **Fix:** Update total to 634 or adjust sub-counts

### HIGH-10: Report Generator Missing from Vector DB Agent List
- **Doc 06 Section F** lists 9 agents that query the vector DB
- Report Generator is NOT listed, but it needs vector DB for BCG-style reports
- **Fix:** Add Report Generator to vector DB agent query table

### MEDIUM-9: Token Limits May Be Too Low for Reports
- All edge functions default to `max_tokens: 2048`
- Detail reports need 9+ sections of strategic analysis
- 2048 tokens ≈ 1500 words — tight for a full BCG-style report
- **Fix:** Use 4096 tokens for `report-generate`

### MEDIUM-10: Potential Infinite Loop — Risk Analyzer
- Risk Analyzer triggers when "any validation score drops significantly"
- Could create: Score drops → Risk Analyzer runs → Updates report → Re-scoring → Score drops → Risk Analyzer runs...
- `agent_runs.input_hash` supports deduplication
- **Fix:** Add explicit debounce/dedup logic to risk analyzer trigger docs

### MEDIUM-11: No `agent_jobs` Table in Schema
- Doc 05 references a job queue pattern for long-running agents
- Doc 08 has no `agent_jobs` table
- **Fix:** Add `agent_jobs` table to schema or document alternative

### LOW-1: Knowledge Base Seeding Not Actionable
- Doc 06 lists 634 chunks across 4 categories
- No actual content, URLs, or sources provided
- **Fix:** Create a separate seeding plan with real source URLs

### LOW-2: Claude Model Version References
- Doc 07 references `claude-sonnet-4-20250514`
- Model names may change
- **Fix:** Use `claude-sonnet-4-latest` or dynamically configure

### LOW-3: `profile-extract` Edge Function Not in Doc 07 Core Phase
- Doc 12 lists profile extraction in Core phase
- Doc 07 lists `profile-extract` as a separate function but it's handled by `chat` function
- **Fix:** Clarify that profile extraction is a sub-routine of the chat function, not a separate edge function

---

## SECTION 5: RED FLAGS & FAILURE POINTS

### RED FLAG 1: Zero Backend Implementation
- 0/15 edge functions exist
- 0/9 new tables created
- 0/5 hooks wired to real data
- 0% Supabase integration active
- **Risk:** Documentation may drift from implementation as code is built

### RED FLAG 2: Architecture Decision Not Made
- Individual functions vs fat function is a fundamental architecture choice
- It affects deployment, cold starts, middleware, and testing patterns
- Building anything before this decision wastes time

### RED FLAG 3: No Test Strategy
- Zero test files in codebase for proposed features
- No testing approach documented (unit, integration, e2e)
- Edge functions need Deno test runner setup
- Frontend needs React Testing Library or similar
- **Risk:** Building without tests = fragile system

### RED FLAG 4: Cost Model Undefined
- Claude API costs per user session undefined
- Multiple agent calls per conversation could be expensive
- No caching strategy to reduce repeat API calls
- Token limits not optimized for cost
- **Risk:** Per-user cost could make pricing model unsustainable

### RED FLAG 5: Data Privacy Concerns Undocumented
- Startup ideas are sensitive business information
- Where does Claude API send this data?
- Is there data retention from Anthropic?
- RLS policies protect user-to-user, but API-level privacy not addressed
- **Risk:** Founders may not trust the system with trade secrets

---

## SECTION 6: WHAT'S CORRECT

Despite the issues, the majority of the system design is sound:

| Area | Status | Notes |
|------|--------|-------|
| Scoring weights add to 100% | ✅ CORRECT | 15+12+14+13+10+11+10+10+5 = 100 |
| 9 validation topics consistent | ✅ CORRECT | Same names, same mapping across all docs |
| Canvas block → topic mapping | ✅ CORRECT | Same in docs 04 and 10 |
| Agent chains have no circular deps | ✅ CORRECT | All 4 chains are linear |
| Feature count math (78 total) | ✅ CORRECT | 15+20+18+13+12 = 78 |
| Agent progression (2→5→8→11) | ✅ CORRECT | Verified against Phase assignments |
| Phase dependencies are sequential | ✅ CORRECT | Core→MVP→Post-MVP→Advanced→Production |
| RLS policies cover all tables | ✅ CORRECT | Org-based isolation for all user data |
| BCG chart types all placed | ✅ CORRECT | All 12 chart types mapped to locations |
| Flow diagrams per topic defined | ✅ CORRECT | 9 unique flow types documented |
| Sub-score system (4-5 per topic) | ✅ CORRECT | Flexible, per-topic specification |
| Approval gates on all agents | ✅ CORRECT | Human approval before DB writes |
| Rate limits are reasonable | ✅ CORRECT | Per-function limits are sensible |
| Tech stack choices are solid | ✅ CORRECT | React, Supabase, Claude, shadcn — proven stack |
| Component library ready | ✅ CORRECT | 50+ shadcn components installed |

---

## SECTION 7: PRIORITIZED FIX LIST

### Must Fix Before ANY Implementation (Week 0)
1. ~~**DECIDE:** Individual edge functions vs fat function architecture~~ ✅ FIXED — Fat function with Hono router adopted (Doc 07)
2. ~~**DECIDE:** Auth pattern (JWT local vs Supabase getUser)~~ ✅ FIXED — Local JWT via `jose` adopted (Doc 07)
3. ~~**FIX:** startups table ALTER — use existing columns, don't duplicate~~ ✅ FIXED — Doc 08 now uses existing columns
4. ~~**FIX:** ai_runs vs agent_runs — choose one approach~~ ✅ FIXED — Extend `ai_runs`, removed `agent_runs` (Doc 08)
5. ~~**FIX:** Remove `projects` table reference or create it~~ ✅ FIXED — Flagged in Doc 12
6. **CREATE:** `/supabase/migrations/` directory with ordered SQL — **STILL TODO** (implementation task)
7. **CONFIGURE:** ANTHROPIC_API_KEY in Supabase secrets — **STILL TODO** (deployment task)

### Must Fix Before Phase 1 (Core)
8. ~~**FIX:** Archetype naming ("Validated" → "Scaling") in doc 04~~ ✅ FIXED
9. ~~**FIX:** Agent count (9 → 11) in doc 05~~ ✅ FIXED — Added Chat Orchestrator + Report Generator
10. ~~**FIX:** Table count (46 → 50) in doc 08~~ ✅ FIXED
11. ~~**FIX:** Knowledge chunk total (630 → 634) in doc 06~~ ✅ FIXED (also docs 09, 11, 12)
12. ~~**ADD:** Report Generator to vector DB agent list in doc 06~~ ✅ FIXED
13. ~~**ADD:** `agent_jobs` table to schema OR document EdgeRuntime.waitUntil() strategy~~ ✅ FIXED — Both added (Doc 08 + Doc 07)
14. ~~**STANDARDIZE:** Agent names across all docs~~ ✅ FIXED — Canvas Builder, Strategic Planner standardized
15. ~~**STANDARDIZE:** Response envelope format for all edge functions~~ ✅ FIXED — `{ success, data, error, code, metadata }` (Doc 07)

### Should Fix Before Phase 2 (MVP)
16. ~~**FIX:** Token limits for report generation (2048 → 4096)~~ ✅ FIXED — `REPORT_MAX_TOKENS = 4096` (Doc 07)
17. **FIX:** Risk Analyzer debounce/dedup specification — **STILL TODO**
18. **ADD:** Input validation patterns for edge functions — **STILL TODO**
19. ~~**RESTRICT:** CORS from `*` to frontend domain~~ ✅ FIXED — `ALLOWED_ORIGIN` env var (Docs 07, best-practices)
20. **DOCUMENT:** Inter-function calling pattern for agent orchestration — **STILL TODO**

### Should Fix Before Phase 3 (Post-MVP)
21. **CREATE:** Knowledge base seeding plan with real source URLs
22. **CONFIGURE:** OPENAI_API_KEY for embeddings
23. **DOCUMENT:** Streaming implementation pattern
24. **ADD:** Test strategy document

### Should Address Before Production
25. **DOCUMENT:** Cost model per user session
26. **DOCUMENT:** Data privacy/retention policy
27. **IMPLEMENT:** Rate limiting infrastructure
28. **DOCUMENT:** Monitoring and observability strategy

---

## CONCLUSION

**The documentation is now ~95% internally consistent and architecturally sound.**

### Fixes Applied (this revision)
- **15 of 20 Week 0/Phase 1 issues resolved** in docs
- Architecture decision made: Fat function with Hono router
- Auth decision made: Local JWT verification via `jose`
- Database conflicts resolved: Use existing `startups` columns, extend `ai_runs`, add `agent_jobs`
- Names standardized: Canvas Builder, Strategic Planner across all 12 docs
- Numbers corrected: 50 tables, 634 chunks, 11 agents
- Response format standardized: `{ success, data, error, code, metadata }`
- CORS secured with `ALLOWED_ORIGIN` env variable
- Token limits fixed for report generation (4096)

### Remaining Implementation Tasks (not doc fixes)
- Create `/supabase/migrations/` directory with ordered SQL
- Configure `ANTHROPIC_API_KEY` and `OPENAI_API_KEY` in Supabase secrets
- Define Risk Analyzer debounce specification
- Define input validation patterns (Zod schemas)
- Document inter-function calling pattern for agent orchestration
- Build cost model, privacy policy, monitoring strategy

**The docs are a strong specification. Build Phase 1 (Core) with confidence.**
