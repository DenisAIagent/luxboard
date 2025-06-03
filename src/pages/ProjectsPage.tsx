import React, { useState } from 'react';
import { ProjectManager } from '../components/ProjectManager';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  assignee: string;
  status: 'todo' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
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
  {
    id: '3',
    name: 'Migration des données',
    description: 'Migration des données vers le nouveau système de stockage',
    startDate: new Date('2024-02-15'),
    endDate: new Date('2024-03-15'),
    status: 'completed',
    progress: 100,
    team: ['Thomas Moreau', 'Julie Dubois'],
    tasks: [
      {
        id: '7',
        title: 'Sauvegarde des données',
        description: 'Créer une sauvegarde complète des données existantes',
        dueDate: new Date('2024-02-20'),
        assignee: 'Thomas Moreau',
        status: 'completed',
        priority: 'high',
        tags: ['sauvegarde', 'données'],
      },
      {
        id: '8',
        title: 'Migration',
        description: 'Transférer les données vers le nouveau système',
        dueDate: new Date('2024-03-01'),
        assignee: 'Julie Dubois',
        status: 'completed',
        priority: 'high',
        tags: ['migration', 'données'],
      },
      {
        id: '9',
        title: 'Vérification',
        description: 'Vérifier l\'intégrité des données migrées',
        dueDate: new Date('2024-03-10'),
        assignee: 'Thomas Moreau',
        status: 'completed',
        priority: 'high',
        tags: ['vérification', 'qualité'],
      },
    ],
    tags: ['données', 'migration', 'système'],
  },
];

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const handleProjectClick = (projectId: string) => {
    // TODO: Implémenter la logique pour afficher les détails du projet
    console.log('Projet cliqué:', projectId);
  };

  const handleStatusChange = (projectId: string, newStatus: Project['status']) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, status: newStatus } : project
      )
    );
  };

  const handleDelete = (projectId: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Projets</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez vos projets et suivez leur progression
        </p>
      </div>

      <ProjectManager
        projects={projects}
        onProjectClick={handleProjectClick}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}; 