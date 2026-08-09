import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Play, GraduationCap, BookOpen, ArrowRight, Clock, Route } from 'lucide-react';
import type { Resource } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  resources: Resource[];
  onSelectResource: (resource: Resource) => void;
  onStartOneHour: (skillName: string) => void;
}

const RECENT_SEARCHES = [
  'React Hooks Mastery',
  'Python Fundamentals',
  'Docker',
  'AWS Architecture',
  'SQL Window Functions'
];

const POPULAR_SKILLS = [
  'React Hooks',
  'Python',
  'Docker',
  'Machine Learning',
  'FastAPI',
  'System Design'
];

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  resources,
  onSelectResource,
  onStartOneHour
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredResources = query.trim()
    ? resources.filter(r => 
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.topics.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
        r.provider.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectSkill = (skill: string) => {
    onStartOneHour(skill);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-background/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Global search command palette"
    >
      <div 
        className="glass-panel w-full max-w-2xl rounded-2xl border border-surface-border shadow-2xl overflow-hidden flex flex-col animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 border-b border-surface-border flex items-center gap-3 bg-surface-low/80">
          <Search className="w-5 h-5 text-primary shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills, resources, saved courses, learning paths... (e.g. React Hooks, Python)"
            className="w-full bg-transparent text-text-primary placeholder-text-muted text-sm focus:outline-none"
          />
          <button 
            onClick={onClose} 
            className="text-text-muted hover:text-text-primary p-1 transition rounded-lg"
            aria-label="Close search modal"
          >
            <kbd className="bg-surface border border-surface-border text-[10px] font-mono px-1.5 py-0.5 rounded text-text-muted">
              ESC
            </kbd>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {!query.trim() ? (
            <div className="space-y-4">
              {/* Popular Skills Quick Action */}
              <div>
                <div className="label-mono mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Build 1-Hour Session For:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SKILLS.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => handleSelectSkill(skill)}
                      className="px-3 py-1.5 rounded-lg bg-surface-high/50 hover:bg-surface-highest border border-surface-border text-xs text-text-secondary hover:text-text-primary transition flex items-center gap-1.5"
                    >
                      <Route className="w-3 h-3 text-primary" />
                      <span>{skill}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              <div>
                <div className="label-mono mb-2 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-text-muted" />
                  <span>Recent Queries</span>
                </div>
                <div className="space-y-1">
                  {RECENT_SEARCHES.map((recent) => (
                    <button
                      key={recent}
                      onClick={() => handleSelectSkill(recent)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-high/40 text-xs text-text-secondary hover:text-text-primary transition flex items-center justify-between group"
                    >
                      <span className="truncate">{recent}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-primary transition shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="label-mono mb-1">Search Results ({filteredResources.length})</div>
              {filteredResources.length === 0 ? (
                <div className="p-8 text-center space-y-3">
                  <p className="text-xs text-text-muted">
                    No indexed resources match "<strong className="text-text-primary">{query}</strong>".
                  </p>
                  <button
                    onClick={() => handleSelectSkill(query)}
                    className="btn-primary text-xs mx-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Generate AI 1-Hour Path for "{query}"</span>
                  </button>
                </div>
              ) : (
                filteredResources.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectResource(item);
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-surface-card hover:bg-surface-high border border-surface-border transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-low border border-surface-border flex items-center justify-center text-text-muted shrink-0">
                        {item.provider === 'YouTube' && <Play className="w-4 h-4 text-rose-400 fill-current" />}
                        {item.provider === 'Coursera' && <GraduationCap className="w-4 h-4 text-blue-400" />}
                        {item.provider === 'Udemy' && <BookOpen className="w-4 h-4 text-purple-400" />}
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-text-muted font-mono flex items-center gap-2 mt-0.5">
                          <span>{item.provider}</span>
                          <span>•</span>
                          <span>{item.priceType}</span>
                          <span>•</span>
                          <span className="text-primary font-bold">AI Match: {item.learningScore.score}/100</span>
                        </div>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary transition shrink-0 ml-2" />
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Quick Launch Footer */}
        {query.trim() && filteredResources.length > 0 && (
          <div className="p-3 bg-surface-low border-t border-surface-border flex items-center justify-between">
            <span className="text-xs text-text-secondary font-medium">Build custom 1-hour session for "{query}"</span>
            <button
              onClick={() => handleSelectSkill(query)}
              className="btn-primary text-xs py-1.5 px-3"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Build Path</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
