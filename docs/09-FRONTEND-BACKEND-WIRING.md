# PART 9 — Frontend-Backend Wiring Plan

> How every React component connects to Supabase and Edge Functions
> Component → Hook → API → Database mapping

---

## A. Wiring Architecture

```
┌─────────────────────────────────────────────────┐
│               REACT COMPONENTS                   │
│  Pages, Widgets, Panels                          │
└──────────────────────┬──────────────────────────┘
                       │ Props / State
┌──────────────────────┴──────────────────────────┐
│               CUSTOM HOOKS                       │
│  useChat, useCanvas, useValidation, useDashboard │
│  Encapsulate all data fetching + mutations       │
└──────────────────────┬──────────────────────────┘
                       │ TanStack Query
┌──────────────────────┴──────────────────────────┐
│               API LAYER                          │
│  supabase.from('table')    → Direct DB queries   │
│  supabase.functions.invoke → Edge function calls │
│  supabase.channel          → Realtime subs       │
└──────────────────────┬──────────────────────────┘
                       │ HTTP / WebSocket
┌──────────────────────┴──────────────────────────┐
│               SUPABASE BACKEND                   │
│  PostgREST (CRUD) │ Edge Functions │ Realtime    │
└───────────────────┴──────────────┴──────────────┘
```

---

## B. Hook-by-Hook Wiring

### 1. `useChat` — Chat Panel

**File:** `src/hooks/useChat.ts`

**Manages:** Active conversation, message history, sending messages (optimistic UI), AI responses, suggestion chips, agent run status.

**Connections:**
```
ChatPanel.tsx
  → useChat()
    → supabase.from('chat_conversations')   // Load/create
    → supabase.from('chat_messages')         // History
    → supabase.functions.invoke('chat')      // Send + AI response
    → supabase.channel('chat:{conv_id}')     // Realtime updates
```

**Query Keys:**
```typescript
['chat', 'conversations', orgId]
['chat', 'messages', conversationId]
['chat', 'active']
```

**Mutations:**
```typescript
useMutation('sendMessage')          // POST to chat edge function
useMutation('createConversation')   // New conversation
useMutation('archiveConversation')  // Archive old
```

---

### 2. `useCanvas` — Lean Canvas

**File:** `src/hooks/useCanvas.ts`

**Manages:** Current canvas version, all 9 blocks with edit state, generation trigger, version history, block-level save.

**Connections:**
```
LeanCanvas.tsx + CanvasBlock.tsx
  → useCanvas(startupId)
    → supabase.from('lean_canvas_versions')
    → supabase.from('lean_canvas_blocks')
    → supabase.functions.invoke('canvas-generate')
```

**Query Keys:**
```typescript
['canvas', startupId]
['canvas', 'versions', startupId]
['canvas', 'blocks', canvasVersionId]
```

**Mutations:**
```typescript
useMutation('generateCanvas')   // Trigger AI generation
useMutation('updateBlock')      // Edit a single block
useMutation('acceptCanvas')     // Lock version, enable scoring
useMutation('revertCanvas')     // Revert to previous
```

---

### 3. `useValidation` — Validation Scoring

**File:** `src/hooks/useValidation.ts`

**Manages:** Current validation report, 9 topic scores, overall score, scoring trigger, score history for trends.

**Connections:**
```
ValidationCanvas.tsx + ValidationCard.tsx
  → useValidation(startupId)
    → supabase.from('validation_reports')
    → supabase.from('validation_topic_scores')
    → supabase.functions.invoke('validation-score')
```

**Query Keys:**
```typescript
['validation', startupId]
['validation', 'scores', reportId]
['validation', 'history', startupId]
```

---

### 4. `useDetailReport` — Detail Reports

**File:** `src/hooks/useDetailReport.ts`

**Manages:** Single topic detail report, flow diagram data, score breakdown, analysis content.

**Connections:**
```
DetailReport.tsx
  → useDetailReport(topic, startupId)
    → supabase.from('detail_reports')
    → supabase.from('validation_topic_scores')
    → supabase.functions.invoke('report-generate')
```

**Query Keys:**
```typescript
['report', topic, startupId]
```

---

### 5. `useDashboard` — Enhanced Dashboard

**File:** `src/hooks/useDashboard.ts` (existing — needs upgrade)

**Current:** Returns mock data from `mockData.ts`

**Target:**
```
Dashboard.tsx, KPIBar.tsx, PrioritiesCard.tsx, RisksCard.tsx
  → useDashboardData()
    → supabase.functions.invoke('dashboard-summary')
    OR direct queries:
    → supabase.from('validation_reports')
    → supabase.from('tasks')
    → supabase.from('validation_topic_scores')
```

---

### 6. `useAgentStatus` — Agent Monitoring

**File:** `src/hooks/useAgentStatus.ts`

**Manages:** Running agents, recent results, run history.

**Connections:**
```
AgentStatusIndicator.tsx (in ChatPanel)
  → useAgentStatus()
    → supabase.from('agent_runs')
    → supabase.channel('agent_runs')
```

---

## C. New Routes Needed

Add to `App.tsx` inside `<Route path="/app" element={<AppShell />}>`:

```typescript
<Route path="lean-canvas" element={<LeanCanvas />} />
<Route path="validation" element={<ValidationCanvas />} />
<Route path="validation/:topic" element={<DetailReport />} />
<Route path="chat" element={<ChatPage />} />
```

---

## D. Component Tree for New Pages

```
LeanCanvas.tsx
├── CanvasGrid.tsx (3×3 layout)
│   └── CanvasBlock.tsx × 9
│       ├── BlockHeader (title + confidence badge)
│       ├── BlockContent (editable text)
│       └── BlockFooter (needs validation flag)
└── CanvasActions (generate, accept, version dropdown)

ValidationCanvas.tsx
├── ValidationHeader.tsx (overall score + archetype)
├── ValidationGrid.tsx (3×3)
│   └── ValidationCard.tsx × 9
│       ├── ScoreBadge (0-100 color)
│       ├── MiniChart (contrast %)
│       ├── Verdict (one-line)
│       └── ViewDetailsLink
├── ValidationHeatmap.tsx
└── ValidationRadar.tsx (recharts)

DetailReport.tsx
├── TensionHeader.tsx
├── FlowDiagram.tsx (topic-specific)
├── ScoreBreakdown.tsx (progress bars)
├── ExecutiveAnalysis.tsx (long-form)
├── EvidenceAssessment.tsx
├── GapAnalysis.tsx (ambition vs evidence)
├── BenchmarkComparison.tsx
├── PriorityActions.tsx (with Add to Tasks)
└── RelatedTopics.tsx

ChatPanel.tsx (replaces AIPanel.tsx)
├── ChatHeader.tsx (title + agent picker)
├── ChatMessages.tsx
│   ├── UserMessage.tsx
│   ├── AssistantMessage.tsx
│   │   ├── SuggestionChips.tsx
│   │   ├── ActionCards.tsx (approve/reject)
│   │   └── AgentResultCard.tsx
│   └── SystemMessage.tsx
├── ChatInput.tsx (input + send)
└── AgentPicker.tsx (run specific agent)
```

---

## E. Navigation Updates

### DashboardNav.tsx — Add Items
```
Current:  Dashboard, Tasks, Projects, Contacts, Deals
Add:      Lean Canvas, Validation
Bottom:   Chat (full-page option)
```

### AppShell.tsx — Right Panel Upgrade
Replace static `AIPanel` with interactive `ChatPanel`:
```typescript
// Before:
<AIPanel insights={insights} isLoading={isLoading} />

// After:
<ChatPanel
  contextType={currentPage}
  contextData={pageData}
  defaultOpen={isDesktop}
/>
```

---

## F. Data Flow Sequences

### First-Time User
```
1. Sign up → /app/dashboard (empty state)
2. ChatPanel opens with welcome + suggestions
3. User describes startup naturally
4. chat edge function → profile-extractor
5. Extracted fields → confirmation cards in chat
6. User confirms → saved to startups table
7. Suggestion: "Generate Lean Canvas?"
8. canvas-generate edge function runs
9. Canvas created → redirect to /app/lean-canvas
10. User reviews/edits blocks → "Accept Canvas"
11. Suggestion: "Score your validation?"
12. validation-score edge function runs
13. Scores computed → redirect to /app/validation
14. Dashboard now shows real validation data
```

### Chat-Driven Canvas Update
```
1. User on validation page, sees low Revenue score
2. Chats: "How should I price my AI product?"
3. chat edge function detects revenue context
4. Queries vector DB for pricing frameworks
5. Returns advice + suggestion: "Update Revenue block?"
6. User clicks "Yes" → canvas block updates
7. Suggestion: "Re-score?" → scorer re-runs revenue topic
8. Score updates → dashboard refreshes
```

---

## G. Cache Invalidation Rules

```typescript
// Canvas updated → invalidate:
queryClient.invalidateQueries(['canvas', startupId]);
queryClient.invalidateQueries(['validation', startupId]);

// Scoring completes → invalidate:
queryClient.invalidateQueries(['validation', startupId]);
queryClient.invalidateQueries(['dashboard', orgId]);
queryClient.invalidateQueries(['report', topic, startupId]);

// Chat message sent → optimistic update + invalidate:
queryClient.invalidateQueries(['chat', 'messages', conversationId]);
```

---

## H. Realtime Subscriptions

| Channel | Table | Events | Purpose |
|---------|-------|--------|---------|
| `chat:{conv_id}` | `chat_messages` | INSERT | New AI messages |
| `agents:{org_id}` | `agent_runs` | UPDATE | Agent status changes |
| `scores:{startup_id}` | `validation_topic_scores` | UPDATE | Score recalculations |

**NOT realtime (fetch on load):** Canvas blocks, detail reports, knowledge base, dashboard summary.

---

## I. Information Needed Before Implementation

### Before Core
1. **Auth method** — Email/password? Google OAuth? Magic link?
2. **API key storage** — Anthropic key in Supabase secrets?
3. **Multi-startup per org?** — Schema supports it, but UI?

### Before MVP
4. **Streaming** — Stream chat responses or return complete?
5. **Offline behavior** — Show cached data when edge functions down?

### Before Post-MVP
6. **Vector DB seeding** — Who curates the initial 634 chunks?
7. **Report export** — HTML first, PDF later?
