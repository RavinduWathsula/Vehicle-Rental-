import { apiFetch } from './api';

export const bookingService = {
  createBooking: async (bookingData) => {
    return apiFetch('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },
  
  getMyBookings: async () => {
    return apiFetch('/bookings/my');
  },
  
  getBookingById: async (id) => {
    return apiFetch(`/bookings/${id}`);
  },
  
  cancelBooking: async (id) => {
    return apiFetch(`/bookings/${id}/cancel`, {
      method: 'PUT'
    });
  }
};
