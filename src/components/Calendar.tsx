import React, { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  assignee: string;
  status: 'todo' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

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

interface CalendarProps {
  tasks: Task[];
  events: Event[];
  onTaskClick: (taskId: string) => void;
  onEventClick: (eventId: string) => void;
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
  tasks,
  events,
  onTaskClick,
  onEventClick,
  className = '',
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const getMonthName = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(date);
  };

  const getEventsForDay = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return {
      tasks: tasks.filter(
        (task) =>
          task.dueDate.getDate() === day &&
          task.dueDate.getMonth() === currentDate.getMonth() &&
          task.dueDate.getFullYear() === currentDate.getFullYear()
      ),
      events: events.filter(
        (event) =>
          event.startDate.getDate() === day &&
          event.startDate.getMonth() === currentDate.getMonth() &&
          event.startDate.getFullYear() === currentDate.getFullYear()
      ),
    };
  };

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  const getEventTypeColor = (type: Event['type']) => {
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

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Ajouter les jours du mois précédent
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-32 bg-gray-50 p-2 text-gray-400">
          {new Date(currentDate.getFullYear(), currentDate.getMonth(), -i).getDate()}
        </div>
      );
    }

    // Ajouter les jours du mois courant
    for (let day = 1; day <= daysInMonth; day++) {
      const { tasks: dayTasks, events: dayEvents } = getEventsForDay(day);
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

      days.push(
        <div
          key={day}
          className={`h-32 p-2 border border-gray-200 ${
            isToday ? 'bg-blue-50' : ''
          }`}
        >
          <div className="font-medium mb-1">{day}</div>
          <div className="space-y-1">
            {dayTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onTaskClick(task.id)}
                className={`text-xs p-1 rounded cursor-pointer ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.title}
              </div>
            ))}
            {dayEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => onEventClick(event.id)}
                className={`text-xs p-1 rounded cursor-pointer ${getEventTypeColor(
                  event.type
                )}`}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
            )
          }
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-medium">{getMonthName(currentDate)}</h2>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
            )
          }
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day) => (
          <div
            key={day}
            className="bg-white p-2 text-center font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  );
}; 