import React, { useState } from 'react';
import { TaskManager } from '../components/TaskManager';

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
    priority: 'medium',
    tags: ['tests', 'développement'],
  },
  {
    id: '3',
    title: 'Revue de code',
    description: 'Faire la revue de code des pull requests en attente',
    dueDate: new Date('2024-03-24T16:00:00'),
    assignee: 'Pierre Durand',
    status: 'completed',
    priority: 'low',
    tags: ['revue', 'qualité'],
  },
];

export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleTaskClick = (taskId: string) => {
    // TODO: Implémenter la logique pour afficher les détails de la tâche
    console.log('Tâche cliquée:', taskId);
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDelete = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tâches</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez vos tâches et suivez leur progression
        </p>
      </div>

      <TaskManager
        tasks={tasks}
        onTaskClick={handleTaskClick}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}; 