import React from 'react';
import { Play, GraduationCap, BookOpen } from 'lucide-react';
import type { PlatformProvider, PriceType } from '../../types';

interface PlatformBadgeProps {
  provider: PlatformProvider;
  priceType: PriceType;
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({ provider, priceType }) => {
  if (provider === 'YouTube') {
    return (
      <span className="badge-youtube">
        <Play className="w-3 h-3 fill-current" /> YOUTUBE • FREE
      </span>
    );
  }
  if (provider === 'Coursera') {
    return (
      <span className="badge-coursera">
        <GraduationCap className="w-3 h-3" /> COURSERA • {priceType}
      </span>
    );
  }
  return (
    <span className="badge-udemy">
      <BookOpen className="w-3 h-3" /> UDEMY • {priceType}
    </span>
  );
};
