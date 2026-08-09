import React from 'react';
import { TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import type { UserProgress } from '../types';

interface ProgressViewProps {
  progress: UserProgress;
  onStartSkill: (skillName: string) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ progress, onStartSkill }) => {
  const recommendations = [
    {
      skill: 'Object-Oriented Python',
      basedOn: 'Python Fundamentals',
      match: '92%',
      reason: 'Deepens class structure & data model understanding.'
    },
    {
      skill: 'Build APIs with FastAPI',
      basedOn: 'Python Fundamentals',
      match: '84%',
      reason: 'Teaches async web endpoints and OpenAPI documentation.'
    },
    {
      skill: 'Python Interview Patterns',
      basedOn: 'Python Fundamentals',
      match: '78%',
      reason: 'Prepares for top-tier algorithm and coding interview rounds.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      
      {/* Page Header */}
      <div>
        <span className="label-mono text-primary mb-1 block">Analytics & Progression</span>
        <h1 className="text-3xl font-semibold text-text-primary tracking-tight">Personal Progress</h1>
        <p className="text-sm text-text-muted mt-1">
          Minimalist telemetry of your 1-hour micro-learning sessions and mastery metrics.
        </p>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-surface-border space-y-1">
          <div className="text-3xl font-bold font-mono text-text-primary">{progress.skillsCompleted}</div>
          <div className="label-mono">Skills Completed</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-surface-border space-y-1">
          <div className="text-3xl font-bold font-mono text-cyan-400">{progress.hoursLearned}h</div>
          <div className="label-mono">Learning Time</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-surface-border space-y-1">
          <div className="text-3xl font-bold font-mono text-amber-400">{progress.averageQuizScore}%</div>
          <div className="label-mono">Avg Quiz Score</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-surface-border space-y-1">
          <div className="text-3xl font-bold font-mono text-purple-400">{progress.challengesCompleted ?? 7}</div>
          <div className="label-mono">Challenges Completed</div>
        </div>
      </div>

      {/* Skill Map Section */}
      <div className="glass-panel p-6 rounded-2xl border border-surface-border space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Skill Map</h2>
          <span className="label-mono">Mastery Index</span>
        </div>

        <div className="space-y-4">
          {progress.skillMastery.map((item) => (
            <div key={item.skillName} className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-text-primary font-medium">{item.skillName}</span>
                <span className="text-primary font-bold">{item.percentage}%</span>
              </div>
              <div className="w-full bg-surface-low h-2.5 rounded-full overflow-hidden border border-surface-border">
                <div 
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation Engine UI */}
      <div className="glass-panel p-6 rounded-2xl border border-surface-border space-y-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h2 className="text-lg font-semibold text-text-primary">Recommended Next</h2>
        </div>

        <p className="text-xs text-text-muted">
          Based on your learning history (You completed <strong className="text-text-primary">Python Fundamentals</strong> & <strong className="text-text-primary">React Hooks</strong>):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div 
              key={rec.skill}
              className="glass-card p-5 rounded-xl border border-surface-border flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="label-mono text-primary">{rec.match} Match</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </div>
                <h3 className="font-semibold text-text-primary text-sm group-hover:text-primary transition">{rec.skill}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{rec.reason}</p>
              </div>

              <button
                onClick={() => onStartSkill(rec.skill)}
                className="btn-secondary text-xs w-full py-2"
              >
                <span>Build 1-Hour Path</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
