import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SecurityPreferences } from '../SecurityPreferences';
import { authService } from '../../../services/auth/authService';

// Mock authService
jest.mock('../../../services/auth/authService');
const mockedAuthService = authService as jest.Mocked<typeof authService>;

describe('SecurityPreferences', () => {
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'concierge' as const,
    isVerified: true,
    twoFactorEnabled: false,
    securityPreferences: {
      twoFactorEnabled: false,
      requireTwoFactorForLogin: false,
      requireTwoFactorForPayments: false,
      notifyOnNewLogin: true,
      notifyOnPasswordChange: true,
      notifyOnEmailChange: true,
      sessionTimeout: 30,
    },
    socialAccounts: [],
    emailVerified: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait rendre les préférences de sécurité', () => {
    render(
      <SecurityPreferences
        user={mockUser}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    expect(screen.getByText('Préférences de sécurité')).toBeInTheDocument();
    expect(screen.getByText('Authentification à deux facteurs')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Sessions actives')).toBeInTheDocument();
  });

  it('devrait mettre à jour les préférences de sécurité avec succès', async () => {
    mockedAuthService.updateSecurityPreferences.mockResolvedValueOnce();

    render(
      <SecurityPreferences
        user={mockUser}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    const notifyOnNewLoginToggle = screen.getByLabelText('Notifications de nouvelle connexion');
    fireEvent.click(notifyOnNewLoginToggle);

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('devrait gérer les erreurs de mise à jour des préférences', async () => {
    mockedAuthService.updateSecurityPreferences.mockRejectedValueOnce(
      new Error('Erreur de mise à jour')
    );

    render(
      <SecurityPreferences
        user={mockUser}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    const notifyOnNewLoginToggle = screen.getByLabelText('Notifications de nouvelle connexion');
    fireEvent.click(notifyOnNewLoginToggle);

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith('Erreur lors de la mise à jour des préférences');
    });
  });

  it('devrait afficher les sessions actives', async () => {
    const mockSessions = [
      {
        id: '1',
        device: 'Chrome',
        lastActive: new Date(),
        current: true,
      },
      {
        id: '2',
        device: 'Safari sur Mac',
        lastActive: new Date(),
        current: false,
      },
    ];

    mockedAuthService.getSessions.mockResolvedValueOnce(mockSessions);

    render(
      <SecurityPreferences
        user={mockUser}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Chrome')).toBeInTheDocument();
      expect(screen.getByText('Safari sur Mac')).toBeInTheDocument();
    });
  });

  it('devrait révoquer une session', async () => {
    const mockSessions = [
      {
        id: '1',
        device: 'Chrome',
        lastActive: new Date(),
        current: true,
      },
    ];

    mockedAuthService.getSessions.mockResolvedValueOnce(mockSessions);
    mockedAuthService.revokeSession.mockResolvedValueOnce();

    render(
      <SecurityPreferences
        user={mockUser}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Chrome')).toBeInTheDocument();
    });

    const revokeButton = screen.getByText('Révoquer');
    fireEvent.click(revokeButton);

    await waitFor(() => {
      expect(mockedAuthService.revokeSession).toHaveBeenCalledWith('1');
    });
  });

  it('devrait mettre à jour le délai d\'expiration de session', async () => {
    mockedAuthService.updateSecurityPreferences.mockResolvedValueOnce();

    render(
      <SecurityPreferences
        user={mockUser}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    const timeoutSelect = screen.getByLabelText('Délai d\'expiration de session');
    fireEvent.change(timeoutSelect, { target: { value: '60' } });

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });
}); 