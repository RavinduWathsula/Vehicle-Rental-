import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, Globe, Shield, CreditCard, Bell } from 'lucide-react';

export const AdminSettings = () => {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-drivex-text italic uppercase tracking-wider mb-2">System Settings</h1>
          <p className="text-drivex-text-muted text-sm">Configure global platform settings, payment gateways, and security.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-drivex-accent text-drivex-text-inverse font-bold uppercase tracking-widest text-xs hover:bg-drivex-accent-hover hover:bg-drivex-accent-hover shadow-md transition-all rounded-sm shrink-0">
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all bg-drivex-accent text-drivex-text-inverse shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <Globe size={18} />
            <span className="uppercase tracking-widest">General</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all bg-drivex-card text-drivex-text-muted hover:bg-drivex-card-hover hover:text-drivex-text">
            <Shield size={18} />
            <span className="uppercase tracking-widest">Security</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all bg-drivex-card text-drivex-text-muted hover:bg-drivex-card-hover hover:text-drivex-text">
            <CreditCard size={18} />
            <span className="uppercase tracking-widest">Payments</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all bg-drivex-card text-drivex-text-muted hover:bg-drivex-card-hover hover:text-drivex-text">
            <Bell size={18} />
            <span className="uppercase tracking-widest">Notifications</span>
          </button>
        </div>

        <div className="lg:col-span-3">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-drivex-card backdrop-blur-md border border-drivex-border rounded-2xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-xl font-bold text-drivex-text uppercase tracking-wider mb-6">General Configuration</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Platform Name</label>
                  <input type="text" defaultValue="DriveX Rental" className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text focus:outline-none focus:border-drivex-accent focus:ring-1 focus:ring-drivex-accent transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Contact Email</label>
                  <input type="email" defaultValue="admin@drivex.com" className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text focus:outline-none focus:border-drivex-accent focus:ring-1 focus:ring-drivex-accent transition-all" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">System Status</label>
                  <select className="w-full bg-[#111218] border border-drivex-border rounded-lg px-4 py-3 text-drivex-text focus:outline-none focus:border-drivex-accent transition-all">
                    <option value="active">Active (Online)</option>
                    <option value="maintenance">Maintenance Mode</option>
                  </select>
                </div>
              </div>

              <hr className="border-drivex-border" />

              <div>
                <h3 className="text-sm font-bold text-drivex-text uppercase tracking-wider mb-4">Localization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Default Currency</label>
                    <select className="w-full bg-[#111218] border border-drivex-border rounded-lg px-4 py-3 text-drivex-text focus:outline-none focus:border-drivex-accent transition-all">
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Timezone</label>
                    <select className="w-full bg-[#111218] border border-drivex-border rounded-lg px-4 py-3 text-drivex-text focus:outline-none focus:border-drivex-accent transition-all">
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
