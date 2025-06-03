import { useState, useEffect } from 'react';
import { authService } from '../services/auth/authService';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'editor' | 'concierge';
  plan: {
    name: string;
    iaSearchQuota: number;
    suggestionQuota: number;
    users: number;
  };
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        setError('Erreur lors de la vérification de l\'authentification');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, loading, error };
}; 