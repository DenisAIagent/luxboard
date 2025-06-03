import React, { useState } from 'react';
import { NotificationManager } from '../components/NotificationManager';

// Données de test pour les notifications
const mockNotifications = [
  {
    id: '1',
    title: 'Nouveau message',
    message: 'Vous avez reçu un nouveau message de Jean Dupont',
    type: 'info' as const,
    read: false,
    createdAt: new Date('2024-03-20T10:00:00'),
  },
  {
    id: '2',
    title: 'Tâche terminée',
    message: 'La tâche "Mise à jour du site" a été terminée avec succès',
    type: 'success' as const,
    read: true,
    createdAt: new Date('2024-03-19T15:30:00'),
  },
  {
    id: '3',
    title: 'Attention requise',
    message: 'Votre espace de stockage atteint 80% de sa capacité',
    type: 'warning' as const,
    read: false,
    createdAt: new Date('2024-03-18T09:15:00'),
  },
];

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleDelete = (notificationId: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez vos notifications et restez informé des dernières mises à jour
        </p>
      </div>

      <NotificationManager
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDelete}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDeleteAll={handleDeleteAll}
      />
    </div>
  );
}; 