import React from 'react';
import { AccommodationSearch } from '../components/search/AccommodationSearch';

export const AccommodationPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Hébergements</h1>
        <p className="mt-1 text-sm text-gray-500">
          Recherchez et réservez des hébergements de luxe
        </p>
      </div>

      <AccommodationSearch />
    </div>
  );
}; 