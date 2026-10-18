import { apiFetch } from '../services/api';

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model?: string;
  category: 'compact' | 'sedan' | 'suv' | 'luxury' | 'minivan' | 'sport';
  pricePerDay: number;
  transmission: 'Automatic' | 'Manual';
  fuel: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  fuel_type?: string;
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
  price?: number;
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
  extras?: string[];
  driverId?: string | null;
}

export interface BookingCalculationResponse {
  rentalDays: number;
  vehicleTotal: number;
  driverTotal?: number;
  extrasTotal: number;
  taxes: number;
  grandTotal: number;
}

export const formatVehicle = (v: any): Vehicle => ({
  id: String(v.id),
  name: v.name || `${v.brand || ''} ${v.model || ''}`.trim() || 'Vehicle',
  brand: v.brand || '',
  model: v.model || '',
  category: (v.category_name || v.category || 'Luxury').toLowerCase() as any,
  pricePerDay: parseFloat(v.daily_price || v.pricePerDay || 0),
  transmission: (v.transmission ? v.transmission.charAt(0).toUpperCase() + v.transmission.slice(1) : 'Automatic') as any,
  fuel: (v.fuel_type ? v.fuel_type.charAt(0).toUpperCase() + v.fuel_type.slice(1) : (v.fuel || 'Petrol')) as any,
  fuel_type: v.fuel_type,
  seats: v.seats || 4,
  doors: v.doors || 4,
  luggage: v.luggage_capacity || v.luggage || 2,
  year: v.year || new Date().getFullYear(),
  imageUrl: v.primary_image || v.image_url || v.imageUrl || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
  galleryImages: v.galleryImages || [],
  features: v.features || ['Air Conditioning', 'Bluetooth', 'Touchscreen Infotainment', 'Safety Assist']
});

export const searchVehicles = async (params: SearchParams): Promise<Vehicle[]> => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      queryParams.append(key, value.toString());
    }
  });

  const response = await apiFetch(`/vehicles/search?${queryParams.toString()}`);
  const items = response.data || response || [];
  return Array.isArray(items) ? items.map(formatVehicle) : [];
};

export const getVehicleById = async (id: string): Promise<Vehicle | null> => {
  const response = await apiFetch(`/vehicles/${id}`);
  const v = response.data || response;
  return v ? formatVehicle(v) : null;
};

export const calculateBookingPrice = async (data: BookingCalculationRequest): Promise<BookingCalculationResponse> => {
  const pickup_datetime = data.pickupDate.includes('T') ? data.pickupDate : `${data.pickupDate}T10:00:00.000Z`;
  const return_datetime = data.returnDate.includes('T') ? data.returnDate : `${data.returnDate}T10:00:00.000Z`;

  const backendPayload = {
    vehicle_id: Number(data.vehicleId),
    pickup_datetime,
    return_datetime,
    extras: (data.extras || []).map((e: any) => typeof e === 'object' ? e : { extra_id: Number(e) || 1, quantity: 1 }),
    driver_id: data.driverId ? Number(data.driverId) : null
  };
  
  const response = await apiFetch('/bookings/calculate', {
    method: 'POST',
    body: JSON.stringify(backendPayload)
  });
  
  const pricing = response.data || response;
  return {
    rentalDays: pricing.rentalDays || 1,
    vehicleTotal: pricing.vehicle_amount || 0,
    driverTotal: pricing.driver_amount || 0,
    extrasTotal: pricing.extras_amount || 0,
    taxes: pricing.tax_amount || 0,
    grandTotal: pricing.total_amount || 0
  } as BookingCalculationResponse;
};

export const getExtras = async (): Promise<Extra[]> => {
  const response = await apiFetch('/extras');
  return response.data || response as Extra[];
};

export const createBooking = async (payload: BookingPayload): Promise<BookingResponse> => {
  const pickup_datetime = payload.pickupDate && payload.pickupTime 
    ? `${payload.pickupDate}T${payload.pickupTime}:00.000Z` 
    : (payload.pickupDate ? `${payload.pickupDate}T10:00:00.000Z` : new Date().toISOString());
  const return_datetime = payload.returnDate && payload.returnTime 
    ? `${payload.returnDate}T${payload.returnTime}:00.000Z` 
    : (payload.returnDate ? `${payload.returnDate}T10:00:00.000Z` : new Date(Date.now() + 86400000).toISOString());

  const backendPayload = {
    vehicle_id: Number(payload.vehicleId),
    pickup_location_id: 1,
    return_location_id: 1,
    pickup_datetime,
    return_datetime,
    extras: (payload.extras || []).map((e: any) => typeof e === 'object' ? e : { extra_id: Number(e) || 1, quantity: 1 })
  };

  const response = await apiFetch('/bookings', {
    method: 'POST',
    body: JSON.stringify(backendPayload)
  });

  const b = response.data || response;
  return {
    reference: b.booking_reference || `BK-${b.id}`,
    status: 'confirmed',
    total: parseFloat(b.total_amount) || 0,
    message: response.message
  };
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
  const items = response.data || [];
  return items.map((b: any) => {
    const rawDatePickup = b.pickup_datetime ? String(b.pickup_datetime) : '';
    const rawDateReturn = b.return_datetime ? String(b.return_datetime) : '';

    return {
      id: b.booking_reference || `BK-${b.id}`,
      vehicle: {
        id: String(b.vehicle_id || ''),
        name: `${b.brand || ''} ${b.model || ''}`.trim() || 'Vehicle',
        brand: b.brand || '',
        imageUrl: b.vehicle_image || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop'
      },
      pickupDate: rawDatePickup.includes('T') ? rawDatePickup.split('T')[0] : rawDatePickup,
      pickupTime: rawDatePickup.includes('T') ? rawDatePickup.split('T')[1].substring(0, 5) : '10:00',
      pickupLocation: 'Downtown Office',
      returnDate: rawDateReturn.includes('T') ? rawDateReturn.split('T')[0] : rawDateReturn,
      returnTime: rawDateReturn.includes('T') ? rawDateReturn.split('T')[1].substring(0, 5) : '10:00',
      returnLocation: 'Downtown Office',
      status: (b.booking_status || 'upcoming').toLowerCase() as any,
      total: parseFloat(b.total_amount) || 0
    };
  });
};
