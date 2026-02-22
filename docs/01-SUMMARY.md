# StartupAI — System Summary

> A plain-English explanation of what we're building, why, and how it all fits together.

---

## What Is StartupAI?

StartupAI is a strategic intelligence platform for AI startup founders. It's not a dashboard with charts — it's a thinking partner that helps founders validate their startup ideas, identify blind spots, and build investor-ready businesses.

Think of it as having a BCG consultant, a Y Combinator mentor, and a data analyst working together inside a chat interface — available 24/7, powered by AI agents.

---

## The Core Experience (In 60 Seconds)

A founder opens StartupAI and starts a conversation:

> "I'm building an AI tool that helps recruiters screen candidates faster. We charge $99/month per seat. We have 12 beta users from my LinkedIn network."

From this single conversation, the system:

1. **Extracts** a structured startup profile (industry, stage, problem, solution, target customer, business model)
2. **Generates** a Lean Canvas — the classic 9-block strategic framework, pre-filled with AI analysis
3. **Scores** 9 validation topics (Problem, Solution, Market, Revenue, Competition, GTM, Team, Traction, Risk) — each scored 0–100
4. **Creates** a validation dashboard showing where the startup is strong, where it's weak, and what to do next
5. **Produces** detail reports for each topic — BCG-style strategic analysis with flow diagrams, benchmarks, and action plans

The founder can then chat to refine anything, run research agents, simulate revenue models, and get a strategic roadmap.

---

## Why This Architecture?

### The Problem With Existing Tools
Most startup tools fall into two camps:
- **Form-fillers** (fill out this canvas, enter these metrics, look at this chart) — boring, static, no intelligence
- **AI chatbots** (ask a question, get an answer) — no structure, no memory, no scoring, no accountability

StartupAI bridges the gap. The chat IS the interface. But behind the chat, structured data flows into canvases, scores, reports, and dashboards automatically. The founder never fills out a form. They just talk.

### Why BCG-Style Reports?
Founders need to think like strategists, not like form-fillers. BCG-style reports do three things:
1. **Create tension** — "Your market is $4B but you have zero evidence of willingness to pay"
2. **Quantify gaps** — Scores and benchmarks, not vibes
3. **Drive action** — Every report ends with "Do this next"

This is what investors expect to see. This is how decisions get made.

---

## The System Flow

```
Chat → Profile → Lean Canvas → Validation Scores → Detail Reports → Dashboard → Actions
  ↑                                                                                   |
  └───────────────── User refines via chat, agents update everything ──────────────────┘
```

Everything loops. The founder chats, the system updates. The system suggests, the founder decides. It's a continuous refinement cycle, not a one-time wizard.

---

## The 9 Validation Topics

These are the core of StartupAI. Each one answers a critical question:

| # | Topic | The Question |
|---|-------|-------------|
| 1 | Problem Validation | Is this a real problem that people urgently need solved? |
| 2 | Solution Validation | Does your solution actually solve the problem? |
| 3 | Market Opportunity | Is the market big enough to build a business? |
| 4 | Revenue Model | Will people pay? How much? How often? |
| 5 | Competitive Landscape | Who else is doing this? What makes you different? |
| 6 | Go-to-Market Strategy | How will you reach your first 1,000 customers? |
| 7 | Team & Execution | Can your team actually build and deliver this? |
| 8 | Traction & Evidence | What proof do you have today? |
| 9 | Risk Assessment | What could kill this startup? |

Each topic gets a score (0–100), sub-scores, a strategic analysis, a flow diagram, benchmarks, and a prioritized action list.

---

## The AI Agents

Agents are specialized AI workers that do specific jobs. They're not one giant chatbot — they're focused tools that the orchestrator calls when needed.

### Core Agents (Built First)
- **Profile Extractor** — Pulls structured data from conversation
- **Canvas Builder** — Generates the 9-block Lean Canvas
- **Validation Scorer** — Scores all 9 topics based on evidence
- **Task Generator** — Creates action items from validation gaps

### Advanced Agents (Built Later)
- **Market Research** — Finds market data, sizing, trends
- **Competition Analyzer** — Maps competitive landscape
- **Revenue Simulator** — Models revenue scenarios
- **Risk Analyzer** — Identifies startup-killing risks
- **Strategic Planner** — Creates roadmaps using best-practice knowledge base

### How They Work Together
The agents chain automatically. When a founder says "We're pivoting to B2B pricing," the Profile Extractor catches the change, Canvas Builder updates the Revenue block, Validation Scorer re-scores Revenue and GTM, and Task Generator suggests new actions. The founder just sees the chat response — the plumbing is invisible.

---

## The Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React + TypeScript + Tailwind + shadcn/ui | Already built, 50+ components ready |
| Backend | Supabase (Postgres + Auth + Edge Functions) | Already configured, 46 table types exist |
| AI | Claude API via Edge Functions | Best reasoning for strategic analysis |
| Vector DB | pgvector (in Supabase) | Startup knowledge base for the Strategic Planner |
| Real-time | Supabase Realtime | Chat updates, score changes, dashboard refresh |

---

## The Delivery Strategy

We're building iteratively, not all at once:

| Phase | What Ships | Timeline |
|-------|-----------|----------|
| **Core** | Chat panel + Profile extraction + Lean Canvas generation | Foundation |
| **MVP** | Validation scoring + Canvas UI + Basic dashboard | First usable product |
| **Post-MVP** | Detail reports + BCG-style visuals + Task system | Full validation experience |
| **Advanced** | Research agents + Revenue simulator + Competition analysis | Intelligence layer |
| **Production** | Strategic planner + Vector DB + Investor readiness + Multi-tenant | Premium product |

Each phase builds on the previous one. Nothing is throwaway. Core wiring established in Phase 1 carries through to Production.

---

## What Already Exists

This is not a greenfield project. Significant work is already done:

- 3-panel layout (nav + content + AI panel) — built and responsive
- 50+ UI components (shadcn/ui) — ready to use
- 20+ page routes — defined and navigable
- 46 database tables — typed (need migration deployment)
- Mock data system — full demo mode working
- Dashboard widgets — KPIs, priorities, risks, actions
- AI panel — stub with mock insights (needs real AI wiring)

The gap is: **no real AI integration, no chat, no canvas, no validation, no agents, no edge functions deployed.**

The existing frontend is the shell. This plan fills it with intelligence.

---

## What Makes This Different

1. **Chat-first, not form-first** — Founders talk, the system structures
2. **Scored, not subjective** — Every claim gets a number backed by evidence
3. **Strategic, not decorative** — BCG-style tension framing, not startup buzzword bingo
4. **Agent-powered, not template-driven** — AI does real analysis, not fill-in-the-blank
5. **Iterative, not one-shot** — Scores evolve as the startup evolves
6. **Investor-grade output** — Reports that a VC would take seriously

---

## How to Read the Docs

### Original Phase Docs (Existing System)
| Doc | What It Covers |
|-----|---------------|
| `00-dashboard-overview.md` | Master implementation plan (original) |
| `01-phase-foundation.md` – `08-phase-polish.md` | Phase-by-phase build plan (original) |
| `PLAN-startup-copilot.md` | Full AI copilot roadmap (original) |
| `ARCHITECTURE-diagrams.md` | 17 Mermaid diagrams (original) |
| `SITEMAP.md` | Routes & architecture reference |
| `EDGE-FUNCTIONS-best-practices.md` | Edge function patterns |

### New Implementation System Docs
| Doc | What It Covers |
|-----|---------------|
| `03-BCG-CHART-ANALYSIS.md` | 12 BCG chart types, when to use each, placement rules |
| `04-VALIDATION-REPORT-ARCHITECTURE.md` | Full report page structure, 9 topics, scoring system, flow diagrams |
| `05-AGENT-SYSTEM-DESIGN.md` | 11 agents — inputs, outputs, triggers, approval gates, collaboration chains |
| `06-VECTOR-DB-STRATEGY.md` | pgvector strategy, RAG pipeline, seeding plan, embedding approach |
| `07-EDGE-FUNCTIONS-DESIGN.md` | 15 edge functions with specs, middleware pattern, rate limits |
| `08-DATABASE-SCHEMA-CHANGES.md` | 9 new tables, 2 table modifications, RLS policies, migration order |
| `09-FRONTEND-BACKEND-WIRING.md` | Hook-by-hook wiring, component trees, data flow sequences |
| `10-PRD.md` | Product requirements — user stories, feature specs, non-functional requirements |
| `11-IMPLEMENTATION-ROADMAP.md` | Core → MVP → Post-MVP → Advanced → Production with task lists |
| `12-PROGRESS-TRACKER.md` | 78 features × agents × pages × skills tracker across all phases |
| `13-WIREFRAME-SPECS.md` | ASCII wireframes for chat, canvas, validation, reports, dashboard |
| `14-IMPROVEMENTS.md` | Strategic recommendations, bonus report sections, BCG-grade principles |
