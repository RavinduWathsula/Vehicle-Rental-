import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hoverEffect = false, ...props }) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5 } : {}}
      className={`glassmorphism rounded-xl p-6 relative overflow-hidden ${hoverEffect ? 'hover:border-[var(--color-drivex-accent)]/30 transition-colors duration-500' : ''} ${className}`}
      {...props}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </motion.div>
  );
};

export default GlassCard;
