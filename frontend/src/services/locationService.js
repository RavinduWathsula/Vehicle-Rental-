import { apiFetch } from './api';

export const locationService = {
  getLocations: async () => {
    return apiFetch('/locations');
  },
  getLocationById: async (id) => {
    return apiFetch(`/locations/${id}`);
  }
};
