import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Dashboard } from '../Dashboard';
import { dashboardService, RecentActivity } from '../../../services/dashboard/dashboardService';

// Mock dashboardService
jest.mock('../../../services/dashboard/dashboardService');
const mockedDashboardService = dashboardService as jest.Mocked<typeof dashboardService>;

describe('Dashboard', () => {
  const mockStats = {
    totalProjects: 12,
    activeTasks: 24,
    completedTasks: 156,
    teamMembers: 8,
    upcomingDeadlines: 5,
    productivityScore: 85
  };

  const mockActivity: RecentActivity[] = [
    {
      id: '1',
      type: 'task' as const,
      title: 'Tâche terminée',
      description: 'La tâche "Mise à jour du design" a été complétée',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'project' as const,
      title: 'Nouveau projet',
      description: 'Le projet "Refonte du site" a été créé',
      timestamp: new Date(Date.now() - 3600000)
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockedDashboardService.getStats.mockResolvedValue(mockStats);
    mockedDashboardService.getRecentActivity.mockResolvedValue(mockActivity);
  });

  it('devrait afficher le titre du tableau de bord', async () => {
    render(<Dashboard />);
    expect(screen.getByText('Tableau de bord')).toBeInTheDocument();
  });

  it('devrait afficher les statistiques', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('12')).toBeInTheDocument(); // totalProjects
      expect(screen.getByText('24')).toBeInTheDocument(); // activeTasks
      expect(screen.getByText('8')).toBeInTheDocument(); // teamMembers
      expect(screen.getByText('156')).toBeInTheDocument(); // completedTasks
      expect(screen.getByText('5')).toBeInTheDocument(); // upcomingDeadlines
      expect(screen.getByText('85%')).toBeInTheDocument(); // productivityScore
    });
  });

  it('devrait afficher les activités récentes', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Tâche terminée')).toBeInTheDocument();
      expect(screen.getByText('La tâche "Mise à jour du design" a été complétée')).toBeInTheDocument();
      expect(screen.getByText('Nouveau projet')).toBeInTheDocument();
      expect(screen.getByText('Le projet "Refonte du site" a été créé')).toBeInTheDocument();
    });
  });

  it('devrait afficher un indicateur de chargement', () => {
    render(<Dashboard />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('devrait gérer les erreurs de chargement', async () => {
    mockedDashboardService.getStats.mockRejectedValue(new Error('Erreur de chargement'));
    
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    render(<Dashboard />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });
}); 