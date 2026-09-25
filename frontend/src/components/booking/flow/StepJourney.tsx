import React, { useState } from 'react';
import { MapPin, Calendar, AlertCircle } from 'lucide-react';
import { type BookingPayload } from '../../../lib/api';
import { Button } from '../../ui/Button';
import { isBefore, startOfDay, parseISO } from 'date-fns';

interface Props {
  data: Partial<BookingPayload>;
  updateData: (d: Partial<BookingPayload>) => void;
  next: () => void;
}

export const StepJourney: React.FC<Props> = ({ data, updateData, next }) => {
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ [e.target.name]: e.target.value });
    setError('');
  };

  const handleNext = () => {
    if (!data.pickupLocation || !data.returnLocation || !data.pickupDate || !data.returnDate || !data.pickupTime || !data.returnTime) {
      setError('Please fill in all location and date fields.');
      return;
    }

    const today = startOfDay(new Date());
    const pickupDate = parseISO(data.pickupDate);
    const returnDate = parseISO(data.returnDate);

    if (isBefore(pickupDate, today)) {
      setError('Pickup date cannot be in the past.');
      return;
    }

    if (isBefore(returnDate, pickupDate) || data.pickupDate === data.returnDate) {
      setError('Return date must be strictly after the pickup date.');
      return;
    }

    next();
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-heading font-bold text-white mb-2">Define Your Journey</h2>
      <p className="text-white/50 mb-8">Where and when would you like to travel?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {/* Locations */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/60 uppercase tracking-widest font-medium">Pickup Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input 
                type="text" 
                name="pickupLocation"
                value={data.pickupLocation || ''}
                onChange={handleChange}
                placeholder="City, Airport, or Station" 
                className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/60 uppercase tracking-widest font-medium">Return Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input 
                type="text" 
                name="returnLocation"
                value={data.returnLocation || ''}
                onChange={handleChange}
                placeholder="City, Airport, or Station" 
                className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/60 uppercase tracking-widest font-medium">Pickup Date & Time</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input 
                  type="date" 
                  name="pickupDate"
                  value={data.pickupDate || ''}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-2 text-white focus:outline-none focus:border-[#00E5FF] transition-colors [color-scheme:dark]"
                />
              </div>
              <input 
                type="time" 
                name="pickupTime"
                value={data.pickupTime || ''}
                onChange={handleChange}
                className="w-24 bg-white/5 border border-white/10 rounded-sm py-3 px-2 text-white focus:outline-none focus:border-[#00E5FF] transition-colors [color-scheme:dark]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/60 uppercase tracking-widest font-medium">Return Date & Time</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input 
                  type="date" 
                  name="returnDate"
                  value={data.returnDate || ''}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-2 text-white focus:outline-none focus:border-[#00E5FF] transition-colors [color-scheme:dark]"
                />
              </div>
              <input 
                type="time" 
                name="returnTime"
                value={data.returnTime || ''}
                onChange={handleChange}
                className="w-24 bg-white/5 border border-white/10 rounded-sm py-3 px-2 text-white focus:outline-none focus:border-[#00E5FF] transition-colors [color-scheme:dark]"
              />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-6 flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-sm border border-red-400/20">
          <AlertCircle size={18} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="mt-10 flex justify-end">
        <Button onClick={handleNext} className="px-10">CONTINUE TO VEHICLE</Button>
      </div>
    </div>
  );
};
