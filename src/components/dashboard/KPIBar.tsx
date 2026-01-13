import { DollarSign, Clock, TrendingUp, CheckSquare, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DashboardKPIs } from '@/types/dashboard';

interface KPIBarProps {
  kpis: DashboardKPIs;
}

const formatCurrency = (value: number) => {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`;
  }
  return `$${value}`;
};

export function KPIBar({ kpis }: KPIBarProps) {
  const kpiItems = [
    {
      label: 'MRR',
      value: formatCurrency(kpis.mrr),
      icon: DollarSign,
      trend: '+12%',
      trendUp: true,
    },
    {
      label: 'Runway',
      value: `${kpis.runway_months} mo`,
      icon: Clock,
      description: 'at current burn',
    },
    {
      label: 'Active Deals',
      value: kpis.active_deals.toString(),
      icon: TrendingUp,
      description: 'in pipeline',
    },
    {
      label: 'Tasks Today',
      value: kpis.tasks_due_today.toString(),
      icon: CheckSquare,
      highlight: kpis.tasks_due_today > 0,
    },
    {
      label: 'Overdue',
      value: kpis.overdue_tasks.toString(),
      icon: AlertCircle,
      alert: kpis.overdue_tasks > 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {kpiItems.map((item) => (
        <div
          key={item.label}
          className={cn(
            "card-soft flex flex-col",
            item.alert && "border border-destructive/20 bg-destructive/5"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <item.icon className={cn(
              "w-4 h-4",
              item.alert ? "text-destructive" : "text-muted-foreground"
            )} />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={cn(
              "text-2xl font-serif font-medium",
              item.alert && "text-destructive"
            )}>
              {item.value}
            </span>
            {item.trend && (
              <span className={cn(
                "text-xs",
                item.trendUp ? "text-green-600" : "text-destructive"
              )}>
                {item.trend}
              </span>
            )}
          </div>
          {item.description && (
            <span className="text-xs text-muted-foreground mt-1">{item.description}</span>
          )}
        </div>
      ))}
    </div>
  );
}
