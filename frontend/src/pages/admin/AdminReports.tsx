import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, Download, Calendar, DollarSign, Users, Car } from 'lucide-react';

export const AdminReports = () => {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white italic uppercase tracking-wider mb-2">Analytics & Reports</h1>
          <p className="text-gray-400 text-sm">Comprehensive insights into your business performance.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-[#00E5FF] hover:text-black transition-all rounded-sm shrink-0 border border-white/20 hover:border-[#00E5FF]">
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF]">
              <DollarSign size={24} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-md border border-green-400/20">
              <TrendingUp size={12} /> +14.5%
            </span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Total Revenue</h3>
          <p className="text-3xl font-black text-white">$124,500</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
              <Calendar size={24} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-md border border-green-400/20">
              <TrendingUp size={12} /> +5.2%
            </span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Total Bookings</h3>
          <p className="text-3xl font-black text-white">1,842</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
              <Car size={24} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-md border border-green-400/20">
              <TrendingUp size={12} /> +12%
            </span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Fleet Utilization</h3>
          <p className="text-3xl font-black text-white">82%</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] h-96 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-drivex-accent)_0%,_transparent_50%)] opacity-[0.05] group-hover:opacity-[0.1] transition-opacity" />
          <PieChart size={64} className="text-[#00E5FF] mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">Revenue Chart</h3>
          <p className="text-gray-400 text-sm text-center">A beautiful chart representation would render here.</p>
        </div>
        
        <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] h-96 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#a855f7_0%,_transparent_50%)] opacity-[0.05] group-hover:opacity-[0.1] transition-opacity" />
          <Users size={64} className="text-purple-400 mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">Demographics</h3>
          <p className="text-gray-400 text-sm text-center">Customer breakdown charts would render here.</p>
        </div>
      </div>
    </div>
  );
};
