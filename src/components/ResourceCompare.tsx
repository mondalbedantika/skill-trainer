import React from 'react';
import { Play, GraduationCap, BookOpen, Sparkles } from 'lucide-react';

interface ResourceCompareProps {
  skillName: string;
  matrixData: {
    headers: string[];
    rows: { feature: string; youtube: string; coursera: string; udemy: string }[];
  };
}

export const ResourceCompare: React.FC<ResourceCompareProps> = ({ skillName, matrixData }) => {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-surface-border space-y-6">
      
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-low text-primary border border-primary/40 text-xs font-mono font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>SIDE-BY-SIDE MATRIX</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-1">Platform Comparison for {skillName}</h2>
        <p className="text-text-muted text-xs sm:text-sm">
          Objective evaluation across pricing, duration, project depth, and 1-hour session compatibility.
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto border border-surface-border rounded-xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-surface-low border-b border-surface-border text-text-muted font-mono font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Feature / Dimension</th>
              <th className="p-4">
                <div className="flex items-center gap-1.5 text-rose-400 font-mono">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>YouTube</span>
                </div>
              </th>
              <th className="p-4">
                <div className="flex items-center gap-1.5 text-blue-400 font-mono">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Coursera</span>
                </div>
              </th>
              <th className="p-4">
                <div className="flex items-center gap-1.5 text-purple-400 font-mono">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Udemy</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border font-medium text-xs">
            {matrixData.rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-surface-high/40 transition">
                <td className="p-4 font-semibold text-text-primary bg-surface-low/30 font-mono">{row.feature}</td>
                <td className="p-4 text-text-secondary">{row.youtube}</td>
                <td className="p-4 text-text-secondary">{row.coursera}</td>
                <td className="p-4 text-text-secondary">{row.udemy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Comparison Cards */}
      <div className="md:hidden space-y-4">
        {[
          { name: 'YouTube', color: 'text-rose-400', badge: 'badge-youtube', icon: Play, key: 'youtube' as const },
          { name: 'Coursera', color: 'text-blue-400', badge: 'badge-coursera', icon: GraduationCap, key: 'coursera' as const },
          { name: 'Udemy', color: 'text-purple-400', badge: 'badge-udemy', icon: BookOpen, key: 'udemy' as const },
        ].map((platform) => {
          const Icon = platform.icon;
          return (
            <div key={platform.name} className="bg-surface-low border border-surface-border p-4 rounded-xl space-y-3">
              <div className="flex items-center gap-2 font-mono font-bold text-sm text-text-primary border-b border-surface-border pb-2">
                <Icon className={`w-4 h-4 ${platform.color}`} />
                <span>{platform.name}</span>
              </div>
              <div className="space-y-2 text-xs">
                {matrixData.rows.map((row, idx) => (
                  <div key={idx} className="flex justify-between border-b border-surface-border/40 pb-1.5">
                    <span className="text-text-muted font-mono">{row.feature}:</span>
                    <span className="font-medium text-text-primary text-right">{row[platform.key]}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
