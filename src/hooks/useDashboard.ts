import { useState, useCallback } from 'react';
import { mockTasks, mockKPIs, mockRisks } from '@/data/mockData';
import { Task, DashboardKPIs, RiskItem } from '@/types/dashboard';

interface DashboardData {
  top_tasks: Task[];
  kpis: DashboardKPIs;
  risks: RiskItem[];
}

interface UseDashboardReturn {
  data: DashboardData | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  completeTask: (taskId: string) => Promise<void>;
}

export function useDashboard(): UseDashboardReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<DashboardData>({
    top_tasks: mockTasks.slice(0, 3),
    kpis: mockKPIs,
    risks: mockRisks
  });

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with real API call
      // const response = await supabase.functions.invoke('dashboard-summary');
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      setData({
        top_tasks: mockTasks.slice(0, 3),
        kpis: mockKPIs,
        risks: mockRisks
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch dashboard'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const completeTask = useCallback(async (taskId: string) => {
    // Optimistic update
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        top_tasks: prev.top_tasks.filter(t => t.id !== taskId),
        kpis: {
          ...prev.kpis,
          tasks_due_today: Math.max(0, prev.kpis.tasks_due_today - 1)
        }
      };
    });

    try {
      // TODO: Replace with real API call
      // await supabase.from('tasks').update({ status: 'completed' }).eq('id', taskId);
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (err) {
      // Revert on error
      refetch();
      throw err;
    }
  }, [refetch]);

  return {
    data,
    isLoading,
    error,
    refetch,
    completeTask
  };
}
