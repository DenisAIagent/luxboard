import React, { useEffect, useState } from 'react';
import { notificationService } from '../../services/notifications/notificationService';
import type { Notification, NotificationPreferences } from '../../services/notifications/notificationService';

export const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    push: true,
    inApp: true,
    types: {
      security: true,
      system: true,
      alert: true
    }
  });

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await notificationService.getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    };

    const loadPreferences = async () => {
      try {
        const data = await notificationService.getPreferences();
        setPreferences(data);
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    };

    loadNotifications();
    loadPreferences();

    const unsubscribe = notificationService.subscribe((notification) => {
      setNotifications(prev => [notification, ...prev]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev =>
        prev.map(n => ({ ...n, read: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await notificationService.deleteNotification(id);
      setNotifications(prev =>
        prev.filter(n => n.id !== id)
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handlePreferenceChange = async (key: keyof NotificationPreferences, value: boolean) => {
    try {
      const newPreferences = { ...preferences, [key]: value };
      await notificationService.updatePreferences(newPreferences);
      setPreferences(newPreferences);
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  const handleTypePreferenceChange = async (type: keyof NotificationPreferences['types'], value: boolean) => {
    try {
      const newPreferences = {
        ...preferences,
        types: { ...preferences.types, [type]: value }
      };
      await notificationService.updatePreferences(newPreferences);
      setPreferences(newPreferences);
    } catch (error) {
      console.error('Error updating type preferences:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Centre de notifications</h2>
          <button
            onClick={handleMarkAllAsRead}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Tout marquer comme lu
          </button>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Préférences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Méthodes de notification</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.email}
                    onChange={(e) => handlePreferenceChange('email', e.target.checked)}
                    className="mr-2"
                  />
                  Email
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.push}
                    onChange={(e) => handlePreferenceChange('push', e.target.checked)}
                    className="mr-2"
                  />
                  Notifications push
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.inApp}
                    onChange={(e) => handlePreferenceChange('inApp', e.target.checked)}
                    className="mr-2"
                  />
                  Notifications in-app
                </label>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Types de notifications</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.types.security}
                    onChange={(e) => handleTypePreferenceChange('security', e.target.checked)}
                    className="mr-2"
                  />
                  Sécurité
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.types.system}
                    onChange={(e) => handleTypePreferenceChange('system', e.target.checked)}
                    className="mr-2"
                  />
                  Système
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.types.alert}
                    onChange={(e) => handleTypePreferenceChange('alert', e.target.checked)}
                    className="mr-2"
                  />
                  Alertes
                </label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Notifications récentes</h3>
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <p className="text-gray-500">Aucune notification</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${
                    notification.read ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          Marquer comme lu
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 