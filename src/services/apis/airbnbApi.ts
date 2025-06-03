import axios from 'axios';

interface AirbnbConfig {
  apiKey: string;
  baseUrl: string;
}

class AirbnbAPI {
  private config: AirbnbConfig;
  private client: any;

  constructor() {
    this.config = {
      apiKey: process.env.RAPIDAPI_KEY!,
      baseUrl: 'https://airbnb13.p.rapidapi.com'
    };
    
    this.client = axios.create({
      baseURL: this.config.baseUrl,
      headers: {
        'X-RapidAPI-Key': this.config.apiKey,
        'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
      }
    });
  }

  // Recherche d'hébergements
  async searchListings(params: {
    location: string;
    checkin: string;
    checkout: string;
    adults: number;
    children?: number;
    infants?: number;
    currency?: string;
  }) {
    try {
      const response = await this.client.get('/search-location', {
        params: {
          location: params.location,
          checkin: params.checkin,
          checkout: params.checkout,
          adults: params.adults,
          children: params.children || 0,
          infants: params.infants || 0,
          currency: params.currency || 'EUR',
          minPrice: 200, // Prix minimum pour le luxe
          maxPrice: 10000, // Prix maximum
          minRating: 4.5 // Note minimum
        }
      });
      
      return this.transformAirbnbData(response.data);
    } catch (error) {
      console.error('Airbnb API Error:', error);
      throw new Error('Erreur lors de la recherche Airbnb');
    }
  }

  // Obtenir les détails d'un hébergement
  async getListingDetails(listingId: string) {
    try {
      const response = await this.client.get('/property-details', {
        params: { id: listingId }
      });
      
      return this.transformListingDetails(response.data);
    } catch (error) {
      console.error('Airbnb Listing Details Error:', error);
      throw error;
    }
  }

  // Transformer les données Airbnb vers le format LuxBoard
  private transformAirbnbData(airbnbData: any) {
    return airbnbData.results?.map((listing: any) => ({
      id: `airbnb_${listing.id}`,
      nom: listing.name,
      category: 'airbnb',
      description: listing.description,
      adresse: {
        rue: listing.address,
        ville: listing.city,
        pays: listing.country,
        coordonnees: {
          lat: listing.latitude,
          lng: listing.longitude
        }
      },
      contact: {
        telephone: listing.host_phone,
        email: listing.host_email,
        siteWeb: `https://www.airbnb.com/rooms/${listing.id}`
      },
      baseTarifaire: {
        minimum: listing.price,
        maximum: listing.price * 1.5, // Estimation
        devise: listing.currency,
        unite: 'nuit'
      },
      photos: listing.images || [],
      rating: listing.rating,
      nombreAvis: listing.reviews_count,
      source: 'airbnb.com',
      externalId: listing.id,
      facilites: listing.amenities || [],
      statusValidation: 'approuve' // Auto-approuvé car source fiable
    }));
  }

  private transformListingDetails(listingData: any) {
    return {
      ...listingData,
      // Transformation détaillée des données
      facilities: listingData.amenities?.map((a: any) => ({
        name: a,
        type: 'amenity'
      })),
      policies: {
        checkin: listingData.check_in_time,
        checkout: listingData.check_out_time,
        cancellation: listingData.cancellation_policy
      }
    };
  }
}

export const airbnbAPI = new AirbnbAPI(); 