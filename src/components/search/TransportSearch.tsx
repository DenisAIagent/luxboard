import React, { useState, useEffect, useRef } from 'react';
import { transportAPI } from '../../services/apis/transportApi';
import { TransportError } from '../../services/apis/errors/TransportError';
import { Loader2, Star, Clock, Trash2, Map, Satellite, Moon, Sun, ZoomIn, ZoomOut, Maximize2, Filter, AlertTriangle, Route, Cloud, Wifi, Users } from 'lucide-react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { geocodingService } from '../../services/geocoding/geocodingService';

// Correction pour les icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface SearchFormData {
  departure: string;
  arrival: string;
  date: string;
  passengers: number;
  type: 'train' | 'plane' | 'bus';
}

interface FilterOptions {
  maxPrice: number;
  maxStops: number;
  sortBy: 'price' | 'duration' | 'departure';
  sortOrder: 'asc' | 'desc';
}

interface RoutePoint {
  lat: number;
  lon: number;
  name: string;
  type: 'departure' | 'arrival' | 'stop';
}

interface Route {
  points: RoutePoint[];
  distance: number;
  duration: number;
}

interface TrafficInfo {
  level: 'low' | 'medium' | 'high';
  delay: number;
  description: string;
}

interface AlternativeRoute {
  points: RoutePoint[];
  distance: number;
  duration: number;
  type: 'fastest' | 'scenic' | 'economic';
}

interface WeatherInfo {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  description: string;
}

interface StationServices {
  wifi: boolean;
  parking: boolean;
  restaurant: boolean;
  accessibility: boolean;
}

interface StationStats {
  averageOccupancy: number;
  peakHours: string[];
  popularity: 'low' | 'medium' | 'high';
}

// Composant pour changer la vue de la carte
const MapViewToggle: React.FC<{ isSatellite: boolean; isDarkMode: boolean }> = ({ isSatellite, isDarkMode }) => {
  const map = useMap();

  useEffect(() => {
    const tilePane = map.getPane('tilePane');
    if (tilePane) {
      const layers = tilePane.getElementsByClassName('leaflet-tile-pane');
      if (layers.length > 0) {
        const layer = layers[0] as HTMLElement;
        layer.innerHTML = '';
        
        if (isSatellite) {
          L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          }).addTo(map);
        } else if (isDarkMode) {
          L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          }).addTo(map);
        } else {
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
        }
      }
    }
  }, [isSatellite, isDarkMode, map]);

  return null;
};

// Composant pour l'animation du trajet
const AnimatedPolyline: React.FC<{
  positions: [number, number][];
  color: string;
  weight: number;
  opacity: number;
}> = ({ positions, color, weight, opacity }) => {
  const map = useMap();
  const polylineRef = useRef<L.Polyline | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (polylineRef.current) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev + 1) % 100);
      }, 50);

      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (positions.length > 1) {
      const latlngs = positions.map(([lat, lng]) => L.latLng(lat, lng));
      const distance = latlngs.reduce((acc, curr, i) => {
        if (i === 0) return 0;
        return acc + curr.distanceTo(latlngs[i - 1]);
      }, 0);

      const animatedLatlngs = latlngs.map((latlng, i) => {
        if (i === 0) return latlng;
        const prevLatlng = latlngs[i - 1];
        const segmentDistance = latlng.distanceTo(prevLatlng);
        const segmentProgress = Math.min(1, (progress * distance / 100) / segmentDistance);
        return L.latLng(
          prevLatlng.lat + (latlng.lat - prevLatlng.lat) * segmentProgress,
          prevLatlng.lng + (latlng.lng - prevLatlng.lng) * segmentProgress
        );
      });

      if (polylineRef.current) {
        polylineRef.current.setLatLngs(animatedLatlngs);
      } else {
        polylineRef.current = L.polyline(animatedLatlngs, {
          color,
          weight,
          opacity,
          dashArray: '10, 10',
          lineJoin: 'round'
        }).addTo(map);
      }
    }
  }, [positions, progress, map, color, weight, opacity]);

  return null;
};

// Composant pour les contrôles de zoom personnalisés
const CustomZoomControl: React.FC = () => {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const handleFitBounds = () => {
    const bounds = map.getBounds();
    map.fitBounds(bounds, { padding: [50, 50] });
  };

  return (
    <div className="absolute bottom-4 right-4 z-[1000] bg-white rounded-lg shadow-md p-2 flex flex-col gap-2">
      <button
        onClick={handleZoomIn}
        className="btn btn-sm btn-ghost p-1"
        title="Zoom avant"
      >
        <ZoomIn className="h-4 w-4" />
      </button>
      <button
        onClick={handleZoomOut}
        className="btn btn-sm btn-ghost p-1"
        title="Zoom arrière"
      >
        <ZoomOut className="h-4 w-4" />
      </button>
      <button
        onClick={handleFitBounds}
        className="btn btn-sm btn-ghost p-1"
        title="Ajuster la vue"
      >
        <Maximize2 className="h-4 w-4" />
      </button>
    </div>
  );
};

// Composant pour l'animation de transition
const TransitionAnimation: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const map = useMap();

  useEffect(() => {
    if (isVisible) {
      map.flyTo(map.getCenter(), map.getZoom(), {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [isVisible, map]);

  return null;
};

// Composant pour les informations météorologiques
const WeatherInfo: React.FC<{ weather: WeatherInfo }> = ({ weather }) => {
  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun className="h-4 w-4 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-4 w-4 text-gray-500" />;
      case 'rainy':
        return <Cloud className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      {getWeatherIcon()}
      <span>{weather.temperature}°C - {weather.description}</span>
    </div>
  );
};

// Composant pour les services de la station
const StationServices: React.FC<{ services: StationServices }> = ({ services }) => {
  return (
    <div className="mt-2 space-y-1">
      <div className="text-xs font-medium text-gray-500">Services disponibles :</div>
      <div className="flex flex-wrap gap-2">
        {services.wifi && (
          <div className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
            <Wifi className="h-3 w-3" />
            <span>WiFi</span>
          </div>
        )}
        {services.parking && (
          <div className="flex items-center gap-1 text-xs bg-green-50 text-green-600 px-2 py-1 rounded">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3" />
            </svg>
            <span>Parking</span>
          </div>
        )}
        {services.restaurant && (
          <div className="flex items-center gap-1 text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            </svg>
            <span>Restaurant</span>
          </div>
        )}
        {services.accessibility && (
          <div className="flex items-center gap-1 text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 4.75v14.5M4.75 12h14.5" />
            </svg>
            <span>Accessibilité</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Composant pour les statistiques de fréquentation
const StationStats: React.FC<{ stats: StationStats }> = ({ stats }) => {
  const getPopularityColor = () => {
    switch (stats.popularity) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
    }
  };

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2 text-sm">
        <Users className={`h-4 w-4 ${getPopularityColor()}`} />
        <span>Fréquentation : {stats.averageOccupancy}%</span>
      </div>
      <div className="mt-1 text-xs text-gray-500">
        Heures de pointe : {stats.peakHours.join(', ')}
      </div>
    </div>
  );
};

// Composant pour l'infobulle détaillée
const DetailedPopup: React.FC<{ point: RoutePoint; route: Route }> = ({ point, route }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Fonction pour formater la durée
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}min`;
  };

  // Fonction pour formater la distance
  const formatDistance = (meters: number): string => {
    const kilometers = meters / 1000;
    return `${kilometers.toFixed(1)} km`;
  };

  // Simuler les données météorologiques
  const weather: WeatherInfo = {
    temperature: Math.floor(Math.random() * 30),
    condition: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)] as WeatherInfo['condition'],
    description: 'Ensoleillé'
  };

  // Simuler les services de la station
  const services: StationServices = {
    wifi: Math.random() > 0.3,
    parking: Math.random() > 0.5,
    restaurant: Math.random() > 0.7,
    accessibility: Math.random() > 0.2
  };

  // Simuler les statistiques de fréquentation
  const stats: StationStats = {
    averageOccupancy: Math.floor(Math.random() * 100),
    peakHours: ['8h-9h', '17h-18h'],
    popularity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as StationStats['popularity']
  };

  return (
    <div className="p-2 min-w-[200px]">
      <h3 className="font-bold mb-2">
        {point.type === 'departure' ? 'Départ' : point.type === 'arrival' ? 'Arrivée' : 'Arrêt'} : {point.name}
      </h3>
      <div className="text-sm">
        <p>Coordonnées : {point.lat.toFixed(4)}, {point.lon.toFixed(4)}</p>
        <WeatherInfo weather={weather} />
        <StationServices services={services} />
        <StationStats stats={stats} />
        {point.type === 'departure' && (
          <div className="mt-2">
            <p>Distance totale : {formatDistance(route.distance)}</p>
            <p>Durée estimée : {formatDuration(route.duration)}</p>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-2 text-blue-600 hover:text-blue-800 text-xs"
            >
              {showDetails ? 'Masquer les détails' : 'Afficher les détails'}
            </button>
            {showDetails && (
              <div className="mt-2 p-2 bg-gray-50 rounded">
                <p>Nombre d'arrêts : {route.points.filter(p => p.type === 'stop').length}</p>
                <p>Vitesse moyenne : {(route.distance / route.duration * 3.6).toFixed(1)} km/h</p>
                <div className="mt-2">
                  <div className="h-2 bg-gray-200 rounded">
                    <div
                      className="h-2 bg-blue-600 rounded"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>0 km</span>
                    <span>{formatDistance(route.distance)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Composant pour les filtres de trajet
const RouteFilters: React.FC<{
  onFilterChange: (filters: { type: string[]; traffic: boolean }) => void;
}> = ({ onFilterChange }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['train', 'bus', 'plane']);
  const [showTraffic, setShowTraffic] = useState(false);

  const handleTypeChange = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(newTypes);
    onFilterChange({ type: newTypes, traffic: showTraffic });
  };

  const handleTrafficChange = () => {
    const newShowTraffic = !showTraffic;
    setShowTraffic(newShowTraffic);
    onFilterChange({ type: selectedTypes, traffic: newShowTraffic });
  };

  return (
    <div className="absolute top-2 left-2 z-[1000] bg-white rounded-lg shadow-md p-2">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filtres</span>
      </div>
      <div className="space-y-2">
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedTypes.includes('train')}
              onChange={() => handleTypeChange('train')}
              className="checkbox checkbox-sm"
            />
            Train
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedTypes.includes('bus')}
              onChange={() => handleTypeChange('bus')}
              className="checkbox checkbox-sm"
            />
            Bus
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedTypes.includes('plane')}
              onChange={() => handleTypeChange('plane')}
              className="checkbox checkbox-sm"
            />
            Avion
          </label>
        </div>
        <div className="pt-2 border-t">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showTraffic}
              onChange={handleTrafficChange}
              className="checkbox checkbox-sm"
            />
            <AlertTriangle className="h-4 w-4" />
            Trafic en temps réel
          </label>
        </div>
      </div>
    </div>
  );
};

// Composant pour les itinéraires alternatifs
const AlternativeRoutes: React.FC<{
  routes: AlternativeRoute[];
  onSelectRoute: (route: AlternativeRoute) => void;
}> = ({ routes, onSelectRoute }) => {
  // Fonction pour formater la durée
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}min`;
  };

  // Fonction pour formater la distance
  const formatDistance = (meters: number): string => {
    const kilometers = meters / 1000;
    return `${kilometers.toFixed(1)} km`;
  };

  return (
    <div className="absolute bottom-4 left-2 z-[1000] bg-white rounded-lg shadow-md p-2 max-w-[200px]">
      <div className="flex items-center gap-2 mb-2">
        <Route className="h-4 w-4" />
        <span className="text-sm font-medium">Itinéraires alternatifs</span>
      </div>
      <div className="space-y-2">
        {routes.map((route, index) => (
          <button
            key={index}
            onClick={() => onSelectRoute(route)}
            className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm"
          >
            <div className="font-medium">
              {route.type === 'fastest' ? 'Le plus rapide' :
               route.type === 'scenic' ? 'Pittoresque' : 'Économique'}
            </div>
            <div className="text-xs text-gray-500">
              {formatDistance(route.distance)} • {formatDuration(route.duration)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export const TransportSearch: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [formData, setFormData] = useState<SearchFormData>({
    departure: '',
    arrival: '',
    date: '',
    passengers: 1,
    type: 'train'
  });
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [history, setHistory] = useState<SearchFormData[]>([]);
  const [route, setRoute] = useState<Route | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([46.603354, 1.888334]); // Centre de la France
  const [mapZoom, setMapZoom] = useState(6);
  const [isSatellite, setIsSatellite] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [trafficInfo, setTrafficInfo] = useState<TrafficInfo | null>(null);
  const [alternativeRoutes, setAlternativeRoutes] = useState<AlternativeRoute[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [routeFilters, setRouteFilters] = useState({ type: ['train', 'bus', 'plane'], traffic: false });

  const [filters, setFilters] = useState<FilterOptions>({
    maxPrice: 1000,
    maxStops: 5,
    sortBy: 'price',
    sortOrder: 'asc'
  });

  // Charger les favoris et l'historique depuis localStorage au montage du composant
  useEffect(() => {
    const storedFavorites = localStorage.getItem('transportFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    const storedHistory = localStorage.getItem('transportHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'passengers' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      // Récupérer les coordonnées et calculer l'itinéraire
      const routeData = await geocodingService.getRouteCoordinates(
        formData.departure,
        formData.arrival
      );
      setRoute(routeData);

      // Calculer le centre de la carte
      const bounds = routeData.points.reduce(
        (acc, point) => ({
          minLat: Math.min(acc.minLat, point.lat),
          maxLat: Math.max(acc.maxLat, point.lat),
          minLon: Math.min(acc.minLon, point.lon),
          maxLon: Math.max(acc.maxLon, point.lon),
        }),
        {
          minLat: 90,
          maxLat: -90,
          minLon: 180,
          maxLon: -180,
        }
      );

      const centerLat = (bounds.minLat + bounds.maxLat) / 2;
      const centerLon = (bounds.minLon + bounds.maxLon) / 2;
      setMapCenter([centerLat, centerLon]);

      // Ajuster le zoom en fonction de la distance
      const latDiff = bounds.maxLat - bounds.minLat;
      const lonDiff = bounds.maxLon - bounds.minLon;
      const maxDiff = Math.max(latDiff, lonDiff);
      setMapZoom(Math.min(8, Math.max(4, Math.floor(10 - maxDiff * 10))));

      const res = await transportAPI.searchTransports(formData);
      setResults(res);
      if (res.length === 0) {
        setError('Aucun résultat trouvé pour votre recherche.');
      }
      // Ajouter la recherche à l'historique
      const newHistory = [formData, ...history.slice(0, 9)];
      setHistory(newHistory);
      localStorage.setItem('transportHistory', JSON.stringify(newHistory));
    } catch (err: any) {
      if (err instanceof TransportError) {
        setError(err.message);
      } else {
        setError('Une erreur inattendue est survenue.');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (result: any) => {
    const isFavorite = favorites.some(fav => fav.id === result.id);
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== result.id);
    } else {
      newFavorites = [...favorites, result];
    }
    setFavorites(newFavorites);
    localStorage.setItem('transportFavorites', JSON.stringify(newFavorites));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('transportHistory');
  };

  const loadHistoryItem = (item: SearchFormData) => {
    setFormData(item);
  };

  const filteredAndSortedResults = results
    .filter(result => {
      return (
        result.price.amount <= filters.maxPrice &&
        result.details.stops <= filters.maxStops
      );
    })
    .sort((a, b) => {
      const multiplier = filters.sortOrder === 'asc' ? 1 : -1;
      switch (filters.sortBy) {
        case 'price':
          return (a.price.amount - b.price.amount) * multiplier;
        case 'duration':
          return (a.duration.localeCompare(b.duration)) * multiplier;
        case 'departure':
          return (a.departure.time.localeCompare(b.departure.time)) * multiplier;
        default:
          return 0;
      }
    });

  const handleMarkerClick = (lat: number, lon: number) => {
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lon], 12);
    }
  };

  // Simuler la récupération des informations de trafic
  useEffect(() => {
    if (routeFilters.traffic && route) {
      // Simuler un délai de trafic aléatoire
      const delay = Math.floor(Math.random() * 30);
      const level = delay < 10 ? 'low' : delay < 20 ? 'medium' : 'high';
      setTrafficInfo({
        level,
        delay,
        description: `Délai estimé : ${delay} minutes`
      });
    } else {
      setTrafficInfo(null);
    }
  }, [routeFilters.traffic, route]);

  // Simuler la génération d'itinéraires alternatifs
  useEffect(() => {
    if (route) {
      const alternatives: AlternativeRoute[] = [
        {
          ...route,
          type: 'fastest',
          duration: route.duration * 0.9,
          distance: route.distance * 1.1
        },
        {
          ...route,
          type: 'scenic',
          duration: route.duration * 1.2,
          distance: route.distance * 1.3
        },
        {
          ...route,
          type: 'economic',
          duration: route.duration * 1.1,
          distance: route.distance * 0.9
        }
      ];
      setAlternativeRoutes(alternatives);
    }
  }, [route]);

  const handleFilterChange = (filters: { type: string[]; traffic: boolean }) => {
    setRouteFilters(filters);
  };

  const handleSelectAlternativeRoute = (route: AlternativeRoute) => {
    setSelectedRoute(route);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="departure"
              value={formData.departure}
              onChange={handleChange}
              placeholder="Départ"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="arrival"
              value={formData.arrival}
              onChange={handleChange}
              placeholder="Arrivée"
              className="input input-bordered w-full"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <input
              type="number"
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              min={1}
              className="input input-bordered w-full"
              required
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input input-bordered w-full"
            >
              <option value="train">Train</option>
              <option value="plane">Avion</option>
              <option value="bus">Bus</option>
            </select>
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
              className="btn btn-primary w-full flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : null}
              Rechercher
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    Escales maximum
                  </label>
                  <input
                    type="number"
                    value={filters.maxStops}
                    onChange={(e) => setFilters({ ...filters, maxStops: Number(e.target.value) })}
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
                    <option value="duration">Durée</option>
                    <option value="departure">Heure de départ</option>
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
            </div>
          )}
        </form>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded shadow">
          {error}
        </div>
      )}

      {favorites.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Favoris</h2>
          <div className="space-y-4">
            {favorites.map((fav) => (
              <div key={fav.id} className="bg-gray-50 rounded shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-bold text-lg mb-1">{fav.provider} — {fav.type === 'plane' ? 'Avion' : fav.type === 'train' ? 'Train' : 'Bus'}</div>
                  <div className="text-sm text-gray-600">{fav.departure.station} → {fav.arrival.station}</div>
                  <div className="text-xs text-gray-500">Départ : {fav.departure.date} {fav.departure.time} | Arrivée : {fav.arrival.date} {fav.arrival.time}</div>
                  <div className="text-xs text-gray-500">Durée : {fav.duration} | Prix : {fav.price.amount} {fav.price.currency}</div>
                  <div className="text-xs text-gray-500">Nombre d'arrêts : {fav.details.stops}</div>
                </div>
                <div className="flex items-center mt-2 md:mt-0">
                  <button
                    onClick={() => toggleFavorite(fav)}
                    className="btn btn-outline btn-sm mr-2"
                  >
                    <Star className="h-4 w-4" />
                  </button>
                  <a
                    href={fav.details.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    Réserver
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Historique des recherches</h2>
            <button
              onClick={clearHistory}
              className="btn btn-outline btn-sm"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            {history.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded shadow p-3 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                onClick={() => loadHistoryItem(item)}
              >
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{item.departure} → {item.arrival} ({item.type})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && results.length > 0 && !error && (
        <div className="mt-6 space-y-4">
          {filteredAndSortedResults.map((r) => (
            <div key={r.id} className="bg-gray-50 rounded shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-bold text-lg mb-1">{r.provider} — {r.type === 'plane' ? 'Avion' : r.type === 'train' ? 'Train' : 'Bus'}</div>
                <div className="text-sm text-gray-600">{r.departure.station} → {r.arrival.station}</div>
                <div className="text-xs text-gray-500">Départ : {r.departure.date} {r.departure.time} | Arrivée : {r.arrival.date} {r.arrival.time}</div>
                <div className="text-xs text-gray-500">Durée : {r.duration} | Prix : {r.price.amount} {r.price.currency}</div>
                <div className="text-xs text-gray-500">Nombre d'arrêts : {r.details.stops}</div>
              </div>
              <div className="flex items-center mt-2 md:mt-0">
                <button
                  onClick={() => toggleFavorite(r)}
                  className="btn btn-outline btn-sm mr-2"
                >
                  <Star className="h-4 w-4" />
                </button>
                <a
                  href={r.details.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  Réserver
                </a>
              </div>
              <div className="mt-4 md:mt-0 w-full md:w-1/2 h-64 relative">
                <div className="absolute top-2 right-2 z-[1000] bg-white rounded-lg shadow-md p-2 flex gap-2">
                  <button
                    onClick={() => setIsSatellite(!isSatellite)}
                    className="btn btn-sm btn-ghost"
                    title={isSatellite ? "Vue standard" : "Vue satellite"}
                  >
                    {isSatellite ? <Map className="h-4 w-4" /> : <Satellite className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="btn btn-sm btn-ghost"
                    title={isDarkMode ? "Mode clair" : "Mode sombre"}
                  >
                    {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>
                </div>
                <MapContainer
                  center={mapCenter}
                  zoom={mapZoom}
                  style={{ height: '100%', width: '100%' }}
                  ref={mapRef}
                  whenReady={() => {
                    setIsMapVisible(true);
                  }}
                >
                  <MapViewToggle isSatellite={isSatellite} isDarkMode={isDarkMode} />
                  <CustomZoomControl />
                  <RouteFilters onFilterChange={handleFilterChange} />
                  <TransitionAnimation isVisible={isMapVisible} />
                  {selectedRoute && (
                    <>
                      {selectedRoute.points.map((point, index) => (
                        <Marker
                          key={index}
                          position={[point.lat, point.lon]}
                          icon={L.divIcon({
                            className: `custom-marker ${point.type}`,
                            html: `<div class="marker-${point.type}"></div>`,
                            iconSize: [20, 20]
                          })}
                          eventHandlers={{
                            click: () => handleMarkerClick(point.lat, point.lon)
                          }}
                        >
                          <Popup>
                            <DetailedPopup point={point} route={selectedRoute} />
                          </Popup>
                        </Marker>
                      ))}
                      <AnimatedPolyline
                        positions={selectedRoute.points.map(point => [point.lat, point.lon])}
                        color="blue"
                        weight={3}
                        opacity={0.7}
                      />
                    </>
                  )}
                  {trafficInfo && (
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-[1000] bg-white rounded-lg shadow-md p-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`h-4 w-4 ${
                          trafficInfo.level === 'high' ? 'text-red-500' :
                          trafficInfo.level === 'medium' ? 'text-yellow-500' :
                          'text-green-500'
                        }`} />
                        <span className="text-sm">{trafficInfo.description}</span>
                      </div>
                    </div>
                  )}
                  {alternativeRoutes.length > 0 && (
                    <AlternativeRoutes
                      routes={alternativeRoutes}
                      onSelectRoute={handleSelectAlternativeRoute}
                    />
                  )}
                </MapContainer>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransportSearch; 