import React, { useState } from 'react';
import { 
  Sparkles,
  Table,
  Target,
  Layers,
  Hammer,
  CheckCircle2,
  Clock,
  AlertCircle,
  BookOpen,
  TrendingUp,
  Play,
  GraduationCap
} from 'lucide-react';
import type { SkillOverview, Resource } from '../types';
import { ResourceCompare } from './ResourceCompare';
import { COMPARISON_MATRICES } from '../services/mockData';
import { ResourceCard } from './common/ResourceCard';

interface SkillPageProps {
  skill: SkillOverview;
  resources: Resource[];
  onStartOneHour: (skillName: string) => void;
  onSelectResource: (resource: Resource) => void;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  if (status === 'Completed') return (
    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/70 px-2 py-0.5 rounded-full">
      <CheckCircle2 className="w-3 h-3" /> Completed
    </span>
  );
  if (status.includes('complete')) return (
    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-950/60 border border-amber-800/70 px-2 py-0.5 rounded-full">
      <Clock className="w-3 h-3" /> {status}
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-[10px] font-semibold text-text-muted bg-surface-low border border-surface-border px-2 py-0.5 rounded-full">
      <AlertCircle className="w-3 h-3" /> Not started
    </span>
  );
};

export const SkillPage: React.FC<SkillPageProps> = ({
  skill,
  resources,
  onStartOneHour,
  onSelectResource,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'videos' | 'courses' | 'paths' | 'compare'>('overview');
  const pi = skill.pathIntelligence;

  const videoResources = resources.filter(r => r.provider === 'YouTube');
  const courseResources = resources.filter(r => r.provider === 'Coursera' || r.provider === 'Udemy');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      
      {/* ── Skill Banner Header ── */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-surface-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container/8 blur-[100px] rounded-full pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-surface-low text-primary border border-primary/40 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {skill.category}
              </span>
              <span className="text-xs font-mono text-text-muted">
                {skill.discoveredCount.toLocaleString()} resources indexed
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight mb-3">
              {skill.name}
            </h1>
            <p className="text-text-secondary text-sm sm:text-base max-w-2xl leading-relaxed">
              {skill.description}
            </p>
          </div>

          <button
            onClick={() => onStartOneHour(skill.name)}
            className="btn-primary py-3 px-6 text-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Build 1-Hour Session</span>
          </button>
        </div>

        {/* Popular Topic Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-surface-border">
          <span className="label-mono mr-2">Popular Topics:</span>
          {skill.popularTopics.map((topic, idx) => (
            <span key={idx} className="chip">
              #{topic}
            </span>
          ))}
        </div>
      </div>

      {/* ── Path Intelligence Explanation Block ── */}
      {pi && (
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-primary/30 relative overflow-hidden space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="label-mono text-primary">Learning Path Intelligence</span>
            </div>
            <span className="chip text-[10px] font-mono">AI CURATED</span>
          </div>

          {/* Rationale explanation */}
          <div className="bg-surface-low border border-surface-border p-3.5 rounded-xl text-xs text-text-secondary">
            <h4 className="font-semibold text-text-primary mb-1">Why this path?</h4>
            <p className="leading-relaxed">
              We selected these resources based on your current level, learning goal, resource quality, topic coverage, and estimated learning time.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Goal Match */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-text-muted font-medium">
                <div className="flex items-center gap-1"><Target className="w-3 h-3" /><span>Goal Match</span></div>
                <span className="text-primary font-mono font-bold">{pi.goalMatchPercentage}%</span>
              </div>
              <div className="w-full bg-surface-low h-1.5 rounded-full overflow-hidden border border-surface-border">
                <div className="bg-primary-brand h-full rounded-full" style={{ width: `${pi.goalMatchPercentage}%` }} />
              </div>
            </div>

            {/* Hands-on Coverage */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-text-muted font-medium">
                <div className="flex items-center gap-1"><Hammer className="w-3 h-3" /><span>Hands-on</span></div>
                <span className="text-cyan-400 font-mono font-bold">{pi.handsOnCoveragePercentage}%</span>
              </div>
              <div className="w-full bg-surface-low h-1.5 rounded-full overflow-hidden border border-surface-border">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${pi.handsOnCoveragePercentage}%` }} />
              </div>
            </div>

            {/* Difficulty Curve */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-text-muted font-medium">
                <div className="flex items-center gap-1"><Layers className="w-3 h-3" /><span>Difficulty Curve</span></div>
                <span className="font-mono font-bold text-emerald-400">
                  {pi.difficultyProgression}
                </span>
              </div>
              <div className="w-full bg-surface-low h-1.5 rounded-full overflow-hidden border border-surface-border">
                <div className="bg-emerald-500 h-full rounded-full w-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tabs Bar ── */}
      <div className="flex items-center gap-2 border-b border-surface-border pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition flex items-center gap-1.5 ${
            activeTab === 'overview' ? 'bg-primary-brand text-text-primary shadow-glow-primary' : 'text-text-muted hover:text-text-primary'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Overview Path
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition flex items-center gap-1.5 ${
            activeTab === 'videos' ? 'bg-primary-brand text-text-primary shadow-glow-primary' : 'text-text-muted hover:text-text-primary'
          }`}
        >
          <Play className="w-3.5 h-3.5 text-rose-400" />
          Videos ({videoResources.length})
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition flex items-center gap-1.5 ${
            activeTab === 'courses' ? 'bg-primary-brand text-text-primary shadow-glow-primary' : 'text-text-muted hover:text-text-primary'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
          Courses ({courseResources.length})
        </button>
        <button
          onClick={() => setActiveTab('compare')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition flex items-center gap-1.5 ${
            activeTab === 'compare' ? 'bg-primary-brand text-text-primary shadow-glow-primary' : 'text-text-muted hover:text-text-primary'
          }`}
        >
          <Table className="w-3.5 h-3.5" />
          <span>Compare Platforms</span>
        </button>
      </div>

      {/* ── TAB 1: OVERVIEW MULTI-LEVEL PATH ── */}
      {activeTab === 'overview' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-surface-border space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-text-primary">Recommended AI Path</h2>
              <span className="bg-surface-low text-primary border border-primary/40 text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold">
                AI CURATED
              </span>
            </div>
            <p className="text-text-muted text-xs">
              {skill.name} → From Zero to Production Ready
            </p>
          </div>

          <div className="space-y-4 relative before:absolute before:left-[1.125rem] before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-primary-brand/40 before:via-surface-border before:to-surface-border">
            {skill.learningPath.map((step) => {
              const isCompleted = step.status === 'Completed';
              const isInProgress = step.status?.includes('complete') && step.status !== 'Completed';
              return (
                <div key={step.levelNumber} className="relative pl-12 group">
                  
                  {/* Step Node Icon */}
                  <div className={`absolute left-0 top-3 w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all group-hover:scale-110 ${
                    isCompleted 
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-400' 
                      : isInProgress 
                        ? 'bg-amber-950 border-amber-500 text-amber-400' 
                        : 'bg-background border-primary text-primary'
                  }`}>
                    {isCompleted 
                      ? <CheckCircle2 className="w-4 h-4" />
                      : <span className="font-mono text-[10px] font-bold">{String(step.levelNumber).padStart(2,'0')}</span>
                    }
                  </div>

                  <div className="glass-card p-5 rounded-2xl border border-surface-border group-hover:border-primary/40 transition-all">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-primary font-mono uppercase tracking-wider">{step.levelName}</span>
                        <span className="text-surface-border">•</span>
                        <span className="text-xs font-semibold text-text-secondary">{step.provider}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {step.status && <StatusBadge status={step.status} />}
                        <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${
                          step.priceType === 'FREE' ? 'text-emerald-400 bg-emerald-950/50 border-emerald-800/50' : 
                          step.priceType === 'PAID' ? 'text-amber-400 bg-amber-950/50 border-amber-800/50' : 
                          'text-purple-400 bg-purple-950/50 border-purple-800/50'
                        }`}>
                          {step.priceType}
                        </span>
                        <span className="text-xs text-text-muted font-mono">{step.duration}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-text-primary mb-1">{step.resourceTitle}</h3>
                    <p className="text-xs text-text-muted">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB 2: VIDEOS ── */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoResources.map((res) => (
            <ResourceCard
              key={res.id}
              resource={res}
              onSelectResource={onSelectResource}
              onStartOneHour={onStartOneHour}
            />
          ))}
        </div>
      )}

      {/* ── TAB 3: COURSES ── */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseResources.map((res) => (
            <ResourceCard
              key={res.id}
              resource={res}
              onSelectResource={onSelectResource}
              onStartOneHour={onStartOneHour}
            />
          ))}
        </div>
      )}

      {/* ── TAB 4: COMPARE ── */}
      {activeTab === 'compare' && (
        <ResourceCompare skillName={skill.name} matrixData={COMPARISON_MATRICES['default']} />
      )}

    </div>
  );
};
