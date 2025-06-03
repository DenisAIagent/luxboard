import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, UserGroupIcon, TicketIcon } from '@heroicons/react/24/solid';

interface EventCardProps {
  event: {
    id: string;
    titre: string;
    description?: string;
    typeEvent: string;
    lieuNom: string;
    lieuAdresse: string;
    niveauExclusivite: string;
    photos: string[];
    dates: {
      date: string;
      heureDebut: string;
      heureFin: string;
      placesDisponibles: number;
      placesReservees: number;
    }[];
    prixParPersonne?: number;
    invitationSeule: boolean;
  };
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (time: string) => {
    return time.substring(0, 5);
  };

  const getNextDate = () => {
    const now = new Date();
    return event.dates.find((d) => new Date(d.date) > now);
  };

  const nextDate = getNextDate();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48">
        <img
          src={event.photos[0] || '/placeholder.jpg'}
          alt={event.titre}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
          {event.typeEvent}
        </div>
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
          {event.niveauExclusivite}
        </div>
      </div>

      <div className="p-4">
        <Link to={`/events/${event.id}`} className="block">
          <h3 className="text-xl font-semibold text-gray-900 hover:text-gold transition-colors">
            {event.titre}
          </h3>
        </Link>

        {event.description && (
          <p className="mt-2 text-gray-600 line-clamp-2">{event.description}</p>
        )}

        <div className="mt-3 space-y-2">
          {nextDate && (
            <div className="flex items-center text-gray-600">
              <CalendarIcon className="h-5 w-5 mr-2" />
              <span>
                {formatDate(nextDate.date)} • {formatTime(nextDate.heureDebut)} -{' '}
                {formatTime(nextDate.heureFin)}
              </span>
            </div>
          )}

          <div className="flex items-center text-gray-600">
            <MapPinIcon className="h-5 w-5 mr-2" />
            <span>
              {event.lieuNom} • {event.lieuAdresse}
            </span>
          </div>

          {nextDate && (
            <div className="flex items-center text-gray-600">
              <UserGroupIcon className="h-5 w-5 mr-2" />
              <span>
                {nextDate.placesDisponibles - nextDate.placesReservees} places disponibles
              </span>
            </div>
          )}

          <div className="flex items-center text-gray-600">
            <TicketIcon className="h-5 w-5 mr-2" />
            <span>
              {event.invitationSeule
                ? 'Sur invitation uniquement'
                : event.prixParPersonne
                ? `${event.prixParPersonne}€ par personne`
                : 'Entrée gratuite'}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <Link
            to={`/events/${event.id}`}
            className="block w-full text-center bg-black text-white py-2 rounded-lg hover:bg-gold transition-colors"
          >
            Voir l'événement
          </Link>
        </div>
      </div>
    </div>
  );
}; 