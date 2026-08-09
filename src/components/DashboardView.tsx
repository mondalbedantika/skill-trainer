import React, { useState } from 'react';
import { 
  Sparkles, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Search,
  TrendingUp,
  Hammer
} from 'lucide-react';
import { UserProgress } from '../types';

interface DashboardViewProps {
  progress: UserProgress;
  onContinueSession: () => void;
  onStartSkill: (skillName: string) => void;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  progress,
  onContinueSession,
  onStartSkill
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onStartSkill(searchInput.trim());
    }
  };

  // Stats data
  const stats = [
    { label: 'Skills Completed', value: progress.skillsCompleted, icon: CheckCircle2, iconColor: 'text-emerald-400', change: null },
    { label: 'Learning Time', value: `${progress.hoursLearned}h`, icon: Clock, iconColor: 'text-cyan-400', change: null },
    { label: 'Avg Quiz Score', value: `${progress.averageQuizScore}%`, icon: Award, iconColor: 'text-amber-400', change: null },
    { label: 'Challenges Done', value: progress.challengesCompleted ?? 7, icon: Hammer, iconColor: 'text-purple-400', change: null },
  ];

  // Recommendations
  const recommendations = [
    { title: 'Object-Oriented Python', match: 92, reason: 'Builds on your Python fundamentals' },
    { title: 'Build APIs with FastAPI', match: 84, reason: 'Practical backend project skills' },
    { title: 'React Interview Patterns', match: 78, reason: 'Matches your interview prep goal' },
  ];

  // Heat grid for activity
  const heatGridDays = Array.from({ length: 60 }).map((_, i) => ({
    day: i,
    count: i % 7 === 0 ? 3 : i % 5 === 0 ? 2 : i % 3 === 0 ? 1 : 0
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      
      {/* ── Hero Greeting + Search ── */}
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight">
            {getGreeting()}. <span className="text-text-muted">What are you learning today?</span>
          </h1>
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl">
          <div className="relative flex items-center p-1 rounded-xl glass-panel border border-surface-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Search className="w-5 h-5 text-text-muted ml-3 mr-2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search a skill or describe what you want to learn..."
              className="w-full bg-transparent text-text-primary placeholder-text-muted text-sm focus:outline-none px-1 py-2"
            />
            <button
              type="submit"
              className="btn-primary rounded-lg px-4 py-2 text-xs shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Build 1-Hour Path</span>
              <span className="sm:hidden">Go</span>
            </button>
          </div>
        </form>
      </section>

      {/* ── Continue Learning ── */}
      {progress.activeSession && (
        <section 
          className="glass-panel p-5 sm:p-6 rounded-2xl border border-primary/30 relative overflow-hidden"
          aria-label="Continue your active learning session"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/8 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="label-mono text-primary">Continue Learning</span>
                <span className="label-mono px-1.5 py-0.5 rounded bg-primary/20 border border-primary/40 text-primary">
                  {progress.activeSession.activeStageTitle || 'LEARN'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">{progress.activeSession.skillName}</h2>
              <div className="flex items-center gap-3 text-xs text-text-secondary font-mono">
                <span>{progress.activeSession.completionPercentage}% complete</span>
                <span className="text-surface-border">•</span>
                <span>{progress.activeSession.minutesRemaining} min remaining</span>
              </div>

              {/* Progress bar */}
              <div className="w-full sm:w-72 bg-surface-low h-1.5 rounded-full overflow-hidden border border-surface-border">
                <div 
                  className="bg-gradient-to-r from-primary-brand to-cyan-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${progress.activeSession.completionPercentage}%` }}
                />
              </div>
            </div>

            <button
              onClick={onContinueSession}
              className="btn-primary text-xs"
            >
              <span>Resume Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      )}

      {/* Grid Layout: Stats & Skill Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quick Stats & Skill Map */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="glass-panel p-4 space-y-1">
                <div className="flex items-center justify-between text-text-muted">
                  <stat.icon className="w-4 h-4" />
                  <span className="text-[10px] label-mono">{stat.label}</span>
                </div>
                <div className="text-2xl font-semibold text-text-primary font-mono">{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-base font-semibold text-text-primary">Skill Map</h3>
            <div className="space-y-3">
              {progress.skillMastery.map((item) => (
                <div key={item.skillName} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-text-secondary">{item.skillName}</span>
                    <span className="text-primary font-mono font-semibold">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-surface-low h-2 rounded-full overflow-hidden border border-surface-border">
                    <div
                      className="bg-gradient-to-r from-primary-brand to-purple-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Activity Grid */}
        <section className="glass-panel p-5 sm:p-6 rounded-2xl border border-surface-border space-y-4" aria-label="Learning activity heatmap">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary">Activity</h3>
            <span className="label-mono">Last 60 Days</span>
          </div>

          <div className="grid grid-cols-10 gap-1 pt-1">
            {heatGridDays.map((d) => {
              let color = 'bg-surface-low border-surface-border';
              if (d.count === 1) color = 'bg-indigo-950 border-indigo-900';
              if (d.count === 2) color = 'bg-indigo-800 border-indigo-700';
              if (d.count === 3) color = 'bg-indigo-500 border-indigo-400';
              return (
                <div 
                  key={d.day}
                  title={`Day ${d.day + 1}: ${d.count} session(s)`}
                  className={`aspect-square rounded-sm border ${color} transition-all hover:scale-125`}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[9px] text-text-muted pt-2 border-t border-surface-border">
            <span>Less</span>
            <div className="flex items-center gap-0.5">
              <div className="w-2 h-2 bg-surface-low rounded-sm" />
              <div className="w-2 h-2 bg-indigo-950 rounded-sm" />
              <div className="w-2 h-2 bg-indigo-800 rounded-sm" />
              <div className="w-2 h-2 bg-indigo-500 rounded-sm" />
            </div>
            <span>More</span>
          </div>
        </section>
      </div>

      {/* ── Recommended Next ── */}
      <section className="glass-panel p-5 sm:p-6 rounded-2xl border border-surface-border space-y-4" aria-label="Recommended learning paths">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="text-base font-semibold text-text-primary">Recommended Next</h3>
          <span className="label-mono text-primary ml-1">Based on your history</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {recommendations.map((rec) => (
            <button
              key={rec.title}
              onClick={() => onStartSkill(rec.title)}
              className="glass-card p-4 rounded-xl border border-surface-border text-left group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-primary">{rec.match}% match</span>
                <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-primary transition" />
              </div>
              <h4 className="text-sm font-semibold text-text-primary mb-1 group-hover:text-primary transition">{rec.title}</h4>
              <p className="text-[11px] text-text-muted">{rec.reason}</p>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
