import React from 'react';
import { AlertTriangle, RotateCcw, Bookmark } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  onGoToSaved?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "We couldn't load resources right now.",
  onRetry,
  onGoToSaved
}) => {
  return (
    <div className="glass-panel p-8 text-center rounded-2xl border border-rose-900/40 space-y-4 max-w-md mx-auto my-8 animate-fadeIn">
      <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-800/60 text-rose-400 flex items-center justify-center mx-auto">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-text-primary">Something went wrong</h3>
        <p className="text-xs text-text-muted mt-1 leading-relaxed">{message}</p>
      </div>
      <div className="flex items-center justify-center gap-2 pt-2">
        {onRetry && (
          <button onClick={onRetry} className="btn-primary text-xs py-1.5 px-4">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
        )}
        {onGoToSaved && (
          <button onClick={onGoToSaved} className="btn-secondary text-xs py-1.5 px-4">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Explore Saved</span>
          </button>
        )}
      </div>
    </div>
  );
};
