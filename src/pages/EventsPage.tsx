import React, { useState } from 'react';
import { EventManager } from '../components/EventManager';

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  type: 'meeting' | 'task' | 'reminder' | 'other';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
}

// Données de test pour les événements
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Réunion d\'équipe',
    description: 'Réunion hebdomadaire pour discuter des progrès et des objectifs',
    startDate: new Date('2024-03-25T10:00:00'),
    endDate: new Date('2024-03-25T11:00:00'),
    location: 'Salle de conférence A',
    type: 'meeting',
    status: 'upcoming',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Mise à jour du site web',
    description: 'Déploiement des nouvelles fonctionnalités',
    startDate: new Date('2024-03-26T14:00:00'),
    endDate: new Date('2024-03-26T16:00:00'),
    location: 'Bureau principal',
    type: 'task',
    status: 'ongoing',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Rappel : Formation',
    description: 'Formation sur les nouvelles technologies',
    startDate: new Date('2024-03-27T09:00:00'),
    endDate: new Date('2024-03-27T17:00:00'),
    location: 'Centre de formation',
    type: 'reminder',
    status: 'upcoming',
    priority: 'low',
  },
];

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);

  const handleEventClick = (eventId: string) => {
    // TODO: Implémenter la logique pour afficher les détails de l'événement
    console.log('Événement cliqué:', eventId);
  };

  const handleStatusChange = (eventId: string, newStatus: Event['status']) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, status: newStatus } : event
      )
    );
  };

  const handleDelete = (eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Événements</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez vos événements et restez organisé
        </p>
      </div>

      <EventManager
        events={events}
        onEventClick={handleEventClick}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}; 