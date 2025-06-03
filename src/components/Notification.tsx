import React from 'react';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/solid';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface NotificationProps {
  type: NotificationType;
  title: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export const Notification: React.FC<NotificationProps> = ({
  type,
  title,
  message,
  onClose,
  className = '',
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'info':
        return {
          container: 'bg-blue-50',
          icon: 'text-blue-400',
          title: 'text-blue-800',
          message: 'text-blue-700',
          close: 'text-blue-500 hover:bg-blue-100',
        };
      case 'success':
        return {
          container: 'bg-green-50',
          icon: 'text-green-400',
          title: 'text-green-800',
          message: 'text-green-700',
          close: 'text-green-500 hover:bg-green-100',
        };
      case 'warning':
        return {
          container: 'bg-yellow-50',
          icon: 'text-yellow-400',
          title: 'text-yellow-800',
          message: 'text-yellow-700',
          close: 'text-yellow-500 hover:bg-yellow-100',
        };
      case 'error':
        return {
          container: 'bg-red-50',
          icon: 'text-red-400',
          title: 'text-red-800',
          message: 'text-red-700',
          close: 'text-red-500 hover:bg-red-100',
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`rounded-md p-4 ${styles.container} ${className}`}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <BellIcon className={`h-5 w-5 ${styles.icon}`} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${styles.title}`}>
            {title}
          </h3>
          <div className={`mt-2 text-sm ${styles.message}`}>
            <p>{message}</p>
          </div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles.close}`}
              >
                <span className="sr-only">Fermer</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 