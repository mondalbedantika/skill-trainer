import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  onAction
}) => {
  return (
    <div className="glass-panel p-12 text-center rounded-3xl border border-surface-border space-y-4 max-w-lg mx-auto my-8">
      <div className="w-12 h-12 rounded-2xl bg-surface-low border border-surface-border flex items-center justify-center mx-auto text-text-muted">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <p className="text-xs text-text-muted mt-1 leading-relaxed">{description}</p>
      </div>
      {actionText && onAction && (
        <button onClick={onAction} className="btn-primary text-xs mx-auto">
          {actionText}
        </button>
      )}
    </div>
  );
};
