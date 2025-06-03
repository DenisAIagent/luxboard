import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NotificationCenter } from '../NotificationCenter';
import { notificationService } from '../../../services/notifications/notificationService';

// Mock notificationService
jest.mock('../../../services/notifications/notificationService');
const mockedNotificationService = notificationService as jest.Mocked<typeof notificationService>;

describe('NotificationCenter', () => {
  const mockNotifications = [
    {
      id: '1',
      type: 'security' as const,
      title: 'Nouvelle connexion',
      message: 'Une nouvelle connexion a été détectée',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '2',
      type: 'system' as const,
      title: 'Mise à jour disponible',
      message: 'Une nouvelle version est disponible',
      timestamp: new Date(),
      read: true,
    },
  ];

  const mockPreferences = {
    email: true,
    push: true,
    inApp: true,
    types: {
      security: true,
      system: true,
      alert: true,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedNotificationService.getPreferences.mockResolvedValue(mockPreferences);
    mockedNotificationService.getUnreadCount.mockResolvedValue(1);
  });

  it('devrait rendre le bouton de notification avec le compteur', async () => {
    render(<NotificationCenter />);

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  it('devrait ouvrir le panneau de notifications au clic', async () => {
    render(<NotificationCenter />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });
  });

  it('devrait afficher les notifications non lues', async () => {
    render(<NotificationCenter />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Nouvelle connexion')).toBeInTheDocument();
      expect(screen.getByText('Une nouvelle connexion a été détectée')).toBeInTheDocument();
    });
  });

  it('devrait marquer une notification comme lue', async () => {
    render(<NotificationCenter />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      const markAsReadButton = screen.getByRole('button', { name: /marquer comme lu/i });
      fireEvent.click(markAsReadButton);
    });

    expect(mockedNotificationService.markAsRead).toHaveBeenCalledWith('1');
  });

  it('devrait marquer toutes les notifications comme lues', async () => {
    render(<NotificationCenter />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      const markAllAsReadButton = screen.getByText('Tout marquer comme lu');
      fireEvent.click(markAllAsReadButton);
    });

    expect(mockedNotificationService.markAllAsRead).toHaveBeenCalled();
  });

  it('devrait ouvrir les préférences de notification', async () => {
    render(<NotificationCenter />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      const preferencesButton = screen.getByRole('button', { name: /préférences/i });
      fireEvent.click(preferencesButton);
    });

    expect(screen.getByText('Préférences de notification')).toBeInTheDocument();
  });

  it('devrait mettre à jour les préférences de notification', async () => {
    render(<NotificationCenter />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      const preferencesButton = screen.getByRole('button', { name: /préférences/i });
      fireEvent.click(preferencesButton);
    });

    const emailCheckbox = screen.getByLabelText('Notifications par email');
    fireEvent.click(emailCheckbox);

    expect(mockedNotificationService.updatePreferences).toHaveBeenCalledWith({
      email: false,
    });
  });

  it('devrait afficher un message quand il n\'y a pas de notifications', async () => {
    mockedNotificationService.getUnreadCount.mockResolvedValue(0);

    render(<NotificationCenter />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Aucune notification')).toBeInTheDocument();
    });
  });

  it('devrait gérer les nouvelles notifications en temps réel', async () => {
    render(<NotificationCenter />);

    const newNotification = {
      id: '1',
      type: 'alert' as const,
      title: 'Test',
      message: 'Test message',
      timestamp: new Date().toISOString(),
      read: false,
    };

    // Simuler une nouvelle notification
    const subscribeCallback = mockedNotificationService.subscribe.mock.calls[0][0];
    subscribeCallback(newNotification);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });
  });
}); 