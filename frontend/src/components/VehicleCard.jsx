import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Fuel, Gauge, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import Badge from './Badge';

const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);

  // Use a high-res placeholder if no image exists
  const imageUrl = vehicle.primary_image 
    ? vehicle.primary_image 
    : (vehicle.image_url || vehicle.imageUrl || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop');

  const isAvailable = vehicle.status === 'available' || !vehicle.status;
  const rawPrice = Number(vehicle.daily_price || vehicle.pricePerDay || 45);
  const priceLKR = rawPrice < 1000 ? rawPrice * 300 : rawPrice;

  // Check if favorited
  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('drivex_favorites') || '[]');
      setIsFavorited(favs.some((f) => String(f.id) === String(vehicle.id)));
    } catch (e) {}
  }, [vehicle.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    try {
      const favs = JSON.parse(localStorage.getItem('drivex_favorites') || '[]');
      const exists = favs.some((f) => String(f.id) === String(vehicle.id));
      let nextFavs;
      if (exists) {
        nextFavs = favs.filter((f) => String(f.id) !== String(vehicle.id));
        setIsFavorited(false);
      } else {
        const itemToSave = {
          id: vehicle.id,
          name: `${vehicle.brand || ''} ${vehicle.model || vehicle.name || ''}`.trim(),
          brand: vehicle.brand,
          model: vehicle.model,
          category: vehicle.category_name || vehicle.category || 'Luxury',
          image: imageUrl,
          daily_price: vehicle.daily_price,
          pricePerDay: vehicle.daily_price,
          transmission: vehicle.transmission,
          fuel: vehicle.fuel_type,
          seats: vehicle.seats,
        };
        nextFavs = [...favs, itemToSave];
        setIsFavorited(true);
      }
      localStorage.setItem('drivex_favorites', JSON.stringify(nextFavs));
      window.dispatchEvent(new Event('favorites-updated'));
    } catch (e) {}
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    const isDashboard = window.location.pathname.startsWith('/dashboard');
    navigate(isDashboard ? `/dashboard/booking/${vehicle.id}` : `/booking/${vehicle.id}`);
  };

  const handleViewVehicle = () => {
    const isDashboard = window.location.pathname.startsWith('/dashboard');
    navigate(isDashboard ? `/dashboard/vehicles/${vehicle.id}` : `/vehicles/${vehicle.id}`);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -6 }}
      className="group relative bg-[var(--card)] hover:bg-[var(--card-hover)] border border-[var(--border)] hover:border-[var(--accent)]/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-[480px]"
    >
      {/* Large Image Section */}
      <div className="relative h-3/5 w-full overflow-hidden bg-black/60">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-transparent to-black/30 z-10" />
        <img 
          src={imageUrl} 
          alt={`${vehicle.brand} ${vehicle.model || vehicle.name}`} 
          className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        
        {/* Availability Badge */}
        <div className="absolute top-4 left-4 z-20">
          <Badge variant={isAvailable ? 'accent' : 'default'}>
            {isAvailable ? 'AVAILABLE' : (vehicle.status === 'maintenance' ? 'MAINTENANCE' : 'RESERVED')}
          </Badge>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-4 right-4 z-20 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer border ${
            isFavorited
              ? 'bg-rose-500/20 text-rose-500 border-rose-500/40 shadow-lg shadow-rose-500/25'
              : 'bg-black/50 hover:bg-black/80 text-white/70 hover:text-white border-white/20'
          }`}
          title={isFavorited ? 'Remove from My Garage' : 'Save to My Garage'}
        >
          <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
        </button>
        
        {/* Category Pill */}
        <div className="absolute bottom-4 left-4 z-20">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[var(--accent)] text-[10px] font-bold uppercase tracking-widest border border-[var(--accent)]/30 rounded-full shadow-sm">
            {vehicle.category_name || vehicle.category || 'Luxury'}
          </span>
        </div>
      </div>
      
      {/* Details Section */}
      <div className="p-5 sm:p-6 relative z-20 flex-1 flex flex-col justify-between bg-[var(--card)]">
        
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--accent)] mb-0.5">
            {vehicle.brand}
          </p>
          <h3 className="text-xl sm:text-2xl font-black text-[var(--text)] tracking-tight truncate">
            {vehicle.model || vehicle.name}
          </h3>
          
          {/* Key Spec Badges */}
          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[var(--text-muted)] font-medium">
            <span className="flex items-center gap-1 bg-[var(--sidebar)] px-2.5 py-1 rounded-lg border border-[var(--border)]">
              <Gauge size={13} className="text-[var(--accent)]" />
              {vehicle.transmission || 'Automatic'}
            </span>
            <span className="flex items-center gap-1 bg-[var(--sidebar)] px-2.5 py-1 rounded-lg border border-[var(--border)]">
              <Fuel size={13} className="text-[var(--accent)]" />
              {vehicle.fuel_type || 'Petrol'}
            </span>
            <span className="flex items-center gap-1 bg-[var(--sidebar)] px-2.5 py-1 rounded-lg border border-[var(--border)]">
              <Users size={13} className="text-[var(--accent)]" />
              {vehicle.seats || 4} Seats
            </span>
          </div>
        </div>
        
        {/* Price and CTA Container */}
        <div className="mt-4 pt-3 border-t border-[var(--border)]/70 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Daily Rate</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-black text-[var(--text)]">
                LKR {priceLKR.toLocaleString()}
              </span>
              <span className="text-[10px] font-mono text-[var(--text-muted)] hidden sm:inline">
                (${rawPrice}/day)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookNow}
              disabled={!isAvailable}
              className={`px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-md flex items-center gap-1.5 ${
                isAvailable
                  ? 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] shadow-[var(--accent)]/20 cursor-pointer'
                  : 'bg-[var(--sidebar)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--border)]'
              }`}
            >
              {isAvailable ? 'Book' : 'Reserved'} <ArrowRight size={13} />
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default VehicleCard;
