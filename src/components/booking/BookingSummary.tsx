import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Vehicle, calculateBookingPrice, type BookingCalculationResponse } from '../../lib/api';
import { Button } from '../ui/Button';

interface BookingSummaryProps {
  vehicle: Vehicle;
  pickupDate?: string;
  returnDate?: string;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({ vehicle, pickupDate, returnDate }) => {
  const navigate = useNavigate();
  const [pricing, setPricing] = useState<BookingCalculationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // If we don't have both dates, we can't calculate a final price
    if (!pickupDate || !returnDate) return;

    const fetchPricing = async () => {
      setLoading(true);
      setError('');
      try {
        const result = await calculateBookingPrice({
          vehicleId: vehicle.id,
          pickupDate,
          returnDate,
          extras: [] // We could add state for GPS, Child Seat, etc. later
        });
        setPricing(result);
      } catch (err) {
        setError('Failed to calculate pricing. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, [vehicle.id, pickupDate, returnDate]);

  return (
    <div className="glassmorphism rounded-xl p-6 border border-white/10 sticky top-32">
      <h3 className="text-xl font-heading font-bold text-white mb-6">Booking Summary</h3>

      <div className="flex flex-col gap-4 text-sm text-white/80 mb-6 pb-6 border-b border-white/10">
        <div className="flex justify-between">
          <span className="text-white/50 uppercase tracking-widest text-xs">Pickup</span>
          <span className="font-medium text-white">{pickupDate || 'Not selected'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/50 uppercase tracking-widest text-xs">Return</span>
          <span className="font-medium text-white">{returnDate || 'Not selected'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/50 uppercase tracking-widest text-xs">Vehicle</span>
          <span className="font-medium text-white">{vehicle.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/50 uppercase tracking-widest text-xs">Rate</span>
          <span className="font-medium text-white">${vehicle.pricePerDay} / day</span>
        </div>
      </div>

      {(!pickupDate || !returnDate) ? (
        <div className="text-center p-4 bg-white/5 rounded-sm mb-6 border border-white/5">
          <p className="text-white/60 text-sm">Please select pickup and return dates to see the total price.</p>
        </div>
      ) : loading ? (
        <div className="flex justify-center p-6">
          <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-red-400 text-sm mb-6">{error}</div>
      ) : pricing ? (
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex justify-between text-white/80 text-sm">
            <span>Rental ({pricing.rentalDays} days)</span>
            <span>${pricing.vehicleTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-white/80 text-sm">
            <span>Extras</span>
            <span>${pricing.extrasTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-white/80 text-sm">
            <span>Taxes & Fees</span>
            <span>${pricing.taxes.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
            <span className="text-white font-heading font-bold text-lg">Total</span>
            <span className="text-[#D4AF37] font-bold text-2xl">${pricing.grandTotal.toFixed(2)}</span>
          </div>
        </div>
      ) : null}

      <Button 
        onClick={() => navigate(`/book/${vehicle.id}`)}
        className="w-full" 
        size="lg" 
        disabled={!pricing || loading}
      >
        BOOK THIS VEHICLE
      </Button>
    </div>
  );
};
