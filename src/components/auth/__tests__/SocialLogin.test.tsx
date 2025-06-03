import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SocialLogin } from '../SocialLogin';
import { authService } from '../../../services/auth/authService';

// Mock authService
jest.mock('../../../services/auth/authService');
const mockedAuthService = authService as jest.Mocked<typeof authService>;

describe('SocialLogin', () => {
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait rendre les boutons de connexion sociale', () => {
    render(
      <SocialLogin
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    expect(screen.getByText('Continuer avec Google')).toBeInTheDocument();
    expect(screen.getByText('Continuer avec GitHub')).toBeInTheDocument();
    expect(screen.getByText('Continuer avec Facebook')).toBeInTheDocument();
  });

  it('devrait appeler onSuccess après une connexion Google réussie', async () => {
    mockedAuthService.loginWithGoogle.mockResolvedValueOnce({
      token: 'fake-token',
      user: {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'editor',
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
        socialAccounts: [{
          provider: 'google',
          id: 'google-123',
          email: 'test@example.com'
        }],
        emailVerified: true,
      },
    });

    render(
      <SocialLogin
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    fireEvent.click(screen.getByText('Continuer avec Google'));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('devrait appeler onSuccess après une connexion GitHub réussie', async () => {
    mockedAuthService.loginWithGithub.mockResolvedValueOnce({
      token: 'fake-token',
      user: {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'editor',
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
        socialAccounts: [{
          provider: 'github',
          id: 'github-123',
          email: 'test@example.com'
        }],
        emailVerified: true,
      },
    });

    render(
      <SocialLogin
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    fireEvent.click(screen.getByText('Continuer avec GitHub'));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('devrait appeler onSuccess après une connexion Facebook réussie', async () => {
    mockedAuthService.loginWithFacebook.mockResolvedValueOnce({
      token: 'fake-token',
      user: {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'editor',
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
        socialAccounts: [{
          provider: 'facebook',
          id: 'facebook-123',
          email: 'test@example.com'
        }],
        emailVerified: true,
      },
    });

    render(
      <SocialLogin
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    fireEvent.click(screen.getByText('Continuer avec Facebook'));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('devrait appeler onError en cas d\'échec de connexion sociale', async () => {
    mockedAuthService.loginWithGoogle.mockRejectedValueOnce(new Error('Erreur de connexion'));

    render(
      <SocialLogin
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    fireEvent.click(screen.getByText('Continuer avec Google'));

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith('Erreur lors de la connexion avec Google');
    });
  });

  it('devrait afficher l\'état de chargement pendant la connexion', async () => {
    mockedAuthService.loginWithGoogle.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );

    render(
      <SocialLogin
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    fireEvent.click(screen.getByText('Continuer avec Google'));

    expect(screen.getByText('Connexion en cours...')).toBeInTheDocument();
    expect(screen.getByText('Continuer avec Google')).toBeDisabled();
  });
}); 