import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../LoginForm';
import { authService } from '../../../services/auth/authService';

// Mock authService
jest.mock('../../../services/auth/authService');
const mockedAuthService = authService as jest.Mocked<typeof authService>;

describe('LoginForm', () => {
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();
  const mockOnForgotPassword = jest.fn();
  const mockOnRegister = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait rendre le formulaire de connexion', () => {
    render(
      <LoginForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onForgotPassword={mockOnForgotPassword}
        onRegister={mockOnRegister}
      />
    );

    expect(screen.getByText('Connexion')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('votre@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByText('Se connecter')).toBeInTheDocument();
  });

  it('devrait appeler onSuccess après une connexion réussie', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'admin' as const,
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
    };

    mockedAuthService.login.mockResolvedValueOnce({
      token: 'fake-token',
      user: mockUser,
    });

    render(
      <LoginForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onForgotPassword={mockOnForgotPassword}
        onRegister={mockOnRegister}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('votre@email.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText('Se connecter'));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('devrait appeler onError en cas d\'échec de connexion', async () => {
    mockedAuthService.login.mockRejectedValueOnce(new Error('Erreur de connexion'));

    render(
      <LoginForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onForgotPassword={mockOnForgotPassword}
        onRegister={mockOnRegister}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('votre@email.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText('Se connecter'));

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith('Email ou mot de passe incorrect');
    });
  });

  it('devrait appeler onForgotPassword lors du clic sur le lien', () => {
    render(
      <LoginForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onForgotPassword={mockOnForgotPassword}
        onRegister={mockOnRegister}
      />
    );

    fireEvent.click(screen.getByText('Mot de passe oublié ?'));
    expect(mockOnForgotPassword).toHaveBeenCalled();
  });

  it('devrait appeler onRegister lors du clic sur le lien d\'inscription', () => {
    render(
      <LoginForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onForgotPassword={mockOnForgotPassword}
        onRegister={mockOnRegister}
      />
    );

    fireEvent.click(screen.getByText('S\'inscrire'));
    expect(mockOnRegister).toHaveBeenCalled();
  });

  it('devrait gérer la vérification 2FA', async () => {
    mockedAuthService.login.mockResolvedValueOnce({
      token: 'fake-token',
      user: {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin' as const,
        isVerified: true,
        twoFactorEnabled: true,
        securityPreferences: {
          twoFactorEnabled: true,
          requireTwoFactorForLogin: true,
          requireTwoFactorForPayments: false,
          notifyOnNewLogin: true,
          notifyOnPasswordChange: true,
          notifyOnEmailChange: true,
          sessionTimeout: 30,
        },
        socialAccounts: [],
        emailVerified: true,
      }
    });

    render(
      <LoginForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onForgotPassword={mockOnForgotPassword}
        onRegister={mockOnRegister}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('votre@email.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText('Se connecter'));

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith('Veuillez entrer le code de vérification 2FA');
    });
  });
}); 