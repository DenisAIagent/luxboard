import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProjectCreate } from '../ProjectCreate';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('ProjectCreate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/projects/create']}>
        <Routes>
          <Route path="/projects/create" element={<ProjectCreate />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('devrait afficher le formulaire de création', () => {
    renderComponent();
    expect(screen.getByText('Créer un nouveau projet')).toBeInTheDocument();
    expect(screen.getByLabelText('Nom du projet')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Statut')).toBeInTheDocument();
  });

  it('devrait naviguer vers la liste des projets après annulation', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Annuler')).toBeInTheDocument();
    });

    screen.getByText('Annuler').click();
    expect(mockNavigate).toHaveBeenCalledWith('/projects');
  });

  it('devrait naviguer vers la liste des projets après succès', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Créer')).toBeInTheDocument();
    });

    // Simuler la soumission du formulaire
    const form = screen.getByRole('form');
    form.dispatchEvent(new Event('submit'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/projects');
    });
  });

  it('devrait naviguer vers la liste des projets via le bouton retour', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Retour aux projets')).toBeInTheDocument();
    });

    screen.getByText('Retour aux projets').click();
    expect(mockNavigate).toHaveBeenCalledWith('/projects');
  });
}); 