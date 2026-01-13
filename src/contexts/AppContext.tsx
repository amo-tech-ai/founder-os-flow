import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockUser } from '@/data/mockData';

interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}

interface Organization {
  id: string;
  name: string;
  slug: string;
}

interface AppContextType {
  user: User | null;
  organization: Organization | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setOrganization: (org: Organization | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check - replace with real Supabase auth
    const checkAuth = async () => {
      try {
        // TODO: Replace with supabase.auth.getSession()
        // For now, use mock user
        setUser(mockUser);
        setOrganization({
          id: 'org-1',
          name: 'Demo Startup',
          slug: 'demo-startup'
        });
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
        setOrganization(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const value: AppContextType = {
    user,
    organization,
    isLoading,
    isAuthenticated: !!user,
    setUser,
    setOrganization,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export function useUser() {
  const { user, isAuthenticated, isLoading } = useApp();
  return { user, isAuthenticated, isLoading };
}

export function useOrganization() {
  const { organization } = useApp();
  return organization;
}
