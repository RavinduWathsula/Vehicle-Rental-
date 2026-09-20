import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { VehicleScene } from '../3d/VehicleScene';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.8, ease: "easeOut" as any }
  }
};

export const Hero = () => {
  return (
    <section className="relative w-full h-screen min-h-[800px] bg-[#08090B] overflow-hidden flex flex-col items-center justify-center cinematic-gradient">
      {/* 3D Scene Background/Right Side */}
      <div className="absolute inset-0 md:left-1/3 z-0">
        <VehicleScene />
        {/* Mobile Gradient Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/60 to-transparent md:hidden z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090B] via-[#08090B]/50 to-transparent hidden md:block z-10 w-1/2" />
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-10 h-full flex flex-col justify-center relative z-20 mt-20 md:mt-0">
        <motion.div 
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] font-heading font-bold text-white tracking-tighter"
          >
            MOVE <br />
            <span className="text-[#D4AF37] relative inline-block">
              BEYOND.
              {/* Subtle accent glow behind the word */}
              <div className="absolute inset-0 bg-[#D4AF37]/20 blur-3xl -z-10 rounded-full" />
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p 
            variants={itemVariants}
            className="mt-8 text-lg md:text-xl text-white/70 max-w-md font-light leading-relaxed"
          >
            Premium vehicles. Seamless rentals. Unforgettable journeys.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="px-10">
              EXPLORE VEHICLES
            </Button>
            <Button size="lg" variant="outline" className="px-10">
              START YOUR JOURNEY
            </Button>
          </motion.div>

          {/* Floating Information Stats */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 grid grid-cols-3 gap-6 pt-10 border-t border-white/10 max-w-lg"
          >
            <div>
              <div className="text-3xl font-heading font-bold text-white">48+</div>
              <div className="text-xs text-[#D4AF37] uppercase tracking-widest mt-1">Vehicles</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-white">12</div>
              <div className="text-xs text-[#D4AF37] uppercase tracking-widest mt-1">Locations</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-white">24/7</div>
              <div className="text-xs text-[#D4AF37] uppercase tracking-widest mt-1">Support</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="text-xs text-white/40 uppercase tracking-widest mb-2 font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-white/40" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};
