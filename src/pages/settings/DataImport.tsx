import React, { useState } from 'react';
import { Upload, FileSpreadsheet, Share2, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import DataImportService from '../../services/DataImportService';

interface ImportStatus {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function DataImport() {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [sharepointUrl, setSharepointUrl] = useState('');
  const [importStatus, setImportStatus] = useState<ImportStatus>({
    status: 'idle',
    message: ''
  });

  const handleExcelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setExcelFile(file);
      setImportStatus({
        status: 'idle',
        message: ''
      });
    }
  };

  const handleSharepointUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSharepointUrl(event.target.value);
    setImportStatus({
      status: 'idle',
      message: ''
    });
  };

  const importFromExcel = async () => {
    if (!excelFile) return;

    setImportStatus({
      status: 'loading',
      message: 'Importation en cours...'
    });

    try {
      const dataImportService = DataImportService.getInstance();
      const result = await dataImportService.importFromExcel(excelFile);

      setImportStatus({
        status: result.success ? 'success' : 'error',
        message: result.message
      });
    } catch (error) {
      setImportStatus({
        status: 'error',
        message: 'Erreur lors de l\'importation'
      });
    }
  };

  const importFromSharepoint = async () => {
    if (!sharepointUrl) return;

    setImportStatus({
      status: 'loading',
      message: 'Connexion à SharePoint en cours...'
    });

    try {
      const dataImportService = DataImportService.getInstance();
      const result = await dataImportService.importFromSharepoint(sharepointUrl);

      setImportStatus({
        status: result.success ? 'success' : 'error',
        message: result.message
      });
    } catch (error) {
      setImportStatus({
        status: 'error',
        message: 'Erreur lors de la connexion à SharePoint'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Importation de Données
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Importez vos données depuis un fichier Excel ou directement depuis SharePoint.
                Les données seront automatiquement synchronisées avec votre compte LuxBoard.
              </p>
            </div>

            <div className="mt-6 space-y-8">
              {/* Import Excel */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <FileSpreadsheet className="h-6 w-6 text-blue-500 mr-2" />
                  <h4 className="text-lg font-medium text-gray-900">
                    Import depuis Excel
                  </h4>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Sélectionnez votre fichier Excel
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="excel-file"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Télécharger un fichier</span>
                          <input
                            id="excel-file"
                            name="excel-file"
                            type="file"
                            accept=".xlsx,.xls"
                            className="sr-only"
                            onChange={handleExcelUpload}
                          />
                        </label>
                        <p className="pl-1">ou glissez-déposez</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        XLSX, XLS jusqu'à 10MB
                      </p>
                    </div>
                  </div>
                  {excelFile && (
                    <div className="mt-2 text-sm text-gray-500">
                      Fichier sélectionné : {excelFile.name}
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={importFromExcel}
                    disabled={!excelFile || importStatus.status === 'loading'}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Importer depuis Excel
                  </button>
                </div>
              </div>

              {/* Import SharePoint */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Share2 className="h-6 w-6 text-purple-500 mr-2" />
                  <h4 className="text-lg font-medium text-gray-900">
                    Import depuis SharePoint
                  </h4>
                </div>

                <div className="mt-4">
                  <label htmlFor="sharepoint-url" className="block text-sm font-medium text-gray-700">
                    URL SharePoint
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="sharepoint-url"
                      id="sharepoint-url"
                      value={sharepointUrl}
                      onChange={handleSharepointUrlChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="https://votre-entreprise.sharepoint.com/..."
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={importFromSharepoint}
                    disabled={!sharepointUrl || importStatus.status === 'loading'}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Importer depuis SharePoint
                  </button>
                </div>
              </div>

              {/* Status Message */}
              {importStatus.status !== 'idle' && (
                <div className={`mt-4 p-4 rounded-md ${
                  importStatus.status === 'success' ? 'bg-green-50' :
                  importStatus.status === 'error' ? 'bg-red-50' :
                  'bg-blue-50'
                }`}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {importStatus.status === 'success' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                      ) : importStatus.status === 'error' ? (
                        <XCircle className="h-5 w-5 text-red-400" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-blue-400" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className={`text-sm font-medium ${
                        importStatus.status === 'success' ? 'text-green-800' :
                        importStatus.status === 'error' ? 'text-red-800' :
                        'text-blue-800'
                      }`}>
                        {importStatus.message}
                      </p>
                    </div>
                  </div>
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
                  Les fichiers Excel doivent être au format .xlsx ou .xls
                </li>
                <li>
                  Assurez-vous que vos données sont correctement formatées avant l'importation
                </li>
                <li>
                  Pour SharePoint, vous devez avoir les permissions nécessaires pour accéder aux données
                </li>
                <li>
                  L'importation peut prendre plusieurs minutes selon la taille des données
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 