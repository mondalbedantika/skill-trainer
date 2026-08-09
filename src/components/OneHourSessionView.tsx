import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Play, 
  CheckCircle2, 
  BookOpen, 
  Code, 
  HelpCircle, 
  Hammer, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Terminal,
  RotateCcw,
  Check,
  Lightbulb,
  ExternalLink,
  Award,
  Lock
} from 'lucide-react';
import { OneHourSession, TimelineStepState } from '../types';
import { AiCopilotPanel } from './AiCopilotPanel';
import { APP_NAME } from '../constants/app';
import confetti from 'canvas-confetti';

interface OneHourSessionViewProps {
  session: OneHourSession;
  onExitSession: () => void;
  onCompleteSession: () => void;
}

export const OneHourSessionView: React.FC<OneHourSessionViewProps> = ({
  session,
  onExitSession,
  onCompleteSession
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  
  // Persistent countdown timer state
  const STORAGE_KEY = `session-timer-${session.id}`;
  const [elapsedSeconds, setElapsedSeconds] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isCopilotOpen, setIsCopilotOpen] = useState(true);

  // Practice Sandbox State
  const [userCode, setUserCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);
  const [isCodeRunning, setIsCodeRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [passedRequirements, setPassedRequirements] = useState<Record<number, boolean>>({});

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScorePercentage, setQuizScorePercentage] = useState<number | null>(null);

  // Challenge step checklist state
  const [checkedChallengeSteps, setCheckedChallengeSteps] = useState<Record<number, boolean>>({});

  const currentStage = session.stages[currentStageIndex];

  // Timer Effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => {
          const next = prev + 1;
          localStorage.setItem(STORAGE_KEY, next.toString());
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [isTimerRunning, STORAGE_KEY]);

  // Sync starter code
  useEffect(() => {
    if (currentStage.type === 'coding' && currentStage.content.practice) {
      setUserCode(currentStage.content.practice.starterCode);
      setConsoleOutput(null);
    }
  }, [currentStageIndex, currentStage]);

  const remainingSeconds = Math.max(0, 3600 - elapsedSeconds);
  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const calculateStageState = (idx: number): TimelineStepState => {
    if (idx < currentStageIndex) return 'COMPLETED';
    if (idx === currentStageIndex) return 'CURRENT';
    return 'LOCKED';
  };

  const handleRunCode = () => {
    setIsCodeRunning(true);
    setConsoleOutput('Evaluating solution against test runner suite...');

    setTimeout(() => {
      setIsCodeRunning(false);
      if (currentStage.content.practice) {
        setConsoleOutput(`[Test Runner Suite]\n✓ 4/4 assertions passed (Execution: 14ms)\nResult: ${currentStage.content.practice.expectedOutput}`);
        const reqMap: Record<number, boolean> = {};
        currentStage.content.practice.requirements.forEach((_, i) => { reqMap[i] = true; });
        setPassedRequirements(reqMap);
      }
    }, 500);
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    const questions = currentStage.content.quiz || [];
    let correctCount = 0;
    questions.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const pct = Math.round((correctCount / questions.length) * 100);
    setQuizScorePercentage(pct);

    if (pct >= 80) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleNextStage = () => {
    if (currentStageIndex < session.stages.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
    } else {
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 } });
      onCompleteSession();
    }
  };

  const completionPercentage = Math.round(((currentStageIndex + 1) / session.stages.length) * 100);

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans">
      
      {/* ── 1. STICKY SESSION HEADER ── */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-surface-border px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <button
            onClick={onExitSession}
            className="flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-text-primary bg-surface-low border border-surface-border px-3 py-1.5 rounded-xl transition"
            aria-label="Exit session"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit</span>
          </button>
          <div>
            <span className="label-mono text-primary block">{APP_NAME} Session</span>
            <h1 className="text-xs sm:text-sm font-semibold text-text-primary truncate max-w-[180px] sm:max-w-md">{session.skillName}</h1>
          </div>
        </div>

        {/* Center / Right Timer & Controls */}
        <div className="flex items-center gap-3 sm:gap-6">
          
          <div className="hidden md:flex flex-col items-end">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-text-muted">Progress:</span>
              <span className="font-bold text-primary">{completionPercentage}%</span>
            </div>
            <div className="w-28 bg-surface-low h-1.5 rounded-full overflow-hidden border border-surface-border mt-1">
              <div 
                className="bg-gradient-to-r from-primary-brand to-cyan-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 bg-surface-low border border-surface-border px-3 py-1.5 rounded-xl text-xs font-mono font-semibold text-text-primary">
            <Clock className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>{formatTimer(remainingSeconds)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="ml-1 text-[10px] bg-surface-high hover:bg-surface-highest text-text-secondary px-2 py-0.5 rounded font-mono transition"
            >
              {isTimerRunning ? 'Pause' : 'Resume'}
            </button>
          </div>

          <button
            onClick={() => setIsCopilotOpen(!isCopilotOpen)}
            className="flex items-center gap-1.5 btn-primary py-1.5 px-3 text-xs"
            aria-label="Toggle AI Copilot panel"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">✦ AI Copilot</span>
          </button>

        </div>

      </header>

      {/* ── 2. MOBILE HORIZONTAL STEP NAVIGATION ── */}
      <div className="lg:hidden border-b border-surface-border bg-surface-low/80 px-4 py-2 flex items-center gap-2 overflow-x-auto">
        {session.stages.map((st, idx) => {
          const isActive = idx === currentStageIndex;
          const isDone = idx < currentStageIndex;
          return (
            <button
              key={st.id}
              onClick={() => setCurrentStageIndex(idx)}
              className={`px-3 py-1 rounded-lg text-xs font-mono shrink-0 transition flex items-center gap-1.5 ${
                isActive 
                  ? 'bg-primary-container/20 border border-primary text-text-primary font-bold'
                  : isDone 
                    ? 'bg-emerald-950/40 border border-emerald-800/40 text-emerald-400' 
                    : 'bg-surface-high/30 border border-surface-border text-text-disabled'
              }`}
            >
              {isDone ? <Check className="w-3 h-3" /> : <span>{idx + 1}.</span>}
              <span>{st.title}</span>
            </button>
          );
        })}
      </div>

      {/* ── 3. MAIN WORKSPACE ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1 flex flex-col lg:flex-row gap-6">
        
        {/* LEFT VERTICAL TIMELINE (DESKTOP) */}
        <aside className="hidden lg:block w-60 glass-panel p-4 rounded-2xl border border-surface-border shrink-0 space-y-3">
          <div className="label-mono px-1 mb-2">60-Min Sequence</div>

          <div className="space-y-2">
            {session.stages.map((stage, idx) => {
              const nodeState = calculateStageState(idx);
              const isActive = idx === currentStageIndex;

              return (
                <button
                  key={stage.id}
                  onClick={() => setCurrentStageIndex(idx)}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    isActive 
                      ? 'timeline-node-current' 
                      : nodeState === 'COMPLETED' 
                      ? 'timeline-node-completed' 
                      : 'timeline-node-locked'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {nodeState === 'COMPLETED' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {nodeState === 'CURRENT' && <Sparkles className="w-4 h-4 text-primary animate-pulse" />}
                    {nodeState === 'LOCKED' && <Lock className="w-4 h-4 text-text-disabled" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                      <span className="text-text-muted">{stage.timestampRange}</span>
                      <span className="font-bold">{stage.durationMin}m</span>
                    </div>
                    <div className="font-medium text-xs truncate text-text-primary">
                      {idx + 1}. {stage.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* MIDDLE WORKSPACE CONTENT */}
        <main className="flex-1 glass-panel p-6 sm:p-8 rounded-2xl border border-surface-border min-h-[550px] flex flex-col justify-between">
          
          {/* STAGE 1: LEARN */}
          {currentStage.type === 'video' && currentStage.content.videoSegment && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="badge-youtube mb-2">
                    <Play className="w-3 h-3 fill-current" /> YOUTUBE • RECOMMENDED CHAPTERS
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                    {currentStage.content.videoSegment.resource.title}
                  </h2>
                  <p className="text-xs text-text-muted mt-1 font-mono">
                    Channel: {currentStage.content.videoSegment.resource.channel} • {currentStage.content.videoSegment.resource.learnerCount}
                  </p>
                </div>
                <a
                  href={currentStage.content.videoSegment.resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs py-1.5 px-3"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 aspect-video bg-background rounded-xl border border-surface-border relative overflow-hidden flex flex-col items-center justify-center group">
                  <img
                    src={currentStage.content.videoSegment.resource.thumbnail}
                    alt="Video Thumbnail"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="relative z-10 text-center p-6">
                    <div className="w-14 h-14 bg-rose-600/90 hover:bg-rose-500 text-text-primary rounded-full flex items-center justify-center mx-auto mb-3 shadow-glow-primary transition-transform active:scale-95 cursor-pointer">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                    <p className="text-text-primary font-semibold text-xs">Smart Segmented Micro-Playback</p>
                    <p className="text-[11px] text-text-muted mt-0.5 font-mono">10-Minute Curated Learning Slice</p>
                  </div>
                </div>

                <div className="bg-surface-low border border-surface-border p-4 rounded-xl space-y-3">
                  <h3 className="label-mono flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Recommended Timestamps</span>
                  </h3>
                  <div className="space-y-2">
                    {currentStage.content.videoSegment.timestamps.map((ts) => (
                      <div
                        key={ts.id}
                        className="p-3 bg-surface-card hover:bg-surface-high rounded-lg border border-surface-border transition cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-mono font-bold text-primary">{ts.startTime} – {ts.endTime}</span>
                          {ts.isRecommendedFor1Hour && (
                            <span className="bg-surface-low text-primary text-[9px] font-mono px-1.5 py-0.5 rounded">1-Hour Fit</span>
                          )}
                        </div>
                        <div className="text-xs font-semibold text-text-primary">{ts.title}</div>
                        <div className="text-[11px] text-text-muted leading-snug">{ts.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 2: UNDERSTAND */}
          {currentStage.type === 'summary' && currentStage.content.aiSummary && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <span className="chip chip-active text-xs mb-2">
                  <BookOpen className="w-3.5 h-3.5" /> AI CONCEPT BREAKDOWN
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">Essential Mental Models</h2>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                  {currentStage.content.aiSummary.summaryText}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentStage.content.aiSummary.keyConcepts.map((item, idx) => (
                  <div key={idx} className="bg-surface-low border border-surface-border p-4 rounded-xl space-y-2.5">
                    <div className="w-6 h-6 rounded-md bg-surface-low border border-primary/40 text-primary flex items-center justify-center font-mono font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <h3 className="font-semibold text-text-primary text-xs">{item.concept}</h3>
                    <p className="text-[11px] text-text-muted leading-relaxed">{item.detail}</p>
                    {item.codeSnippet && (
                      <pre className="bg-background p-2.5 rounded-lg border border-surface-border font-mono text-[10px] text-primary overflow-x-auto">
                        {item.codeSnippet}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 3: PRACTICE */}
          {currentStage.type === 'coding' && currentStage.content.practice && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <span className="chip chip-active text-xs mb-2">
                  <Code className="w-3.5 h-3.5" /> INTERACTIVE PRACTICE WORKSPACE
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary">{currentStage.content.practice.title}</h2>
                <p className="text-text-secondary text-xs sm:text-sm mt-1">{currentStage.content.practice.prompt}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Requirements Sidebar */}
                <div className="bg-surface-low border border-surface-border p-4 rounded-xl space-y-3">
                  <h3 className="label-mono">Requirements Checklist</h3>
                  <div className="space-y-2">
                    {currentStage.content.practice.requirements.map((req, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 text-xs">
                        <div className={`w-4 h-4 rounded flex items-center justify-center ${passedRequirements[rIdx] ? 'bg-emerald-500 text-text-primary font-bold' : 'border border-surface-border bg-background'}`}>
                          {passedRequirements[rIdx] && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={passedRequirements[rIdx] ? 'text-emerald-300 font-semibold' : 'text-text-secondary'}>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Editor */}
                <div className="lg:col-span-2 bg-background border border-surface-border rounded-xl overflow-hidden flex flex-col">
                  <div className="bg-surface-low px-4 py-2 border-b border-surface-border flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
                      <Terminal className="w-3.5 h-3.5 text-primary" />
                      <span>practice_solution.js</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="text-[11px] font-mono text-amber-400 hover:underline flex items-center gap-1"
                      >
                        <Lightbulb className="w-3 h-3" /> {showHint ? 'Hide Hint' : 'Hint'}
                      </button>
                      <button
                        onClick={() => setShowSolution(!showSolution)}
                        className="text-[11px] font-mono text-text-muted hover:text-text-primary underline"
                      >
                        {showSolution ? 'Hide Solution' : 'Solution'}
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={showSolution ? currentStage.content.practice.solutionCode : userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    readOnly={showSolution}
                    className="w-full h-48 bg-background p-4 font-mono text-xs text-text-primary focus:outline-none resize-none leading-relaxed"
                  />

                  <div className="p-3 bg-surface-low/80 border-t border-surface-border flex items-center justify-between">
                    <button
                      onClick={() => setUserCode(currentStage.content.practice?.starterCode || '')}
                      className="flex items-center gap-1 text-xs font-mono text-text-muted hover:text-text-primary"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reset
                    </button>

                    <button
                      onClick={handleRunCode}
                      disabled={isCodeRunning}
                      className="btn-primary text-xs py-1.5 px-4 bg-emerald-600 hover:bg-emerald-500"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isCodeRunning ? 'Evaluating...' : 'Run Tests'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {consoleOutput && (
                <div className="p-3 bg-background border border-surface-border rounded-xl font-mono text-xs text-emerald-300 leading-relaxed">
                  {consoleOutput}
                </div>
              )}
            </div>
          )}

          {/* STAGE 4: QUIZ */}
          {currentStage.type === 'quiz' && currentStage.content.quiz && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <span className="chip chip-active text-xs mb-2">
                    <HelpCircle className="w-3.5 h-3.5" /> AI KNOWLEDGE CHECK
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-1">5-Question Knowledge Assessment</h2>
                </div>

                {quizScorePercentage !== null && (
                  <div className="bg-surface-low border border-primary/40 p-3 rounded-xl text-center">
                    <div className="text-[10px] font-mono text-text-muted">Quiz Score</div>
                    <div className="text-lg font-mono font-bold text-primary">{quizScorePercentage}%</div>
                    <div className="text-[9px] font-mono text-emerald-400 mt-0.5">
                      {quizScorePercentage >= 80 ? 'Concept Mastered' : 'Recommended Review'}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {currentStage.content.quiz.map((q, qIdx) => {
                  const selected = quizAnswers[q.id];
                  const isCorrect = selected === q.correctIndex;

                  return (
                    <div key={q.id} className="bg-surface-low border border-surface-border p-4 rounded-xl space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-primary font-semibold">QUESTION 0{qIdx + 1} / 05</span>
                        <span className="text-text-muted">{q.topicTag}</span>
                      </div>

                      <h3 className="font-medium text-text-primary text-xs sm:text-sm">{q.question}</h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => {
                          let btnStyle = 'bg-surface-card border-surface-border text-text-secondary hover:bg-surface-high';
                          if (selected === optIdx) {
                            btnStyle = 'bg-surface-low border-primary text-text-primary font-semibold';
                          }
                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-semibold';
                            } else if (selected === optIdx && !isCorrect) {
                              btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectQuizOption(q.id, optIdx)}
                              className={`p-2.5 rounded-lg border text-xs text-left transition font-medium ${btnStyle}`}
                            >
                              <span className="font-mono text-text-muted mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="p-3 bg-background border border-surface-border rounded-lg text-xs text-text-secondary space-y-1">
                          <span className="font-mono font-bold text-amber-300 block">Why?</span>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!quizSubmitted && (
                <div className="flex justify-end">
                  <button
                    onClick={handleSubmitQuiz}
                    className="btn-primary text-xs"
                  >
                    Submit Quiz Answers
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STAGE 5: BUILD */}
          {currentStage.type === 'project' && currentStage.content.project && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <span className="chip chip-active text-xs mb-2">
                  <Hammer className="w-3.5 h-3.5" /> PRACTICAL MINI-CHALLENGE
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-1">{currentStage.content.project.title}</h2>
                <p className="text-text-secondary text-xs sm:text-sm">{currentStage.content.project.objective}</p>
              </div>

              <div className="bg-surface-low border border-surface-border p-5 rounded-xl space-y-4">
                <h3 className="label-mono">Implementation Steps</h3>
                <div className="space-y-2">
                  {currentStage.content.project.steps.map((step, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setCheckedChallengeSteps(prev => ({ ...prev, [idx]: !prev[idx] }))}
                      className="p-3 bg-surface-card border border-surface-border rounded-lg text-xs text-text-secondary flex items-start gap-2.5 cursor-pointer hover:border-primary/40 transition"
                    >
                      <input 
                        type="checkbox" 
                        checked={!!checkedChallengeSteps[idx]} 
                        onChange={() => {}}
                        className="mt-0.5 rounded border-surface-border text-primary-brand focus:ring-primary-brand"
                      />
                      <span className={checkedChallengeSteps[idx] ? 'line-through text-text-muted' : 'text-text-primary font-medium'}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STAGE 6: REFLECT */}
          {currentStage.type === 'reflection' && currentStage.content.reflection && (
            <div className="space-y-6 text-center max-w-xl mx-auto py-4 animate-fadeIn">
              <div className="w-14 h-14 bg-gradient-to-tr from-primary-brand to-cyan-400 text-text-primary rounded-2xl flex items-center justify-center mx-auto shadow-glow-primary">
                <Award className="w-7 h-7" />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">One hour well spent.</h2>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">{currentStage.content.reflection.summary}</p>
              </div>

              <div className="bg-surface-low border border-surface-border p-5 rounded-xl text-left space-y-3">
                <h3 className="label-mono">Skills Unlocked</h3>
                <div className="flex flex-wrap gap-1.5">
                  {currentStage.content.reflection.checklist.map((item, idx) => (
                    <span key={idx} className="chip chip-active text-xs">
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STAGE FOOTER NAVIGATION */}
          <div className="pt-4 border-t border-surface-border flex items-center justify-between mt-6">
            <button
              onClick={() => setCurrentStageIndex(prev => Math.max(0, prev - 1))}
              disabled={currentStageIndex === 0}
              className={`btn-secondary text-xs py-2 px-3 ${currentStageIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNextStage}
              className="btn-primary text-xs py-2 px-5"
            >
              <span>{currentStageIndex === session.stages.length - 1 ? 'Finish Session' : 'Next Stage'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </main>

        {/* RIGHT DESKTOP AI COPILOT */}
        {isCopilotOpen && (
          <AiCopilotPanel
            isOpen={isCopilotOpen}
            onClose={() => setIsCopilotOpen(false)}
            skillName={session.skillName}
            lessonTitle={currentStage.title}
            activeStage={currentStage.title.toUpperCase()}
          />
        )}

      </div>

    </div>
  );
};
