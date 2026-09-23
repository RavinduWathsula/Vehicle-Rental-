import { apiFetch } from './api';

export const driverService = {
  getDrivers: async () => {
    return apiFetch('/drivers');
  },
  getDriverById: async (id) => {
    return apiFetch(`/drivers/${id}`);
  }
};
