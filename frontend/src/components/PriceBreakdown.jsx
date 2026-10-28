import React from 'react';

const PriceBreakdown = ({ items, subtotal, tax, total }) => {
  return (
    <div className="bg-[#111218] border border-white/10 rounded-xl p-6">
      <h4 className="text-lg font-bold text-white mb-4">Price Breakdown</h4>
      
      <div className="space-y-3 mb-6">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span className="text-gray-400">{item.label}</span>
            <span className="text-white font-medium">LKR {parseFloat(item.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t border-white/10 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Subtotal</span>
          <span className="text-white">LKR {parseFloat(subtotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Tax (10%)</span>
          <span className="text-white">LKR {parseFloat(tax).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between items-center mt-2 pt-4 border-t border-white/10">
          <span className="text-white font-bold">Total</span>
          <span className="text-xl font-bold text-[var(--color-drivex-accent)]">
            LKR {parseFloat(total).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;
