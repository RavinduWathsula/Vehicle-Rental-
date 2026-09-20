import React, { useState } from 'react';
import { type BookingPayload } from '../../../lib/api';
import { Button } from '../../ui/Button';
import { AlertCircle, User, Mail, Phone, FileText } from 'lucide-react';

interface Props {
  data: Partial<BookingPayload>;
  updateData: (d: Partial<BookingPayload>) => void;
  prev: () => void;
  next: () => void;
}

export const StepDetails: React.FC<Props> = ({ data, updateData, prev, next }) => {
  const [error, setError] = useState('');
  
  const customer = data.customer || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    licenseNumber: ''
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({
      customer: {
        ...customer,
        [e.target.name]: e.target.value
      }
    });
    setError('');
  };

  const handleNext = () => {
    if (!customer.firstName || !customer.lastName || !customer.email || !customer.phone || !customer.licenseNumber) {
      setError('Please fill in all details, including your driver\'s license number.');
      return;
    }
    
    // Basic email validation
    if (!/^\S+@\S+\.\S+$/.test(customer.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    next();
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-heading font-bold text-white mb-2">Driver Details</h2>
      <p className="text-white/50 mb-8">Please provide the primary driver's information.</p>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-white/60 uppercase tracking-widest font-medium">First Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text" 
              name="firstName"
              value={customer.firstName}
              onChange={handleChange}
              placeholder="John" 
              className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-white/60 uppercase tracking-widest font-medium">Last Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text" 
              name="lastName"
              value={customer.lastName}
              onChange={handleChange}
              placeholder="Doe" 
              className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-xs text-white/60 uppercase tracking-widest font-medium">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="email" 
              name="email"
              value={customer.email}
              onChange={handleChange}
              placeholder="john.doe@example.com" 
              className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-white/60 uppercase tracking-widest font-medium">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="tel" 
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000" 
              className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-white/60 uppercase tracking-widest font-medium">Driver's License No.</label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text" 
              name="licenseNumber"
              value={customer.licenseNumber}
              onChange={handleChange}
              placeholder="D12345678" 
              className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-6 flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-sm border border-red-400/20">
          <AlertCircle size={18} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="mt-10 flex justify-between items-center">
        <button onClick={prev} className="text-white/60 hover:text-white transition-colors text-sm font-medium tracking-wide">
          BACK TO EXTRAS
        </button>
        <Button onClick={handleNext} className="px-10">REVIEW BOOKING</Button>
      </div>
    </div>
  );
};
