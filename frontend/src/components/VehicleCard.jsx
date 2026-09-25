import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Badge from './Badge';

const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();
  // Use a placeholder if no image exists
  const imageUrl = vehicle.images && vehicle.images.length > 0 
    ? vehicle.images[0].image_url 
    : 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop';

  const isAvailable = vehicle.status === 'available';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -10 }}
      className="group relative bg-[#08090B] border border-white/5 rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(212,175,55,0.1)] transition-all duration-500 flex flex-col h-[500px]"
    >
      {/* Large Image Section */}
      <div className="relative h-3/5 w-full overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-black/40 z-10" />
        <img 
          src={imageUrl} 
          alt={`${vehicle.brand} ${vehicle.model}`} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        
        {/* Availability Badge */}
        <div className="absolute top-4 right-4 z-20">
          <Badge variant={isAvailable ? 'accent' : 'default'}>
            {isAvailable ? 'AVAILABLE' : 'RESERVED'}
          </Badge>
        </div>
        
        {/* Category Pill */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-widest border border-white/10 rounded-full">
            {vehicle.category || 'Luxury'}
          </span>
        </div>
      </div>
      
      {/* Details Section */}
      <div className="p-6 relative z-20 flex-1 flex flex-col justify-between bg-[#08090B]">
        
        <div>
          <h3 className="text-2xl font-bold text-white mb-1 uppercase tracking-wide">
            {vehicle.brand} <span className="text-[#00E5FF]">{vehicle.model}</span>
          </h3>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs text-gray-400 uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
              {vehicle.transmission || 'Auto'}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              {vehicle.fuel_type || 'Petrol'}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              {vehicle.seats || 4} Seats
            </span>
          </div>
        </div>
        
        {/* Price and CTA Container (Overlapping logic for slide-up reveal) */}
        <div className="mt-6 relative overflow-hidden h-14">
          {/* Default Price View (Slides down on hover) */}
          <div className="absolute inset-0 flex items-center justify-between transition-transform duration-300 transform group-hover:translate-y-full">
            <p className="text-xs text-gray-500 uppercase tracking-widest">Daily Rate</p>
            <p className="text-3xl font-black text-white">
              ${vehicle.daily_price}<span className="text-sm text-gray-500 font-normal">/day</span>
            </p>
          </div>
          
          {/* CTA Buttons (Slides up on hover) */}
          <div className="absolute inset-0 flex items-center justify-between gap-3 transition-transform duration-300 transform -translate-y-full group-hover:translate-y-0">
            <button 
              onClick={() => navigate(`/vehicles/${vehicle.id}`)}
              className="flex-1 py-3 border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded-sm text-center"
            >
              View Vehicle
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/booking/${vehicle.id}`);
              }}
              disabled={!isAvailable}
              className={`flex-1 py-3 font-bold text-xs uppercase tracking-widest transition-colors rounded-sm text-center ${
                isAvailable 
                  ? 'bg-[var(--color-drivex-accent)] text-black hover:bg-white' 
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              Book Now
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default VehicleCard;
