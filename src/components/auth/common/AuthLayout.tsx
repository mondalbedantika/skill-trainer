import { useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';
import { APP_NAME } from '../../../constants/app';

interface AuthLayoutProps { title: string; description: string; children: React.ReactNode; }

export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { titleRef.current?.focus(); }, [title]);
  return <main className="min-h-[calc(100vh-9rem)] flex items-center justify-center px-4 py-12"><section className="glass-panel w-full max-w-md rounded-3xl border border-surface-border p-6 sm:p-8 shadow-2xl" aria-labelledby="auth-title"><div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-primary/30 flex items-center justify-center"><Clock className="w-5 h-5 text-primary" /></div><span className="font-semibold text-text-primary">{APP_NAME}</span></div><h1 ref={titleRef} id="auth-title" tabIndex={-1} className="text-2xl font-semibold text-text-primary focus:outline-none">{title}</h1><p className="text-sm text-text-muted mt-2 mb-6">{description}</p>{children}</section></main>;
}
