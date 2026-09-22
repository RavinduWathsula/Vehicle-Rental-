export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Core API wrapper to handle auth tokens and uniform responses
 */
export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('drivex_token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred during the request');
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
};
