import React from 'react';
import { motion } from 'framer-motion';

const EmptyState = ({ title, description, action }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full py-16 flex flex-col items-center justify-center text-center glassmorphism rounded-xl"
    >
      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 max-w-sm mb-8">{description}</p>
      {action}
    </motion.div>
  );
};

export default EmptyState;
