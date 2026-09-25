import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  CreditCard,
  Key,
  Camera
} from 'lucide-react';

export const CustomerProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative z-10">
        <div>
          <h1 className="text-3xl font-black text-white italic uppercase tracking-wider mb-2">Profile Settings</h1>
          <p className="text-gray-400 text-sm">Manage your personal information, security, and preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
        {/* Profile Navigation */}
        <div className="lg:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('personal')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'personal' ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <User size={18} className={activeTab === 'personal' ? 'text-black' : 'text-gray-500'} />
            <span className="uppercase tracking-widest">Personal Info</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'security' ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Shield size={18} className={activeTab === 'security' ? 'text-black' : 'text-gray-500'} />
            <span className="uppercase tracking-widest">Security</span>
          </button>

          <button 
            onClick={() => setActiveTab('billing')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'billing' ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <CreditCard size={18} className={activeTab === 'billing' ? 'text-black' : 'text-gray-500'} />
            <span className="uppercase tracking-widest">Billing</span>
          </button>
        </div>

        {/* Profile Content */}
        <div className="lg:col-span-3">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md"
          >
            {activeTab === 'personal' && (
              <div className="space-y-8">
                {/* Avatar Section */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00E5FF] to-purple-500 p-1">
                      <div className="w-full h-full bg-[#08090B] rounded-full flex items-center justify-center overflow-hidden">
                        <User size={40} className="text-gray-400" />
                      </div>
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#00E5FF] text-black rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-1">Profile Photo</h2>
                    <p className="text-sm text-gray-500 mb-3">Upload a new avatar. Larger image will be resized automatically.</p>
                    <p className="text-xs text-gray-600">Maximum upload size is 2MB.</p>
                  </div>
                </div>

                <hr className="border-white/10" />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">First Name</label>
                    <input type="text" defaultValue="John" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last Name</label>
                    <input type="text" defaultValue="Doe" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input type="email" defaultValue="john.doe@example.com" className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Address</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input type="text" defaultValue="123 Luxury Avenue, Beverly Hills, CA 90210" className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="px-8 py-3 bg-[#00E5FF] hover:bg-white text-black font-bold uppercase tracking-widest rounded-lg transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-1">Change Password</h2>
                  <p className="text-sm text-gray-500">Update your password to keep your account secure.</p>
                </div>

                <div className="space-y-6 max-w-md">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Password</label>
                    <div className="relative">
                      <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input type="password" placeholder="••••••••" className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">New Password</label>
                    <div className="relative">
                      <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input type="password" placeholder="••••••••" className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Confirm New Password</label>
                    <div className="relative">
                      <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input type="password" placeholder="••••••••" className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all" />
                    </div>
                  </div>
                </div>

                <button className="px-8 py-3 bg-[#00E5FF] hover:bg-white text-black font-bold uppercase tracking-widest rounded-lg transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                  Update Password
                </button>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-1">Payment Methods</h2>
                  <p className="text-sm text-gray-500">Manage your saved credit cards and billing information.</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-black/80 to-black/40 border border-white/10 rounded-xl p-6 flex items-center justify-between relative overflow-hidden group hover:border-[#00E5FF]/50 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/5 rounded-full blur-2xl group-hover:bg-[#00E5FF]/10 transition-colors" />
                    <div className="flex items-center gap-6 relative z-10">
                      <div className="w-16 h-10 bg-white/10 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm italic">VISA</span>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-white tracking-widest">•••• •••• •••• 4242</p>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">Expires 12/28</p>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-center gap-4">
                      <span className="px-3 py-1 bg-[#00E5FF]/20 text-[#00E5FF] text-[10px] font-bold uppercase tracking-widest rounded">Default</span>
                      <button className="text-gray-400 hover:text-red-400 text-xs font-bold uppercase tracking-widest transition-colors">Remove</button>
                    </div>
                  </div>
                </div>

                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-widest rounded-lg transition-all border border-white/10">
                  Add New Card
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
