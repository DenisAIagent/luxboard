import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProjectForm } from '../ProjectForm';
import { projectService } from '../../../services/projects/projectService';

// Mock projectService
jest.mock('../../../services/projects/projectService');
const mockedProjectService = projectService as jest.Mocked<typeof projectService>;

describe('ProjectForm', () => {
  const mockProject = {
    id: '1',
    name: 'Projet Test',
    description: 'Description du projet test',
    status: 'active' as const,
    startDate: new Date(),
    progress: 0,
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
      total: 0,
      completed: 0
    },
    tags: ['test', 'react'],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockOnSuccess = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait afficher le formulaire de création', () => {
    render(<ProjectForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    expect(screen.getByLabelText('Nom du projet')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Statut')).toBeInTheDocument();
    expect(screen.getByText('Tags')).toBeInTheDocument();
    expect(screen.getByText('Créer')).toBeInTheDocument();
  });

  it('devrait charger les données du projet en mode édition', async () => {
    mockedProjectService.getProject.mockResolvedValue(mockProject);

    render(
      <ProjectForm
        projectId="1"
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Nom du projet')).toHaveValue('Projet Test');
      expect(screen.getByLabelText('Description')).toHaveValue('Description du projet test');
      expect(screen.getByLabelText('Statut')).toHaveValue('active');
    });

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
  });

  it('devrait créer un nouveau projet', async () => {
    mockedProjectService.createProject.mockResolvedValue(mockProject);

    render(<ProjectForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    fireEvent.change(screen.getByLabelText('Nom du projet'), {
      target: { value: 'Nouveau Projet' }
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Description du nouveau projet' }
    });

    fireEvent.click(screen.getByText('Créer'));

    await waitFor(() => {
      expect(mockedProjectService.createProject).toHaveBeenCalledWith({
        name: 'Nouveau Projet',
        description: 'Description du nouveau projet',
        status: 'active',
        tags: [],
        startDate: expect.any(Date)
      });
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('devrait mettre à jour un projet existant', async () => {
    mockedProjectService.getProject.mockResolvedValue(mockProject);
    mockedProjectService.updateProject.mockResolvedValue({
      ...mockProject,
      name: 'Projet Modifié'
    });

    render(
      <ProjectForm
        projectId="1"
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Nom du projet')).toHaveValue('Projet Test');
    });

    fireEvent.change(screen.getByLabelText('Nom du projet'), {
      target: { value: 'Projet Modifié' }
    });

    fireEvent.click(screen.getByText('Mettre à jour'));

    await waitFor(() => {
      expect(mockedProjectService.updateProject).toHaveBeenCalledWith('1', {
        name: 'Projet Modifié',
        description: 'Description du projet test',
        status: 'active',
        tags: ['test', 'react']
      });
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('devrait gérer les erreurs de validation', async () => {
    render(<ProjectForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    fireEvent.click(screen.getByText('Créer'));

    expect(screen.getByText('Le nom du projet est requis')).toBeInTheDocument();
    expect(mockedProjectService.createProject).not.toHaveBeenCalled();
  });

  it('devrait gérer les erreurs de chargement', async () => {
    mockedProjectService.getProject.mockRejectedValue(new Error('Erreur de chargement'));

    render(
      <ProjectForm
        projectId="1"
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Erreur lors du chargement du projet')).toBeInTheDocument();
    });
  });

  it('devrait gérer les tags', async () => {
    render(<ProjectForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const tagInput = screen.getByPlaceholderText('Ajouter un tag');
    fireEvent.change(tagInput, { target: { value: 'nouveau-tag' } });
    fireEvent.click(screen.getByRole('button', { name: '' })); // Bouton Plus

    expect(screen.getByText('nouveau-tag')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '' })); // Bouton X du tag
    expect(screen.queryByText('nouveau-tag')).not.toBeInTheDocument();
  });

  it('devrait appeler onCancel lors de l\'annulation', () => {
    render(<ProjectForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    fireEvent.click(screen.getByText('Annuler'));
    expect(mockOnCancel).toHaveBeenCalled();
  });
}); 