import React from 'react';
import { CheckCircleIcon, ClockIcon, UserIcon } from '@heroicons/react/24/solid';

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

interface TaskManagerProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onDelete: (taskId: string) => void;
  className?: string;
}

export const TaskManager: React.FC<TaskManagerProps> = ({
  tasks,
  onTaskClick,
  onStatusChange,
  onDelete,
  className = '',
}) => {
  const getStatusClasses = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityClasses = (priority: Task['priority']) => {
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

  const isOverdue = (dueDate: Date) => {
    return new Date() > dueDate;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Tâches</h2>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <CheckCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Aucune tâche
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Vous n'avez pas de tâches en cours.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onTaskClick(task.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(
                        task.status
                      )}`}
                    >
                      {task.status === 'todo'
                        ? 'À faire'
                        : task.status === 'in_progress'
                        ? 'En cours'
                        : task.status === 'completed'
                        ? 'Terminé'
                        : 'Annulé'}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityClasses(
                        task.priority
                      )}`}
                    >
                      {task.priority === 'high'
                        ? 'Haute'
                        : task.priority === 'medium'
                        ? 'Moyenne'
                        : 'Basse'}
                    </span>
                    {isOverdue(task.dueDate) && task.status !== 'completed' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        En retard
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    {task.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {task.description}
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      <span
                        className={
                          isOverdue(task.dueDate) && task.status !== 'completed'
                            ? 'text-red-600'
                            : ''
                        }
                      >
                        Échéance : {formatDate(task.dueDate)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <UserIcon className="h-4 w-4 mr-2" />
                      <span>Assigné à : {task.assignee}</span>
                    </div>
                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {task.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      onStatusChange(task.id, e.target.value as Task['status'])
                    }
                    className="text-sm border-gray-300 rounded-md focus:ring-[#1a1a1a] focus:border-[#1a1a1a]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="todo">À faire</option>
                    <option value="in_progress">En cours</option>
                    <option value="completed">Terminé</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(task.id);
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