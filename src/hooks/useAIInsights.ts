import { useState, useCallback, useEffect } from 'react';
import { mockAIInsights } from '@/data/mockData';
import { AIInsight } from '@/types/dashboard';

interface AIContext {
  type: 'dashboard' | 'task' | 'deal' | 'project' | 'contact';
  id?: string;
  data?: Record<string, unknown>;
}

interface UseAIInsightsReturn {
  insights: AIInsight | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => void;
}

export function useAIInsights(context: AIContext): UseAIInsightsReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [insights, setInsights] = useState<AIInsight | null>(mockAIInsights);

  const fetchInsights = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with real API call
      // const response = await supabase.functions.invoke('ai-insights', {
      //   body: { context_type: context.type, context_id: context.id, dashboard_state: context.data }
      // });
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      // Return context-aware insights based on type
      if (context.type === 'dashboard') {
        setInsights(mockAIInsights);
      } else {
        // Generate context-specific insights
        setInsights({
          summary: `Viewing ${context.type} details. Everything looks on track.`,
          next_steps: [
            { id: '1', action: 'Review recent changes', action_type: 'navigate', priority: 'medium' },
            { id: '2', action: 'Update status if needed', action_type: 'navigate', priority: 'low' }
          ],
          risks: []
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch AI insights'));
    } finally {
      setIsLoading(false);
    }
  }, [context.type, context.id]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  return {
    insights,
    isLoading,
    error,
    refresh: fetchInsights
  };
}
