import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, ArrowRight, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Task } from '@/types/dashboard';

interface PrioritiesCardProps {
  tasks: Task[];
  onToggleComplete?: (taskId: string) => void;
}

const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'urgent': return 'bg-destructive/10 text-destructive border-destructive/30';
    case 'high': return 'bg-amber-500/10 text-amber-600 border-amber-500/30';
    case 'medium': return 'bg-blue-500/10 text-blue-600 border-blue-500/30';
    default: return 'bg-muted text-muted-foreground border-border';
  }
};

const getCategoryColor = (category: Task['category']) => {
  switch (category) {
    case 'fundraising': return 'bg-purple-500/10 text-purple-600';
    case 'product': return 'bg-blue-500/10 text-blue-600';
    case 'marketing': return 'bg-green-500/10 text-green-600';
    case 'operations': return 'bg-orange-500/10 text-orange-600';
    default: return 'bg-muted text-muted-foreground';
  }
};

const formatDueDate = (date?: string) => {
  if (!date) return null;
  const d = new Date(date);
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  if (days < 0) return { text: `${Math.abs(days)}d overdue`, overdue: true };
  if (days === 0) return { text: 'Today', urgent: true };
  if (days === 1) return { text: 'Tomorrow', urgent: true };
  return { text: `${days}d`, overdue: false };
};

export function PrioritiesCard({ tasks, onToggleComplete }: PrioritiesCardProps) {
  const activeTasks = tasks.filter(t => t.status !== 'completed').slice(0, 5);

  return (
    <div className="card-elevated">
      <div className="flex items-center justify-between mb-4">
        <h2 className="heading-card">Today's Priorities</h2>
        <Link 
          to="/app/tasks" 
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {activeTasks.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircle2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">All caught up! No pending tasks.</p>
          <Link 
            to="/app/tasks" 
            className="text-sm text-primary hover:underline mt-2 inline-block"
          >
            Create a new task
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {activeTasks.map((task) => {
            const dueInfo = formatDueDate(task.due_at);
            
            return (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <button 
                  onClick={() => onToggleComplete?.(task.id)}
                  className="mt-0.5"
                >
                  <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
                
                <div className="flex-1 min-w-0">
                  <Link to={`/app/tasks`} className="block">
                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                      {task.title}
                    </p>
                  </Link>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <Badge variant="outline" className={cn("text-xs", getPriorityColor(task.priority))}>
                      {task.priority}
                    </Badge>
                    <Badge variant="secondary" className={cn("text-xs", getCategoryColor(task.category))}>
                      {task.category}
                    </Badge>
                    {dueInfo && (
                      <span className={cn(
                        "text-xs flex items-center gap-1",
                        dueInfo.overdue ? "text-destructive" : 
                        dueInfo.urgent ? "text-amber-600" : "text-muted-foreground"
                      )}>
                        <Calendar className="w-3 h-3" />
                        {dueInfo.text}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
