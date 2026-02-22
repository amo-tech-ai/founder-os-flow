# PART 11 — Implementation Roadmap

> Core → MVP → Post-MVP → Advanced → Production
> Each phase is independently shippable

---

## Phase 1: CORE (Weeks 1–2)

**Goal:** Chat works. Profile extraction works. Users can converse and see extracted data.

### Backend Tasks
| # | Task | Type |
|---|------|------|
| 1 | Create `chat_conversations` table | Migration |
| 2 | Create `chat_messages` table | Migration |
| 3 | ALTER `startups` (add profile fields) | Migration |
| 4 | RLS policies for chat tables | Migration |
| 5 | Deploy `_shared/cors.ts` | Edge utility |
| 6 | Deploy `_shared/auth.ts` | Edge utility |
| 7 | Deploy `_shared/claude.ts` | Edge utility |
| 8 | Deploy `chat` edge function | Edge function |
| 9 | Deploy `dashboard-summary` edge function | Edge function |

### Frontend Tasks
| # | Task | Type |
|---|------|------|
| 10 | Build `ChatPanel.tsx` (replaces AIPanel) | Component |
| 11 | Build `ChatMessages.tsx` | Component |
| 12 | Build `ChatInput.tsx` | Component |
| 13 | Build `SuggestionChips.tsx` | Component |
| 14 | Create `useChat` hook | Hook |
| 15 | Update `AppShell.tsx` (swap AIPanel → ChatPanel) | Modification |
| 16 | Update `DashboardNav.tsx` (add new nav items) | Modification |
| 17 | Wire `useDashboard` to edge function | Hook upgrade |
| 18 | Supabase Auth setup | Config |

### Acceptance Criteria
- [ ] User can sign up and log in
- [ ] User can type in chat panel and receive AI response
- [ ] AI extracts startup profile from conversation
- [ ] Extracted fields shown as confirmation cards
- [ ] User confirms/edits before saving
- [ ] Profile saved to `startups` table
- [ ] Suggestion chips after each response
- [ ] Chat history persists across sessions
- [ ] Dashboard shows real data or empty states

---

## Phase 2: MVP (Weeks 3–4)

**Goal:** Full flow: Chat → Canvas → Validation → Dashboard with real scores.

### Backend Tasks
| # | Task | Type |
|---|------|------|
| 1 | Create `lean_canvas_versions` table | Migration |
| 2 | Create `lean_canvas_blocks` table | Migration |
| 3 | Create `validation_reports` table | Migration |
| 4 | Create `validation_topic_scores` table | Migration |
| 5 | Create `agent_runs` table | Migration |
| 6 | Deploy `canvas-generate` edge function | Edge function |
| 7 | Deploy `validation-score` edge function | Edge function |
| 8 | Deploy `task-generate` edge function | Edge function |
| 9 | Deploy `ai-insights` edge function | Edge function |
| 10 | RLS for all new tables | Migration |

### Frontend Tasks
| # | Task | Type |
|---|------|------|
| 11 | Build `LeanCanvas.tsx` page | Page |
| 12 | Build `CanvasBlock.tsx` (editable) | Component |
| 13 | Build `ValidationCanvas.tsx` page | Page |
| 14 | Build `ValidationCard.tsx` | Component |
| 15 | Build `ValidationRadar.tsx` (recharts) | Component |
| 16 | Build `ValidationHeatmap.tsx` | Component |
| 17 | Build `ScoreBadge.tsx` | Component |
| 18 | Build `AgentStatusIndicator.tsx` | Component |
| 19 | Build `ActionCards.tsx` (approve/reject) | Component |
| 20 | Create `useCanvas` hook | Hook |
| 21 | Create `useValidation` hook | Hook |
| 22 | Create `useAgentStatus` hook | Hook |
| 23 | Add routes: /app/lean-canvas, /app/validation | Router |

### Acceptance Criteria
- [ ] Lean canvas generated from profile
- [ ] 9 blocks with confidence indicators
- [ ] Inline block editing
- [ ] Canvas accept locks version, triggers scoring
- [ ] 9 topic scores on validation canvas
- [ ] Radar chart renders all 9 scores
- [ ] Heatmap shows topics × dimensions
- [ ] Overall score + archetype badge
- [ ] Tasks generated from validation gaps
- [ ] Agent status visible in chat during scoring

---

## Phase 3: POST-MVP (Weeks 5–7)

**Goal:** BCG-style detail reports, research agents, knowledge base.

### Backend Tasks
| # | Task | Type |
|---|------|------|
| 1 | Create `detail_reports` table | Migration |
| 2 | Create `knowledge_base` table + pgvector | Migration |
| 3 | Create `match_knowledge` RPC function | DB function |
| 4 | Seed knowledge base (50 core chunks) | Data seed |
| 5 | Deploy `_shared/embeddings.ts` | Edge utility |
| 6 | Deploy `vector-search` edge function | Edge function |
| 7 | Deploy `vector-ingest` edge function | Edge function |
| 8 | Deploy `report-generate` edge function | Edge function |
| 9 | Deploy `market-research` edge function | Edge function |
| 10 | Deploy `competition-analyze` edge function | Edge function |

### Frontend Tasks
| # | Task | Type |
|---|------|------|
| 11 | Build `DetailReport.tsx` page | Page |
| 12 | Build `TensionHeader.tsx` | Component |
| 13 | Build `FlowDiagram.tsx` (topic-specific) | Component |
| 14 | Build `ScoreBreakdown.tsx` | Component |
| 15 | Build `ExecutiveAnalysis.tsx` | Component |
| 16 | Build `EvidenceAssessment.tsx` | Component |
| 17 | Build `GapAnalysis.tsx` (chart) | Component |
| 18 | Build `BenchmarkComparison.tsx` | Component |
| 19 | Build `PriorityActions.tsx` | Component |
| 20 | Build `AgentPicker.tsx` (in chat) | Component |
| 21 | Create `useDetailReport` hook | Hook |
| 22 | Add route: /app/validation/:topic | Router |
| 23 | Enhance dashboard with trend + stacked charts | Dashboard |

### Acceptance Criteria
- [ ] 9 detail report pages with all sections
- [ ] Flow diagrams render per topic type
- [ ] Knowledge base seeded (50+ chunks)
- [ ] Vector search returns relevant results (>0.7)
- [ ] Market research agent triggerable from chat
- [ ] Competition analyzer triggerable from chat
- [ ] Agent results inline in chat
- [ ] Reports generate in < 30 seconds
- [ ] "Add to Tasks" works from detail reports

---

## Phase 4: ADVANCED (Weeks 8–10)

**Goal:** Revenue simulation, risk analysis, strategic planning, full agent ecosystem.

### Backend Tasks
| # | Task | Type |
|---|------|------|
| 1 | Seed knowledge base (+580 chunks → 630 total) | Data seed |
| 2 | Deploy `revenue-simulate` edge function | Edge function |
| 3 | Deploy `risk-analyze` edge function | Edge function |
| 4 | Deploy `strategic-plan` edge function | Edge function |
| 5 | Weekly cron: auto re-score | Scheduled |
| 6 | Weekly cron: planning brief | Scheduled |

### Frontend Tasks
| # | Task | Type |
|---|------|------|
| 7 | Build revenue simulation UI | Component |
| 8 | Build risk matrix visualization | Component |
| 9 | Build strategic roadmap timeline | Component |
| 10 | Build investor readiness score | Component |
| 11 | Build canvas version diff view | Component |
| 12 | Build trend line charts | Component |
| 13 | Multi-agent chain support in chat | Enhancement |

### Acceptance Criteria
- [ ] Revenue sim with editable assumptions + 3 scenarios
- [ ] Risk matrix with identified risks plotted
- [ ] Strategic plan with 6-month milestones
- [ ] Weekly auto re-scoring functional
- [ ] Canvas version diff shows changes
- [ ] Score trends with 3+ data points
- [ ] All 9 agents available from chat picker

---

## Phase 5: PRODUCTION (Weeks 11–13)

**Goal:** Polish, performance, security, monitoring, launch.

### Infrastructure
| # | Task |
|---|------|
| 1 | Rate limiting on all edge functions |
| 2 | Error monitoring (Sentry or similar) |
| 3 | Performance monitoring (latency, queries) |
| 4 | Security audit (RLS, API keys, XSS) |
| 5 | Load testing (100 concurrent users) |

### UX Polish
| # | Task |
|---|------|
| 6 | First-run onboarding flow |
| 7 | Empty states for all pages |
| 8 | Loading skeletons |
| 9 | Error states + retry UX |
| 10 | Mobile optimization pass |
| 11 | Cmd+K command palette |

### Content
| # | Task |
|---|------|
| 12 | Knowledge base complete (630 chunks) |
| 13 | Scoring rubric refinement |
| 14 | Report template polish |
| 15 | Sample startup walkthrough (demo mode) |

### Acceptance Criteria
- [ ] No P0 bugs
- [ ] All pages < 2s LCP
- [ ] Chat < 3s response (P95)
- [ ] Agents < 30s completion (P95)
- [ ] Mobile fully functional
- [ ] Onboarding guides new users end-to-end
- [ ] Error handling covers all failure modes
- [ ] Security audit passed

---

## Dependency Chain

```
CORE ───► MVP ───► POST-MVP ───► ADVANCED ───► PRODUCTION
Auth       Canvas     Reports      Revenue Sim   Polish
Chat       Scoring    Vector DB    Risk Analysis  Security
Profile    Tasks      Research     Planning       Monitoring
                      Agents       Full KB        Launch
```

**User value at each stage:**
- **Core:** "AI understands my startup"
- **MVP:** "My idea is structured and scored"
- **Post-MVP:** "BCG-quality analysis + market research"
- **Advanced:** "Full strategic planning system"
- **Production:** "Professional daily tool"

---

## Risk Mitigation

| Phase | Risk | Mitigation |
|-------|------|------------|
| Core | Claude API reliability | Retry logic, graceful error states |
| MVP | Scoring accuracy | Simple rubrics first, iterate on feedback |
| Post-MVP | Vector DB relevance | Hand-curate chunks, measure retrieval quality |
| Advanced | Agent cost per user | Cache aggressively, detect score changes before re-running |
| Production | Scale issues | Monitor edge function cold starts, optimize queries |
