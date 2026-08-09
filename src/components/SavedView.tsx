import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { ResourceCard } from './common/ResourceCard';
import { EmptyState } from './common/EmptyState';
import { useLearning } from '../context/LearningContext';

export const SavedView: React.FC = () => {
  const { savedResources, toggleSavedResource, startOneHour } = useLearning();
  const [activeTab, setActiveTab] = useState<'ALL' | 'Videos' | 'Courses'>('ALL');

  const filtered = savedResources.filter(r => {
    if (activeTab === 'Videos') return r.provider === 'YouTube';
    if (activeTab === 'Courses') return r.provider === 'Coursera' || r.provider === 'Udemy';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fadeIn">
      
      {/* Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="label-mono text-primary mb-1 block">Bookmarks & Library</span>
          <h1 className="text-3xl font-semibold text-text-primary tracking-tight">Saved</h1>
          <p className="text-xs text-text-muted mt-1">Bookmarked videos and courses for quick 1-hour sessions.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-surface-low border border-surface-border p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'ALL' ? 'bg-primary-brand text-text-primary' : 'text-text-muted hover:text-text-primary'
            }`}
          >
            All ({savedResources.length})
          </button>
          <button
            onClick={() => setActiveTab('Videos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'Videos' ? 'bg-primary-brand text-text-primary' : 'text-text-muted hover:text-text-primary'
            }`}
          >
            Videos (YouTube)
          </button>
          <button
            onClick={() => setActiveTab('Courses')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'Courses' ? 'bg-primary-brand text-text-primary' : 'text-text-muted hover:text-text-primary'
            }`}
          >
            Courses (Coursera & Udemy)
          </button>
        </div>
      </div>

      {/* Grid or Empty State */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No saved resources"
          description="Save videos and courses while exploring. They'll appear here for instant 1-hour session building."
          actionText="Explore Resources"
          onAction={() => {}}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(resource => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isSaved={true}
              onSaveResource={toggleSavedResource}
              onStartOneHour={startOneHour}
            />
          ))}
        </div>
      )}

    </div>
  );
};
