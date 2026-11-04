import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Car, 
  ChevronRight, 
  Trash2, 
  Gauge, 
  Fuel, 
  Users, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const CustomerFavorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<any[]>([]);

  const loadFavorites = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('drivex_favorites') || '[]');
      setFavorites(Array.isArray(stored) ? stored : []);
    } catch (e) {
      setFavorites([]);
    }
  };

  useEffect(() => {
    loadFavorites();
    window.addEventListener('favorites-updated', loadFavorites);
    return () => window.removeEventListener('favorites-updated', loadFavorites);
  }, []);

  const removeFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const updated = favorites.filter(f => String(f.id) !== String(id));
      setFavorites(updated);
      localStorage.setItem('drivex_favorites', JSON.stringify(updated));
      window.dispatchEvent(new Event('favorites-updated'));
    } catch (e) {}
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      
      {/* Header */}
      <div className="relative bg-gradient-to-r from-[var(--sidebar)] via-[var(--card)] to-[var(--sidebar)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 shadow-sm">
                <Sparkles size={13} /> Private Garage Collection
              </span>
              <span className="text-xs font-semibold text-[var(--text-muted)] hidden sm:inline">
                • {favorites.length} Saved Supercars
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-[var(--text)] tracking-tight uppercase">
              MY DIGITAL <span className="text-[var(--accent)]">GARAGE</span>
            </h1>
            <p className="text-sm text-[var(--text-muted)] max-w-xl">
              Your hand-curated exotic vehicles, tracked and primed for instant road reservation whenever inspiration strikes.
            </p>
          </div>

          <Link
            to="/dashboard/vehicles"
            className="px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-lg shadow-[var(--accent)]/20 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Car size={16} /> Explore Full Fleet
          </Link>
        </div>
      </div>

      {/* Grid of Favorited Cars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        <AnimatePresence mode="popLayout">
          {favorites.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center bg-[var(--card)] border border-[var(--border)] rounded-3xl shadow-sm space-y-4"
            >
              <div className="w-20 h-20 bg-[var(--sidebar)] rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--text-muted)] shadow-inner">
                <Heart size={36} />
              </div>
              <div className="max-w-md space-y-2">
                <h3 className="text-2xl font-black text-[var(--text)] uppercase tracking-wider">Your Garage is Empty</h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  You haven't saved any vehicles to your garage yet. Click the heart icon on any supercar in the fleet showroom to keep track of it here.
                </p>
              </div>
              <Link 
                to="/dashboard/vehicles"
                className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] font-bold uppercase tracking-widest text-xs rounded-xl transition-all shadow-md mt-2"
              >
                Explore Vehicles
              </Link>
            </motion.div>
          ) : (
            favorites.map((vehicle, index) => {
              const rawPrice = Number(vehicle.daily_price || vehicle.pricePerDay || 45);
              const priceLKR = rawPrice < 1000 ? rawPrice * 300 : rawPrice;

              return (
                <motion.div
                  key={vehicle.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)]/50 rounded-3xl overflow-hidden group transition-all shadow-sm hover:shadow-xl flex flex-col justify-between"
                >
                  <div className="relative h-52 overflow-hidden bg-black/60">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-transparent to-black/30" />
                    
                    <button 
                      onClick={(e) => removeFavorite(vehicle.id, e)}
                      className="absolute top-4 right-4 w-9 h-9 bg-rose-500/20 backdrop-blur-md rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-colors border border-rose-500/40 cursor-pointer"
                      title="Remove from Garage"
                    >
                      <Trash2 size={15} />
                    </button>

                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-[var(--accent)]/30 text-[var(--accent)] text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {vehicle.category || 'Luxury'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--accent)] mb-0.5">
                        {vehicle.brand}
                      </p>
                      <h3 className="text-xl font-black text-[var(--text)] tracking-tight truncate">
                        {vehicle.model || vehicle.name}
                      </h3>
                      
                      <div className="flex items-center gap-3 mt-3 text-xs text-[var(--text-muted)] font-medium">
                        <span className="flex items-center gap-1 bg-[var(--sidebar)] px-2.5 py-1 rounded-lg border border-[var(--border)]">
                          <Gauge size={13} className="text-[var(--accent)]" /> {vehicle.transmission || 'Automatic'}
                        </span>
                        <span className="flex items-center gap-1 bg-[var(--sidebar)] px-2.5 py-1 rounded-lg border border-[var(--border)]">
                          <Users size={13} className="text-[var(--accent)]" /> {vehicle.seats || 4} Seats
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
                      <div>
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold">Daily Rate</p>
                        <p className="text-lg font-black text-[var(--text)]">
                          LKR {priceLKR.toLocaleString()}
                        </p>
                      </div>

                      <button 
                        onClick={() => navigate(`/dashboard/booking/${vehicle.id}`)}
                        className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        Book Now <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
