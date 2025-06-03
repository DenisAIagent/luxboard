export enum TransportErrorType {
  VALIDATION = 'VALIDATION',
  API = 'API',
  NETWORK = 'NETWORK',
  UNKNOWN = 'UNKNOWN'
}

export class TransportError extends Error {
  public readonly type: TransportErrorType;
  public readonly provider?: string;
  public readonly originalError?: any;

  constructor(
    message: string,
    type: TransportErrorType,
    provider?: string,
    originalError?: any
  ) {
    super(message);
    this.name = 'TransportError';
    this.type = type;
    this.provider = provider;
    this.originalError = originalError;
  }

  static fromValidationError(message: string): TransportError {
    return new TransportError(message, TransportErrorType.VALIDATION);
  }

  static fromApiError(error: any, provider: string): TransportError {
    if (error.response) {
      // Erreur avec réponse du serveur
      const status = error.response.status;
      const message = error.response.data?.message || `Erreur ${status} de l'API ${provider}`;
      return new TransportError(message, TransportErrorType.API, provider, error);
    } else if (error.request) {
      // Erreur sans réponse du serveur
      return new TransportError(
        `Pas de réponse de l'API ${provider}`,
        TransportErrorType.NETWORK,
        provider,
        error
      );
    } else {
      // Erreur lors de la configuration de la requête
      return new TransportError(
        `Erreur de configuration pour l'API ${provider}`,
        TransportErrorType.UNKNOWN,
        provider,
        error
      );
    }
  }

  static fromNetworkError(error: any, provider: string): TransportError {
    return new TransportError(
      `Erreur réseau pour l'API ${provider}`,
      TransportErrorType.NETWORK,
      provider,
      error
    );
  }

  static fromUnknownError(error: any, provider: string): TransportError {
    return new TransportError(
      `Erreur inconnue pour l'API ${provider}`,
      TransportErrorType.UNKNOWN,
      provider,
      error
    );
  }
} 