# PART 2 — Validation Report Architecture

> Full structure: Chat → Lean Canvas → Validation Canvas → Detail Pages → Dashboard
> BCG-grade executive presentation standards applied

---

## A. System Flow (End-to-End Narrative)

```
Homepage → Chat Panel → Profile Extraction → Lean Canvas (auto-generated)
                                                    ↓
                                           Validation Canvas (scored)
                                                    ↓
                                    ┌───────────────┼───────────────┐
                                    ↓               ↓               ↓
                              Detail Reports   Dashboard      Action Plan
                              (9 deep dives)   (scorecards)   (prioritized tasks)
```

The narrative arc follows BCG's transformation logic:
1. **Discover** — Chat extracts the raw startup story
2. **Structure** — Lean Canvas organizes it into 9 strategic blocks
3. **Assess** — Validation Canvas scores each block against reality
4. **Deep Dive** — Detail Reports provide BCG-style strategic analysis per topic
5. **Act** — Dashboard + Action Plan drive daily execution

---

## B. Page Hierarchy

### Level 0: Entry Point
**Homepage Chat** (`/app/chat` or right panel)
- The user tells their startup story in natural language
- AI extracts structured data progressively
- Suggestions appear as clickable chips: "Tell me about your target customer" / "How do you plan to make money?"
- Result: Enough data to generate Lean Canvas

### Level 1: Lean Canvas
**Route:** `/app/lean-canvas`
- 9 editable blocks auto-populated from chat
- Blocks: Problem, Solution, Unique Value Prop, Unfair Advantage, Customer Segments, Key Metrics, Channels, Cost Structure, Revenue Streams
- Each block is a card with: Title, AI-generated content (editable), Confidence indicator, "Needs more info" flag
- User can edit directly or chat to refine
- Saving triggers validation scoring

### Level 2: Validation Canvas
**Route:** `/app/validation`
- 9 scored validation topics derived from Lean Canvas
- Each topic = one card in a grid layout
- Card structure (BCG-style):
  - Strategic headline (tension statement)
  - Composite score (0–100) with color coding
  - BCG-style mini-chart (contrast percentage or maturity stage)
  - One-line executive verdict
  - "View Details →" link
- Grid layout: 3×3 on desktop, single column on mobile
- Top bar: Overall Validation Score + Startup Archetype badge

### Level 3: Detail Reports
**Route:** `/app/validation/:topic`
- One page per validation topic (9 total)
- Full BCG-style strategic analysis
- Structure defined below in Section D

### Level 4: Dashboard
**Route:** `/app/dashboard`
- Executive scorecard view
- Aggregates all validation data into actionable summary
- Heatmap + Radar chart + Priority actions
- Links back to each detail report and canvas

---

## C. The 9 Validation Topics for AI Startups

These are the main canvas pages for both the Validation Report and the Lean Canvas:

| # | Topic | Lean Canvas Block | What It Validates |
|---|-------|-------------------|-------------------|
| 1 | **Problem Validation** | Problem | Is this a real, painful, frequent problem? |
| 2 | **Solution Validation** | Solution | Does the solution actually solve the problem? |
| 3 | **Market Opportunity** | Customer Segments | Is the market big enough and reachable? |
| 4 | **Revenue Model** | Revenue Streams | Will people pay? How much? How often? |
| 5 | **Competitive Landscape** | Unfair Advantage | What's defensible? Who else is doing this? |
| 6 | **Go-to-Market Strategy** | Channels | How will you reach customers at scale? |
| 7 | **Team & Execution** | (Cross-cutting) | Can this team actually build and ship? |
| 8 | **Traction & Evidence** | Key Metrics | What proof exists today? |
| 9 | **Risk Assessment** | Cost Structure | What kills this startup? Financial, technical, regulatory? |

---

## D. Detail Report Page Structure (Per Topic)

Each of the 9 detail pages follows this BCG-inspired structure:

### Section 1: Strategic Tension Header
- **Bold headline** framing the core tension for this topic
- Example (Revenue): "You're targeting enterprise contracts — but your pricing model assumes self-serve. That's a $2M disconnect."
- **Score badge**: 42/100 with color
- **Archetype indicator**: "Exploring" / "Validating" / "Scaling"
- **Trend arrow**: ↑12 since last assessment (if available)

### Section 2: Visual Flow Diagram
- **Topic-specific flow chart** showing how this aspect works for the startup
- Example (Revenue Model):
  ```
  Free Trial → Onboarding → Paid Plan → Upsell → Enterprise
       ↓            ↓           ↓          ↓          ↓
    1000 users → 200 convert → $49/mo → $199/mo → Custom
       ↓            ↓           ↓          ↓          ↓
      $0         $9,800/mo   $39,800   $19,900    TBD
  ```
- Each flow diagram is specific to the topic (see Section F below)

### Section 3: Scoring Breakdown
- **Composite score** with sub-score decomposition
- Sub-scores (4–5 per topic) shown as horizontal progress bars
- Example (Revenue Model):
  - Pricing Clarity: 65/100
  - Willingness to Pay Evidence: 20/100
  - Unit Economics Viability: 55/100
  - Revenue Diversification: 35/100
  - Scalability of Model: 70/100
- Color coding: 0–30 Red, 31–60 Amber, 61–80 Green, 81–100 Blue

### Section 4: Executive Analysis
- 3–5 paragraphs of strategic analysis written in BCG memo style
- Covers: Current state assessment, Key findings, Strategic implications
- Not generic advice — specific to the startup's data
- Example (Revenue): "Your SaaS model projects $49/mo ARPU across 10,000 users for $5.9M ARR. However, your CAC estimate of $12 implies a channel efficiency that enterprise AI tools have never achieved. The median CAC for B2B AI SaaS is $340 (source: vector DB). Your model requires either 28x better marketing efficiency than industry average, or a fundamental channel rethink."

### Section 5: Evidence Assessment
- What evidence exists to support the validation score
- Organized as:
  - **Strong signals** (customer interviews, LOIs, revenue data)
  - **Weak signals** (market reports, assumptions, analogies)
  - **Missing evidence** (what's needed but not yet gathered)
- Each evidence item has: Source, Strength rating, Date collected

### Section 6: Gap Analysis Visual
- Ambition vs Reality chart (BCG contrast block)
- Shows founder's confidence vs evidence-based score
- The gap size indicates risk level

### Section 7: Benchmarks & Comparisons
- How this startup compares to best practices (from vector DB)
- Industry-specific benchmarks where available
- Archetype comparison: "Startups at your stage typically score 45–55 on this metric"

### Section 8: Priority Actions
- 3–5 specific, actionable next steps ranked by impact
- Each action has:
  - Description
  - Expected impact on score
  - Effort level (Low / Medium / High)
  - Suggested experiment or task
- "Add to Tasks" button on each action

### Section 9: Related Topics
- Links to other validation topics that interact with this one
- Example: Revenue Model links to Market Opportunity (TAM), Go-to-Market (channels), and Risk Assessment (burn rate)

---

## E. Scoring System Design

### Composite Score Formula
Each of the 9 topics gets a composite score (0–100) calculated from weighted sub-scores:

```
Topic Score = Σ (Sub-score_i × Weight_i) / Σ Weight_i
```

### Overall Validation Score
```
Overall = Σ (Topic_i × Topic_Weight_i) / Σ Topic_Weight_i
```

### Topic Weights (for AI startups):
| Topic | Weight | Rationale |
|-------|--------|-----------|
| Problem Validation | 15% | If the problem isn't real, nothing else matters |
| Solution Validation | 12% | Must solve the stated problem |
| Market Opportunity | 14% | Investors screen on market size first |
| Revenue Model | 13% | Must have a path to money |
| Competitive Landscape | 10% | Defensibility matters but less at early stage |
| Go-to-Market | 11% | Reach matters more than most founders think |
| Team & Execution | 10% | Team is a multiplier, not a standalone |
| Traction & Evidence | 10% | Proof beats claims |
| Risk Assessment | 5% | Risk awareness, not risk elimination |

### Sub-Score Sources
Each sub-score comes from one of three sources:
1. **AI-assessed** — Inferred from chat content, lean canvas, and research agent output
2. **Evidence-backed** — Derived from uploaded documents, links, or entered data
3. **Self-reported** — Founder's own confidence (tracked separately to compute gap)

### Score Interpretation Scale
| Range | Label | Color | Meaning |
|-------|-------|-------|---------|
| 0–20 | Critical | Red | No evidence. Hypothesis only. |
| 21–40 | Weak | Orange | Some thinking, minimal evidence |
| 41–60 | Developing | Amber | Partial evidence, gaps remain |
| 61–80 | Strong | Green | Solid evidence, minor gaps |
| 81–100 | Validated | Blue | Multiple evidence sources confirm |

---

## F. Flow Diagrams by Topic

Each validation topic gets a specific type of flow diagram:

### 1. Problem Validation
**Diagram type:** Problem → Impact Chain
```
Root Cause → Symptom → User Pain → Frequency → Severity → Willingness to Change
```
Shows whether the problem is structural or superficial.

### 2. Solution Validation
**Diagram type:** Solution Architecture Flow
```
User Need → Feature → Mechanism → Outcome → Proof Point
```
Maps solution components to validated outcomes.

### 3. Market Opportunity
**Diagram type:** TAM → SAM → SOM Funnel
```
Total Addressable Market ($XB)
  → Serviceable Addressable Market ($XM)
    → Serviceable Obtainable Market ($XM)
      → Year 1 Target ($XK)
```
Classic market sizing funnel with specific numbers.

### 4. Revenue Model
**Diagram type:** Revenue Engine Flow
```
Acquisition → Activation → Revenue → Retention → Expansion
    ↓              ↓           ↓          ↓           ↓
  [CAC]        [Conv %]     [ARPU]     [Churn]     [NRR]
```
Shows the revenue machine with key unit economics at each stage.

### 5. Competitive Landscape
**Diagram type:** Positioning Map (2×2)
```
Y-axis: AI Sophistication (Low → High)
X-axis: Market Focus (Niche → Broad)
Plot: Your Startup vs 3–5 competitors
```
Strategic positioning visualization.

### 6. Go-to-Market Strategy
**Diagram type:** Channel Flow Diagram
```
Awareness → Interest → Trial → Conversion → Advocacy
   ↓           ↓        ↓         ↓            ↓
[Content]  [Demo]   [Free]   [Sales]     [Referral]
[Paid]     [Event]  [Trial]  [Self-serve] [Community]
```
Maps GTM channels to funnel stages.

### 7. Team & Execution
**Diagram type:** Capability Coverage Map
```
┌──────────┬──────────┬──────────┬──────────┐
│ Technical │ Product  │ Business │ Domain   │
│ ████████ │ ██████░░ │ ████░░░░ │ ██░░░░░░ │
│ Strong   │ Moderate │ Gap      │ Critical │
└──────────┴──────────┴──────────┴──────────┘
```
Shows team strengths and hiring gaps.

### 8. Traction & Evidence
**Diagram type:** Evidence Ladder
```
Level 5: Revenue/Contracts     [  ]
Level 4: LOIs/Commitments      [  ]
Level 3: Pilot Users           [██]  ← You are here
Level 2: Waitlist/Interest     [██]
Level 1: Problem Interviews    [██]
```
Shows where the startup sits on the evidence hierarchy.

### 9. Risk Assessment
**Diagram type:** Risk Matrix (Likelihood × Impact)
```
           Low Impact    Medium Impact    High Impact
High Prob  │ Monitor    │ Mitigate       │ CRITICAL   │
Med Prob   │ Accept     │ Monitor        │ Mitigate   │
Low Prob   │ Accept     │ Accept         │ Monitor    │
```
Standard risk heat map with startup-specific risks plotted.

---

## G. Narrative Progression Rules

### BCG Narrative Arc (Applied to StartupAI)

1. **Open with tension** — Every page starts with what's at stake
2. **Quantify the gap** — Numbers, not feelings
3. **Show the pattern** — Where does this startup fit in the landscape
4. **Isolate the lever** — What single action moves the score most
5. **Close with action** — Every page ends with "Do this next"

### Where Each Element Appears

| Element | Location | Purpose |
|---------|----------|---------|
| Strategic tension headline | Detail report Section 1 | Emotional hook |
| Flow diagram | Detail report Section 2 | Visual comprehension |
| Composite + sub-scores | Detail report Section 3, Validation Canvas cards | Quantification |
| Executive description | Detail report Section 4, Canvas card one-liner | Strategic context |
| Evidence section | Detail report Section 5 | Credibility |
| Gap analysis | Detail report Section 6, Canvas card mini-chart | Urgency driver |
| Benchmarks | Detail report Section 7 | Calibration |
| Priority actions | Detail report Section 8, Dashboard action list | Next steps |
| Infographic/flow | Detail report Section 2, Dashboard radar | Pattern recognition |

---

## H. Additional Sections Suggested for Each Detail Page

Beyond the core 9 sections, each topic gets 1–2 topic-specific bonus sections:

| Topic | Bonus Section | Content |
|-------|--------------|---------|
| Problem | "Voice of Customer" | Key quotes from interviews or research |
| Solution | "Technical Feasibility" | AI model requirements, data needs, build complexity |
| Market | "Market Timing Analysis" | Why now? What's changed? Regulatory, tech, behavioral shifts |
| Revenue | "Unit Economics Deep Dive" | LTV/CAC breakdown with sensitivity analysis |
| Competition | "Moat Assessment" | Network effects, data advantages, switching costs |
| GTM | "Channel Economics" | Cost per acquisition by channel with projections |
| Team | "Hiring Roadmap" | Critical hires by phase with salary benchmarks |
| Traction | "Experiment Log" | All experiments run, results, learnings |
| Risk | "Scenario Planning" | Best case / Base case / Worst case with triggers |
