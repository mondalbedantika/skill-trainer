import React, { useState } from 'react';
import { Search, Sparkles, Play, GraduationCap, BookOpen, Zap } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
  onStartOneHour: (skillName: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onStartOneHour: _onStartOneHour }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const sampleSkills = [
    'React Hooks',
    'Python',
    'Machine Learning',
    'Docker',
    'FastAPI',
    'System Design',
    'SQL',
    'Rust'
  ];

  return (
    <div className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 border-b border-surface-border">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 text-xs font-semibold mb-6 shadow-sm">
          <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>Don't waste hours searching. Tell us the skill. We'll build your 1-hour session.</span>
        </div>

        {/* EXACT Hero Positioning Header */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-text-primary mb-6 leading-[1.1]">
          Learn smarter. <span className="gradient-accent-text">Not longer.</span>
        </h1>

        <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-10 font-normal leading-relaxed">
          Discover the best technical resources across <span className="text-text-primary font-medium">YouTube</span>, <span className="text-text-primary font-medium">Coursera</span>, and <span className="text-text-primary font-medium">Udemy</span> — then turn them into a personalized one-hour learning path.
        </p>

        {/* Main Search Input Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
          <div className="relative flex items-center p-1.5 rounded-2xl glass-panel border border-surface-border focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/30 transition-all shadow-2xl">
            <Search className="w-6 h-6 text-text-muted ml-3.5 mr-2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="What skill do you want to master? (e.g. React Hooks, Python, Docker)"
              className="w-full bg-transparent text-text-primary placeholder-text-muted text-base sm:text-lg focus:outline-none px-2 py-2"
            />
            <button
              type="submit"
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-text-primary font-semibold px-6 py-3 rounded-xl transition-all shadow-glow-primary active:scale-95 text-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Build My Learning Path</span>
            </button>
          </div>

          <div className="mt-3 sm:hidden">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-text-primary font-semibold px-5 py-3 rounded-xl transition text-sm shadow-glow-primary"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Build My Learning Path</span>
            </button>
          </div>
        </form>

        {/* Quick Search Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-12">
          <span className="text-xs text-text-muted font-medium mr-1">Popular:</span>
          {sampleSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => {
                setSearchInput(skill);
                onSearch(skill);
              }}
              className="px-3 py-1 bg-surface-low hover:bg-surface-container-high text-text-secondary hover:text-text-primary border border-surface-border hover:border-surface-border rounded-lg text-xs font-medium transition-all"
            >
              {skill}
            </button>
          ))}
        </div>

        {/* Trust & Provider Indicator Bar */}
        <div className="pt-6 border-t border-surface-border flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-semibold text-text-muted uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-rose-400 fill-current" />
            <span>Free Resources</span>
          </div>
          <span className="text-text-muted hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span>Premium Courses</span>
          </div>
          <span className="text-text-muted hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>AI-Generated Practice</span>
          </div>
        </div>

      </div>
    </div>
  );
};
