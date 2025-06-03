import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PasswordResetForm } from '../PasswordResetForm';
import { authService } from '../../../services/auth/authService';

// Mock authService
jest.mock('../../../services/auth/authService');
const mockedAuthService = authService as jest.Mocked<typeof authService>;

describe('PasswordResetForm', () => {
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait rendre le formulaire de réinitialisation de mot de passe', () => {
    render(
      <PasswordResetForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onBack={mockOnBack}
      />
    );

    expect(screen.getByText('Réinitialisation du mot de passe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('votre@email.com')).toBeInTheDocument();
    expect(screen.getByText('Envoyer le lien')).toBeInTheDocument();
    expect(screen.getByText('Retour à la connexion')).toBeInTheDocument();
  });

  it('devrait appeler onSuccess après l\'envoi réussi du lien', async () => {
    mockedAuthService.requestPasswordReset.mockResolvedValueOnce();

    render(
      <PasswordResetForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onBack={mockOnBack}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('votre@email.com'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByText('Envoyer le lien'));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('devrait appeler onError en cas d\'échec de l\'envoi du lien', async () => {
    mockedAuthService.requestPasswordReset.mockRejectedValueOnce(
      new Error('Erreur d\'envoi')
    );

    render(
      <PasswordResetForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onBack={mockOnBack}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('votre@email.com'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByText('Envoyer le lien'));

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith('Erreur lors de l\'envoi du lien de réinitialisation');
    });
  });

  it('devrait appeler onBack lors du clic sur le bouton de retour', () => {
    render(
      <PasswordResetForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onBack={mockOnBack}
      />
    );

    fireEvent.click(screen.getByText('Retour à la connexion'));
    expect(mockOnBack).toHaveBeenCalled();
  });

  it('devrait valider le format de l\'email', async () => {
    render(
      <PasswordResetForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onBack={mockOnBack}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('votre@email.com'), {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByText('Envoyer le lien'));

    await waitFor(() => {
      expect(screen.getByText('Format d\'email invalide')).toBeInTheDocument();
    });
  });

  it('devrait afficher l\'état de chargement pendant l\'envoi', async () => {
    mockedAuthService.requestPasswordReset.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );

    render(
      <PasswordResetForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onBack={mockOnBack}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('votre@email.com'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByText('Envoyer le lien'));

    expect(screen.getByText('Envoi en cours...')).toBeInTheDocument();
    expect(screen.getByText('Envoyer le lien')).toBeDisabled();
  });

  it('devrait afficher le message de succès après l\'envoi', async () => {
    mockedAuthService.requestPasswordReset.mockResolvedValueOnce();

    render(
      <PasswordResetForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        onBack={mockOnBack}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('votre@email.com'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByText('Envoyer le lien'));

    await waitFor(() => {
      expect(screen.getByText('Lien de réinitialisation envoyé')).toBeInTheDocument();
      expect(screen.getByText(/Un email a été envoyé à test@example.com/)).toBeInTheDocument();
    });
  });
}); 