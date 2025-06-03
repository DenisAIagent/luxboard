import React, { useState, useMemo } from 'react';
import { bookingAPI } from '../../services/apis/bookingApi';
import { airbnbAPI } from '../../services/apis/airbnbApi';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, MapIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/solid';
import { AccommodationMap } from '../map/AccommodationMap';
import { AccommodationComparison } from '../comparison/AccommodationComparison';
import { exportComparisonToPDF } from '../../services/export/pdfExport';

interface SearchFormData {
  destination: string;
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
  infants: number;
  rooms: number;
  source: 'all' | 'booking' | 'airbnb';
}

interface FilterOptions {
  minPrice: number;
  maxPrice: number;
  minRating: number;
  amenities: string[];
  sortBy: 'price' | 'rating' | 'reviews';
  sortOrder: 'asc' | 'desc';
}

export const AccommodationSearch: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map' | 'comparison'>('list');
  const [selectedAccommodations, setSelectedAccommodations] = useState<string[]>([]);
  const [formData, setFormData] = useState<SearchFormData>({
    destination: '',
    checkin: '',
    checkout: '',
    adults: 2,
    children: 0,
    infants: 0,
    rooms: 1,
    source: 'all'
  });

  const [filters, setFilters] = useState<FilterOptions>({
    minPrice: 0,
    maxPrice: 10000,
    minRating: 0,
    amenities: [],
    sortBy: 'rating',
    sortOrder: 'desc'
  });

  const amenitiesList = [
    'wifi',
    'piscine',
    'spa',
    'gym',
    'restaurant',
    'parking',
    'climatisation',
    'petit-déjeuner'
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const searchPromises = [];

      if (formData.source === 'all' || formData.source === 'booking') {
        searchPromises.push(
          bookingAPI.searchHotels({
            destination: formData.destination,
            checkin: formData.checkin,
            checkout: formData.checkout,
            adults: formData.adults,
            rooms: formData.rooms,
            currency: 'EUR'
          })
        );
      }

      if (formData.source === 'all' || formData.source === 'airbnb') {
        searchPromises.push(
          airbnbAPI.searchListings({
            location: formData.destination,
            checkin: formData.checkin,
            checkout: formData.checkout,
            adults: formData.adults,
            children: formData.children,
            infants: formData.infants,
            currency: 'EUR'
          })
        );
      }

      const results = await Promise.all(searchPromises);
      setResults(results.flat());
    } catch (error) {
      console.error('Erreur de recherche:', error);
      // TODO: Ajouter une notification d'erreur
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedResults = useMemo(() => {
    return results
      .filter(accommodation => {
        const price = accommodation.baseTarifaire.minimum;
        const rating = accommodation.rating;
        const hasAmenities = filters.amenities.every(amenity =>
          accommodation.facilites.some((f: string) =>
            f.toLowerCase().includes(amenity.toLowerCase())
          )
        );

        return (
          price >= filters.minPrice &&
          price <= filters.maxPrice &&
          rating >= filters.minRating &&
          hasAmenities
        );
      })
      .sort((a, b) => {
        const multiplier = filters.sortOrder === 'asc' ? 1 : -1;
        switch (filters.sortBy) {
          case 'price':
            return (a.baseTarifaire.minimum - b.baseTarifaire.minimum) * multiplier;
          case 'rating':
            return (a.rating - b.rating) * multiplier;
          case 'reviews':
            return (a.nombreAvis - b.nombreAvis) * multiplier;
          default:
            return 0;
        }
      });
  }, [results, filters]);

  const handleCompare = (id: string) => {
    setSelectedAccommodations(prev =>
      prev.includes(id)
        ? prev.filter(accId => accId !== id)
        : [...prev, id]
    );
  };

  const handleRemoveFromComparison = (id: string) => {
    setSelectedAccommodations(prev => prev.filter(accId => accId !== id));
  };

  const handleExportPDF = () => {
    const accommodationsToCompare = filteredAndSortedResults.filter(acc =>
      selectedAccommodations.includes(acc.id)
    );
    exportComparisonToPDF(accommodationsToCompare);
  };

  const comparisonAccommodations = useMemo(() =>
    filteredAndSortedResults.filter(acc => selectedAccommodations.includes(acc.id)),
    [filteredAndSortedResults, selectedAccommodations]
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                Destination
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
                  placeholder="Ville, région, pays..."
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="checkin" className="block text-sm font-medium text-gray-700">
                Date d'arrivée
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  id="checkin"
                  value={formData.checkin}
                  onChange={(e) => setFormData({ ...formData, checkin: e.target.value })}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="checkout" className="block text-sm font-medium text-gray-700">
                Date de départ
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  id="checkout"
                  value={formData.checkout}
                  onChange={(e) => setFormData({ ...formData, checkout: e.target.value })}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                Source
              </label>
              <div className="mt-1">
                <select
                  id="source"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value as SearchFormData['source'] })}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
                >
                  <option value="all">Toutes les sources</option>
                  <option value="booking">Booking.com</option>
                  <option value="airbnb">Airbnb</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="adults" className="block text-sm font-medium text-gray-700">
                  Adultes
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="adults"
                    value={formData.adults}
                    onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) })}
                    min="1"
                    max="10"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="children" className="block text-sm font-medium text-gray-700">
                  Enfants
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="children"
                    value={formData.children}
                    onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) })}
                    min="0"
                    max="10"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="infants" className="block text-sm font-medium text-gray-700">
                  Bébés
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="infants"
                    value={formData.infants}
                    onChange={(e) => setFormData({ ...formData, infants: parseInt(e.target.value) })}
                    min="0"
                    max="5"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="rooms" className="block text-sm font-medium text-gray-700">
                  Chambres
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="rooms"
                    value={formData.rooms}
                    onChange={(e) => setFormData({ ...formData, rooms: parseInt(e.target.value) })}
                    min="1"
                    max="5"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a1a1a]"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              Filtres avancés
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#1a1a1a] hover:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a1a1a] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Recherche en cours...
                </>
              ) : (
                <>
                  <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                  Rechercher
                </>
              )}
            </button>
          </div>

          {/* Filtres avancés */}
          {showFilters && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prix minimum
                  </label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prix maximum
                  </label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Note minimum
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.5"
                    value={filters.minRating}
                    onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Trier par
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
                  >
                    <option value="price">Prix</option>
                    <option value="rating">Note</option>
                    <option value="reviews">Nombre d'avis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ordre
                  </label>
                  <select
                    value={filters.sortOrder}
                    onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value as FilterOptions['sortOrder'] })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm"
                  >
                    <option value="asc">Croissant</option>
                    <option value="desc">Décroissant</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Équipements
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {amenitiesList.map((amenity) => (
                    <label key={amenity} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity)}
                        onChange={(e) => {
                          const newAmenities = e.target.checked
                            ? [...filters.amenities, amenity]
                            : filters.amenities.filter(a => a !== amenity);
                          setFilters({ ...filters, amenities: newAmenities });
                        }}
                        className="rounded border-gray-300 text-[#1a1a1a] focus:ring-[#1a1a1a]"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Boutons de vue */}
      {filteredAndSortedResults.length > 0 && (
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setViewMode('list')}
            className={`inline-flex items-center px-4 py-2 border rounded-md ${
              viewMode === 'list'
                ? 'bg-[#1a1a1a] text-white'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
            Liste
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`inline-flex items-center px-4 py-2 border rounded-md ${
              viewMode === 'map'
                ? 'bg-[#1a1a1a] text-white'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <MapIcon className="h-5 w-5 mr-2" />
            Carte
          </button>
          <button
            onClick={() => setViewMode('comparison')}
            className={`inline-flex items-center px-4 py-2 border rounded-md ${
              viewMode === 'comparison'
                ? 'bg-[#1a1a1a] text-white'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ArrowsRightLeftIcon className="h-5 w-5 mr-2" />
            Comparaison
          </button>
        </div>
      )}

      {/* Résultats selon le mode de vue */}
      {filteredAndSortedResults.length > 0 && (
        <div className="mt-8">
          {viewMode === 'list' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedResults.map((accommodation) => (
                <div
                  key={accommodation.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={accommodation.photos[0]}
                      alt={accommodation.nom}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{accommodation.nom}</h3>
                    <p className="text-sm text-gray-500 mt-1">{accommodation.adresse.ville}, {accommodation.adresse.pays}</p>
                    <div className="mt-2 flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-sm text-gray-600">{accommodation.rating} ({accommodation.nombreAvis} avis)</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-lg font-semibold text-gray-900">
                        {accommodation.baseTarifaire.minimum} {accommodation.baseTarifaire.devise}
                      </span>
                      <span className="text-sm text-gray-500"> / nuit</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => window.open(accommodation.contact.siteWeb, '_blank')}
                        className="text-sm font-medium text-[#1a1a1a] hover:text-[#2a2a2a]"
                      >
                        Voir l'offre
                      </button>
                      <button
                        onClick={() => handleCompare(accommodation.id)}
                        className={`text-sm font-medium px-3 py-1 rounded ${
                          selectedAccommodations.includes(accommodation.id)
                            ? 'bg-[#1a1a1a] text-white'
                            : 'text-[#1a1a1a] hover:bg-gray-100'
                        }`}
                      >
                        {selectedAccommodations.includes(accommodation.id)
                          ? 'Retirer'
                          : 'Comparer'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'map' && (
            <AccommodationMap
              accommodations={filteredAndSortedResults}
              center={[
                filteredAndSortedResults[0]?.adresse.coordonnees.lat || 48.8566,
                filteredAndSortedResults[0]?.adresse.coordonnees.lng || 2.3522
              ]}
            />
          )}

          {viewMode === 'comparison' && (
            <AccommodationComparison
              accommodations={comparisonAccommodations}
              onRemove={handleRemoveFromComparison}
              onExport={handleExportPDF}
            />
          )}
        </div>
      )}
    </div>
  );
}; 