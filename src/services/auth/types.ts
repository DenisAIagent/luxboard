export interface SecurityPreferences {
  twoFactorEnabled: boolean;
  requireTwoFactorForLogin: boolean;
  notifyOnNewLogin: boolean;
  requireTwoFactorForPayments: boolean;
  notifyOnPasswordChange: boolean;
  notifyOnEmailChange: boolean;
  sessionTimeout: number;
}

export type SocialProvider = 'google' | 'facebook' | 'github' | 'email';

export interface SocialAccount {
  provider: SocialProvider;
  providerId: string;
  email: string;
  displayName: string;
  photoUrl?: string;
} 