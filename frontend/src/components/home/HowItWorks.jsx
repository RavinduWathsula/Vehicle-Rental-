import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Select Your Vehicle',
      description: 'Browse our exclusive fleet of high-performance and luxury vehicles to find the perfect match for your journey.'
    },
    {
      number: '02',
      title: 'Book & Confirm',
      description: 'Choose your dates, add premium extras, and finalize your reservation instantly through our secure platform.'
    },
    {
      number: '03',
      title: 'Hit The Road',
      description: 'Pick up your detailed, fully-fueled vehicle from one of our locations or have it delivered directly to you.'
    }
  ];

  return (
    <section id="how-to-work" className="py-32 relative bg-[#040508] z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.3em] text-[#D4AF37] uppercase mb-4"
          >
            Seamless Process
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic"
          >
            How To Work.
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-[#08090B] border border-white/10 flex items-center justify-center mb-8 relative group-hover:border-[#D4AF37] transition-colors duration-500">
                <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-3xl font-black text-[#D4AF37] italic">{step.number}</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-4 uppercase">{step.title}</h4>
              <p className="text-gray-400 font-light leading-relaxed max-w-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
