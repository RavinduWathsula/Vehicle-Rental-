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
          <h1 className="text-3xl font-black text-[var(--text)] italic uppercase tracking-wider mb-2">Profile Settings</h1>
          <p className="text-[var(--text-muted)] text-sm">Manage your personal information, security, and preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
        {/* Profile Navigation */}
        <div className="lg:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('personal')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
              activeTab === 'personal' ? 'bg-[var(--accent)] text-[var(--text-inverse)] border-[var(--accent)] shadow-md shadow-[var(--accent)]/20' : 'bg-[var(--card)] text-[var(--text-muted)] border-[var(--border)] hover:bg-[var(--card-hover)] hover:text-[var(--text)]'
            }`}
          >
            <User size={18} className={activeTab === 'personal' ? 'text-[var(--text-inverse)]' : 'text-[var(--text-muted)]'} />
            <span className="uppercase tracking-widest">Personal Info</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
              activeTab === 'security' ? 'bg-[var(--accent)] text-[var(--text-inverse)] border-[var(--accent)] shadow-md shadow-[var(--accent)]/20' : 'bg-[var(--card)] text-[var(--text-muted)] border-[var(--border)] hover:bg-[var(--card-hover)] hover:text-[var(--text)]'
            }`}
          >
            <Shield size={18} className={activeTab === 'security' ? 'text-[var(--text-inverse)]' : 'text-[var(--text-muted)]'} />
            <span className="uppercase tracking-widest">Security</span>
          </button>

          <button 
            onClick={() => setActiveTab('billing')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
              activeTab === 'billing' ? 'bg-[var(--accent)] text-[var(--text-inverse)] border-[var(--accent)] shadow-md shadow-[var(--accent)]/20' : 'bg-[var(--card)] text-[var(--text-muted)] border-[var(--border)] hover:bg-[var(--card-hover)] hover:text-[var(--text)]'
            }`}
          >
            <CreditCard size={18} className={activeTab === 'billing' ? 'text-[var(--text-inverse)]' : 'text-[var(--text-muted)]'} />
            <span className="uppercase tracking-widest">Billing</span>
          </button>
        </div>

        {/* Profile Content */}
        <div className="lg:col-span-3">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 backdrop-blur-md shadow-sm"
          >
            {activeTab === 'personal' && (
              <div className="space-y-8">
                {/* Avatar Section */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--accent)] to-purple-500 p-1">
                      <div className="w-full h-full bg-[var(--sidebar)] rounded-full flex items-center justify-center overflow-hidden border border-[var(--border)]">
                        <User size={40} className="text-[var(--text-muted)]" />
                      </div>
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-[var(--accent)] text-[var(--text-inverse)] rounded-full flex items-center justify-center hover:bg-[var(--accent-hover)] transition-colors border border-[var(--border)]">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--text)] uppercase tracking-wider mb-1">Profile Photo</h2>
                    <p className="text-sm text-[var(--text-muted)] mb-3">Upload a new avatar. Larger image will be resized automatically.</p>
                    <p className="text-xs text-[var(--text-muted)]">Maximum upload size is 2MB.</p>
                  </div>
                </div>

                <hr className="border-[var(--border)]" />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">First Name</label>
                    <input type="text" defaultValue="John" className="w-full bg-[var(--sidebar)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Last Name</label>
                    <input type="text" defaultValue="Doe" className="w-full bg-[var(--sidebar)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input type="email" defaultValue="john.doe@example.com" className="w-full bg-[var(--sidebar)] border border-[var(--border)] rounded-lg pl-12 pr-4 py-3 text-[var(--text)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Phone Number</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-[var(--sidebar)] border border-[var(--border)] rounded-lg pl-12 pr-4 py-3 text-[var(--text)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-sm" />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Address</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input type="text" defaultValue="123 Luxury Avenue, Beverly Hills, CA 90210" className="w-full bg-[var(--sidebar)] border border-[var(--border)] rounded-lg pl-12 pr-4 py-3 text-[var(--text)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-sm" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] font-bold uppercase tracking-widest rounded-lg transition-all shadow-md">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-[var(--text)] uppercase tracking-wider mb-1">Change Password</h2>
                  <p className="text-sm text-[var(--text-muted)]">Update your password to keep your account secure.</p>
                </div>

                <div className="space-y-6 max-w-md">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Current Password</label>
                    <div className="relative">
                      <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input type="password" placeholder="••••••••" className="w-full bg-[var(--sidebar)] border border-[var(--border)] rounded-lg pl-12 pr-4 py-3 text-[var(--text)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">New Password</label>
                    <div className="relative">
                      <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input type="password" placeholder="••••••••" className="w-full bg-[var(--sidebar)] border border-[var(--border)] rounded-lg pl-12 pr-4 py-3 text-[var(--text)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Confirm New Password</label>
                    <div className="relative">
                      <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input type="password" placeholder="••••••••" className="w-full bg-[var(--sidebar)] border border-[var(--border)] rounded-lg pl-12 pr-4 py-3 text-[var(--text)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-sm" />
                    </div>
                  </div>
                </div>

                <button className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] font-bold uppercase tracking-widest rounded-lg transition-all shadow-md">
                  Update Password
                </button>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-[var(--text)] uppercase tracking-wider mb-1">Payment Methods</h2>
                  <p className="text-sm text-[var(--text-muted)]">Manage your saved credit cards and billing information.</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-[var(--sidebar)] border border-[var(--border)] rounded-xl p-6 flex items-center justify-between relative overflow-hidden group hover:border-[var(--accent)] transition-colors shadow-sm">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 rounded-full blur-2xl group-hover:bg-[var(--accent)]/10 transition-colors" />
                    <div className="flex items-center gap-6 relative z-10">
                      <div className="w-16 h-10 bg-[var(--card)] border border-[var(--border)] rounded flex items-center justify-center shadow-sm">
                        <span className="text-[var(--text)] font-bold text-sm italic">VISA</span>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[var(--text)] tracking-widest">•••• •••• •••• 4242</p>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest">Expires 12/28</p>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-center gap-4">
                      <span className="px-3 py-1 bg-[var(--accent)]/20 text-[var(--accent)] text-[10px] font-bold uppercase tracking-widest rounded border border-[var(--accent)]/30">Default</span>
                      <button className="text-[var(--text-muted)] hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors">Remove</button>
                    </div>
                  </div>
                </div>

                <button className="px-6 py-3 bg-[var(--card)] hover:bg-[var(--card-hover)] text-[var(--text)] font-bold uppercase tracking-widest rounded-lg transition-all border border-[var(--border)] shadow-sm">
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
