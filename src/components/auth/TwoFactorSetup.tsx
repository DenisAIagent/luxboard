import React, { useState } from 'react';
import { authService } from '../../services/auth/authService';
import { Loader2, Shield, ShieldCheck } from 'lucide-react';
import QRCode from 'qrcode.react';

interface TwoFactorSetupProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const TwoFactorSetup: React.FC<TwoFactorSetupProps> = ({ onSuccess, onCancel }) => {
  const [step, setStep] = useState<'initial' | 'qr' | 'verify'>('initial');
  const [qrData, setQrData] = useState<{ secret: string; qrCode: string } | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartSetup = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await authService.setupTwoFactor();
      setQrData(data);
      setStep('qr');
    } catch (err) {
      setError('Erreur lors de la configuration du 2FA');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!qrData) return;

    setLoading(true);
    setError(null);

    try {
      await authService.confirmTwoFactorSetup(verificationCode);
      onSuccess();
    } catch (err) {
      setError('Code de vérification invalide');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'initial') {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="text-center mb-6">
          <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Activer l'authentification à deux facteurs</h2>
          <p className="text-gray-600 mt-2">
            Renforcez la sécurité de votre compte en activant l'authentification à deux facteurs.
          </p>
        </div>

        {error && (
          <div className="text-red-500 text-sm mb-4">{error}</div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleStartSetup}
            disabled={loading}
            className="btn btn-primary w-full flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Configuration en cours...
              </>
            ) : (
              'Commencer la configuration'
            )}
          </button>
          <button
            onClick={onCancel}
            className="btn btn-outline w-full"
          >
            Annuler
          </button>
        </div>
      </div>
    );
  }

  if (step === 'qr' && qrData) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="text-center mb-6">
          <ShieldCheck className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Scanner le QR code</h2>
          <p className="text-gray-600 mt-2">
            Scannez ce QR code avec votre application d'authentification (Google Authenticator, Authy, etc.)
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <QRCode value={qrData.qrCode} size={200} />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">
            Code de secours (à conserver en lieu sûr) :
          </p>
          <code className="block p-2 bg-gray-100 rounded text-sm font-mono">
            {qrData.secret}
          </code>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setStep('verify')}
            className="btn btn-primary w-full"
          >
            J'ai scanné le QR code
          </button>
          <button
            onClick={onCancel}
            className="btn btn-outline w-full"
          >
            Annuler
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="text-center mb-6">
        <ShieldCheck className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Vérifier le code</h2>
        <p className="text-gray-600 mt-2">
          Entrez le code à 6 chiffres généré par votre application d'authentification
        </p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleVerifyCode(); }} className="space-y-4">
        <div>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Code à 6 chiffres"
            className="input input-bordered w-full text-center text-2xl tracking-widest"
            maxLength={6}
            pattern="[0-9]{6}"
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="space-y-4">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Vérification en cours...
              </>
            ) : (
              'Vérifier'
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline w-full"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default TwoFactorSetup; 