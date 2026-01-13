# Supabase Credentials

**Source of Truth for StartupAI Supabase Connection**

---

## Environment Variables

### Frontend (Vite)
```bash
VITE_SUPABASE_URL=https://ouverjherohazwadfgud.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91dmVyamhlcm9oYXp3YWRmZ3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MzYzNzIsImV4cCI6MjA3ODMxMjM3Mn0.jicjCmB_flZc_H_io0-v5fVHPzgf5gkj-4wdvcRXfQk
```

### Edge Functions (Deno)
```typescript
SUPABASE_URL=https://ouverjherohazwadfgud.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91dmVyamhlcm9oYXp3YWRmZ3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MzYzNzIsImV4cCI6MjA3ODMxMjM3Mn0.jicjCmB_flZc_H_io0-v5fVHPzgf5gkj-4wdvcRXfQk
SUPABASE_SERVICE_ROLE_KEY=<stored-in-secrets>
```

---

## Project Details

| Property | Value |
|----------|-------|
| Project Ref | `ouverjherohazwadfgud` |
| Region | Default |
| API URL | `https://ouverjherohazwadfgud.supabase.co` |
| Dashboard | [Supabase Dashboard](https://supabase.com/dashboard/project/ouverjherohazwadfgud) |

---

## Security Notes

- **ANON_KEY** is a publishable key (safe for frontend)
- **SERVICE_ROLE_KEY** must NEVER be exposed client-side
- All tables have RLS enabled
- Policies enforce org-based isolation via `org_members`

---

## Related Docs

- [01-tables-reference.md](./01-tables-reference.md) - Complete table schema
- [02-rls-policies.md](./02-rls-policies.md) - Row Level Security
- [03-edge-functions.md](./03-edge-functions.md) - Edge function patterns
