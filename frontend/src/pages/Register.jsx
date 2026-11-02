import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { authService } from '../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    setError('');
    setIsReadOnly(true);
    const timer = setTimeout(() => {
      setIsReadOnly(false);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    
    try {
      const { confirmPassword, ...registerData } = formData;
      await authService.register(registerData);
      
      // Redirect to login with clean inputs
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-black/40 backdrop-blur-2xl p-5 sm:p-8 md:p-12 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-50" />
      
      <div className="mb-6 sm:mb-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 uppercase tracking-widest italic">Create Account</h2>
        <p className="text-gray-400 text-xs sm:text-sm tracking-wide">Join DRIVEX and unlock exclusive access to our fleet.</p>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-sm mb-6 text-xs uppercase tracking-widest text-center font-bold"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4 sm:space-y-6">
        {/* Browser Autofill Traps */}
        <input type="text" name="fake_email_prevent" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
        <input type="password" name="fake_password_prevent" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

        <div>
          <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input 
              type="text" 
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setIsReadOnly(false)}
              readOnly={isReadOnly}
              autoComplete="off"
              required
              className="w-full bg-white/5 border border-white/10 rounded-sm pl-11 pr-4 py-2.5 sm:py-3 text-white placeholder-gray-600 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all outline-none text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input 
                type="email" 
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setIsReadOnly(false)}
                readOnly={isReadOnly}
                autoComplete="off"
                required
                className="w-full bg-white/5 border border-white/10 rounded-sm pl-11 pr-4 py-2.5 sm:py-3 text-white placeholder-gray-600 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all outline-none text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input 
                type="tel" 
                name="phone"
                placeholder="+1 234 567 8900"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setIsReadOnly(false)}
                readOnly={isReadOnly}
                autoComplete="off"
                required
                className="w-full bg-white/5 border border-white/10 rounded-sm pl-11 pr-4 py-2.5 sm:py-3 text-white placeholder-gray-600 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all outline-none text-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setIsReadOnly(false)}
                readOnly={isReadOnly}
                autoComplete="new-password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-sm pl-11 pr-11 py-2.5 sm:py-3 text-white placeholder-gray-600 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#00E5FF] transition-colors focus:outline-none"
                tabIndex={-1}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => setIsReadOnly(false)}
                readOnly={isReadOnly}
                autoComplete="new-password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-sm pl-11 pr-11 py-2.5 sm:py-3 text-white placeholder-gray-600 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#00E5FF] transition-colors focus:outline-none"
                tabIndex={-1}
                title={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-3.5 sm:py-4 mt-2 sm:mt-4 bg-[var(--color-drivex-accent)] text-black font-black uppercase tracking-widest text-xs sm:text-sm rounded-sm hover:bg-white transition-colors flex justify-center items-center gap-2 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed shadow-lg active:scale-[0.99]"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Register
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 text-center">
        <p className="text-xs sm:text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:text-[#00E5FF] transition-colors font-bold uppercase tracking-widest text-xs ml-1">
            Sign In
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
