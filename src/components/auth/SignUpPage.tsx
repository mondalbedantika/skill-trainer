import { useNavigation } from '../../context/NavigationContext';
import { AuthLayout } from './common/AuthLayout';
import { SignUpForm } from './SignUpForm';
export function SignUpPage() { const { setActiveTab } = useNavigation(); return <AuthLayout title="Create your account" description="Keep your saved resources and learning activity in one place."><SignUpForm onSuccess={() => setActiveTab('explore')} onSignIn={() => setActiveTab('signin')} /></AuthLayout>; }
