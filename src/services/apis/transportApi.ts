import axios, { AxiosInstance } from 'axios';
import { TransportError, TransportErrorType } from './errors/TransportError';

export interface TransportConfig {
  sncfApiKey: string;
  sncfApiUrl: string;
  amadeusClientId: string;
  amadeusClientSecret: string;
  amadeusApiUrl: string;
  flixbusApiKey: string;
  flixbusApiUrl: string;
}

export interface TransportSearchParams {
  departure: string;
  arrival: string;
  date: string;
  passengers: number;
  type: 'train' | 'plane' | 'bus';
}

export interface TransportResult {
  id: string;
  type: 'train' | 'plane' | 'bus';
  provider: string;
  departure: {
    station: string;
    time: string;
    date: string;
  };
  arrival: {
    station: string;
    time: string;
    date: string;
  };
  duration: string;
  price: {
    amount: number;
    currency: string;
  };
  details: {
    stops: number;
    class?: string;
    number: string;
    operator: string;
    bookingUrl: string;
  };
}

class TransportAPI {
  private sncfClient: AxiosInstance;
  private amadeusClient: AxiosInstance;
  private flixbusClient: AxiosInstance;
  private amadeusToken: string = '';
  private amadeusTokenExpiresAt: number = 0;

  constructor(config: TransportConfig) {
    this.sncfClient = axios.create({
      baseURL: config.sncfApiUrl,
      headers: {
        'Authorization': `Bearer ${config.sncfApiKey}`
      }
    });

    this.amadeusClient = axios.create({
      baseURL: config.amadeusApiUrl
    });

    this.flixbusClient = axios.create({
      baseURL: config.flixbusApiUrl,
      headers: {
        'Authorization': `Bearer ${config.flixbusApiKey}`
      }
    });
  }

  async searchTransports(params: TransportSearchParams): Promise<TransportResult[]> {
    try {
      // Validation des paramètres
      if (!params.departure || !params.arrival || !params.date) {
        throw TransportError.fromValidationError('Les paramètres de recherche sont incomplets');
      }

      if (params.passengers < 1) {
        throw TransportError.fromValidationError('Le nombre de passagers doit être supérieur à 0');
      }

      let results: TransportResult[] = [];

      switch (params.type) {
        case 'train':
          results = await this.searchTrains(params);
          break;
        case 'plane':
          results = await this.searchFlights(params);
          break;
        case 'bus':
          results = await this.searchBuses(params);
          break;
        default:
          throw TransportError.fromValidationError(`Type de transport non supporté: ${params.type}`);
      }

      return results;
    } catch (error) {
      if (error instanceof TransportError) {
        throw error;
      }
      throw TransportError.fromApiError(error, params.type);
    }
  }

  private async searchTrains(params: TransportSearchParams): Promise<TransportResult[]> {
    try {
      const response = await this.sncfClient.get('/coverage/sncf/journeys', {
        params: {
          from: params.departure,
          to: params.arrival,
          datetime: params.date,
          count: 10
        }
      });

      return this.transformTrainData(response.data);
    } catch (error) {
      if (error instanceof TransportError) throw error;
      throw TransportError.fromApiError(error, 'SNCF');
    }
  }

  private async searchFlights(params: TransportSearchParams): Promise<TransportResult[]> {
    try {
      const token = await this.getAmadeusToken();
      const response = await this.amadeusClient.get('/shopping/flight-offers', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          originLocationCode: params.departure,
          destinationLocationCode: params.arrival,
          departureDate: params.date,
          adults: params.passengers,
          max: 10
        }
      });

      return this.transformFlightData(response.data);
    } catch (error) {
      if (error instanceof TransportError) throw error;
      throw TransportError.fromApiError(error, 'Amadeus');
    }
  }

  private async searchBuses(params: TransportSearchParams): Promise<TransportResult[]> {
    try {
      const response = await this.flixbusClient.get('/search', {
        params: {
          from: params.departure,
          to: params.arrival,
          date: params.date,
          passengers: params.passengers
        }
      });

      return this.transformBusData(response.data);
    } catch (error) {
      if (error instanceof TransportError) throw error;
      throw TransportError.fromApiError(error, 'Flixbus');
    }
  }

  private async getAmadeusToken(): Promise<string> {
    try {
      // Vérifier si le token est toujours valide
      if (this.amadeusToken && Date.now() < this.amadeusTokenExpiresAt) {
        return this.amadeusToken;
      }

      const response = await axios.post(
        `${process.env.AMADEUS_API_URL}/v1/security/oauth2/token`,
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: process.env.AMADEUS_CLIENT_ID!,
          client_secret: process.env.AMADEUS_CLIENT_SECRET!
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      this.amadeusToken = response.data.access_token;
      this.amadeusTokenExpiresAt = Date.now() + (response.data.expires_in * 1000);
      return this.amadeusToken;
    } catch (error) {
      throw TransportError.fromApiError(error, 'Amadeus');
    }
  }

  private transformTrainData(data: any): TransportResult[] {
    if (!data.journeys) {
      throw TransportError.fromValidationError('Format de réponse SNCF invalide');
    }

    return data.journeys.map((journey: any) => ({
      id: journey.id,
      type: 'train',
      provider: journey.train_operator || 'SNCF',
      departure: {
        station: journey.from.name,
        time: journey.departure_date_time,
        date: journey.departure_date_time.split('T')[0]
      },
      arrival: {
        station: journey.to.name,
        time: journey.arrival_date_time,
        date: journey.arrival_date_time.split('T')[0]
      },
      duration: this.calculateDuration(journey.departure_date_time, journey.arrival_date_time),
      price: {
        amount: journey.fare.total,
        currency: 'EUR'
      },
      details: {
        stops: typeof journey.nb_transfers === 'number' ? journey.nb_transfers : 0,
        class: journey.comfort_class,
        number: journey.train_number,
        operator: journey.train_operator,
        bookingUrl: journey.booking_url
      }
    }));
  }

  private transformFlightData(data: any): TransportResult[] {
    if (!data.data) {
      throw TransportError.fromValidationError('Format de réponse Amadeus invalide');
    }

    return data.data.map((offer: any) => {
      const segment = offer.itineraries[0].segments[0];
      return {
        id: offer.id,
        type: 'plane',
        provider: segment.carrierCode,
        departure: {
          station: segment.departure.iataCode,
          time: segment.departure.at,
          date: segment.departure.at.split('T')[0]
        },
        arrival: {
          station: segment.arrival.iataCode,
          time: segment.arrival.at,
          date: segment.arrival.at.split('T')[0]
        },
        duration: offer.itineraries[0].duration,
        price: {
          amount: parseFloat(offer.price.total),
          currency: offer.price.currency
        },
        details: {
          stops: offer.itineraries[0].segments.length - 1,
          class: offer.travelerPricings[0].fareDetailsBySegment[0].cabin,
          number: segment.number,
          operator: segment.carrierCode,
          bookingUrl: offer.bookingUrl
        }
      };
    });
  }

  private transformBusData(data: any): TransportResult[] {
    if (!data.trips) {
      throw TransportError.fromValidationError('Format de réponse Flixbus invalide');
    }

    return data.trips.map((trip: any) => ({
      id: trip.id,
      type: 'bus',
      provider: trip.operator,
      departure: {
        station: trip.departure.station,
        time: trip.departure.time,
        date: trip.departure.date
      },
      arrival: {
        station: trip.arrival.station,
        time: trip.arrival.time,
        date: trip.arrival.date
      },
      duration: trip.duration,
      price: {
        amount: trip.price.amount,
        currency: trip.price.currency
      },
      details: {
        stops: Array.isArray(trip.stops) ? trip.stops.length : 0,
        number: trip.bus_number,
        operator: trip.operator,
        bookingUrl: trip.booking_url
      }
    }));
  }

  private calculateDuration(departure: string, arrival: string): string {
    const start = new Date(departure);
    const end = new Date(arrival);
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h${minutes.toString().padStart(2, '0')}`;
  }
}

// Configuration et export de l'instance
const config: TransportConfig = {
  sncfApiKey: process.env.SNCF_API_KEY!,
  sncfApiUrl: process.env.SNCF_API_URL!,
  amadeusClientId: process.env.AMADEUS_CLIENT_ID!,
  amadeusClientSecret: process.env.AMADEUS_CLIENT_SECRET!,
  amadeusApiUrl: process.env.AMADEUS_API_URL!,
  flixbusApiKey: process.env.FLIXBUS_API_KEY!,
  flixbusApiUrl: process.env.FLIXBUS_API_URL!
};

export const transportAPI = new TransportAPI(config); 