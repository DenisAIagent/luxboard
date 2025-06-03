import React, { useState } from 'react';
import { PreferencesManager } from '../components/PreferencesManager';

import type { Preferences } from '../components/PreferencesManager';

const defaultPreferences: Preferences = {
  theme: 'light',
  language: 'fr',
  timezone: 'Europe/Paris',
  notifications: {
    email: true,
    push: false,
    marketing: false,
  },
  privacy: {
    profileVisibility: 'public',
    showEmail: false,
    showLocation: false,
  },
  accessibility: {
    highContrast: false,
    reducedMotion: false,
    fontSize: 'medium',
  },
};

const PreferencesPage: React.FC = () => {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);

  const handlePreferenceChange = (
    category: string,
    setting: string,
    value: any
  ) => {
    setPreferences((prev: Preferences) => {
      if (category in prev) {
        return {
          ...prev,
          [category]: {
            ...((prev as any)[category]),
            [setting]: value,
          },
        } as Preferences;
      }
      return {
        ...prev,
        [setting]: value,
      } as Preferences;
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Préférences utilisateur</h1>
      <PreferencesManager
        preferences={preferences}
        onPreferenceChange={handlePreferenceChange}
      />
    </div>
  );
};

export default PreferencesPage; 