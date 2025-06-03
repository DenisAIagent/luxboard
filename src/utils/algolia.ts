import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID || '',
  process.env.ALGOLIA_API_KEY || ''
);

export const providersIndex = client.initIndex('providers');
export const offersIndex = client.initIndex('offers');
export const eventsIndex = client.initIndex('events');

export const searchProviders = async (query: string, filters?: string) => {
  try {
    const { hits } = await providersIndex.search(query, {
      filters,
      attributesToRetrieve: [
        'id',
        'nom',
        'category',
        'description',
        'adresseVille',
        'rating',
        'photos',
        'specialites',
      ],
    });
    return hits;
  } catch (error) {
    console.error('Erreur lors de la recherche de prestataires:', error);
    return [];
  }
};

export const searchOffers = async (query: string, filters?: string) => {
  try {
    const { hits } = await offersIndex.search(query, {
      filters,
      attributesToRetrieve: [
        'id',
        'titre',
        'description',
        'typeOffre',
        'valeurType',
        'valeurMontant',
        'dateDebut',
        'dateFin',
        'photos',
      ],
    });
    return hits;
  } catch (error) {
    console.error('Erreur lors de la recherche d\'offres:', error);
    return [];
  }
};

export const searchEvents = async (query: string, filters?: string) => {
  try {
    const { hits } = await eventsIndex.search(query, {
      filters,
      attributesToRetrieve: [
        'id',
        'titre',
        'description',
        'typeEvent',
        'lieuNom',
        'lieuAdresse',
        'niveauExclusivite',
        'photos',
        'dates',
      ],
    });
    return hits;
  } catch (error) {
    console.error('Erreur lors de la recherche d\'événements:', error);
    return [];
  }
};

export const updateProviderIndex = async (provider: any) => {
  try {
    await providersIndex.saveObject({
      objectID: provider.id,
      ...provider,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'index des prestataires:', error);
  }
};

export const updateOfferIndex = async (offer: any) => {
  try {
    await offersIndex.saveObject({
      objectID: offer.id,
      ...offer,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'index des offres:', error);
  }
};

export const updateEventIndex = async (event: any) => {
  try {
    await eventsIndex.saveObject({
      objectID: event.id,
      ...event,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'index des événements:', error);
  }
}; 