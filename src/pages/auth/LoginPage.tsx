import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implémenter la logique de connexion
      console.log('Login data:', data);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-luxboard-gris-clair flex items-center justify-center">
      <div className="max-w-md w-full bg-luxboard-blanc rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="font-playfair text-3xl font-bold text-luxboard-noir">
            LuxBoard
          </h1>
          <p className="text-luxboard-gris mt-2">
            Connectez-vous à votre espace concierge
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-luxboard-gris"
            >
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-luxboard-gris rounded-lg focus:ring-2 focus:ring-luxboard-or focus:border-transparent"
              placeholder="votre@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-luxboard-rouge">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-luxboard-gris"
            >
              Mot de passe
            </label>
            <input
              {...register('password')}
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-luxboard-gris rounded-lg focus:ring-2 focus:ring-luxboard-or focus:border-transparent"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-luxboard-rouge">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-luxboard-noir text-luxboard-blanc py-3 rounded-lg hover:bg-luxboard-gris transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-sm text-luxboard-or hover:text-luxboard-rouge transition-colors"
          >
            Mot de passe oublié ?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 