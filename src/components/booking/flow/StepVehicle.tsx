import React from 'react';
import { type Vehicle } from '../../../lib/api';
import { Button } from '../../ui/Button';
import { Users, Fuel, Settings } from 'lucide-react';

interface Props {
  vehicle: Vehicle;
  prev: () => void;
  next: () => void;
}

export const StepVehicle: React.FC<Props> = ({ vehicle, prev, next }) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-heading font-bold text-white mb-2">Confirm Vehicle</h2>
      <p className="text-white/50 mb-8">Review your selected vehicle before proceeding.</p>

      <div className="flex-1 flex flex-col md:flex-row gap-8 items-center bg-white/5 p-6 rounded-xl border border-white/5">
        <div className="w-full md:w-1/2 aspect-video bg-black/20 rounded-lg overflow-hidden relative border border-white/5">
          <img 
            src={vehicle.imageUrl} 
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div>
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase block mb-1">
              {vehicle.category}
            </span>
            <h3 className="text-3xl font-heading font-bold text-white">{vehicle.name}</h3>
            <p className="text-white/50">{vehicle.brand}</p>
          </div>

          <div className="flex gap-4 mt-2 py-4 border-y border-white/10 text-white/60 text-sm">
            <div className="flex items-center gap-1.5">
              <Users size={16} className="text-[#D4AF37]" />
              <span>{vehicle.seats}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Settings size={16} className="text-[#D4AF37]" />
              <span>{vehicle.transmission}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel size={16} className="text-[#D4AF37]" />
              <span>{vehicle.fuel}</span>
            </div>
          </div>

          <div className="mt-2">
            <span className="text-3xl font-bold text-[#D4AF37]">${vehicle.pricePerDay}</span>
            <span className="text-white/50 text-sm ml-2">/ day</span>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-between items-center">
        <button onClick={prev} className="text-white/60 hover:text-white transition-colors text-sm font-medium tracking-wide">
          BACK TO JOURNEY
        </button>
        <Button onClick={next} className="px-10">CONTINUE TO EXTRAS</Button>
      </div>
    </div>
  );
};
