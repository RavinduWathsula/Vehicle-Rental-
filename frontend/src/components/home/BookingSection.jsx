import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';
import { Calendar, MapPin } from 'lucide-react';

const BookingSection = () => {
  return (
    <section className="py-24 bg-[#08090b] relative z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#111218]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tight mb-4">
              Start Your Journey.
            </h2>
            <p className="text-gray-400">Reserve your premium vehicle in seconds.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="relative">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Pick-up Location</label>
              <div className="flex items-center bg-[#1a1b23] rounded-xl border border-white/5 px-4 h-14">
                <MapPin className="text-[var(--color-drivex-accent)] w-5 h-5 mr-3" />
                <input 
                  type="text" 
                  placeholder="City, Airport, or Address" 
                  className="bg-transparent border-none outline-none text-white w-full h-full"
                />
              </div>
            </div>
            
            <div className="relative">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Return Location</label>
              <div className="flex items-center bg-[#1a1b23] rounded-xl border border-white/5 px-4 h-14">
                <MapPin className="text-gray-600 w-5 h-5 mr-3" />
                <input 
                  type="text" 
                  placeholder="Same as Pick-up" 
                  className="bg-transparent border-none outline-none text-white w-full h-full"
                />
              </div>
            </div>
            
            <div className="relative">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Pick-up Date & Time</label>
              <div className="flex items-center bg-[#1a1b23] rounded-xl border border-white/5 px-4 h-14">
                <Calendar className="text-[var(--color-drivex-accent)] w-5 h-5 mr-3" />
                <input 
                  type="datetime-local" 
                  className="bg-transparent border-none outline-none text-white w-full h-full [color-scheme:dark]"
                />
              </div>
            </div>
            
            <div className="relative">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Return Date & Time</label>
              <div className="flex items-center bg-[#1a1b23] rounded-xl border border-white/5 px-4 h-14">
                <Calendar className="text-gray-600 w-5 h-5 mr-3" />
                <input 
                  type="datetime-local" 
                  className="bg-transparent border-none outline-none text-white w-full h-full [color-scheme:dark]"
                />
              </div>
            </div>
          </div>
          
          <Button size="lg" className="w-full h-16 text-xl">
            Check Availability
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
