import type { SecurityPreferences, SocialProvider, SocialAccount } from '../../types/auth';

export interface AuthResponse {
  token: string;
  user: User;
  requiresTwoFactor?: boolean;
}

export interface Session {
  id: string;
  device: string;
  lastActive: Date;
  current: boolean;
}

export interface User {
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
}

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private user: User | null = null;

  private constructor() {
    this.token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public getToken(): string | null {
    return localStorage.getItem('authToken') || localStorage.getItem('token');
  }

  public getUser(): User | null {
    return this.user;
  }

  public async getCurrentUser(): Promise<User | null> {
    return this.user;
  }

  public async login(email: string, password: string): Promise<AuthResponse> {
    // TODO: Implement actual login
    const response: AuthResponse = {
      token: 'fake-token',
      user: {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin',
        isVerified: true,
        twoFactorEnabled: false,
        securityPreferences: {
          twoFactorEnabled: false,
          requireTwoFactorForLogin: false,
          requireTwoFactorForPayments: false,
          notifyOnNewLogin: true,
          notifyOnPasswordChange: true,
          notifyOnEmailChange: true,
          sessionTimeout: 30
        },
        socialAccounts: [],
        emailVerified: true
      }
    };

    this.token = response.token;
    this.user = response.user;
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    return response;
  }

  public async register(userData: { email: string; password: string; firstName: string; lastName: string }): Promise<AuthResponse> {
    const { email, password, firstName, lastName } = userData;
    // TODO: Implement actual registration
    const response: AuthResponse = {
      token: 'fake-token',
      user: {
        id: '1',
        email,
        firstName,
        lastName,
        role: 'concierge',
        isVerified: false,
        twoFactorEnabled: false,
        securityPreferences: {
          twoFactorEnabled: false,
          requireTwoFactorForLogin: false,
          requireTwoFactorForPayments: false,
          notifyOnNewLogin: true,
          notifyOnPasswordChange: true,
          notifyOnEmailChange: true,
          sessionTimeout: 30
        },
        socialAccounts: [],
        emailVerified: false
      }
    };

    this.token = response.token;
    this.user = response.user;
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    return response;
  }

  public async logout(): Promise<void> {
    this.token = null;
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  public async setupTwoFactor(userId?: string): Promise<{ secret: string; qrCode: string }> {
    // TODO: Implement actual 2FA setup
    return {
      secret: 'TEMP_SECRET',
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    };
  }

  public async verifyTwoFactor(userId?: string, token?: string): Promise<boolean> {
    // TODO: Implement actual 2FA verification
    return true;
  }

  public async updateSecurityPreferences(preferences: SecurityPreferences): Promise<void> {
    if (!this.user) {
      throw new Error('User not logged in');
    }

    this.user.securityPreferences = preferences;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  public async getSessions(userId?: string): Promise<Session[]> {
    // TODO: Implement session retrieval
    return [];
  }

  public async revokeSession(sessionId: string): Promise<void> {
    console.log('Session would be revoked here');
  }

  public async revokeAllSessions(): Promise<void> {
    // TODO: Implement all sessions revocation
  }

  public async requestPasswordReset(email: string): Promise<void> {
    // TODO: Implement password reset request
  }

  public async resetPassword(token: string, newPassword: string): Promise<void> {
    // TODO: Implement password reset
  }

  public async resendVerificationEmail(): Promise<void> {
    // TODO: Implement email verification resend
  }

  public async loginWithSocial(provider: SocialProvider): Promise<AuthResponse> {
    // TODO: Implement actual social login
    const response: AuthResponse = {
      token: 'fake-token',
      user: {
        id: '1',
        email: 'social@example.com',
        firstName: 'Social',
        lastName: 'User',
        role: 'concierge',
        isVerified: true,
        twoFactorEnabled: false,
        securityPreferences: {
          twoFactorEnabled: false,
          requireTwoFactorForLogin: false,
          requireTwoFactorForPayments: false,
          notifyOnNewLogin: true,
          notifyOnPasswordChange: true,
          notifyOnEmailChange: true,
          sessionTimeout: 30
        },
        socialAccounts: [{
          provider,
          id: 'social-id',
          email: 'social@example.com'
        }],
        emailVerified: true
      }
    };

    this.token = response.token;
    this.user = response.user;
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    return response;
  }

  public async loginWithGoogle(): Promise<AuthResponse> {
    return this.loginWithSocial('google');
  }

  public async loginWithFacebook(): Promise<AuthResponse> {
    return this.loginWithSocial('facebook');
  }

  public async loginWithGithub(): Promise<AuthResponse> {
    return this.loginWithSocial('github');
  }

  public async updatePreferences(preferences: SecurityPreferences): Promise<void> {
    // TODO: Implement preferences update
    console.log('Preferences would be updated here', preferences);
  }

  public async confirmTwoFactorSetup(token: string): Promise<void> {
    // TODO: Implement 2FA confirmation
    console.log('2FA would be confirmed here', token);
  }
}

export const authService = AuthService.getInstance(); 