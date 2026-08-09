import { createContext, useContext, useState } from 'react';

export type AppTab = 'explore' | 'resources' | 'skill' | 'aipaths' | 'onehour' | 'dashboard' | 'saved' | 'interview' | 'progress';

interface NavigationContextValue {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<AppTab>('explore');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  return <NavigationContext.Provider value={{ activeTab, setActiveTab, isOnboardingOpen, setIsOnboardingOpen, isSearchOpen, setIsSearchOpen, isAssistantOpen, setIsAssistantOpen }}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within NavigationProvider');
  return context;
}
