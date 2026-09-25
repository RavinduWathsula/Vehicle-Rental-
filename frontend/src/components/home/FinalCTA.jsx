import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA = () => {
  return (
    <section className="py-32 relative bg-transparent border-t border-white/5 overflow-hidden z-20">
      {/* Cinematic flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-[var(--color-drivex-accent)]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-6">
            The Road Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-drivex-accent)] to-[#00B8CC]">Yours.</span>
          </h2>
          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied clients who have elevated their journey with DRIVEX.
          </p>
          <div className="flex justify-center">
            <a 
              href="/register"
              className="relative inline-flex group"
            >
              <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#00E5FF] via-purple-500 to-[#00E5FF] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
              <button className="relative inline-flex items-center justify-center px-10 py-5 text-lg font-black text-black transition-all duration-200 bg-[#00E5FF] font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00E5FF] uppercase tracking-widest italic group-hover:bg-white group-hover:shadow-[0_0_40px_rgba(0,229,255,0.8)]">
                Start Your Journey Now
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
