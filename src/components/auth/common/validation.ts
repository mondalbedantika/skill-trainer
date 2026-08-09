export function validateEmail(email: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? '' : 'Enter a valid email address.'; }
export function validatePassword(password: string) { if (password.length < 8) return 'Use at least 8 characters.'; if (!/\d/.test(password)) return 'Include at least one number.'; return ''; }
