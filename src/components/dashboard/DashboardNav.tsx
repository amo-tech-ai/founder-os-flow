import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  FolderKanban, 
  Users, 
  TrendingUp,
  User,
  Building2,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { 
    label: 'Dashboard', 
    path: '/app/dashboard', 
    icon: LayoutDashboard,
    description: 'Overview & priorities'
  },
  { 
    label: 'Tasks', 
    path: '/app/tasks', 
    icon: CheckSquare,
    description: 'All your tasks'
  },
  { 
    label: 'Projects', 
    path: '/app/projects', 
    icon: FolderKanban,
    description: 'Project tracking'
  },
  { 
    label: 'Contacts', 
    path: '/app/contacts', 
    icon: Users,
    description: 'CRM & relationships'
  },
  { 
    label: 'Deals', 
    path: '/app/deals', 
    icon: TrendingUp,
    description: 'Pipeline & fundraising'
  },
];

const bottomNavItems = [
  { 
    label: 'Profile', 
    path: '/app/profile', 
    icon: User,
  },
  { 
    label: 'Company', 
    path: '/app/company', 
    icon: Building2,
  },
  { 
    label: 'Settings', 
    path: '/app/settings', 
    icon: Settings,
  },
];

export function DashboardNav() {
  const location = useLocation();

  return (
    <nav className="flex flex-col h-full py-4">
      <div className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/app/dashboard' && location.pathname.startsWith(item.path));
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
      
      <div className="border-t border-border pt-4 px-3 space-y-1">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
