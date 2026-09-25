import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Search, Plus, Filter, MoreVertical, Edit, Trash2, CheckCircle2, Phone, Star } from 'lucide-react';

const mockDrivers = [
  { id: 'DRV-01', name: 'James Wilson', phone: '+1 (555) 123-4567', trips: 142, rating: 4.9, status: 'Available' },
  { id: 'DRV-02', name: 'Robert Chen', phone: '+1 (555) 987-6543', trips: 89, rating: 4.7, status: 'On Duty' },
  { id: 'DRV-03', name: 'Michael Davis', phone: '+1 (555) 456-7890', trips: 215, rating: 5.0, status: 'Available' },
];

export const AdminDrivers = () => {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white italic uppercase tracking-wider mb-2">Driver Roster</h1>
          <p className="text-gray-400 text-sm">Manage your professional chauffeurs and track their performance.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#00E5FF] text-black font-bold uppercase tracking-widest text-xs hover:bg-white hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all rounded-sm shrink-0">
          <Plus size={16} /> Add New Driver
        </button>
      </div>

      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-4 border-b border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center bg-black/60">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input type="text" placeholder="Search drivers..." className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {mockDrivers.map((driver, i) => (
            <motion.div key={driver.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white/5 border border-white/10 rounded-xl p-6 group hover:border-[#00E5FF]/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00E5FF] to-purple-500 p-0.5">
                    <div className="w-full h-full bg-[#08090B] rounded-full flex items-center justify-center">
                      <UserCircle size={24} className="text-gray-300" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{driver.name}</h3>
                    <p className="text-xs text-gray-400">{driver.id}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${driver.status === 'Available' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30'}`}>
                  {driver.status}
                </span>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Phone size={14} className="text-[#00E5FF]" /> {driver.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Star size={14} className="text-yellow-400" /> {driver.rating} Rating ({driver.trips} trips)
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <button className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">View Profile</button>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-gray-400 hover:text-[#00E5FF] transition-colors"><Edit size={14} /></button>
                  <button className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
