# Phase 1: Foundation (Auth, Layout, Routes)

## Purpose
Establish the core shell, authentication, and routing structure for the dashboard.

## Goals
- Protected `/app/*` routes with auth guard
- Three-panel AppShell layout
- Consistent navigation across all dashboard screens

---

## Routes & Screen Map

| Route | Screen | Description |
|-------|--------|-------------|
| `/app/dashboard` | Main Dashboard | Top priorities, KPIs, AI panel |
| `/app/tasks` | Task Hub | All tasks, filters, bulk actions |
| `/app/contacts` | CRM Contacts | People database |
| `/app/deals` | Deal Pipeline | Kanban/list of deals |
| `/app/projects` | Projects | Project overview cards |
| `/app/settings` | Settings | User/org preferences |

---

## Screen Wireframe: AppShell Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Header: Logo | Breadcrumb | Quick Actions | User Menu           │
├────────────┬────────────────────────────────┬───────────────────┤
│            │                                │                   │
│  LEFT      │         MAIN CONTENT           │   RIGHT PANEL     │
│  NAV       │                                │   (AI Intel)      │
│            │  ┌─────────────────────────┐   │                   │
│  Dashboard │  │  Widget Cards           │   │  Summary          │
│  Tasks     │  │  Tables                 │   │  Next Steps       │
│  Contacts  │  │  Forms                  │   │  Risks            │
│  Deals     │  │  Lists                  │   │  Actions          │
│  Projects  │  └─────────────────────────┘   │                   │
│            │                                │                   │
│  ───────── │                                │                   │
│  Settings  │                                │                   │
│            │                                │                   │
├────────────┴────────────────────────────────┴───────────────────┤
│ Footer (optional): Status | Help | Version                       │
└─────────────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints
- **Desktop (≥1280px)**: Full 3-panel layout
- **Tablet (768-1279px)**: Collapsible left nav, AI panel slides in
- **Mobile (<768px)**: Bottom nav, AI panel as modal/sheet

---

## Implementation Checklist

### 1.1 Auth Guard
- [ ] Create `AuthGuard` component
- [ ] Redirect unauthenticated users to `/login`
- [ ] Show loading state while checking auth
- [ ] Store user/org context in React context

### 1.2 AppShell Layout
- [ ] Create `AppShell` component with 3-column grid
- [ ] Left panel: `DashboardNav` component
- [ ] Right panel: `AIPanel` component (placeholder)
- [ ] Main area: `Outlet` for nested routes

### 1.3 Navigation
- [ ] Create `DashboardNav` with route links
- [ ] Active state styling
- [ ] Collapsible on tablet/mobile
- [ ] Quick action buttons in header

### 1.4 Routes Setup
- [ ] Add `/app/*` routes in App.tsx
- [ ] Create placeholder pages for each route
- [ ] Implement 404 handling within `/app/*`

---

## Component Structure

```
src/
├── components/
│   └── dashboard/
│       ├── AppShell.tsx
│       ├── DashboardNav.tsx
│       ├── DashboardHeader.tsx
│       ├── AIPanel.tsx
│       └── AuthGuard.tsx
├── pages/
│   └── app/
│       ├── Dashboard.tsx
│       ├── Tasks.tsx
│       ├── Contacts.tsx
│       ├── Deals.tsx
│       ├── Projects.tsx
│       └── Settings.tsx
└── contexts/
    └── AppContext.tsx
```

---

## Success Criteria

- [ ] All `/app/*` routes render without console errors
- [ ] Unauthenticated users redirected to login
- [ ] Layout is consistent across all dashboard routes
- [ ] Navigation highlights active route
- [ ] Responsive layout works on all breakpoints

---

## Failure Modes & Mitigations

| Risk | Mitigation |
|------|------------|
| Auth state flicker | Use loading skeleton during auth check |
| Layout shift on nav collapse | Use fixed widths, CSS transitions |
| Deep linking fails | Ensure routes are properly defined |
