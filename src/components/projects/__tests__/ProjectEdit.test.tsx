import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProjectEdit } from '../ProjectEdit';
import { projectService } from '../../../services/projects/projectService';

// Mock projectService
jest.mock('../../../services/projects/projectService');
const mockedProjectService = projectService as jest.Mocked<typeof projectService>;

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('ProjectEdit', () => {
  const mockProject = {
    id: '1',
    name: 'Projet Test',
    description: 'Description du projet test',
    status: 'active' as const,
    startDate: new Date(),
    progress: 75,
    owner: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe'
    },
    team: [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin' as const
      }
    ],
    tasks: {
      total: 10,
      completed: 7
    },
    tags: ['test', 'react'],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedProjectService.getProject.mockResolvedValue(mockProject);
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/projects/1/edit']}>
        <Routes>
          <Route path="/projects/:id/edit" element={<ProjectEdit />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('devrait afficher le formulaire d\'édition', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Modifier le projet')).toBeInTheDocument();
      expect(screen.getByLabelText('Nom du projet')).toBeInTheDocument();
      expect(screen.getByLabelText('Description')).toBeInTheDocument();
      expect(screen.getByLabelText('Statut')).toBeInTheDocument();
    });
  });

  it('devrait afficher un état de chargement', () => {
    renderComponent();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('devrait gérer les erreurs de chargement', async () => {
    mockedProjectService.getProject.mockRejectedValue(new Error('Projet non trouvé'));
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Projet non trouvé')).toBeInTheDocument();
    });
  });

  it('devrait naviguer vers les détails du projet après annulation', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Annuler')).toBeInTheDocument();
    });

    screen.getByText('Annuler').click();
    expect(mockNavigate).toHaveBeenCalledWith('/projects/1');
  });

  it('devrait naviguer vers les détails du projet après succès', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Mettre à jour')).toBeInTheDocument();
    });

    // Simuler la soumission du formulaire
    const form = screen.getByRole('form');
    form.dispatchEvent(new Event('submit'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/projects/1');
    });
  });

  it('devrait naviguer vers la liste des projets en cas d\'erreur', async () => {
    mockedProjectService.getProject.mockRejectedValue(new Error('Projet non trouvé'));
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Retour aux projets')).toBeInTheDocument();
    });

    screen.getByText('Retour aux projets').click();
    expect(mockNavigate).toHaveBeenCalledWith('/projects');
  });

  it('devrait naviguer vers les détails du projet via le bouton retour', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Retour au projet')).toBeInTheDocument();
    });

    screen.getByText('Retour au projet').click();
    expect(mockNavigate).toHaveBeenCalledWith('/projects/1');
  });
}); 