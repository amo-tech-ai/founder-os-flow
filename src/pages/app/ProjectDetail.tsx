import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockProjects, mockTasks } from '@/data/mockData';
import type { ProjectHealth } from '@/types/dashboard';

const getHealthStyles = (health: ProjectHealth) => {
  switch (health) {
    case 'on_track': return { badge: 'bg-green-500/10 text-green-600', label: 'On Track' };
    case 'at_risk': return { badge: 'bg-amber-500/10 text-amber-600', label: 'At Risk' };
    case 'behind': return { badge: 'bg-destructive/10 text-destructive', label: 'Behind' };
    case 'completed': return { badge: 'bg-blue-500/10 text-blue-600', label: 'Completed' };
  }
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = mockProjects.find(p => p.id === id);
  const projectTasks = mockTasks.filter(t => t.project_id === id);

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Project not found</p>
        <Link to="/app/projects" className="text-primary hover:underline mt-2 inline-block">
          Back to Projects
        </Link>
      </div>
    );
  }

  const healthStyles = getHealthStyles(project.health);

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link 
        to="/app/projects" 
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="heading-section">{project.name}</h1>
          {project.description && (
            <p className="body-base mt-2">{project.description}</p>
          )}
        </div>
        <Badge className={healthStyles.badge}>{healthStyles.label}</Badge>
      </div>

      {/* Progress */}
      <div className="card-elevated">
        <div className="flex items-center justify-between mb-4">
          <h2 className="heading-card">Progress</h2>
          <span className="text-2xl font-serif font-medium">{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-3" />
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <span>{project.completed_task_count} completed</span>
          <span>{project.task_count - project.completed_task_count} remaining</span>
        </div>
      </div>

      {/* Tasks */}
      <div className="card-elevated">
        <div className="flex items-center justify-between mb-4">
          <h2 className="heading-card">Tasks</h2>
          <Button size="sm">Add Task</Button>
        </div>
        
        {projectTasks.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No tasks linked to this project yet.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {projectTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 py-3">
                {task.status === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
                <span className={task.status === 'completed' ? 'line-through text-muted-foreground' : ''}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
