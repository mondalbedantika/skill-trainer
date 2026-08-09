import { beforeEach, describe, expect, it } from 'vitest';
import { authService } from './authService';

describe('authService', () => {
  beforeEach(() => localStorage.clear());

  it('creates a session without storing a plaintext password', async () => {
    const user = await authService.signUp('learner@example.com', 'password1');
    expect(user.email).toBe('learner@example.com');
    expect(await authService.getCurrentUser()).toEqual(user);
    expect(localStorage.getItem('hourforge_auth_users')).not.toContain('password1');
  });

  it('rejects invalid credentials and clears sessions on sign out', async () => {
    await authService.signUp('learner@example.com', 'password1');
    await expect(authService.signIn('learner@example.com', 'wrong-password')).rejects.toThrow('Incorrect email or password');
    await authService.signOut();
    expect(await authService.getCurrentUser()).toBeNull();
  });

  it('resets a password with a temporary token', async () => {
    await authService.signUp('learner@example.com', 'password1');
    const token = await authService.requestPasswordReset('learner@example.com');
    await authService.resetPassword(token, 'newpassword2');
    await expect(authService.signIn('learner@example.com', 'password1')).rejects.toThrow();
    await expect(authService.signIn('learner@example.com', 'newpassword2')).resolves.toMatchObject({ email: 'learner@example.com' });
  });
});
