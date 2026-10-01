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
          <h1 className="text-3xl font-black text-drivex-text italic uppercase tracking-wider mb-2">Driver Roster</h1>
          <p className="text-drivex-text-muted text-sm">Manage your professional chauffeurs and track their performance.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-drivex-accent text-drivex-text-inverse font-bold uppercase tracking-widest text-xs hover:bg-drivex-accent-hover hover:bg-drivex-accent-hover shadow-md transition-all rounded-sm shrink-0">
          <Plus size={16} /> Add New Driver
        </button>
      </div>

      <div className="bg-drivex-card border border-drivex-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-drivex-border flex flex-col md:flex-row gap-4 justify-between items-center bg-drivex-sidebar">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-drivex-text-muted" size={18} />
            <input type="text" placeholder="Search drivers..." className="w-full bg-drivex-card border border-drivex-border rounded-lg pl-10 pr-4 py-2 text-sm text-drivex-text placeholder-gray-500 focus:outline-none focus:border-drivex-accent focus:ring-1 focus:ring-drivex-accent transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {mockDrivers.map((driver, i) => (
            <motion.div key={driver.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-drivex-card border border-drivex-border rounded-xl p-6 group hover:border-drivex-accent/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-drivex-accent to-purple-500 p-0.5">
                    <div className="w-full h-full bg-[#08090B] rounded-full flex items-center justify-center">
                      <UserCircle size={24} className="text-drivex-text-muted" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-drivex-text font-bold">{driver.name}</h3>
                    <p className="text-xs text-drivex-text-muted">{driver.id}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${driver.status === 'Available' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-drivex-accent/20 text-drivex-accent border border-drivex-accent/30'}`}>
                  {driver.status}
                </span>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-drivex-text-muted">
                  <Phone size={14} className="text-drivex-accent" /> {driver.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-drivex-text-muted">
                  <Star size={14} className="text-yellow-400" /> {driver.rating} Rating ({driver.trips} trips)
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-drivex-border pt-4">
                <button className="text-xs font-bold text-drivex-text-muted hover:text-drivex-text uppercase tracking-widest transition-colors">View Profile</button>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-drivex-text-muted hover:text-drivex-accent transition-colors"><Edit size={14} /></button>
                  <button className="p-1.5 text-drivex-text-muted hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
