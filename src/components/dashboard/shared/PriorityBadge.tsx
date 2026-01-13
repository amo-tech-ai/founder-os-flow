import { cn } from '@/lib/utils';

interface PriorityBadgeProps {
  priority: 'critical' | 'high' | 'medium' | 'low';
  size?: 'sm' | 'md';
}

const priorityConfig = {
  critical: {
    label: 'Critical',
    className: 'bg-destructive/10 text-destructive border-destructive/20'
  },
  high: {
    label: 'High',
    className: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20'
  },
  medium: {
    label: 'Medium',
    className: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20'
  },
  low: {
    label: 'Low',
    className: 'bg-muted text-muted-foreground border-border'
  }
};

export function PriorityBadge({ priority, size = 'sm' }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
