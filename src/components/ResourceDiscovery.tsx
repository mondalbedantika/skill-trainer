import React, { useState, useEffect } from 'react';
import { 
  Filter, 
  Search, 
  Sparkles, 
  ArrowUpDown,
  Check
} from 'lucide-react';
import type { Resource } from '../types';
import { ResourceCard } from './common/ResourceCard';
import { EmptyState } from './common/EmptyState';

interface ResourceDiscoveryProps {
  resources: Resource[];
  onSelectResource: (resource: Resource) => void;
  onStartOneHour: (skillName: string) => void;
  onSaveResource: (resourceId: string) => void;
  savedResourceIds: string[];
}

export const ResourceDiscovery: React.FC<ResourceDiscoveryProps> = ({
  resources,
  onSelectResource,
  onStartOneHour,
  onSaveResource,
  savedResourceIds
}) => {
  const [queryInput, setQueryInput] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('ALL');
  const [priceFilter, setPriceFilter] = useState<string>('ALL');
  const [levelFilter, setLevelFilter] = useState<string>('ALL');
  const [durationFilter, setDurationFilter] = useState<string>('ALL');
  const [sortOption, setSortOption] = useState<string>('ai_recommended');

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(queryInput.trim().toLowerCase());
    }, 300);
    return () => clearTimeout(handler);
  }, [queryInput]);

  const filteredResources = resources.filter(r => {
    // Search query match
    if (debouncedQuery) {
      const matchTitle = r.title.toLowerCase().includes(debouncedQuery);
      const matchDesc = r.description.toLowerCase().includes(debouncedQuery);
      const matchTopic = r.topics.some(t => t.toLowerCase().includes(debouncedQuery));
      if (!matchTitle && !matchDesc && !matchTopic) return false;
    }

    // Platform filter
    if (platformFilter !== 'ALL' && r.provider !== platformFilter) return false;

    // Price filter
    if (priceFilter !== 'ALL' && r.priceType !== priceFilter) return false;

    // Difficulty filter
    if (levelFilter !== 'ALL' && r.difficulty !== levelFilter) return false;

    // Duration filter
    if (durationFilter === 'SHORT') {
      if (r.durationMinutes > 30) return false;
    } else if (durationFilter === '1HOUR') {
      if (r.durationMinutes > 60) return false;
    }

    return true;
  });

  // Sort resources
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortOption === 'rating') return b.rating - a.rating;
    if (sortOption === 'shortest') return a.durationMinutes - b.durationMinutes;
    if (sortOption === 'relevant') return b.learningScore.score - a.learningScore.score;
    // Default: AI Recommended
    return b.learningScore.score - a.learningScore.score;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      
      {/* ── Page Header & Main Search Input ── */}
      <div className="space-y-4">
        <div>
          <span className="label-mono text-primary-400 mb-1 block">Curated Resource Aggregator</span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight">Discover what to learn.</h1>
          <p className="text-sm text-text-muted mt-1">
            Intelligently ranked technical tutorials and courses from YouTube, Coursera, and Udemy.
          </p>
        </div>

        {/* Discovery Search Bar */}
        <div className="max-w-2xl">
          <div className="relative flex items-center p-1 rounded-xl glass-panel border border-surface-border focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 transition-all">
            <Search className="w-5 h-5 text-text-muted ml-3 mr-2" />
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Search resources, topics, or skills (e.g. Python decorators, React Hooks)..."
              className="w-full bg-transparent text-text-primary placeholder-text-muted text-sm focus:outline-none px-1 py-2"
            />
            {queryInput && (
              <button 
                onClick={() => setQueryInput('')} 
                className="text-text-muted hover:text-text-primary px-3 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Filters & Sort Control Bar ── */}
      <div className="glass-panel p-4 rounded-2xl border border-surface-border flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex flex-wrap items-center gap-3">
          
          <div className="flex items-center gap-1.5 label-mono text-text-muted pr-2 border-r border-surface-border">
            <Filter className="w-3.5 h-3.5 text-primary-400" />
            <span>Filters:</span>
          </div>

          {/* Platform Filter */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="input-base py-1.5 px-3 text-xs w-auto"
          >
            <option value="ALL">All Platforms</option>
            <option value="YouTube">YouTube (Free)</option>
            <option value="Coursera">Coursera</option>
            <option value="Udemy">Udemy</option>
          </select>

          {/* Price Filter */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="input-base py-1.5 px-3 text-xs w-auto"
          >
            <option value="ALL">All Pricing</option>
            <option value="FREE">Free Content</option>
            <option value="PAID">Paid / One-Time</option>
            <option value="SUBSCRIPTION">Subscription</option>
          </select>

          {/* Difficulty Filter */}
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="input-base py-1.5 px-3 text-xs w-auto"
          >
            <option value="ALL">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Duration Filter */}
          <select
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value)}
            className="input-base py-1.5 px-3 text-xs w-auto"
          >
            <option value="ALL">Any Duration</option>
            <option value="SHORT">&lt; 30 Mins</option>
            <option value="1HOUR">&lt; 1 Hour</option>
          </select>

        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-text-muted" />
          <span className="label-mono">Sort:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="input-base py-1.5 px-3 text-xs w-auto font-mono"
          >
            <option value="ai_recommended">AI Recommended</option>
            <option value="relevant">Most Relevant</option>
            <option value="rating">Highest Rated</option>
            <option value="shortest">Shortest Duration</option>
          </select>
        </div>

      </div>

      {/* Results Header Counter */}
      <div className="flex items-center justify-between text-xs text-text-muted font-mono">
        <span>Showing <strong className="text-text-primary">{sortedResources.length}</strong> resources</span>
        {debouncedQuery && <span>Filter query: "{debouncedQuery}"</span>}
      </div>

      {/* ── Resource Cards Grid ── */}
      {sortedResources.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No Matching Resources"
          description="Try relaxing your filters or searching for another technical topic."
          actionText="Clear Filters"
          onAction={() => {
            setQueryInput('');
            setPlatformFilter('ALL');
            setPriceFilter('ALL');
            setLevelFilter('ALL');
            setDurationFilter('ALL');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isSaved={savedResourceIds.includes(resource.id)}
              onSaveResource={onSaveResource}
              onSelectResource={onSelectResource}
              onStartOneHour={onStartOneHour}
            />
          ))}
        </div>
      )}

    </div>
  );
};
