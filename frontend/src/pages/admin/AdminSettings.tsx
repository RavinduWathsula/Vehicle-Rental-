import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, Globe, Shield, CreditCard, Bell } from 'lucide-react';

export const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'payments' | 'notifications'>('general');

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-drivex-text italic uppercase tracking-wider mb-1 sm:mb-2">System Settings</h1>
          <p className="text-drivex-text-muted text-xs sm:text-sm">Configure global platform settings, payment gateways, and security.</p>
        </div>
        <button className="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-drivex-accent text-drivex-text-inverse font-bold uppercase tracking-widest text-xs hover:bg-drivex-accent-hover shadow-md transition-all rounded-sm shrink-0 w-fit self-start md:self-auto">
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* Navigation Tabs */}
        <div className="lg:col-span-1 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <button 
            onClick={() => setActiveTab('general')}
            className={`w-auto lg:w-full shrink-0 whitespace-nowrap flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'general' 
                ? 'bg-drivex-accent text-drivex-text-inverse shadow-[0_0_15px_rgba(0,229,255,0.3)]' 
                : 'bg-drivex-card text-drivex-text-muted hover:bg-drivex-card-hover hover:text-drivex-text border border-drivex-border'
            }`}
          >
            <Globe size={16} />
            <span className="uppercase tracking-wider sm:tracking-widest">General</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-auto lg:w-full shrink-0 whitespace-nowrap flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'security' 
                ? 'bg-drivex-accent text-drivex-text-inverse shadow-[0_0_15px_rgba(0,229,255,0.3)]' 
                : 'bg-drivex-card text-drivex-text-muted hover:bg-drivex-card-hover hover:text-drivex-text border border-drivex-border'
            }`}
          >
            <Shield size={16} />
            <span className="uppercase tracking-wider sm:tracking-widest">Security</span>
          </button>

          <button 
            onClick={() => setActiveTab('payments')}
            className={`w-auto lg:w-full shrink-0 whitespace-nowrap flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'payments' 
                ? 'bg-drivex-accent text-drivex-text-inverse shadow-[0_0_15px_rgba(0,229,255,0.3)]' 
                : 'bg-drivex-card text-drivex-text-muted hover:bg-drivex-card-hover hover:text-drivex-text border border-drivex-border'
            }`}
          >
            <CreditCard size={16} />
            <span className="uppercase tracking-wider sm:tracking-widest">Payments</span>
          </button>

          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-auto lg:w-full shrink-0 whitespace-nowrap flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'notifications' 
                ? 'bg-drivex-accent text-drivex-text-inverse shadow-[0_0_15px_rgba(0,229,255,0.3)]' 
                : 'bg-drivex-card text-drivex-text-muted hover:bg-drivex-card-hover hover:text-drivex-text border border-drivex-border'
            }`}
          >
            <Bell size={16} />
            <span className="uppercase tracking-wider sm:tracking-widest">Notifications</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-drivex-card backdrop-blur-md border border-drivex-border rounded-2xl p-5 sm:p-8 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-drivex-text uppercase tracking-wider mb-4 sm:mb-6">
              {activeTab === 'general' && 'General Configuration'}
              {activeTab === 'security' && 'Security & Access Control'}
              {activeTab === 'payments' && 'Payment Gateways'}
              {activeTab === 'notifications' && 'System Notifications'}
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Platform Name</label>
                  <input type="text" defaultValue="DriveX Rental" className="w-full bg-drivex-bg border border-drivex-border rounded-lg px-4 py-2.5 sm:py-3 text-drivex-text focus:outline-none focus:border-drivex-accent focus:ring-1 focus:ring-drivex-accent transition-all text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Contact Email</label>
                  <input type="email" defaultValue="admin@drivex.com" className="w-full bg-drivex-bg border border-drivex-border rounded-lg px-4 py-2.5 sm:py-3 text-drivex-text focus:outline-none focus:border-drivex-accent focus:ring-1 focus:ring-drivex-accent transition-all text-sm" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">System Status</label>
                  <select className="w-full bg-drivex-bg border border-drivex-border rounded-lg px-4 py-2.5 sm:py-3 text-drivex-text focus:outline-none focus:border-drivex-accent transition-all cursor-pointer text-sm">
                    <option value="active" className="bg-drivex-card text-drivex-text">Active (Online)</option>
                    <option value="maintenance" className="bg-drivex-card text-drivex-text">Maintenance Mode</option>
                  </select>
                </div>
              </div>

              <hr className="border-drivex-border" />

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-drivex-text uppercase tracking-wider mb-4">Localization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Default Currency</label>
                    <select defaultValue="LKR" className="w-full bg-drivex-bg border border-drivex-border rounded-lg px-4 py-2.5 sm:py-3 text-drivex-text focus:outline-none focus:border-drivex-accent transition-all cursor-pointer text-sm dark:[color-scheme:dark] [color-scheme:light]">
                      <option value="LKR" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">LKR (Rs.)</option>
                      <option value="USD" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">USD ($)</option>
                      <option value="EUR" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">EUR (€)</option>
                      <option value="GBP" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">GBP (£)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Timezone</label>
                    <select defaultValue="Asia/Colombo" className="w-full bg-drivex-bg border border-drivex-border rounded-lg px-4 py-2.5 sm:py-3 text-drivex-text focus:outline-none focus:border-drivex-accent transition-all cursor-pointer text-sm dark:[color-scheme:dark] [color-scheme:light]">
                      <option value="Asia/Colombo" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Asia/Colombo (UTC+05:30)</option>
                      <option value="UTC" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">UTC</option>
                      <option value="PST" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Pacific Time (US)</option>
                      <option value="EST" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Eastern Time (US)</option>
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
