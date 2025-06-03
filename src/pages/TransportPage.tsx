import React from 'react';
import { TransportSearch } from '../components/search/TransportSearch';

export const TransportPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Recherche de Transport
          </h1>
          <p className="text-lg text-gray-600">
            Trouvez les meilleures options de transport pour votre voyage
          </p>
        </div>

        <TransportSearch />
      </div>
    </div>
  );
}; 