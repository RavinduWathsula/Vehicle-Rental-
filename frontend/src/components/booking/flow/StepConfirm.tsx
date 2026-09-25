import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Vehicle, type BookingPayload, calculateBookingPrice, type BookingCalculationResponse, createBooking } from '../../../lib/api';
import { Button } from '../../ui/Button';
import { ShieldAlert, AlertCircle } from 'lucide-react';

interface Props {
  data: BookingPayload;
  vehicle: Vehicle;
  prev: () => void;
}

export const StepConfirm: React.FC<Props> = ({ data, vehicle, prev }) => {
  const navigate = useNavigate();
  const [pricing, setPricing] = useState<BookingCalculationResponse | null>(null);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPricing = async () => {
      setLoadingPrice(true);
      setError('');
      try {
        const result = await calculateBookingPrice({
          vehicleId: vehicle.id,
          pickupDate: data.pickupDate,
          returnDate: data.returnDate,
          extras: data.extras
        });
        setPricing(result);
      } catch (err) {
        setError('Failed to securely calculate pricing. Please try again.');
      } finally {
        setLoadingPrice(false);
      }
    };

    fetchPricing();
  }, [vehicle.id, data.pickupDate, data.returnDate, data.extras]);

  const handleConfirm = async () => {
    setSubmitting(true);
    setError('');
    try {
      const response = await createBooking(data);
      if (response.status === 'confirmed') {
        navigate(`/booking-confirmation/${response.reference}`);
      } else {
        throw new Error(response.message || 'Booking could not be confirmed.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while confirming your booking.');
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-heading font-bold text-white mb-2">Final Review</h2>
      <p className="text-white/50 mb-8">Please review your journey details and final costs.</p>

      {loadingPrice ? (
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <div className="w-8 h-8 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin" />
          <p className="text-white/50 text-sm">Securely calculating pricing with backend...</p>
        </div>
      ) : pricing ? (
        <div className="flex-1 flex flex-col md:flex-row gap-8">
          {/* Summary Left */}
          <div className="flex-1 flex flex-col gap-6 bg-white/5 p-6 rounded-xl border border-white/5">
            <div>
              <h3 className="text-[#00E5FF] text-xs font-bold tracking-widest uppercase mb-4">Journey</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-white/50 mb-1">Pickup</span>
                  <span className="text-white">{data.pickupLocation}</span>
                  <span className="block text-white/80 mt-1">{data.pickupDate} at {data.pickupTime}</span>
                </div>
                <div>
                  <span className="block text-white/50 mb-1">Return</span>
                  <span className="text-white">{data.returnLocation}</span>
                  <span className="block text-white/80 mt-1">{data.returnDate} at {data.returnTime}</span>
                </div>
              </div>
            </div>
            
            <div className="h-px w-full bg-white/10" />

            <div>
              <h3 className="text-[#00E5FF] text-xs font-bold tracking-widest uppercase mb-4">Driver Details</h3>
              <div className="text-sm">
                <span className="text-white block">{data.customer.firstName} {data.customer.lastName}</span>
                <span className="text-white/80 block mt-1">{data.customer.email}</span>
                <span className="text-white/80 block mt-1">{data.customer.phone}</span>
                <span className="text-white/50 block mt-2 text-xs">License: {data.customer.licenseNumber}</span>
              </div>
            </div>
          </div>

          {/* Pricing Right */}
          <div className="flex-1 flex flex-col gap-4 bg-white/5 p-6 rounded-xl border border-[#00E5FF]/20">
            <h3 className="text-[#00E5FF] text-xs font-bold tracking-widest uppercase mb-2">Final Cost</h3>
            
            <div className="flex justify-between text-white/80 text-sm">
              <span>Vehicle ({pricing.rentalDays} days)</span>
              <span>${pricing.vehicleTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white/80 text-sm">
              <span>Extras ({data.extras.length})</span>
              <span>${pricing.extrasTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white/80 text-sm">
              <span>Taxes & Fees</span>
              <span>${pricing.taxes.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
              <span className="text-white font-heading font-bold text-xl">Total</span>
              <span className="text-[#00E5FF] font-bold text-3xl">${pricing.grandTotal.toFixed(2)}</span>
            </div>
            
            <div className="mt-4 flex gap-2 items-start text-[10px] text-white/40 leading-tight">
              <ShieldAlert size={14} className="shrink-0 text-[#00E5FF]" />
              <p>Prices are securely calculated by the DRIVEX backend. By clicking confirm, you agree to the rental terms and conditions.</p>
            </div>
          </div>
        </div>
      ) : null}

      {error && (
        <div className="mt-6 flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-sm border border-red-400/20">
          <AlertCircle size={18} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="mt-10 flex justify-between items-center">
        <button 
          onClick={prev} 
          disabled={submitting}
          className="text-white/60 hover:text-white transition-colors text-sm font-medium tracking-wide disabled:opacity-50"
        >
          BACK TO DETAILS
        </button>
        <Button 
          onClick={handleConfirm} 
          disabled={loadingPrice || submitting || !!error}
          className="px-10"
        >
          {submitting ? 'CONFIRMING...' : 'CONFIRM BOOKING'}
        </Button>
      </div>
    </div>
  );
};
