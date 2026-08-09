import { useNavigation } from '../../context/NavigationContext';
import { AuthLayout } from './common/AuthLayout';
import { ResetPasswordForm } from './ResetPasswordForm';
export function ResetPasswordPage() { const { resetToken, setActiveTab, setResetToken } = useNavigation(); return <AuthLayout title="Choose a new password" description="Your temporary reset link expires after 15 minutes."><ResetPasswordForm token={resetToken} onSuccess={() => { setResetToken(''); setActiveTab('signin'); }} onRequestNewLink={() => setActiveTab('forgot-password')} /></AuthLayout>; }
