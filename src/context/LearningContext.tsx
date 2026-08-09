import { createContext, useContext, useMemo, useState } from 'react';
import type { OneHourSession, Resource, SkillOverview, UserGoals, UserProgress } from '../types';
import { INITIAL_RESOURCES, MOCK_SKILLS } from '../services/mockData';
import { AiEngine } from '../services/aiEngine';
import { useNavigation } from './NavigationContext';

interface LearningContextValue {
  resources: Resource[]; activeSkill: SkillOverview; activeSession: OneHourSession | null;
  selectedDetailResource: Resource | null; setSelectedDetailResource: (resource: Resource | null) => void;
  savedResourceIds: string[]; savedResources: Resource[]; userGoals: UserGoals; setUserGoals: (goals: UserGoals) => void;
  userProgress: UserProgress; isGeneratingPath: boolean; generatingSkillTarget: string;
  search: (query: string) => void; startOneHour: (skillName?: string) => void; completeGeneration: () => void; toggleSavedResource: (id: string) => void;
}
const LearningContext = createContext<LearningContextValue | undefined>(undefined);
const initialProgress: UserProgress = { skillsExplored: 14, skillsCompleted: 8, hoursLearned: 12.4, averageQuizScore: 89, challengesCompleted: 7, skillMastery: [{ skillName: 'Python', percentage: 78 }, { skillName: 'React Hooks', percentage: 42 }, { skillName: 'SQL', percentage: 91 }, { skillName: 'Machine Learning', percentage: 26 }], activeSession: { skillName: 'React Hooks', stageIndex: 0, completionPercentage: 42, minutesRemaining: 18, activeStageTitle: 'LEARN' }, activityMap: [], savedResourceIds: ['yt-react-hooks-1'], completedSessionIds: [], weakAreas: [] };

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const { setActiveTab } = useNavigation();
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);
  const [activeSkill, setActiveSkill] = useState<SkillOverview>(MOCK_SKILLS[0]);
  const [activeSession, setActiveSession] = useState<OneHourSession | null>(null);
  const [selectedDetailResource, setSelectedDetailResource] = useState<Resource | null>(null);
  const [savedResourceIds, setSavedResourceIds] = useState<string[]>(['yt-react-hooks-1']);
  const [userGoals, setUserGoals] = useState<UserGoals>({ primaryGoal: 'Build Projects', currentLevel: 'Beginner', availableTime: '1 hour', hasOnboarded: true });
  const [isGeneratingPath, setIsGeneratingPath] = useState(false);
  const [generatingSkillTarget, setGeneratingSkillTarget] = useState('');
  const search = (query: string) => {
    const normalizedQuery = query.trim();
    setResources(AiEngine.searchSkillResources(normalizedQuery));
    const found = MOCK_SKILLS.find((skill) => skill.name.toLowerCase().includes(normalizedQuery.toLowerCase()));

    setActiveSkill(found ?? {
      id: normalizedQuery.toLowerCase().replace(/\s+/g, '-') || 'custom-skill',
      name: normalizedQuery || 'New Skill',
      category: 'Custom learning path',
      discoveredCount: 0,
      description: `A focused, AI-curated path for ${normalizedQuery || 'your next skill'}.`,
      popularTopics: [],
      pathIntelligence: {
        goalMatchPercentage: 88,
        difficultyProgression: 'Smooth',
        handsOnCoveragePercentage: 75,
        rationale: 'A focused path assembled from the best matching resources.',
      },
      learningPath: [],
    });
    setActiveTab('skill');
  };
  const startOneHour = (skillName = 'React Hooks') => { setGeneratingSkillTarget(skillName); setIsGeneratingPath(true); };
  const completeGeneration = () => { setIsGeneratingPath(false); setActiveSession(AiEngine.buildOneHourSession(generatingSkillTarget || 'React Hooks', userGoals.primaryGoal)); setActiveTab('onehour'); };
  const toggleSavedResource = (id: string) => setSavedResourceIds((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]);
  const savedResources = useMemo(() => resources.filter((resource) => savedResourceIds.includes(resource.id)), [resources, savedResourceIds]);
  return <LearningContext.Provider value={{ resources, activeSkill, activeSession, selectedDetailResource, setSelectedDetailResource, savedResourceIds, savedResources, userGoals, setUserGoals, userProgress: initialProgress, isGeneratingPath, generatingSkillTarget, search, startOneHour, completeGeneration, toggleSavedResource }}>{children}</LearningContext.Provider>;
}
export function useLearning() { const context = useContext(LearningContext); if (!context) throw new Error('useLearning must be used within LearningProvider'); return context; }
