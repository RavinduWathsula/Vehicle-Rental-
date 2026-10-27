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
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });

  const resData = await response.json();
  if (!response.ok || !resData.success) {
    throw new Error(resData.message || 'Login failed. Please check your credentials.');
  }

  const user = resData.data?.user || resData.data;
  const token = resData.data?.token || resData.token;

  const nameParts = (user.name || '').trim().split(' ');
  const formattedUser: User = {
    id: String(user.id),
    email: user.email,
    firstName: nameParts[0] || 'User',
    lastName: nameParts.slice(1).join(' ') || '',
    phone: user.phone || '',
    licenseNumber: user.license_number || '',
    role: user.role
  };

  localStorage.setItem('drivex_token', token);
  localStorage.setItem('drivex_user', JSON.stringify(user));

  return { token, user: formattedUser };
};

export const register = async (userData: any): Promise<AuthResponse> => {
  const name = (userData.name || `${userData.firstName || ''} ${userData.lastName || ''}`).trim();
  const payload = {
    name,
    email: userData.email,
    password: userData.password,
    phone: userData.phone || null
  };

  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const resData = await response.json();
  if (!response.ok || !resData.success) {
    throw new Error(resData.message || 'Registration failed.');
  }

  const user = resData.data?.user || resData.data;
  const token = resData.data?.token || resData.token;

  const nameParts = (user.name || '').trim().split(' ');
  const formattedUser: User = {
    id: String(user.id),
    email: user.email,
    firstName: nameParts[0] || 'User',
    lastName: nameParts.slice(1).join(' ') || '',
    phone: user.phone || '',
    licenseNumber: user.license_number || '',
    role: user.role
  };

  if (token) {
    localStorage.setItem('drivex_token', token);
  }
  localStorage.setItem('drivex_user', JSON.stringify(user));

  return { token, user: formattedUser };
};

export const validateSession = async (token: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/me`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error('Session invalid');
  }

  const resData = await response.json();
  const user = resData.data?.user || resData.data;

  const nameParts = (user.name || '').trim().split(' ');
  const formattedUser: User = {
    id: String(user.id),
    email: user.email,
    firstName: nameParts[0] || 'User',
    lastName: nameParts.slice(1).join(' ') || '',
    phone: user.phone || '',
    licenseNumber: user.license_number || '',
    role: user.role
  };

  localStorage.setItem('drivex_user', JSON.stringify(user));
  return formattedUser;
};
