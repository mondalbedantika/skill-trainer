import React, { useState } from 'react';
import { 
  Play, 
  GraduationCap, 
  BookOpen, 
  Bookmark, 
  Clock, 
  Star, 
  Sparkles, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';
import type { Resource, PlatformProvider, PriceType } from '../../types';

interface ResourceCardProps {
  resource: Resource;
  isSaved?: boolean;
  onSaveResource?: (id: string) => void;
  onSelectResource?: (resource: Resource) => void;
  onStartOneHour?: (skillName: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  isSaved = false,
  onSaveResource,
  onSelectResource,
  onStartOneHour
}) => {
  const [isScoreExpanded, setIsScoreExpanded] = useState(false);

  const getPriceColor = (type: PriceType) => {
    switch (type) {
      case 'FREE': return 'text-emerald-500';
      case 'SUBSCRIPTION': return 'text-amber-500';
      default: return 'text-rose-500';
    }
  };

  const getPlatformBadge = (provider: PlatformProvider, priceType: PriceType) => {
    const colorClass = getPriceColor(priceType);
    if (provider === 'YouTube') {
      return (
        <span className="badge-youtube">
          <Play className="w-3 h-3 fill-current" /> YOUTUBE • <span className={colorClass}>FREE</span>
        </span>
      );
    }
    if (provider === 'Coursera') {
      return (
        <span className="badge-coursera">
          <GraduationCap className="w-3 h-3" /> COURSERA • <span className={colorClass}>{priceType.toUpperCase()}</span>
        </span>
      );
    }
    return (
      <span className="badge-udemy">
        <BookOpen className="w-3 h-3" /> UDEMY • <span className={colorClass}>{priceType.toUpperCase()}</span>
      </span>
    );
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-surface-border hover:border-primary-500/40">
      <div>
        {/* Thumbnail & Badge Header */}
        <div className="relative aspect-video bg-background overflow-hidden">
          <img
            src={resource.thumbnail}
            alt={resource.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          <div className="absolute top-3 left-3 flex items-center gap-2">
            {getPlatformBadge(resource.provider, resource.priceType)}
          </div>

          {onSaveResource && (
            <button
              onClick={() => onSaveResource(resource.id)}
              title={isSaved ? 'Remove Bookmark' : 'Save Resource'}
              aria-label={isSaved ? 'Remove Bookmark' : 'Save Resource'}
              className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition ${
                isSaved 
                  ? 'bg-amber-500 text-slate-950 font-bold' 
                  : 'bg-background/70 text-text-secondary hover:text-text-primary hover:bg-surface-low'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          )}

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-text-secondary font-medium">
            <span className="flex items-center gap-1 bg-background/80 backdrop-blur px-2 py-0.5 rounded font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5 text-primary-400" />
              {resource.duration}
            </span>
            <span className="flex items-center gap-1 bg-background/80 backdrop-blur px-2 py-0.5 rounded font-mono text-[11px]">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
              {resource.rating} ({resource.learnerCount})
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          
          <h3 
            onClick={() => onSelectResource?.(resource)}
            className="text-base font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2 cursor-pointer"
          >
            {resource.title}
          </h3>

          <div className="text-[11px] text-text-muted font-mono flex items-center gap-2">
            <span>By: <strong className="text-text-secondary">{resource.channel || resource.instructor || 'Technical Expert'}</strong></span>
            {resource.difficulty && (
              <>
                <span>•</span>
                <span>{resource.difficulty}</span>
              </>
            )}
          </div>

          <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
            {resource.description}
          </p>

          {/* AI Score Badge / Rationale */}
          <div className="bg-surface-low border border-surface-border rounded-xl p-3 space-y-2">
            <div 
              onClick={() => setIsScoreExpanded(!isScoreExpanded)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold font-mono text-text-primary">
                  AI MATCH: <span className="text-primary">{resource.learningScore.score}/100</span>
                </span>
              </div>
              <button className="text-text-muted hover:text-text-primary text-xs flex items-center gap-1">
                <span className="text-[11px]">Why this?</span>
                {isScoreExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {isScoreExpanded && (
              <div className="pt-2 border-t border-surface-border space-y-1.5 text-xs text-text-secondary animate-fadeIn">
                <p className="text-[11px] italic text-primary-300 mb-2">{resource.learningScore.verdict}</p>
                {resource.learningScore.reasons.map((r, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[11px]">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong className="text-text-primary">{r.label}:</strong> {r.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Topic Badges */}
          {resource.topics && resource.topics.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {resource.topics.slice(0, 3).map((topic, i) => (
                <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-surface-high/50 border border-surface-border text-text-muted rounded">
                  #{topic}
                </span>
              ))}
            </div>
          )}

          {/* Price & Updated Date */}
          <div className="flex items-center justify-between text-[11px] text-text-muted pt-1">
            <span>
              {resource.price ? <strong className={getPriceColor(resource.priceType)}>{resource.price}</strong> : <span className={getPriceColor(resource.priceType)}>Free Content</span>}
            </span>
            {resource.lastUpdated && <span className="italic">{resource.lastUpdated}</span>}
          </div>

        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
        {onStartOneHour && (
          <button
            onClick={() => onStartOneHour(resource.topics[0] || resource.title)}
            className="btn-primary text-xs py-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>1-Hour Path</span>
          </button>
        )}

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-xs py-2"
        >
          <span>Open Resource</span>
          <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
        </a>
      </div>

    </div>
  );
};
