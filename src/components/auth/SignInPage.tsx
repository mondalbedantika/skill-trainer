import { useNavigation } from '../../context/NavigationContext';
import { AuthLayout } from './common/AuthLayout';
import { SignInForm } from './SignInForm';
export function SignInPage() { const { setActiveTab } = useNavigation(); return <AuthLayout title="Welcome back" description="Sign in to save resources and build your learning history."><SignInForm onSuccess={() => setActiveTab('explore')} onSignUp={() => setActiveTab('signup')} onForgotPassword={() => setActiveTab('forgot-password')} /></AuthLayout>; }
