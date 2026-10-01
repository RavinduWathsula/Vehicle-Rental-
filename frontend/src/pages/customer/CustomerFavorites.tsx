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

const mockFavorites = [];

export const CustomerFavorites = () => {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative z-10">
        <div>
          <h1 className="text-3xl font-black text-[var(--text)] italic uppercase tracking-wider mb-2">My Garage</h1>
          <p className="text-[var(--text-muted)] text-sm">Your saved vehicles, ready to be booked for your next journey.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {mockFavorites.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-24 text-center bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm">
            <div className="w-24 h-24 bg-[var(--sidebar)] rounded-full flex items-center justify-center mb-6 border border-[var(--border)]">
              <Heart className="text-[var(--text-muted)]" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text)] uppercase tracking-wider mb-2">Your Garage is Empty</h3>
            <p className="text-[var(--text-muted)] max-w-md mb-8">You haven't saved any vehicles to your garage yet. Heart your favorite cars to keep track of them here.</p>
            <Link 
              to="/dashboard/vehicles"
              className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] font-bold uppercase tracking-widest text-sm rounded-lg transition-all shadow-md"
            >
              Explore Vehicles
            </Link>
          </div>
        ) : (
          mockFavorites.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden group hover:border-[var(--accent)] transition-colors shadow-sm"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-80" />
                <button className="absolute top-4 right-4 w-10 h-10 bg-[var(--sidebar)]/80 backdrop-blur-md rounded-full flex items-center justify-center text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--text-inverse)] transition-colors border border-[var(--border)]">
                  <Heart size={18} fill="currentColor" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="px-2.5 py-1 bg-[var(--accent)]/20 backdrop-blur-md border border-[var(--accent)]/30 text-[var(--accent)] text-[10px] font-bold uppercase tracking-widest rounded">
                    {vehicle.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--text)] mb-4 uppercase tracking-wider">{vehicle.name}</h3>
                
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="bg-[var(--sidebar)] p-2 rounded-lg text-center border border-[var(--border)]">
                    <Zap size={14} className="mx-auto text-[var(--text-muted)] mb-1" />
                    <p className="text-[10px] font-bold text-[var(--text)]">{vehicle.specs.power}</p>
                  </div>
                  <div className="bg-[var(--sidebar)] p-2 rounded-lg text-center border border-[var(--border)]">
                    <Timer size={14} className="mx-auto text-[var(--text-muted)] mb-1" />
                    <p className="text-[10px] font-bold text-[var(--text)]">{vehicle.specs.accel}</p>
                  </div>
                  <div className="bg-[var(--sidebar)] p-2 rounded-lg text-center border border-[var(--border)]">
                    <Users size={14} className="mx-auto text-[var(--text-muted)] mb-1" />
                    <p className="text-[10px] font-bold text-[var(--text)]">{vehicle.specs.seats}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
                  <div>
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">Daily Rate</p>
                    <p className="text-xl font-black text-[var(--text)]">${vehicle.price}</p>
                  </div>
                  <Link 
                    to={`/dashboard/vehicles/${vehicle.id}`}
                    className="px-6 py-2 bg-[var(--card-hover)] border border-[var(--border)] hover:bg-[var(--accent)] hover:text-[var(--text-inverse)] hover:border-transparent text-[var(--text)] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        )}
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
