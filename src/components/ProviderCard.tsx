import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, MapPinIcon, PhoneIcon, GlobeAltIcon } from '@heroicons/react/24/solid';

interface ProviderCardProps {
  provider: {
    id: string;
    nom: string;
    category: string;
    description?: string;
    photos: string[];
    rating: number;
    nombreAvis: number;
    adresseVille?: string;
    contactTelephone?: string;
    contactSiteWeb?: string;
    specialites: string[];
  };
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48">
        <img
          src={provider.photos[0] || '/placeholder.jpg'}
          alt={provider.nom}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
          {provider.category}
        </div>
      </div>

      <div className="p-4">
        <Link to={`/providers/${provider.id}`} className="block">
          <h3 className="text-xl font-semibold text-gray-900 hover:text-gold transition-colors">
            {provider.nom}
          </h3>
        </Link>

        {provider.description && (
          <p className="mt-2 text-gray-600 line-clamp-2">{provider.description}</p>
        )}

        <div className="mt-3 flex items-center">
          <StarIcon className="h-5 w-5 text-yellow-400" />
          <span className="ml-1 text-gray-700">{provider.rating.toFixed(1)}</span>
          <span className="ml-1 text-gray-500">({provider.nombreAvis} avis)</span>
        </div>

        <div className="mt-3 space-y-2">
          {provider.adresseVille && (
            <div className="flex items-center text-gray-600">
              <MapPinIcon className="h-5 w-5 mr-2" />
              <span>{provider.adresseVille}</span>
            </div>
          )}

          {provider.contactTelephone && (
            <div className="flex items-center text-gray-600">
              <PhoneIcon className="h-5 w-5 mr-2" />
              <span>{provider.contactTelephone}</span>
            </div>
          )}

          {provider.contactSiteWeb && (
            <div className="flex items-center text-gray-600">
              <GlobeAltIcon className="h-5 w-5 mr-2" />
              <a
                href={provider.contactSiteWeb}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                {provider.contactSiteWeb}
              </a>
            </div>
          )}
        </div>

        {provider.specialites.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {provider.specialites.map((specialite) => (
              <span
                key={specialite}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {specialite}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4">
          <Link
            to={`/providers/${provider.id}`}
            className="block w-full text-center bg-black text-white py-2 rounded-lg hover:bg-gold transition-colors"
          >
            Voir le profil
          </Link>
        </div>
      </div>
    </div>
  );
}; 