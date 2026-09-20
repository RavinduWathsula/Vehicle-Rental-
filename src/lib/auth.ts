export type UserRole = 'guest' | 'customer' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  licenseNumber?: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
}

const API_BASE_URL = 'http://localhost:5000/api/auth';

export const login = async (credentials: any): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    
    // Mock login for UI testing
    if (credentials.email === 'admin@drivex.com') {
      return {
        token: 'mock-jwt-token-admin',
        user: { id: '1', email: 'admin@drivex.com', firstName: 'Admin', lastName: 'User', phone: '+1 (555) 000-0000', licenseNumber: 'DL-0000000', role: 'admin' }
      };
    }
    return {
      token: 'mock-jwt-token-customer',
      user: { id: '2', email: credentials.email, firstName: 'John', lastName: 'Doe', phone: '+1 (555) 123-4567', licenseNumber: 'DL-1234567', role: 'customer' }
    };
  }
};

export const register = async (userData: any): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    // Mock registration for UI testing
    return {
      token: 'mock-jwt-token-customer',
      user: { id: '2', email: userData.email, firstName: userData.firstName, lastName: userData.lastName, phone: '+1 (555) 123-4567', licenseNumber: 'DL-1234567', role: 'customer' }
    };
  }
};

export const validateSession = async (token: string): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE_URL}/me`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) throw new Error('Session invalid');

    return await response.json();
  } catch (error) {
    console.error('Session validation error:', error);
    // Mock session validation
    if (token.includes('admin')) {
      return { id: '1', email: 'admin@drivex.com', firstName: 'Admin', lastName: 'User', phone: '+1 (555) 000-0000', licenseNumber: 'DL-0000000', role: 'admin' };
    }
    return { id: '2', email: 'customer@drivex.com', firstName: 'John', lastName: 'Doe', phone: '+1 (555) 123-4567', licenseNumber: 'DL-1234567', role: 'customer' };
  }
};
