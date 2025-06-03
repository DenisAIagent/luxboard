import React, { useState, useEffect } from 'react';
import { Save, Key, Eye, EyeOff, AlertCircle } from 'lucide-react';
import ApiKeyService from '../../services/ApiKeyService';
import { ApiKey } from '../../types/api';

export default function ApiSettings() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: 'booking',
      name: 'Booking.com',
      key: '',
      description: 'Clé API pour accéder aux services de Booking.com',
      isVisible: false,
      isValid: false
    },
    {
      id: 'airbnb',
      name: 'Airbnb',
      key: '',
      description: 'Clé API pour accéder aux services d\'Airbnb',
      isVisible: false,
      isValid: false
    },
    {
      id: 'google-maps',
      name: 'Google Maps',
      key: '',
      description: 'Clé API pour les services de cartographie Google',
      isVisible: false,
      isValid: false
    },
    {
      id: 'stripe',
      name: 'Stripe',
      key: '',
      description: 'Clé API pour le traitement des paiements',
      isVisible: false,
      isValid: false
    },
    {
      id: 'sendgrid',
      name: 'SendGrid',
      key: '',
      description: 'Clé API pour l\'envoi d\'emails',
      isVisible: false,
      isValid: false
    }
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Charger les clés API au montage du composant
    const apiKeyService = ApiKeyService.getInstance();
    const storedKeys = apiKeyService.getApiKeys();
    if (storedKeys.length > 0) {
      setApiKeys(storedKeys);
    }
  }, []);

  const handleKeyChange = (id: string, value: string) => {
    setApiKeys(prevKeys => 
      prevKeys.map(key => 
        key.id === id 
          ? { ...key, key: value, isValid: value.length > 0 }
          : key
      )
    );
  };

  const toggleKeyVisibility = (id: string) => {
    setApiKeys(prevKeys =>
      prevKeys.map(key =>
        key.id === id
          ? { ...key, isVisible: !key.isVisible }
          : key
      )
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const apiKeyService = ApiKeyService.getInstance();
      apiKeyService.updateApiKeys(apiKeys);
      setSaveStatus('success');
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Configuration des Clés API
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Configurez vos clés API pour les différents services utilisés par LuxBoard.
                Ces clés sont nécessaires pour le bon fonctionnement de certaines fonctionnalités.
              </p>
            </div>

            <div className="mt-6 space-y-6">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Key className="h-5 w-5 text-gray-400 mr-2" />
                        <h4 className="text-base font-medium text-gray-900">
                          {apiKey.name}
                        </h4>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {apiKey.description}
                      </p>
                    </div>
                    <div className="ml-4">
                      {!apiKey.isValid && (
                        <div className="flex items-center text-yellow-600">
                          <AlertCircle className="h-5 w-5 mr-1" />
                          <span className="text-sm">Clé requise</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type={apiKey.isVisible ? "text" : "password"}
                        value={apiKey.key}
                        onChange={(e) => handleKeyChange(apiKey.id, e.target.value)}
                        className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                        placeholder="Entrez votre clé API"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                          {apiKey.isVisible ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sauvegarde en cours...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Sauvegarder les clés API
                  </>
                )}
              </button>

              {saveStatus === 'success' && (
                <div className="mt-4 text-sm text-green-600">
                  Les clés API ont été sauvegardées avec succès.
                </div>
              )}

              {saveStatus === 'error' && (
                <div className="mt-4 text-sm text-red-600">
                  Une erreur est survenue lors de la sauvegarde des clés API.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Informations Importantes
            </h3>
            <div className="mt-2 text-sm text-gray-500">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Vos clés API sont stockées de manière sécurisée et chiffrée.
                </li>
                <li>
                  Ne partagez jamais vos clés API avec des tiers.
                </li>
                <li>
                  En cas de compromission d'une clé, révoquez-la immédiatement et générez-en une nouvelle.
                </li>
                <li>
                  Certaines fonctionnalités peuvent être limitées si les clés API correspondantes ne sont pas configurées.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 