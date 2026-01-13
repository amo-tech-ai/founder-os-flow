# Phase 7: AI Panel (Intelligence Layer)

## Purpose
Context-aware AI assistance that answers three questions:
1. What does this mean?
2. What should I do next?
3. Why does this matter now?

## Goals
- Always visible in right panel (desktop)
- Context-aware based on current view
- Actionable suggestions with CTAs
- Fast, non-blocking updates

---

## AI Panel Wireframe

```
┌─────────────────────────────┐
│  🤖 AI Assistant            │
├─────────────────────────────┤
│                             │
│  📊 SUMMARY                 │
│  ─────────────────────────  │
│  You have 3 high-priority   │
│  tasks today. 2 deals need  │
│  follow-up attention.       │
│                             │
├─────────────────────────────┤
│                             │
│  📋 NEXT STEPS              │
│  ─────────────────────────  │
│                             │
│  1. Follow up with Sarah    │
│     at Sequoia - no reply   │
│     in 5 days               │
│     [Create Task →]         │
│                             │
│  2. Complete pitch deck     │
│     update - metrics are    │
│     stale                   │
│     [Open Deck →]           │
│                             │
│  3. Review project health   │
│     - 2 tasks overdue       │
│     [View Project →]        │
│                             │
├─────────────────────────────┤
│                             │
│  ⚠️ RISKS                   │
│  ─────────────────────────  │
│                             │
│  🔴 HIGH: Runway < 6 months │
│     Consider accelerating   │
│     fundraising timeline    │
│                             │
│  🟡 MED: 2 overdue tasks    │
│     Blocking project        │
│     completion              │
│                             │
├─────────────────────────────┤
│                             │
│  [🔄 Refresh]               │
│  [✨ Generate Tasks]        │
│                             │
└─────────────────────────────┘
```

---

## Context Awareness

### Context Types

| View | Context | AI Focus |
|------|---------|----------|
| Dashboard | All data summary | Priorities, risks, next actions |
| Task Detail | Specific task | Completion tips, related items |
| Deal Detail | Specific deal | Follow-up suggestions, stage advice |
| Contact Detail | Specific contact | Relationship tips, connected deals |
| Project Detail | Specific project | Health analysis, blockers |

### Context Payloads

```typescript
interface AIContext {
  type: 'dashboard' | 'task' | 'deal' | 'contact' | 'project';
  entityId?: string;
  dashboardState?: {
    topTasks: Task[];
    risks: RiskItem[];
    kpis: DashboardKPIs;
    activeDeals: Deal[];
  };
  entityData?: Task | Deal | Contact | Project;
}
```

---

## AI Panel Components

### AIPanel (Container)
```typescript
interface AIPanelProps {
  context: AIContext;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

// States:
// - Loading (skeleton)
// - Content (insights displayed)
// - Error (retry button)
// - Empty (helpful tips)
```

### AISummary
```typescript
interface AISummaryProps {
  summary: string;  // 2-3 sentences
}
```

### AINextSteps
```typescript
interface AINextStepsProps {
  steps: NextStep[];
  onStepAction: (step: NextStep) => void;
}

interface NextStep {
  id: string;
  title: string;
  description: string;
  action_type: 'create_task' | 'follow_up' | 'review' | 'generate' | 'navigate';
  action_payload?: {
    url?: string;
    task_data?: Partial<Task>;
  };
  priority: number;
}
```

### AIRisks
```typescript
interface AIRisksProps {
  risks: AIRisk[];
  onRiskAction: (risk: AIRisk) => void;
}

interface AIRisk {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  recommendation: string;
  action_url?: string;
}
```

### AIActions
```typescript
interface AIActionsProps {
  onRefresh: () => void;
  onGenerateTasks: () => void;
  isLoading: boolean;
}
```

---

## AI Response Format

### Edge Function Response
```typescript
interface AIInsightsResponse {
  success: boolean;
  data: {
    summary: string;
    next_steps: Array<{
      id: string;
      title: string;
      description: string;
      action_type: string;
      action_payload?: Record<string, any>;
      priority: number;
    }>;
    risks: Array<{
      id: string;
      title: string;
      severity: 'high' | 'medium' | 'low';
      description: string;
      recommendation: string;
    }>;
    reasoning?: string;
  };
}
```

### Prompt Templates

#### Dashboard Context
```
You are an AI assistant for startup founders using StartupAI.

Current dashboard state:
- Top tasks: {tasks}
- Active deals: {deals}
- KPIs: {kpis}
- Known risks: {risks}

Generate insights with:
1. A 2-3 sentence summary of the founder's current state
2. 3-5 prioritized next steps with specific actions
3. Any additional risks not already flagged

Be concise, actionable, and founder-friendly. Focus on what matters TODAY.
```

#### Deal Context
```
You are helping a founder manage an investor relationship.

Deal: {deal_name}
Stage: {stage}
Amount: {amount}
Last touch: {last_touch}
Related tasks: {tasks}
Contact: {contact}

Provide:
1. Assessment of deal health
2. Recommended next steps
3. Potential risks or concerns
4. Suggested follow-up message if appropriate
```

---

## Mobile Behavior

### Sheet/Drawer Pattern
```typescript
// On mobile, AI Panel becomes a bottom sheet
<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetTrigger asChild>
    <Button className="fixed bottom-4 right-4">
      <SparklesIcon /> AI
    </Button>
  </SheetTrigger>
  <SheetContent side="bottom">
    <AIPanel context={context} />
  </SheetContent>
</Sheet>
```

---

## Success Criteria

- [ ] Panel updates when context changes
- [ ] Suggestions are actionable (have CTAs)
- [ ] Risks show appropriate severity
- [ ] Generate Tasks creates relevant tasks
- [ ] Mobile sheet works smoothly
- [ ] Loading states are non-blocking
- [ ] Refresh doesn't lose scroll position
