# Supabase Common Patterns

**Reusable patterns for frontend and edge functions**

---

## 1. Multi-Tenancy (Always Filter by Org/Startup)

```typescript
// ✅ CORRECT
const { data } = await supabase
  .from('startups')
  .select('*')
  .eq('org_id', orgId);

// ✅ CORRECT
const { data } = await supabase
  .from('crm_contacts')
  .select('*')
  .eq('startup_id', startupId);
```

---

## 2. Soft Deletes

```typescript
// ✅ CORRECT - Exclude deleted
const { data } = await supabase
  .from('crm_contacts')
  .select('*')
  .eq('startup_id', startupId)
  .is('deleted_at', null);

// ✅ CORRECT - Soft delete
await supabase
  .from('crm_contacts')
  .update({ deleted_at: new Date().toISOString() })
  .eq('id', contactId);
```

**Tables with soft deletes:** `crm_contacts`, `crm_deals`, `investor_docs`, `data_room_files`

---

## 3. JSONB Fields

```typescript
// ✅ CORRECT - Update JSONB
await supabase
  .from('startups')
  .update({
    traction_data: { mrr: 5000, users: 150 }
  })
  .eq('id', startupId);
```

**Common JSONB:** `startups.traction_data`, `startups.team_data`, `decks.slides_snapshot`

---

## 4. Full-Text Search

```typescript
// ✅ CORRECT
const { data } = await supabase
  .from('startups')
  .select('*')
  .textSearch('search_vector', 'AI startup');
```

**Tables with search:** `startups`, `crm_contacts`, `investors`, `decks`

---

## 5. Foreign Key Joins

```typescript
// ✅ CORRECT - Get startup with founders
const { data } = await supabase
  .from('startups')
  .select(`
    *,
    startup_founders (*)
  `)
  .eq('id', startupId)
  .single();
```

---

## Edge Function Patterns

### Supabase Client Setup

```typescript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Service role (bypasses RLS)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Or with user JWT (enforces RLS)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!,
  { global: { headers: { Authorization: `Bearer ${userJwt}` } } }
);
```

### Common Operations

```typescript
// Get startup
const { data: startup } = await supabase
  .from('startups')
  .select('*')
  .eq('id', startupId)
  .single();

// Update startup
await supabase
  .from('startups')
  .update({ description: newDesc })
  .eq('id', startupId);

// Upsert founders
await supabase
  .from('startup_founders')
  .upsert(foundersArray, { onConflict: 'startup_id,name' });

// Log AI run
await supabase.from('ai_runs').insert({
  user_id: userId,
  tool_name: 'wizard_analyze',
  model: 'gemini-3-pro',
  tokens_used: 1500
});
```

---

## RLS Notes

- **All tables have RLS enabled**
- **Policies check org membership via `org_members`**
- **Frontend:** RLS auto-enforced via Supabase client
- **Edge Functions:** Use service role key to bypass RLS (admin) or anon key + JWT (user)

**⚠️ Security:** All tables allow anonymous access. Add `auth.uid() IS NOT NULL` if not needed.

---

## Performance Issues to Fix

### Missing Indexes (Add These!)
```sql
CREATE INDEX idx_crm_tasks_contact_id ON crm_tasks(contact_id);
CREATE INDEX idx_crm_tasks_deal_id ON crm_tasks(deal_id);
```

### RLS Performance (Events Tables)
**Fix:** Replace `auth.uid()` with `(select auth.uid())` in RLS policies
**Affected:** `events`, `event_tasks`, `event_assets`, `event_budgets`
