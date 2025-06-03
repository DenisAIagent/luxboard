import React from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/solid';

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

interface EventManagerProps {
  events: Event[];
  onEventClick: (eventId: string) => void;
  onStatusChange: (eventId: string, newStatus: Event['status']) => void;
  onDelete: (eventId: string) => void;
  className?: string;
}

export const EventManager: React.FC<EventManagerProps> = ({
  events,
  onEventClick,
  onStatusChange,
  onDelete,
  className = '',
}) => {
  const getTypeClasses = (type: Event['type']) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-50 text-blue-700';
      case 'task':
        return 'bg-green-50 text-green-700';
      case 'reminder':
        return 'bg-yellow-50 text-yellow-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const getStatusClasses = (status: Event['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityClasses = (priority: Event['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Événements</h2>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Aucun événement
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Vous n'avez pas d'événements planifiés.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onEventClick(event.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeClasses(
                        event.type
                      )}`}
                    >
                      {event.type}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(
                        event.status
                      )}`}
                    >
                      {event.status}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityClasses(
                        event.priority
                      )}`}
                    >
                      {event.priority}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {event.description}
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      <span>
                        Du {formatDate(event.startDate)} au{' '}
                        {formatDate(event.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={event.status}
                    onChange={(e) =>
                      onStatusChange(event.id, e.target.value as Event['status'])
                    }
                    className="text-sm border-gray-300 rounded-md focus:ring-[#1a1a1a] focus:border-[#1a1a1a]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="upcoming">À venir</option>
                    <option value="ongoing">En cours</option>
                    <option value="completed">Terminé</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(event.id);
                    }}
                    className="p-1 text-red-400 hover:text-red-500"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 