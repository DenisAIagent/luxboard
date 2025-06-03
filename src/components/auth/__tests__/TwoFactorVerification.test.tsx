import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TwoFactorVerification } from '../TwoFactorVerification';
import { authService } from '../../../services/auth/authService';

// Mock authService
jest.mock('../../../services/auth/authService');
const mockedAuthService = authService as jest.Mocked<typeof authService>;

describe('TwoFactorVerification', () => {
  const mockOnSuccess = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait rendre le formulaire de vérification 2FA', () => {
    render(
      <TwoFactorVerification
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByText('Vérification en deux étapes')).toBeInTheDocument();
    expect(screen.getByText('Entrez le code à 6 chiffres')).toBeInTheDocument();
    expect(screen.getByText('Vérifier')).toBeInTheDocument();
    expect(screen.getByText('Annuler')).toBeInTheDocument();
  });

  it('devrait appeler onSuccess après une vérification réussie', async () => {
    mockedAuthService.verifyTwoFactor.mockResolvedValueOnce(true);

    render(
      <TwoFactorVerification
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />
    );

    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: (index + 1).toString() } });
    });

    fireEvent.click(screen.getByText('Vérifier'));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('devrait appeler onCancel lors du clic sur le bouton Annuler', () => {
    render(
      <TwoFactorVerification
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByText('Annuler'));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('devrait gérer les erreurs de vérification', async () => {
    mockedAuthService.verifyTwoFactor.mockRejectedValueOnce(new Error('Code invalide'));

    render(
      <TwoFactorVerification
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />
    );

    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: (index + 1).toString() } });
    });

    fireEvent.click(screen.getByText('Vérifier'));

    await waitFor(() => {
      expect(screen.getByText('Code de vérification invalide')).toBeInTheDocument();
    });
  });

  it('devrait gérer le collage de code', async () => {
    render(
      <TwoFactorVerification
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />
    );

    const firstInput = screen.getAllByRole('textbox')[0];
    fireEvent.paste(firstInput, { clipboardData: { getData: () => '123456' } });

    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input, index) => {
      expect(input).toHaveValue((index + 1).toString());
    });
  });

  it('devrait gérer la navigation au clavier', () => {
    render(
      <TwoFactorVerification
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />
    );

    const inputs = screen.getAllByRole('textbox');
    
    // Test de la navigation vers la droite
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.keyDown(inputs[0], { key: '1' });
    expect(document.activeElement).toBe(inputs[1]);

    // Test de la navigation vers la gauche
    fireEvent.keyDown(inputs[1], { key: 'Backspace' });
    expect(document.activeElement).toBe(inputs[0]);
  });
}); 