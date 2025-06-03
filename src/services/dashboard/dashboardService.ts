import axios from 'axios';
import { authService } from '../auth/authService';

export interface DashboardStats {
  totalProjects: number;
  activeTasks: number;
  completedTasks: number;
  teamMembers: number;
  upcomingDeadlines: number;
  productivityScore: number;
}

export interface RecentActivity {
  id: string;
  type: 'task' | 'project' | 'team';
  title: string;
  description: string;
  timestamp: Date;
}

class DashboardService {
  private readonly API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

  private get headers() {
    return {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    };
  }

  async getStats(): Promise<DashboardStats> {
    try {
      const response = await axios.get(`${this.API_URL}/dashboard/stats`, this.headers);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw new Error('Impossible de charger les statistiques du tableau de bord');
    }
  }

  async getRecentActivity(): Promise<RecentActivity[]> {
    try {
      const response = await axios.get(`${this.API_URL}/dashboard/activity`, this.headers);
      return response.data.map((activity: any) => ({
        ...activity,
        timestamp: new Date(activity.timestamp)
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des activités récentes:', error);
      throw new Error('Impossible de charger les activités récentes');
    }
  }

  async getProductivityScore(): Promise<number> {
    try {
      const response = await axios.get(`${this.API_URL}/dashboard/productivity`, this.headers);
      return response.data.score;
    } catch (error) {
      console.error('Erreur lors de la récupération du score de productivité:', error);
      throw new Error('Impossible de charger le score de productivité');
    }
  }
}

export const dashboardService = new DashboardService(); 