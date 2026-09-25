import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { isBefore, startOfDay, parseISO } from 'date-fns';

export const BookingWidget = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupLocation: '',
    returnLocation: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
  });
  
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const validate = () => {
    if (!formData.pickupLocation || !formData.returnLocation || !formData.pickupDate || !formData.returnDate) {
      return 'Please fill in all location and date fields.';
    }

    const today = startOfDay(new Date());
    const pickupDate = parseISO(formData.pickupDate);
    const returnDate = parseISO(formData.returnDate);

    if (isBefore(pickupDate, today)) {
      return 'Pickup date cannot be in the past.';
    }

    if (isBefore(returnDate, pickupDate) || formData.pickupDate === formData.returnDate) {
      return 'Return date must be after the pickup date.';
    }

    if (!formData.pickupTime || !formData.returnTime) {
      return 'Please select valid pickup and return times.';
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Navigate to search page with query parameters
    const params = new URLSearchParams(formData);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto -mt-16 relative z-30 px-4 md:px-10">
      <form 
        onSubmit={handleSubmit}
        className="glassmorphism rounded-xl p-6 md:p-8 flex flex-col gap-6 cinematic-shadow border-white/10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Pickup Location */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/60 uppercase tracking-widest font-medium">Pickup Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input 
                type="text" 
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="City, Airport, or Station" 
                className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
              />
            </div>
          </div>

          {/* Return Location */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/60 uppercase tracking-widest font-medium">Return Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input 
                type="text" 
                name="returnLocation"
                value={formData.returnLocation}
                onChange={handleChange}
                placeholder="City, Airport, or Station" 
                className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
              />
            </div>
          </div>

          {/* Pickup Date & Time */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/60 uppercase tracking-widest font-medium">Pickup Date & Time</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input 
                  type="date" 
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-2 text-white focus:outline-none focus:border-[#00E5FF] transition-colors [color-scheme:dark]"
                />
              </div>
              <div className="relative w-24">
                <input 
                  type="time" 
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-2 text-white focus:outline-none focus:border-[#00E5FF] transition-colors [color-scheme:dark]"
                />
              </div>
            </div>
          </div>

          {/* Return Date & Time */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/60 uppercase tracking-widest font-medium">Return Date & Time</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input 
                  type="date" 
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-2 text-white focus:outline-none focus:border-[#00E5FF] transition-colors [color-scheme:dark]"
                />
              </div>
              <div className="relative w-24">
                <input 
                  type="time" 
                  name="returnTime"
                  value={formData.returnTime}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-2 text-white focus:outline-none focus:border-[#00E5FF] transition-colors [color-scheme:dark]"
                />
              </div>
            </div>
          </div>

        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-sm border border-red-400/20">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="flex justify-end border-t border-white/10 pt-6 mt-2">
          <Button type="submit" size="lg" className="px-12 w-full md:w-auto">
            FIND MY RIDE
          </Button>
        </div>
      </form>
    </div>
  );
};
