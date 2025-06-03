import axios from 'axios';

interface Coordinates {
  lat: number;
  lon: number;
}

interface RoutePoint extends Coordinates {
  name: string;
  type: 'departure' | 'arrival' | 'stop';
}

interface Route {
  points: RoutePoint[];
  distance: number;
  duration: number;
}

class GeocodingService {
  private static instance: GeocodingService;
  private readonly nominatimUrl = 'https://nominatim.openstreetmap.org/search';
  private readonly osrmUrl = 'https://router.project-osrm.org/route/v1';
  private readonly userAgent = 'LuxBoard/1.0';

  private constructor() {}

  public static getInstance(): GeocodingService {
    if (!GeocodingService.instance) {
      GeocodingService.instance = new GeocodingService();
    }
    return GeocodingService.instance;
  }

  public async getCoordinates(city: string): Promise<Coordinates> {
    try {
      const response = await axios.get(this.nominatimUrl, {
        params: {
          q: city,
          format: 'json',
          limit: 1
        },
        headers: {
          'User-Agent': this.userAgent
        }
      });

      if (!response.data || response.data.length === 0) {
        throw new Error(`Aucune coordonnée trouvée pour la ville: ${city}`);
      }

      return {
        lat: parseFloat(response.data[0].lat),
        lon: parseFloat(response.data[0].lon)
      };
    } catch (error) {
      console.error('Erreur lors du géocodage:', error);
      throw new Error(`Impossible de géocoder la ville: ${city}`);
    }
  }

  private async getRouteBetweenPoints(start: Coordinates, end: Coordinates): Promise<Route> {
    try {
      const response = await axios.get(`${this.osrmUrl}/driving/${start.lon},${start.lat};${end.lon},${end.lat}`, {
        params: {
          overview: 'full',
          geometries: 'geojson'
        }
      });

      if (!response.data || !response.data.routes || response.data.routes.length === 0) {
        throw new Error('Impossible de calculer l\'itinéraire');
      }

      const route = response.data.routes[0];
      const coordinates = route.geometry.coordinates.map((coord: number[]) => ({
        lat: coord[1],
        lon: coord[0]
      }));

      return {
        points: [
          { ...start, name: 'Départ', type: 'departure' as const },
          { ...end, name: 'Arrivée', type: 'arrival' as const }
        ],
        distance: route.distance,
        duration: route.duration
      };
    } catch (error) {
      console.error('Erreur lors du calcul de l\'itinéraire:', error);
      throw new Error('Impossible de calculer l\'itinéraire');
    }
  }

  public async getRouteCoordinates(
    departure: string,
    arrival: string,
    stops: string[] = []
  ): Promise<Route> {
    try {
      // Récupérer les coordonnées de tous les points
      const allPoints = [departure, ...stops, arrival];
      const coordinates = await Promise.all(
        allPoints.map(async (point, index) => {
          const coords = await this.getCoordinates(point);
          const type = index === 0 ? 'departure' as const : 
                      index === allPoints.length - 1 ? 'arrival' as const : 
                      'stop' as const;
          return {
            ...coords,
            name: point,
            type
          };
        })
      );

      // Calculer les itinéraires entre chaque point
      const routeSegments = [];
      for (let i = 0; i < coordinates.length - 1; i++) {
        const segment = await this.getRouteBetweenPoints(coordinates[i], coordinates[i + 1]);
        routeSegments.push(segment);
      }

      // Combiner les segments
      const combinedRoute: Route = {
        points: coordinates,
        distance: routeSegments.reduce((sum, segment) => sum + segment.distance, 0),
        duration: routeSegments.reduce((sum, segment) => sum + segment.duration, 0)
      };

      return combinedRoute;
    } catch (error) {
      console.error('Erreur lors de la récupération des coordonnées du trajet:', error);
      throw error;
    }
  }
}

export const geocodingService = GeocodingService.getInstance(); 