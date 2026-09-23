import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getVehicleById, type Vehicle } from '../lib/api';
import { VehicleViewer } from '../components/vehicles/VehicleViewer';
import { BookingSummary } from '../components/booking/BookingSummary';
import { Users, Fuel, Settings, Briefcase, DoorOpen, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export const VehicleDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract dates from URL if the user came from the search page
  const [pickupDate, setPickupDate] = useState(searchParams.get('pickupDate') || '');
  const [returnDate, setReturnDate] = useState(searchParams.get('returnDate') || '');

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const data = await getVehicleById(id);
        setVehicle(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load vehicle details');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040508] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-[#040508] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <h1 className="text-3xl font-black text-white uppercase tracking-widest italic mb-4">{error || 'Vehicle not found'}</h1>
        <button 
          onClick={() => window.history.back()}
          className="text-[#D4AF37] hover:text-white transition-colors uppercase tracking-widest text-sm font-bold border-b border-[#D4AF37] hover:border-white pb-1"
        >
          Return to Fleet
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040508]">
      <div className="flex flex-col lg:flex-row">
        
        {/* Left Side: 3D Viewer or Image Gallery */}
        <div className="w-full lg:w-3/5 lg:sticky lg:top-0 lg:h-screen z-10 border-r border-white/5">
          <VehicleViewer vehicle={vehicle} />
        </div>

        {/* Right Side: Specifications and Booking */}
        <div className="w-full lg:w-2/5 min-h-screen pt-12 lg:pt-32 pb-32 px-6 md:px-12 z-20">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-[#D4AF37] text-black text-[10px] font-bold tracking-widest uppercase rounded-sm">
                {vehicle.category}
              </span>
              <span className="text-white/40 text-xs tracking-widest uppercase">
                {vehicle.year}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-2">
              {vehicle.brand} <span className="text-[#D4AF37]">{vehicle.name || vehicle.model}</span>
            </h1>
          </motion.div>

          <div className="my-12 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

          {/* Specifications Grid */}
          <div className="mb-16">
            <h2 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-6">Technical Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              
              <div className="flex flex-col p-4 bg-[#08090B] rounded-lg border border-white/5">
                <Users className="text-[#D4AF37] mb-3" size={20} />
                <span className="text-white text-lg font-bold">{vehicle.seats}</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Seats</span>
              </div>
              
              <div className="flex flex-col p-4 bg-[#08090B] rounded-lg border border-white/5">
                <Settings className="text-[#D4AF37] mb-3" size={20} />
                <span className="text-white text-lg font-bold">{vehicle.transmission}</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Transmission</span>
              </div>

              <div className="flex flex-col p-4 bg-[#08090B] rounded-lg border border-white/5">
                <Fuel className="text-[#D4AF37] mb-3" size={20} />
                <span className="text-white text-lg font-bold">{vehicle.fuel || vehicle.fuel_type}</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Fuel</span>
              </div>

              <div className="flex flex-col p-4 bg-[#08090B] rounded-lg border border-white/5">
                <DoorOpen className="text-[#D4AF37] mb-3" size={20} />
                <span className="text-white text-lg font-bold">{vehicle.doors || 4}</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Doors</span>
              </div>

              <div className="flex flex-col p-4 bg-[#08090B] rounded-lg border border-white/5">
                <Briefcase className="text-[#D4AF37] mb-3" size={20} />
                <span className="text-white text-lg font-bold">{vehicle.luggage || 2}</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Luggage Bags</span>
              </div>

              <div className="flex flex-col p-4 bg-[#08090B] rounded-lg border border-white/5">
                <Calendar className="text-[#D4AF37] mb-3" size={20} />
                <span className="text-white text-lg font-bold">{vehicle.year}</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Model Year</span>
              </div>

            </div>
          </div>

          {/* Features List */}
          {vehicle.features && vehicle.features.length > 0 && (
            <div className="mb-16">
              <h2 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-6">Premium Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                {vehicle.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white/80 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Booking Summary Section */}
          <div className="mt-8">
            <BookingSummary 
              vehicle={vehicle} 
              pickupDate={pickupDate}
              setPickupDate={setPickupDate}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
            />
          </div>

        </div>
      </div>
    </div>
  );
};
