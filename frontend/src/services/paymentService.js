import { apiFetch } from './api';

export const paymentService = {
  processPayment: async (paymentData) => {
    return apiFetch('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData)
    });
  },
  getPaymentHistory: async () => {
    return apiFetch('/payments/history');
  }
};
