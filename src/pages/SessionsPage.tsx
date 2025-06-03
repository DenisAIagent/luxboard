import React, { useState } from 'react';
import { SessionManager } from '../components/SessionManager';

const mockSessions = [
  {
    id: '1',
    device: 'desktop' as const,
    browser: 'Chrome',
    location: 'Paris, France',
    lastActive: new Date(),
    current: true,
  },
  {
    id: '2',
    device: 'mobile' as const,
    browser: 'Safari',
    location: 'Lyon, France',
    lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    current: false,
  },
  {
    id: '3',
    device: 'tablet' as const,
    browser: 'Firefox',
    location: 'Marseille, France',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    current: false,
  },
];

const SessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState(mockSessions);

  const handleTerminateSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((session) => session.id !== sessionId));
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Gestion des sessions</h1>
      <SessionManager
        sessions={sessions}
        onTerminateSession={handleTerminateSession}
      />
    </div>
  );
};

export default SessionsPage; 