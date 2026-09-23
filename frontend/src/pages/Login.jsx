import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await authService.login(formData);
      localStorage.setItem('drivex_token', response.token);
      localStorage.setItem('drivex_user', JSON.stringify(response.data));
      if (response.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to authenticate.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-black/40 backdrop-blur-2xl p-8 md:p-12 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
      
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-widest italic">Welcome Back</h2>
        <p className="text-gray-400 text-sm tracking-wide">Enter your credentials to access your fleet.</p>
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

      <form onSubmit={handleSubmit} className="space-y-6">
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
              required
              className="w-full bg-white/5 border border-white/10 rounded-sm pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all outline-none"
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Password</label>
            <a href="#" className="text-xs font-bold text-[#D4AF37] hover:text-white transition-colors uppercase tracking-widest">
              Forgot?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-sm pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all outline-none"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-4 mt-4 bg-[var(--color-drivex-accent)] text-black font-black uppercase tracking-widest text-sm rounded-sm hover:bg-white transition-colors flex justify-center items-center gap-2 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Sign In
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-white/10 text-center">
        <p className="text-sm text-gray-400">
          New to DriveX?{' '}
          <Link to="/register" className="text-white hover:text-[#D4AF37] transition-colors font-bold uppercase tracking-widest text-xs ml-1">
            Create Account
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
