import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  CreditCard, 
  Key, 
  CheckCircle2, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import { authService } from '../../services/authService';

export const CustomerProfile = () => {
  const [activeTab, setActiveTab] = useState<'personal' | 'security' | 'billing'>('personal');
  const [user, setUser] = useState<any>(null);
  
  // Personal Info Form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Password Form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [savingPersonal, setSavingPersonal] = useState(false);
  const [personalSuccess, setPersonalSuccess] = useState('');
  const [personalError, setPersonalError] = useState('');

  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Load User Data
  useEffect(() => {
    const loadUserData = async () => {
      // First populate from localStorage for instant render
      const cached = localStorage.getItem('drivex_user');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setUser(parsed);
          setFormData({
            name: parsed.name || '',
            email: parsed.email || '',
            phone: parsed.phone || '',
          });
        } catch (e) {}
      }

      // Fetch freshest data from backend
      try {
        const res = await authService.getMe();
        if (res?.data?.user) {
          const liveUser = res.data.user;
          setUser(liveUser);
          setFormData({
            name: liveUser.name || '',
            email: liveUser.email || '',
            phone: liveUser.phone || '',
          });
          localStorage.setItem('drivex_user', JSON.stringify(liveUser));
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    loadUserData();
  }, []);

  const handlePersonalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPersonal(true);
    setPersonalSuccess('');
    setPersonalError('');

    try {
      const res = await authService.updateProfile({
        name: formData.name,
        phone: formData.phone,
      });

      if (res?.data?.user) {
        const updated = res.data.user;
        setUser(updated);
        localStorage.setItem('drivex_user', JSON.stringify(updated));
        // Notify any header/nav listeners
        window.dispatchEvent(new Event('storage'));
        setPersonalSuccess('Profile updated successfully! Changes saved to database.');
      } else {
        setPersonalSuccess('Profile updated successfully!');
      }
    } catch (err: any) {
      setPersonalError(err.message || 'Failed to update profile.');
    } finally {
      setSavingPersonal(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess('');
    setPasswordError('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }

    setSavingPassword(true);

    try {
      await authService.updateProfile({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setPasswordSuccess('Password updated successfully! You can use it next time you log in.');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to update password.');
    } finally {
      setSavingPassword(false);
    }
  };

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
              <form onSubmit={handlePersonalSubmit} className="space-y-8">
                {/* Avatar Section */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--accent)] to-purple-500 p-1">
                      <div className="w-full h-full bg-[var(--sidebar)] rounded-full flex items-center justify-center overflow-hidden border border-[var(--border)]">
                        <User size={40} className="text-[var(--accent)]" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--text)] uppercase tracking-wider mb-1">
                      {user?.name || 'Customer Account'}
                    </h2>
                    <p className="text-sm text-[var(--text-muted)] mb-1">Role: <span className="uppercase font-bold text-[var(--accent)]">{user?.role || 'Customer'}</span></p>
                    <p className="text-xs text-[var(--text-muted)]">User ID: #{user?.id || '—'}</p>
                  </div>
                </div>

                <hr className="border-[var(--border)]" />

                {personalSuccess && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    <span>{personalSuccess}</span>
                  </div>
                )}

                {personalError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm flex items-center gap-2">
                    <AlertCircle size={18} />
                    <span>{personalError}</span>
                  </div>
                )}

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe" 
                      className="w-full bg-[var(--sidebar)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-sm" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input 
                        type="email" 
                        disabled
                        value={formData.email} 
                        className="w-full bg-[var(--sidebar)]/50 border border-[var(--border)] rounded-lg pl-12 pr-4 py-3 text-[var(--text-muted)] cursor-not-allowed transition-all shadow-sm" 
                      />
                    </div>
                    <span className="text-[11px] text-[var(--text-muted)]">Email is tied to your account login.</span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Phone Number</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input 
                        type="tel" 
                        value={formData.phone} 
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000" 
                        className="w-full bg-[var(--sidebar)] border border-[var(--border)] rounded-lg pl-12 pr-4 py-3 text-[var(--text)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-sm" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    type="submit"
                    disabled={savingPersonal}
                    className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] font-bold uppercase tracking-widest rounded-lg transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                  >
                    {savingPersonal && <Loader2 size={16} className="animate-spin" />}
                    {savingPersonal ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'security' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-[var(--text)] uppercase tracking-wider mb-1">Change Password</h2>
                  <p className="text-sm text-[var(--text-muted)]">Update your password to keep your account secure.</p>
                </div>

                {passwordSuccess && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    <span>{passwordSuccess}</span>
                  </div>
                )}

                {passwordError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm flex items-center gap-2">
                    <AlertCircle size={18} />
                    <span>{passwordError}</span>
                  </div>
                )}

                <div className="space-y-6 max-w-md">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Current Password *</label>
                    <div className="relative">
                      <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input 
                        type="password" 
                        required
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        placeholder="••••••••" 
                        className="w-full bg-[var(--sidebar)] border border-[var(--border)] rounded-lg pl-12 pr-4 py-3 text-[var(--text)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-sm" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">New Password *</label>
                    <div className="relative">
                      <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input 
                        type="password" 
                        required
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        placeholder="••••••••" 
                        className="w-full bg-[var(--sidebar)] border border-[var(--border)] rounded-lg pl-12 pr-4 py-3 text-[var(--text)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-sm" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Confirm New Password *</label>
                    <div className="relative">
                      <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input 
                        type="password" 
                        required
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        placeholder="••••••••" 
                        className="w-full bg-[var(--sidebar)] border border-[var(--border)] rounded-lg pl-12 pr-4 py-3 text-[var(--text)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-sm" 
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={savingPassword}
                  className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] font-bold uppercase tracking-widest rounded-lg transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  {savingPassword && <Loader2 size={16} className="animate-spin" />}
                  {savingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-[var(--text)] uppercase tracking-wider mb-1">Payment Methods</h2>
                  <p className="text-sm text-[var(--text-muted)]">Manage your saved payment methods for instant rentals.</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-[var(--sidebar)] border border-[var(--border)] rounded-xl p-6 flex items-center justify-between relative overflow-hidden group hover:border-[var(--accent)] transition-colors shadow-sm">
                    <div className="flex items-center gap-6 relative z-10">
                      <div className="w-16 h-10 bg-[var(--card)] border border-[var(--border)] rounded flex items-center justify-center shadow-sm">
                        <span className="text-[var(--text)] font-bold text-sm italic">VISA</span>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[var(--text)] tracking-widest">•••• •••• •••• 4242</p>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest">Default Payment Method</p>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-center gap-4">
                      <span className="px-3 py-1 bg-[var(--accent)]/20 text-[var(--accent)] text-[10px] font-bold uppercase tracking-widest rounded border border-[var(--accent)]/30">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
