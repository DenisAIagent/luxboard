import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/solid';

interface OfferCardProps {
  offer: {
    id: string;
    titre: string;
    description?: string;
    typeOffre: string;
    valeurType: string;
    valeurMontant: number;
    dateDebut: string;
    dateFin: string;
    photos: string[];
    provider: {
      id: string;
      nom: string;
      category: string;
    };
  };
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getValueDisplay = () => {
    switch (offer.valeurType) {
      case 'POURCENTAGE':
        return `${offer.valeurMontant}% de réduction`;
      case 'MONTANT_FIXE':
        return `${offer.valeurMontant}€ de réduction`;
      case 'GRATUIT':
        return 'Gratuit';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48">
        <img
          src={offer.photos[0] || '/placeholder.jpg'}
          alt={offer.titre}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
          {offer.typeOffre}
        </div>
      </div>

      <div className="p-4">
        <Link to={`/offers/${offer.id}`} className="block">
          <h3 className="text-xl font-semibold text-gray-900 hover:text-gold transition-colors">
            {offer.titre}
          </h3>
        </Link>

        {offer.description && (
          <p className="mt-2 text-gray-600 line-clamp-2">{offer.description}</p>
        )}

        <div className="mt-3 flex items-center text-gold font-semibold">
          <TagIcon className="h-5 w-5 mr-2" />
          <span>{getValueDisplay()}</span>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="h-5 w-5 mr-2" />
            <span>
              Du {formatDate(offer.dateDebut)} au {formatDate(offer.dateFin)}
            </span>
          </div>

          <div className="flex items-center text-gray-600">
            <ClockIcon className="h-5 w-5 mr-2" />
            <span>Offre limitée dans le temps</span>
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <Link
            to={`/providers/${offer.provider.id}`}
            className="text-sm text-gray-600 hover:text-gold transition-colors"
          >
            {offer.provider.nom}
          </Link>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-sm text-gray-600">{offer.provider.category}</span>
        </div>

        <div className="mt-4">
          <Link
            to={`/offers/${offer.id}`}
            className="block w-full text-center bg-black text-white py-2 rounded-lg hover:bg-gold transition-colors"
          >
            Voir l'offre
          </Link>
        </div>
      </div>
    </div>
  );
}; 