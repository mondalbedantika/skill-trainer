import { LogIn } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { AuthLayout } from './common/AuthLayout';

interface AuthRequiredProps { feature: string; }
export function AuthRequired({ feature }: AuthRequiredProps) { const { setActiveTab } = useNavigation(); return <AuthLayout title="Create an account to continue" description={`${feature} is tied to your personal learning history.`}><div className="space-y-3"><button onClick={() => setActiveTab('signup')} className="btn-primary w-full justify-center"><LogIn className="w-4 h-4" />Create an account</button><button onClick={() => setActiveTab('signin')} className="btn-secondary w-full justify-center">Sign in</button><button onClick={() => setActiveTab('explore')} className="block mx-auto text-xs text-primary hover:underline">Continue exploring as a guest</button></div></AuthLayout>; }
