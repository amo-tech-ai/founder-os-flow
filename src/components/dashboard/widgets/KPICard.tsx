import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  variant?: 'default' | 'highlight' | 'warning' | 'danger';
  isLoading?: boolean;
}

const variantStyles = {
  default: 'bg-card',
  highlight: 'bg-primary/5 border-primary/20',
  warning: 'bg-yellow-500/5 border-yellow-500/20',
  danger: 'bg-destructive/5 border-destructive/20'
};

export function KPICard({ 
  label, 
  value, 
  icon: Icon, 
  trend, 
  variant = 'default',
  isLoading = false 
}: KPICardProps) {
  if (isLoading) {
    return (
      <Card className={cn(variantStyles[variant])}>
        <CardContent className="p-4">
          <Skeleton className="h-4 w-16 mb-2" />
          <Skeleton className="h-8 w-24" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(variantStyles[variant])}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </span>
          {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
        </div>
        
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold">{value}</span>
          
          {trend && (
            <span 
              className={cn(
                'inline-flex items-center text-xs font-medium',
                trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend.direction === 'up' ? (
                <TrendingUp className="w-3 h-3 mr-0.5" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-0.5" />
              )}
              {trend.value}%
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
