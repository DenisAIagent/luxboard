import React, { useState } from 'react';
import { authService } from '../../services/auth/authService';
import { Loader2, Mail, Lock } from 'lucide-react';
import SocialLogin from './SocialLogin';

interface LoginFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  onForgotPassword: () => void;
  onRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onError,
  onForgotPassword,
  onRegister,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login(email, password);
      if (response.requiresTwoFactor) {
        // Gérer la vérification 2FA
        onError('Veuillez entrer le code de vérification 2FA');
      } else {
        onSuccess();
      }
    } catch (error) {
      onError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Connexion</h2>
        <p className="text-gray-600 mt-2">
          Connectez-vous à votre compte
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="input input-bordered w-full pl-10"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Mot de passe</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input input-bordered w-full pl-10"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-blue-600 hover:underline"
          >
            Mot de passe oublié ?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Connexion en cours...
            </>
          ) : (
            'Se connecter'
          )}
        </button>
      </form>

      <div className="mt-6">
        <SocialLogin onSuccess={onSuccess} onError={onError} />
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <button
            onClick={onRegister}
            className="text-blue-600 hover:underline"
          >
            S'inscrire
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm; 