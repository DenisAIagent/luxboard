import { authService } from '../authService';
import axios from 'axios';
import { SecurityPreferences } from '../types';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  describe('login', () => {
    it('devrait se connecter avec succès', async () => {
      const mockResponse = {
        data: {
          token: 'fake-token',
          user: {
            id: '1',
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
          },
        },
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await authService.login('test@example.com', 'password');

      expect(result.token).toBe('fake-token');
      expect(result.user.email).toBe('test@example.com');
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
    });

    it('devrait gérer les erreurs de connexion', async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error('Erreur de connexion'));

      await expect(authService.login('test@example.com', 'password'))
        .rejects
        .toThrow('Erreur lors de la connexion');
    });
  });

  describe('register', () => {
    it('devrait inscrire un nouvel utilisateur avec succès', async () => {
      const mockResponse = {
        data: {
          token: 'fake-token',
          user: {
            id: '1',
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
          },
        },
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await authService.register({
        email: 'test@example.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
      });

      expect(result.token).toBe('fake-token');
      expect(result.user.email).toBe('test@example.com');
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
    });
  });

  describe('2FA', () => {
    it('devrait configurer le 2FA avec succès', async () => {
      const mockResponse = {
        data: {
          secret: 'fake-secret',
          qrCode: 'fake-qr-code',
        },
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await authService.setupTwoFactor();

      expect(result.secret).toBe('fake-secret');
      expect(result.qrCode).toBe('fake-qr-code');
    });

    it('devrait vérifier le code 2FA avec succès', async () => {
      const mockResponse = { data: true };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await authService.verifyTwoFactor('123456');
      expect(result).toBe(true);
    });
  });

  describe('securityPreferences', () => {
    it('devrait mettre à jour les préférences de sécurité avec succès', async () => {
      const mockResponse = { data: { success: true } };
      mockedAxios.put.mockResolvedValueOnce(mockResponse);

      const preferences: SecurityPreferences = {
        twoFactorEnabled: true,
        requireTwoFactorForLogin: true,
        notifyOnNewLogin: true,
        requireTwoFactorForPayments: false,
        notifyOnPasswordChange: true,
        notifyOnEmailChange: true,
        sessionTimeout: 30
      };

      await authService.updateSecurityPreferences(preferences);
      expect(mockedAxios.put).toHaveBeenCalledWith('/api/auth/preferences', preferences);
    });
  });

  describe('sessions', () => {
    it('devrait récupérer les sessions avec succès', async () => {
      const mockResponse = {
        data: [
          {
            id: '1',
            device: 'Chrome on Windows',
            lastActive: '2024-03-20T10:00:00Z',
            current: true,
          },
        ],
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const sessions = await authService.getSessions();

      expect(sessions).toHaveLength(1);
      expect(sessions[0].device).toBe('Chrome on Windows');
    });

    it('devrait révoquer une session avec succès', async () => {
      mockedAxios.delete.mockResolvedValueOnce({});

      await authService.revokeSession('1');

      expect(mockedAxios.delete).toHaveBeenCalledWith(
        expect.stringContaining('/auth/sessions/1'),
        expect.any(Object)
      );
    });
  });
}); 