import { Sparkles, ArrowRight, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { AIInsight, RiskItem } from '@/types/dashboard';

interface AIPanelProps {
  insights: AIInsight;
  isLoading?: boolean;
}

export function AIPanel({ insights, isLoading }: AIPanelProps) {
  const getSeverityColor = (severity: RiskItem['severity']) => {
    switch (severity) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'low': return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-amber-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-sm">AI Assistant</h3>
              <p className="text-xs text-muted-foreground">Context-aware insights</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Summary */}
        <section>
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Summary
          </h4>
          <p className="text-sm leading-relaxed">{insights.summary}</p>
        </section>

        {/* Next Steps */}
        <section>
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Suggested Next Steps
          </h4>
          <div className="space-y-2">
            {insights.next_steps.map((step) => (
              <button
                key={step.id}
                className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className={cn("text-sm", getPriorityColor(step.priority))}>
                    {step.action}
                  </p>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                </div>
                <Badge variant="outline" className="mt-2 text-xs">
                  {step.action_type.replace('_', ' ')}
                </Badge>
              </button>
            ))}
          </div>
        </section>

        {/* Risks */}
        {insights.risks.length > 0 && (
          <section>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Risks & Attention
            </h4>
            <div className="space-y-2">
              {insights.risks.map((risk) => (
                <div
                  key={risk.id}
                  className={cn(
                    "p-3 rounded-lg border",
                    getSeverityColor(risk.severity)
                  )}
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{risk.title}</p>
                      <p className="text-xs mt-0.5 opacity-80">{risk.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button variant="outline" size="sm" className="w-full">
          <Sparkles className="w-4 h-4 mr-2" />
          Generate Tasks from Insights
        </Button>
      </div>
    </div>
  );
}
