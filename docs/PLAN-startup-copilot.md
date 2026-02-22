# Startup Copilot Platform — Implementation Plan

## Current State Assessment

### What Exists Today

| Layer | Status | Details |
|-------|--------|---------|
| **Frontend Framework** | Done | Vite + React 18 + TypeScript + Tailwind + shadcn-ui (70+ components) |
| **Routing** | Done | react-router-dom v6, marketing + `/app/*` dashboard routes |
| **3-Panel Layout** | Done | `AppShell.tsx` — Left nav, center content, right AI panel |
| **Dashboard UI** | Done | KPIs, Priorities, Risks, Quick Actions — all mock data |
| **AI Panel** | Stub | `AIPanel.tsx` shows static mock insights, no chat, no agents |
| **State Management** | Stub | `AppContext` with mock user, React Query configured but unused |
| **Supabase Client** | Done | Client configured, auto-generated types (3900+ lines) |
| **Database Schema** | Not deployed | Types exist but no migrations, no RLS, no edge functions |
| **Auth** | Stub | `AuthGuard.tsx` exists, mock user auto-loaded |
| **AI Integration** | None | No LLM calls, no agents, no vector DB |
| **Flow Pages** | Placeholder | `/flows/startup`, `/flows/profile`, etc. all show "Coming Soon" |
| **Chat** | None | No chat interface anywhere |
| **Lean Canvas** | None | No canvas component or data model |
| **Validation Canvas** | None | No scoring engine or validation UI |
| **Detail Reports** | None | No report pages |

### Existing Supabase Tables (typed, not deployed)

Key tables in `types.ts`: `startups`, `tasks`, `ai_coach_insights`, `ai_runs`, `proposed_actions`, `market_sizing_results`, `startup_competitors`, `startup_metrics_snapshots`, `wizard_sessions`, `decks`, `slides`, `crm_deals`, `crm_contacts`, `investors`, and ~30 more.

The `startups` table already has: `problem`, `solution`, `unique_value`, `target_customers`, `business_model`, `pricing_model`, `industry`, `stage`, `traction_data`, `needs_data`, `deep_research_report`.

---

## Target Product Flow

```
HOME (marketing)
  |
  v
CHAT (user describes startup idea)
  |
  v
AI LEAN CANVAS (structured extraction)
  |
  v
VALIDATION CANVAS (9 scored categories)
  |
  v
DETAIL REPORTS (click any category → deep strategic report)
  |
  v
RIGHT AI PANEL (continuous copilot — suggests, user approves, system updates)
  |
  v
DASHBOARD (execution tracking — tasks, KPIs, risks update automatically)
```

**Key principle**: AI proposes → User approves → System executes. Never auto-write silently.

---

## Architecture Overview

### UI Layout (inside `/app`)

```
+-------------------+-----------------------------------+-------------------+
|                   |                                   |                   |
|  Left Nav         |  Center Content                   |  Right AI Panel   |
|                   |                                   |                   |
|  - Dashboard      |  (varies by route)                |  Chat input       |
|  - Lean Canvas    |  • Dashboard KPIs                 |  Agent status     |
|  - Validation     |  • Lean Canvas blocks             |  Suggestions      |
|  - Reports        |  • Validation scorecards          |  "Apply Fix"      |
|  - Tasks          |  • Detail reports                 |  "Run Research"   |
|  - Projects       |  • Task lists                     |  Score changes    |
|  - Contacts       |  • Deals pipeline                 |  History          |
|  - Deals          |                                   |                   |
|                   |                                   |                   |
+-------------------+-----------------------------------+-------------------+
```

### Agent Architecture

```
                    ┌─────────────────────┐
                    │   Chat Orchestrator  │  ← User talks here
                    │   (right panel)      │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
     Phase 1 Agents    Phase 2 Agents    Phase 3 Agent
              │                │                │
    ┌─────────┴──────┐  ┌─────┴──────┐  ┌──────┴──────┐
    │ProfileExtractor│  │MarketResearch│  │Strategic    │
    │LeanCanvasBuilder│ │Competition  │  │Planning     │
    │ValidationScorer│  │RevenueModel │  │Agent        │
    │TaskGenerator   │  │RiskAnalyzer │  │(premium)    │
    └────────────────┘  └────────────┘  └─────────────┘
              │                │                │
              └────────────────┼────────────────┘
                               │
                    ┌──────────┴──────────┐
                    │   Vector Knowledge   │
                    │   Base (Supabase     │
                    │   pgvector)          │
                    └─────────────────────┘
```

### AI Provider Split

| Provider | Role | Why |
|----------|------|-----|
| **Claude (Anthropic)** | Strategic reasoning — canvas generation, validation scoring, report writing, planning agent | Best at structured analysis, long-form strategic reasoning, following complex instructions |
| **Supabase pgvector** | Vector knowledge base — startup best practices, benchmarks, case studies | Already in stack, no extra infra, pg_embedding extension |
| **Supabase Edge Functions** | Agent orchestration — runs server-side, calls Claude API, reads/writes DB | Keeps API keys server-side, co-located with data |

---

## Implementation Phases

### Phase A: Data Foundation (extend existing schema)

**Goal**: Lean Canvas and Validation data models in Supabase.

**New tables / extensions:**

```sql
-- 1. Lean Canvas (extends startups table with structured fields)
CREATE TABLE lean_canvas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  version INT DEFAULT 1,
  -- 9 Lean Canvas blocks
  problem TEXT,
  ai_solution TEXT,
  unique_ai_advantage TEXT,
  customer_segments JSONB,        -- { primary: "", secondary: "" }
  revenue_model JSONB,            -- { type: "", pricing: "", assumptions: [] }
  cost_structure JSONB,           -- { fixed: [], variable: [], burn_rate: 0 }
  distribution_channels JSONB,    -- [{ channel: "", strategy: "" }]
  key_metrics JSONB,              -- [{ name: "", target: "", current: "" }]
  data_strategy TEXT,
  -- Metadata
  ai_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Validation Scores
CREATE TABLE validation_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
  lean_canvas_id UUID REFERENCES lean_canvas(id),
  category TEXT NOT NULL,         -- problem, customer, market, competition, revenue, ai_strategy, execution, validation_proof, risk
  score INT CHECK (score BETWEEN 0 AND 100),
  confidence TEXT,                -- low, medium, high
  reasoning TEXT,
  strengths JSONB,                -- [{ point: "", evidence: "" }]
  weaknesses JSONB,               -- [{ point: "", suggestion: "" }]
  experiments JSONB,              -- [{ name: "", hypothesis: "", method: "" }]
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Chat Messages (for right panel)
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  role TEXT NOT NULL,             -- user, assistant, system
  content TEXT NOT NULL,
  metadata JSONB,                 -- { agent: "", action_type: "", context_page: "" }
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Proposed Actions (AI suggests, user approves)
-- Already exists in schema: proposed_actions table
-- Fields: action_type, payload, status (pending/approved/rejected/executed)

-- 5. Detail Reports
CREATE TABLE detail_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
  validation_score_id UUID REFERENCES validation_scores(id),
  category TEXT NOT NULL,
  headline TEXT,
  executive_summary TEXT,
  flow_diagram JSONB,             -- Mermaid or structured data
  composite_score INT,
  risks JSONB,
  experiments JSONB,
  full_report JSONB,              -- Structured report sections
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Knowledge Base (vector embeddings)
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,          -- best_practice, benchmark, case_study, framework, regulation, growth_loop
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB,
  embedding vector(1536),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX ON knowledge_base USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
```

**Files to create:**
- `supabase/migrations/001_lean_canvas.sql`
- `supabase/migrations/002_validation_scores.sql`
- `supabase/migrations/003_chat_messages.sql`
- `supabase/migrations/004_detail_reports.sql`
- `supabase/migrations/005_knowledge_base.sql`

**Files to update:**
- `src/types/dashboard.ts` → add `LeanCanvas`, `ValidationScore`, `ChatMessage`, `DetailReport`, `KnowledgeEntry` types
- Regenerate `src/integrations/supabase/types.ts` after migration

---

### Phase B: Chat + Profile Extraction (Entry Point)

**Goal**: User describes idea in chat → AI extracts structured startup profile.

**New components:**

| File | Purpose |
|------|---------|
| `src/components/chat/ChatPanel.tsx` | Replaces current `AIPanel.tsx` — full chat interface with message list, input, agent status indicator |
| `src/components/chat/ChatMessage.tsx` | Individual message bubble (user/assistant/system) |
| `src/components/chat/ChatInput.tsx` | Text input with send button, slash commands hint |
| `src/components/chat/AgentStatus.tsx` | Shows which agent is running + progress |
| `src/components/chat/SuggestionCard.tsx` | Clickable suggestion the AI proposes (approve/reject) |
| `src/components/chat/ActionApproval.tsx` | "Apply this change?" card with preview + approve/reject buttons |

**New hooks:**

| File | Purpose |
|------|---------|
| `src/hooks/useChat.ts` | Send messages, receive responses, manage chat state |
| `src/hooks/useAgentRunner.ts` | Call Supabase edge functions that run agents |

**New edge function:**

| Function | Purpose |
|----------|---------|
| `supabase/functions/chat/index.ts` | Receives message → routes to correct agent → streams response back |
| `supabase/functions/agents/profile-extractor.ts` | Takes raw text → extracts Problem, ICP, AI component, Revenue, Distribution → returns structured JSON |

**Flow:**
1. User lands on `/app/dashboard` or new `/app/canvas` route
2. Right panel shows chat with prompt: "Describe your startup idea"
3. User types description
4. `ProfileExtractor` agent runs server-side (Claude API call)
5. Returns structured startup profile
6. Chat shows: "I've extracted your startup profile. Here's what I found: [summary]. Ready to generate your Lean Canvas?"
7. User approves → next phase

**Modifications to existing files:**
- `src/components/dashboard/AppShell.tsx` → swap `AIPanel` for `ChatPanel`
- `src/contexts/AppContext.tsx` → add `currentStartupId`, `leanCanvas` state
- `src/components/dashboard/DashboardNav.tsx` → add Lean Canvas + Validation nav items

---

### Phase C: AI Lean Canvas

**Goal**: Generate and display editable Lean Canvas from extracted profile.

**New components:**

| File | Purpose |
|------|---------|
| `src/pages/app/LeanCanvas.tsx` | Main canvas page — 9 editable blocks in grid layout |
| `src/components/canvas/CanvasBlock.tsx` | Single editable block (title, content, AI suggestions indicator) |
| `src/components/canvas/CanvasGrid.tsx` | Responsive grid layout for 9 blocks |
| `src/components/canvas/CanvasBlockEditor.tsx` | Inline editing with auto-save |

**Layout (9-block grid, similar to Lean Canvas):**

```
+------------------+------------------+------------------+
|   Problem        |   AI Solution    |   Unique AI      |
|                  |                  |   Advantage      |
+------------------+------------------+------------------+
|   Customer       |   Revenue        |   Cost           |
|   Segments       |   Model          |   Structure      |
+------------------+------------------+------------------+
|   Distribution   |   Key Metrics    |   Data           |
|   Channels       |                  |   Strategy       |
+------------------+------------------+------------------+
```

**New edge function:**

| Function | Purpose |
|----------|---------|
| `supabase/functions/agents/lean-canvas-builder.ts` | Takes startup profile → generates all 9 canvas blocks → saves to `lean_canvas` table |

**Chat integration:**
- Right panel shows context: "Viewing Lean Canvas"
- AI can suggest: "Your ICP is broad. Would you like to narrow to pre-seed B2B founders?"
- User clicks suggestion → `proposed_actions` row created → user approves → canvas block updates
- No page reload — React state update via context or React Query invalidation

**New route:**
- `/app/canvas` → `LeanCanvas.tsx`

---

### Phase D: Validation Canvas (Scoring Engine)

**Goal**: Score the startup across 9 categories, show as interactive scorecard grid.

**New components:**

| File | Purpose |
|------|---------|
| `src/pages/app/ValidationCanvas.tsx` | 3x3 grid of score cards |
| `src/components/validation/ScoreCard.tsx` | Single category card — score circle, label, confidence badge, click to open detail |
| `src/components/validation/ScoreCircle.tsx` | Animated circular progress (0-100) with color coding |
| `src/components/validation/OverallViability.tsx` | Composite "Strategic Viability Index" at top |

**9 categories scored:**

| # | Category | What it evaluates |
|---|----------|-------------------|
| 1 | Problem | Is the problem real, urgent, frequent? |
| 2 | Customer | Is ICP defined, reachable, willing to pay? |
| 3 | Market | TAM/SAM/SOM, growth rate, timing? |
| 4 | Competition | Differentiation, moat, switching costs? |
| 5 | Revenue | Model clarity, LTV/CAC, pricing power? |
| 6 | AI Strategy | Is AI core or feature? Data advantage? |
| 7 | Execution | Team strength, speed, milestone track? |
| 8 | Validation Proof | Customer interviews, LOIs, pilots, revenue? |
| 9 | Risk | Regulatory, technical, market, team risks? |

**New edge function:**

| Function | Purpose |
|----------|---------|
| `supabase/functions/agents/validation-scorer.ts` | Takes lean canvas → scores each of 9 categories → saves to `validation_scores` table |

**Score color coding:**
- 0-39: Red (critical gaps)
- 40-59: Amber (needs work)
- 60-79: Green (solid)
- 80-100: Blue (strong)

**Chat integration:**
- Right panel shows: "Revenue confidence is 42. Main gap: no pricing validation. Would you like me to suggest 3 pricing experiments?"
- Clicking a score card navigates to detail report

**New route:**
- `/app/validation` → `ValidationCanvas.tsx`

---

### Phase E: Detail Reports

**Goal**: BCG-style strategic deep-dive for each validation category.

**New components:**

| File | Purpose |
|------|---------|
| `src/pages/app/ValidationDetail.tsx` | Full report page for one category |
| `src/components/reports/ReportHeader.tsx` | Category name, composite score, headline |
| `src/components/reports/ExecutiveSummary.tsx` | 2-3 paragraph strategic summary |
| `src/components/reports/StrengthsWeaknesses.tsx` | Two-column strengths vs gaps |
| `src/components/reports/RiskMatrix.tsx` | Risk items with severity |
| `src/components/reports/ExperimentsList.tsx` | Suggested validation experiments with status tracking |
| `src/components/reports/FlowDiagram.tsx` | Visual strategy diagram (optional, Phase 2+) |

**New edge function:**

| Function | Purpose |
|----------|---------|
| `supabase/functions/agents/report-generator.ts` | Takes validation score + lean canvas context → generates full strategic report → saves to `detail_reports` |

**Chat integration (right panel on detail page):**
- "This revenue model has 3 key risks. Would you like me to: (A) Suggest pricing experiments, (B) Run competitive pricing research, (C) Generate an investor-ready revenue narrative?"
- "Apply Fix" button → creates `proposed_action` → user approves → updates canvas + rescores

**New route:**
- `/app/validation/:category` → `ValidationDetail.tsx`

---

### Phase F: Chat Panel as Copilot (Full Integration)

**Goal**: Transform right panel into a true "Startup Strategy Copilot."

**Capabilities:**

| Action | How it works |
|--------|-------------|
| Modify Lean Canvas | Chat suggests change → `ActionApproval` card → approve → PATCH canvas block → re-render |
| Update validation scores | After canvas change → auto-trigger `ValidationScorer` → scores update → dashboard reflects |
| Run research | User says "research my competitors" → `MarketResearchAgent` runs → results shown in chat → offer to update Competition score |
| Generate reports | User clicks "Generate Report" on any validation category → `ReportGenerator` runs → report page populated |
| Create experiments | `TaskGenerator` turns gaps into actionable tasks → shown as checklist in chat → approve → tasks appear in Tasks page |
| Recalculate scores | Any canvas/report change triggers score recalculation → dashboard KPIs update |

**Proposed action flow (critical pattern):**

```
1. Agent generates suggestion
2. Chat shows ActionApproval card:
   ┌─────────────────────────────────┐
   │ 💡 Suggested Change             │
   │                                 │
   │ Update Customer Segment to:     │
   │ "Pre-seed B2B SaaS founders"    │
   │                                 │
   │ [Preview Change]                │
   │                                 │
   │ [✓ Approve]  [✗ Reject]        │
   └─────────────────────────────────┘
3. User clicks Approve
4. System writes to DB
5. Canvas re-renders
6. Validation rescored
7. Chat shows: "Revenue confidence increased from 66 → 74."
```

**New edge functions (Phase 2 agents):**

| Function | Purpose |
|----------|---------|
| `supabase/functions/agents/market-research.ts` | Searches web + vector DB for market data |
| `supabase/functions/agents/competition-analyzer.ts` | Compares startup against known competitors |
| `supabase/functions/agents/revenue-model-simulator.ts` | LTV/CAC projections, pricing model analysis |
| `supabase/functions/agents/risk-analyzer.ts` | Identifies systemic threats across all categories |
| `supabase/functions/agents/task-generator.ts` | Turns validation gaps into actionable sprint tasks |

---

### Phase G: Vector Knowledge Base

**Goal**: Ground AI suggestions in real startup best practices.

**Knowledge base contents:**

| Category | Examples |
|----------|---------|
| `best_practice` | "SaaS pricing should start with value metric identification" |
| `benchmark` | "Median seed-stage B2B SaaS CAC is $150-300" |
| `case_study` | "How Notion went from $0 to $10B: product-led growth..." |
| `framework` | "Jobs-to-be-Done framework for ICP definition..." |
| `regulation` | "AI Act (EU) classification requirements for B2B SaaS..." |
| `growth_loop` | "Content-led growth: SEO → free tool → email capture → upgrade..." |
| `gtm_strategy` | "Bottom-up SaaS: developer adoption → team plan → enterprise..." |

**How agents use it:**

```
User: "How should I price this?"

1. Chat sends to edge function
2. Agent embeds the question
3. Queries knowledge_base with vector similarity
4. Retrieves top 5 relevant entries
5. Claude generates response grounded in retrieved knowledge
6. Chat shows: "Based on SaaS pricing best practices, here are 3 models..."
7. Each suggestion links to source knowledge entry
8. "Apply to Revenue Canvas?" button
```

**Implementation:**
- Seed script to load initial knowledge entries with embeddings
- `supabase/functions/utils/embeddings.ts` — helper to generate embeddings via Claude/OpenAI embedding API
- `supabase/functions/utils/vector-search.ts` — similarity search helper
- Knowledge base admin page (optional, Phase 3)

---

### Phase H: Strategic Planning Agent (Premium)

**Goal**: High-level brain that generates transformation roadmaps.

**Capabilities:**
- Reviews ALL validation scores holistically
- Identifies weakest 3 areas
- Generates 6-month transformation roadmap
- Breaks into milestones with validation sprints
- Creates investor-ready executive summary
- Compares against patterns of successful AI startups in knowledge base

**Example interaction:**

```
User: "How do I become investment-ready in 6 months?"

Agent:
1. Reviews all 9 validation scores
2. Identifies: Revenue (42), Validation Proof (38), Market (55) as weakest
3. Generates roadmap:
   Month 1-2: Customer validation sprint (20 interviews, 3 pilots)
   Month 3-4: Revenue model validation (pricing tests, first paying customers)
   Month 5-6: Market positioning + investor narrative
4. Creates milestone checklist → tasks auto-generated
5. Produces investor-ready executive summary document
```

**New edge function:**

| Function | Purpose |
|----------|---------|
| `supabase/functions/agents/strategic-planner.ts` | Full strategic analysis → roadmap → milestone tasks → executive summary |

---

## New Routes Summary

| Route | Component | Description |
|-------|-----------|-------------|
| `/app/canvas` | `LeanCanvas.tsx` | AI Lean Canvas (9 editable blocks) |
| `/app/validation` | `ValidationCanvas.tsx` | 9-category validation scorecards |
| `/app/validation/:category` | `ValidationDetail.tsx` | BCG-style detail report per category |

**Updated nav items in `DashboardNav.tsx`:**

```
Main Navigation:
  - Dashboard          /app/dashboard
  - Lean Canvas        /app/canvas          ← NEW
  - Validation         /app/validation      ← NEW
  - Tasks              /app/tasks
  - Projects           /app/projects
  - Contacts           /app/contacts
  - Deals              /app/deals
```

---

## File Creation Summary

### New files to create:

```
src/
├── components/
│   ├── chat/
│   │   ├── ChatPanel.tsx            # Full chat panel (replaces AIPanel)
│   │   ├── ChatMessage.tsx          # Message bubble
│   │   ├── ChatInput.tsx            # Input with send
│   │   ├── AgentStatus.tsx          # Running agent indicator
│   │   ├── SuggestionCard.tsx       # Clickable AI suggestion
│   │   └── ActionApproval.tsx       # Approve/reject proposed change
│   ├── canvas/
│   │   ├── CanvasGrid.tsx           # 9-block grid layout
│   │   ├── CanvasBlock.tsx          # Single editable block
│   │   └── CanvasBlockEditor.tsx    # Inline block editor
│   ├── validation/
│   │   ├── ScoreCard.tsx            # Category score card
│   │   ├── ScoreCircle.tsx          # Animated score ring
│   │   └── OverallViability.tsx     # Composite viability index
│   └── reports/
│       ├── ReportHeader.tsx         # Category + score + headline
│       ├── ExecutiveSummary.tsx      # Strategic summary
│       ├── StrengthsWeaknesses.tsx  # Two-column analysis
│       ├── RiskMatrix.tsx           # Risk items
│       └── ExperimentsList.tsx      # Validation experiments
├── pages/app/
│   ├── LeanCanvas.tsx               # Canvas page
│   ├── ValidationCanvas.tsx         # Validation scorecards page
│   └── ValidationDetail.tsx         # Detail report page
├── hooks/
│   ├── useChat.ts                   # Chat state management
│   ├── useAgentRunner.ts            # Agent execution
│   ├── useLeanCanvas.ts             # Canvas CRUD
│   └── useValidation.ts            # Validation scores
├── types/
│   └── copilot.ts                   # LeanCanvas, ValidationScore, ChatMessage, etc.
└── contexts/
    └── StartupContext.tsx            # Current startup + canvas + scores state

supabase/
├── migrations/
│   ├── 001_lean_canvas.sql
│   ├── 002_validation_scores.sql
│   ├── 003_chat_messages.sql
│   ├── 004_detail_reports.sql
│   └── 005_knowledge_base.sql
└── functions/
    ├── chat/index.ts                # Chat orchestrator
    ├── agents/
    │   ├── profile-extractor.ts     # Phase 1: Extract startup profile
    │   ├── lean-canvas-builder.ts   # Phase 1: Generate canvas
    │   ├── validation-scorer.ts     # Phase 1: Score categories
    │   ├── task-generator.ts        # Phase 1: Create tasks from gaps
    │   ├── report-generator.ts      # Phase 1: Detail reports
    │   ├── market-research.ts       # Phase 2: Web + vector search
    │   ├── competition-analyzer.ts  # Phase 2: Competitor analysis
    │   ├── revenue-model-sim.ts     # Phase 2: LTV/CAC projections
    │   ├── risk-analyzer.ts         # Phase 2: Systemic threat detection
    │   └── strategic-planner.ts     # Phase 3: Premium planning agent
    └── utils/
        ├── embeddings.ts            # Generate vector embeddings
        ├── vector-search.ts         # Knowledge base similarity search
        └── claude-client.ts         # Shared Claude API client
```

### Existing files to modify:

| File | Change |
|------|--------|
| `src/App.tsx` | Add routes: `/app/canvas`, `/app/validation`, `/app/validation/:category` |
| `src/components/dashboard/AppShell.tsx` | Replace `AIPanel` with `ChatPanel`, add `StartupContext` provider |
| `src/components/dashboard/DashboardNav.tsx` | Add "Lean Canvas" and "Validation" nav items |
| `src/contexts/AppContext.tsx` | Add `currentStartupId` to context |
| `src/types/dashboard.ts` | Add new type imports or extend |

---

## Implementation Priority Order

```
Phase A  →  Phase B  →  Phase C  →  Phase D  →  Phase E  →  Phase F  →  Phase G  →  Phase H
 Data       Chat +      Lean        Validation   Detail      Full        Vector      Strategic
 Schema     Extract     Canvas      Scoring      Reports     Copilot     KB          Planner
 ─────      ─────       ─────       ─────        ─────       ─────       ─────       ─────
 Week 1     Week 2      Week 3      Week 4       Week 5      Week 6-7    Week 8      Week 9+
```

Each phase is independently deployable and adds visible value.

---

## Key Design Rules

1. **AI proposes, User approves, System executes** — never auto-write
2. **No page reloads** — React state updates via context/query invalidation
3. **Every agent returns structured JSON** — not free-form text
4. **Chat panel is always visible** — context-aware based on current page
5. **Scores recalculate automatically** when canvas changes
6. **Knowledge base grounds all suggestions** — no hallucinated benchmarks
7. **Proposed actions are auditable** — every AI suggestion logged with approve/reject status
