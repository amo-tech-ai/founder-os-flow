import { Outlet } from 'react-router-dom';
import { DashboardNav } from './DashboardNav';
import { AIPanel } from './AIPanel';
import { DashboardHeader } from './DashboardHeader';
import { mockAIInsights } from '@/data/mockData';

export function AppShell() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="flex">
        {/* Left Panel - Navigation */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card min-h-[calc(100vh-4rem)] sticky top-16">
          <DashboardNav />
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
        
        {/* Right Panel - AI Intelligence */}
        <aside className="hidden xl:flex w-80 flex-col border-l border-border bg-card min-h-[calc(100vh-4rem)] sticky top-16">
          <AIPanel insights={mockAIInsights} />
        </aside>
      </div>
    </div>
  );
}
