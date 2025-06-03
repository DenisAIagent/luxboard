import React, { useState, useMemo } from 'react';
import { Calendar } from '../components/Calendar';
import { TaskDetails } from '../components/TaskDetails';
import { EventDetails } from '../components/EventDetails';
import { TaskForm } from '../components/TaskForm';
import { EventForm } from '../components/EventForm';
import { FilterBar } from '../components/FilterBar';
import { PlusIcon } from '@heroicons/react/24/solid';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  assignee: string;
  status: 'todo' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  stars?: number;
  budget?: 'low' | 'medium' | 'high';
  category?: 'hotel' | 'restaurant' | 'activity' | 'transport' | 'shopping' | 'other';
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
  stars?: number;
  budget?: 'low' | 'medium' | 'high';
  category?: 'hotel' | 'restaurant' | 'activity' | 'transport' | 'shopping' | 'other';
}

// Données de test pour les tâches
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Mise à jour de la documentation',
    description: 'Mettre à jour la documentation technique du projet',
    dueDate: new Date('2024-03-25T17:00:00'),
    assignee: 'Jean Dupont',
    status: 'in_progress',
    priority: 'high',
    tags: ['documentation', 'technique'],
  },
  {
    id: '2',
    title: 'Tests unitaires',
    description: 'Écrire les tests unitaires pour le module de paiement',
    dueDate: new Date('2024-03-26T12:00:00'),
    assignee: 'Marie Martin',
    status: 'todo',
    priority: 'high',
    tags: ['tests', 'développement'],
  },
  {
    id: '3',
    title: 'Revue de code',
    description: 'Faire la revue de code des pull requests en attente',
    dueDate: new Date('2024-03-24T16:00:00'),
    assignee: 'Pierre Durand',
    status: 'completed',
    priority: 'medium',
    tags: ['revue', 'qualité'],
  },
];

// Données de test pour les événements
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Réunion d\'équipe',
    description: 'Réunion hebdomadaire de l\'équipe de développement',
    startDate: new Date('2024-03-25T10:00:00'),
    endDate: new Date('2024-03-25T11:00:00'),
    location: 'Salle de conférence A',
    type: 'meeting',
    status: 'upcoming',
    priority: 'medium',
  },
  {
    id: '2',
    title: 'Livraison de la version 1.0',
    description: 'Livraison de la première version du produit',
    startDate: new Date('2024-03-30T17:00:00'),
    endDate: new Date('2024-03-30T18:00:00'),
    location: 'En ligne',
    type: 'task',
    status: 'upcoming',
    priority: 'high',
  },
  {
    id: '3',
    title: 'Formation React',
    description: 'Formation sur les dernières fonctionnalités de React',
    startDate: new Date('2024-03-28T14:00:00'),
    endDate: new Date('2024-03-28T16:00:00'),
    location: 'Salle de formation',
    type: 'meeting',
    status: 'upcoming',
    priority: 'low',
  },
];

export const CalendarPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);

  // Filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  // Filtrage des tâches et événements
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        searchQuery === '' ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus.length === 0 || selectedStatus.includes(task.status);

      const matchesPriority =
        selectedPriority.length === 0 || selectedPriority.includes(task.priority);

      const matchesStars =
        selectedStars.length === 0 || (task.stars && selectedStars.includes(task.stars.toString()));

      const matchesBudget =
        selectedBudget.length === 0 || (task.budget && selectedBudget.includes(task.budget));

      const matchesCategory =
        selectedCategory.length === 0 || (task.category && selectedCategory.includes(task.category));

      const matchesDateRange =
        !dateRange.start ||
        !dateRange.end ||
        (task.dueDate >= dateRange.start && task.dueDate <= dateRange.end);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesStars &&
        matchesBudget &&
        matchesCategory &&
        matchesDateRange
      );
    });
  }, [
    tasks,
    searchQuery,
    selectedStatus,
    selectedPriority,
    selectedStars,
    selectedBudget,
    selectedCategory,
    dateRange,
  ]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        searchQuery === '' ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus.length === 0 || selectedStatus.includes(event.status);

      const matchesPriority =
        selectedPriority.length === 0 || selectedPriority.includes(event.priority);

      const matchesType =
        selectedType.length === 0 || selectedType.includes(event.type);

      const matchesStars =
        selectedStars.length === 0 || (event.stars && selectedStars.includes(event.stars.toString()));

      const matchesBudget =
        selectedBudget.length === 0 || (event.budget && selectedBudget.includes(event.budget));

      const matchesCategory =
        selectedCategory.length === 0 || (event.category && selectedCategory.includes(event.category));

      const matchesDateRange =
        !dateRange.start ||
        !dateRange.end ||
        (event.startDate >= dateRange.start && event.endDate <= dateRange.end);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesType &&
        matchesStars &&
        matchesBudget &&
        matchesCategory &&
        matchesDateRange
      );
    });
  }, [
    events,
    searchQuery,
    selectedStatus,
    selectedPriority,
    selectedType,
    selectedStars,
    selectedBudget,
    selectedCategory,
    dateRange,
  ]);

  const handleTaskClick = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setSelectedTask(task);
    }
  };

  const handleEventClick = (eventId: string) => {
    const event = events.find((e) => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
    }
  };

  const handleTaskStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleEventStatusChange = (eventId: string, newStatus: Event['status']) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, status: newStatus } : event
      )
    );
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    setSelectedTask(null);
  };

  const handleEventDelete = (eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
    setSelectedEvent(null);
  };

  const handleTaskSubmit = (taskData: Omit<Task, 'id'>) => {
    if (selectedTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === selectedTask.id
            ? { ...taskData, id: task.id }
            : task
        )
      );
    } else {
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
      };
      setTasks((prev) => [...prev, newTask]);
    }
    setIsTaskFormOpen(false);
    setSelectedTask(null);
  };

  const handleEventSubmit = (eventData: Omit<Event, 'id'>) => {
    if (selectedEvent) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === selectedEvent.id
            ? { ...eventData, id: event.id }
            : event
        )
      );
    } else {
      const newEvent: Event = {
        ...eventData,
        id: Date.now().toString(),
      };
      setEvents((prev) => [...prev, newEvent]);
    }
    setIsEventFormOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendrier</h1>
          <p className="mt-1 text-sm text-gray-500">
            Consultez vos tâches et événements dans une vue calendrier
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => {
              setSelectedTask(null);
              setIsTaskFormOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#1a1a1a] hover:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a1a1a]"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Nouvelle tâche
          </button>
          <button
            onClick={() => {
              setSelectedEvent(null);
              setIsEventFormOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#1a1a1a] hover:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a1a1a]"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Nouvel événement
          </button>
        </div>
      </div>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedStars={selectedStars}
        onStarsChange={setSelectedStars}
        selectedBudget={selectedBudget}
        onBudgetChange={setSelectedBudget}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      <Calendar
        tasks={filteredTasks}
        events={filteredEvents}
        onTaskClick={handleTaskClick}
        onEventClick={handleEventClick}
      />

      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onStatusChange={handleTaskStatusChange}
          onDelete={handleTaskDelete}
        />
      )}

      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onStatusChange={handleEventStatusChange}
          onDelete={handleEventDelete}
        />
      )}

      {isTaskFormOpen && (
        <TaskForm
          task={selectedTask || undefined}
          onSubmit={handleTaskSubmit}
          onClose={() => {
            setIsTaskFormOpen(false);
            setSelectedTask(null);
          }}
        />
      )}

      {isEventFormOpen && (
        <EventForm
          event={selectedEvent || undefined}
          onSubmit={handleEventSubmit}
          onClose={() => {
            setIsEventFormOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
}; 