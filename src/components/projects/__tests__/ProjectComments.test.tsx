import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProjectComments } from '../ProjectComments';
import { projectService } from '../../../services/projects/projectService';
import { useAuth } from '../../../hooks/useAuth';

// Mock des services
jest.mock('../../../services/projects/projectService');
jest.mock('../../../hooks/useAuth');

const mockProjectService = projectService as jest.Mocked<typeof projectService>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('ProjectComments', () => {
  const mockComments = [
    {
      id: '1',
      content: 'Premier commentaire',
      author: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe'
      },
      createdAt: new Date('2024-03-20T10:00:00Z'),
      updatedAt: new Date('2024-03-20T10:00:00Z')
    },
    {
      id: '2',
      content: 'Deuxième commentaire',
      author: {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith'
      },
      createdAt: new Date('2024-03-20T11:00:00Z'),
      updatedAt: new Date('2024-03-20T11:00:00Z')
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockProjectService.getTaskComments.mockResolvedValue(mockComments);
    mockUseAuth.mockReturnValue({
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
      <MemoryRouter initialEntries={['/projects/123']}>
        <Routes>
          <Route path="/projects/:id" element={<ProjectComments taskId="task-1" />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('affiche la liste des commentaires', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Premier commentaire')).toBeInTheDocument();
      expect(screen.getByText('Deuxième commentaire')).toBeInTheDocument();
    });
  });

  it('affiche les détails des commentaires', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Premier commentaire')).toBeInTheDocument();
      expect(screen.getByText('Deuxième commentaire')).toBeInTheDocument();
    });
  });

  it('permet de créer un nouveau commentaire', async () => {
    mockProjectService.createTaskComment.mockResolvedValue({
      id: '3',
      content: 'Nouveau commentaire',
      author: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe'
      },
      createdAt: new Date('2024-03-20T12:00:00Z'),
      updatedAt: new Date('2024-03-20T12:00:00Z')
    });

    renderComponent();

    const textarea = screen.getByPlaceholderText('Ajouter un commentaire...');
    const submitButton = screen.getByRole('button', { name: '' });

    fireEvent.change(textarea, { target: { value: 'Nouveau commentaire' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockProjectService.createTaskComment).toHaveBeenCalledWith(
        '123',
        'task-1',
        { content: 'Nouveau commentaire' }
      );
    });
  });

  it('permet de modifier un commentaire', async () => {
    mockProjectService.updateTaskComment.mockResolvedValue({
      id: '1',
      content: 'Commentaire modifié',
      author: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe'
      },
      createdAt: new Date('2024-03-20T10:00:00Z'),
      updatedAt: new Date('2024-03-20T12:00:00Z')
    });

    renderComponent();

    await waitFor(() => {
      const editButton = screen.getAllByTitle('Modifier le commentaire')[0];
      fireEvent.click(editButton);
    });

    const textarea = screen.getByDisplayValue('Premier commentaire');
    const saveButton = screen.getByText('Enregistrer');

    fireEvent.change(textarea, { target: { value: 'Commentaire modifié' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockProjectService.updateTaskComment).toHaveBeenCalledWith(
        '123',
        'task-1',
        '1',
        { content: 'Commentaire modifié' }
      );
    });
  });

  it('permet de supprimer un commentaire', async () => {
    const mockConfirm = jest.spyOn(window, 'confirm').mockImplementation(() => true);
    mockProjectService.deleteTaskComment.mockResolvedValue(undefined);

    renderComponent();

    await waitFor(() => {
      const deleteButton = screen.getAllByTitle('Supprimer le commentaire')[0];
      fireEvent.click(deleteButton);
    });

    expect(mockConfirm).toHaveBeenCalledWith('Êtes-vous sûr de vouloir supprimer ce commentaire ?');

    await waitFor(() => {
      expect(mockProjectService.deleteTaskComment).toHaveBeenCalledWith(
        '123',
        'task-1',
        '1'
      );
    });

    mockConfirm.mockRestore();
  });

  it('affiche un message d\'erreur en cas d\'échec du chargement', async () => {
    mockProjectService.getTaskComments.mockRejectedValue(new Error('Erreur de chargement'));

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Erreur lors du chargement des commentaires')).toBeInTheDocument();
    });
  });

  it('n\'affiche pas les boutons d\'édition pour les commentaires d\'autres utilisateurs', async () => {
    mockUseAuth.mockReturnValue({
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
      const editButtons = screen.queryAllByTitle('Modifier le commentaire');
      const deleteButtons = screen.queryAllByTitle('Supprimer le commentaire');
      expect(editButtons).toHaveLength(1);
      expect(deleteButtons).toHaveLength(1);
    });
  });
}); 