import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Car, 
  ChevronRight,
  Star,
  Zap,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const mockFavorites = [
  { id: 'V-001', name: 'Porsche 911 GT3 RS', category: 'Sports', price: 850, image: 'https://images.unsplash.com/photo-1503376713217-1f19f2a01337?q=80&w=3200&auto=format&fit=crop', specs: { power: '520 hp', accel: '3.0s', seats: '2' } },
  { id: 'V-004', name: 'Range Rover Sport', category: 'SUV', price: 450, image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=3200&auto=format&fit=crop', specs: { power: '395 hp', accel: '5.9s', seats: '5' } },
  { id: 'V-006', name: 'Rolls Royce Phantom', category: 'Ultra Luxury', price: 1500, image: 'https://images.unsplash.com/photo-1631269385624-954388cb5d5a?q=80&w=3200&auto=format&fit=crop', specs: { power: '563 hp', accel: '5.1s', seats: '4' } }
];

export const CustomerFavorites = () => {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative z-10">
        <div>
          <h1 className="text-3xl font-black text-white italic uppercase tracking-wider mb-2">My Garage</h1>
          <p className="text-gray-400 text-sm">Your saved vehicles, ready to be booked for your next journey.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {mockFavorites.map((vehicle, index) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-[#00E5FF]/50 transition-colors backdrop-blur-md"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <button className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black transition-colors border border-white/10">
                <Heart size={18} fill="currentColor" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-2.5 py-1 bg-[#00E5FF]/20 backdrop-blur-md border border-[#00E5FF]/30 text-[#00E5FF] text-[10px] font-bold uppercase tracking-widest rounded">
                  {vehicle.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{vehicle.name}</h3>
              
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="bg-black/40 p-2 rounded-lg text-center border border-white/5">
                  <Zap size={14} className="mx-auto text-gray-400 mb-1" />
                  <p className="text-[10px] font-bold text-white">{vehicle.specs.power}</p>
                </div>
                <div className="bg-black/40 p-2 rounded-lg text-center border border-white/5">
                  <Timer size={14} className="mx-auto text-gray-400 mb-1" />
                  <p className="text-[10px] font-bold text-white">{vehicle.specs.accel}</p>
                </div>
                <div className="bg-black/40 p-2 rounded-lg text-center border border-white/5">
                  <Users size={14} className="mx-auto text-gray-400 mb-1" />
                  <p className="text-[10px] font-bold text-white">{vehicle.specs.seats}</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Daily Rate</p>
                  <p className="text-xl font-black text-white">${vehicle.price}</p>
                </div>
                <Link 
                  to={`/dashboard/vehicles/${vehicle.id}`}
                  className="px-6 py-2 bg-white/10 hover:bg-[#00E5FF] hover:text-black text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Dummy Timer icon since I didn't import it from lucide-react directly
const Timer = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="10" y1="2" x2="14" y2="2"></line>
    <line x1="12" y1="14" x2="15" y2="11"></line>
    <circle cx="12" cy="14" r="8"></circle>
  </svg>
);
