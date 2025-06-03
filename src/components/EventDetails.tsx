import React from 'react';
import { XMarkIcon, ClockIcon, MapPinIcon, TagIcon } from '@heroicons/react/24/solid';

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  type: 'meeting' | 'other' | 'task' | 'reminder';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
}

interface EventDetailsProps {
  event: Event;
  onClose: () => void;
  onStatusChange: (eventId: string, newStatus: Event['status']) => void;
  onDelete: (eventId: string) => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  event,
  onClose,
  onStatusChange,
  onDelete,
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(date);
  };

  const getStatusClasses = (status: Event['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  const getPriorityClasses = (priority: Event['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
    }
  };

  const getTypeClasses = (type: Event['type']) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'task':
        return 'bg-purple-100 text-purple-800';
      case 'reminder':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(
                    event.status
                  )}`}
                >
                  {event.status === 'upcoming'
                    ? 'À venir'
                    : event.status === 'ongoing'
                    ? 'En cours'
                    : event.status === 'completed'
                    ? 'Terminé'
                    : 'Annulé'}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityClasses(
                    event.priority
                  )}`}
                >
                  {event.priority === 'low'
                    ? 'Basse priorité'
                    : event.priority === 'medium'
                    ? 'Priorité moyenne'
                    : 'Haute priorité'}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeClasses(
                    event.type
                  )}`}
                >
                  {event.type === 'meeting'
                    ? 'Réunion'
                    : event.type === 'task'
                    ? 'Tâche'
                    : event.type === 'reminder'
                    ? 'Rappel'
                    : 'Autre'}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-4 text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="mt-2 text-gray-900">{event.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center text-sm text-gray-500">
                <ClockIcon className="h-5 w-5 mr-2 text-gray-400" />
                <span>
                  Du {formatDate(event.startDate)} au {formatDate(event.endDate)}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
                <span>Lieu : {event.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <select
                value={event.status}
                onChange={(e) =>
                  onStatusChange(event.id, e.target.value as Event['status'])
                }
                className="text-sm border-gray-300 rounded-md focus:ring-[#1a1a1a] focus:border-[#1a1a1a]"
              >
                <option value="upcoming">À venir</option>
                <option value="ongoing">En cours</option>
                <option value="completed">Terminé</option>
                <option value="cancelled">Annulé</option>
              </select>
              <button
                onClick={() => onDelete(event.id)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Supprimer l'événement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 