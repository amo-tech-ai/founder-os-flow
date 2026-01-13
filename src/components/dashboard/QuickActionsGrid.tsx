import { Link } from 'react-router-dom';
import { Plus, Users, TrendingUp, FolderKanban, FileText } from 'lucide-react';

const actions = [
  {
    label: 'New Task',
    icon: Plus,
    href: '/app/tasks',
    description: 'Create a task',
    color: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20',
  },
  {
    label: 'Add Contact',
    icon: Users,
    href: '/app/contacts',
    description: 'Add to CRM',
    color: 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20',
  },
  {
    label: 'New Deal',
    icon: TrendingUp,
    href: '/app/deals',
    description: 'Start pipeline',
    color: 'bg-green-500/10 text-green-600 hover:bg-green-500/20',
  },
  {
    label: 'New Project',
    icon: FolderKanban,
    href: '/app/projects',
    description: 'Track milestone',
    color: 'bg-orange-500/10 text-orange-600 hover:bg-orange-500/20',
  },
];

export function QuickActionsGrid() {
  return (
    <div className="card-elevated">
      <h2 className="heading-card mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            to={action.href}
            className={`p-4 rounded-lg transition-all ${action.color}`}
          >
            <action.icon className="w-6 h-6 mb-2" />
            <p className="text-sm font-medium">{action.label}</p>
            <p className="text-xs opacity-70">{action.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
