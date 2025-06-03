import * as XLSX from 'xlsx';

interface ImportResult {
  success: boolean;
  message: string;
  data?: any[];
}

class DataImportService {
  private static instance: DataImportService;

  private constructor() {}

  public static getInstance(): DataImportService {
    if (!DataImportService.instance) {
      DataImportService.instance = new DataImportService();
    }
    return DataImportService.instance;
  }

  public async importFromExcel(file: File): Promise<ImportResult> {
    try {
      const data = await this.readExcelFile(file);
      // TODO: Envoyer les données au backend
      return {
        success: true,
        message: 'Importation réussie',
        data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de l\'importation du fichier Excel'
      };
    }
  }

  public async importFromSharepoint(url: string): Promise<ImportResult> {
    try {
      // TODO: Implémenter la connexion à SharePoint
      // Pour l'instant, on simule une réponse
      await new Promise(resolve => setTimeout(resolve, 2000));
      return {
        success: true,
        message: 'Importation depuis SharePoint réussie'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la connexion à SharePoint'
      };
    }
  }

  private readExcelFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
  }
}

export default DataImportService; 