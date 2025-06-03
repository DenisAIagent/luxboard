import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, CheckCircle2, Circle, Clock, AlertCircle, Calendar, User } from 'lucide-react';
import { projectService, Task, CreateTaskData } from '../../services/projects/projectService';
import { useAuth } from '../../hooks/useAuth';

export const ProjectTasks: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [newTask, setNewTask] = useState<CreateTaskData>({
    title: '',
    description: '',
    priority: 'medium'
  });

  useEffect(() => {
    loadTasks();
  }, [id]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const projectTasks = await projectService.getProjectTasks(id!);
      setTasks(projectTasks);
    } catch (err) {
      setError('Erreur lors du chargement des tâches');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsCreatingTask(true);
      await projectService.createTask(id!, newTask);
      await loadTasks();
      setNewTask({
        title: '',
        description: '',
        priority: 'medium'
      });
    } catch (err) {
      setError('Erreur lors de la création de la tâche');
      console.error(err);
    } finally {
      setIsCreatingTask(false);
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, status: 'todo' | 'in_progress' | 'completed') => {
    try {
      await projectService.updateTask(id!, taskId, { status });
      await loadTasks();
    } catch (err) {
      setError('Erreur lors de la mise à jour de la tâche');
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      return;
    }
    try {
      await projectService.deleteTask(id!, taskId);
      await loadTasks();
    } catch (err) {
      setError('Erreur lors de la suppression de la tâche');
      console.error(err);
    }
  };

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'low':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'high':
        return 'text-red-600';
    }
  };

  const getStatusIcon = (status: 'todo' | 'in_progress' | 'completed') => {
    switch (status) {
      case 'todo':
        return <Circle className="h-5 w-5 text-gray-400" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Tâches du projet</h2>
          <button
            onClick={() => setIsCreatingTask(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nouvelle tâche
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {isCreatingTask && (
          <form onSubmit={handleCreateTask} className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priorité
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="low">Basse</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingTask(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  Créer
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleUpdateTaskStatus(task.id, task.status === 'completed' ? 'todo' : 'completed')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {getStatusIcon(task.status)}
                  </button>
                  <h3 className="font-medium">{task.title}</h3>
                  <span className={`text-sm ${getPriorityColor(task.priority)}`}>
                    {task.priority === 'low' && 'Basse'}
                    {task.priority === 'medium' && 'Moyenne'}
                    {task.priority === 'high' && 'Haute'}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  {task.assignee && (
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {task.assignee.firstName} {task.assignee.lastName}
                    </span>
                  )}
                  {task.dueDate && (
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-2 text-red-600 hover:text-red-700"
                  title="Supprimer la tâche"
                >
                  <AlertCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 