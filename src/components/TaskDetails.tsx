import React from 'react';
import { XMarkIcon, ClockIcon, UserIcon, TagIcon } from '@heroicons/react/24/solid';

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

interface TaskDetailsProps {
  task: Task;
  onClose: () => void;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onDelete: (taskId: string) => void;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({
  task,
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
    }
  };

  const getPriorityClasses = (priority: Task['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
              <div className="mt-2 flex flex-wrap gap-2">
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
                  {task.priority === 'low'
                    ? 'Basse priorité'
                    : task.priority === 'medium'
                    ? 'Priorité moyenne'
                    : 'Haute priorité'}
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
              <p className="mt-2 text-gray-900">{task.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center text-sm text-gray-500">
                <ClockIcon className="h-5 w-5 mr-2 text-gray-400" />
                <span>Échéance : {formatDate(task.dueDate)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <UserIcon className="h-5 w-5 mr-2 text-gray-400" />
                <span>Assigné à : {task.assignee}</span>
              </div>
            </div>

            {task.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tags</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      <TagIcon className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <select
                value={task.status}
                onChange={(e) =>
                  onStatusChange(task.id, e.target.value as Task['status'])
                }
                className="text-sm border-gray-300 rounded-md focus:ring-[#1a1a1a] focus:border-[#1a1a1a]"
              >
                <option value="todo">À faire</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminé</option>
                <option value="cancelled">Annulé</option>
              </select>
              <button
                onClick={() => onDelete(task.id)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Supprimer la tâche
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 