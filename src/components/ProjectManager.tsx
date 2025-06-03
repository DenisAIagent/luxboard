import React from 'react';
import { FolderIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/solid';

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

interface ProjectManagerProps {
  projects: Project[];
  onProjectClick: (projectId: string) => void;
  onStatusChange: (projectId: string, newStatus: Project['status']) => void;
  onDelete: (projectId: string) => void;
  className?: string;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({
  projects,
  onProjectClick,
  onStatusChange,
  onDelete,
  className = '',
}) => {
  const getStatusClasses = (status: Project['status']) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'medium',
    }).format(date);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-600';
    if (progress >= 50) return 'bg-yellow-600';
    if (progress >= 25) return 'bg-blue-600';
    return 'bg-red-600';
  };

  const getTaskStatusCount = (tasks: Task[]) => {
    return tasks.reduce(
      (acc, task) => {
        acc[task.status]++;
        return acc;
      },
      { todo: 0, in_progress: 0, completed: 0, cancelled: 0 }
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Projets</h2>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <FolderIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Aucun projet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Vous n'avez pas de projets en cours.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => {
            const taskStatus = getTaskStatusCount(project.tasks);
            return (
              <div
                key={project.id}
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onProjectClick(project.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(
                          project.status
                        )}`}
                      >
                        {project.status === 'planning'
                          ? 'Planification'
                          : project.status === 'active'
                          ? 'Actif'
                          : project.status === 'on_hold'
                          ? 'En pause'
                          : project.status === 'completed'
                          ? 'Terminé'
                          : 'Annulé'}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {project.description}
                    </p>
                    <div className="mt-4 space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                          <span>Progression</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(
                              project.progress
                            )}`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <ChartBarIcon className="h-4 w-4 mr-2" />
                          <div className="flex space-x-2">
                            <span className="text-blue-600">
                              {taskStatus.todo} à faire
                            </span>
                            <span className="text-yellow-600">
                              {taskStatus.in_progress} en cours
                            </span>
                            <span className="text-green-600">
                              {taskStatus.completed} terminées
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <UserGroupIcon className="h-4 w-4 mr-2" />
                          <span>{project.team.length} membres</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>
                          Du {formatDate(project.startDate)} au{' '}
                          {formatDate(project.endDate)}
                        </span>
                      </div>
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
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
                      value={project.status}
                      onChange={(e) =>
                        onStatusChange(
                          project.id,
                          e.target.value as Project['status']
                        )
                      }
                      className="text-sm border-gray-300 rounded-md focus:ring-[#1a1a1a] focus:border-[#1a1a1a]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="planning">Planification</option>
                      <option value="active">Actif</option>
                      <option value="on_hold">En pause</option>
                      <option value="completed">Terminé</option>
                      <option value="cancelled">Annulé</option>
                    </select>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(project.id);
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
            );
          })}
        </div>
      )}
    </div>
  );
}; 