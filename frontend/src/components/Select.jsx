import React, { forwardRef } from 'react';

const Select = forwardRef(({ label, error, options = [], className = '', ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && <label className="text-sm text-gray-300 font-medium ml-1">{label}</label>}
      <div className="relative">
        <select
          ref={ref}
          className={`w-full appearance-none bg-[#1A1B20] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[var(--color-drivex-accent)] focus:ring-1 focus:ring-[var(--color-drivex-accent)] transition-all ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
          {...props}
        >
          <option value="" disabled>Select an option</option>
          {options.map((opt, i) => (
            <option key={i} value={opt.value} className="bg-[#1A1B20]">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
      {error && <span className="text-xs text-red-500 mt-1 ml-1">{error}</span>}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
