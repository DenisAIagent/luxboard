import axios from 'axios';
import { transportAPI } from '../transportApi';
import { TransportError, TransportErrorType } from '../errors/TransportError';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TransportAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Réinitialiser les clients Axios
    (transportAPI as any).sncfClient = {
      get: jest.fn()
    };
    (transportAPI as any).amadeusClient = {
      get: jest.fn()
    };
    (transportAPI as any).flixbusClient = {
      get: jest.fn()
    };
  });

  describe('searchTransports', () => {
    const validParams = {
      departure: 'Paris',
      arrival: 'Lyon',
      date: '2024-03-20',
      passengers: 1,
      type: 'train' as const
    };

    it('devrait lancer une erreur de validation si les paramètres sont incomplets', async () => {
      const invalidParams = { ...validParams, departure: '' };
      
      await expect(transportAPI.searchTransports(invalidParams))
        .rejects
        .toThrow(TransportError);
      
      await expect(transportAPI.searchTransports(invalidParams))
        .rejects
        .toMatchObject({
          type: TransportErrorType.VALIDATION,
          message: 'Les paramètres de recherche sont incomplets'
        });
    });

    it('devrait lancer une erreur de validation si le nombre de passagers est invalide', async () => {
      const invalidParams = { ...validParams, passengers: 0 };
      
      await expect(transportAPI.searchTransports(invalidParams))
        .rejects
        .toThrow(TransportError);
      
      await expect(transportAPI.searchTransports(invalidParams))
        .rejects
        .toMatchObject({
          type: TransportErrorType.VALIDATION,
          message: 'Le nombre de passagers doit être supérieur à 0'
        });
    });

    it('devrait lancer une erreur de validation pour un type de transport non supporté', async () => {
      const invalidParams = { ...validParams, type: 'invalid' as any };
      
      await expect(transportAPI.searchTransports(invalidParams))
        .rejects
        .toThrow(TransportError);
      
      await expect(transportAPI.searchTransports(invalidParams))
        .rejects
        .toMatchObject({
          type: TransportErrorType.VALIDATION,
          message: 'Type de transport non supporté: invalid'
        });
    });

    describe('Recherche de trains', () => {
      it('devrait retourner les résultats de recherche de trains', async () => {
        const mockResponse = {
          data: {
            journeys: [
              {
                id: 'train1',
                from: { name: 'Paris' },
                to: { name: 'Lyon' },
                departure_date_time: '2024-03-20T10:00:00',
                arrival_date_time: '2024-03-20T12:00:00',
                fare: { total: 50 },
                train_operator: 'SNCF',
                train_number: 'TGV123',
                comfort_class: '2nd',
                booking_url: 'https://sncf.com'
              }
            ]
          }
        };

        (transportAPI as any).sncfClient.get.mockResolvedValue(mockResponse);

        const results = await transportAPI.searchTransports(validParams);

        expect(results).toHaveLength(1);
        expect(results[0]).toMatchObject({
          id: 'train1',
          type: 'train',
          provider: 'SNCF',
          departure: {
            station: 'Paris',
            time: '2024-03-20T10:00:00',
            date: '2024-03-20'
          },
          arrival: {
            station: 'Lyon',
            time: '2024-03-20T12:00:00',
            date: '2024-03-20'
          },
          duration: '2h00',
          price: {
            amount: 50,
            currency: 'EUR'
          },
          details: {
            stops: 0,
            class: '2nd',
            number: 'TGV123',
            operator: 'SNCF',
            bookingUrl: 'https://sncf.com'
          }
        });
      });

      it('devrait lancer une erreur si la réponse SNCF est invalide', async () => {
        const mockResponse = {
          data: {
            invalid: 'format'
          }
        };

        (transportAPI as any).sncfClient.get.mockResolvedValue(mockResponse);

        await expect(transportAPI.searchTransports(validParams))
          .rejects
          .toThrow(TransportError);

        await expect(transportAPI.searchTransports(validParams))
          .rejects
          .toMatchObject({
            type: TransportErrorType.VALIDATION,
            message: 'Format de réponse SNCF invalide'
          });
      });
    });

    describe('Recherche de vols', () => {
      const flightParams = { ...validParams, type: 'plane' as const };

      it('devrait retourner les résultats de recherche de vols', async () => {
        const mockTokenResponse = {
          data: {
            access_token: 'test-token',
            expires_in: 3600
          }
        };

        const mockFlightResponse = {
          data: {
            data: [
              {
                id: 'flight1',
                itineraries: [{
                  duration: 'PT2H',
                  segments: [{
                    departure: { iataCode: 'CDG', at: '2024-03-20T10:00:00' },
                    arrival: { iataCode: 'LYS', at: '2024-03-20T12:00:00' },
                    carrierCode: 'AF',
                    number: 'AF123'
                  }]
                }],
                price: { total: '100', currency: 'EUR' },
                travelerPricings: [{
                  fareDetailsBySegment: [{ cabin: 'ECONOMY' }]
                }],
                bookingUrl: 'https://amadeus.com'
              }
            ]
          }
        };

        (transportAPI as any).amadeusClient.get.mockResolvedValue(mockFlightResponse);
        mockedAxios.post.mockResolvedValue(mockTokenResponse);

        const results = await transportAPI.searchTransports(flightParams);

        expect(results).toHaveLength(1);
        expect(results[0]).toMatchObject({
          id: 'flight1',
          type: 'plane',
          provider: 'AF',
          departure: {
            station: 'CDG',
            time: '2024-03-20T10:00:00',
            date: '2024-03-20'
          },
          arrival: {
            station: 'LYS',
            time: '2024-03-20T12:00:00',
            date: '2024-03-20'
          },
          duration: 'PT2H',
          price: {
            amount: 100,
            currency: 'EUR'
          },
          details: {
            stops: 0,
            class: 'ECONOMY',
            number: 'AF123',
            operator: 'AF',
            bookingUrl: 'https://amadeus.com'
          }
        });
      });

      it('devrait lancer une erreur si la réponse Amadeus est invalide', async () => {
        const mockTokenResponse = {
          data: {
            access_token: 'test-token',
            expires_in: 3600
          }
        };

        const mockFlightResponse = {
          data: {
            invalid: 'format'
          }
        };

        (transportAPI as any).amadeusClient.get.mockResolvedValue(mockFlightResponse);
        mockedAxios.post.mockResolvedValue(mockTokenResponse);

        await expect(transportAPI.searchTransports(flightParams))
          .rejects
          .toThrow(TransportError);

        await expect(transportAPI.searchTransports(flightParams))
          .rejects
          .toMatchObject({
            type: TransportErrorType.VALIDATION,
            message: 'Format de réponse Amadeus invalide'
          });
      });
    });

    describe('Recherche de bus', () => {
      const busParams = { ...validParams, type: 'bus' as const };

      it('devrait retourner les résultats de recherche de bus', async () => {
        const mockResponse = {
          data: {
            trips: [
              {
                id: 'bus1',
                departure: {
                  station: 'Paris',
                  time: '10:00',
                  date: '2024-03-20'
                },
                arrival: {
                  station: 'Lyon',
                  time: '14:00',
                  date: '2024-03-20'
                },
                duration: '4h00',
                price: {
                  amount: 30,
                  currency: 'EUR'
                },
                operator: 'Flixbus',
                bus_number: 'FB123',
                stops: [],
                booking_url: 'https://flixbus.com'
              }
            ]
          }
        };

        (transportAPI as any).flixbusClient.get.mockResolvedValue(mockResponse);

        const results = await transportAPI.searchTransports(busParams);

        expect(results).toHaveLength(1);
        expect(results[0]).toMatchObject({
          id: 'bus1',
          type: 'bus',
          provider: 'Flixbus',
          departure: {
            station: 'Paris',
            time: '10:00',
            date: '2024-03-20'
          },
          arrival: {
            station: 'Lyon',
            time: '14:00',
            date: '2024-03-20'
          },
          duration: '4h00',
          price: {
            amount: 30,
            currency: 'EUR'
          },
          details: {
            stops: 0,
            number: 'FB123',
            operator: 'Flixbus',
            bookingUrl: 'https://flixbus.com'
          }
        });
      });

      it('devrait lancer une erreur si la réponse Flixbus est invalide', async () => {
        const mockResponse = {
          data: {
            invalid: 'format'
          }
        };

        (transportAPI as any).flixbusClient.get.mockResolvedValue(mockResponse);

        await expect(transportAPI.searchTransports(busParams))
          .rejects
          .toThrow(TransportError);

        await expect(transportAPI.searchTransports(busParams))
          .rejects
          .toMatchObject({
            type: TransportErrorType.VALIDATION,
            message: 'Format de réponse Flixbus invalide'
          });
      });
    });
  });

  describe('getAmadeusToken', () => {
    it('devrait réutiliser le token valide', async () => {
      const mockTokenResponse = {
        data: { access_token: 'token', expires_in: 3600 }
      };

      mockedAxios.post.mockResolvedValue(mockTokenResponse);
      // On force l'expiration dans le futur
      (transportAPI as any).amadeusToken = 'token';
      (transportAPI as any).amadeusTokenExpiresAt = Date.now() + 10000;

      await transportAPI['getAmadeusToken']();
      await transportAPI['getAmadeusToken']();

      // Le token est déjà valide, donc axios.post ne doit être appelé qu'une seule fois (au tout début)
      expect(mockedAxios.post).toHaveBeenCalledTimes(0);
    });

    it('devrait renouveler le token expiré', async () => {
      const mockTokenResponse = {
        data: { access_token: 'token', expires_in: 1 }
      };

      mockedAxios.post.mockResolvedValue(mockTokenResponse);
      // On force l'expiration dans le passé
      (transportAPI as any).amadeusToken = '';
      (transportAPI as any).amadeusTokenExpiresAt = Date.now() - 10000;

      await transportAPI['getAmadeusToken']();
      await new Promise(resolve => setTimeout(resolve, 1100));
      await transportAPI['getAmadeusToken']();

      expect(mockedAxios.post).toHaveBeenCalledTimes(2);
    });
  });
}); 