import React from 'react';
import { Switch } from '@headlessui/react';

interface UserSettingsProps {
  settings: {
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
    preferences: {
      language: string;
      theme: 'light' | 'dark' | 'system';
      timezone: string;
    };
  };
  onSettingChange: (category: string, setting: string, value: any) => void;
  className?: string;
}

export const UserSettings: React.FC<UserSettingsProps> = ({
  settings,
  onSettingChange,
  className = '',
}) => {
  return (
    <div className={`space-y-8 ${className}`}>
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
              checked={settings.notifications.email}
              onChange={(checked) =>
                onSettingChange('notifications', 'email', checked)
              }
              className={`${
                settings.notifications.email ? 'bg-[#1a1a1a]' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2`}
            >
              <span
                className={`${
                  settings.notifications.email ? 'translate-x-6' : 'translate-x-1'
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
              checked={settings.notifications.push}
              onChange={(checked) =>
                onSettingChange('notifications', 'push', checked)
              }
              className={`${
                settings.notifications.push ? 'bg-[#1a1a1a]' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2`}
            >
              <span
                className={`${
                  settings.notifications.push ? 'translate-x-6' : 'translate-x-1'
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
              checked={settings.notifications.marketing}
              onChange={(checked) =>
                onSettingChange('notifications', 'marketing', checked)
              }
              className={`${
                settings.notifications.marketing ? 'bg-[#1a1a1a]' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2`}
            >
              <span
                className={`${
                  settings.notifications.marketing ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div>
        <h2 className="text-lg font-medium text-gray-900">Confidentialité</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Visibilité du profil
            </label>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) =>
                onSettingChange('privacy', 'profileVisibility', e.target.value)
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
              checked={settings.privacy.showEmail}
              onChange={(checked) =>
                onSettingChange('privacy', 'showEmail', checked)
              }
              className={`${
                settings.privacy.showEmail ? 'bg-[#1a1a1a]' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2`}
            >
              <span
                className={`${
                  settings.privacy.showEmail ? 'translate-x-6' : 'translate-x-1'
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
              checked={settings.privacy.showLocation}
              onChange={(checked) =>
                onSettingChange('privacy', 'showLocation', checked)
              }
              className={`${
                settings.privacy.showLocation ? 'bg-[#1a1a1a]' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2`}
            >
              <span
                className={`${
                  settings.privacy.showLocation ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div>
        <h2 className="text-lg font-medium text-gray-900">Préférences</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Langue</label>
            <select
              value={settings.preferences.language}
              onChange={(e) =>
                onSettingChange('preferences', 'language', e.target.value)
              }
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-[#1a1a1a] focus:outline-none focus:ring-[#1a1a1a] sm:text-sm"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Thème</label>
            <select
              value={settings.preferences.theme}
              onChange={(e) =>
                onSettingChange('preferences', 'theme', e.target.value)
              }
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-[#1a1a1a] focus:outline-none focus:ring-[#1a1a1a] sm:text-sm"
            >
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
              <option value="system">Système</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Fuseau horaire</label>
            <select
              value={settings.preferences.timezone}
              onChange={(e) =>
                onSettingChange('preferences', 'timezone', e.target.value)
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
    </div>
  );
}; 