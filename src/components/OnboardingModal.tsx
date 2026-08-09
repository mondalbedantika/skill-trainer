import React, { useState } from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { UserGoals, PrimaryGoal, SkillLevel, TimeCommitment } from '../types';
import { useDialogAccessibility } from './common/useDialogAccessibility';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userGoals: UserGoals;
  onSaveGoals: (goals: UserGoals) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  userGoals,
  onSaveGoals
}) => {
  const dialogRef = useDialogAccessibility(isOpen, onClose);
  const [goal, setGoal] = useState<PrimaryGoal>(userGoals.primaryGoal);
  const [level, setLevel] = useState<SkillLevel>(userGoals.currentLevel);
  const [time, setTime] = useState<TimeCommitment>(userGoals.availableTime);

  if (!isOpen) return null;

  const goalOptions: { id: PrimaryGoal; title: string; desc: string }[] = [
    { id: 'Get a Job', title: 'Get a Job', desc: 'Comprehensive portfolio projects & interview prep' },
    { id: 'Crack Technical Interviews', title: 'Crack Technical Interviews', desc: 'Core DSA, system design & live question drills' },
    { id: 'Build Projects', title: 'Build Projects', desc: 'Practical hands-on coding & real-world apps' },
    { id: 'College / Academics', title: 'College / Academics', desc: 'Foundational CS theory & graded concepts' },
    { id: 'Switch Careers', title: 'Switch Careers', desc: 'Zero to job-ready structured paths' },
    { id: 'Explore a New Skill', title: 'Explore a New Skill', desc: 'Fast 1-hour overview micro-learning' },
  ];

  const handleSave = () => {
    onSaveGoals({
      primaryGoal: goal,
      currentLevel: level,
      availableTime: time,
      hasOnboarded: true
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fadeIn">
      
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="learning-goals-title" className="glass-panel w-full max-w-2xl rounded-3xl border border-surface-border shadow-2xl p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h2 id="learning-goals-title" className="text-xl font-bold text-text-primary">Personalize Your Learning Goals</h2>
          </div>
          <button onClick={onClose} aria-label="Close learning preferences" className="text-text-muted hover:text-text-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Goal */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block">
            1. What are you learning for?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {goalOptions.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setGoal(item.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                  goal === item.id 
                    ? 'bg-indigo-950/90 border-indigo-500 text-text-primary shadow-glow-primary' 
                    : 'bg-surface-low/80 border-surface-border text-text-secondary hover:bg-surface-container-high'
                }`}
              >
                <div className="font-bold text-xs flex items-center justify-between">
                  <span>{item.title}</span>
                  {goal === item.id && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </div>
                <div className="text-[11px] text-text-muted mt-1">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Level */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block">
            2. What's your current experience level?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['Beginner', 'Intermediate', 'Advanced'] as SkillLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`py-2.5 rounded-xl border text-xs font-semibold transition ${
                  level === lvl ? 'bg-indigo-600 border-indigo-500 text-text-primary' : 'bg-surface-low border-surface-border text-text-muted'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Time */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block">
            3. How much time do you have today?
          </label>
          <div className="flex flex-wrap gap-2">
            {(['15 min', '30 min', '1 hour', '2 hours', 'Weekend'] as TimeCommitment[]).map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`px-4 py-2 rounded-xl border text-xs font-semibold transition ${
                  time === t ? 'bg-indigo-600 border-indigo-500 text-text-primary' : 'bg-surface-low border-surface-border text-text-muted'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-surface-border flex justify-end">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 text-text-primary font-bold px-6 py-2.5 rounded-xl text-xs shadow-glow-primary transition"
          >
            Save Learning Preferences
          </button>
        </div>

      </div>

    </div>
  );
};
