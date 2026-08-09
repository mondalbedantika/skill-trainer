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
import { APP_NAME, APP_TAGLINE } from './constants/app';
import { LearningProvider, useLearning } from './context/LearningContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';

function AppContent() {
  const navigation = useNavigation();
  const learning = useLearning();
  const { activeTab, setActiveTab, isOnboardingOpen, setIsOnboardingOpen, isSearchOpen, setIsSearchOpen, isAssistantOpen, setIsAssistantOpen } = navigation;
  const { resources, activeSkill, activeSession, selectedDetailResource, setSelectedDetailResource, userGoals, setUserGoals, userProgress, isGeneratingPath, generatingSkillTarget, search, startOneHour, completeGeneration } = learning;

  return <div className="min-h-screen bg-background text-text-primary flex flex-col font-sans">
    <Navbar />
    <main className="flex-1">
      {activeTab === 'explore' && <><Hero onSearch={search} onStartOneHour={startOneHour} /><ResourceDiscovery /></>}
      {activeTab === 'resources' && <ResourceDiscovery />}
      {(activeTab === 'skill' || activeTab === 'aipaths') && <SkillPage skill={activeSkill} resources={resources} onStartOneHour={startOneHour} onSelectResource={setSelectedDetailResource} />}
      {activeTab === 'onehour' && activeSession && <OneHourSessionView session={activeSession} onExitSession={() => setActiveTab('skill')} onCompleteSession={() => setActiveTab('dashboard')} />}
      {activeTab === 'dashboard' && <DashboardView progress={userProgress} onContinueSession={() => startOneHour(userProgress.activeSession?.skillName)} onStartSkill={search} />}
      {activeTab === 'saved' && <SavedView />}
      {activeTab === 'interview' && <InterviewPrepView onStartOneHour={startOneHour} />}
      {activeTab === 'progress' && <ProgressView progress={userProgress} onStartSkill={search} />}
    </main>
    <footer className="glass-panel border-t border-surface-border py-8 mt-16" role="contentinfo"><div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 text-xs text-text-muted"><div><span className="font-semibold text-text-primary">{APP_NAME}</span> — {APP_TAGLINE}<p className="text-[11px] text-text-muted mt-0.5">Aggregating & ranking resources across YouTube, Coursera & Udemy.</p></div><div className="flex items-center gap-4 text-text-muted font-medium"><button onClick={() => setIsOnboardingOpen(true)} className="hover:text-white transition">Learning Preferences</button><button onClick={() => setIsSearchOpen(true)} className="hover:text-white transition">Search</button></div></div></footer>
    <ResourceDetailModal resource={selectedDetailResource} onClose={() => setSelectedDetailResource(null)} onStartOneHour={startOneHour} />
    <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} userGoals={userGoals} onSaveGoals={setUserGoals} />
    <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} resources={resources} onSelectResource={setSelectedDetailResource} onStartOneHour={startOneHour} />
    <AiAssistantDrawer isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} skillName={activeSession?.skillName || activeSkill.name} />
    {isGeneratingPath && <AiGenerationModal skillName={generatingSkillTarget || 'React Hooks'} onComplete={completeGeneration} />}
  </div>;
}

export function App() { return <NavigationProvider><LearningProvider><AppContent /></LearningProvider></NavigationProvider>; }
export default App;
