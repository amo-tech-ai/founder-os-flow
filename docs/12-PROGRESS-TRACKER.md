# PART 12 — Progress Tracker

> Features × Agents × Pages × Skills — mapped across all 5 phases
> Living document: update status as implementation progresses

---

## A. Master Feature Tracker

### CORE Phase

| # | Feature | Agent | Page/Component | Skill | Status |
|---|---------|-------|----------------|-------|--------|
| C1 | Supabase Auth (signup/login) | — | AuthGuard.tsx | session-start-hook | 🔲 TODO |
| C2 | Chat conversation management | — | ChatPanel.tsx | — | 🔲 TODO |
| C3 | Chat message send/receive | Chat Orchestrator | ChatMessages.tsx | — | 🔲 TODO |
| C4 | AI response generation | Chat Orchestrator | ChatMessages.tsx | — | 🔲 TODO |
| C5 | Suggestion chips after response | Chat Orchestrator | SuggestionChips.tsx | — | 🔲 TODO |
| C6 | Profile extraction from chat | Profile Extractor | ChatPanel → ActionCards | — | 🔲 TODO |
| C7 | Profile confirmation UI | Profile Extractor | ActionCards.tsx | wireframe-prototyping | 🔲 TODO |
| C8 | Profile save to startups | Profile Extractor | — (backend) | — | 🔲 TODO |
| C9 | Dashboard real data wiring | — | Dashboard.tsx | — | 🔲 TODO |
| C10 | Chat edge function | Chat Orchestrator | — (backend) | — | 🔲 TODO |
| C11 | Dashboard-summary edge function | — | — (backend) | — | 🔲 TODO |
| C12 | Chat tables migration | — | — (database) | — | 🔲 TODO |
| C13 | Startups table alteration | — | — (database) | — | 🔲 TODO |
| C14 | Nav update (add Canvas, Validation) | — | DashboardNav.tsx | — | 🔲 TODO |
| C15 | AppShell right panel swap | — | AppShell.tsx | — | 🔲 TODO |

### MVP Phase

| # | Feature | Agent | Page/Component | Skill | Status |
|---|---------|-------|----------------|-------|--------|
| M1 | Lean Canvas generation | Canvas Builder | LeanCanvas.tsx | wireframe-prototyping | 🔲 TODO |
| M2 | Canvas 3×3 grid layout | — | CanvasGrid.tsx | wireframe-prototyping | 🔲 TODO |
| M3 | Editable canvas blocks | — | CanvasBlock.tsx | — | 🔲 TODO |
| M4 | Block confidence badges | — | CanvasBlock.tsx | — | 🔲 TODO |
| M5 | Canvas version management | — | LeanCanvas.tsx | — | 🔲 TODO |
| M6 | Canvas accept/lock | — | LeanCanvas.tsx | — | 🔲 TODO |
| M7 | Validation scoring (all 9 topics) | Validation Scorer | ValidationCanvas.tsx | — | 🔲 TODO |
| M8 | Validation card grid (3×3) | — | ValidationCard.tsx | wireframe-prototyping | 🔲 TODO |
| M9 | Score badges (0-100 color) | — | ScoreBadge.tsx | — | 🔲 TODO |
| M10 | Overall score + archetype | Validation Scorer | ValidationHeader.tsx | — | 🔲 TODO |
| M11 | Radar chart (9 axes) | — | ValidationRadar.tsx | — | 🔲 TODO |
| M12 | Heatmap (topics × dims) | — | ValidationHeatmap.tsx | — | 🔲 TODO |
| M13 | Task generation from gaps | Task Generator | Tasks.tsx | — | 🔲 TODO |
| M14 | Agent status in chat | — | AgentStatusIndicator.tsx | — | 🔲 TODO |
| M15 | Approve/reject action cards | — | ActionCards.tsx | — | 🔲 TODO |
| M16 | Canvas-generate edge function | Canvas Builder | — (backend) | — | 🔲 TODO |
| M17 | Validation-score edge function | Validation Scorer | — (backend) | — | 🔲 TODO |
| M18 | Task-generate edge function | Task Generator | — (backend) | — | 🔲 TODO |
| M19 | AI-insights edge function | — | — (backend) | — | 🔲 TODO |
| M20 | Canvas + validation tables | — | — (database) | — | 🔲 TODO |

### POST-MVP Phase

| # | Feature | Agent | Page/Component | Skill | Status |
|---|---------|-------|----------------|-------|--------|
| P1 | Detail report — Tension Header | — | TensionHeader.tsx | wireframe-prototyping | 🔲 TODO |
| P2 | Detail report — Flow Diagram | — | FlowDiagram.tsx | wireframe-prototyping | 🔲 TODO |
| P3 | Detail report — Score Breakdown | — | ScoreBreakdown.tsx | — | 🔲 TODO |
| P4 | Detail report — Executive Analysis | Report Generator | ExecutiveAnalysis.tsx | — | 🔲 TODO |
| P5 | Detail report — Evidence section | Report Generator | EvidenceAssessment.tsx | — | 🔲 TODO |
| P6 | Detail report — Gap Analysis | — | GapAnalysis.tsx | — | 🔲 TODO |
| P7 | Detail report — Benchmarks | — | BenchmarkComparison.tsx | — | 🔲 TODO |
| P8 | Detail report — Priority Actions | — | PriorityActions.tsx | — | 🔲 TODO |
| P9 | Agent picker in chat | — | AgentPicker.tsx | — | 🔲 TODO |
| P10 | Market research via chat | Market Research | ChatPanel.tsx | — | 🔲 TODO |
| P11 | Competition analysis via chat | Competition Analyzer | ChatPanel.tsx | — | 🔲 TODO |
| P12 | Vector DB setup (pgvector) | — | — (database) | — | 🔲 TODO |
| P13 | Knowledge base seeding (50 chunks) | — | — (data) | — | 🔲 TODO |
| P14 | Report-generate edge function | Report Generator | — (backend) | — | 🔲 TODO |
| P15 | Market-research edge function | Market Research | — (backend) | — | 🔲 TODO |
| P16 | Competition-analyze edge function | Competition Analyzer | — (backend) | — | 🔲 TODO |
| P17 | Vector-search edge function | — | — (backend) | — | 🔲 TODO |
| P18 | Dashboard trend charts | — | Dashboard.tsx | — | 🔲 TODO |

### ADVANCED Phase

| # | Feature | Agent | Page/Component | Skill | Status |
|---|---------|-------|----------------|-------|--------|
| A1 | Revenue simulation UI | Revenue Simulator | RevenueSimulation.tsx | wireframe-prototyping | 🔲 TODO |
| A2 | Risk matrix visualization | Risk Analyzer | RiskMatrix.tsx | — | 🔲 TODO |
| A3 | Strategic roadmap timeline | Strategic Planner | StrategicRoadmap.tsx | wireframe-prototyping | 🔲 TODO |
| A4 | Investor readiness score | Strategic Planner | InvestorReadiness.tsx | — | 🔲 TODO |
| A5 | Canvas version diff | — | CanvasDiff.tsx | — | 🔲 TODO |
| A6 | Score trend lines | — | ScoreTrend.tsx | — | 🔲 TODO |
| A7 | Multi-agent chains in chat | Chat Orchestrator | ChatPanel.tsx | — | 🔲 TODO |
| A8 | Knowledge base full seed (634) | — | — (data) | — | 🔲 TODO |
| A9 | Revenue-simulate edge function | Revenue Simulator | — (backend) | — | 🔲 TODO |
| A10 | Risk-analyze edge function | Risk Analyzer | — (backend) | — | 🔲 TODO |
| A11 | Strategic-plan edge function | Strategic Planner | — (backend) | — | 🔲 TODO |
| A12 | Weekly auto re-score cron | Validation Scorer | — (backend) | — | 🔲 TODO |
| A13 | Weekly planning brief cron | Strategic Planner | — (backend) | — | 🔲 TODO |

### PRODUCTION Phase

| # | Feature | Agent | Page/Component | Skill | Status |
|---|---------|-------|----------------|-------|--------|
| X1 | First-run onboarding | — | Onboarding.tsx | wireframe-prototyping | 🔲 TODO |
| X2 | Empty states (all pages) | — | EmptyState variants | — | 🔲 TODO |
| X3 | Loading skeletons | — | All pages | — | 🔲 TODO |
| X4 | Error states + retry | — | All pages | — | 🔲 TODO |
| X5 | Mobile optimization | — | All pages | — | 🔲 TODO |
| X6 | Cmd+K command palette | — | CommandPalette.tsx | — | 🔲 TODO |
| X7 | Rate limiting | — | All edge functions | — | 🔲 TODO |
| X8 | Error monitoring | — | Sentry integration | — | 🔲 TODO |
| X9 | Security audit | — | Full stack | — | 🔲 TODO |
| X10 | Load testing | — | Infrastructure | — | 🔲 TODO |
| X11 | Demo mode sample data | — | mockData upgrade | — | 🔲 TODO |
| X12 | Scoring rubric refinement | — | Knowledge base | — | 🔲 TODO |

---

## B. Agent Inventory

| # | Agent | Phase | Edge Function | Triggered By | Updates |
|---|-------|-------|---------------|-------------|---------|
| 1 | **Chat Orchestrator** | Core | `chat` | Every chat message | Routes to other agents |
| 2 | **Profile Extractor** | Core | `chat` (sub-agent) | First chat / profile updates | `startups` table |
| 3 | **Canvas Builder** | MVP | `build-canvas` | Profile complete / user request | `lean_canvas_*` tables |
| 4 | **Validation Scorer** | MVP | `score-validation` | Canvas accepted / re-score | `validation_*` tables |
| 5 | **Task Generator** | MVP | `generate-tasks` | Scoring complete / user request | `tasks` table |
| 6 | **Report Generator** | Post-MVP | `generate-report` | Detail page visited / user request | `detail_reports` table |
| 7 | **Market Research** | Post-MVP | `research-market` | User request via agent picker | Chat response + canvas suggestions |
| 8 | **Competition Analyzer** | Post-MVP | `analyze-competition` | User request via agent picker | Chat response + canvas suggestions |
| 9 | **Revenue Simulator** | Advanced | `simulate-revenue` | User request / revenue changes | Revenue projections |
| 10 | **Risk Analyzer** | Advanced | `analyze-risks` | User request / score drops | Risk register |
| 11 | **Strategic Planner** | Advanced | `strategic-plan` | All topics scored / user request | Roadmap + milestones |

---

## C. Page Inventory

| # | Route | Page Component | Phase | Depends On |
|---|-------|---------------|-------|------------|
| 1 | `/app/dashboard` | Dashboard.tsx | Core (upgrade) | dashboard-summary |
| 2 | `/app/chat` | ChatPage.tsx | Core | chat edge function |
| 3 | `/app/lean-canvas` | LeanCanvas.tsx | MVP | canvas-generate |
| 4 | `/app/validation` | ValidationCanvas.tsx | MVP | validation-score |
| 5 | `/app/validation/problem` | DetailReport.tsx | Post-MVP | report-generate |
| 6 | `/app/validation/solution` | DetailReport.tsx | Post-MVP | report-generate |
| 7 | `/app/validation/market` | DetailReport.tsx | Post-MVP | report-generate |
| 8 | `/app/validation/revenue` | DetailReport.tsx | Post-MVP | report-generate |
| 9 | `/app/validation/competition` | DetailReport.tsx | Post-MVP | report-generate |
| 10 | `/app/validation/gtm` | DetailReport.tsx | Post-MVP | report-generate |
| 11 | `/app/validation/team` | DetailReport.tsx | Post-MVP | report-generate |
| 12 | `/app/validation/traction` | DetailReport.tsx | Post-MVP | report-generate |
| 13 | `/app/validation/risk` | DetailReport.tsx | Post-MVP | report-generate |
| 14 | `/app/tasks` | Tasks.tsx | MVP (upgrade) | task-generate |
| ~~15~~ | ~~`/app/projects`~~ | ~~Projects.tsx~~ | ~~Existing~~ | **NOTE: `projects` table does not exist in DB. Route exists but has no backing table.** |
| 16 | `/app/contacts` | Contacts.tsx | Existing | — |
| 17 | `/app/deals` | Deals.tsx | Existing | — |
| 18 | `/app/profile` | Profile.tsx | Existing | — |
| 19 | `/app/company` | CompanyProfile.tsx | Existing | — |
| 20 | `/app/settings` | Settings.tsx | Existing | — |

---

## D. Skill Assignments

Each major UI task is associated with a Claude skill:

| Task | Skill | Usage |
|------|-------|-------|
| Chat panel layout | `wireframe-prototyping` | Design the chat message UI patterns |
| Canvas grid layout | `wireframe-prototyping` | 3×3 responsive grid wireframe |
| Validation card design | `wireframe-prototyping` | Score card with mini-chart wireframe |
| Detail report layout | `wireframe-prototyping` | 9-section scrollable report wireframe |
| Flow diagram components | `wireframe-prototyping` | Per-topic flow visual specs |
| Revenue simulation UI | `wireframe-prototyping` | Interactive assumptions editor wireframe |
| Strategic roadmap UI | `wireframe-prototyping` | Phase-gated milestone timeline wireframe |
| Onboarding flow | `wireframe-prototyping` | Step-by-step welcome experience wireframe |
| Auth setup | `session-start-hook` | Configure SessionStart hook for web |

---

## E. Summary Counts

| Metric | Core | MVP | Post-MVP | Advanced | Production | Total |
|--------|------|-----|----------|----------|------------|-------|
| **Features** | 15 | 20 | 18 | 13 | 12 | **78** |
| **Edge Functions** | 2 | 4 | 4 | 3 | 0 | **13** |
| **DB Migrations** | 3 | 5 | 3 | 0 | 0 | **11** |
| **New Components** | 5 | 12 | 10 | 7 | 3 | **37** |
| **New Pages** | 0 | 2 | 9 | 0 | 1 | **12** |
| **Hooks** | 1 | 3 | 1 | 0 | 0 | **5** |
| **Agents Active** | 2 | 5 | 8 | 11 | 11 | — |
