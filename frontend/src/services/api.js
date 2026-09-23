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
    let data;
    
    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = { message: await response.text() };
    }

    if (!response.ok) {
      // Handle specific HTTP status codes
      switch (response.status) {
        case 401:
          // Unauthorized: Token expired or invalid
          localStorage.removeItem('drivex_token');
          window.dispatchEvent(new Event('auth-error'));
          throw new Error('Your session has expired. Please log in again.');
        case 403:
          throw new Error('You do not have permission to perform this action.');
        case 404:
          throw new Error('The requested resource was not found.');
        case 500:
          // Mask sensitive backend info
          throw new Error('An internal server error occurred. Please try again later.');
        default:
          throw new Error(data.message || 'An unexpected error occurred.');
      }
    }

    return data;
  } catch (error) {
    // Only log the actual error internally if needed, but the thrown error is sanitized above
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your connection or try again later.');
    }
    throw error;
  }
};
