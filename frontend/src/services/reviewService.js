import { apiFetch } from './api';

export const reviewService = {
  getReviews: async (vehicleId) => {
    return apiFetch(`/reviews/vehicle/${vehicleId}`);
  },
  submitReview: async (reviewData) => {
    return apiFetch('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  }
};
