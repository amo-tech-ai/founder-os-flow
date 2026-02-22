# PART 13 — Wireframe Specifications

> ASCII wireframes for every new page and major component
> Use `wireframe-prototyping` skill for detailed design

---

## 1. Chat Panel (Right Side — Replaces AIPanel)

```
┌──────────────────────────────────┐
│  🤖 StartupAI Chat    [⚙️] [✕]  │
├──────────────────────────────────┤
│                                  │
│  ┌────────────────────────────┐  │
│  │ Welcome! Tell me about    │  │
│  │ your startup idea. I'll   │  │
│  │ help you validate it.     │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ 👤 We're building an AI   │  │
│  │ tool that helps founders  │  │
│  │ validate their ideas...   │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ 🤖 Great! I extracted:    │  │
│  │                            │  │
│  │ ┌──────────────────────┐  │  │
│  │ │ Industry: AI/SaaS    │  │  │
│  │ │ Target: Founders     │  │  │
│  │ │ Model: SaaS          │  │  │
│  │ │ [✓ Confirm] [✏ Edit] │  │  │
│  │ └──────────────────────┘  │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌─────────┐ ┌──────────────┐   │
│  │ Pricing │ │ Target users │   │
│  └─────────┘ └──────────────┘   │
│  ┌───────────────┐               │
│  │ Gen. Canvas 🎯│               │
│  └───────────────┘               │
│                                  │
├──────────────────────────────────┤
│ Agent: [▾ Select Agent]          │
├──────────────────────────────────┤
│ ┌────────────────────────┐ [➤]  │
│ │ Type a message...      │      │
│ └────────────────────────┘      │
└──────────────────────────────────┘
```

**Key UX patterns:**
- User messages right-aligned (dark bg)
- AI messages left-aligned (light bg)
- Extraction cards inline with confirm/edit buttons
- Suggestion chips below last AI message
- Agent picker above input
- Status indicator when agent is running

---

## 2. Lean Canvas Page

```
┌─────────────────────────────────────────────────────────────────┐
│  Lean Canvas                          v2 (draft) ▾  │ Accept │  │
│  Last edited 2 hours ago                │ Generate │ │ Export │  │
├────────────────────┬────────────────────┬────────────────────────┤
│                    │                    │                        │
│  PROBLEM           │  SOLUTION          │  UNIQUE VALUE PROP     │
│  ─────────         │  ──────────        │  ──────────────────    │
│  AI startups lack  │  Conversational    │  BCG-grade validation  │
│  structured valid- │  AI that extracts  │  reports through       │
│  ation frameworks  │  and scores every  │  natural conversation  │
│                    │  assumption...     │                        │
│  Confidence: 🟡Med │  Confidence: 🟢Hi │  Confidence: 🔴Low     │
│  ⚠ Needs evidence  │  ✓ Validated      │  ⚠ Needs evidence      │
│  [Edit]            │  [Edit]            │  [Edit]                │
│                    │                    │                        │
├────────────────────┼────────────────────┼────────────────────────┤
│                    │                    │                        │
│  UNFAIR ADVANTAGE  │  CUSTOMER SEGMENTS │  CHANNELS              │
│  ─────────────────  │  ─────────────────│  ──────────            │
│  Vector DB of      │  First-time AI     │  Product-led growth    │
│  startup best      │  startup founders  │  + accelerator         │
│  practices...      │  ages 25-45...     │  partnerships...       │
│                    │                    │                        │
│  Confidence: 🔴Low │  Confidence: 🟡Med │  Confidence: 🔴Low     │
│  [Edit]            │  [Edit]            │  [Edit]                │
│                    │                    │                        │
├────────────────────┼────────────────────┼────────────────────────┤
│                    │                    │                        │
│  COST STRUCTURE    │  KEY METRICS       │  REVENUE STREAMS       │
│  ───────────────   │  ────────────      │  ────────────────      │
│  Claude API costs  │  Validation score  │  SaaS subscription     │
│  Supabase hosting  │  completion rate   │  $49/mo individual     │
│  Engineering...    │  User retention... │  $199/mo team...       │
│                    │                    │                        │
│  Confidence: 🟡Med │  Confidence: 🔴Low │  Confidence: 🟡Med     │
│  [Edit]            │  [Edit]            │  [Edit]                │
│                    │                    │                        │
└────────────────────┴────────────────────┴────────────────────────┘
```

**Key UX patterns:**
- 3×3 grid matching standard Lean Canvas layout
- Click any block to enter edit mode (inline textarea)
- Confidence badges: 🔴 Low / 🟡 Medium / 🟢 High
- Warning flags on blocks needing validation
- Version dropdown top-right
- "Generate" re-runs canvas builder from profile
- "Accept" locks the version and enables scoring

---

## 3. Validation Canvas Page

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  Overall Validation Score: 47/100        🟡 VALIDATING   │    │
│  │  ↑5 since last assessment    [Re-score]  Last: 3d ago    │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌──────────────────┬──────────────────┬──────────────────┐      │
│  │                  │                  │                  │      │
│  │  PROBLEM    72   │  SOLUTION   58   │  MARKET     35   │      │
│  │  ████████░░      │  ██████░░░░      │  ████░░░░░░      │      │
│  │  "Strong problem │  "Solution fits  │  "Market size    │      │
│  │   evidence from  │   but unproven   │   unverified.    │      │
│  │   12 interviews" │   at scale"      │   No TAM data."  │      │
│  │  You: 72 │ 78 Avg│  You: 58 │ 65 Avg│  You: 35 │ 55 Avg│      │
│  │  [View Details→] │  [View Details→] │  [View Details→] │      │
│  │                  │                  │                  │      │
│  ├──────────────────┼──────────────────┼──────────────────┤      │
│  │                  │                  │                  │      │
│  │  REVENUE   42    │  COMPETITION 55  │  GTM        28   │      │
│  │  █████░░░░░      │  ██████░░░░      │  ███░░░░░░░      │      │
│  │  "Pricing model  │  "Differentiated │  "No channel     │      │
│  │   untested.      │   but moat is    │   strategy       │      │
│  │   No WTP data."  │   unclear."      │   defined."      │      │
│  │  You: 42 │ 50 Avg│  You: 55 │ 48 Avg│  You: 28 │ 45 Avg│      │
│  │  [View Details→] │  [View Details→] │  [View Details→] │      │
│  │                  │                  │                  │      │
│  ├──────────────────┼──────────────────┼──────────────────┤      │
│  │                  │                  │                  │      │
│  │  TEAM       65   │  TRACTION   32   │  RISK       50   │      │
│  │  ███████░░░      │  ████░░░░░░      │  ██████░░░░      │      │
│  │  "Technical team │  "Pre-revenue.   │  "Moderate risk  │      │
│  │   strong, biz    │   Waitlist only.  │   profile. AI    │      │
│  │   dev gap."      │   No pilots."    │   cost concerns." │      │
│  │  You: 65 │ 60 Avg│  You: 32 │ 40 Avg│  You: 50 │ 52 Avg│      │
│  │  [View Details→] │  [View Details→] │  [View Details→] │      │
│  │                  │                  │                  │      │
│  └──────────────────┴──────────────────┴──────────────────┘      │
│                                                                  │
│  ┌──────────────────────────┐ ┌──────────────────────────┐      │
│  │  RADAR CHART             │ │  HEATMAP                 │      │
│  │       Problem            │ │           Evid Risk Urg  │      │
│  │         ╱╲               │ │  Problem  🟢   🟡   🔴   │      │
│  │   Risk ╱  ╲ Solution     │ │  Solution 🟡   🟡   🟡   │      │
│  │       ╱ 47 ╲             │ │  Market   🔴   🔴   🔴   │      │
│  │  Tract╲    ╱Market       │ │  Revenue  🔴   🟡   🔴   │      │
│  │        ╲  ╱              │ │  Compete  🟡   🟡   🟡   │      │
│  │    Team ╲╱ Revenue       │ │  GTM      🔴   🔴   🔴   │      │
│  │       GTM                │ │  Team     🟢   🟡   🟡   │      │
│  │        Compete           │ │  Traction 🔴   🔴   🔴   │      │
│  │                          │ │  Risk     🟡   🟡   🟡   │      │
│  └──────────────────────────┘ └──────────────────────────┘      │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Key UX patterns:**
- Header: composite score + archetype badge + trend + re-score button
- 3×3 grid of validation cards
- Each card: score bar, verdict, benchmark comparison, details link
- Below grid: radar chart (recharts) + heatmap matrix
- Color coding: 0-20 Red, 21-40 Orange, 41-60 Amber, 61-80 Green, 81-100 Blue

---

## 4. Detail Report Page (Example: Revenue Model)

```
┌──────────────────────────────────────────────────────────────────┐
│  ← Back to Validation                                            │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  REVENUE MODEL                              Score: 42    │    │
│  │  ████████████████████░░░░░░░░░░░░░░░░░░░░░░  🟠 Weak     │    │
│  │                                                          │    │
│  │  "You're targeting enterprise contracts — but your       │    │
│  │   pricing model assumes self-serve. That's a $2M         │    │
│  │   disconnect."                                           │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ── REVENUE ENGINE FLOW ──────────────────────────────────────   │
│                                                                  │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌─────────┐  │
│   │Awareness │ →  │  Trial   │ →  │  Paid    │ →  │ Upsell  │  │
│   │ (1000)   │    │  (200)   │    │  (80)    │    │  (20)   │  │
│   │ $0 CAC   │    │ 20% conv │    │ $49/mo   │    │ $199/mo │  │
│   └──────────┘    └──────────┘    └──────────┘    └─────────┘  │
│        ↓               ↓               ↓              ↓        │
│    $0/mo           $0/mo          $3,920/mo      $3,980/mo     │
│                                                                  │
│  ── SCORING BREAKDOWN ────────────────────────────────────────   │
│                                                                  │
│  Pricing Clarity          ████████████████░░░░  65/100           │
│  Willingness to Pay       ████░░░░░░░░░░░░░░░░  20/100           │
│  Unit Economics           ████████████░░░░░░░░  55/100           │
│  Revenue Diversification  ████████░░░░░░░░░░░░  35/100           │
│  Scalability              ██████████████████░░  70/100           │
│                                                                  │
│  ── EXECUTIVE ANALYSIS ───────────────────────────────────────   │
│                                                                  │
│  Your SaaS model projects $49/mo ARPU across 10,000 users       │
│  for $5.9M ARR. However, your CAC estimate of $12 implies       │
│  channel efficiency that enterprise AI tools have never          │
│  achieved. The median CAC for B2B AI SaaS is $340. Your         │
│  model requires either 28x better marketing efficiency or       │
│  a fundamental channel rethink...                                │
│                                                                  │
│  ── EVIDENCE ASSESSMENT ──────────────────────────────────────   │
│                                                                  │
│  ✅ Strong: Competitor pricing research (3 sources)              │
│  ✅ Strong: Market salary benchmarks for team costs              │
│  🟡 Weak:  Revenue projection based on assumptions              │
│  🟡 Weak:  CAC estimate from industry average (not validated)   │
│  ❌ Missing: Customer willingness-to-pay interviews              │
│  ❌ Missing: Pilot pricing experiment results                    │
│                                                                  │
│  ── GAP ANALYSIS ─────────────────────────────────────────────   │
│                                                                  │
│  Your confidence: ████████████████████████  85                   │
│  Evidence score:  ████████████░░░░░░░░░░░░  42                   │
│  Gap: 43 points — This is your 2nd highest-risk assumption       │
│                                                                  │
│  ── BENCHMARKS ───────────────────────────────────────────────   │
│                                                                  │
│  │ Metric        │ You     │ Median  │ Top 25% │                │
│  │ ARPU          │ $49     │ $85     │ $200+   │                │
│  │ CAC           │ $12*    │ $340    │ $180    │                │
│  │ LTV/CAC       │ 48x*    │ 3.2x   │ 5x+    │                │
│  │ Churn (mo)    │ Unknown │ 5.2%   │ 2.1%   │                │
│  │ * = unvalidated assumption                  │                │
│                                                                  │
│  ── PRIORITY ACTIONS ─────────────────────────────────────────   │
│                                                                  │
│  1. 🔴 Run willingness-to-pay interviews (5 customers)          │
│     Impact: +15 on score │ Effort: Medium │ [Add to Tasks]      │
│                                                                  │
│  2. 🟠 Test pricing with landing page A/B experiment             │
│     Impact: +10 on score │ Effort: Low    │ [Add to Tasks]      │
│                                                                  │
│  3. 🟡 Calculate real CAC from your first 50 signups             │
│     Impact: +8 on score  │ Effort: Low    │ [Add to Tasks]      │
│                                                                  │
│  ── RELATED TOPICS ───────────────────────────────────────────   │
│  → Market Opportunity (TAM informs revenue ceiling)              │
│  → Go-to-Market (channel choice drives CAC)                      │
│  → Risk Assessment (burn rate depends on revenue timeline)       │
│                                                                  │
│  ── UNIT ECONOMICS DEEP DIVE (Bonus Section) ────────────────   │
│                                                                  │
│  LTV Calculation:          │ Sensitivity Analysis:               │
│  ARPU × Gross Margin ×    │ If churn = 3%: LTV = $1,307        │
│  (1 / Monthly Churn)      │ If churn = 5%: LTV = $784          │
│  = $49 × 0.80 × (1/0.05) │ If churn = 8%: LTV = $490          │
│  = $784 (estimated)       │ Break-even CAC = $261               │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. Enhanced Dashboard

```
┌──────────────────────────────────────────────────────────────────┐
│  Dashboard                                      Good morning ☀️  │
│                                                                  │
│  ┌────────────┬────────────┬────────────┬────────────┬────────┐  │
│  │ Validation │ Canvas     │ Tasks Done │ Active     │ Days   │  │
│  │ Score      │ Complete   │            │ Agents     │ Active │  │
│  │   47/100   │   78%      │  12/28     │  3 today   │  14    │  │
│  │   ↑5       │   ↑11%     │  ↑4 today  │            │        │  │
│  └────────────┴────────────┴────────────┴────────────┴────────┘  │
│                                                                  │
│  ┌──────────────────────────────┐  ┌──────────────────────────┐  │
│  │  TOP PRIORITIES              │  │  RISKS                   │  │
│  │                              │  │                          │  │
│  │  🔴 Run WTP interviews      │  │  🔴 No revenue evidence  │  │
│  │     Revenue: +15 on score   │  │     Score: 42 (Weak)     │  │
│  │                              │  │                          │  │
│  │  🟠 Define GTM channels     │  │  🟠 GTM undefined        │  │
│  │     GTM: +20 on score       │  │     Score: 28 (Critical) │  │
│  │                              │  │                          │  │
│  │  🟡 Collect traction data   │  │  🟡 No traction proof    │  │
│  │     Traction: +12 on score  │  │     Score: 32 (Weak)     │  │
│  │                              │  │                          │  │
│  └──────────────────────────────┘  └──────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────┐  ┌──────────────────────────┐  │
│  │  VALIDATION RADAR            │  │  SCORE HEATMAP           │  │
│  │       Problem                │  │         Ev  Ri  Ur  Im   │  │
│  │         ╱╲                   │  │  Prob   🟢  🟡  🔴  🟢   │  │
│  │   Risk ╱  ╲ Solution         │  │  Soln   🟡  🟡  🟡  🟢   │  │
│  │       ╱ 47 ╲                 │  │  Mkt    🔴  🔴  🔴  🟢   │  │
│  │  Trac ╲    ╱ Market          │  │  Rev    🔴  🟡  🔴  🟢   │  │
│  │        ╲  ╱                  │  │  Comp   🟡  🟡  🟡  🟡   │  │
│  │    Team ╲╱ Revenue           │  │  GTM    🔴  🔴  🔴  🟢   │  │
│  │      GTM   Compete           │  │  Team   🟢  🟡  🟡  🟢   │  │
│  └──────────────────────────────┘  └──────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  QUICK ACTIONS                                           │    │
│  │  [📊 View Validation] [📝 Edit Canvas] [💬 Chat]        │    │
│  │  [🔍 Run Research]   [📋 View Tasks]                    │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 6. Full 3-Panel Layout with Chat

```
┌──────────────────────────────────────────────────────────────────────────┐
│  StartupAI                                    Alex Chen  ▾     🔔  ⚙️   │
├────────────┬───────────────────────────────────────────┬─────────────────┤
│            │                                           │                 │
│ 📊 Dash    │   (Any page content renders here)         │  🤖 Chat       │
│ 📝 Canvas  │                                           │                 │
│ ✓ Valid.   │   Dashboard / Canvas / Validation /       │  Messages...    │
│ 📋 Tasks   │   Detail Reports / etc.                   │                 │
│ 📁 Projects│                                           │  Suggestions... │
│ 👥 Contacts│                                           │                 │
│ 💰 Deals   │                                           │  Agent picker   │
│            │                                           │                 │
│ ─────────  │                                           │  [Type here...] │
│ 👤 Profile │                                           │                 │
│ ⚙️ Settings│                                           │                 │
│            │                                           │                 │
├────────────┤                                           │                 │
│  w-64      │              flex-1                       │     w-80        │
└────────────┴───────────────────────────────────────────┴─────────────────┘
```

---

## 7. Mobile Responsive Layouts

### Mobile Chat (Sheet/Drawer)
```
┌────────────────────┐
│ StartupAI    [☰][💬]│  ← Hamburger nav + Chat toggle
├────────────────────┤
│                    │
│  (Page content     │
│   full width)      │
│                    │
│                    │
│                    │
└────────────────────┘

When 💬 tapped:
┌────────────────────┐
│ Chat         [✕]   │
├────────────────────┤
│ Message history    │
│ ...                │
│ ...                │
│ [Suggestions]      │
├────────────────────┤
│ [Type here...] [➤] │
└────────────────────┘
```

### Mobile Validation Cards (Single Column)
```
┌────────────────────┐
│ Overall: 47  🟡     │
├────────────────────┤
│ Problem       72   │
│ ████████████░░░░   │
│ "Strong evidence"  │
│ [View Details →]   │
├────────────────────┤
│ Solution      58   │
│ ██████████░░░░░░   │
│ "Unproven..."      │
│ [View Details →]   │
├────────────────────┤
│ (continues...)     │
└────────────────────┘
```
