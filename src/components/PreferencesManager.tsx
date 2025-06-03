import React from 'react';
import { Switch } from '@headlessui/react';

export interface Preferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'connections';
    showEmail: boolean;
    showLocation: boolean;
  };
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
}

interface PreferencesManagerProps {
  preferences: Preferences;
  onPreferenceChange: (category: string, setting: string, value: any) => void;
  className?: string;
}

export const PreferencesManager: React.FC<PreferencesManagerProps> = ({
  preferences,
  onPreferenceChange,
  className = '',
}) => {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Thème et langue */}
      <div>
        <h2 className="text-lg font-medium text-gray-900">Apparence</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Thème</label>
            <select
              value={preferences.theme}
              onChange={(e) =>
                onPreferenceChange('theme', 'theme', e.target.value)
              }
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-[#1a1a1a] focus:outline-none focus:ring-[#1a1a1a] sm:text-sm"
            >
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
              <option value="system">Système</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Langue</label>
            <select
              value={preferences.language}
              onChange={(e) =>
                onPreferenceChange('language', 'language', e.target.value)
              }
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-[#1a1a1a] focus:outline-none focus:ring-[#1a1a1a] sm:text-sm"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Fuseau horaire
            </label>
            <select
              value={preferences.timezone}
              onChange={(e) =>
                onPreferenceChange('timezone', 'timezone', e.target.value)
              }
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-[#1a1a1a] focus:outline-none focus:ring-[#1a1a1a] sm:text-sm"
            >
              <option value="Europe/Paris">Paris (GMT+1)</option>
              <option value="Europe/London">Londres (GMT+0)</option>
              <option value="America/New_York">New York (GMT-5)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div>
        <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Notifications par email
              </label>
              <p className="text-sm text-gray-500">
                Recevez des notifications par email
              </p>
            </div>
            <Switch
              checked={preferences.notifications.email}
              onChange={(checked: boolean) =>
                onPreferenceChange('notifications', 'email', checked)
              }
              className={`${
                preferences.notifications.email ? 'bg-[#1a1a1a]' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2`}
            >
              <span
                className={`${
                  preferences.notifications.email ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Notifications push
              </label>
              <p className="text-sm text-gray-500">
                Recevez des notifications push
              </p>
            </div>
            <Switch
              checked={preferences.notifications.push}
              onChange={(checked: boolean) =>
                onPreferenceChange('notifications', 'push', checked)
              }
              className={`${
                preferences.notifications.push ? 'bg-[#1a1a1a]' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2`}
            >
              <span
                className={`${
                  preferences.notifications.push ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Marketing
              </label>
              <p className="text-sm text-gray-500">
                Recevez des communications marketing
              </p>
            </div>
            <Switch
              checked={preferences.notifications.marketing}
              onChange={(checked: boolean) =>
                onPreferenceChange('notifications', 'marketing', checked)
              }
              className={`${
                preferences.notifications.marketing ? 'bg-[#1a1a1a]' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2`}
            >
              <span
                className={`${
                  preferences.notifications.marketing ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>
      </div>

      {/* Confidentialité */}
      <div>
        <h2 className="text-lg font-medium text-gray-900">Confidentialité</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Visibilité du profil
            </label>
            <select
              value={preferences.privacy.profileVisibility}
              onChange={(e) =>
                onPreferenceChange('privacy', 'profileVisibility', e.target.value)
              }
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-[#1a1a1a] focus:outline-none focus:ring-[#1a1a1a] sm:text-sm"
            >
              <option value="public">Public</option>
              <option value="private">Privé</option>
              <option value="connections">Connections uniquement</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Afficher l'email
              </label>
              <p className="text-sm text-gray-500">
                Rendre votre email visible sur votre profil
              </p>
            </div>
            <Switch
              checked={preferences.privacy.showEmail}
              onChange={(checked: boolean) =>
                onPreferenceChange('privacy', 'showEmail', checked)
              }
              className={`${
                preferences.privacy.showEmail ? 'bg-[#1a1a1a]' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2`}
            >
              <span
                className={`${
                  preferences.privacy.showEmail ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Afficher la localisation
              </label>
              <p className="text-sm text-gray-500">
                Rendre votre localisation visible sur votre profil
              </p>
            </div>
            <Switch
              checked={preferences.privacy.showLocation}
              onChange={(checked: boolean) =>
                onPreferenceChange('privacy', 'showLocation', checked)
              }
              className={`${
                preferences.privacy.showLocation ? 'bg-[#1a1a1a]' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2`}
            >
              <span
                className={`${
                  preferences.privacy.showLocation ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>
      </div>

      {/* Accessibilité */}
      <div>
        <h2 className="text-lg font-medium text-gray-900">Accessibilité</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Contraste élevé
              </label>
              <p className="text-sm text-gray-500">
                Améliore la lisibilité du texte
              </p>
            </div>
            <Switch
              checked={preferences.accessibility.highContrast}
              onChange={(checked: boolean) =>
                onPreferenceChange('accessibility', 'highContrast', checked)
              }
              className={`${
                preferences.accessibility.highContrast ? 'bg-[#1a1a1a]' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2`}
            >
              <span
                className={`${
                  preferences.accessibility.highContrast ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Mouvement réduit
              </label>
              <p className="text-sm text-gray-500">
                Réduit les animations et les transitions
              </p>
            </div>
            <Switch
              checked={preferences.accessibility.reducedMotion}
              onChange={(checked: boolean) =>
                onPreferenceChange('accessibility', 'reducedMotion', checked)
              }
              className={`${
                preferences.accessibility.reducedMotion ? 'bg-[#1a1a1a]' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2`}
            >
              <span
                className={`${
                  preferences.accessibility.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Taille du texte
            </label>
            <select
              value={preferences.accessibility.fontSize}
              onChange={(e) =>
                onPreferenceChange('accessibility', 'fontSize', e.target.value)
              }
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-[#1a1a1a] focus:outline-none focus:ring-[#1a1a1a] sm:text-sm"
            >
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}; 