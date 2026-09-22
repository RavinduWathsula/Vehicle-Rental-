import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Input from '../components/Input';
import Button from '../components/Button';
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
      // Redirect based on role
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-gray-400">Enter your credentials to access your account.</p>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-sm mb-6 text-sm"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          label="Email Address" 
          type="email" 
          name="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <div className="space-y-1">
          <Input 
            label="Password" 
            type="password" 
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="flex justify-end">
            <a href="#" className="text-xs text-[var(--color-drivex-accent)] hover:text-white transition-colors">
              Forgot password?
            </a>
          </div>
        </div>

        <Button type="submit" className="w-full mt-8" isLoading={isLoading}>
          Sign In
        </Button>
      </form>

      <p className="text-center text-sm text-gray-400 mt-8">
        Don't have an account?{' '}
        <Link to="/register" className="text-white hover:text-[var(--color-drivex-accent)] transition-colors font-medium">
          Create one now
        </Link>
      </p>
    </motion.div>
  );
};

export default Login;
