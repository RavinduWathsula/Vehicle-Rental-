import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarFront, Search, Plus, Filter, MoreVertical, Edit, Trash2, CheckCircle2, XCircle, X, Image as ImageIcon } from 'lucide-react';
import { apiFetch } from '../../services/api';

export const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<any>({
    brand: '',
    model: '',
    category_id: 1, // Default to 1 (Assume Category 1 exists)
    year: new Date().getFullYear(),
    registration_number: '',
    fuel_type: 'petrol',
    transmission: 'automatic',
    seats: 4,
    doors: 4,
    luggage_capacity: 2,
    daily_price: '',
    weekly_price: '',
    monthly_price: '',
    description: '',
    status: 'available',
    image_url: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch vehicles on mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const data = await apiFetch('/admin/vehicles');
      if (data.success) {
        setVehicles(data.data);
      }
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Auto-calculate weekly and monthly if not provided
      const payload: any = { ...formData };
      if (!payload.weekly_price) payload.weekly_price = String(Number(payload.daily_price) * 6); // slightly discounted
      if (!payload.monthly_price) payload.monthly_price = String(Number(payload.daily_price) * 20);

      const data = await apiFetch('/vehicles', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (data.success) {
        setIsAddModalOpen(false);
        fetchVehicles(); // Refresh list
        // Reset form
        setFormData({
          brand: '', model: '', category_id: 1, year: new Date().getFullYear(),
          registration_number: '', fuel_type: 'petrol', transmission: 'automatic',
          seats: 4, doors: 4, luggage_capacity: 2, daily_price: '', weekly_price: '',
          monthly_price: '', description: '', status: 'available', image_url: ''
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to add vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white italic uppercase tracking-wider mb-2">Fleet Management</h1>
          <p className="text-gray-400 text-sm">Manage your vehicles, track their status, and add new inventory.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#00E5FF] text-black font-bold uppercase tracking-widest text-xs hover:bg-white hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all rounded-sm shrink-0"
        >
          <Plus size={16} />
          Add New Vehicle
        </button>
      </div>

      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center bg-black/60">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Search vehicles by brand or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/40 border-b border-white/10">
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Vehicle Details</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Specs</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Price/Day</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.filter(v => `${v.brand} ${v.model}`.toLowerCase().includes(searchTerm.toLowerCase())).map((vehicle, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={vehicle.id} 
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#00E5FF]/20 to-purple-500/20 rounded-lg flex items-center justify-center shrink-0 border border-white/10">
                        <CarFront size={24} className="text-[#00E5FF]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white mb-0.5">{vehicle.brand} {vehicle.model} ({vehicle.year})</p>
                        <p className="text-xs text-gray-500">{vehicle.registration_number}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1 text-xs text-gray-300">
                      <span>{vehicle.transmission} • {vehicle.fuel_type}</span>
                      <span>{vehicle.seats} Seats</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-white">${vehicle.daily_price}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      vehicle.status === 'available' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      vehicle.status === 'rented' ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20' :
                      'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    }`}>
                      {vehicle.status === 'available' && <CheckCircle2 size={12} />}
                      {vehicle.status === 'rented' && <CarFront size={12} />}
                      {vehicle.status === 'maintenance' && <XCircle size={12} />}
                      <span className="capitalize">{vehicle.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 rounded-lg transition-colors" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {vehicles.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    No vehicles found. Click "Add New Vehicle" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsAddModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#08090B] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40">
                <h2 className="text-xl font-bold text-white uppercase tracking-widest">Add New Vehicle</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-medium">
                    {error}
                  </div>
                )}
                <form id="add-vehicle-form" onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Photo Upload Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Vehicle Image URL</label>
                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus-within:border-[#00E5FF] transition-all">
                      <ImageIcon size={18} className="text-gray-500 shrink-0" />
                      <input 
                        type="url" 
                        name="image_url" 
                        value={formData.image_url} 
                        onChange={handleInputChange} 
                        placeholder="https://example.com/car-image.jpg" 
                        className="w-full bg-transparent text-white outline-none py-1" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Brand *</label>
                      <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} required placeholder="e.g. Porsche" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Model *</label>
                      <input type="text" name="model" value={formData.model} onChange={handleInputChange} required placeholder="e.g. 911 GT3" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Registration No *</label>
                      <input type="text" name="registration_number" value={formData.registration_number} onChange={handleInputChange} required placeholder="e.g. ABC-1234" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Daily Price ($) *</label>
                      <input type="number" name="daily_price" value={formData.daily_price} onChange={handleInputChange} required placeholder="0.00" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] outline-none" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Fuel Type</label>
                      <select name="fuel_type" value={formData.fuel_type} onChange={handleInputChange} className="w-full bg-[#111218] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] outline-none">
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Transmission</label>
                      <select name="transmission" value={formData.transmission} onChange={handleInputChange} className="w-full bg-[#111218] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] outline-none">
                        <option value="automatic">Automatic</option>
                        <option value="manual">Manual</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-white/10 bg-black/40 flex justify-end gap-4">
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-2.5 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  form="add-vehicle-form"
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-[#00E5FF] text-black font-bold uppercase tracking-widest text-xs hover:bg-white hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all rounded-lg disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Vehicle'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
