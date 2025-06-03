import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const QuotaDashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const { iaSearchQuota, suggestionQuota } = user.plan;
  const iaUsed = (user as any).iaSearchesUsed || 0;
  const sugUsed = (user as any).suggestionUsed || 0;

  const handleSearch = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/ia/search', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 402) {
      alert('Quota atteint, passez à l\'offre supérieure');
    } else {
      const data = await res.json();
      alert('Recherche effectuée. Total utilisé: ' + data.used);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mon plan: {user.plan.name}</h2>
      <p>Recherches IA: {iaUsed}/{iaSearchQuota === -1 ? '∞' : iaSearchQuota}</p>
      <p>Suggestions IA: {sugUsed}/{suggestionQuota === -1 ? '∞' : suggestionQuota}</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white" onClick={handleSearch}>
        Lancer une recherche IA
      </button>
    </div>
  );
};

export default QuotaDashboard;
