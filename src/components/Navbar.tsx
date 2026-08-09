import React from 'react';
import { 
  Sparkles, 
  Search, 
  Bookmark, 
  Clock, 
  Compass,
  Code2,
  BarChart3,
  FolderOpen,
  Route,
  SlidersHorizontal,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { UserGoals } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userGoals: UserGoals;
  onOpenOnboarding: () => void;
  onOpenSearch: () => void;
  onStartOneHour: (skillName?: string) => void;
}

const NAV_ITEMS = [
  { id: 'explore', label: 'Home', icon: Compass, color: 'text-cyan-400' },
  { id: 'dashboard', label: 'My Learning', icon: FolderOpen, color: 'text-emerald-400' },
  { id: 'resources', label: 'Resources', icon: Search, color: 'text-blue-400' },
  { id: 'aipaths', label: 'AI Paths', icon: Route, color: 'text-purple-400' },
];

const SECONDARY_NAV = [
  { id: 'interview', label: 'Interview', icon: Code2, color: 'text-amber-400' },
  { id: 'saved', label: 'Saved', icon: Bookmark, color: 'text-amber-400' },
  { id: 'progress', label: 'Progress', icon: BarChart3, color: 'text-cyan-400' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userGoals,
  onOpenOnboarding,
  onOpenSearch,
  onStartOneHour,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return true; // Default to dark
  });

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-surface-border" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('explore')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          role="link"
          aria-label="Go to homepage"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-glow-primary transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-background rounded-[7px] flex items-center justify-center">
              <Clock className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="font-semibold text-sm tracking-tight text-text-primary group-hover:text-indigo-300 transition-colors">
              One-Hour Skill Trainer
            </span>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="hidden md:flex items-center gap-0.5" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive 
                    ? 'text-text-primary' 
                    : 'text-text-muted hover:text-text-secondary hover:bg-surface-high/30'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? item.color : ''}`} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary-500 rounded-full" />
                )}
              </button>
            );
          })}

          {/* Secondary nav items */}
          <div className="w-px h-4 bg-surface-border mx-1" />
          {SECONDARY_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'text-text-primary'
                    : 'text-text-muted hover:text-text-secondary hover:bg-surface-high/30'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? item.color : ''}`} />
                <span className="hidden lg:inline">{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-low transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          {/* Global Cmd+K Search Launcher */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-2 bg-surface-low hover:bg-surface text-text-muted hover:text-text-secondary border border-surface-border px-3 py-1.5 rounded-lg text-xs transition-all w-44"
            aria-label="Open search (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-primary-400" />
            <span className="flex-1 text-left truncate">Search...</span>
            <kbd className="hidden lg:inline-block bg-surface border border-surface-border text-[9px] font-mono text-text-muted px-1 py-0.5 rounded">
              ⌘K
            </kbd>
          </button>

          {/* User Goals Pill */}
          <button
            onClick={onOpenOnboarding}
            title="Configure Learning Goal & Preferences"
            className="hidden xl:flex items-center gap-1.5 bg-surface-low hover:bg-surface border border-surface-border text-text-secondary text-[11px] px-2.5 py-1.5 rounded-lg font-medium transition"
            aria-label="Learning preferences"
          >
            <SlidersHorizontal className="w-3 h-3 text-primary-400" />
            <span className="truncate max-w-[100px]">{userGoals.primaryGoal}</span>
          </button>

          {/* 1-HOUR MODE TRIGGER */}
          <button
            onClick={() => onStartOneHour('React Hooks')}
            className="relative group p-[1px] rounded-lg overflow-hidden font-semibold text-xs shadow-glow-primary transition-transform active:scale-95"
            aria-label="Build a 1-hour learning path"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 animate-shimmer" />
            <div className="relative px-3 py-1.5 bg-background hover:bg-surface-low text-text-primary rounded-[7px] flex items-center gap-1.5 transition">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">1-Hour Path</span>
            </div>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-high/40 transition"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-surface-border bg-surface-low/95 backdrop-blur-xl animate-slideUp" role="navigation" aria-label="Mobile navigation">
          <div className="px-4 py-3 space-y-1">
            {[...NAV_ITEMS, ...SECONDARY_NAV].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-primary-600/15 text-text-primary border border-primary-500/30'
                      : 'text-text-muted hover:text-text-primary hover:bg-surface-high/30'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? item.color : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
