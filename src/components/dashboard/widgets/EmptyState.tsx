import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, FileText, Rocket, Users } from 'lucide-react';

interface EmptyStateProps {
  type: 'tasks' | 'deals' | 'contacts' | 'projects' | 'dashboard';
  onAction?: () => void;
}

const emptyStateConfig = {
  tasks: {
    icon: PlusCircle,
    title: 'No tasks yet',
    description: 'Create your first task to start tracking your work.',
    actionLabel: 'Create Task',
    tips: ['Break big goals into small tasks', 'Set due dates to stay on track', 'Prioritize what matters most']
  },
  deals: {
    icon: Rocket,
    title: 'No deals in your pipeline',
    description: 'Add your first deal to start tracking your fundraising or sales.',
    actionLabel: 'Add Deal',
    tips: ['Track investor conversations', 'Set follow-up reminders', 'Monitor your pipeline value']
  },
  contacts: {
    icon: Users,
    title: 'No contacts yet',
    description: 'Add investors, partners, or customers to your CRM.',
    actionLabel: 'Add Contact',
    tips: ['Import from LinkedIn', 'Track interaction history', 'Set relationship types']
  },
  projects: {
    icon: FileText,
    title: 'No projects yet',
    description: 'Create a project to organize your work into milestones.',
    actionLabel: 'Create Project',
    tips: ['Group related tasks', 'Track project health', 'Set milestone deadlines']
  },
  dashboard: {
    icon: Search,
    title: 'Getting started',
    description: "Welcome! Let's set up your startup command center.",
    actionLabel: 'Start Setup',
    tips: ['Add your first project', 'Create key tasks', 'Set your goals']
  }
};

export function EmptyState({ type, onAction }: EmptyStateProps) {
  const config = emptyStateConfig[type];
  const Icon = config.icon;

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{config.title}</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-sm">
          {config.description}
        </p>

        {onAction && (
          <Button onClick={onAction} className="mb-6">
            <PlusCircle className="w-4 h-4 mr-2" />
            {config.actionLabel}
          </Button>
        )}

        <div className="border-t pt-6 w-full max-w-xs">
          <p className="text-xs font-medium text-muted-foreground mb-3">
            Quick tips
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            {config.tips.map((tip, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
