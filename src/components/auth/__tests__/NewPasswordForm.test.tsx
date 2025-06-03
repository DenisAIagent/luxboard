import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NewPasswordForm } from '../NewPasswordForm';
import { authService } from '../../../services/auth/authService';

// Mock authService
jest.mock('../../../services/auth/authService');
const mockedAuthService = authService as jest.Mocked<typeof authService>;

describe('NewPasswordForm', () => {
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();
  const mockToken = 'valid-token';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait rendre le formulaire de nouveau mot de passe', () => {
    render(
      <NewPasswordForm
        token={mockToken}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    expect(screen.getByText('Nouveau mot de passe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nouveau mot de passe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirmer le mot de passe')).toBeInTheDocument();
    expect(screen.getByText('Réinitialiser')).toBeInTheDocument();
  });

  it('devrait appeler onSuccess après la réinitialisation réussie', async () => {
    mockedAuthService.resetPassword.mockResolvedValueOnce();

    render(
      <NewPasswordForm
        token={mockToken}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Nouveau mot de passe'), {
      target: { value: 'newPassword123' },
    });

    fireEvent.change(screen.getByPlaceholderText('Confirmer le mot de passe'), {
      target: { value: 'newPassword123' },
    });

    fireEvent.click(screen.getByText('Réinitialiser'));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('devrait appeler onError si les mots de passe ne correspondent pas', async () => {
    render(
      <NewPasswordForm
        token={mockToken}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Nouveau mot de passe'), {
      target: { value: 'newPassword123' },
    });

    fireEvent.change(screen.getByPlaceholderText('Confirmer le mot de passe'), {
      target: { value: 'differentPassword' },
    });

    fireEvent.click(screen.getByText('Réinitialiser'));

    await waitFor(() => {
      expect(screen.getByText('Les mots de passe ne correspondent pas')).toBeInTheDocument();
    });
  });

  it('devrait appeler onError en cas d\'échec de la réinitialisation', async () => {
    mockedAuthService.resetPassword.mockRejectedValueOnce(
      new Error('Erreur de réinitialisation')
    );

    render(
      <NewPasswordForm
        token={mockToken}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Nouveau mot de passe'), {
      target: { value: 'newPassword123' },
    });

    fireEvent.change(screen.getByPlaceholderText('Confirmer le mot de passe'), {
      target: { value: 'newPassword123' },
    });

    fireEvent.click(screen.getByText('Réinitialiser'));

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith('Erreur lors de la réinitialisation du mot de passe');
    });
  });

  it('devrait valider la force du mot de passe', async () => {
    render(
      <NewPasswordForm
        token={mockToken}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Nouveau mot de passe'), {
      target: { value: 'weak' },
    });

    fireEvent.change(screen.getByPlaceholderText('Confirmer le mot de passe'), {
      target: { value: 'weak' },
    });

    fireEvent.click(screen.getByText('Réinitialiser'));

    await waitFor(() => {
      expect(screen.getByText('Le mot de passe doit contenir au moins 8 caractères')).toBeInTheDocument();
    });
  });

  it('devrait afficher l\'état de chargement pendant la réinitialisation', async () => {
    mockedAuthService.resetPassword.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );

    render(
      <NewPasswordForm
        token={mockToken}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Nouveau mot de passe'), {
      target: { value: 'newPassword123' },
    });

    fireEvent.change(screen.getByPlaceholderText('Confirmer le mot de passe'), {
      target: { value: 'newPassword123' },
    });

    fireEvent.click(screen.getByText('Réinitialiser'));

    expect(screen.getByText('Réinitialisation en cours...')).toBeInTheDocument();
    expect(screen.getByText('Réinitialiser')).toBeDisabled();
  });

  it('devrait afficher le message de succès après la réinitialisation', async () => {
    mockedAuthService.resetPassword.mockResolvedValueOnce();

    render(
      <NewPasswordForm
        token={mockToken}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Nouveau mot de passe'), {
      target: { value: 'newPassword123' },
    });

    fireEvent.change(screen.getByPlaceholderText('Confirmer le mot de passe'), {
      target: { value: 'newPassword123' },
    });

    fireEvent.click(screen.getByText('Réinitialiser'));

    await waitFor(() => {
      expect(screen.getByText('Mot de passe réinitialisé avec succès')).toBeInTheDocument();
    });
  });
}); 