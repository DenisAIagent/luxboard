import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProjectDetails } from '../ProjectDetails';
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

describe('ProjectDetails', () => {
  const mockProject = {
    id: '1',
    name: 'Test Project',
    description: 'Test Description',
    status: 'active' as const,
    startDate: new Date(),
    endDate: new Date(),
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
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedProjectService.getProject.mockResolvedValue(mockProject);
    window.confirm = jest.fn(() => true);
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/projects/1']}>
        <Routes>
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('devrait afficher les détails du projet', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('50%')).toBeInTheDocument();
      expect(screen.getByText('5 / 10 tâches terminées')).toBeInTheDocument();
    });
  });

  it('devrait afficher les membres de l\'équipe', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
      expect(screen.getByText('admin')).toBeInTheDocument();
      expect(screen.getByText('concierge')).toBeInTheDocument();
    });
  });

  it('devrait afficher les tags', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
      expect(screen.getByText('project')).toBeInTheDocument();
    });
  });

  it('devrait afficher les dates', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Début :')).toBeInTheDocument();
      expect(screen.getByText('Fin :')).toBeInTheDocument();
    });
  });

  it('devrait naviguer vers la page d\'édition', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Modifier')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Modifier'));
    expect(mockNavigate).toHaveBeenCalledWith('/projects/1/edit');
  });

  it('devrait supprimer le projet', async () => {
    mockedProjectService.deleteProject.mockResolvedValue();
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Supprimer')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Supprimer'));

    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalled();
      expect(mockedProjectService.deleteProject).toHaveBeenCalledWith('1');
      expect(mockNavigate).toHaveBeenCalledWith('/projects');
    });
  });

  it('devrait gérer les erreurs de chargement', async () => {
    mockedProjectService.getProject.mockRejectedValue(new Error('Erreur de chargement'));
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Erreur lors du chargement du projet')).toBeInTheDocument();
    });
  });

  it('devrait gérer les erreurs de suppression', async () => {
    mockedProjectService.deleteProject.mockRejectedValue(new Error('Erreur de suppression'));
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Supprimer')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Supprimer'));

    await waitFor(() => {
      expect(screen.getByText('Erreur lors de la suppression du projet')).toBeInTheDocument();
    });
  });

  it('devrait afficher un état de chargement', () => {
    renderComponent();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('devrait naviguer vers la liste des projets', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Retour aux projets')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Retour aux projets'));
    expect(mockNavigate).toHaveBeenCalledWith('/projects');
  });
}); 