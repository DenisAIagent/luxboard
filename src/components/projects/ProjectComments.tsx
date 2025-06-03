import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessageSquare, Edit2, Trash2, Send } from 'lucide-react';
import { projectService, Comment, CreateCommentData } from '../../services/projects/projectService';
import { useAuth } from '../../hooks/useAuth';

interface ProjectCommentsProps {
  taskId: string;
}

export const ProjectComments: React.FC<ProjectCommentsProps> = ({ taskId }) => {
  const { id: projectId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    loadComments();
  }, [projectId, taskId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const taskComments = await projectService.getTaskComments(projectId!, taskId);
      setComments(taskComments);
    } catch (err) {
      setError('Erreur lors du chargement des commentaires');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await projectService.createTaskComment(projectId!, taskId, { content: newComment });
      await loadComments();
      setNewComment('');
    } catch (err) {
      setError('Erreur lors de la création du commentaire');
      console.error(err);
    }
  };

  const handleUpdateComment = async (commentId: string) => {
    if (!editingContent.trim()) return;

    try {
      await projectService.updateTaskComment(projectId!, taskId, commentId, { content: editingContent });
      await loadComments();
      setEditingCommentId(null);
      setEditingContent('');
    } catch (err) {
      setError('Erreur lors de la mise à jour du commentaire');
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      return;
    }

    try {
      await projectService.deleteTaskComment(projectId!, taskId, commentId);
      await loadComments();
    } catch (err) {
      setError('Erreur lors de la suppression du commentaire');
      console.error(err);
    }
  };

  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex items-center space-x-2 mb-4">
        <MessageSquare className="h-5 w-5 text-gray-500" />
        <h3 className="text-lg font-medium">Commentaires</h3>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleCreateComment} className="mb-6">
        <div className="flex space-x-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={2}
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 flex items-center"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gray-50 rounded-lg p-4"
          >
            {editingCommentId === comment.id ? (
              <div className="space-y-2">
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={2}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setEditingCommentId(null);
                      setEditingContent('');
                    }}
                    className="px-3 py-1 text-gray-600 hover:text-gray-800"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => handleUpdateComment(comment.id)}
                    className="px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary-dark"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">
                      {comment.author.firstName} {comment.author.lastName}
                    </div>
                    <p className="mt-1 text-gray-600">{comment.content}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </div>
                  </div>
                  {user?.id === comment.author.id && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(comment)}
                        className="p-1 text-gray-500 hover:text-gray-700"
                        title="Modifier le commentaire"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Supprimer le commentaire"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 