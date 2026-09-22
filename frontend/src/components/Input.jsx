import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && <label className="text-sm text-gray-300 font-medium ml-1">{label}</label>}
      <div className="relative">
        <input
          ref={ref}
          className={`w-full bg-[#1A1B20] border border-white/10 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-drivex-accent)] focus:ring-1 focus:ring-[var(--color-drivex-accent)] transition-all ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 mt-1 ml-1">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
