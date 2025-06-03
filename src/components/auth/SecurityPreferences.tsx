import React, { useState, useEffect } from 'react';
import { authService, User } from '../../services/auth/authService';
import { Loader2, Shield, ShieldAlert, ShieldCheck, Smartphone, Mail, Lock } from 'lucide-react';

interface SecurityPreferencesProps {
  user: User;
  onSuccess: () => void;
  onError: (message: string) => void;
}

interface SecurityPreferences {
  twoFactorEnabled: boolean;
  requireTwoFactorForLogin: boolean;
  requireTwoFactorForPayments: boolean;
  notifyOnNewLogin: boolean;
  notifyOnPasswordChange: boolean;
  notifyOnEmailChange: boolean;
  sessionTimeout: number;
}

export const SecurityPreferences: React.FC<SecurityPreferencesProps> = ({ user, onSuccess, onError }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<SecurityPreferences>({
    twoFactorEnabled: false,
    requireTwoFactorForLogin: false,
    requireTwoFactorForPayments: false,
    notifyOnNewLogin: true,
    notifyOnPasswordChange: true,
    notifyOnEmailChange: true,
    sessionTimeout: 30,
  });

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      if (user?.securityPreferences) {
        setPreferences({
          twoFactorEnabled: user.securityPreferences.twoFactorEnabled ?? false,
          requireTwoFactorForLogin: user.securityPreferences.requireTwoFactorForLogin ?? false,
          requireTwoFactorForPayments: user.securityPreferences.requireTwoFactorForPayments ?? false,
          notifyOnNewLogin: user.securityPreferences.notifyOnNewLogin ?? true,
          notifyOnPasswordChange: user.securityPreferences.notifyOnPasswordChange ?? true,
          notifyOnEmailChange: user.securityPreferences.notifyOnEmailChange ?? true,
          sessionTimeout: user.securityPreferences.sessionTimeout ?? 30,
        });
      }
    } catch (err) {
      setError('Erreur lors du chargement des préférences');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      await authService.updateSecurityPreferences(preferences);
      onSuccess();
    } catch (err) {
      setError('Erreur lors de la sauvegarde des préférences');
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    onError('Fermeture de la fenêtre');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-blue-500 mr-3" />
          <h2 className="text-2xl font-bold">Préférences de sécurité</h2>
        </div>
        <button
          onClick={handleClose}
          className="btn btn-ghost btn-sm"
        >
          Fermer
        </button>
      </div>

      {error && (
        <div className="alert alert-error mb-6">
          <ShieldAlert className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-6">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title">
              <Smartphone className="h-5 w-5 mr-2" />
              Authentification à deux facteurs
            </h3>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Activer l'authentification à deux facteurs</span>
                  <input
                    type="checkbox"
                    checked={preferences.twoFactorEnabled}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      twoFactorEnabled: e.target.checked
                    })}
                    className="toggle toggle-primary"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Exiger le 2FA pour la connexion</span>
                  <input
                    type="checkbox"
                    checked={preferences.requireTwoFactorForLogin}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      requireTwoFactorForLogin: e.target.checked
                    })}
                    className="toggle toggle-primary"
                    disabled={!preferences.twoFactorEnabled}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Exiger le 2FA pour les paiements</span>
                  <input
                    type="checkbox"
                    checked={preferences.requireTwoFactorForPayments}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      requireTwoFactorForPayments: e.target.checked
                    })}
                    className="toggle toggle-primary"
                    disabled={!preferences.twoFactorEnabled}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title">
              <Mail className="h-5 w-5 mr-2" />
              Notifications de sécurité
            </h3>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Notifier lors d'une nouvelle connexion</span>
                  <input
                    type="checkbox"
                    checked={preferences.notifyOnNewLogin}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      notifyOnNewLogin: e.target.checked
                    })}
                    className="toggle toggle-primary"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Notifier lors du changement de mot de passe</span>
                  <input
                    type="checkbox"
                    checked={preferences.notifyOnPasswordChange}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      notifyOnPasswordChange: e.target.checked
                    })}
                    className="toggle toggle-primary"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Notifier lors du changement d'email</span>
                  <input
                    type="checkbox"
                    checked={preferences.notifyOnEmailChange}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      notifyOnEmailChange: e.target.checked
                    })}
                    className="toggle toggle-primary"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title">
              <Lock className="h-5 w-5 mr-2" />
              Session
            </h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Délai d'expiration de session (minutes)</span>
              </label>
              <input
                type="number"
                min="5"
                max="1440"
                value={preferences.sessionTimeout}
                onChange={(e) => setPreferences({
                  ...preferences,
                  sessionTimeout: parseInt(e.target.value)
                })}
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleClose}
            className="btn btn-outline"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn btn-primary flex items-center"
          >
            {saving ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Sauvegarde...
              </>
            ) : (
              <>
                <ShieldCheck className="mr-2" />
                Sauvegarder
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityPreferences; 