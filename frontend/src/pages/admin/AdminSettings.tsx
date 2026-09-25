import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, Globe, Shield, CreditCard, Bell } from 'lucide-react';

export const AdminSettings = () => {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white italic uppercase tracking-wider mb-2">System Settings</h1>
          <p className="text-gray-400 text-sm">Configure global platform settings, payment gateways, and security.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#00E5FF] text-black font-bold uppercase tracking-widest text-xs hover:bg-white hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all rounded-sm shrink-0">
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <Globe size={18} />
            <span className="uppercase tracking-widest">General</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white">
            <Shield size={18} />
            <span className="uppercase tracking-widest">Security</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white">
            <CreditCard size={18} />
            <span className="uppercase tracking-widest">Payments</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white">
            <Bell size={18} />
            <span className="uppercase tracking-widest">Notifications</span>
          </button>
        </div>

        <div className="lg:col-span-3">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-6">General Configuration</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Platform Name</label>
                  <input type="text" defaultValue="DriveX Rental" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Contact Email</label>
                  <input type="email" defaultValue="admin@drivex.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">System Status</label>
                  <select className="w-full bg-[#111218] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-all">
                    <option value="active">Active (Online)</option>
                    <option value="maintenance">Maintenance Mode</option>
                  </select>
                </div>
              </div>

              <hr className="border-white/10" />

              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Localization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Default Currency</label>
                    <select className="w-full bg-[#111218] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-all">
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Timezone</label>
                    <select className="w-full bg-[#111218] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-all">
                      <option value="UTC">UTC</option>
                      <option value="PST">Pacific Time (US)</option>
                      <option value="EST">Eastern Time (US)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
