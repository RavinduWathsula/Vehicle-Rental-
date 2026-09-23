import { apiFetch } from './api';

export const maintenanceService = {
  getMaintenanceLogs: async (vehicleId) => {
    return apiFetch(`/maintenance${vehicleId ? `?vehicleId=${vehicleId}` : ''}`);
  },
  logMaintenance: async (data) => {
    return apiFetch('/maintenance', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
};
