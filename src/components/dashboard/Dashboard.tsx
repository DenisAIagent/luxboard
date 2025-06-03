import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  CheckSquare, 
  Clock, 
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { authService } from '../../services/auth/authService';

interface DashboardStats {
  totalProjects: number;
  activeTasks: number;
  completedTasks: number;
  teamMembers: number;
  upcomingDeadlines: number;
  productivityScore: number;
}

interface RecentActivity {
  id: string;
  type: 'task' | 'project' | 'team';
  title: string;
  description: string;
  timestamp: Date;
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    activeTasks: 0,
    completedTasks: 0,
    teamMembers: 0,
    upcomingDeadlines: 0,
    productivityScore: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // TODO: Remplacer par les appels API réels
        const mockStats: DashboardStats = {
          totalProjects: 12,
          activeTasks: 24,
          completedTasks: 156,
          teamMembers: 8,
          upcomingDeadlines: 5,
          productivityScore: 85
        };

        const mockActivity: RecentActivity[] = [
          {
            id: '1',
            type: 'task',
            title: 'Tâche terminée',
            description: 'La tâche "Mise à jour du design" a été complétée',
            timestamp: new Date()
          },
          {
            id: '2',
            type: 'project',
            title: 'Nouveau projet',
            description: 'Le projet "Refonte du site" a été créé',
            timestamp: new Date(Date.now() - 3600000)
          }
        ];

        setStats(mockStats);
        setRecentActivity(mockActivity);
      } catch (error) {
        console.error('Erreur lors du chargement du tableau de bord:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Projets</p>
              <p className="text-2xl font-semibold">{stats.totalProjects}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tâches actives</p>
              <p className="text-2xl font-semibold">{stats.activeTasks}</p>
            </div>
            <CheckSquare className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Membres d'équipe</p>
              <p className="text-2xl font-semibold">{stats.teamMembers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tâches terminées</p>
              <p className="text-2xl font-semibold">{stats.completedTasks}</p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Échéances proches</p>
              <p className="text-2xl font-semibold">{stats.upcomingDeadlines}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Score de productivité</p>
              <p className="text-2xl font-semibold">{stats.productivityScore}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Activité récente */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Activité récente</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map(activity => (
            <div key={activity.id} className="p-6">
              <div className="flex items-start">
                <div className="flex-1">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 