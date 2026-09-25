import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Fuel, Settings } from 'lucide-react';
import { type Vehicle } from '../../lib/api';
import { Button } from '../ui/Button';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors cinematic-shadow flex flex-col"
    >
      <div className="relative h-48 w-full overflow-hidden bg-white/5">
        <img 
          src={vehicle.imageUrl} 
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#00E5FF] text-black text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
            {vehicle.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-heading font-bold text-white">{vehicle.name}</h3>
            <p className="text-sm text-white/50">{vehicle.brand}</p>
          </div>
          <div className="text-right">
            <span className="block text-2xl font-bold text-[#00E5FF]">${vehicle.pricePerDay}</span>
            <span className="text-xs text-white/50 uppercase">per day</span>
          </div>
        </div>

        <div className="flex gap-4 mt-6 pt-6 border-t border-white/10 text-white/60 text-sm">
          <div className="flex items-center gap-1.5">
            <Users size={16} className="text-[#00E5FF]" />
            <span>{vehicle.seats} Seats</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Settings size={16} className="text-[#00E5FF]" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel size={16} className="text-[#00E5FF]" />
            <span>{vehicle.fuel}</span>
          </div>
        </div>

        <div className="mt-8">
          <Link to={`/vehicle/${vehicle.id}`}>
            <Button className="w-full">Select Vehicle</Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
