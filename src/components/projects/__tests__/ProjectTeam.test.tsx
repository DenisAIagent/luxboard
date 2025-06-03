import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProjectTeam } from '../ProjectTeam';
import { projectService } from '../../../services/projects/projectService';
import { useAuth } from '../../../hooks/useAuth';

// Mock projectService
jest.mock('../../../services/projects/projectService');
const mockedProjectService = projectService as jest.Mocked<typeof projectService>;

// Mock useAuth
jest.mock('../../../hooks/useAuth');
const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('ProjectTeam', () => {
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
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'editor' as const
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
      completed: 7
    },
    tags: ['test', 'react'],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedProjectService.getProject.mockResolvedValue(mockProject);
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
      <MemoryRouter initialEntries={['/projects/1/team']}>
        <Routes>
          <Route path="/projects/:id/team" element={<ProjectTeam />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('devrait afficher la liste des membres de l\'équipe', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });
  });

  it('devrait afficher les rôles des membres', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Administrateur')).toBeInTheDocument();
      expect(screen.getByText('Éditeur')).toBeInTheDocument();
      expect(screen.getByText('Concierge')).toBeInTheDocument();
    });
  });

  it('devrait permettre à l\'admin d\'ajouter un nouveau membre', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Email du nouveau membre')).toBeInTheDocument();
    });

    const emailInput = screen.getByPlaceholderText('Email du nouveau membre');
    const roleSelect = screen.getByRole('combobox');
    const addButton = screen.getByText('Ajouter');

    fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
    fireEvent.change(roleSelect, { target: { value: 'editor' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockedProjectService.addTeamMember).toHaveBeenCalledWith('1', 'new@example.com', 'editor');
    });
  });

  it('devrait permettre à l\'admin de modifier le rôle d\'un membre', async () => {
    renderComponent();

    await waitFor(() => {
      const roleSelects = screen.getAllByRole('combobox');
      fireEvent.change(roleSelects[1], { target: { value: 'admin' } });
    });

    await waitFor(() => {
      expect(mockedProjectService.updateTeamMemberRole).toHaveBeenCalledWith('1', '2', 'admin');
    });
  });

  it('devrait permettre à l\'admin de retirer un membre', async () => {
    renderComponent();

    await waitFor(() => {
      const removeButtons = screen.getAllByTitle('Retirer du projet');
      fireEvent.click(removeButtons[0]);
    });

    await waitFor(() => {
      expect(mockedProjectService.removeTeamMember).toHaveBeenCalledWith('1', '2');
    });
  });

  it('devrait afficher un message d\'erreur en cas d\'échec', async () => {
    mockedProjectService.getProject.mockRejectedValue(new Error('Erreur de chargement'));
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Erreur lors du chargement des membres de l\'équipe')).toBeInTheDocument();
    });
  });

  it('ne devrait pas afficher les contrôles d\'administration pour un non-admin', async () => {
    mockedUseAuth.mockReturnValue({
      user: { 
        id: '2', 
        firstName: 'Jane', 
        lastName: 'Smith',
        email: 'jane@example.com',
        role: 'editor'
      },
      loading: false,
      error: null
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email du nouveau membre')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Retirer du projet')).not.toBeInTheDocument();
    });
  });
}); 