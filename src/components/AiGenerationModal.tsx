import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

interface AiGenerationModalProps {
  skillName: string;
  onComplete: () => void;
}

const GENERATION_STAGES = [
  'Searching learning resources...',
  'Analyzing resource quality...',
  'Comparing YouTube and courses...',
  'Building your learning sequence...',
  'Generating practice...',
  'Creating your challenge...'
];

export const AiGenerationModal: React.FC<AiGenerationModalProps> = ({
  skillName,
  onComplete
}) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStageIdx((prev) => {
        if (prev < GENERATION_STAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(timer);
  }, [onComplete]);

  const progressPercentage = Math.round(((currentStageIdx + 1) / GENERATION_STAGES.length) * 100);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-lg animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Generating AI Learning Path"
    >
      <div className="glass-panel w-full max-w-lg rounded-3xl border border-surface-border p-6 sm:p-8 space-y-6 text-center animate-scaleIn shadow-2xl">
        
        {/* Glow Icon */}
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 rounded-2xl blur-lg opacity-60 animate-pulse" />
          <div className="relative w-full h-full bg-background border border-primary/50 rounded-2xl flex items-center justify-center text-primary">
            <Sparkles className="w-8 h-8 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        </div>

        {/* Title */}
        <div>
          <span className="label-mono text-primary block mb-1">AI Orchestration Engine</span>
          <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
            Building 60-Minute Session for <span className="gradient-accent-text font-bold">{skillName}</span>
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 max-w-xs mx-auto">
          <div className="flex items-center justify-between text-[11px] font-mono text-text-muted">
            <span>Orchestrating...</span>
            <span className="text-primary font-bold">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-surface-low h-2 rounded-full overflow-hidden border border-surface-border">
            <div 
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Stages Checklist */}
        <div className="space-y-2 text-left bg-surface-low/80 p-4 rounded-2xl border border-surface-border font-mono text-xs max-w-md mx-auto">
          {GENERATION_STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStageIdx;
            const isCurrent = idx === currentStageIdx;
            const isPending = idx > currentStageIdx;

            return (
              <div 
                key={stage}
                className={`flex items-center justify-between transition-opacity ${
                  isCompleted ? 'text-emerald-400 font-semibold' : isCurrent ? 'text-text-primary font-bold' : 'text-text-disabled opacity-40'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {isCurrent && <Loader2 className="w-4 h-4 text-primary animate-spin shrink-0" />}
                  {isPending && <div className="w-4 h-4 rounded-full border border-surface-border shrink-0" />}
                  <span className="truncate">{stage}</span>
                </div>
                {isCompleted && <span className="text-[10px] text-emerald-500">DONE</span>}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
