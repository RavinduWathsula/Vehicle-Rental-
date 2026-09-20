import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getVehicleById, type Vehicle } from '../lib/api';
import { VehicleGallery } from '../components/vehicles/VehicleGallery';
import { BookingSummary } from '../components/booking/BookingSummary';
import { Users, Fuel, Settings, Briefcase, DoorOpen, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export const VehicleDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  // Extract dates from URL if the user came from the search page
  const pickupDate = searchParams.get('pickupDate') || '2026-10-01'; // Defaulting for demo purposes
  const returnDate = searchParams.get('returnDate') || '2026-10-04'; // Defaulting for demo purposes

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id) return;
      setLoading(true);
      const data = await getVehicleById(id);
      setVehicle(data);
      setLoading(false);
    };

    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08090B] flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-[#08090B] flex items-center justify-center pt-20">
        <h1 className="text-2xl text-white">Vehicle not found.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090B]">
      <div className="flex flex-col lg:flex-row">
        
        {/* Left Side: Sticky Gallery */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen z-10">
          <VehicleGallery images={vehicle.galleryImages} />
        </div>

        {/* Right Side: Scrollable Content */}
        <div className="w-full lg:w-1/2 min-h-screen pt-24 lg:pt-32 pb-24 px-6 md:px-12 xl:px-20 z-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-1"
          >
            <span className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-2">
              {vehicle.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight">
              {vehicle.name}
            </h1>
            <p className="text-2xl text-white/50 font-light mt-2">{vehicle.brand}</p>
          </motion.div>

          <div className="my-16 h-px w-full bg-gradient-to-r from-white/20 to-transparent" />

          {/* Specifications Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-heading font-bold text-white mb-8">Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              
              <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-sm border border-white/5">
                <Users className="text-[#D4AF37]" size={24} />
                <span className="text-white/50 text-xs uppercase tracking-widest mt-2">Seats</span>
                <span className="text-white text-lg font-medium">{vehicle.seats}</span>
              </div>
              
              <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-sm border border-white/5">
                <Settings className="text-[#D4AF37]" size={24} />
                <span className="text-white/50 text-xs uppercase tracking-widest mt-2">Transmission</span>
                <span className="text-white text-lg font-medium">{vehicle.transmission}</span>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-sm border border-white/5">
                <Fuel className="text-[#D4AF37]" size={24} />
                <span className="text-white/50 text-xs uppercase tracking-widest mt-2">Fuel</span>
                <span className="text-white text-lg font-medium">{vehicle.fuel}</span>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-sm border border-white/5">
                <DoorOpen className="text-[#D4AF37]" size={24} />
                <span className="text-white/50 text-xs uppercase tracking-widest mt-2">Doors</span>
                <span className="text-white text-lg font-medium">{vehicle.doors}</span>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-sm border border-white/5">
                <Briefcase className="text-[#D4AF37]" size={24} />
                <span className="text-white/50 text-xs uppercase tracking-widest mt-2">Luggage</span>
                <span className="text-white text-lg font-medium">{vehicle.luggage} bags</span>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-sm border border-white/5">
                <Calendar className="text-[#D4AF37]" size={24} />
                <span className="text-white/50 text-xs uppercase tracking-widest mt-2">Year</span>
                <span className="text-white text-lg font-medium">{vehicle.year}</span>
              </div>

            </div>
          </div>

          {/* Features List */}
          <div className="mb-16">
            <h2 className="text-2xl font-heading font-bold text-white mb-8">Premium Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicle.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Booking Summary Section */}
          <div className="mt-20">
            <BookingSummary vehicle={vehicle} pickupDate={pickupDate} returnDate={returnDate} />
          </div>

        </div>
      </div>
    </div>
  );
};
