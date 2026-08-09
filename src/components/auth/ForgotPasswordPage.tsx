import { useNavigation } from '../../context/NavigationContext';
import { AuthLayout } from './common/AuthLayout';
import { ForgotPasswordForm } from './ForgotPasswordForm';
export function ForgotPasswordPage() { const { setActiveTab, setResetToken } = useNavigation(); return <AuthLayout title="Reset your password" description="Enter your email to create a temporary reset link."><ForgotPasswordForm onContinue={(token) => { setResetToken(token); setActiveTab('reset-password'); }} onSignIn={() => setActiveTab('signin')} /></AuthLayout>; }
