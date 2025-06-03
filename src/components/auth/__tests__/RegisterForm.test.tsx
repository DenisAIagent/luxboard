import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegisterForm } from '../RegisterForm';
import { authService } from '../../../services/auth/authService';

// Mock authService
jest.mock('../../../services/auth/authService');
const mockedAuthService = authService as jest.Mocked<typeof authService>;

describe('RegisterForm', () => {
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait rendre le formulaire d\'inscription', () => {
    render(
      <RegisterForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onLogin={mockOnLogin}
      />
    );

    expect(screen.getByText('Inscription')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Prénom')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nom')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('votre@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByText('S\'inscrire')).toBeInTheDocument();
  });

  it('devrait appeler onSuccess après une inscription réussie', async () => {
    mockedAuthService.register.mockResolvedValueOnce({
      token: 'fake-token',
      user: {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
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
          sessionTimeout: 30,
        },
        socialAccounts: [],
        emailVerified: false,
      },
    });

    render(
      <RegisterForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onLogin={mockOnLogin}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Prénom'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Nom'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('votre@email.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Confirmer le mot de passe'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText('S\'inscrire'));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('devrait appeler onError si les mots de passe ne correspondent pas', async () => {
    render(
      <RegisterForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onLogin={mockOnLogin}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Prénom'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Nom'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('votre@email.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Confirmer le mot de passe'), {
      target: { value: 'different-password' },
    });

    fireEvent.click(screen.getByText('S\'inscrire'));

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith('Les mots de passe ne correspondent pas');
    });
  });

  it('devrait appeler onError en cas d\'échec d\'inscription', async () => {
    mockedAuthService.register.mockRejectedValueOnce(new Error('Erreur d\'inscription'));

    render(
      <RegisterForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onLogin={mockOnLogin}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Prénom'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Nom'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('votre@email.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Confirmer le mot de passe'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText('S\'inscrire'));

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith('Erreur lors de l\'inscription');
    });
  });

  it('devrait appeler onLogin lors du clic sur le lien de connexion', () => {
    render(
      <RegisterForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onLogin={mockOnLogin}
      />
    );

    fireEvent.click(screen.getByText('Se connecter'));
    expect(mockOnLogin).toHaveBeenCalled();
  });

  it('devrait valider les champs requis', async () => {
    render(
      <RegisterForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onLogin={mockOnLogin}
      />
    );

    fireEvent.click(screen.getByText('S\'inscrire'));

    await waitFor(() => {
      expect(screen.getByText('Le prénom est requis')).toBeInTheDocument();
      expect(screen.getByText('Le nom est requis')).toBeInTheDocument();
      expect(screen.getByText('L\'email est requis')).toBeInTheDocument();
      expect(screen.getByText('Le mot de passe est requis')).toBeInTheDocument();
    });
  });
}); 