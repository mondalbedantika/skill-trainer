import React, { useState } from 'react';
import { Sparkles, Check, ChevronDown, ChevronUp } from 'lucide-react';
import type { LearningScore } from '../../types';

interface ScoreBadgeProps {
  learningScore: LearningScore;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ learningScore }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="score-badge hover:border-indigo-500 transition-all cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span className="font-bold">{learningScore.score}</span>
        <span className="text-[10px] text-indigo-400 font-semibold tracking-wider">AI MATCH</span>
        {isOpen ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
      </button>

      {isOpen && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute left-0 mt-2 w-72 glass-panel p-3.5 rounded-xl border border-indigo-800/80 shadow-2xl z-30 space-y-2 text-xs animate-fadeIn"
        >
          <div className="flex items-center justify-between font-bold text-text-primary text-xs pb-1.5 border-b border-slate-800">
            <span>Why this resource?</span>
            <span className="text-indigo-400 font-mono">{learningScore.score}/100</span>
          </div>

          <p className="text-[11px] italic text-indigo-300 font-medium">
            {learningScore.verdict}
          </p>

          <div className="space-y-1.5 pt-1">
            {learningScore.reasons.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[11px] text-text-secondary">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-text-primary">{reason.label}:</strong> {reason.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
