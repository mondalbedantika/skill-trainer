import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResourceDiscovery } from './components/ResourceDiscovery';
import { SkillPage } from './components/SkillPage';
import { OneHourSessionView } from './components/OneHourSessionView';
import { DashboardView } from './components/DashboardView';
import { SavedView } from './components/SavedView';
import { InterviewPrepView } from './components/InterviewPrepView';
import { ProgressView } from './components/ProgressView';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { OnboardingModal } from './components/OnboardingModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { AiGenerationModal } from './components/AiGenerationModal';

import { Resource, OneHourSession, SkillOverview, UserGoals, UserProgress } from './types';
import { INITIAL_RESOURCES, MOCK_SKILLS } from './services/mockData';
import { AiEngine } from './services/aiEngine';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);
  
  // Selected Objects
  const [activeSkill, setActiveSkill] = useState<SkillOverview>(MOCK_SKILLS[0]);
  const [activeSession, setActiveSession] = useState<OneHourSession | null>(null);
  const [selectedDetailResource, setSelectedDetailResource] = useState<Resource | null>(null);

  // Modals & Drawers
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [assistantQuestion, setAssistantQuestion] = useState<string>('');
  const [isGeneratingPath, setIsGeneratingPath] = useState<boolean>(false);
  const [generatingSkillTarget, setGeneratingSkillTarget] = useState<string>('');

  // Saved items & user state
  const [savedResourceIds, setSavedResourceIds] = useState<string[]>(['yt-react-hooks-1']);
  const [userGoals, setUserGoals] = useState<UserGoals>({
    primaryGoal: 'Build Projects',
    currentLevel: 'Beginner',
    availableTime: '1 hour',
    hasOnboarded: true
  });

  const [userProgress, setUserProgress] = useState<UserProgress>({
    skillsExplored: 14,
    skillsCompleted: 8,
    hoursLearned: 12.4,
    averageQuizScore: 89,
    challengesCompleted: 7,
    skillMastery: [
      { skillName: 'Python', percentage: 78 },
      { skillName: 'React Hooks', percentage: 42 },
      { skillName: 'SQL', percentage: 91 },
      { skillName: 'Machine Learning', percentage: 26 },
    ],
    activeSession: {
      skillName: 'React Hooks',
      stageIndex: 0,
      completionPercentage: 42,
      minutesRemaining: 18,
      activeStageTitle: 'LEARN'
    },
    activityMap: [],
    savedResourceIds: ['yt-react-hooks-1'],
    completedSessionIds: [],
    weakAreas: []
  });

  // Handle Search Execution
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = AiEngine.searchSkillResources(query);
    setResources(results);

    // Find matching skill overview or build synthetic one
    const foundSkill = MOCK_SKILLS.find(s => s.name.toLowerCase().includes(query.toLowerCase()));
    if (foundSkill) {
      setActiveSkill(foundSkill);
    } else {
      setActiveSkill({
        id: query.toLowerCase().replace(/\s+/g, '-'),
        name: query.charAt(0).toUpperCase() + query.slice(1),
        category: 'Technical Skill',
        discoveredCount: 8400,
        description: `Master ${query} concepts, hands-on practices, and build 1-hour interactive learning paths.`,
        popularTopics: [`${query} Basics`, 'Core Patterns', 'Project Setup'],
        pathIntelligence: {
          goalMatchPercentage: 88,
          difficultyProgression: 'Smooth',
          handsOnCoveragePercentage: 80,
          rationale: `AI-curated path for ${query}, balancing theory and hands-on project practice across all levels.`
        },
        learningPath: [
          { levelNumber: 1, levelName: '01 — Fundamentals', provider: 'YouTube', resourceTitle: `${query} in 10 Minutes`, priceType: 'FREE', duration: '10 min', description: 'Core syntax and mental model', resourceId: `yt-${query}`, status: 'Not started' },
          { levelNumber: 2, levelName: '02 — Intermediate', provider: 'Udemy', resourceTitle: `${query} Complete Bootcamp`, priceType: 'PAID', duration: '12 hours', description: 'Deep dive architecture and state', resourceId: `udemy-${query}`, status: 'Not started' },
          { levelNumber: 3, levelName: '03 — Projects', provider: 'YouTube', resourceTitle: `Build 3 ${query} Projects`, priceType: 'FREE', duration: '2 hours', description: 'Real application code', resourceId: `yt-proj-${query}`, status: 'Not started' },
          { levelNumber: 4, levelName: '04 — Advanced', provider: 'Coursera', resourceTitle: `${query} Enterprise Certification`, priceType: 'SUBSCRIPTION', duration: '1 month', description: 'Enterprise production systems', resourceId: `coursera-${query}`, status: 'Not started' }
        ]
      });
    }

    setActiveTab('skill');
  };

  // Launch 1-Hour Session Flagship Mode with AI Generation step
  const handleStartOneHour = (skillName: string = 'React Hooks') => {
    setGeneratingSkillTarget(skillName);
    setIsGeneratingPath(true);
  };

  const handleCompleteGeneration = () => {
    setIsGeneratingPath(false);
    const session = AiEngine.buildOneHourSession(generatingSkillTarget || 'React Hooks', userGoals.primaryGoal);
    setActiveSession(session);
    setActiveTab('onehour');
  };

  // Bookmark toggle
  const handleSaveResource = (id: string) => {
    if (savedResourceIds.includes(id)) {
      setSavedResourceIds(savedResourceIds.filter(item => item !== id));
    } else {
      setSavedResourceIds([...savedResourceIds, id]);
    }
  };

  const savedResourcesList = resources.filter(r => savedResourceIds.includes(r.id));

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col font-sans">
      
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userGoals={userGoals}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onStartOneHour={handleStartOneHour}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'explore' && (
          <>
            <Hero onSearch={handleSearch} onStartOneHour={handleStartOneHour} />
            <ResourceDiscovery
              resources={resources}
              onSelectResource={(r) => setSelectedDetailResource(r)}
              onStartOneHour={handleStartOneHour}
              onSaveResource={handleSaveResource}
              savedResourceIds={savedResourceIds}
            />
          </>
        )}

        {activeTab === 'resources' && (
          <ResourceDiscovery
            resources={resources}
            onSelectResource={(r) => setSelectedDetailResource(r)}
            onStartOneHour={handleStartOneHour}
            onSaveResource={handleSaveResource}
            savedResourceIds={savedResourceIds}
          />
        )}

        {(activeTab === 'skill' || activeTab === 'aipaths') && (
          <SkillPage
            skill={activeSkill}
            resources={resources}
            onStartOneHour={handleStartOneHour}
            onSelectResource={(r) => setSelectedDetailResource(r)}
          />
        )}

        {activeTab === 'onehour' && activeSession && (
          <OneHourSessionView
            session={activeSession}
            onExitSession={() => setActiveTab('skill')}
            onCompleteSession={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            progress={userProgress}
            onContinueSession={() => handleStartOneHour(userProgress.activeSession?.skillName || 'React Hooks')}
            onStartSkill={handleSearch}
          />
        )}

        {activeTab === 'saved' && (
          <SavedView
            savedResources={savedResourcesList}
            onRemoveSave={handleSaveResource}
            onStartOneHour={handleStartOneHour}
          />
        )}

        {activeTab === 'interview' && (
          <InterviewPrepView onStartOneHour={handleStartOneHour} />
        )}

        {activeTab === 'progress' && (
          <ProgressView
            progress={userProgress}
            onStartSkill={handleSearch}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-surface-border py-8 mt-16" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 text-xs text-text-muted">
          <div>
            <span className="font-semibold text-white">One-Hour Skill Trainer</span> — AI Technical Learning Aggregator
            <p className="text-[11px] text-text-muted mt-0.5">
              Aggregating & ranking resources across YouTube, Coursera & Udemy.
            </p>
          </div>
          <div className="flex items-center gap-4 text-text-muted font-medium">
            <button onClick={() => setIsOnboardingOpen(true)} className="hover:text-white transition">Learning Preferences</button>
            <span>•</span>
            <button onClick={() => setIsSearchOpen(true)} className="hover:text-white transition">⌘K Search</button>
            <span>•</span>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Documentation</a>
          </div>
        </div>
      </footer>

      {/* Global Modals & Drawers */}
      <ResourceDetailModal
        resource={selectedDetailResource}
        onClose={() => setSelectedDetailResource(null)}
        onStartOneHour={handleStartOneHour}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        userGoals={userGoals}
        onSaveGoals={(goals) => setUserGoals(goals)}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        resources={resources}
        onSelectResource={(r) => setSelectedDetailResource(r)}
        onStartOneHour={handleStartOneHour}
      />

      <AiAssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        skillName={activeSession?.skillName || activeSkill.name}
        initialQuestion={assistantQuestion}
      />

      {/* AI Path Generation Overlay */}
      {isGeneratingPath && (
        <AiGenerationModal
          skillName={generatingSkillTarget || 'React Hooks'}
          onComplete={handleCompleteGeneration}
        />
      )}

    </div>
  );
}

export default App;
