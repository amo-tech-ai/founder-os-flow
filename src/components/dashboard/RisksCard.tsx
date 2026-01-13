import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { RiskItem } from '@/types/dashboard';

interface RisksCardProps {
  risks: RiskItem[];
}

const getSeverityStyles = (severity: RiskItem['severity']) => {
  switch (severity) {
    case 'high': return {
      badge: 'bg-destructive text-destructive-foreground',
      icon: 'text-destructive',
    };
    case 'medium': return {
      badge: 'bg-amber-500 text-white',
      icon: 'text-amber-500',
    };
    default: return {
      badge: 'bg-muted text-muted-foreground',
      icon: 'text-muted-foreground',
    };
  }
};

const getEntityRoute = (risk: RiskItem) => {
  switch (risk.entity_type) {
    case 'task': return `/app/tasks`;
    case 'deal': return `/app/deals`;
    case 'project': return `/app/projects`;
  }
};

export function RisksCard({ risks }: RisksCardProps) {
  if (risks.length === 0) {
    return (
      <div className="card-elevated">
        <h2 className="heading-card mb-4">Risks & Attention</h2>
        <div className="text-center py-8">
          <CheckCircle2 className="w-12 h-12 text-green-500/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No risks detected. Looking good!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-elevated">
      <div className="flex items-center justify-between mb-4">
        <h2 className="heading-card">Risks & Attention</h2>
        <Badge variant="destructive" className="text-xs">
          {risks.length} item{risks.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="space-y-3">
        {risks.map((risk) => {
          const styles = getSeverityStyles(risk.severity);
          
          return (
            <Link
              key={risk.id}
              to={getEntityRoute(risk)}
              className="block p-3 rounded-lg border border-border hover:border-muted-foreground/30 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className={cn("w-5 h-5 flex-shrink-0 mt-0.5", styles.icon)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium truncate">{risk.title}</p>
                    <Badge className={cn("text-xs", styles.badge)}>
                      {risk.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{risk.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
