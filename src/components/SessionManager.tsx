import React from 'react';
import { ComputerDesktopIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/solid';

interface Session {
  id: string;
  device: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  location: string;
  lastActive: Date;
  current: boolean;
}

interface SessionManagerProps {
  sessions: Session[];
  onTerminateSession: (sessionId: string) => void;
  className?: string;
}

export const SessionManager: React.FC<SessionManagerProps> = ({
  sessions,
  onTerminateSession,
  className = '',
}) => {
  const getDeviceIcon = (device: Session['device']) => {
    switch (device) {
      case 'desktop':
        return <ComputerDesktopIcon className="h-5 w-5" />;
      case 'mobile':
      case 'tablet':
        return <DevicePhoneMobileIcon className="h-5 w-5" />;
      default:
        return <ComputerDesktopIcon className="h-5 w-5" />;
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
      <h2 className="text-lg font-medium text-gray-900">Sessions actives</h2>
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                {getDeviceIcon(session.device)}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {session.browser} sur {session.device}
                </p>
                <p className="text-sm text-gray-500">{session.location}</p>
                <p className="text-sm text-gray-500">
                  Dernière activité : {formatDate(session.lastActive)}
                </p>
              </div>
            </div>
            {!session.current && (
              <button
                onClick={() => onTerminateSession(session.id)}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
              >
                Terminer
              </button>
            )}
            {session.current && (
              <span className="px-3 py-1 text-sm text-green-600 bg-green-50 rounded-md">
                Session actuelle
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 