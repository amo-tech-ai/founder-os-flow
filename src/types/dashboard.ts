// Dashboard Types - Mock data contracts

export type TaskPhase = 1 | 2 | 3 | 4 | 5;
export type TaskStatus = 'backlog' | 'in_progress' | 'review' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskCategory = 'startup' | 'marketing' | 'fundraising' | 'product' | 'operations';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  phase: TaskPhase;
  category: TaskCategory;
  due_at?: string;
  completed_at?: string;
  project_id?: string;
  deal_id?: string;
  contact_id?: string;
  ai_generated?: boolean;
  created_at: string;
}

export type DealStage = 'lead' | 'contacted' | 'meeting' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
export type ContactType = 'investor' | 'customer' | 'advisor' | 'partner' | 'other';

export interface Contact {
  id: string;
  name: string;
  email?: string;
  company?: string;
  role?: string;
  type: ContactType;
  notes?: string;
  last_contact_at?: string;
  created_at: string;
}

export interface Deal {
  id: string;
  name: string;
  stage: DealStage;
  amount?: number;
  probability?: number;
  contact_id?: string;
  contact?: Contact;
  last_touch_at?: string;
  expected_close_at?: string;
  notes?: string;
  created_at: string;
}

export type ProjectHealth = 'on_track' | 'at_risk' | 'behind' | 'completed';

export interface Project {
  id: string;
  name: string;
  description?: string;
  health: ProjectHealth;
  progress: number;
  due_date?: string;
  task_count: number;
  completed_task_count: number;
  created_at: string;
}

export interface DashboardKPIs {
  mrr: number;
  runway_months: number;
  active_deals: number;
  tasks_due_today: number;
  overdue_tasks: number;
}

export interface RiskItem {
  id: string;
  type: 'overdue_task' | 'stalled_deal' | 'project_risk';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  entity_id: string;
  entity_type: 'task' | 'deal' | 'project';
}

export interface AIInsight {
  summary: string;
  next_steps: Array<{
    id: string;
    action: string;
    action_type: 'navigate' | 'create_task' | 'send_email' | 'schedule';
    priority: 'low' | 'medium' | 'high';
  }>;
  risks: RiskItem[];
}

export interface DashboardSummary {
  top_tasks: Task[];
  kpis: DashboardKPIs;
  risks: RiskItem[];
  ai_insights: AIInsight;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role?: string;
  company_name?: string;
}

export interface CompanyProfile {
  id: string;
  name: string;
  description?: string;
  industry?: string;
  stage?: 'idea' | 'pre_seed' | 'seed' | 'series_a' | 'series_b';
  founded_at?: string;
  website?: string;
  team_size?: number;
}
