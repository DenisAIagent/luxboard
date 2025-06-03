import axios from 'axios';
import { authService } from '../auth/authService';

export type Project = {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  startDate: Date;
  endDate?: Date;
  progress: number;
  owner: {
    id: string;
    firstName: string;
    lastName: string;
  };
  team: {
    id: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'editor' | 'concierge';
  }[];
  tasks: {
    total: number;
    completed: number;
  };
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProjectData = {
  name: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  startDate: Date;
  endDate?: Date;
  tags?: string[];
};

export type UpdateProjectData = Partial<CreateProjectData>;

export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTaskData = {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assigneeId?: string;
  dueDate?: Date;
};

export type UpdateTaskData = Partial<CreateTaskData> & {
  status?: 'todo' | 'in_progress' | 'completed';
};

export type Comment = {
  id: string;
  content: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type CreateCommentData = {
  content: string;
};

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const projectService = {
  async getProjects(): Promise<Project[]> {
    const token = authService.getToken();
    const response = await axios.get(`${API_URL}/projects`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async getProject(id: string): Promise<Project> {
    const token = authService.getToken();
    const response = await axios.get(`${API_URL}/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async createProject(data: CreateProjectData): Promise<Project> {
    const token = authService.getToken();
    const response = await axios.post(`${API_URL}/projects`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async updateProject(id: string, data: UpdateProjectData): Promise<Project> {
    const token = authService.getToken();
    const response = await axios.put(`${API_URL}/projects/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async deleteProject(id: string): Promise<void> {
    const token = authService.getToken();
    await axios.delete(`${API_URL}/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async addTeamMember(projectId: string, email: string, role: 'admin' | 'editor' | 'concierge'): Promise<void> {
    const token = authService.getToken();
    await axios.post(`${API_URL}/projects/${projectId}/team`, { email, role }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async removeTeamMember(projectId: string, userId: string): Promise<void> {
    const token = authService.getToken();
    await axios.delete(`${API_URL}/projects/${projectId}/team/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async updateTeamMemberRole(projectId: string, userId: string, role: 'admin' | 'editor' | 'concierge'): Promise<void> {
    const token = authService.getToken();
    await axios.put(`${API_URL}/projects/${projectId}/team/${userId}`, { role }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getProjectTasks(projectId: string): Promise<Task[]> {
    const token = authService.getToken();
    const response = await axios.get(`${API_URL}/projects/${projectId}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async createTask(projectId: string, data: CreateTaskData): Promise<Task> {
    const token = authService.getToken();
    const response = await axios.post(`${API_URL}/projects/${projectId}/tasks`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async updateTask(projectId: string, taskId: string, data: UpdateTaskData): Promise<Task> {
    const token = authService.getToken();
    const response = await axios.put(`${API_URL}/projects/${projectId}/tasks/${taskId}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async deleteTask(projectId: string, taskId: string): Promise<void> {
    const token = authService.getToken();
    await axios.delete(`${API_URL}/projects/${projectId}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getTaskComments(projectId: string, taskId: string): Promise<Comment[]> {
    const token = authService.getToken();
    const response = await axios.get(`${API_URL}/projects/${projectId}/tasks/${taskId}/comments`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async createTaskComment(projectId: string, taskId: string, data: CreateCommentData): Promise<Comment> {
    const token = authService.getToken();
    const response = await axios.post(`${API_URL}/projects/${projectId}/tasks/${taskId}/comments`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async updateTaskComment(projectId: string, taskId: string, commentId: string, data: CreateCommentData): Promise<Comment> {
    const token = authService.getToken();
    const response = await axios.put(`${API_URL}/projects/${projectId}/tasks/${taskId}/comments/${commentId}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async deleteTaskComment(projectId: string, taskId: string, commentId: string): Promise<void> {
    const token = authService.getToken();
    await axios.delete(`${API_URL}/projects/${projectId}/tasks/${taskId}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}; 