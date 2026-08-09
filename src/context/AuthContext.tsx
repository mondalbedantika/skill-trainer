import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';
import type { User } from '../types';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthContextValue {
  user: User | null;
  status: AuthStatus;
  signUp: (email: string, password: string) => Promise<User>;
  signIn: (email: string, password: string) => Promise<User>;
  requestPasswordReset: (email: string) => Promise<string>;
  resetPassword: (token: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    authService.getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setStatus(currentUser ? 'authenticated' : 'unauthenticated');
    });
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    status,
    async signUp(email, password) { const newUser = await authService.signUp(email, password); setUser(newUser); setStatus('authenticated'); return newUser; },
    async signIn(email, password) { const signedInUser = await authService.signIn(email, password); setUser(signedInUser); setStatus('authenticated'); return signedInUser; },
    requestPasswordReset: (email) => authService.requestPasswordReset(email),
    resetPassword: (token, password) => authService.resetPassword(token, password),
    async signOut() { await authService.signOut(); setUser(null); setStatus('unauthenticated'); },
  }), [status, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
