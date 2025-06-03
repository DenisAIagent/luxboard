import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserPlus, UserMinus, Shield, Edit, Trash2 } from 'lucide-react';
import { projectService } from '../../services/projects/projectService';
import { useAuth } from '../../hooks/useAuth';

type TeamMember = {
  id: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'editor' | 'concierge';
};

export const ProjectTeam: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'admin' | 'editor' | 'concierge'>('editor');
  const [isAddingMember, setIsAddingMember] = useState(false);

  useEffect(() => {
    loadTeamMembers();
  }, [id]);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      const project = await projectService.getProject(id!);
      setMembers(project.team);
    } catch (err) {
      setError('Erreur lors du chargement des membres de l\'équipe');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsAddingMember(true);
      await projectService.addTeamMember(id!, newMemberEmail, newMemberRole);
      await loadTeamMembers();
      setNewMemberEmail('');
      setNewMemberRole('editor');
    } catch (err) {
      setError('Erreur lors de l\'ajout du membre');
      console.error(err);
    } finally {
      setIsAddingMember(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      await projectService.removeTeamMember(id!, memberId);
      await loadTeamMembers();
    } catch (err) {
      setError('Erreur lors de la suppression du membre');
      console.error(err);
    }
  };

  const handleUpdateRole = async (memberId: string, newRole: 'admin' | 'editor' | 'concierge') => {
    try {
      await projectService.updateTeamMemberRole(id!, memberId, newRole);
      await loadTeamMembers();
    } catch (err) {
      setError('Erreur lors de la mise à jour du rôle');
      console.error(err);
    }
  };

  const isAdmin = members.find(m => m.id === user?.id)?.role === 'admin';

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
        <h2 className="text-xl font-bold mb-6">Équipe du projet</h2>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {isAdmin && (
          <form onSubmit={handleAddMember} className="mb-8">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="Email du nouveau membre"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="w-48">
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value as 'admin' | 'editor' | 'concierge')}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="admin">Administrateur</option>
                  <option value="editor">Éditeur</option>
                  <option value="concierge">Concierge</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isAddingMember}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 flex items-center"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                {isAddingMember ? 'Ajout...' : 'Ajouter'}
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  {member.firstName[0]}{member.lastName[0]}
                </div>
                <div className="ml-4">
                  <div className="font-medium">
                    {member.firstName} {member.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {member.role === 'admin' && (
                      <span className="flex items-center">
                        <Shield className="h-4 w-4 mr-1" />
                        Administrateur
                      </span>
                    )}
                    {member.role === 'editor' && (
                      <span className="flex items-center">
                        <Edit className="h-4 w-4 mr-1" />
                        Éditeur
                      </span>
                    )}
                    {member.role === 'concierge' && (
                      <span className="flex items-center">
                        <UserPlus className="h-4 w-4 mr-1" />
                        Concierge
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {isAdmin && member.id !== user?.id && (
                <div className="flex items-center space-x-2">
                  <select
                    value={member.role}
                    onChange={(e) => handleUpdateRole(member.id, e.target.value as 'admin' | 'editor' | 'concierge')}
                    className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="admin">Administrateur</option>
                    <option value="editor">Éditeur</option>
                    <option value="concierge">Concierge</option>
                  </select>
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="p-2 text-red-600 hover:text-red-700"
                    title="Retirer du projet"
                  >
                    <UserMinus className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 