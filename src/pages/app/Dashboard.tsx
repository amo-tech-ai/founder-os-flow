import { mockTasks, mockKPIs, mockRisks, mockUser } from '@/data/mockData';
import { KPIBar } from '@/components/dashboard/KPIBar';
import { PrioritiesCard } from '@/components/dashboard/PrioritiesCard';
import { RisksCard } from '@/components/dashboard/RisksCard';
import { QuickActionsGrid } from '@/components/dashboard/QuickActionsGrid';

export default function Dashboard() {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="heading-section">
          {greeting()}, {mockUser.full_name.split(' ')[0]}
        </h1>
        <p className="body-base mt-2">
          Here's what needs your attention today.
        </p>
      </div>

      {/* KPI Strip */}
      <KPIBar kpis={mockKPIs} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priorities - Takes 2 columns */}
        <div className="lg:col-span-2">
          <PrioritiesCard tasks={mockTasks} />
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActionsGrid />
        </div>
      </div>

      {/* Risks */}
      <RisksCard risks={mockRisks} />
    </div>
  );
}
