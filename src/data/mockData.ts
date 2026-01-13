import type { 
  Task, Contact, Deal, Project, DashboardKPIs, RiskItem, AIInsight, 
  UserProfile, CompanyProfile 
} from '@/types/dashboard';

export const mockUser: UserProfile = {
  id: '1',
  email: 'founder@startup.ai',
  full_name: 'Alex Chen',
  role: 'Founder & CEO',
  company_name: 'StartupAI',
};

export const mockCompany: CompanyProfile = {
  id: '1',
  name: 'StartupAI',
  description: 'AI operating system for founders',
  industry: 'SaaS / AI',
  stage: 'seed',
  founded_at: '2024-01-15',
  website: 'https://startup.ai',
  team_size: 5,
};

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Finalize pitch deck for Series A',
    description: 'Update financials and traction slides',
    status: 'in_progress',
    priority: 'urgent',
    phase: 4,
    category: 'fundraising',
    due_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Follow up with Sequoia partner',
    description: 'Send updated metrics and schedule call',
    status: 'backlog',
    priority: 'high',
    phase: 4,
    category: 'fundraising',
    due_at: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    contact_id: '1',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Launch beta to 50 users',
    description: 'Coordinate with marketing for announcement',
    status: 'in_progress',
    priority: 'high',
    phase: 3,
    category: 'product',
    project_id: '1',
    due_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Hire senior engineer',
    description: 'Review candidates and schedule interviews',
    status: 'backlog',
    priority: 'medium',
    phase: 2,
    category: 'operations',
    due_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Update investor CRM',
    description: 'Add notes from recent meetings',
    status: 'completed',
    priority: 'low',
    phase: 4,
    category: 'fundraising',
    completed_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  },
];

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@sequoia.com',
    company: 'Sequoia Capital',
    role: 'Partner',
    type: 'investor',
    last_contact_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Michael Park',
    email: 'michael@a16z.com',
    company: 'Andreessen Horowitz',
    role: 'Principal',
    type: 'investor',
    last_contact_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Emily Zhang',
    email: 'emily@techcorp.com',
    company: 'TechCorp',
    role: 'VP Engineering',
    type: 'customer',
    last_contact_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david@advisor.com',
    company: 'Independent',
    role: 'Startup Advisor',
    type: 'advisor',
    created_at: new Date().toISOString(),
  },
];

export const mockDeals: Deal[] = [
  {
    id: '1',
    name: 'Sequoia Seed Round',
    stage: 'meeting',
    amount: 2000000,
    probability: 40,
    contact_id: '1',
    contact: mockContacts[0],
    last_touch_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    expected_close_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'A16Z Series A',
    stage: 'contacted',
    amount: 5000000,
    probability: 20,
    contact_id: '2',
    contact: mockContacts[1],
    last_touch_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'TechCorp Enterprise Deal',
    stage: 'proposal',
    amount: 50000,
    probability: 60,
    contact_id: '3',
    contact: mockContacts[2],
    last_touch_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    expected_close_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Beta Launch',
    description: 'Launch MVP to first 50 beta users',
    health: 'on_track',
    progress: 75,
    due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    task_count: 12,
    completed_task_count: 9,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Series A Fundraise',
    description: 'Raise $5M Series A round',
    health: 'at_risk',
    progress: 35,
    due_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    task_count: 20,
    completed_task_count: 7,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Team Expansion',
    description: 'Hire 3 key roles',
    health: 'behind',
    progress: 20,
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    task_count: 8,
    completed_task_count: 2,
    created_at: new Date().toISOString(),
  },
];

export const mockKPIs: DashboardKPIs = {
  mrr: 12500,
  runway_months: 18,
  active_deals: 3,
  tasks_due_today: 2,
  overdue_tasks: 1,
};

export const mockRisks: RiskItem[] = [
  {
    id: '1',
    type: 'stalled_deal',
    title: 'A16Z deal stalled',
    description: 'No contact in 7 days',
    severity: 'high',
    entity_id: '2',
    entity_type: 'deal',
  },
  {
    id: '2',
    type: 'project_risk',
    title: 'Team Expansion behind schedule',
    description: 'Only 20% complete with 30 days remaining',
    severity: 'medium',
    entity_id: '3',
    entity_type: 'project',
  },
];

export const mockAIInsights: AIInsight = {
  summary: 'Good momentum on product launch. Fundraising needs attention — 2 deals require follow-up this week.',
  next_steps: [
    {
      id: '1',
      action: 'Schedule follow-up call with Sarah at Sequoia',
      action_type: 'schedule',
      priority: 'high',
    },
    {
      id: '2',
      action: 'Send updated metrics to Michael at A16Z',
      action_type: 'send_email',
      priority: 'high',
    },
    {
      id: '3',
      action: 'Review beta user feedback before launch',
      action_type: 'navigate',
      priority: 'medium',
    },
  ],
  risks: mockRisks,
};
