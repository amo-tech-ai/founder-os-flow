import { Plus, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { mockDeals } from '@/data/mockData';
import type { DealStage } from '@/types/dashboard';

const stages: { value: DealStage; label: string }[] = [
  { value: 'lead', label: 'Lead' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'proposal', label: 'Proposal' },
  { value: 'negotiation', label: 'Negotiation' },
  { value: 'closed_won', label: 'Won' },
  { value: 'closed_lost', label: 'Lost' },
];

const getStageColor = (stage: DealStage) => {
  switch (stage) {
    case 'lead': return 'border-gray-300 bg-gray-50';
    case 'contacted': return 'border-blue-300 bg-blue-50';
    case 'meeting': return 'border-purple-300 bg-purple-50';
    case 'proposal': return 'border-amber-300 bg-amber-50';
    case 'negotiation': return 'border-orange-300 bg-orange-50';
    case 'closed_won': return 'border-green-300 bg-green-50';
    case 'closed_lost': return 'border-red-300 bg-red-50';
  }
};

const formatCurrency = (value?: number) => {
  if (!value) return '-';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);
};

export default function Deals() {
  const getDealsForStage = (stage: DealStage) => 
    mockDeals.filter(deal => deal.stage === stage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-section">Deal Pipeline</h1>
          <p className="body-base mt-1">Track your fundraising and sales pipeline</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Deal
        </Button>
      </div>

      {/* Pipeline Summary */}
      <div className="card-elevated">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Pipeline</p>
            <p className="text-2xl font-serif font-medium">
              {formatCurrency(mockDeals.reduce((sum, d) => sum + (d.amount || 0), 0))}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active Deals</p>
            <p className="text-2xl font-serif font-medium">{mockDeals.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Avg. Probability</p>
            <p className="text-2xl font-serif font-medium">
              {Math.round(mockDeals.reduce((sum, d) => sum + (d.probability || 0), 0) / mockDeals.length)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Weighted Value</p>
            <p className="text-2xl font-serif font-medium">
              {formatCurrency(
                mockDeals.reduce((sum, d) => sum + ((d.amount || 0) * (d.probability || 0) / 100), 0)
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {stages.slice(0, 5).map((stage) => {
            const stageDeals = getDealsForStage(stage.value);
            
            return (
              <div key={stage.value} className="w-72 flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm">{stage.label}</h3>
                  <Badge variant="secondary">{stageDeals.length}</Badge>
                </div>
                
                <div className="space-y-3">
                  {stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className={cn(
                        "p-4 rounded-lg border-2 cursor-pointer hover:shadow-md transition-shadow",
                        getStageColor(deal.stage)
                      )}
                    >
                      <h4 className="font-medium text-sm mb-2">{deal.name}</h4>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{formatCurrency(deal.amount)}</span>
                        <span className="text-xs text-muted-foreground">
                          ({deal.probability}% prob)
                        </span>
                      </div>
                      
                      {deal.contact && (
                        <p className="text-xs text-muted-foreground">
                          {deal.contact.name} • {deal.contact.company}
                        </p>
                      )}
                      
                      {deal.last_touch_at && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Last touch: {new Date(deal.last_touch_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                  
                  {stageDeals.length === 0 && (
                    <div className="p-4 rounded-lg border-2 border-dashed border-border text-center">
                      <p className="text-sm text-muted-foreground">No deals</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
