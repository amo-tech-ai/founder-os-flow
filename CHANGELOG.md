# Changelog

All notable changes to StartupAI will be documented in this file.

## [Unreleased]

### Added
- **Phase 1: Foundation** - Core layout and routing complete
  - AppShell with 3-panel layout (Nav | Content | AI Panel)
  - DashboardNav with active state styling
  - DashboardHeader with user greeting and quick actions
  - All `/app/*` routes configured
  - Responsive breakpoints (desktop/tablet/mobile)

- **Phase 4: Dashboard UI** - Widget components created
  - KPIBar with 5 metric cards
  - PrioritiesCard showing top 3 tasks
  - RisksCard displaying overdue tasks and stalled deals
  - QuickActionsGrid with action buttons
  - AIPanel with summary, next steps, and risks

- **Dashboard Pages** - All screens implemented with mock data
  - `/app/dashboard` - Main dashboard with KPIs, priorities, risks
  - `/app/tasks` - Task hub with filters and status columns
  - `/app/contacts` - CRM contacts with search
  - `/app/deals` - Pipeline view with stage columns
  - `/app/projects` - Project cards with health indicators
  - `/app/projects/:id` - Project detail with tasks
  - `/app/profile` - User profile settings
  - `/app/company-profile` - Organization settings

- **Documentation**
  - `docs/00-dashboard-overview.md` - Master implementation plan
  - `docs/01-phase-foundation.md` - Auth, layout, routes spec
  - `docs/02-phase-data-layer.md` - Supabase schema & types
  - `docs/03-phase-edge-functions.md` - Edge function specs
  - `docs/04-phase-dashboard-ui.md` - Widget component specs
  - `docs/05-phase-task-system.md` - 5-step workflow spec
  - `docs/06-phase-crm.md` - CRM integration spec
  - `docs/07-phase-ai-panel.md` - AI intelligence spec
  - `docs/08-phase-polish.md` - Polish & launch spec
  - `docs/supabase/` - Credentials and table reference

- **Supabase Integration**
  - Supabase client configured in `src/lib/supabase.ts`
  - Credentials documented in `docs/supabase/00-credentials.md`
  - Table reference in `docs/supabase/01-tables-reference.md`

### In Progress
- AuthGuard component for protected routes
- AppContext for user/org state management
- Settings page implementation

### Pending
- Database connection and real data
- Edge Functions deployment
- AI insights integration
- Authentication flow

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 0.1.0 | 2026-01-13 | Initial dashboard foundation with mock data |
