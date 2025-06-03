import React from 'react';
import { BellIcon, BellSlashIcon } from '@heroicons/react/24/solid';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

interface NotificationManagerProps {
  notifications: Notification[];
  onMarkAsRead: (notificationId: string) => void;
  onDelete: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteAll: () => void;
  className?: string;
}

export const NotificationManager: React.FC<NotificationManagerProps> = ({
  notifications,
  onMarkAsRead,
  onDelete,
  onMarkAllAsRead,
  onDeleteAll,
  className = '',
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getTypeClasses = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 text-blue-700';
      case 'success':
        return 'bg-green-50 text-green-700';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700';
      case 'error':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors"
            >
              Tout marquer comme lu
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={onDeleteAll}
              className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
            >
              Tout supprimer
            </button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <BellSlashIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Aucune notification
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Vous n'avez pas de notifications pour le moment.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg ${
                notification.read ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeClasses(
                        notification.type
                      )}`}
                    >
                      {notification.type}
                    </span>
                    {!notification.read && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Non lu
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    {notification.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {notification.message}
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    {formatDate(notification.createdAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {!notification.read && (
                    <button
                      onClick={() => onMarkAsRead(notification.id)}
                      className="p-1 text-gray-400 hover:text-gray-500"
                    >
                      <BellIcon className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(notification.id)}
                    className="p-1 text-red-400 hover:text-red-500"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 