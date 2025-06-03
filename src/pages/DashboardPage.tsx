import React, { useState } from 'react';
import { Dashboard } from '../components/Dashboard';

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

// Données de test pour les projets
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Refonte du site web',
    description: 'Modernisation complète du site web avec une nouvelle interface utilisateur',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-06-30'),
    status: 'active',
    progress: 45,
    team: ['Jean Dupont', 'Marie Martin', 'Pierre Durand'],
    tasks: [
      {
        id: '1',
        title: 'Design de la nouvelle interface',
        description: 'Créer les maquettes de la nouvelle interface utilisateur',
        dueDate: new Date('2024-03-15'),
        assignee: 'Marie Martin',
        status: 'completed',
        priority: 'high',
        tags: ['design', 'ui'],
      },
      {
        id: '2',
        title: 'Développement frontend',
        description: 'Implémenter les composants React selon les maquettes',
        dueDate: new Date('2024-04-15'),
        assignee: 'Jean Dupont',
        status: 'in_progress',
        priority: 'high',
        tags: ['développement', 'react'],
      },
      {
        id: '3',
        title: 'Tests utilisateurs',
        description: 'Organiser et mener les sessions de tests utilisateurs',
        dueDate: new Date('2024-05-15'),
        assignee: 'Pierre Durand',
        status: 'todo',
        priority: 'medium',
        tags: ['tests', 'ux'],
      },
    ],
    tags: ['web', 'design', 'développement'],
  },
  {
    id: '2',
    name: 'Application mobile',
    description: 'Développement d\'une application mobile pour les clients',
    startDate: new Date('2024-04-01'),
    endDate: new Date('2024-08-31'),
    status: 'planning',
    progress: 10,
    team: ['Sophie Bernard', 'Lucas Petit'],
    tasks: [
      {
        id: '4',
        title: 'Analyse des besoins',
        description: 'Recueillir et analyser les besoins des utilisateurs',
        dueDate: new Date('2024-04-15'),
        assignee: 'Sophie Bernard',
        status: 'completed',
        priority: 'high',
        tags: ['analyse', 'besoins'],
      },
      {
        id: '5',
        title: 'Prototypage',
        description: 'Créer les prototypes de l\'application mobile',
        dueDate: new Date('2024-05-15'),
        assignee: 'Lucas Petit',
        status: 'todo',
        priority: 'medium',
        tags: ['design', 'prototype'],
      },
      {
        id: '6',
        title: 'Développement iOS',
        description: 'Développer la version iOS de l\'application',
        dueDate: new Date('2024-07-15'),
        assignee: 'Lucas Petit',
        status: 'todo',
        priority: 'high',
        tags: ['développement', 'ios'],
      },
    ],
    tags: ['mobile', 'iOS', 'Android'],
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

export const DashboardPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [events, setEvents] = useState<Event[]>(mockEvents);

  const handleProjectClick = (projectId: string) => {
    // TODO: Implémenter la logique pour afficher les détails du projet
    console.log('Projet cliqué:', projectId);
  };

  const handleProjectStatusChange = (projectId: string, newStatus: Project['status']) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, status: newStatus } : project
      )
    );
  };

  const handleProjectDelete = (projectId: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  };

  const handleTaskClick = (taskId: string) => {
    // TODO: Implémenter la logique pour afficher les détails de la tâche
    console.log('Tâche cliquée:', taskId);
  };

  const handleTaskStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleEventClick = (eventId: string) => {
    // TODO: Implémenter la logique pour afficher les détails de l'événement
    console.log('Événement cliqué:', eventId);
  };

  const handleEventStatusChange = (eventId: string, newStatus: Event['status']) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, status: newStatus } : event
      )
    );
  };

  const handleEventDelete = (eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="mt-1 text-sm text-gray-500">
          Aperçu de vos projets, tâches et événements
        </p>
      </div>

      <Dashboard
        projects={projects}
        tasks={tasks}
        events={events}
        onProjectClick={handleProjectClick}
        onProjectStatusChange={handleProjectStatusChange}
        onProjectDelete={handleProjectDelete}
        onTaskClick={handleTaskClick}
        onTaskStatusChange={handleTaskStatusChange}
        onTaskDelete={handleTaskDelete}
        onEventClick={handleEventClick}
        onEventStatusChange={handleEventStatusChange}
        onEventDelete={handleEventDelete}
      />
    </div>
  );
}; 