import React, { useState } from 'react';
import { authService } from '../../services/auth/authService';
import { Loader2, Github, Mail } from 'lucide-react';

interface SocialLoginProps {
  onSuccess: () => void;
  onError: (error: string) => void;
}

type SocialProvider = 'google' | 'facebook' | 'github' | 'email';

export const SocialLogin: React.FC<SocialLoginProps> = ({ onSuccess, onError }) => {
  const [loading, setLoading] = useState<SocialProvider | null>(null);

  const handleSocialLogin = async (provider: SocialProvider) => {
    setLoading(provider);
    try {
      await authService.loginWithSocial(provider);
      onSuccess();
    } catch (error) {
      onError(`Erreur lors de la connexion avec ${provider}`);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Ou continuer avec
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleSocialLogin('google')}
          disabled={loading !== null}
          className="btn btn-outline w-full flex items-center justify-center"
        >
          {loading === 'google' ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <>
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Google
            </>
          )}
        </button>

        <button
          onClick={() => handleSocialLogin('github')}
          disabled={loading !== null}
          className="btn btn-outline w-full flex items-center justify-center"
        >
          {loading === 'github' ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <>
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </>
          )}
        </button>

        <button
          onClick={() => handleSocialLogin('facebook')}
          disabled={loading !== null}
          className="btn btn-outline w-full flex items-center justify-center"
        >
          {loading === 'facebook' ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <>
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
              Facebook
            </>
          )}
        </button>

        <button
          onClick={() => handleSocialLogin('email')}
          disabled={loading !== null}
          className="btn btn-outline w-full flex items-center justify-center"
        >
          {loading === 'email' ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <>
              <Mail className="h-5 w-5 mr-2" />
              Email
            </>
          )}
        </button>
      </div>

      <p className="text-sm text-gray-500 text-center mt-4">
        En continuant, vous acceptez nos{' '}
        <a href="/terms" className="text-blue-600 hover:underline">
          conditions d'utilisation
        </a>{' '}
        et notre{' '}
        <a href="/privacy" className="text-blue-600 hover:underline">
          politique de confidentialité
        </a>
        .
      </p>
    </div>
  );
};

export default SocialLogin; 