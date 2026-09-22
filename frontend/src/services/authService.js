import { apiFetch } from './api';

export const authService = {
  login: async (credentials) => {
    return apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  register: async (userData) => {
    return apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  getMe: async () => {
    return apiFetch('/auth/me');
  },
  
  logout: () => {
    localStorage.removeItem('drivex_token');
    localStorage.removeItem('drivex_user');
  }
};
