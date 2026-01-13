import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, Clock, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'backlog' | 'todo' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  showIcon?: boolean;
  size?: 'sm' | 'md';
}

const statusConfig = {
  backlog: {
    label: 'Backlog',
    icon: Circle,
    className: 'bg-muted text-muted-foreground'
  },
  todo: {
    label: 'To Do',
    icon: Circle,
    className: 'bg-secondary text-secondary-foreground'
  },
  in_progress: {
    label: 'In Progress',
    icon: Clock,
    className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
  },
  review: {
    label: 'Review',
    icon: Clock,
    className: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
  },
  completed: {
    label: 'Done',
    icon: CheckCircle2,
    className: 'bg-green-500/10 text-green-600 dark:text-green-400'
  },
  cancelled: {
    label: 'Cancelled',
    icon: XCircle,
    className: 'bg-muted text-muted-foreground line-through'
  }
};

export function StatusBadge({ status, showIcon = true, size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        config.className
      )}
    >
      {showIcon && <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />}
      {config.label}
    </span>
  );
}
