import React from 'react';
import { DocumentArrowDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Accommodation {
  id: string;
  nom: string;
  description: string;
  adresse: {
    ville: string;
    pays: string;
  };
  baseTarifaire: {
    minimum: number;
    devise: string;
  };
  rating: number;
  nombreAvis: number;
  photos: string[];
  source: string;
  facilites: string[];
  contact: {
    siteWeb: string;
  };
}

interface AccommodationComparisonProps {
  accommodations: Accommodation[];
  onRemove: (id: string) => void;
  onExport: () => void;
}

export const AccommodationComparison: React.FC<AccommodationComparisonProps> = ({
  accommodations,
  onRemove,
  onExport
}) => {
  const allFacilities = Array.from(
    new Set(accommodations.flatMap(a => a.facilites))
  ).sort();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">
          Comparaison ({accommodations.length} hébergements)
        </h3>
        <button
          onClick={onExport}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#1a1a1a] hover:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a1a1a]"
        >
          <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
          Exporter en PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Critères
              </th>
              {accommodations.map((accommodation) => (
                <th key={accommodation.id} className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex justify-between items-center">
                    <span>{accommodation.nom}</span>
                    <button
                      onClick={() => onRemove(accommodation.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Photo */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Photo
              </td>
              {accommodations.map((accommodation) => (
                <td key={accommodation.id} className="px-6 py-4 whitespace-nowrap">
                  {accommodation.photos[0] && (
                    <img
                      src={accommodation.photos[0]}
                      alt={accommodation.nom}
                      className="h-32 w-full object-cover rounded"
                    />
                  )}
                </td>
              ))}
            </tr>

            {/* Localisation */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Localisation
              </td>
              {accommodations.map((accommodation) => (
                <td key={accommodation.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {accommodation.adresse.ville}, {accommodation.adresse.pays}
                </td>
              ))}
            </tr>

            {/* Prix */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Prix par nuit
              </td>
              {accommodations.map((accommodation) => (
                <td key={accommodation.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {accommodation.baseTarifaire.minimum} {accommodation.baseTarifaire.devise}
                </td>
              ))}
            </tr>

            {/* Note */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Note
              </td>
              {accommodations.map((accommodation) => (
                <td key={accommodation.id} className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(accommodation.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      ({accommodation.nombreAvis} avis)
                    </span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Source */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Source
              </td>
              {accommodations.map((accommodation) => (
                <td key={accommodation.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {accommodation.source}
                </td>
              ))}
            </tr>

            {/* Équipements */}
            {allFacilities.map((facility) => (
              <tr key={facility}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {facility}
                </td>
                {accommodations.map((accommodation) => (
                  <td key={accommodation.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {accommodation.facilites.includes(facility) ? (
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {/* Lien */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Lien
              </td>
              {accommodations.map((accommodation) => (
                <td key={accommodation.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a
                    href={accommodation.contact.siteWeb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1a1a1a] hover:text-[#2a2a2a] font-medium"
                  >
                    Voir l'offre
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}; 