import axios from 'axios';

interface BookingConfig {
  apiKey: string;
  baseUrl: string;
  affiliateId: string;
}

class BookingAPI {
  private config: BookingConfig;
  private client: any;

  constructor() {
    this.config = {
      apiKey: process.env.BOOKING_API_KEY!,
      baseUrl: 'https://distribution-xml.booking.com/json/bookings',
      affiliateId: process.env.BOOKING_AFFILIATE_ID!
    };
    
    this.client = axios.create({
      baseURL: this.config.baseUrl,
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  // Recherche d'hôtels par ville
  async searchHotels(params: {
    destination: string;
    checkin: string;
    checkout: string;
    adults: number;
    rooms: number;
    currency?: string;
  }) {
    try {
      const response = await this.client.get('/hotels', {
        params: {
          dest_type: 'city',
          dest_id: await this.getDestinationId(params.destination),
          checkin_date: params.checkin,
          checkout_date: params.checkout,
          adults_number: params.adults,
          room_number: params.rooms,
          currency: params.currency || 'EUR',
          include_adjacency: true,
          categories_filter_ids: 'class::4,class::5', // Hôtels 4-5 étoiles uniquement
          order_by: 'review_score'
        }
      });
      
      return this.transformBookingData(response.data);
    } catch (error) {
      console.error('Booking.com API Error:', error);
      throw new Error('Erreur lors de la recherche Booking.com');
    }
  }

  // Obtenir les détails d'un hôtel
  async getHotelDetails(hotelId: string) {
    try {
      const response = await this.client.get(`/hotels/${hotelId}`, {
        params: {
          extras: 'hotel_info,hotel_photos,hotel_facilities,hotel_policies'
        }
      });
      
      return this.transformHotelDetails(response.data);
    } catch (error) {
      console.error('Booking Hotel Details Error:', error);
      throw error;
    }
  }

  // Transformer les données Booking.com vers le format LuxBoard
  private transformBookingData(bookingData: any) {
    return bookingData.result?.map((hotel: any) => ({
      id: `booking_${hotel.hotel_id}`,
      nom: hotel.hotel_name,
      category: 'hotel',
      description: hotel.hotel_description,
      adresse: {
        rue: hotel.address,
        ville: hotel.city,
        pays: hotel.country_trans,
        coordonnees: {
          lat: parseFloat(hotel.latitude),
          lng: parseFloat(hotel.longitude)
        }
      },
      contact: {
        telephone: hotel.phone,
        email: hotel.email,
        siteWeb: hotel.url
      },
      baseTarifaire: {
        minimum: hotel.min_total_price,
        maximum: hotel.max_total_price,
        devise: hotel.currency_code,
        unite: 'nuit'
      },
      photos: hotel.main_photo_url ? [hotel.main_photo_url] : [],
      rating: hotel.review_score / 2, // Booking note sur 10, nous sur 5
      nombreAvis: hotel.review_nr,
      source: 'booking.com',
      externalId: hotel.hotel_id,
      facilites: hotel.hotel_facilities?.map((f: any) => f.name) || [],
      statusValidation: 'approuve' // Auto-approuvé car source fiable
    }));
  }

  private async getDestinationId(destination: string): Promise<string> {
    // Utilise l'API de géocodage de Booking.com
    const response = await this.client.get('/destinations', {
      params: { query: destination }
    });
    return response.data[0]?.dest_id || '';
  }

  private transformHotelDetails(hotelData: any) {
    return {
      ...hotelData,
      // Transformation détaillée des données
      facilities: hotelData.facilities?.map((f: any) => ({
        name: f.name,
        type: f.type
      })),
      policies: {
        checkin: hotelData.checkin,
        checkout: hotelData.checkout,
        cancellation: hotelData.cancellation_policy
      }
    };
  }
}

export const bookingAPI = new BookingAPI(); 