import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProjectTasks } from '../ProjectTasks';
import { projectService } from '../../../services/projects/projectService';
import { useAuth } from '../../../hooks/useAuth';

// Mock projectService
jest.mock('../../../services/projects/projectService');
const mockedProjectService = projectService as jest.Mocked<typeof projectService>;

// Mock useAuth
jest.mock('../../../hooks/useAuth');
const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Mock window.confirm
const mockConfirm = jest.fn();
window.confirm = mockConfirm;

describe('ProjectTasks', () => {
  const mockTasks = [
    {
      id: '1',
      title: 'Tâche 1',
      description: 'Description de la tâche 1',
      status: 'todo' as const,
      priority: 'high' as const,
      assignee: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe'
      },
      dueDate: new Date('2024-12-31'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Tâche 2',
      description: 'Description de la tâche 2',
      status: 'completed' as const,
      priority: 'low' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockedProjectService.getProjectTasks.mockResolvedValue(mockTasks);
    mockedUseAuth.mockReturnValue({
      user: { 
        id: '1', 
        firstName: 'John', 
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'admin'
      },
      loading: false,
      error: null
    });
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/projects/1/tasks']}>
        <Routes>
          <Route path="/projects/:id/tasks" element={<ProjectTasks />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('devrait afficher la liste des tâches', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Tâche 1')).toBeInTheDocument();
      expect(screen.getByText('Tâche 2')).toBeInTheDocument();
    });
  });

  it('devrait afficher les détails des tâches', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Description de la tâche 1')).toBeInTheDocument();
      expect(screen.getByText('Description de la tâche 2')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('31/12/2024')).toBeInTheDocument();
    });
  });

  it('devrait permettre de créer une nouvelle tâche', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Nouvelle tâche')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Nouvelle tâche'));

    const titleInput = screen.getByLabelText('Titre');
    const descriptionInput = screen.getByLabelText('Description');
    const prioritySelect = screen.getByLabelText('Priorité');
    const createButton = screen.getByText('Créer');

    fireEvent.change(titleInput, { target: { value: 'Nouvelle tâche' } });
    fireEvent.change(descriptionInput, { target: { value: 'Description de la nouvelle tâche' } });
    fireEvent.change(prioritySelect, { target: { value: 'medium' } });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(mockedProjectService.createTask).toHaveBeenCalledWith('1', {
        title: 'Nouvelle tâche',
        description: 'Description de la nouvelle tâche',
        priority: 'medium'
      });
    });
  });

  it('devrait permettre de mettre à jour le statut d\'une tâche', async () => {
    renderComponent();

    await waitFor(() => {
      const statusButtons = screen.getAllByRole('button', { name: /status/i });
      fireEvent.click(statusButtons[0]);
    });

    await waitFor(() => {
      expect(mockedProjectService.updateTask).toHaveBeenCalledWith('1', '1', { status: 'completed' });
    });
  });

  it('devrait permettre de supprimer une tâche', async () => {
    mockConfirm.mockReturnValue(true);
    renderComponent();

    await waitFor(() => {
      const deleteButtons = screen.getAllByTitle('Supprimer la tâche');
      fireEvent.click(deleteButtons[0]);
    });

    await waitFor(() => {
      expect(mockedProjectService.deleteTask).toHaveBeenCalledWith('1', '1');
    });
  });

  it('devrait afficher un message d\'erreur en cas d\'échec', async () => {
    mockedProjectService.getProjectTasks.mockRejectedValue(new Error('Erreur de chargement'));
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Erreur lors du chargement des tâches')).toBeInTheDocument();
    });
  });
}); 