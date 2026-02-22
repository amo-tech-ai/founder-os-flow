# PART 3 — Agent System Design

> Architecture for StartupAI's AI agent ecosystem
> Designed for iterative delivery: Core → MVP → Post-MVP → Advanced → Production

---

## A. Agent Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     CHAT INTERFACE                           │
│  User message → Intent Router → Agent Selection → Response  │
└─────────────────────┬───────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                   AGENT ORCHESTRATOR                         │
│  Determines which agent(s) to invoke                        │
│  Manages conversation state + context window                │
│  Handles multi-step workflows                               │
└──────┬──────────┬──────────┬──────────┬─────────────────────┘
       ↓          ↓          ↓          ↓
   ┌───────┐ ┌────────┐ ┌────────┐ ┌────────┐
   │Profile│ │Canvas  │ │Scoring │ │Task    │
   │Extract│ │Builder │ │Engine  │ │Gen     │
   └───────┘ └────────┘ └────────┘ └────────┘
       ↓          ↓          ↓          ↓
   ┌───────┐ ┌────────┐ ┌────────┐ ┌────────┐
   │Market │ │Compete │ │Revenue │ │Risk    │
   │Research│ │Analyze │ │Simulate│ │Analyze │
   └───────┘ └────────┘ └────────┘ └────────┘
                      ↓
              ┌──────────────┐
              │Strategic     │
              │Planning      │
              │Agent         │
              │(Vector DB)   │
              └──────────────┘
```

---

## B. Core Agents (MVP)

### Agent 1: Profile Extractor

**Purpose:** Extracts structured startup profile data from natural conversation

**Inputs:**
- Chat messages (text)
- Existing profile data (for incremental updates)

**Outputs:**
- Structured JSON: startup name, industry, stage, problem statement, solution description, target customer, business model, team composition, traction metrics

**When Triggered:**
- First chat session (full extraction)
- When user mentions new/changed startup info in any subsequent chat
- Manually via "Update Profile" button

**How It Updates Canvas:**
- Writes extracted fields to `startups` table
- Flags changed fields for re-validation
- Triggers lean canvas builder if enough data exists

**How It Updates Dashboard:**
- Profile completeness metric updates
- "Needs more info" flags appear on incomplete sections

**Human Approval Gate:**
- Extracted data shown as suggestion cards: "I understood your target customer is Series-A AI startups. Is that right?"
- User confirms or edits before saving
- No silent writes to database

---

### Agent 2: Lean Canvas Builder

**Purpose:** Generates a complete 9-block Lean Canvas from profile data

**Inputs:**
- Structured profile data (from Profile Extractor)
- Existing canvas blocks (for partial updates)
- User's industry and stage

**Outputs:**
- 9 canvas blocks, each with:
  - Title
  - Content (2–4 sentences)
  - Confidence level (Low / Medium / High)
  - Data sources used
  - "Needs validation" flag

**When Triggered:**
- After profile extraction reaches minimum completeness (5+ fields)
- When user explicitly asks to generate/regenerate canvas
- When profile data changes significantly

**How It Updates Canvas:**
- Writes to `lean_canvas_versions` table (creates new version, never overwrites)
- Each block mapped to canvas UI component
- Diff shown if updating existing canvas

**How It Updates Dashboard:**
- Canvas completeness score
- "Canvas generated" event logged

**Human Approval Gate:**
- Canvas displayed as editable draft
- User can accept, edit, or regenerate each block independently
- "Accept All" option for speed

---

### Agent 3: Validation Scorer

**Purpose:** Scores each validation topic (0–100) based on all available evidence

**Inputs:**
- Lean Canvas blocks
- Chat history (evidence mentions)
- Profile data
- Any uploaded documents or links
- Previous scores (for trend calculation)

**Outputs:**
- 9 topic scores, each with:
  - Composite score (0–100)
  - 4–5 sub-scores
  - Confidence level
  - Key evidence cited
  - Gap analysis (ambition vs evidence)
  - One-line verdict

**When Triggered:**
- After lean canvas is accepted
- After any canvas block is edited
- After research agent returns new data
- On manual "Re-score" request
- Weekly automatic re-assessment (background)

**How It Updates Canvas:**
- Writes to `validation_topic_scores` table
- Updates `validation_reports` summary record
- Recalculates overall validation score

**How It Updates Dashboard:**
- Overall score badge updates
- Heatmap refreshes
- Radar chart updates
- Trend arrows recalculated

**Human Approval Gate:**
- Scores displayed with explanation
- User can dispute a score (opens chat thread about that topic)
- Dispute triggers re-scoring with additional context

---

### Agent 4: Task Generator

**Purpose:** Creates actionable tasks from validation gaps

**Inputs:**
- Validation scores (especially low scores and gaps)
- Current task list (to avoid duplicates)
- Startup stage and priorities

**Outputs:**
- Prioritized task list, each with:
  - Title and description
  - Linked validation topic
  - Expected score impact
  - Effort level
  - Suggested approach
  - Phase assignment (Define/Plan/Build/Review/Launch)

**When Triggered:**
- After validation scoring completes
- When user asks "What should I do next?"
- When a score drops below threshold

**How It Updates Canvas:**
- Does NOT update canvas directly
- Tasks reference canvas blocks for traceability

**How It Updates Dashboard:**
- New tasks appear in task list
- "AI Suggested" badge on generated tasks
- Priority actions section updates

**Human Approval Gate:**
- Tasks shown as suggestions: "I recommend these 5 actions. Add to your task list?"
- User selects which to add
- Can modify title/description before adding

---

## C. Advanced Agents (Post-MVP)

### Agent 5: Market Research Agent

**Purpose:** Gathers market data from web sources and vector DB to inform validation

**Inputs:**
- Industry, target market, keywords from profile
- Specific research questions from validation gaps
- Vector DB query parameters

**Outputs:**
- Market size estimates (TAM/SAM/SOM)
- Industry growth rates
- Key market trends
- Relevant reports and data sources
- Competitor landscape overview

**When Triggered:**
- During initial validation (market topic)
- When user asks market-related questions in chat
- When market score is below 40
- Manual "Research Market" button

**How It Updates Canvas:**
- Suggests updates to Customer Segments and Market blocks
- Provides data for validation scorer to re-assess

**How It Updates Dashboard:**
- Market data card appears with key findings
- Links to sources for credibility

**Human Approval Gate:**
- Research findings presented as report
- User decides what to incorporate into canvas
- Sources visible for verification

---

### Agent 6: Competition Analyzer

**Purpose:** Maps competitive landscape and identifies positioning opportunities

**Inputs:**
- Startup's solution description
- Industry and category
- Known competitors (user-provided or discovered)
- Vector DB competitive frameworks

**Outputs:**
- Competitor list with key attributes
- Feature comparison matrix
- Positioning map (2x2)
- Differentiation assessment
- Threat level per competitor

**When Triggered:**
- During initial validation (competition topic)
- When user mentions a competitor in chat
- When competition score is below 40
- Manual "Analyze Competition" button

**How It Updates Canvas:**
- Suggests Unfair Advantage block content
- Informs Solution differentiation language

**How It Updates Dashboard:**
- Competitive positioning card
- Threat level indicator

**Human Approval Gate:**
- Competitor analysis shown as draft report
- User confirms/adds/removes competitors
- Positioning recommendation requires acceptance

---

### Agent 7: Revenue Simulator

**Purpose:** Models revenue scenarios based on pricing, conversion, and growth assumptions

**Inputs:**
- Pricing model (from canvas)
- Target market size (from market research)
- Conversion assumptions
- Churn estimates
- Cost structure

**Outputs:**
- 3-year revenue projection (base/bull/bear)
- Unit economics (LTV, CAC, payback period)
- Break-even analysis
- Monthly cash flow model
- Sensitivity analysis on key variables

**When Triggered:**
- During revenue model validation
- When user changes pricing or market assumptions
- Manual "Simulate Revenue" button

**How It Updates Canvas:**
- Suggests Revenue Streams and Cost Structure refinements
- Informs Key Metrics block with projected KPIs

**How It Updates Dashboard:**
- Revenue projection card with 3 scenarios
- Unit economics summary

**Human Approval Gate:**
- All assumptions displayed and editable
- User must confirm inputs before model runs
- Results are projections, clearly labeled as such

---

### Agent 8: Risk Analyzer

**Purpose:** Identifies and assesses startup-killing risks across all dimensions

**Inputs:**
- Full lean canvas
- All validation scores
- Industry risk patterns (from vector DB)
- Team composition

**Outputs:**
- Risk register (10–15 risks)
- Risk matrix (likelihood × impact)
- Top 3 existential risks with mitigation strategies
- Risk-adjusted validation score
- Insurance/mitigation recommendations

**When Triggered:**
- After initial validation is complete
- When any validation score drops significantly
- Monthly automatic reassessment
- Manual "Assess Risks" button

**How It Updates Canvas:**
- Informs Risk Assessment validation topic
- Suggests Cost Structure additions for risk mitigation

**How It Updates Dashboard:**
- Risk summary card with top 3 threats
- Risk trend over time

**Human Approval Gate:**
- Risk register shown for review
- User can add risks the AI missed
- Mitigation actions require approval to add to tasks

---

### Agent 9: Strategic Planning Agent (Premium)

**Purpose:** Creates comprehensive strategic roadmap combining all validation insights with startup best practices

**Inputs:**
- All validation scores and reports
- Lean canvas (current version)
- Vector DB: startup best practices, frameworks, playbooks
- User's stated goals and timeline
- Competitive landscape data

**Outputs:**
- 6-month strategic roadmap
- Phase-gated milestones
- Resource allocation recommendations
- Key decision points and triggers
- Investor readiness assessment
- Weekly priority recommendations

**When Triggered:**
- After all 9 validation topics are scored
- When user requests strategic plan
- Monthly automatic refresh
- After significant score changes

**How It Updates Canvas:**
- Suggests canvas refinements based on strategic priorities
- Recommends which blocks need most attention

**How It Updates Dashboard:**
- Strategic roadmap widget
- Weekly priorities
- Investor readiness score
- Milestone tracker

**Human Approval Gate:**
- Full plan presented as proposal
- User approves/modifies each phase
- Milestone commitments require explicit acceptance

---

## D. Currently Available Skills & Agents

### Installed Skills (from `.agents/`)
| Skill | Status | How It's Used |
|-------|--------|---------------|
| `wireframe-prototyping` | Installed | Generate wireframe specs for UI components |

### Available from skills.sh
Additional skills can be installed from https://skills.sh for specific tasks. Each implementation task should leverage the appropriate skill.

---

## E. How Agents Collaborate

### Chain 1: Initial Setup (First Session)
```
Chat Message → Profile Extractor → [User Confirms]
                                         ↓
                                  Lean Canvas Builder → [User Edits]
                                         ↓
                                  Validation Scorer → Dashboard Updated
                                         ↓
                                  Task Generator → Tasks Suggested
```

### Chain 2: Deep Research (User-Triggered)
```
User asks "Research my market" → Market Research Agent
                                      ↓
                              Findings presented → [User Accepts]
                                      ↓
                              Validation Scorer (re-scores Market topic)
                                      ↓
                              Dashboard + Canvas Updated
```

### Chain 3: Canvas Edit (User-Initiated)
```
User edits Revenue block → recalc_scores_on_change
                                ↓
                        Validation Scorer (Revenue topic only)
                                ↓
                        Revenue Simulator (if pricing changed)
                                ↓
                        Risk Analyzer (if revenue model changed significantly)
                                ↓
                        Task Generator (new gaps found)
```

### Chain 4: Strategic Review (Scheduled/Manual)
```
Weekly Cron → Strategic Planning Agent
                    ↓
              Queries Vector DB for best practices
                    ↓
              Compares current state to frameworks
                    ↓
              Generates weekly brief → [User Reviews]
                    ↓
              Updates priority recommendations
```

---

## F. Agent Communication Protocol

### Message Format Between Agents
Each agent communicates through a standardized event:
- **agent_id**: Which agent produced this
- **event_type**: "data_update" | "score_change" | "task_suggestion" | "research_result"
- **payload**: Structured data specific to the event type
- **confidence**: 0–1 confidence in the output
- **requires_approval**: Boolean — does a human need to sign off?
- **target_entities**: What database records are affected

### Conflict Resolution
When two agents suggest conflicting updates:
1. Human approval always wins
2. Evidence-backed agent output wins over inference
3. More recent data wins over older data
4. Conflicts are logged and surfaced to user

---

## G. Chat Panel Agent UX

### How the Right Chat Panel Works

The chat panel is the primary interface for running agents. It's not just a chatbot — it's an agent control center.

**Chat Panel Features:**
1. **Natural conversation** — Talk about your startup naturally
2. **Suggestion chips** — After each response, 3–4 clickable next actions appear
3. **Agent status indicators** — "Market Research Agent running..." with progress
4. **Inline results** — Agent outputs appear in the chat stream
5. **Action cards** — "Add to Canvas?" / "Update Score?" / "Create Task?" buttons inline
6. **Agent picker** — Dropdown to manually trigger specific agents
7. **Context awareness** — Chat knows what page you're on and adjusts suggestions

**Suggestion Types:**
- "Tell me more about your pricing model"
- "Run market research for your industry"
- "Analyze your top 3 competitors"
- "Generate tasks from your weakest validation area"
- "Create a strategic plan for next quarter"
- "Simulate revenue with these assumptions"

**Chat → Canvas/Dashboard Flow:**
1. User says something in chat
2. AI responds with insight + suggestion
3. Suggestion card appears: "Update Revenue block with this info?"
4. User clicks "Yes" → Canvas updates → Score recalculates → Dashboard refreshes
5. All visible in real-time without page refresh
