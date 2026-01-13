# Supabase Tables Quick Reference

**Last Updated:** January 13, 2026  
**Purpose:** Essential tables and fields for frontend, backend, and edge functions  
**Total Tables:** 46

---

## Core Tables by Layer

### Frontend (React/TypeScript)
- **Auth:** `profiles`, `orgs`, `org_members`
- **Startup:** `startups`, `startup_founders`, `startup_links`, `startup_competitors`
- **Wizard:** `wizard_sessions`, `documents`
- **CRM:** `crm_contacts`, `crm_deals`, `crm_tasks`, `crm_interactions`
- **Tasks:** `tasks`
- **Decks:** `decks`, `slides`
- **AI:** `ai_coach_insights`

### Edge Functions (Deno)
- **Used:** `startups`, `startup_founders`, `startup_metrics_snapshots`, `startup_competitors`, `ai_runs`, `wizard_sessions`

---

## Essential Tables & Key Fields

### `profiles`
```typescript
{ id, user_id, email, full_name, avatar_url, created_at, updated_at }
```
**Query:** `SELECT * FROM profiles WHERE user_id = auth.uid()`

### `orgs`
```typescript
{ id, owner_id, name, slug, created_at, updated_at }
```
**Query:** `SELECT * FROM orgs WHERE id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid())`

### `org_members`
```typescript
{ org_id (PK), user_id (PK), role, created_at }
```
**Query:** `SELECT org_id FROM org_members WHERE user_id = auth.uid()` (for RLS)

### `startups`
```typescript
{
  id, org_id, user_id, name, tagline, description,
  problem, solution, industry, stage,
  traction_data (jsonb),  // { mrr, users, growth_rate }
  team_data (jsonb),       // Team info
  needs_data (jsonb),      // What startup needs
  is_raising, raise_amount,
  created_at, updated_at
}
```
**Query:** `SELECT * FROM startups WHERE org_id = $1`

### `startup_founders`
```typescript
{ id, startup_id, name, role, email, linkedin_url, bio, created_at, updated_at }
```
**Query:** `SELECT * FROM startup_founders WHERE startup_id = $1`

### `wizard_sessions`
```typescript
{ id, user_id, startup_id, org_id, current_step, status, data (jsonb), completed_at, created_at, updated_at }
```
**Query:** `SELECT * FROM wizard_sessions WHERE user_id = auth.uid() ORDER BY created_at DESC LIMIT 1`

### `crm_contacts`
```typescript
{
  id, startup_id, account_id,
  first_name, last_name, email, phone, role, title,
  search_vector (tsvector),
  deleted_at,  // Soft delete
  created_at, updated_at
}
```
**Query:** `SELECT * FROM crm_contacts WHERE startup_id = $1 AND deleted_at IS NULL`

### `crm_deals`
```typescript
{
  id, startup_id, contact_id, account_id,
  name, amount, stage, probability, expected_close,
  owner_id, sector, ai_score,
  deleted_at,  // Soft delete
  created_at, updated_at
}
```
**Query:** `SELECT * FROM crm_deals WHERE startup_id = $1 AND deleted_at IS NULL`

### `crm_tasks`
```typescript
{
  id, startup_id, contact_id, deal_id,
  title, description, status, priority, due_date,
  assignee_id, completed,
  created_at, updated_at
}
```
**Query:** `SELECT * FROM crm_tasks WHERE startup_id = $1 AND completed = false`
**⚠️ Missing indexes:** `contact_id`, `deal_id` (add these!)

### `tasks`
```typescript
{
  id, org_id, startup_id, contact_id, deal_id,
  title, description, priority, status, due_date,
  assignee_id, created_by, completed_by, completed_at,
  created_at, updated_at
}
```
**Query:** `SELECT * FROM tasks WHERE startup_id = $1 AND status != 'completed'`

### `decks`
```typescript
{
  id, org_id, startup_id, user_id,
  title, description, template, status,
  slides_snapshot (jsonb), theme_config (jsonb),
  created_at, updated_at
}
```
**Query:** `SELECT * FROM decks WHERE org_id = $1 ORDER BY created_at DESC`

### `slides`
```typescript
{
  id, deck_id, position,
  title, content, type, template,
  image_url, bullets (jsonb), chart_data (jsonb),
  created_at, updated_at
}
```
**Query:** `SELECT * FROM slides WHERE deck_id = $1 ORDER BY position`

### `ai_runs`
```typescript
{ id, user_id, tool_name, request_type, model, tokens_used, response_time, created_at }
```
**Query:** `INSERT INTO ai_runs (user_id, tool_name, model, tokens_used) VALUES ...`

### `ai_coach_insights`
```typescript
{ id, startup_id, org_id, insight_type, content, priority, metadata (jsonb), created_at, updated_at }
```
**Query:** `SELECT * FROM ai_coach_insights WHERE startup_id = $1 ORDER BY priority DESC`

---

## Quick Reference Table

| Use Case | Table | Key Fields |
|----------|-------|------------|
| User Profile | `profiles` | `id`, `user_id`, `email`, `full_name` |
| Organization | `orgs` | `id`, `name`, `owner_id` |
| Startup | `startups` | `id`, `org_id`, `name`, `stage`, `traction_data` |
| Team | `startup_founders` | `id`, `startup_id`, `name`, `role` |
| Wizard | `wizard_sessions` | `id`, `user_id`, `startup_id`, `current_step`, `data` |
| CRM Contact | `crm_contacts` | `id`, `startup_id`, `first_name`, `email` |
| CRM Deal | `crm_deals` | `id`, `startup_id`, `contact_id`, `stage`, `amount` |
| CRM Task | `crm_tasks` | `id`, `startup_id`, `contact_id`, `deal_id`, `title` |
| Task | `tasks` | `id`, `startup_id`, `title`, `status`, `due_date` |
| Deck | `decks` | `id`, `org_id`, `startup_id`, `title`, `template` |
| Slide | `slides` | `id`, `deck_id`, `position`, `title`, `content` |
| AI Log | `ai_runs` | `id`, `user_id`, `tool_name`, `model`, `tokens_used` |
