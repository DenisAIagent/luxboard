import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Correction pour les icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Accommodation {
  id: string;
  nom: string;
  adresse: {
    coordonnees: {
      lat: number;
      lng: number;
    };
  };
  baseTarifaire: {
    minimum: number;
    devise: string;
  };
  rating: number;
  photos: string[];
  source: string;
  contact: {
    siteWeb: string;
  };
}

interface AccommodationMapProps {
  accommodations: Accommodation[];
  center?: [number, number];
  zoom?: number;
}

export const AccommodationMap: React.FC<AccommodationMapProps> = ({
  accommodations,
  center = [48.8566, 2.3522], // Paris par défaut
  zoom = 13
}) => {
  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {accommodations.map((accommodation) => (
          <Marker
            key={accommodation.id}
            position={[
              accommodation.adresse.coordonnees.lat,
              accommodation.adresse.coordonnees.lng
            ]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-lg mb-2">{accommodation.nom}</h3>
                {accommodation.photos[0] && (
                  <img
                    src={accommodation.photos[0]}
                    alt={accommodation.nom}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                <div className="flex items-center mb-2">
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
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  À partir de {accommodation.baseTarifaire.minimum} {accommodation.baseTarifaire.devise}/nuit
                </p>
                <a
                  href={accommodation.contact.siteWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#1a1a1a] hover:text-[#2a2a2a] font-medium"
                >
                  Voir l'offre
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}; 