import { getToken } from './auth';

interface HttpClientOptions extends RequestInit {
  user?: {
    authenticated: boolean;
    token: string;
  };
}

export const httpClient = async (url: string, options: HttpClientOptions = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  
  const token = getToken();
  if (token) {
    (options.headers as Headers).set('Authorization', `Bearer ${token}`);
  }
  
  if (options.body) {
    (options.headers as Headers).set('Content-Type', 'application/json');
  }
  
  const response = await fetch(url, options);
  
  if (response.status === 401) {
    // Gérer l'expiration du token
    window.location.href = '/login';
    return Promise.reject();
  }
  
  if (response.status === 403) {
    return Promise.reject(new Error('Accès non autorisé'));
  }
  
  if (response.status < 200 || response.status >= 300) {
    return Promise.reject(new Error(response.statusText));
  }
  
  const json = await response.json();
  return { json };
}; 