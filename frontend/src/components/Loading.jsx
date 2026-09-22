import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="w-12 h-12 border-2 border-white/10 border-t-[var(--color-drivex-accent)] rounded-full shadow-[0_0_15px_rgba(0,229,255,0.2)]"
      />
      <p className="text-sm text-gray-400 tracking-widest uppercase">Initializing</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-drivex-bg)]">
        {content}
      </div>
    );
  }

  return <div className="w-full h-full min-h-[200px] flex items-center justify-center">{content}</div>;
};

export default Loading;
