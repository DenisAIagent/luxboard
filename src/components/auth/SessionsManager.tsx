import React, { useState, useEffect } from 'react';
import { authService } from '../../services/auth/authService';
import { Loader2, LogOut, Trash2 } from 'lucide-react';
import type { Session } from '../../services/auth/authService';

export const SessionsManager: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSessions = async () => {
    try {
      const data = await authService.getSessions();
      setSessions(data);
    } catch (err) {
      setError('Erreur lors du chargement des sessions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleRevokeSession = async (sessionId: string) => {
    try {
      await authService.revokeSession(sessionId);
      await loadSessions();
    } catch (err) {
      setError('Erreur lors de la révocation de la session');
    }
  };

  const handleRevokeAllSessions = async () => {
    try {
      await authService.revokeAllSessions();
      await loadSessions();
    } catch (err) {
      setError('Erreur lors de la révocation de toutes les sessions');
    }
  };

  const formatDate = (date: Date | string) => {
    if (date instanceof Date) {
      return date.toLocaleString();
    }
    return new Date(date).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Sessions actives</h2>
        <button
          onClick={handleRevokeAllSessions}
          className="btn btn-outline btn-error flex items-center"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Déconnecter toutes les sessions
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-4">{error}</div>
      )}

      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <div className="font-medium">
                {session.device}
                {session.current && (
                  <span className="ml-2 text-sm text-blue-600">(Session actuelle)</span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                Dernière activité : {formatDate(session.lastActive)}
              </div>
            </div>
            {!session.current && (
              <button
                onClick={() => handleRevokeSession(session.id)}
                className="btn btn-ghost btn-sm text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionsManager; 