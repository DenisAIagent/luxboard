import React, { useState } from 'react';
import { authService } from '../../services/auth/authService';
import { Loader2, Mail, X } from 'lucide-react';

interface EmailVerificationBannerProps {
  onVerified: () => void;
}

export const EmailVerificationBanner: React.FC<EmailVerificationBannerProps> = ({ onVerified }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const handleResendVerification = async () => {
    setLoading(true);
    setError(null);

    try {
      await authService.resendVerificationEmail();
      // Afficher un message de succès
    } catch (err) {
      setError('Erreur lors de l\'envoi de l\'email de vérification');
    } finally {
      setLoading(false);
    }
  };

  if (dismissed) {
    return null;
  }

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Mail className="h-5 w-5 text-blue-500" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-blue-800">
            Vérification de l'email requise
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>
              Veuillez vérifier votre adresse email pour activer votre compte.
              Si vous n'avez pas reçu l'email, vous pouvez le renvoyer.
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <button
              onClick={handleResendVerification}
              disabled={loading}
              className="btn btn-sm btn-outline btn-primary flex items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Envoi en cours...
                </>
              ) : (
                'Renvoyer l\'email'
              )}
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="btn btn-sm btn-ghost text-blue-600 hover:text-blue-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {error && (
            <div className="mt-2 text-sm text-red-600">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationBanner; 