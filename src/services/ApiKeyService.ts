import { ApiKey } from '../types/api';

class ApiKeyService {
  private static instance: ApiKeyService;
  private apiKeys: ApiKey[] = [];

  private constructor() {
    // Charger les clés API depuis le stockage local au démarrage
    this.loadApiKeys();
  }

  public static getInstance(): ApiKeyService {
    if (!ApiKeyService.instance) {
      ApiKeyService.instance = new ApiKeyService();
    }
    return ApiKeyService.instance;
  }

  private loadApiKeys(): void {
    const storedKeys = localStorage.getItem('apiKeys');
    if (storedKeys) {
      this.apiKeys = JSON.parse(storedKeys);
    }
  }

  private saveApiKeys(): void {
    localStorage.setItem('apiKeys', JSON.stringify(this.apiKeys));
  }

  public getApiKeys(): ApiKey[] {
    return this.apiKeys;
  }

  public getApiKey(id: string): ApiKey | undefined {
    return this.apiKeys.find(key => key.id === id);
  }

  public updateApiKey(id: string, key: string): void {
    const index = this.apiKeys.findIndex(k => k.id === id);
    if (index !== -1) {
      this.apiKeys[index] = {
        ...this.apiKeys[index],
        key,
        isValid: key.length > 0
      };
      this.saveApiKeys();
    }
  }

  public updateApiKeys(keys: ApiKey[]): void {
    this.apiKeys = keys;
    this.saveApiKeys();
  }

  public validateApiKey(id: string): boolean {
    const key = this.getApiKey(id);
    return key?.isValid || false;
  }

  public clearApiKeys(): void {
    this.apiKeys = [];
    localStorage.removeItem('apiKeys');
  }
}

export default ApiKeyService; 