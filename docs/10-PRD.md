# PART 10 — Product Requirements Document (PRD)

> StartupAI: AI-Powered Startup Validation Platform

---

## 1. Product Vision

**One sentence:** StartupAI turns a founder's raw idea into a BCG-grade validation report through AI conversation, automated scoring, and strategic planning agents.

**The problem:** First-time founders build solutions for problems nobody has, price products nobody will pay for, and target markets that don't exist — because they never validated their assumptions.

**The solution:** A conversational AI that extracts, structures, validates, and reports on every critical aspect of a startup idea. Chat naturally → Lean Canvas → Scored validation → BCG-style reports → Prioritized actions.

---

## 2. Target Users

| Segment | Description | Key Need |
|---------|------------|----------|
| **Primary** | First-time AI startup founders (25–45, technical) | Structured validation they can't afford from consultants |
| **Secondary** | Repeat founders | Scoring + benchmarks across multiple ideas |
| **Tertiary** | Accelerator programs | Bulk cohort assessment and benchmarking |

---

## 3. User Stories

### Chat & Profile
- I can describe my startup in natural language (no forms)
- I can see and correct what the AI extracted before saving
- Conversations persist across sessions
- Suggestion chips guide me on what to discuss next

### Lean Canvas
- Auto-generated canvas from my conversation
- Edit any block directly or via chat
- Confidence levels show what's solid vs speculative
- View previous versions to track thinking evolution

### Validation
- Score (0–100) for each of 9 topics shows strengths/weaknesses
- One-line verdict per score for quick understanding
- Scores update as I validate assumptions over time
- Comparisons against AI startup benchmarks

### Detail Reports
- BCG-style strategic analysis per validation topic
- Visual flow diagrams specific to each topic
- Clear view of what evidence exists vs what's missing
- 3–5 prioritized actions per weak area, addable to task list

### Dashboard
- Overall validation score + trend at a glance
- Heatmap of all 9 topics for pattern recognition
- Top 3 priority actions for today
- Risks requiring attention

### Agents
- Trigger specific research agents from chat
- See agent status while running
- Agent results appear inline in chat
- Approve/reject AI-suggested changes before they're applied
- See what agents are available and what each does

---

## 4. Feature Specs

### 4.1 Chat Panel (Right Side)
- Always visible on desktop (w-80, collapsible)
- Sheet/drawer on mobile
- Persistent across all /app routes
- Context-aware (knows current page)
- Text input + send, message history, suggestion chips
- Agent picker dropdown, status indicator
- Inline action cards (approve/reject)
- Inline agent result cards

### 4.2 Lean Canvas Page (`/app/lean-canvas`)
```
┌──────────────┬──────────┬──────────────┐
│   Problem    │ Solution │   UVP        │
├──────────────┼──────────┼──────────────┤
│   Unfair     │ Customer │   Channels   │
│   Advantage  │ Segments │              │
├──────────────┼──────────┼──────────────┤
│ Cost         │ Key      │   Revenue    │
│ Structure    │ Metrics  │   Streams    │
└──────────────┴──────────┴──────────────┘
```
- Click-to-edit blocks with confidence badges
- "Generate from Profile" / "Accept Canvas" / Version dropdown

### 4.3 Validation Canvas (`/app/validation`)
- Overall score + archetype badge header
- 3×3 grid of scored topic cards (score, verdict, mini-chart)
- Radar chart, heatmap, priority matrix below grid
- "Re-score" button

### 4.4 Detail Reports (`/app/validation/:topic`)
9 pages (problem, solution, market, revenue, competition, gtm, team, traction, risk). Each contains:
1. Tension Header — bold statement + score
2. Flow Diagram — topic-specific visual
3. Score Breakdown — sub-scores as progress bars
4. Executive Analysis — 3–5 paragraphs BCG memo style
5. Evidence Assessment — strong/weak/missing
6. Gap Analysis — ambition vs evidence chart
7. Benchmarks — industry comparisons
8. Priority Actions — with "Add to Tasks"
9. Related Topics — cross-links
10. Bonus Section — topic-specific deep dive

### 4.5 Dashboard (Enhanced `/app/dashboard`)
New: Validation Score Card, Radar Chart, Heatmap, Trend Line, Canvas Completeness.
Keep: Priority Tasks (upgraded), Risk Alerts (upgraded), Quick Actions (context-aware).

---

## 5. The 9 Validation Topics

| # | Topic | Canvas Block | Validates |
|---|-------|-------------|-----------|
| 1 | Problem Validation | Problem | Real, painful, frequent problem? |
| 2 | Solution Validation | Solution | Actually solves the problem? |
| 3 | Market Opportunity | Customer Segments | Big enough, reachable market? |
| 4 | Revenue Model | Revenue Streams | Will people pay? How much? |
| 5 | Competitive Landscape | Unfair Advantage | What's defensible? |
| 6 | Go-to-Market | Channels | How to reach customers at scale? |
| 7 | Team & Execution | (Cross-cutting) | Can this team build and ship? |
| 8 | Traction & Evidence | Key Metrics | What proof exists today? |
| 9 | Risk Assessment | Cost Structure | What kills this startup? |

---

## 6. Scoring System

### Per-Topic Score: 0–100
Calculated from 4–5 weighted sub-scores per topic.

### Overall Score
Weighted average of 9 topic scores:
- Problem 15%, Solution 12%, Market 14%, Revenue 13%
- Competition 10%, GTM 11%, Team 10%, Traction 10%, Risk 5%

### Score Scale
| Range | Label | Color | Meaning |
|-------|-------|-------|---------|
| 0–20 | Critical | Red | Hypothesis only |
| 21–40 | Weak | Orange | Minimal evidence |
| 41–60 | Developing | Amber | Partial evidence |
| 61–80 | Strong | Green | Solid evidence |
| 81–100 | Validated | Blue | Multiple sources confirm |

### Archetype Assignment
- 0–30: **Exploring** — "You have an idea. Let's find out if it's real."
- 31–60: **Validating** — "You're testing assumptions. Keep gathering evidence."
- 61–100: **Scaling** — "You've validated the core. Time to execute."

---

## 7. Non-Functional Requirements

| Metric | Target |
|--------|--------|
| Chat response | < 3 seconds (P95) |
| Agent completion | < 30 seconds (P95) |
| Page load (LCP) | < 2 seconds |
| Uptime | 99.5% monthly |
| Concurrent users | 100 (MVP) |
| Mobile | All pages usable |

---

## 8. Out of Scope (First 3 Phases)

- Multi-user real-time collaboration
- Payments/billing
- Native mobile app
- Email/Slack notifications
- Public report sharing
- External API
- Internationalization
- White-label admin
