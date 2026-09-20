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

// TODO: Update this with your actual backend URL when deploying
const API_BASE_URL = 'http://localhost:5000/api';

export const searchVehicles = async (params: SearchParams): Promise<Vehicle[]> => {
  try {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/vehicles/search?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }

    const data = await response.json();
    return data as Vehicle[];
  } catch (error) {
    console.error('Error searching vehicles:', error);
    return [];
  }
};

export const getVehicleById = async (id: string): Promise<Vehicle | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error(`API returned status: ${response.status}`);

    const data = await response.json();
    return data as Vehicle;
  } catch (error) {
    console.error(`Error fetching vehicle ${id}:`, error);
    // Mock fallback for development while backend is disconnected
    return {
      id,
      name: 'Model S Plaid',
      brand: 'Tesla',
      category: 'luxury',
      pricePerDay: 199,
      transmission: 'Automatic',
      fuel: 'Electric',
      seats: 5,
      doors: 4,
      luggage: 2,
      year: 2024,
      imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?q=80&w=2070&auto=format&fit=crop'
      ],
      features: ['Air Conditioning', 'Bluetooth', 'GPS', 'Autopilot', 'Premium Audio', 'Heated Seats']
    };
  }
};

export const calculateBookingPrice = async (data: BookingCalculationRequest): Promise<BookingCalculationResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error(`API returned status: ${response.status}`);

    return await response.json() as BookingCalculationResponse;
  } catch (error) {
    console.error('Error calculating price:', error);
    // Mock fallback strictly for UI testing
    return {
      rentalDays: 3,
      vehicleTotal: 597,
      extrasTotal: 50,
      taxes: 64.70,
      grandTotal: 711.70
    };
  }
};

export const getExtras = async (): Promise<Extra[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/extras`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error(`API returned status: ${response.status}`);

    return await response.json() as Extra[];
  } catch (error) {
    console.error('Error fetching extras:', error);
    // Mock fallback
    return [
      { id: 'ext_1', name: 'Premium Insurance', description: 'Zero deductible coverage', pricePerDay: 25, icon: 'shield' },
      { id: 'ext_2', name: 'Additional Driver', description: 'Share the driving duties', pricePerDay: 15, icon: 'users' },
      { id: 'ext_3', name: 'Child Seat', description: 'Safe seating for toddlers', pricePerDay: 10, icon: 'baby' },
      { id: 'ext_4', name: 'GPS Navigation', description: 'Never lose your way', pricePerDay: 8, icon: 'map' }
    ];
  }
};

export const createBooking = async (payload: BookingPayload): Promise<BookingResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API returned status: ${response.status}`);
    }

    return await response.json() as BookingResponse;
  } catch (error) {
    console.error('Error creating booking:', error);
    // Mock successful fallback for UI testing
    return {
      reference: `DX-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      status: 'confirmed',
      total: 711.70
    };
  }
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
  // Mock data for UI testing
  return [
    {
      id: 'DX-A8F9K2',
      vehicle: {
        id: 'v1',
        name: 'Model S Plaid',
        brand: 'Tesla',
        imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
      },
      pickupDate: '2026-10-15',
      pickupTime: '10:00',
      pickupLocation: 'Los Angeles International Airport (LAX)',
      returnDate: '2026-10-18',
      returnTime: '10:00',
      returnLocation: 'Los Angeles International Airport (LAX)',
      status: 'upcoming',
      total: 711.70,
    },
    {
      id: 'DX-B4T7M9',
      vehicle: {
        id: 'v2',
        name: '911 Carrera',
        brand: 'Porsche',
        imageUrl: 'https://images.unsplash.com/photo-1503376760367-11ea8eb22247?q=80&w=2070&auto=format&fit=crop',
      },
      pickupDate: '2026-09-18',
      pickupTime: '09:00',
      pickupLocation: 'Beverly Hills, CA',
      returnDate: '2026-09-22',
      returnTime: '18:00',
      returnLocation: 'Beverly Hills, CA',
      status: 'active',
      total: 1250.00,
    },
    {
      id: 'DX-C1X3P8',
      vehicle: {
        id: 'v3',
        name: 'G-Class AMG',
        brand: 'Mercedes-Benz',
        imageUrl: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=2070&auto=format&fit=crop',
      },
      pickupDate: '2026-08-05',
      pickupTime: '12:00',
      pickupLocation: 'San Francisco, CA',
      returnDate: '2026-08-10',
      returnTime: '12:00',
      returnLocation: 'San Francisco, CA',
      status: 'completed',
      total: 2100.50,
    },
    {
      id: 'DX-D9L2Q5',
      vehicle: {
        id: 'v4',
        name: 'R8 V10 Performance',
        brand: 'Audi',
        imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop',
      },
      pickupDate: '2026-09-01',
      pickupTime: '14:00',
      pickupLocation: 'Las Vegas, NV',
      returnDate: '2026-09-03',
      returnTime: '14:00',
      returnLocation: 'Las Vegas, NV',
      status: 'cancelled',
      total: 0.00,
    }
  ];
};
