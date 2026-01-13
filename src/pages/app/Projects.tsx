import { Link } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { mockProjects } from '@/data/mockData';
import type { ProjectHealth } from '@/types/dashboard';

const getHealthStyles = (health: ProjectHealth) => {
  switch (health) {
    case 'on_track': return { badge: 'bg-green-500/10 text-green-600', label: 'On Track' };
    case 'at_risk': return { badge: 'bg-amber-500/10 text-amber-600', label: 'At Risk' };
    case 'behind': return { badge: 'bg-destructive/10 text-destructive', label: 'Behind' };
    case 'completed': return { badge: 'bg-blue-500/10 text-blue-600', label: 'Completed' };
  }
};

export default function Projects() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-section">Projects</h1>
          <p className="body-base mt-1">Track milestones and deliverables</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => {
          const healthStyles = getHealthStyles(project.health);
          
          return (
            <Link
              key={project.id}
              to={`/app/projects/${project.id}`}
              className="card-elevated hover:shadow-elevated transition-shadow group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="heading-card group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {project.description && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
              )}

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={healthStyles.badge}>{healthStyles.label}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {project.completed_task_count}/{project.task_count} tasks
                  </span>
                </div>

                {project.due_date && (
                  <p className="text-xs text-muted-foreground">
                    Due {new Date(project.due_date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
