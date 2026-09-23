import { apiFetch } from '../services/api';

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  category: 'compact' | 'sedan' | 'suv' | 'luxury' | 'minivan' | 'sport';
  pricePerDay: number;
  transmission: 'Automatic' | 'Manual';
  fuel: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  seats: number;
  doors: number;
  luggage: number;
  year: number;
  imageUrl: string;
  galleryImages: string[];
  features: string[];
}

export interface SearchParams {
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
}

export interface Extra {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  icon: string;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
}

export interface BookingPayload {
  vehicleId: string;
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  extras: string[];
  customer: CustomerDetails;
}

export interface BookingResponse {
  reference: string;
  status: 'confirmed' | 'pending' | 'failed';
  total: number;
  message?: string;
}

export interface BookingCalculationRequest {
  vehicleId: string;
  pickupDate: string;
  returnDate: string;
  extras: string[];
}

export interface BookingCalculationResponse {
  rentalDays: number;
  vehicleTotal: number;
  extrasTotal: number;
  taxes: number;
  grandTotal: number;
}

export const searchVehicles = async (params: SearchParams): Promise<Vehicle[]> => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      queryParams.append(key, value.toString());
    }
  });

  const response = await apiFetch(`/vehicles/search?${queryParams.toString()}`);
  return response.data || response as Vehicle[];
};

export const getVehicleById = async (id: string): Promise<Vehicle | null> => {
  const response = await apiFetch(`/vehicles/${id}`);
  return response.data || response as Vehicle;
};

export const calculateBookingPrice = async (data: BookingCalculationRequest): Promise<BookingCalculationResponse> => {
  const response = await apiFetch('/bookings/calculate', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response.data || response as BookingCalculationResponse;
};

export const getExtras = async (): Promise<Extra[]> => {
  const response = await apiFetch('/extras');
  return response.data || response as Extra[];
};

export const createBooking = async (payload: BookingPayload): Promise<BookingResponse> => {
  const response = await apiFetch('/bookings', { // Assuming backend uses /bookings for creation
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return response.data || response as BookingResponse;
};

export interface CustomerBooking {
  id: string;
  vehicle: {
    id: string;
    name: string;
    brand: string;
    imageUrl: string;
  };
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  returnDate: string;
  returnTime: string;
  returnLocation: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  total: number;
}

export const getCustomerBookings = async (): Promise<CustomerBooking[]> => {
  const response = await apiFetch('/bookings/my');
  return response.data || response as CustomerBooking[];
};
