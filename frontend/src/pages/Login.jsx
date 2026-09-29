import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(() => location.pathname !== '/register');
  
  useEffect(() => {
    setIsLogin(location.pathname !== '/register');
  }, [location.pathname]);

  // Form states
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', email: '', phone: '', password: '', confirmPassword: '' 
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await authService.login(loginData);
      const { user, token } = response.data;
      localStorage.setItem('drivex_token', token);
      localStorage.setItem('drivex_user', JSON.stringify(user));
      if (user.role === 'admin') {
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

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    
    try {
      const { confirmPassword: _confirmPassword, ...data } = registerData;
      await authService.register(data);
      // On success, switch to login
      setIsLogin(true);
      setLoginData(prev => ({ ...prev, email: registerData.email }));
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleState = () => {
    const newState = !isLogin;
    setIsLogin(newState);
    // Optionally update URL without reloading
    window.history.pushState({}, '', newState ? '/login' : '/register');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#040508] overflow-hidden">
      
      {/* Background Elements (From AuthLayout) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2072&auto=format&fit=crop" 
          alt="Premium Vehicle" 
          className="w-full h-full object-cover object-center grayscale-[40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040508] via-[#040508]/60 to-[#040508]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040508] via-transparent to-[#040508]" />
      </div>

      {/* Floating Animated Orbs */}
      <motion.div 
        animate={{ y: [0, -50, 0], x: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00E5FF] rounded-full mix-blend-screen filter blur-[120px] opacity-30 pointer-events-none z-0"
      />
      <motion.div 
        animate={{ y: [0, 50, 0], x: [0, -40, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none z-0"
      />

      {/* Back to Home */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 md:top-8 md:left-12 z-[60] flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold group"
      >
        <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>

      {/* The Blade that wipes across the whole page */}
      <div 
        className="absolute inset-0 bg-[#040508] z-50 pointer-events-none"
        style={{
          transform: isLogin ? 'translateX(-100%)' : 'translateX(100%)',
          transition: 'transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)'
        }}
      />

      {/* Layout Container - We use Grid so both states can sit perfectly on top of each other */}
      <div className="relative z-10 w-full grid min-h-screen px-6 lg:px-12 py-20">

        {/* ======================= */}
        {/*       LOGIN STATE       */}
        {/* ======================= */}
        <div 
          className="row-start-1 col-start-1 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12"
          style={{ 
            opacity: isLogin ? 1 : 0, 
            transition: 'opacity 0s 0.3s',
            pointerEvents: isLogin ? 'auto' : 'none'
          }}
        >
          {/* Left Branding */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 bg-[#00E5FF] rounded-sm flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                <span className="text-black font-black italic text-3xl leading-none">D</span>
              </div>
              <span className="text-3xl font-black tracking-widest text-white uppercase italic">DriveX</span>
            </Link>
            
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-[0.9] mb-6">
              Unlock <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00E5FF]">The Fleet.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-light max-w-md tracking-wide">
              Experience automotive perfection. Login to manage your bookings and experience the drive of your life.
            </p>
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-black/40 backdrop-blur-2xl p-8 md:p-12 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-50 z-20" />
              
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-widest italic">Welcome Back</h2>
                <p className="text-gray-400 text-sm tracking-wide">Enter your credentials to access your fleet.</p>
              </div>

              {error && isLogin && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-sm mb-6 text-xs uppercase tracking-widest text-center font-bold">
                  {error}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-6 flex-grow" autoComplete="off">
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
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                      autoComplete="off"
                      className="w-full bg-white/5 border border-white/10 rounded-sm pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Password</label>
                    <a href="#" className="text-xs font-bold text-[#00E5FF] hover:text-white transition-colors uppercase tracking-widest">
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
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                      autoComplete="new-password"
                      className="w-full bg-white/5 border border-white/10 rounded-sm pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all outline-none"
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
                  <button 
                    type="button"
                    onClick={toggleState}
                    className="text-white hover:text-[#00E5FF] transition-colors font-bold uppercase tracking-widest text-xs ml-1"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ======================= */}
        {/*     REGISTER STATE      */}
        {/* ======================= */}
        <div 
          className="row-start-1 col-start-1 w-full max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center justify-between gap-12"
          style={{ 
            opacity: isLogin ? 0 : 1, 
            transition: 'opacity 0s 0.3s',
            pointerEvents: isLogin ? 'none' : 'auto'
          }}
        >
          {/* Right Branding (Mirrored) */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right">
            <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 bg-[#00E5FF] rounded-sm flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                <span className="text-black font-black italic text-3xl leading-none">D</span>
              </div>
              <span className="text-3xl font-black tracking-widest text-white uppercase italic">DriveX</span>
            </Link>
            
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-[0.9] mb-6">
              Join <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-white to-[#00E5FF]">The Elite.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-light max-w-md tracking-wide">
              Register to gain exclusive access to the world's most premium vehicles.
            </p>
          </div>

          {/* Left Form (Mirrored) */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="w-full max-w-md bg-black/40 backdrop-blur-2xl p-8 md:p-12 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-[#00E5FF] to-transparent opacity-50 z-20" />
              
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-widest italic">Create Account</h2>
                <p className="text-gray-400 text-sm tracking-wide">Join DRIVEX and unlock exclusive access.</p>
              </div>

              {error && !isLogin && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-sm mb-6 text-xs uppercase tracking-widest text-center font-bold">
                  {error}
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-6 flex-grow">
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
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-sm pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-sm pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all outline-none"
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
                        value={registerData.phone}
                        onChange={handleRegisterChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-sm pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Password</label>
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
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-sm pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all outline-none"
                      />
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
                        type="password" 
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-sm pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all outline-none"
                      />
                    </div>
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
                      Register
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{' '}
                  <button 
                    type="button"
                    onClick={toggleState}
                    className="text-white hover:text-[#00E5FF] transition-colors font-bold uppercase tracking-widest text-xs ml-1"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
