import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Badge from './Badge';

const VehicleCard = ({ vehicle }) => {
  // Use a placeholder if no image exists
  const imageUrl = vehicle.images && vehicle.images[0] 
    ? vehicle.images[0].image_url 
    : 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop';

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group bg-[#111218] border border-white/5 rounded-xl overflow-hidden hover:border-[var(--color-drivex-accent)]/30 transition-all duration-500"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#111218] to-transparent z-10" />
        <img 
          src={imageUrl} 
          alt={`${vehicle.brand} ${vehicle.model}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 z-20">
          <Badge variant={vehicle.status === 'available' ? 'accent' : 'default'}>
            {vehicle.status.toUpperCase()}
          </Badge>
        </div>
      </div>
      
      <div className="p-5 relative z-20 -mt-6">
        <h3 className="text-xl font-bold text-white mb-1">{vehicle.brand} {vehicle.model}</h3>
        <p className="text-sm text-gray-400 mb-4">{vehicle.year} • {vehicle.transmission} • {vehicle.fuel_type}</p>
        
        <div className="flex items-end justify-between mt-6">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Starting from</p>
            <p className="text-2xl font-bold text-[var(--color-drivex-accent)]">
              ${vehicle.daily_price}<span className="text-sm text-gray-500 font-normal">/day</span>
            </p>
          </div>
          
          <Link 
            to={`/vehicles/${vehicle.id}`}
            className="px-4 py-2 border border-white/20 text-white rounded hover:bg-white/10 transition-colors text-sm font-medium"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
