export type PlatformProvider = 'YouTube' | 'Coursera' | 'Udemy';
export type PriceType = 'FREE' | 'PAID' | 'SUBSCRIPTION';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
export type PrimaryGoal = 'Get a Job' | 'Crack Technical Interviews' | 'Build Projects' | 'College / Academics' | 'Switch Careers' | 'Explore a New Skill';
export type TimeCommitment = '15 min' | '30 min' | '1 hour' | '2 hours' | 'Weekend';
export type TimelineStepState = 'LOCKED' | 'CURRENT' | 'COMPLETED' | 'SKIPPED';
export type SortOption = 'recommended' | 'relevant' | 'rating' | 'shortest' | 'updated';

export interface VideoTimestamp {
  id: string;
  title: string;
  startTime: string; // e.g. "04:12"
  endTime: string;   // e.g. "14:32"
  startSeconds: number;
  endSeconds: number;
  description: string;
  isRecommendedFor1Hour?: boolean;
}

export interface LearningScoreReason {
  label: string;
  passed: boolean;
  text: string;
}

export interface LearningScore {
  score: number; // 0 - 100
  verdict: string;
  reasons: LearningScoreReason[];
  bestFor: string;
  notIdealFor: string;
}

export interface Resource {
  id: string;
  title: string;
  provider: PlatformProvider;
  url: string;
  description: string;
  thumbnail: string;
  duration: string; // e.g. "42 min", "18 hours"
  durationMinutes: number;
  difficulty: SkillLevel;
  rating: number; // e.g. 4.8
  ratingCount?: number;
  learnerCount: string; // e.g. "3.2M views", "320k+ students"
  priceType: PriceType;
  price?: string; // e.g. "$14.99" or "Included in subscription"
  priceCheckDate?: string;
  instructor?: string;
  channel?: string;
  topics: string[];
  lastUpdated?: string;
  learningScore: LearningScore;
  timestamps?: VideoTimestamp[];
  syllabus?: string[];
  hasCertificate: boolean;
  projectCount: number;
  skillId: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topicTag: string;
}

export interface PracticeExercise {
  id: string;
  title: string;
  prompt: string;
  requirements: string[];
  starterCode: string;
  solutionCode: string;
  expectedOutput: string;
  hints: string[];
}

export interface MiniProjectChallenge {
  id: string;
  title: string;
  objective: string;
  steps: string[];
  requirementsChecklist: { id: string; label: string }[];
  starterCode?: string;
  keyTakeaways: string[];
}

export interface SessionStage {
  id: 'learn' | 'understand' | 'practice' | 'quiz' | 'build' | 'reflect';
  title: string;
  durationMin: number;
  timestampRange: string; // e.g. "00:00 — 12:00"
  type: 'video' | 'summary' | 'coding' | 'quiz' | 'project' | 'reflection';
  state: TimelineStepState;
  content: {
    videoSegment?: {
      resource: Resource;
      timestamps: VideoTimestamp[];
    };
    aiSummary?: {
      keyConcepts: { concept: string; detail: string; codeSnippet?: string }[];
      summaryText: string;
    };
    practice?: PracticeExercise;
    quiz?: QuizQuestion[];
    project?: MiniProjectChallenge;
    reflection?: {
      checklist: string[];
      unlockedSkills: string[];
      summary: string;
    };
  };
}

export interface PathIntelligence {
  goalMatchPercentage: number;
  difficultyProgression: 'Excellent' | 'Smooth' | 'Challenging';
  handsOnCoveragePercentage: number;
  rationale: string;
}

export interface OneHourSession {
  id: string;
  skillName: string;
  createdForGoal?: string;
  totalDurationMin: number;
  stages: SessionStage[];
}

export interface SkillLevelPath {
  levelNumber: number;
  levelName: string; // e.g., "01 — Fundamentals"
  provider: PlatformProvider;
  resourceTitle: string;
  priceType: PriceType;
  duration: string;
  description: string;
  resourceId: string;
  status: 'Completed' | '30% complete' | 'Not started';
}

export interface SkillOverview {
  id: string;
  name: string;
  category: string;
  discoveredCount: number;
  description: string;
  learningPath: SkillLevelPath[];
  pathIntelligence: PathIntelligence;
  popularTopics: string[];
}

export interface UserGoals {
  primaryGoal: PrimaryGoal;
  currentLevel: SkillLevel;
  availableTime: TimeCommitment;
  hasOnboarded: boolean;
}

export interface UserProgress {
  skillsExplored: number;
  skillsCompleted: number;
  hoursLearned: number;
  averageQuizScore: number;
  challengesCompleted: number;
  skillMastery: { skillName: string; percentage: number }[];
  activeSession?: {
    skillName: string;
    stageIndex: number;
    completionPercentage: number;
    minutesRemaining: number;
    activeStageTitle: string;
  };
  activityMap: { date: string; count: number }[];
  savedResourceIds: string[];
  completedSessionIds: string[];
  weakAreas: { topic: string; skill: string; needsReview: boolean }[];
}

export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface AuthSession {
  userId: string;
  token: string;
  createdAt: string;
}

export interface InterviewQuestion {
  id: string;
  category: 'Conceptual' | 'Coding' | 'Debugging' | 'System Design' | 'Behavioral';
  question: string;
  hints: string[];
  sampleAnswer: string;
  keyPoints: string[];
}
