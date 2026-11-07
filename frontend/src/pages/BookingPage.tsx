import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getVehicleById, type Vehicle, type BookingPayload } from '../lib/api';

import { StepJourney } from '../components/booking/flow/StepJourney';
import { StepVehicle } from '../components/booking/flow/StepVehicle';
import { StepExtras } from '../components/booking/flow/StepExtras';
import { StepDetails } from '../components/booking/flow/StepDetails';
import { StepConfirm } from '../components/booking/flow/StepConfirm';

export type BookingStep = 1 | 2 | 3 | 4 | 5;

const steps = [
  { num: 1, label: 'JOURNEY' },
  { num: 2, label: 'VEHICLE' },
  { num: 3, label: 'EXTRAS' },
  { num: 4, label: 'DETAILS' },
  { num: 5, label: 'CONFIRM' },
];

export const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = (location.state as any) || {};

  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Sensible default dates: tomorrow and 3 days later
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const threeDaysLater = new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0];

  // Global Booking State
  const [bookingData, setBookingData] = useState<Partial<BookingPayload>>({
    vehicleId: id,
    pickupLocation: stateData.pickupLocation || 'Downtown Headquarters',
    returnLocation: stateData.returnLocation || 'Downtown Headquarters',
    pickupDate: stateData.pickupDate || tomorrow,
    returnDate: stateData.returnDate || threeDaysLater,
    pickupTime: stateData.pickupTime || '10:00',
    returnTime: stateData.returnTime || '10:00',
    extras: stateData.selectedExtras || [],
    driverId: stateData.driverId || null,
  });

  // Check user authentication - require registration before booking
  useEffect(() => {
    const token = localStorage.getItem('drivex_token');
    const user = localStorage.getItem('drivex_user');
    if (!token && !user) {
      navigate('/register', {
        replace: true,
        state: { message: 'Registration required: Please create an account or sign in before completing a vehicle reservation.' }
      });
    }
  }, [navigate]);

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id) {
        navigate('/vehicles');
        return;
      }
      setLoading(true);
      setLoadError(null);
      try {
        const data = await getVehicleById(id);
        if (data) {
          setVehicle(data);
          setBookingData(prev => ({ ...prev, vehicleId: data.id }));
        } else {
          setLoadError(`Unable to find vehicle "${id}". It may be temporarily unavailable.`);
        }
      } catch (err: any) {
        setLoadError(err.message || 'Error loading vehicle.');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id, navigate]);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5) as BookingStep);
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1) as BookingStep);

  const updateData = (data: Partial<BookingPayload>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08090B] flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-[#00E5FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (loadError && !vehicle) {
    return (
      <div className="min-h-screen bg-[#08090B] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-[#00E5FF]">
          !
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{loadError}</h2>
        <p className="text-white/50 text-sm mb-6 max-w-md">The requested vehicle could not be loaded into the reservation engine.</p>
        <button 
          onClick={() => navigate('/vehicles')}
          className="px-6 py-2.5 rounded-lg bg-[#00E5FF] text-black font-bold uppercase tracking-wider text-xs hover:bg-[#00c4dc] transition-colors"
        >
          Return to Fleet
        </button>
      </div>
    );
  }

  if (!vehicle) return null;

  return (
    <div className="min-h-screen bg-[#08090B] pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-white">
              Complete your <span className="text-[#00E5FF]">Booking.</span>
            </h1>
            <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-widest sm:hidden">
              Step {currentStep} / 5
            </span>
          </div>
          
          <div className="flex items-center justify-between relative px-2">
            <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-px bg-white/10 -z-10" />
            <div 
              className="absolute left-2 top-1/2 -translate-y-1/2 h-px bg-[#00E5FF] -z-10 transition-all duration-500 ease-out" 
              style={{ width: `${((currentStep - 1) / 4) * 96}%` }} 
            />
            
            {steps.map(step => (
              <div key={step.num} className="flex flex-col items-center gap-2 bg-[#08090B] px-1.5 sm:px-2">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-colors duration-300 ${
                  currentStep >= step.num 
                    ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' 
                    : 'bg-white/5 text-white/40 border border-white/10'
                }`}>
                  {step.num}
                </div>
                <span className={`text-[11px] font-bold tracking-widest hidden md:block ${
                  currentStep >= step.num ? 'text-white' : 'text-white/40'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Step Content */}
        <div className="glassmorphism rounded-xl border border-white/10 overflow-hidden relative min-h-[460px] sm:min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-5 sm:p-8 md:p-12 h-full flex flex-col"
            >
              {currentStep === 1 && (
                <StepJourney data={bookingData} updateData={updateData} next={nextStep} />
              )}
              {currentStep === 2 && (
                <StepVehicle vehicle={vehicle} prev={prevStep} next={nextStep} />
              )}
              {currentStep === 3 && (
                <StepExtras data={bookingData} updateData={updateData} prev={prevStep} next={nextStep} />
              )}
              {currentStep === 4 && (
                <StepDetails data={bookingData} updateData={updateData} prev={prevStep} next={nextStep} />
              )}
              {currentStep === 5 && (
                <StepConfirm data={bookingData as BookingPayload} vehicle={vehicle} prev={prevStep} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
