import React from 'react';
import { ProjectManager } from './ProjectManager';
import { TaskManager } from './TaskManager';
import { EventManager } from './EventManager';
import { ChartBarIcon, CalendarIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/solid';

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

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  progress: number;
  team: string[];
  tasks: Task[];
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

interface DashboardProps {
  projects: Project[];
  tasks: Task[];
  events: Event[];
  onProjectClick: (projectId: string) => void;
  onProjectStatusChange: (projectId: string, newStatus: Project['status']) => void;
  onProjectDelete: (projectId: string) => void;
  onTaskClick: (taskId: string) => void;
  onTaskStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onTaskDelete: (taskId: string) => void;
  onEventClick: (eventId: string) => void;
  onEventStatusChange: (eventId: string, newStatus: Event['status']) => void;
  onEventDelete: (eventId: string) => void;
  className?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  projects,
  tasks,
  events,
  onProjectClick,
  onProjectStatusChange,
  onProjectDelete,
  onTaskClick,
  onTaskStatusChange,
  onTaskDelete,
  onEventClick,
  onEventStatusChange,
  onEventDelete,
  className = '',
}) => {
  const getStats = () => {
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const pendingTasks = tasks.filter(t => t.status === 'todo').length;
    const upcomingEvents = events.filter(e => e.status === 'upcoming').length;

    return [
      {
        name: 'Projets actifs',
        value: activeProjects,
        icon: ChartBarIcon,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
      },
      {
        name: 'Projets terminés',
        value: completedProjects,
        icon: ChartBarIcon,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
      },
      {
        name: 'Tâches en attente',
        value: pendingTasks,
        icon: ClipboardDocumentListIcon,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
      },
      {
        name: 'Événements à venir',
        value: upcomingEvents,
        icon: CalendarIcon,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
      },
    ];
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Statistiques */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {getStats().map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className={`absolute rounded-md p-3 ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </dd>
          </div>
        ))}
      </div>

      {/* Projets récents */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Projets récents</h2>
        <ProjectManager
          projects={projects.slice(0, 2)}
          onProjectClick={onProjectClick}
          onStatusChange={onProjectStatusChange}
          onDelete={onProjectDelete}
        />
      </div>

      {/* Tâches prioritaires */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Tâches prioritaires</h2>
        <TaskManager
          tasks={tasks.filter(t => t.priority === 'high').slice(0, 3)}
          onTaskClick={onTaskClick}
          onStatusChange={onTaskStatusChange}
          onDelete={onTaskDelete}
        />
      </div>

      {/* Prochains événements */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Prochains événements</h2>
        <EventManager
          events={events.filter(e => e.status === 'upcoming').slice(0, 3)}
          onEventClick={onEventClick}
          onStatusChange={onEventStatusChange}
          onDelete={onEventDelete}
        />
      </div>
    </div>
  );
}; 