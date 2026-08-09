import React, { useState } from 'react';
import { Sparkles, AlertTriangle } from 'lucide-react';
import { SAMPLE_INTERVIEW_QUESTIONS } from '../services/mockData';

interface InterviewPrepViewProps {
  onStartOneHour: (skillName: string) => void;
}

export const InterviewPrepView: React.FC<InterviewPrepViewProps> = ({ onStartOneHour }) => {
  const [selectedSkill, setSelectedSkill] = useState<string>('react-hooks');
  const [selectedCategory, setSelectedCategory] = useState<string>('Conceptual');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);

  const questions = SAMPLE_INTERVIEW_QUESTIONS[selectedSkill] || SAMPLE_INTERVIEW_QUESTIONS['react-hooks'];
  const currentQ = questions[currentQuestionIndex] || questions[0];

  const handleEvaluate = () => {
    setIsEvaluated(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-surface-border flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
              Technical Interview Simulator
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-text-primary">Interview Prep Mode</h1>
          <p className="text-xs text-text-muted">Practice questions evaluated by AI to detect weak areas and build targeted 20-min fixes.</p>
        </div>

        {/* Skill Selector */}
        <select
          value={selectedSkill}
          onChange={(e) => {
            setSelectedSkill(e.target.value);
            setCurrentQuestionIndex(0);
            setIsEvaluated(false);
            setUserAnswer('');
          }}
          className="bg-surface-low border border-surface-border text-text-secondary text-xs rounded-xl px-4 py-2.5 font-bold focus:outline-none focus:border-indigo-500"
        >
          <option value="react-hooks">React Hooks & Architecture</option>
          <option value="python">Python Fundamentals & Internals</option>
        </select>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {['Conceptual', 'Coding', 'Debugging', 'System Design', 'Behavioral'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              selectedCategory === cat 
                ? 'bg-purple-600 text-text-primary shadow-glow-primary' 
                : 'bg-surface-low text-text-muted hover:text-text-primary border border-surface-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Interactive Question Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-surface-border space-y-6">
        
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <span className="text-xs font-mono font-bold text-indigo-400">Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span className="bg-surface-low text-text-secondary text-xs px-2.5 py-1 rounded-lg border border-surface-border">{currentQ.category}</span>
        </div>

        <h2 className="text-xl font-bold text-text-primary leading-relaxed">{currentQ.question}</h2>

        {/* Answer Text Area */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-text-secondary">Your Solution / Explanation:</label>
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your response here as if explaining to a Principal Staff Engineer..."
            className="w-full h-40 bg-background border border-surface-border rounded-2xl p-4 text-xs font-mono text-text-primary focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        {!isEvaluated ? (
          <div className="flex justify-end">
            <button
              onClick={handleEvaluate}
              disabled={!userAnswer.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-text-primary font-bold px-6 py-2.5 rounded-xl text-xs shadow-glow-primary transition"
            >
              Evaluate Answer
            </button>
          </div>
        ) : (
          <div className="space-y-6 pt-4 border-t border-surface-border animate-fadeIn">
            
            {/* Model Answer Breakdown */}
            <div className="bg-surface-low border border-surface-border p-5 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">AI Model Answer & Rationale:</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-mono bg-background p-4 rounded-xl border border-surface-border">
                {currentQ.sampleAnswer}
              </p>

              <div className="pt-2">
                <span className="text-[11px] text-text-muted font-bold block mb-1">Key Points Required:</span>
                <div className="flex flex-wrap gap-2">
                  {currentQ.keyPoints.map((kp, idx) => (
                    <span key={idx} className="bg-indigo-950 text-indigo-300 text-[11px] px-2.5 py-1 rounded-lg border border-indigo-800">
                      ✓ {kp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Weak Area Diagnostics & Recommendation */}
            <div className="bg-amber-950/40 border border-amber-800/60 p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                <AlertTriangle className="w-4 h-4" />
                <span>Weak Area Diagnostic & Targeted 20-Min Fix</span>
              </div>
              <p className="text-xs text-text-secondary">
                Based on your response, <strong className="text-text-primary">Fiber linked-list state traversal</strong> needs review.
              </p>
              
              <button
                onClick={() => onStartOneHour(selectedSkill)}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 text-text-primary font-bold px-5 py-2.5 rounded-xl text-xs shadow-glow-primary transition"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate Targeted 20-Min Fix Path</span>
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
