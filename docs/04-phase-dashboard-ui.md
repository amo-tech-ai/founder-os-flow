# Phase 4: Dashboard UI (Widgets & Panels)

## Purpose
Build the main dashboard interface with widgets, KPIs, and quick actions.

## Goals
- Immediate value on first view
- Fast interactions (< 10 seconds to complete a task)
- Loading states with no layout shift
- Meaningful empty states

---

## Dashboard Wireframe

```
┌─────────────────────────────────────────────────────────────────────────┐
│  🏠 StartupAI          Dashboard          [+ Quick Add ▼] [👤 Profile]  │
├────────────┬────────────────────────────────────────────┬───────────────┤
│            │                                            │               │
│  NAVIGATION│  ┌─────────────────────────────────────┐   │  AI PANEL     │
│            │  │ Good morning, Alex 👋                │   │               │
│  Dashboard │  │ Here's what needs your attention    │   │  📊 Summary   │
│  ─────────  │  └─────────────────────────────────────┘   │  "You have 3  │
│  Tasks     │                                            │   priorities  │
│  Contacts  │  ┌─── KPI STRIP ───────────────────────┐   │   today..."   │
│  Deals     │  │ $12K   │ 18mo  │ 5    │ 3     │ 2   │   │               │
│  Projects  │  │ MRR    │Runway │Deals │Due    │Over │   │  ────────────  │
│            │  └─────────────────────────────────────┘   │               │
│            │                                            │  📋 Next Steps│
│            │  ┌─── TOP PRIORITIES ──────────────────┐   │  • Follow up  │
│            │  │ ☐ Complete investor deck    [HIGH]  │   │    with ABC   │
│            │  │ ☐ Send follow-up to Acme    [MED]   │   │  • Review Q4  │
│            │  │ ☐ Review Q4 projections     [MED]   │   │    numbers    │
│            │  └─────────────────────────────────────┘   │  • Update     │
│            │                                            │    roadmap    │
│  ─────────  │  ┌─── AT RISK ────────────────────────┐   │               │
│  Settings  │  │ ⚠️ Overdue: API integration (2d)    │   │  ────────────  │
│            │  │ ⚠️ Stalled: Series A - VC Fund      │   │               │
│            │  └─────────────────────────────────────┘   │  ⚠️ Risks     │
│            │                                            │  • 2 overdue  │
│            │  ┌─── QUICK ACTIONS ───────────────────┐   │    tasks      │
│            │  │ [+ Task] [+ Contact] [📊 Deck]      │   │  • 1 stalled  │
│            │  └─────────────────────────────────────┘   │    deal       │
│            │                                            │               │
│            │                                            │  [Generate    │
│            │                                            │   Tasks →]    │
└────────────┴────────────────────────────────────────────┴───────────────┘
```

---

## Components

### DashboardHeader
```typescript
interface DashboardHeaderProps {
  userName: string;
  greeting?: string;
}

// Features:
// - Time-based greeting (Good morning/afternoon/evening)
// - User name
// - Quick action dropdown (Add Task, Add Contact, Generate Deck)
```

### KPIBar
```typescript
interface KPIBarProps {
  kpis: DashboardKPIs;
  isLoading?: boolean;
}

// KPI Cards:
// - MRR/ARR (currency formatted)
// - Runway (months)
// - Active Deals (count)
// - Tasks Due Today (count)
// - Tasks Overdue (count, red if > 0)
```

### PrioritiesCard
```typescript
interface PrioritiesCardProps {
  tasks: Task[];
  onComplete: (taskId: string) => void;
  onView: (taskId: string) => void;
  isLoading?: boolean;
}

// Features:
// - Top 3 tasks with checkbox
// - Priority badge (color coded)
// - Due date
// - Click to view details
// - Optimistic update on complete
```

### RisksCard
```typescript
interface RisksCardProps {
  risks: RiskItem[];
  onAction: (risk: RiskItem) => void;
  isLoading?: boolean;
}

// Features:
// - Risk icon by type
// - Severity badge
// - Click to navigate to entity
// - "View all" link if > 3 risks
```

### QuickActionsGrid
```typescript
interface QuickActionsGridProps {
  onAction: (action: QuickAction) => void;
}

type QuickAction = 'add_task' | 'add_contact' | 'add_deal' | 'generate_deck' | 'create_project';

// Grid of icon buttons with labels
```

### EmptyState
```typescript
interface EmptyStateProps {
  type: 'tasks' | 'deals' | 'contacts' | 'dashboard';
  onAction?: () => void;
}

// Contextual empty states:
// - Icon
// - Helpful message
// - CTA button
// - "Getting started" tips
```

---

## Component File Structure

```
src/components/dashboard/
├── AppShell.tsx
├── DashboardNav.tsx
├── DashboardHeader.tsx
├── AIPanel.tsx
├── AuthGuard.tsx
├── widgets/
│   ├── KPIBar.tsx
│   ├── KPICard.tsx
│   ├── PrioritiesCard.tsx
│   ├── RisksCard.tsx
│   ├── QuickActionsGrid.tsx
│   └── EmptyState.tsx
└── shared/
    ├── PriorityBadge.tsx
    ├── StatusBadge.tsx
    └── EntityLink.tsx
```

---

## State Management

### Dashboard Data Hook
```typescript
// src/hooks/useDashboard.ts

interface UseDashboardReturn {
  data: DashboardSummary | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  completeTask: (taskId: string) => Promise<void>;
}

export function useDashboard(): UseDashboardReturn {
  // 1. Fetch from dashboard-summary edge function
  // 2. Optimistic updates for task completion
  // 3. Auto-refetch on window focus
  // 4. Error handling with retry
}
```

### AI Panel Hook
```typescript
// src/hooks/useAIInsights.ts

interface UseAIInsightsReturn {
  insights: AIInsights | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => void;
}

export function useAIInsights(context: AIContext): UseAIInsightsReturn {
  // 1. Fetch from ai-insights edge function
  // 2. Debounced refresh
  // 3. Context-aware caching
}
```

---

## Loading States

### Skeleton Components
```typescript
// Every widget has a skeleton variant
<KPIBar isLoading />        // Shows 5 skeleton cards
<PrioritiesCard isLoading /> // Shows 3 skeleton rows
<RisksCard isLoading />      // Shows 2 skeleton items
```

### Loading Strategy
1. Show skeletons immediately
2. Fade in real content
3. No layout shift
4. Stagger animations slightly for polish

---

## Success Criteria

- [ ] Dashboard loads with visible content in < 1s
- [ ] Task completion updates UI in < 100ms (optimistic)
- [ ] All widgets have loading skeletons
- [ ] Empty states guide users to action
- [ ] Mobile responsive (single column)
- [ ] Keyboard accessible
