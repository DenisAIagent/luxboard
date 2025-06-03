import { AuthProvider } from 'react-admin';
import { httpClient } from '../utils/httpClient';
import { setToken, removeToken } from '../utils/auth';

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const { json } = await httpClient('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: username, password }),
      });
      
      setToken(json.token);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  
  logout: () => {
    removeToken();
    return Promise.resolve();
  },
  
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      removeToken();
      return Promise.reject();
    }
    return Promise.resolve();
  },
  
  checkAuth: () => {
    const token = localStorage.getItem('luxboard_token');
    return token ? Promise.resolve() : Promise.reject();
  },
  
  getPermissions: () => {
    const token = localStorage.getItem('luxboard_token');
    if (!token) return Promise.reject();
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Promise.resolve(payload.role);
    } catch {
      return Promise.reject();
    }
  },
  
  getIdentity: async () => {
    try {
      const { json } = await httpClient('/api/auth/me');
      return Promise.resolve({
        id: json.id,
        fullName: json.name,
        avatar: json.avatar,
      });
    } catch {
      return Promise.reject();
    }
  },
}; 