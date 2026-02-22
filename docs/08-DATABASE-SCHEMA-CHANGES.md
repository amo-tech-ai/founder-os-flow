# PART 8 — Database Schema Changes

> What exists in Supabase today vs what's needed for the full system
> Migration plan organized by delivery phase

---

## A. Current Schema Analysis

The Supabase project (`ouverjherohazwadfgud`) has **50 tables** (plus 3 views) auto-typed in `src/integrations/supabase/types.ts`.

### Tables That Exist and Are Usable As-Is
| Table | What It Stores | Ready? |
|-------|---------------|--------|
| `profiles` | User profiles (id, email, full_name, avatar) | Yes |
| `orgs` | Organizations | Yes |
| `org_members` | Org membership with roles | Yes |
| `startups` | Startup entities (name, industry, stage, description) | Yes |
| `startup_founders` | Founder profiles linked to startups | Yes |
| `startup_competitors` | Competitor tracking per startup | Yes |
| `startup_links` | External links per startup | Yes |
| `startup_metrics_snapshots` | Historical metrics data | Yes |
| `market_sizing_results` | Market sizing calculations | Yes |
| `tasks` | Task items (title, status, priority, phase, category) | Yes |
| `crm_contacts` | Contact records | Yes |
| `crm_deals` | Deal pipeline | Yes |
| `crm_tasks` | CRM-specific tasks | Yes |
| `decks` | Pitch decks | Yes |
| `slides` | Deck slides | Yes |
| `wizard_sessions` | Onboarding wizard state | Yes |

### Tables That Exist But Need Modification
| Table | What Needs to Change | Why |
|-------|---------------------|-----|
| `ai_coach_insights` | Add `validation_topic` column, add `score` column, add `agent_type` column | Link insights to validation topics |
| `ai_runs` | Add `agent_type`, `input_hash`, `input_data` (JSONB), `output_data` (JSONB), `startup_id`, `org_id`, `triggered_by`, `completed_at`, `error_message` columns | Extend to track agent runs (replaces proposed `agent_runs` table) |
| `proposed_actions` | Add `validation_topic` column | Link actions to specific validation areas |
| `startups` | Add `funding_stage`, `profile_completeness` columns. **Use existing columns** for profile extraction: `target_customers` (array), `problem` (TEXT), `solution` (TEXT), `business_model` (array), `traction_data` (JSON), `unique_value` (TEXT), `pricing_model` (TEXT), `team_size` (INT). Do NOT duplicate these. | Profile extraction uses existing structured storage |

### Tables That Need to Be Created
These are the new tables required for the chat → canvas → validation → reports flow.

---

## B. New Tables — Detailed Specifications

### 1. `chat_conversations`
```sql
CREATE TABLE chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES orgs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id),
  startup_id UUID REFERENCES startups(id),
  title TEXT,                           -- Auto-generated from first message
  status TEXT DEFAULT 'active'          -- 'active' | 'archived'
    CHECK (status IN ('active', 'archived')),
  context JSONB DEFAULT '{}',           -- Current page context when started
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_chat_conversations_org ON chat_conversations(org_id);
CREATE INDEX idx_chat_conversations_user ON chat_conversations(user_id);
```

### 2. `chat_messages`
```sql
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',          -- Agent used, tokens, latency
  suggestions JSONB DEFAULT '[]',       -- Clickable suggestion chips
  proposed_actions JSONB DEFAULT '[]',  -- Actions needing approval
  agent_type TEXT,                      -- Which agent responded
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_chat_messages_conv ON chat_messages(conversation_id);
CREATE INDEX idx_chat_messages_created ON chat_messages(created_at);
```

### 3. `lean_canvas_versions`
```sql
CREATE TABLE lean_canvas_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_id UUID NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
  org_id UUID NOT NULL REFERENCES orgs(id) ON DELETE CASCADE,
  version_number INT NOT NULL DEFAULT 1,
  status TEXT DEFAULT 'draft'           -- 'draft' | 'accepted' | 'superseded'
    CHECK (status IN ('draft', 'accepted', 'superseded')),
  source TEXT DEFAULT 'ai'              -- 'ai' | 'manual' | 'chat'
    CHECK (source IN ('ai', 'manual', 'chat')),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(startup_id, version_number)
);

CREATE INDEX idx_canvas_versions_startup ON lean_canvas_versions(startup_id);
```

### 4. `lean_canvas_blocks`
```sql
CREATE TABLE lean_canvas_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canvas_version_id UUID NOT NULL REFERENCES lean_canvas_versions(id) ON DELETE CASCADE,
  block_type TEXT NOT NULL CHECK (block_type IN (
    'problem', 'solution', 'unique_value_prop', 'unfair_advantage',
    'customer_segments', 'key_metrics', 'channels',
    'cost_structure', 'revenue_streams'
  )),
  content TEXT NOT NULL DEFAULT '',
  confidence TEXT DEFAULT 'low'         -- 'low' | 'medium' | 'high'
    CHECK (confidence IN ('low', 'medium', 'high')),
  needs_validation BOOLEAN DEFAULT true,
  ai_generated BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',          -- Data sources, chat message refs
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(canvas_version_id, block_type)
);

CREATE INDEX idx_canvas_blocks_version ON lean_canvas_blocks(canvas_version_id);
```

### 5. `validation_reports`
```sql
CREATE TABLE validation_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_id UUID NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
  org_id UUID NOT NULL REFERENCES orgs(id) ON DELETE CASCADE,
  canvas_version_id UUID REFERENCES lean_canvas_versions(id),
  overall_score NUMERIC(5,2) DEFAULT 0,      -- 0-100
  archetype TEXT,                              -- 'exploring' | 'validating' | 'scaling'
  status TEXT DEFAULT 'draft'
    CHECK (status IN ('draft', 'scoring', 'completed')),
  scored_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_validation_reports_startup ON validation_reports(startup_id);
```

### 6. `validation_topic_scores`
```sql
CREATE TABLE validation_topic_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES validation_reports(id) ON DELETE CASCADE,
  topic TEXT NOT NULL CHECK (topic IN (
    'problem', 'solution', 'market', 'revenue',
    'competition', 'gtm', 'team', 'traction', 'risk'
  )),
  composite_score NUMERIC(5,2) DEFAULT 0,    -- 0-100
  sub_scores JSONB DEFAULT '{}',             -- { "pricing_clarity": 65, "wtp_evidence": 20, ... }
  verdict TEXT,                               -- One-line executive summary
  evidence JSONB DEFAULT '[]',               -- Array of evidence items
  gap_analysis JSONB DEFAULT '{}',           -- { ambition: 85, evidence: 32 }
  confidence TEXT DEFAULT 'low'
    CHECK (confidence IN ('low', 'medium', 'high')),
  scored_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(report_id, topic)
);

CREATE INDEX idx_topic_scores_report ON validation_topic_scores(report_id);
```

### 7. `detail_reports`
```sql
CREATE TABLE detail_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_score_id UUID NOT NULL REFERENCES validation_topic_scores(id) ON DELETE CASCADE,
  startup_id UUID NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  tension_headline TEXT,                       -- BCG-style opening
  flow_diagram JSONB DEFAULT '{}',            -- Structured flow data for rendering
  analysis_content TEXT,                       -- Full executive analysis
  evidence_assessment JSONB DEFAULT '{}',     -- Strong/weak/missing evidence
  benchmarks JSONB DEFAULT '{}',              -- Industry comparisons
  priority_actions JSONB DEFAULT '[]',        -- Recommended next steps
  related_topics TEXT[] DEFAULT '{}',         -- Links to other topics
  bonus_section_type TEXT,                    -- Topic-specific bonus
  bonus_section_content JSONB DEFAULT '{}',
  generated_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_detail_reports_startup ON detail_reports(startup_id);
CREATE INDEX idx_detail_reports_topic ON detail_reports(topic);
```

### 8. `knowledge_base`
```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL
    CHECK (category IN ('framework', 'benchmark', 'template', 'pattern')),
  subcategory TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding VECTOR(1536),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_kb_category ON knowledge_base(category);
CREATE INDEX idx_kb_embedding ON knowledge_base
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);
```

### 9. `agent_jobs` (Background Job Queue)

For heavy agents (market-research, strategic-plan) that exceed 30s, use a job queue pattern with Supabase Realtime.

```sql
CREATE TABLE agent_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES orgs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id),
  startup_id UUID REFERENCES startups(id),
  agent_type TEXT NOT NULL,                   -- 'market_research' | 'strategic_planner' | etc.
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  input_payload JSONB NOT NULL DEFAULT '{}',
  output_payload JSONB,
  error_message TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_agent_jobs_org ON agent_jobs(org_id);
CREATE INDEX idx_agent_jobs_status ON agent_jobs(status);

-- Enable realtime for frontend subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE agent_jobs;
```

> **Note:** Short-lived agents (chat, profile-extract, validation-score) use the extended `ai_runs` table directly. Only heavy agents use the `agent_jobs` queue pattern with `EdgeRuntime.waitUntil()`.

---

## C. Table Modifications to Existing Schema

### Modify `startups`

> **Important:** The `startups` table already has these columns for profile data:
> `target_customers` (TEXT[]), `problem` (TEXT), `solution` (TEXT), `business_model` (TEXT[]),
> `traction_data` (JSON), `unique_value` (TEXT), `pricing_model` (TEXT), `team_size` (INT),
> `profile_strength` (NUMERIC). Do NOT create duplicate columns.

Only add genuinely new columns:
```sql
ALTER TABLE startups ADD COLUMN IF NOT EXISTS funding_stage TEXT;
ALTER TABLE startups ADD COLUMN IF NOT EXISTS profile_completeness NUMERIC(3,0) DEFAULT 0;
```

The Profile Extractor agent should write to existing columns:
- `target_customers` (not `target_customer`)
- `problem` (not `problem_statement`)
- `solution` (not `solution_description`)
- `business_model` (existing array)
- `traction_data` (not `traction_summary`)
- `unique_value` (existing)
- `pricing_model` (existing)

### Modify `ai_coach_insights`
```sql
ALTER TABLE ai_coach_insights ADD COLUMN IF NOT EXISTS validation_topic TEXT;
ALTER TABLE ai_coach_insights ADD COLUMN IF NOT EXISTS score NUMERIC(5,2);
ALTER TABLE ai_coach_insights ADD COLUMN IF NOT EXISTS agent_type TEXT;
```

### Modify `ai_runs` (Extend for Agent Tracking)

> **Decision:** Extend the existing `ai_runs` table instead of creating a separate `agent_runs` table. This avoids duplicate tracking.

```sql
ALTER TABLE ai_runs ADD COLUMN IF NOT EXISTS agent_type TEXT;
ALTER TABLE ai_runs ADD COLUMN IF NOT EXISTS input_hash TEXT;
ALTER TABLE ai_runs ADD COLUMN IF NOT EXISTS input_data JSONB DEFAULT '{}';
ALTER TABLE ai_runs ADD COLUMN IF NOT EXISTS output_data JSONB DEFAULT '{}';
ALTER TABLE ai_runs ADD COLUMN IF NOT EXISTS startup_id UUID REFERENCES startups(id);
ALTER TABLE ai_runs ADD COLUMN IF NOT EXISTS org_id UUID REFERENCES orgs(id);
ALTER TABLE ai_runs ADD COLUMN IF NOT EXISTS triggered_by TEXT DEFAULT 'user'
  CHECK (triggered_by IN ('user', 'system', 'agent'));
ALTER TABLE ai_runs ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;
ALTER TABLE ai_runs ADD COLUMN IF NOT EXISTS error_message TEXT;
ALTER TABLE ai_runs ADD COLUMN IF NOT EXISTS tokens_used INT DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_ai_runs_agent_type ON ai_runs(agent_type);
CREATE INDEX IF NOT EXISTS idx_ai_runs_startup ON ai_runs(startup_id);
```

---

## D. RLS Policies for New Tables

All new tables follow the same org-based isolation pattern:

```sql
-- Helper function (if not already created)
CREATE OR REPLACE FUNCTION get_user_org_id()
RETURNS UUID AS $$
  SELECT org_id FROM org_members WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Pattern applied to each table:
ALTER TABLE [table] ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own org data"
  ON [table] FOR SELECT
  USING (org_id = get_user_org_id());

CREATE POLICY "Users can insert own org data"
  ON [table] FOR INSERT
  WITH CHECK (org_id = get_user_org_id());

CREATE POLICY "Users can update own org data"
  ON [table] FOR UPDATE
  USING (org_id = get_user_org_id());

CREATE POLICY "Users can delete own org data"
  ON [table] FOR DELETE
  USING (org_id = get_user_org_id());
```

**Exception:** `knowledge_base` gets read-only access for all authenticated users (it's shared content):
```sql
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated users can read knowledge base"
  ON knowledge_base FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Only service role can insert knowledge"
  ON knowledge_base FOR INSERT
  WITH CHECK (auth.role() = 'service_role');
```

---

## E. Migration Order

```
Migration 1 (Core):
  - chat_conversations
  - chat_messages
  - ALTER startups (add funding_stage, profile_completeness only)
  - ALTER ai_runs (extend for agent tracking)

Migration 2 (MVP):
  - lean_canvas_versions
  - lean_canvas_blocks
  - validation_reports
  - validation_topic_scores
  - agent_jobs (background job queue)

Migration 3 (Post-MVP):
  - detail_reports
  - knowledge_base (with pgvector extension)
  - ALTER ai_coach_insights
  - match_knowledge RPC function

Migration 4 (Production):
  - RLS policies for all new tables
  - Indexes optimization
```

---

## F. Entity Relationship Summary

```
profiles ──┬── org_members ── orgs
            │
            └── chat_conversations ── chat_messages
                        │
startups ──┬── lean_canvas_versions ── lean_canvas_blocks
            │
            ├── validation_reports ── validation_topic_scores
            │                                    │
            │                              detail_reports
            │
            ├── ai_runs (extended for agent tracking)
            │
            └── agent_jobs (background job queue)

knowledge_base (standalone, shared across all orgs)
```
