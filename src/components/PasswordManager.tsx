import React, { useState } from 'react';

interface PasswordManagerProps {
  onPasswordChange: (oldPassword: string, newPassword: string) => Promise<void>;
  className?: string;
}

export const PasswordManager: React.FC<PasswordManagerProps> = ({
  onPasswordChange,
  className = '',
}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (newPassword.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    try {
      setIsLoading(true);
      await onPasswordChange(oldPassword, newPassword);
      setSuccess('Mot de passe modifié avec succès');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Erreur lors de la modification du mot de passe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h2 className="text-lg font-medium text-gray-900">
          Modifier le mot de passe
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Assurez-vous d'utiliser un mot de passe fort et unique
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="old-password"
            className="block text-sm font-medium text-gray-700"
          >
            Mot de passe actuel
          </label>
          <div className="mt-1">
            <input
              id="old-password"
              name="old-password"
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1a1a1a] focus:ring-[#1a1a1a] sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="new-password"
            className="block text-sm font-medium text-gray-700"
          >
            Nouveau mot de passe
          </label>
          <div className="mt-1">
            <input
              id="new-password"
              name="new-password"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1a1a1a] focus:ring-[#1a1a1a] sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirmer le mot de passe
          </label>
          <div className="mt-1">
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1a1a1a] focus:ring-[#1a1a1a] sm:text-sm"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">{success}</h3>
              </div>
            </div>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md border border-transparent bg-[#1a1a1a] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Modification en cours...' : 'Modifier le mot de passe'}
          </button>
        </div>
      </form>
    </div>
  );
}; 