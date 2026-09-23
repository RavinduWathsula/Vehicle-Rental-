import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { type Vehicle, calculateBookingPrice, type BookingCalculationResponse, getExtras, type Extra } from '../../lib/api';

interface BookingSummaryProps {
  vehicle: Vehicle;
  pickupDate: string;
  setPickupDate: (d: string) => void;
  returnDate: string;
  setReturnDate: (d: string) => void;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({ 
  vehicle, 
  pickupDate, 
  setPickupDate, 
  returnDate, 
  setReturnDate 
}) => {
  const navigate = useNavigate();
  const [pricing, setPricing] = useState<BookingCalculationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Extra options
  const [availableExtras, setAvailableExtras] = useState<Extra[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [needsDriver, setNeedsDriver] = useState(false);

  useEffect(() => {
    const fetchAvailableExtras = async () => {
      try {
        const extras = await getExtras();
        setAvailableExtras(extras);
      } catch (err) {
        console.error('Failed to fetch extras', err);
      }
    };
    fetchAvailableExtras();
  }, []);

  useEffect(() => {
    if (!pickupDate || !returnDate) return;

    const fetchPricing = async () => {
      setLoading(true);
      setError('');
      try {
        const result = await calculateBookingPrice({
          vehicleId: vehicle.id,
          pickupDate,
          returnDate,
          extras: selectedExtras,
          driverId: needsDriver ? 'req_driver' : null
        });
        setPricing(result);
      } catch (err) {
        setError('Failed to calculate pricing. Please ensure dates are valid.');
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, [vehicle.id, pickupDate, returnDate, selectedExtras, needsDriver]);

  const handleToggleExtra = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) ? prev.filter(id => id !== extraId) : [...prev, extraId]
    );
  };

  const handleBookNow = () => {
    navigate(`/book/${vehicle.id}`, { 
      state: { pickupDate, returnDate, selectedExtras, needsDriver }
    });
  };

  return (
    <div className="bg-[#111218] rounded-xl p-6 md:p-8 border border-white/5 shadow-2xl">
      <h3 className="text-xl font-black text-white mb-6 uppercase tracking-widest italic">Book Your Journey</h3>

      {/* Date Selectors */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Pickup Date</label>
          <input 
            type="date" 
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full bg-[#08090B] border border-white/10 rounded-sm px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-sm outline-none"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Return Date</label>
          <input 
            type="date" 
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full bg-[#08090B] border border-white/10 rounded-sm px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-sm outline-none"
            min={pickupDate || new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      {/* Driver Toggle */}
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${needsDriver ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-white/20 group-hover:border-white/50'}`}>
            {needsDriver && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
          </div>
          <input type="checkbox" className="hidden" checked={needsDriver} onChange={() => setNeedsDriver(!needsDriver)} />
          <span className="text-sm text-white/80 select-none">Include Professional Chauffeur</span>
        </label>
      </div>

      {/* Extras Selection */}
      {availableExtras.length > 0 && (
        <div className="mb-8">
          <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-3">Optional Extras</label>
          <div className="space-y-3">
            {availableExtras.map(extra => (
              <label key={extra.id} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${selectedExtras.includes(extra.id) ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-white/20 group-hover:border-white/50'}`}>
                    {selectedExtras.includes(extra.id) && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className="text-sm text-white/80 select-none">{extra.name}</span>
                </div>
                <span className="text-xs text-[#D4AF37] tracking-widest">+${extra.pricePerDay || extra.price}/day</span>
                <input type="checkbox" className="hidden" checked={selectedExtras.includes(extra.id)} onChange={() => handleToggleExtra(extra.id)} />
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Pricing Breakdown (Backend Driven) */}
      <div className="bg-[#08090B] rounded-lg p-5 border border-white/5 mb-8">
        {(!pickupDate || !returnDate) ? (
          <p className="text-white/40 text-center text-sm uppercase tracking-widest py-4">Select dates to view pricing</p>
        ) : loading ? (
          <div className="flex justify-center py-6">
            <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-sm text-center py-4">{error}</p>
        ) : pricing ? (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-white/80">
              <span>Vehicle Rate ({pricing.rentalDays} days)</span>
              <span>${pricing.vehicleTotal.toFixed(2)}</span>
            </div>
            
            {pricing.driverTotal && pricing.driverTotal > 0 ? (
              <div className="flex justify-between text-white/80">
                <span>Chauffeur Service</span>
                <span>${pricing.driverTotal.toFixed(2)}</span>
              </div>
            ) : null}

            {pricing.extrasTotal > 0 && (
              <div className="flex justify-between text-white/80">
                <span>Optional Extras</span>
                <span>${pricing.extrasTotal.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-white/60 text-xs">
              <span>Taxes & Fees</span>
              <span>${pricing.taxes.toFixed(2)}</span>
            </div>
            
            <div className="pt-4 mt-2 border-t border-white/10 flex justify-between items-end">
              <div>
                <span className="block text-white/50 text-xs uppercase tracking-widest mb-1">Estimated Total</span>
                <span className="text-white font-black text-2xl">${pricing.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <button 
        onClick={handleBookNow}
        disabled={!pricing || loading || !!error}
        className="w-full py-4 bg-[var(--color-drivex-accent)] text-black font-black uppercase tracking-widest text-sm rounded-sm hover:bg-white transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
      >
        Book This Vehicle
      </button>
    </div>
  );
};
