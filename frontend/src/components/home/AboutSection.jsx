import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-32 relative bg-[#040508] z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold tracking-[0.3em] text-[#D4AF37] uppercase mb-4">The Standard</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic mb-8">
              Engineering <br/>Excellence.
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Founded on the principle that the journey matters just as much as the destination, DRIVEX provides exclusive access to the world's most sought-after vehicles.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              We don't just rent cars. We provide an end-to-end luxury experience. From our meticulously maintained fleet to our 24/7 concierge service, every detail is engineered to exceed expectations.
            </p>
            
            <div className="flex items-center gap-8">
              <div>
                <p className="text-3xl font-black text-white">48+</p>
                <p className="text-xs text-[#D4AF37] tracking-widest uppercase mt-1">Vehicles</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-3xl font-black text-white">12</p>
                <p className="text-xs text-[#D4AF37] tracking-widest uppercase mt-1">Locations</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-3xl font-black text-white">24/7</p>
                <p className="text-xs text-[#D4AF37] tracking-widest uppercase mt-1">Support</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[var(--color-drivex-accent)] blur-[100px] opacity-10 rounded-full" />
            <img 
              src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop" 
              alt="Interior" 
              className="w-full h-auto rounded-xl grayscale hover:grayscale-0 transition-all duration-700 relative z-10 border border-white/10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
