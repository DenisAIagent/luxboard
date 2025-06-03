import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProjectList } from '../ProjectList';
import { projectService } from '../../../services/projects/projectService';

// Mock projectService
jest.mock('../../../services/projects/projectService');
const mockedProjectService = projectService as jest.Mocked<typeof projectService>;

describe('ProjectList', () => {
  const mockProjects = [
    {
      id: '1',
      name: 'Test Project 1',
      description: 'Test Description 1',
      status: 'active' as const,
      startDate: new Date(),
      progress: 50,
      owner: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe'
      },
      team: [
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          role: 'admin' as const
        },
        {
          id: '3',
          firstName: 'Bob',
          lastName: 'Johnson',
          role: 'concierge' as const
        }
      ],
      tasks: {
        total: 10,
        completed: 5
      },
      tags: ['test', 'project'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Projet B',
      description: 'Description du projet B',
      status: 'completed' as const,
      startDate: new Date(),
      progress: 100,
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
        total: 5,
        completed: 5
      },
      tags: ['mobile'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockedProjectService.getProjects.mockResolvedValue(mockProjects);
  });

  it('devrait afficher le titre et le bouton de création', async () => {
    render(<ProjectList />);
    
    expect(screen.getByText('Projets')).toBeInTheDocument();
    expect(screen.getByText('Nouveau projet')).toBeInTheDocument();
  });

  it('devrait afficher la liste des projets', async () => {
    render(<ProjectList />);

    await waitFor(() => {
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
      expect(screen.getByText('Projet B')).toBeInTheDocument();
    });
  });

  it('devrait filtrer les projets par recherche', async () => {
    render(<ProjectList />);

    await waitFor(() => {
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Rechercher un projet...');
    fireEvent.change(searchInput, { target: { value: 'Test Project 1' } });

    expect(screen.getByText('Test Project 1')).toBeInTheDocument();
    expect(screen.queryByText('Projet B')).not.toBeInTheDocument();
  });

  it('devrait filtrer les projets par statut', async () => {
    render(<ProjectList />);

    await waitFor(() => {
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
    });

    const statusSelect = screen.getByRole('combobox');
    fireEvent.change(statusSelect, { target: { value: 'completed' } });

    expect(screen.queryByText('Test Project 1')).not.toBeInTheDocument();
    expect(screen.getByText('Projet B')).toBeInTheDocument();
  });

  it('devrait afficher les détails des projets', async () => {
    render(<ProjectList />);

    await waitFor(() => {
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
      expect(screen.getByText('Test Description 1')).toBeInTheDocument();
      expect(screen.getByText('50%')).toBeInTheDocument();
      expect(screen.getByText('5 / 10 tâches terminées')).toBeInTheDocument();
      expect(screen.getByText('test')).toBeInTheDocument();
      expect(screen.getByText('project')).toBeInTheDocument();
    });
  });

  it('devrait afficher un message quand aucun projet n\'est trouvé', async () => {
    mockedProjectService.getProjects.mockResolvedValue([]);
    render(<ProjectList />);

    await waitFor(() => {
      expect(screen.getByText('Aucun projet trouvé')).toBeInTheDocument();
    });
  });

  it('devrait gérer les erreurs de chargement', async () => {
    mockedProjectService.getProjects.mockRejectedValue(new Error('Erreur de chargement'));
    
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    render(<ProjectList />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });
}); 