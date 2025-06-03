export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'editor' | 'concierge';
  isVerified: boolean;
  twoFactorEnabled: boolean;
  securityPreferences: SecurityPreferences;
  socialAccounts: SocialAccount[];
  emailVerified: boolean;
};

export interface AuthResponse {
  token: string;
  user: User;
}

export interface SecurityPreferences {
  twoFactorEnabled: boolean;
  requireTwoFactorForLogin: boolean;
  requireTwoFactorForPayments: boolean;
  notifyOnNewLogin: boolean;
  notifyOnPasswordChange: boolean;
  notifyOnEmailChange: boolean;
  sessionTimeout: number;
}

export interface SocialAccount {
  provider: SocialProvider;
  id: string;
  email: string;
}

export type SocialProvider = 'google' | 'facebook' | 'github' | 'email';

export interface Session {
  id: string;
  device: string;
  lastActive: Date;
  current: boolean;
} 