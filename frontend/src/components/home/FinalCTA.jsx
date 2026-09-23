import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
  return (
    <section className="py-32 relative bg-[#040508] border-t border-white/5 overflow-hidden z-20">
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
          
          <Link to="/vehicles">
            <Button size="lg" className="w-64 h-16 text-xl">
              Explore Fleet
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
