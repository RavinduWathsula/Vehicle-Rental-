import { apiFetch } from './api';

export const vehicleService = {
  getVehicles: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/vehicles?${queryString}` : '/vehicles';
    return apiFetch(endpoint);
  },
  
  getVehicleById: async (id) => {
    return apiFetch(`/vehicles/${id}`);
  },
  
  getVehicleImages: async (id) => {
    return apiFetch(`/vehicles/${id}/images`);
  },
  
  checkAvailability: async (id, startDate, endDate) => {
    const params = new URLSearchParams({ startDate, endDate }).toString();
    return apiFetch(`/vehicles/${id}/availability?${params}`);
  }
};
