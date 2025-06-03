import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProjectDelete } from '../ProjectDelete';
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

describe('ProjectDelete', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/projects/1/delete']}>
        <Routes>
          <Route path="/projects/:id/delete" element={<ProjectDelete />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('devrait afficher le message de confirmation', () => {
    renderComponent();
    expect(screen.getByText('Supprimer le projet')).toBeInTheDocument();
    expect(screen.getByText(/Êtes-vous sûr de vouloir supprimer ce projet/)).toBeInTheDocument();
  });

  it('devrait naviguer vers la liste des projets après suppression', async () => {
    mockedProjectService.deleteProject.mockResolvedValue(undefined);
    renderComponent();

    const deleteButton = screen.getByText('Supprimer');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockedProjectService.deleteProject).toHaveBeenCalledWith('1');
      expect(mockNavigate).toHaveBeenCalledWith('/projects');
    });
  });

  it('devrait afficher une erreur en cas d\'échec de suppression', async () => {
    mockedProjectService.deleteProject.mockRejectedValue(new Error('Erreur de suppression'));
    renderComponent();

    const deleteButton = screen.getByText('Supprimer');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText('Une erreur est survenue lors de la suppression du projet')).toBeInTheDocument();
    });
  });

  it('devrait naviguer vers les détails du projet après annulation', async () => {
    renderComponent();

    const cancelButton = screen.getByText('Annuler');
    fireEvent.click(cancelButton);

    expect(mockNavigate).toHaveBeenCalledWith('/projects/1');
  });

  it('devrait naviguer vers les détails du projet via le bouton retour', async () => {
    renderComponent();

    const backButton = screen.getByText('Retour au projet');
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('/projects/1');
  });

  it('devrait désactiver les boutons pendant la suppression', async () => {
    mockedProjectService.deleteProject.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    renderComponent();

    const deleteButton = screen.getByText('Supprimer');
    const cancelButton = screen.getByText('Annuler');

    fireEvent.click(deleteButton);

    expect(deleteButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
    expect(screen.getByText('Suppression...')).toBeInTheDocument();
  });
}); 