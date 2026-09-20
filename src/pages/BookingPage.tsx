import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  // Global Booking State
  const [bookingData, setBookingData] = useState<Partial<BookingPayload>>({
    vehicleId: id,
    extras: [],
  });

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id) {
        navigate('/');
        return;
      }
      setLoading(true);
      const data = await getVehicleById(id);
      if (data) {
        setVehicle(data);
        setBookingData(prev => ({ ...prev, vehicleId: data.id }));
      } else {
        navigate('/');
      }
      setLoading(false);
    };
    fetchVehicle();
  }, [id, navigate]);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5) as BookingStep);
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1) as BookingStep);

  const updateData = (data: Partial<BookingPayload>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  if (loading || !vehicle) {
    return (
      <div className="min-h-screen bg-[#08090B] flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090B] pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
            Complete your <span className="text-[#D4AF37]">Booking.</span>
          </h1>
          
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-white/10 -z-10" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-[#D4AF37] -z-10 transition-all duration-500 ease-out" 
              style={{ width: `${((currentStep - 1) / 4) * 100}%` }} 
            />
            
            {steps.map(step => (
              <div key={step.num} className="flex flex-col items-center gap-3 bg-[#08090B] px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                  currentStep >= step.num 
                    ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                    : 'bg-white/5 text-white/40 border border-white/10'
                }`}>
                  {step.num}
                </div>
                <span className={`text-xs font-bold tracking-widest hidden md:block ${
                  currentStep >= step.num ? 'text-white' : 'text-white/40'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Step Content */}
        <div className="glassmorphism rounded-xl border border-white/10 overflow-hidden relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8 md:p-12 h-full flex flex-col"
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
