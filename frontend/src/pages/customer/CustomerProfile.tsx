import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  CreditCard, 
  Key, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  Car,
  MapPin,
  Sparkles,
  Lock,
  Building,
  FileText,
  Check,
  Laptop,
  Sliders,
  ShieldCheck,
  Award,
  ChevronRight
} from 'lucide-react';
import { authService } from '../../services/authService';

export const CustomerProfile = () => {
  const [activeTab, setActiveTab] = useState<'personal' | 'security' | 'preferences' | 'billing'>('personal');
  const [user, setUser] = useState<any>(null);
  
  // Personal Info Form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    licenseNumber: '',
    city: '',
    emergencyContact: '',
  });

  // Preferences Form
  const [preferences, setPreferences] = useState({
    preferredCategory: 'sports',
    preferredTransmission: 'automatic',
    preferredStation: 'airport',
    alwaysChauffeur: false,
    insurancePlusDefault: true,
  });

  // Corporate Billing Info
  const [billingInfo, setBillingInfo] = useState({
    companyName: '',
    taxId: '',
    billingEmail: '',
    billingAddress: '',
  });

  // Password Form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [savingPersonal, setSavingPersonal] = useState(false);
  const [personalSuccess, setPersonalSuccess] = useState('');
  const [personalError, setPersonalError] = useState('');

  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [savingPreferences, setSavingPreferences] = useState(false);
  const [preferencesSuccess, setPreferencesSuccess] = useState('');

  const [savingBilling, setSavingBilling] = useState(false);
  const [billingSuccess, setBillingSuccess] = useState('');

  // Selected avatar style theme
  const [avatarTheme, setAvatarTheme] = useState<'cyan' | 'purple' | 'emerald' | 'amber'>('cyan');

  // Load User Data
  useEffect(() => {
    const loadUserData = async () => {
      const cached = localStorage.getItem('drivex_user');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setUser(parsed);
          setFormData({
            name: parsed.name || '',
            email: parsed.email || '',
            phone: parsed.phone || '',
            licenseNumber: parsed.licenseNumber || 'B-983419-WP',
            city: parsed.city || 'Colombo, Western Province',
            emergencyContact: parsed.emergencyContact || '+94 77 987 6543',
          });
          if (parsed.preferences) {
            setPreferences(prev => ({ ...prev, ...parsed.preferences }));
          }
          if (parsed.billingInfo) {
            setBillingInfo(prev => ({ ...prev, ...parsed.billingInfo }));
          }
          if (parsed.avatarTheme) {
            setAvatarTheme(parsed.avatarTheme);
          }
        } catch (e) {}
      }

      // Fetch freshest data from backend
      try {
        const res = await authService.getMe();
        if (res?.data?.user) {
          const liveUser = res.data.user;
          setUser((prev: any) => ({ ...prev, ...liveUser }));
          setFormData(prev => ({
            ...prev,
            name: liveUser.name || prev.name,
            email: liveUser.email || prev.email,
            phone: liveUser.phone || prev.phone,
          }));
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

      const updatedBase = res?.data?.user || user || {};
      const fullUpdated = {
        ...updatedBase,
        name: formData.name,
        phone: formData.phone,
        licenseNumber: formData.licenseNumber,
        city: formData.city,
        emergencyContact: formData.emergencyContact,
        avatarTheme,
      };

      setUser(fullUpdated);
      localStorage.setItem('drivex_user', JSON.stringify(fullUpdated));
      window.dispatchEvent(new Event('storage'));
      setPersonalSuccess('Driver credentials and dossier updated successfully!');
    } catch (err: any) {
      // Fallback update locally if offline or network error
      const fullUpdated = {
        ...(user || {}),
        name: formData.name,
        phone: formData.phone,
        licenseNumber: formData.licenseNumber,
        city: formData.city,
        emergencyContact: formData.emergencyContact,
        avatarTheme,
      };
      setUser(fullUpdated);
      localStorage.setItem('drivex_user', JSON.stringify(fullUpdated));
      window.dispatchEvent(new Event('storage'));
      setPersonalSuccess('Driver credentials updated locally!');
    } finally {
      setSavingPersonal(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPassword(true);
    setPasswordSuccess('');
    setPasswordError('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match.');
      setSavingPassword(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      setSavingPassword(false);
      return;
    }

    try {
      await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setPasswordSuccess('Security credentials updated successfully! Use your new password on next sign-in.');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to update password. Please check your current password.');
    } finally {
      setSavingPassword(false);
    }
  };

  const handlePreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPreferences(true);
    setPreferencesSuccess('');

    setTimeout(() => {
      const updated = {
        ...(user || {}),
        preferences,
      };
      setUser(updated);
      localStorage.setItem('drivex_user', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      setSavingPreferences(false);
      setPreferencesSuccess('Flight & driving preferences saved!');
    }, 400);
  };

  const handleBillingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingBilling(true);
    setBillingSuccess('');

    setTimeout(() => {
      const updated = {
        ...(user || {}),
        billingInfo,
      };
      setUser(updated);
      localStorage.setItem('drivex_user', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      setSavingBilling(false);
      setBillingSuccess('Invoicing and tax credentials saved!');
    }, 400);
  };

  // Password strength calculation
  const getPasswordStrength = () => {
    const p = passwordData.newPassword;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 6) score += 25;
    if (p.length >= 10) score += 25;
    if (/[A-Z]/.test(p)) score += 25;
    if (/[0-9!@#$%^&*]/.test(p)) score += 25;
    return score;
  };

  const avatarGradients = {
    cyan: 'from-cyan-400 via-[var(--accent)] to-blue-600',
    purple: 'from-purple-500 via-indigo-600 to-pink-500',
    emerald: 'from-emerald-400 via-teal-500 to-cyan-600',
    amber: 'from-amber-400 via-orange-500 to-rose-600',
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      
      {/* Executive Command Header */}
      <header className="relative bg-gradient-to-r from-[var(--sidebar)] via-[var(--card)] to-[var(--sidebar)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 shadow-sm">
                <Sparkles size={13} /> Pilot Dossier & Keycard
              </span>
              <span className="text-xs font-semibold text-[var(--text-muted)] hidden sm:inline">
                • Zero-Deductible Verified
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-[var(--text)] tracking-tight">
              DRIVER PROFILE & <span className="text-[var(--accent)]">SETTINGS</span>
            </h1>
            <p className="text-sm text-[var(--text-muted)] max-w-xl">
              Manage your verified pilot credentials, driving preferences, multi-factor security, and luxury billing accounts in real time.
            </p>
          </div>

          {/* Quick Pilot Readiness Pill */}
          <div className="flex items-center gap-3 bg-[var(--sidebar)] p-3.5 rounded-2xl border border-[var(--border)] shadow-sm shrink-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Flight Readiness</p>
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <Check size={12} /> 100% Verified Driver
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Titanium Digital Pilot Keycard Showcase */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-[#0c1017] via-[#121824] to-[#080b11] border border-[var(--accent)]/30 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl text-white group"
      >
        {/* Holographic glowing lines & background mesh */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)]/15 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,229,255,0.08)_0%,_transparent_60%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Avatar with Theme Accent Ring */}
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br ${avatarGradients[avatarTheme]} p-1 shadow-xl transition-all duration-500`}>
                <div className="w-full h-full bg-[#0a0d14] rounded-[22px] flex items-center justify-center text-white text-2xl sm:text-3xl font-black shadow-inner">
                  {user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : 'DX'}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#0c1017] flex items-center justify-center text-black">
                <Check size={13} className="stroke-[3]" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/40">
                  ID: DX-{user?.id ? String(user.id).padStart(4, '0') : '0007'}
                </span>
                <span className="text-[11px] text-gray-400 font-medium hidden sm:inline">
                  • Executive Tier
                </span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase truncate">
                {user?.name || 'RAVINDU WATHSULA'}
              </h2>
              <p className="text-xs text-[var(--accent)] font-semibold flex items-center gap-1.5 mt-0.5">
                <Award size={14} /> High-Performance Supercar Eligible
              </p>
            </div>
          </div>

          {/* Keycard Metadata Attributes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-white/10 shrink-0">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
              <p className="text-[10px] uppercase font-bold text-gray-400">Driving License</p>
              <p className="text-xs font-mono font-bold text-white truncate mt-0.5">
                {formData.licenseNumber || 'B-983419-WP'}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
              <p className="text-[10px] uppercase font-bold text-gray-400">Home Region</p>
              <p className="text-xs font-bold text-white truncate mt-0.5">
                {formData.city || 'Colombo, LK'}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 col-span-2 sm:col-span-1">
              <p className="text-[10px] uppercase font-bold text-gray-400">Security Clearance</p>
              <p className="text-xs font-bold text-emerald-400 truncate mt-0.5 flex items-center gap-1">
                <ShieldCheck size={13} /> Zero-Deductible
              </p>
            </div>
          </div>

        </div>

        {/* Avatar Color Switcher */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <p className="text-[11px] text-gray-400 font-medium">Digital Keycard Theme Aura:</p>
          <div className="flex items-center gap-2">
            {(['cyan', 'purple', 'emerald', 'amber'] as const).map(color => (
              <button
                key={color}
                type="button"
                onClick={() => setAvatarTheme(color)}
                className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                  color === 'cyan' ? 'bg-cyan-400' :
                  color === 'purple' ? 'bg-purple-500' :
                  color === 'emerald' ? 'bg-emerald-400' : 'bg-amber-400'
                } ${avatarTheme === color ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-black' : 'opacity-60 hover:opacity-100'}`}
                title={`Theme: ${color}`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Settings Navigation & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: 'personal', label: 'Driver Credentials', icon: User, desc: 'Name, license & contact info' },
            { id: 'security', label: 'Security & Auth', icon: Shield, desc: 'Password & active sessions' },
            { id: 'preferences', label: 'Pilot Preferences', icon: Sliders, desc: 'Car tier & delivery hubs' },
            { id: 'billing', label: 'Billing & Invoicing', icon: CreditCard, desc: 'Payment cards & corporate tax' },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative w-full text-left p-4 rounded-2xl transition-all border cursor-pointer group flex items-start gap-3.5 ${
                  isActive 
                    ? 'bg-[var(--sidebar)] border-[var(--accent)] shadow-md shadow-[var(--accent)]/10 text-[var(--text)]' 
                    : 'bg-[var(--card)] hover:bg-[var(--card-hover)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSettingsTabIndicator"
                    className="absolute left-0 top-3 bottom-3 w-1.5 bg-[var(--accent)] rounded-r-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}

                <div className={`p-2.5 rounded-xl border shrink-0 transition-colors ${
                  isActive 
                    ? 'bg-[var(--accent)]/15 border-[var(--accent)]/40 text-[var(--accent)]' 
                    : 'bg-[var(--sidebar)] border-[var(--border)] text-[var(--text-muted)] group-hover:text-[var(--text)]'
                }`}>
                  <Icon size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold truncate">{tab.label}</p>
                  <p className="text-[11px] text-[var(--text-muted)] truncate mt-0.5">{tab.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display Area */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--sidebar)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 shadow-sm backdrop-blur-md"
          >
            
            {/* TAB 1: DRIVER CREDENTIALS (PERSONAL INFO) */}
            {activeTab === 'personal' && (
              <form onSubmit={handlePersonalSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-[var(--text)] uppercase tracking-wide">
                    Driver Credentials & Identity
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Official driver records used for rental agreements, vehicle insurance policies, and curbside key handover.
                  </p>
                </div>

                {personalSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5"
                  >
                    <CheckCircle2 size={18} className="shrink-0" />
                    <span>{personalSuccess}</span>
                  </motion.div>
                )}

                {personalError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5"
                  >
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{personalError}</span>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
                      <User size={13} className="text-[var(--accent)]" /> Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ravindu Wathsula"
                      className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-all shadow-inner"
                    />
                  </div>

                  {/* Driving License Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
                      <FileText size={13} className="text-[var(--accent)]" /> Driver License / IDP Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      placeholder="e.g. B-983419-WP"
                      className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm font-mono font-bold text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-all shadow-inner uppercase"
                    />
                    <span className="text-[10px] text-[var(--text-muted)] block">Required for insurance policy and police verification.</span>
                  </div>

                  {/* Contact Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
                      <Phone size={13} className="text-[var(--accent)]" /> Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +94 77 123 4567"
                      className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-all shadow-inner"
                    />
                    <span className="text-[10px] text-[var(--text-muted)] block">Used for chauffeur call & delivery coordinates.</span>
                  </div>

                  {/* Email (Readonly) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
                      <Mail size={13} className="text-[var(--accent)]" /> Registered Account Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        disabled
                        value={formData.email}
                        className="w-full bg-[var(--card)]/50 border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-muted)] cursor-not-allowed"
                      />
                      <Lock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)] block">Tied to your primary sign-in and encrypted session.</span>
                  </div>

                  {/* City / Base Region */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin size={13} className="text-[var(--accent)]" /> Residential City / Province
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Colombo, Western Province"
                      className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-all shadow-inner"
                    />
                  </div>

                  {/* Emergency Contact */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck size={13} className="text-emerald-400" /> 24/7 Emergency Contact (Next of Kin / Assistant)
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      placeholder="e.g. Name: Sarah / Phone: +94 77 987 6543"
                      className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-all shadow-inner"
                    />
                  </div>

                </div>

                <div className="flex justify-end pt-4 border-t border-[var(--border)]">
                  <button
                    type="submit"
                    disabled={savingPersonal}
                    className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-lg shadow-[var(--accent)]/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {savingPersonal && <Loader2 size={16} className="animate-spin" />}
                    {savingPersonal ? 'Synchronizing...' : 'Save Driver Credentials'}
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: SECURITY & AUTH */}
            {activeTab === 'security' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-[var(--text)] uppercase tracking-wide">
                    Security Credentials & Password
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Protect your luxury booking privileges with hardened password authentication and active session monitoring.
                  </p>
                </div>

                {passwordSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5"
                  >
                    <CheckCircle2 size={18} className="shrink-0" />
                    <span>{passwordSuccess}</span>
                  </motion.div>
                )}

                {passwordError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5"
                  >
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{passwordError}</span>
                  </motion.div>
                )}

                <div className="space-y-4 max-w-lg">
                  
                  {/* Current Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      Current Password *
                    </label>
                    <div className="relative">
                      <Key size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        required
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl pl-11 pr-11 py-3 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-all shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
                      >
                        {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      New Security Password *
                    </label>
                    <div className="relative">
                      <Key size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        placeholder="Minimum 6 characters"
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl pl-11 pr-11 py-3 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-all shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    {/* Password Strength Meter */}
                    {passwordData.newPassword && (
                      <div className="space-y-1 pt-1">
                        <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 rounded-full ${
                              getPasswordStrength() <= 25 ? 'w-1/4 bg-red-500' :
                              getPasswordStrength() <= 50 ? 'w-2/4 bg-amber-500' :
                              getPasswordStrength() <= 75 ? 'w-3/4 bg-blue-500' : 'w-full bg-emerald-400'
                            }`} 
                          />
                        </div>
                        <span className="text-[10px] text-[var(--text-muted)] font-mono">
                          Strength: {getPasswordStrength() <= 25 ? 'Weak' : getPasswordStrength() <= 50 ? 'Fair' : getPasswordStrength() <= 75 ? 'Good' : 'Strong & Encrypted'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      Confirm New Password *
                    </label>
                    <div className="relative">
                      <Key size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input
                        type="password"
                        required
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        placeholder="Re-type new password"
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl pl-11 pr-4 py-3 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-all shadow-inner"
                      />
                    </div>
                  </div>

                </div>

                {/* Active Session & Device Card */}
                <div className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl flex items-center justify-between gap-4 max-w-lg mt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[var(--sidebar)] border border-[var(--border)] text-[var(--accent)]">
                      <Laptop size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[var(--text)]">Current Web Session Active</p>
                      <p className="text-[11px] text-[var(--text-muted)]">Chrome on Windows • Colombo, Sri Lanka</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase">
                    Active
                  </span>
                </div>

                <div className="flex justify-end pt-4 border-t border-[var(--border)]">
                  <button
                    type="submit"
                    disabled={savingPassword}
                    className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-lg shadow-[var(--accent)]/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {savingPassword && <Loader2 size={16} className="animate-spin" />}
                    {savingPassword ? 'Updating Password...' : 'Update Password'}
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: PILOT DRIVING PREFERENCES */}
            {activeTab === 'preferences' && (
              <form onSubmit={handlePreferencesSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-[var(--text)] uppercase tracking-wide">
                    Pilot Handover & Fleet Preferences
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Preset your preferred vehicle classes, transmission dynamics, and preferred airport handover hub.
                  </p>
                </div>

                {preferencesSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5"
                  >
                    <CheckCircle2 size={18} className="shrink-0" />
                    <span>{preferencesSuccess}</span>
                  </motion.div>
                )}

                <div className="space-y-6">
                  
                  {/* Preferred Vehicle Class */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                      Preferred Vehicle Class
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: 'sports', label: 'Exotic Supercar', icon: '🏎️' },
                        { id: 'luxury', label: 'Executive Luxury', icon: '👑' },
                        { id: 'suv', label: 'Premium SUV', icon: '🚙' },
                        { id: 'van', label: 'Group Van', icon: '🚐' },
                      ].map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setPreferences({ ...preferences, preferredCategory: cat.id })}
                          className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                            preferences.preferredCategory === cat.id
                              ? 'bg-[var(--accent)] text-[var(--text-inverse)] border-[var(--accent)] shadow-md font-bold'
                              : 'bg-[var(--card)] hover:bg-[var(--card-hover)] border-[var(--border)] text-[var(--text)]'
                          }`}
                        >
                          <span className="text-xl block mb-1">{cat.icon}</span>
                          <span className="text-xs">{cat.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Transmission Preference */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                      Transmission Dynamic Preference
                    </label>
                    <div className="grid grid-cols-2 gap-3 max-w-md">
                      {[
                        { id: 'automatic', label: 'Automatic (Paddle Shift)' },
                        { id: 'manual', label: 'Manual (Purist 6-Speed)' },
                      ].map(t => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setPreferences({ ...preferences, preferredTransmission: t.id })}
                          className={`py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            preferences.preferredTransmission === t.id
                              ? 'bg-[var(--accent)] text-[var(--text-inverse)] border-[var(--accent)] shadow-sm'
                              : 'bg-[var(--card)] border-[var(--border)] text-[var(--text)]'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Handover Hub */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                      Primary Handover & Pickup Hub
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'airport', name: 'Airport VIP Curbside', desc: 'CMB Terminal 1 Meet & Greet' },
                        { id: 'downtown', name: 'Downtown Headquarters', desc: '123 Main St, City Center' },
                        { id: 'doorstep', name: 'Doorstep Concierge', desc: 'Delivered to hotel or villa' },
                      ].map(hub => (
                        <button
                          key={hub.id}
                          type="button"
                          onClick={() => setPreferences({ ...preferences, preferredStation: hub.id })}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            preferences.preferredStation === hub.id
                              ? 'bg-[var(--accent)]/10 border-[var(--accent)] text-[var(--text)] shadow-sm'
                              : 'bg-[var(--card)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                          }`}
                        >
                          <p className="text-xs font-bold text-[var(--text)]">{hub.name}</p>
                          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{hub.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Auto-Addons Toggles */}
                  <div className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-[var(--text)]">Insurance Plus Auto-Enrollment</p>
                        <p className="text-[11px] text-[var(--text-muted)]">Always attach zero-deductible coverage to new vehicle reservations.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.insurancePlusDefault}
                        onChange={(e) => setPreferences({ ...preferences, insurancePlusDefault: e.target.checked })}
                        className="w-4 h-4 accent-[var(--accent)] rounded cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                      <div>
                        <p className="text-xs font-bold text-[var(--text)]">Auto-Request Executive Chauffeur</p>
                        <p className="text-[11px] text-[var(--text-muted)]">Default booking flow to include a professional uniformed chauffeur.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.alwaysChauffeur}
                        onChange={(e) => setPreferences({ ...preferences, alwaysChauffeur: e.target.checked })}
                        className="w-4 h-4 accent-[var(--accent)] rounded cursor-pointer"
                      />
                    </div>
                  </div>

                </div>

                <div className="flex justify-end pt-4 border-t border-[var(--border)]">
                  <button
                    type="submit"
                    disabled={savingPreferences}
                    className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-lg shadow-[var(--accent)]/20 flex items-center gap-2 cursor-pointer"
                  >
                    {savingPreferences ? 'Saving...' : 'Save Pilot Preferences'}
                  </button>
                </div>
              </form>
            )}

            {/* TAB 4: BILLING & CORPORATE INVOICING */}
            {activeTab === 'billing' && (
              <form onSubmit={handleBillingSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-[var(--text)] uppercase tracking-wide">
                    Payment Methods & Corporate Invoicing
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Manage payment credentials for instant vehicle dispatch and register corporate tax details for VAT receipts.
                  </p>
                </div>

                {billingSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5"
                  >
                    <CheckCircle2 size={18} className="shrink-0" />
                    <span>{billingSuccess}</span>
                  </motion.div>
                )}

                {/* Active Payment Card Display */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                    Active Payment Methods
                  </label>

                  <div className="bg-gradient-to-r from-[var(--sidebar)] to-[var(--card)] border border-[var(--accent)]/40 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm relative overflow-hidden">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-9 bg-[var(--card)] border border-[var(--border)] rounded-lg flex items-center justify-center font-black italic text-xs text-[var(--text)] shadow-inner">
                        VISA
                      </div>
                      <div>
                        <p className="text-sm sm:text-base font-bold font-mono text-[var(--text)]">•••• •••• •••• 4242</p>
                        <p className="text-[11px] text-[var(--text-muted)]">Expires 12/28 • DriveX Verified Card</p>
                      </div>
                    </div>
                    
                    <span className="text-[10px] font-bold text-[var(--accent)] bg-[var(--accent)]/15 border border-[var(--accent)]/30 px-3 py-1 rounded-full uppercase tracking-wider">
                      Primary Billing
                    </span>
                  </div>
                </div>

                {/* Security Deposit Guarantee Badge */}
                <div className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[var(--text)]">Security Deposit Escrow Account</p>
                      <p className="text-[11px] text-[var(--text-muted)]">Current Outstanding Hold: $0.00 • 24-Hour Automated Release</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">Cleared</span>
                </div>

                {/* Corporate Invoicing Information */}
                <div className="pt-3 border-t border-[var(--border)] space-y-4">
                  <h4 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider flex items-center gap-2">
                    <Building size={16} className="text-[var(--accent)]" /> Corporate Tax & VAT Invoicing
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Company / Entity Name</label>
                      <input
                        type="text"
                        value={billingInfo.companyName}
                        onChange={(e) => setBillingInfo({ ...billingInfo, companyName: e.target.value })}
                        placeholder="e.g. Acme Global Logistics Ltd"
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-all shadow-inner"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Tax Registration / VAT ID</label>
                      <input
                        type="text"
                        value={billingInfo.taxId}
                        onChange={(e) => setBillingInfo({ ...billingInfo, taxId: e.target.value })}
                        placeholder="e.g. VAT-984210984"
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm font-mono text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-all shadow-inner"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Registered Billing Address</label>
                      <input
                        type="text"
                        value={billingInfo.billingAddress}
                        onChange={(e) => setBillingInfo({ ...billingInfo, billingAddress: e.target.value })}
                        placeholder="e.g. Level 14, World Trade Center, Colombo 01"
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-all shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-[var(--border)]">
                  <button
                    type="submit"
                    disabled={savingBilling}
                    className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-lg shadow-[var(--accent)]/20 flex items-center gap-2 cursor-pointer"
                  >
                    {savingBilling ? 'Saving...' : 'Save Invoicing Details'}
                  </button>
                </div>
              </form>
            )}

          </motion.div>
        </div>

      </div>
    </div>
  );
};
