import React from 'react';
import { X, ExternalLink, Sparkles, Check, Clock, Star, Users, ShieldCheck, Award } from 'lucide-react';
import { Resource } from '../types';

interface ResourceDetailModalProps {
  resource: Resource | null;
  onClose: () => void;
  onStartOneHour: (skillName: string) => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resource,
  onClose,
  onStartOneHour
}) => {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fadeIn">
      
      <div className="glass-panel w-full max-w-3xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
              {resource.provider} Intelligence
            </span>
            <span className="text-xs text-text-muted font-medium">• {resource.priceType}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-low transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">{resource.title}</h2>
            <p className="text-sm text-text-secondary leading-relaxed">{resource.description}</p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface-low border border-slate-800 p-4 rounded-2xl text-xs">
            <div>
              <div className="text-text-muted text-[10px] uppercase font-bold">Duration</div>
              <div className="font-bold text-text-primary mt-0.5">{resource.duration}</div>
            </div>
            <div>
              <div className="text-text-muted text-[10px] uppercase font-bold">Rating</div>
              <div className="font-bold text-amber-400 mt-0.5 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current" /> {resource.rating}
              </div>
            </div>
            <div>
              <div className="text-text-muted text-[10px] uppercase font-bold">Learners</div>
              <div className="font-bold text-text-primary mt-0.5">{resource.learnerCount}</div>
            </div>
            <div>
              <div className="text-text-muted text-[10px] uppercase font-bold">Certificate</div>
              <div className="font-bold text-emerald-400 mt-0.5">
                {resource.hasCertificate ? '✓ Included' : 'None'}
              </div>
            </div>
          </div>

          {/* AI Verdict Box */}
          <div className="bg-gradient-to-tr from-slate-900 to-indigo-950/60 border border-indigo-800/60 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <h3 className="font-bold text-text-primary text-sm">AI Recommendation Verdict</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-emerald-950/50 border border-emerald-800/40 rounded-xl text-emerald-200">
                <span className="font-bold text-emerald-400 block mb-1">✓ Excellent for:</span>
                {resource.learningScore.bestFor}
              </div>
              <div className="p-3 bg-rose-950/50 border border-rose-800/40 rounded-xl text-rose-200">
                <span className="font-bold text-rose-400 block mb-1">⚠ Not ideal for:</span>
                {resource.learningScore.notIdealFor || 'Learners wanting immediate production deployment.'}
              </div>
            </div>
          </div>

          {/* Syllabus Section if present */}
          {resource.syllabus && (
            <div>
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">Course Modules & Syllabus</h3>
              <div className="space-y-2">
                {resource.syllabus.map((module, idx) => (
                  <div key={idx} className="p-3 bg-surface-low border border-slate-800 rounded-xl text-xs text-text-secondary">
                    {module}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Awareness */}
          <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-slate-800">
            <span>Price Model: <strong className="text-text-primary">{resource.price || 'Free'}</strong></span>
            <span className="italic">{resource.priceCheckDate || 'Price checked recently'}</span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={() => {
              onClose();
              onStartOneHour(resource.topics[0] || resource.title);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 text-text-primary font-bold px-5 py-2.5 rounded-xl text-xs shadow-glow-primary transition"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Turn Into 1-Hour Session</span>
          </button>

          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-surface-low hover:bg-slate-800 text-text-secondary border border-slate-800 font-semibold px-5 py-2.5 rounded-xl text-xs transition"
          >
            <span>View on {resource.provider}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>

    </div>
  );
};
