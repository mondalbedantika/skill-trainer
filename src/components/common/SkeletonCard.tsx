import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden p-5 space-y-4 border border-slate-800/80">
      <div className="aspect-video w-full rounded-xl skeleton-box" />
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded skeleton-box" />
        <div className="h-3 w-1/2 rounded skeleton-box" />
      </div>
      <div className="h-10 w-full rounded-xl skeleton-box" />
    </div>
  );
};
