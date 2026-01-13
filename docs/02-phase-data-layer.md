# Phase 2: Data Layer (Schema, Types, RLS)

## Purpose
Define the data model, Supabase schema, and security policies.

## Goals
- Type-safe data contracts for all entities
- Org-isolated data via RLS
- Indexed queries for dashboard performance

---

## Data Contracts (TypeScript Types)

```typescript
// src/types/database.ts

// === Core Entities ===

export interface Organization {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  settings: OrgSettings;
}

export interface OrgSettings {
  timezone: string;
  currency: string;
  fiscal_year_start: number;
}

export interface UserProfile {
  id: string;
  user_id: string;
  org_id: string;
  full_name: string;
  avatar_url?: string;
  role: 'owner' | 'admin' | 'member';
  created_at: string;
}

// === Task System ===

export type TaskPhase = 1 | 2 | 3 | 4 | 5;
export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'review' | 'completed';
export type TaskCategory = 'startup' | 'fundraising' | 'product' | 'marketing' | 'operations' | 'hiring';
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  org_id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  phase: TaskPhase;
  category: TaskCategory;
  due_at?: string;
  completed_at?: string;
  assigned_to?: string;
  project_id?: string;
  deal_id?: string;
  contact_id?: string;
  ai_generated: boolean;
  ai_suggested: boolean;
  created_at: string;
  updated_at: string;
}

// === CRM ===

export type ContactType = 'investor' | 'customer' | 'advisor' | 'partner' | 'other';

export interface Contact {
  id: string;
  org_id: string;
  full_name: string;
  email?: string;
  phone?: string;
  company?: string;
  title?: string;
  contact_type: ContactType;
  linkedin_url?: string;
  notes?: string;
  last_contacted_at?: string;
  created_at: string;
  updated_at: string;
}

export type DealStage = 'lead' | 'contacted' | 'meeting' | 'negotiation' | 'term_sheet' | 'due_diligence' | 'closed_won' | 'closed_lost';

export interface Deal {
  id: string;
  org_id: string;
  contact_id: string;
  name: string;
  stage: DealStage;
  amount?: number;
  probability: number;
  expected_close_date?: string;
  last_touch_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// === Projects ===

export type ProjectHealth = 'on_track' | 'at_risk' | 'off_track';

export interface Project {
  id: string;
  org_id: string;
  name: string;
  description?: string;
  health_score: ProjectHealth;
  due_date?: string;
  started_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

// === Dashboard ===

export interface DashboardSummary {
  topTasks: Task[];
  kpis: DashboardKPIs;
  risks: RiskItem[];
  suggestions: Suggestion[];
}

export interface DashboardKPIs {
  mrr: number;
  arr: number;
  runway_months: number;
  active_deals: number;
  deal_pipeline_value: number;
  tasks_due_today: number;
  tasks_overdue: number;
  upcoming_meetings: number;
}

export interface RiskItem {
  id: string;
  type: 'overdue_task' | 'stalled_deal' | 'project_at_risk' | 'runway_low';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  entity_id: string;
  entity_type: 'task' | 'deal' | 'project';
  action_url: string;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  action_type: 'create_task' | 'follow_up' | 'review' | 'generate';
  priority: number;
}
```

---

## Supabase Schema (Migrations)

### Migration: 001_create_organizations.sql
```sql
-- Organizations table
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  settings JSONB DEFAULT '{"timezone": "UTC", "currency": "USD", "fiscal_year_start": 1}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
```

### Migration: 002_create_profiles.sql
```sql
-- User profiles (linked to auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('owner', 'admin', 'member')) DEFAULT 'member',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, org_id)
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Function to get user's org
CREATE OR REPLACE FUNCTION public.get_user_org_id()
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT org_id FROM public.profiles WHERE user_id = auth.uid() LIMIT 1
$$;
```

### Migration: 003_create_tasks.sql
```sql
-- Task phases and categories
CREATE TYPE public.task_phase AS ENUM ('1', '2', '3', '4', '5');
CREATE TYPE public.task_status AS ENUM ('backlog', 'todo', 'in_progress', 'review', 'completed');
CREATE TYPE public.task_category AS ENUM ('startup', 'fundraising', 'product', 'marketing', 'operations', 'hiring');
CREATE TYPE public.task_priority AS ENUM ('critical', 'high', 'medium', 'low');

CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status public.task_status DEFAULT 'backlog',
  priority public.task_priority DEFAULT 'medium',
  phase public.task_phase DEFAULT '1',
  category public.task_category DEFAULT 'startup',
  due_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  assigned_to UUID REFERENCES public.profiles(id),
  project_id UUID,
  deal_id UUID,
  contact_id UUID,
  ai_generated BOOLEAN DEFAULT FALSE,
  ai_suggested BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Indexes for dashboard queries
CREATE INDEX idx_tasks_org_status ON public.tasks(org_id, status);
CREATE INDEX idx_tasks_org_priority_due ON public.tasks(org_id, priority, due_at);
CREATE INDEX idx_tasks_org_overdue ON public.tasks(org_id, due_at) WHERE status != 'completed';
```

### Migration: 004_create_crm.sql
```sql
-- Contact types
CREATE TYPE public.contact_type AS ENUM ('investor', 'customer', 'advisor', 'partner', 'other');

CREATE TABLE public.crm_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  title TEXT,
  contact_type public.contact_type DEFAULT 'other',
  linkedin_url TEXT,
  notes TEXT,
  last_contacted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.crm_contacts ENABLE ROW LEVEL SECURITY;

-- Deal stages
CREATE TYPE public.deal_stage AS ENUM (
  'lead', 'contacted', 'meeting', 'negotiation', 
  'term_sheet', 'due_diligence', 'closed_won', 'closed_lost'
);

CREATE TABLE public.crm_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  contact_id UUID REFERENCES public.crm_contacts(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  stage public.deal_stage DEFAULT 'lead',
  amount DECIMAL(12, 2),
  probability INTEGER DEFAULT 0 CHECK (probability >= 0 AND probability <= 100),
  expected_close_date DATE,
  last_touch_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.crm_deals ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX idx_contacts_org ON public.crm_contacts(org_id);
CREATE INDEX idx_deals_org_stage ON public.crm_deals(org_id, stage);
```

### Migration: 005_create_projects.sql
```sql
CREATE TYPE public.project_health AS ENUM ('on_track', 'at_risk', 'off_track');

CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  health_score public.project_health DEFAULT 'on_track',
  due_date DATE,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_projects_org ON public.projects(org_id);

-- Add foreign key to tasks
ALTER TABLE public.tasks 
  ADD CONSTRAINT fk_tasks_project 
  FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE SET NULL;

ALTER TABLE public.tasks 
  ADD CONSTRAINT fk_tasks_deal 
  FOREIGN KEY (deal_id) REFERENCES public.crm_deals(id) ON DELETE SET NULL;

ALTER TABLE public.tasks 
  ADD CONSTRAINT fk_tasks_contact 
  FOREIGN KEY (contact_id) REFERENCES public.crm_contacts(id) ON DELETE SET NULL;
```

### Migration: 006_rls_policies.sql
```sql
-- Organizations: users can only see their org
CREATE POLICY "Users can view own org"
  ON public.organizations FOR SELECT
  USING (id = public.get_user_org_id());

-- Profiles: users can view org members
CREATE POLICY "Users can view org profiles"
  ON public.profiles FOR SELECT
  USING (org_id = public.get_user_org_id());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (user_id = auth.uid());

-- Tasks: org isolation
CREATE POLICY "Users can view org tasks"
  ON public.tasks FOR SELECT
  USING (org_id = public.get_user_org_id());

CREATE POLICY "Users can create org tasks"
  ON public.tasks FOR INSERT
  WITH CHECK (org_id = public.get_user_org_id());

CREATE POLICY "Users can update org tasks"
  ON public.tasks FOR UPDATE
  USING (org_id = public.get_user_org_id());

CREATE POLICY "Users can delete org tasks"
  ON public.tasks FOR DELETE
  USING (org_id = public.get_user_org_id());

-- CRM Contacts: org isolation
CREATE POLICY "Users can view org contacts"
  ON public.crm_contacts FOR SELECT
  USING (org_id = public.get_user_org_id());

CREATE POLICY "Users can manage org contacts"
  ON public.crm_contacts FOR ALL
  USING (org_id = public.get_user_org_id());

-- CRM Deals: org isolation
CREATE POLICY "Users can view org deals"
  ON public.crm_deals FOR SELECT
  USING (org_id = public.get_user_org_id());

CREATE POLICY "Users can manage org deals"
  ON public.crm_deals FOR ALL
  USING (org_id = public.get_user_org_id());

-- Projects: org isolation
CREATE POLICY "Users can view org projects"
  ON public.projects FOR SELECT
  USING (org_id = public.get_user_org_id());

CREATE POLICY "Users can manage org projects"
  ON public.projects FOR ALL
  USING (org_id = public.get_user_org_id());
```

---

## Success Criteria

- [ ] All TypeScript types match database schema
- [ ] Migrations run without errors
- [ ] RLS blocks cross-org access (test with 2 users)
- [ ] Common dashboard queries use indexes
