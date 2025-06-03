import io from 'socket.io-client';
import { notificationService } from '../notificationService';

// Mock socket.io-client
jest.mock('socket.io-client');
const mockedIo = io as jest.MockedFunction<typeof io>;

// Mock window.Notification
const mockNotification = {
  requestPermission: jest.fn(),
};
Object.defineProperty(window, 'Notification', {
  value: mockNotification,
  writable: true,
});

describe('NotificationService', () => {
  const mockSocket = {
    on: jest.fn(),
    disconnect: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedIo.mockReturnValue(mockSocket as any);
    mockNotification.requestPermission.mockResolvedValue('granted');
  });

  it('devrait initialiser la connexion socket avec le token', () => {
    const token = 'fake-token';
    localStorage.setItem('token', token);

    notificationService['initializeSocket']();

    expect(mockedIo).toHaveBeenCalledWith(expect.any(String), {
      auth: { token },
    });
  });

  it('devrait gérer les nouvelles notifications', () => {
    const mockNotification = {
      id: '1',
      type: 'security',
      title: 'Test',
      message: 'Test message',
      timestamp: new Date(),
      read: false,
    };

    const listener = jest.fn();
    notificationService.subscribe(listener);

    // Simuler une nouvelle notification
    const notificationCallback = mockSocket.on.mock.calls.find(
      call => call[0] === 'notification'
    )?.[1];
    notificationCallback?.(mockNotification);

    expect(listener).toHaveBeenCalledWith(mockNotification);
  });

  it('devrait envoyer une notification push si activée', async () => {
    const mockNotification = {
      id: '1',
      type: 'security',
      title: 'Test',
      message: 'Test message',
      timestamp: new Date(),
      read: false,
    };

    // Activer les notifications push
    await notificationService.updatePreferences({ push: true });

    // Simuler une nouvelle notification
    const notificationCallback = mockSocket.on.mock.calls.find(
      call => call[0] === 'notification'
    )?.[1];
    await notificationCallback?.(mockNotification);

    expect(window.Notification.requestPermission).toHaveBeenCalled();
    const notification = new window.Notification('Test', {
      body: 'Test message',
      icon: '/path/to/icon.png'
    });
    expect(notification).toBeDefined();
  });

  it('devrait mettre à jour les préférences de notification', async () => {
    const newPreferences = {
      email: false,
      push: true,
      inApp: true,
      types: {
        security: true,
        system: false,
        alert: true,
      },
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(newPreferences),
    });

    await notificationService.updatePreferences(newPreferences);

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/notifications/preferences',
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(newPreferences),
      })
    );
  });

  it('devrait récupérer les préférences de notification', async () => {
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

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockPreferences),
    });

    const preferences = await notificationService.getPreferences();

    expect(preferences).toEqual(mockPreferences);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/notifications/preferences',
      expect.any(Object)
    );
  });

  it('devrait marquer une notification comme lue', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    });

    await notificationService.markAsRead('1');

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/notifications/1/read',
      expect.objectContaining({
        method: 'PUT',
      })
    );
  });

  it('devrait marquer toutes les notifications comme lues', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    });

    await notificationService.markAllAsRead();

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/notifications/read-all',
      expect.objectContaining({
        method: 'PUT',
      })
    );
  });

  it('devrait récupérer le nombre de notifications non lues', async () => {
    const mockCount = 5;
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ count: mockCount }),
    });

    const count = await notificationService.getUnreadCount();

    expect(count).toBe(mockCount);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/notifications/unread-count',
      expect.any(Object)
    );
  });

  it('devrait gérer les erreurs de connexion socket', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Connection error');

    // Simuler une erreur de connexion
    const errorCallback = mockSocket.on.mock.calls.find(
      call => call[0] === 'connect_error'
    )?.[1];
    errorCallback?.(error);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erreur de connexion WebSocket:',
      error
    );
  });

  it('devrait se déconnecter proprement', () => {
    notificationService.disconnect();

    expect(mockSocket.disconnect).toHaveBeenCalled();
  });
}); 