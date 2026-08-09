import type { AuthSession, User } from '../types';

interface StoredUser extends User {
  passwordHash: string;
}

interface ResetRequest {
  token: string;
  userId: string;
  expiresAt: string;
}

export interface AuthProvider {
  signUp(email: string, password: string): Promise<User>;
  signIn(email: string, password: string): Promise<User>;
  requestPasswordReset(email: string): Promise<string>;
  resetPassword(token: string, newPassword: string): Promise<void>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}

const USERS_KEY = 'hourforge_auth_users';
const SESSION_KEY = 'hourforge_auth_session';
const RESET_REQUESTS_KEY = 'hourforge_auth_reset_requests';

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? '') as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

// Prototype only: this deterministic hash is not secure. Production auth must hash passwords
// server-side with a password-hashing algorithm such as bcrypt or Argon2.
function hashPassword(password: string) {
  let hash = 5381;
  for (let index = 0; index < password.length; index += 1) hash = (hash * 33) ^ password.charCodeAt(index);
  return (hash >>> 0).toString(16);
}

function createToken() {
  return `${crypto.randomUUID()}-${Date.now().toString(36)}`;
}

class LocalAuthService implements AuthProvider {
  async signUp(email: string, password: string) {
    const normalizedEmail = normalizeEmail(email);
    const users = readStorage<StoredUser[]>(USERS_KEY, []);
    if (users.some((user) => user.email === normalizedEmail)) throw new Error('An account already exists for this email.');

    const user: StoredUser = { id: crypto.randomUUID(), email: normalizedEmail, createdAt: new Date().toISOString(), passwordHash: hashPassword(password) };
    writeStorage(USERS_KEY, [...users, user]);
    this.createSession(user.id);
    return this.toUser(user);
  }

  async signIn(email: string, password: string) {
    const user = readStorage<StoredUser[]>(USERS_KEY, []).find((item) => item.email === normalizeEmail(email));
    if (!user || user.passwordHash !== hashPassword(password)) throw new Error('Incorrect email or password.');
    this.createSession(user.id);
    return this.toUser(user);
  }

  async requestPasswordReset(email: string) {
    const user = readStorage<StoredUser[]>(USERS_KEY, []).find((item) => item.email === normalizeEmail(email));
    if (!user) throw new Error('No account was found for this email.');
    const request: ResetRequest = { token: createToken(), userId: user.id, expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString() };
    const requests = readStorage<ResetRequest[]>(RESET_REQUESTS_KEY, []).filter((item) => new Date(item.expiresAt) > new Date());
    writeStorage(RESET_REQUESTS_KEY, [...requests, request]);
    return request.token;
  }

  async resetPassword(token: string, newPassword: string) {
    const requests = readStorage<ResetRequest[]>(RESET_REQUESTS_KEY, []);
    const request = requests.find((item) => item.token === token && new Date(item.expiresAt) > new Date());
    if (!request) throw new Error('This reset link is invalid or has expired.');
    const users = readStorage<StoredUser[]>(USERS_KEY, []);
    const userIndex = users.findIndex((user) => user.id === request.userId);
    if (userIndex < 0) throw new Error('This account no longer exists.');
    users[userIndex] = { ...users[userIndex], passwordHash: hashPassword(newPassword) };
    writeStorage(USERS_KEY, users);
    writeStorage(RESET_REQUESTS_KEY, requests.filter((item) => item.token !== token));
  }

  async signOut() {
    if (typeof window !== 'undefined') window.localStorage.removeItem(SESSION_KEY);
  }

  async getCurrentUser() {
    const session = readStorage<AuthSession | null>(SESSION_KEY, null);
    if (!session) return null;
    const user = readStorage<StoredUser[]>(USERS_KEY, []).find((item) => item.id === session.userId);
    return user ? this.toUser(user) : null;
  }

  private createSession(userId: string) {
    const session: AuthSession = { userId, token: createToken(), createdAt: new Date().toISOString() };
    writeStorage(SESSION_KEY, session);
  }

  private toUser({ passwordHash: _passwordHash, ...user }: StoredUser): User {
    return user;
  }
}

export const authService: AuthProvider = new LocalAuthService();
