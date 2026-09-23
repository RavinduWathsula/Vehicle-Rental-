import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NewHero = () => {
  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop" 
          alt="Premium Luxury Car" 
          className="w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090B]/80 via-[#08090B]/50 to-[#08090B]" />
        {/* Animated Accent Glow */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-drivex-accent)] rounded-full blur-[150px] opacity-20 pointer-events-none"
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase mb-6 text-sm"
        >
          Redefining Mobility
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-8 leading-tight drop-shadow-2xl"
        >
          Unleash <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D4AF37]">The Extraordinary</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light"
        >
          Experience the ultimate thrill with our premium fleet of luxury and high-performance vehicles. Seamless booking, unmatched service.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a 
            href="#how-to-work"
            className="px-8 py-4 bg-[var(--color-drivex-accent)] text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 rounded-sm shadow-lg shadow-[var(--color-drivex-accent)]/20 w-full sm:w-auto"
          >
            How It Works
          </a>
          <Link 
            to="/register"
            className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300 rounded-sm w-full sm:w-auto"
          >
            Create Account
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/50 tracking-[0.3em] uppercase">Scroll to explore</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-0.5 h-12 bg-gradient-to-b from-[var(--color-drivex-accent)] to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default NewHero;
