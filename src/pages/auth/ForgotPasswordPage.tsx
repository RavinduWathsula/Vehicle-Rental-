import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Mail, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate backend call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#08090B] flex items-center justify-center px-4 pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glassmorphism rounded-2xl p-8 cinematic-shadow border border-white/10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Reset Password</h1>
          <p className="text-white/50 text-sm">Enter your email and we'll send you a recovery link.</p>
        </div>

        {success ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <CheckCircle size={48} className="text-[#D4AF37]" />
            <p className="text-white/80">If an account exists for {email}, a recovery link has been sent.</p>
            <Link to="/login" className="w-full mt-4">
              <Button className="w-full">BACK TO LOGIN</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/60 uppercase tracking-widest font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="john@example.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full mt-4">
              {loading ? 'SENDING LINK...' : 'SEND RECOVERY LINK'}
            </Button>
          </form>
        )}

        {!success && (
          <p className="text-center text-white/50 text-sm mt-8">
            Remembered your password? <Link to="/login" className="text-[#D4AF37] hover:text-white transition-colors ml-1">Sign in</Link>
          </p>
        )}
      </motion.div>
    </div>
  );
};
