import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarFront, Search, Plus, Trash2, CheckCircle2, XCircle, X, Image as ImageIcon, RefreshCw, Pencil } from 'lucide-react';
import { apiFetch } from '../../services/api';

export const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState<number | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<any>({
    brand: '',
    model: '',
    category_id: 1,
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

  const [editFormData, setEditFormData] = useState<any>({
    brand: '',
    model: '',
    category_id: 1,
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
  const [editLoading, setEditLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [editError, setEditError] = useState('');

  // Fetch vehicles on mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setFetching(true);
      const data = await apiFetch('/admin/vehicles');
      if (data.success) {
        setVehicles(data.data || []);
      }
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    } finally {
      setFetching(false);
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
      const payload: any = { 
        ...formData,
        category_id: Number(formData.category_id),
        year: Number(formData.year),
        seats: Number(formData.seats),
        doors: Number(formData.doors),
        luggage_capacity: Number(formData.luggage_capacity),
        daily_price: Number(formData.daily_price),
        weekly_price: Number(formData.weekly_price || Number(formData.daily_price) * 6),
        monthly_price: Number(formData.monthly_price || Number(formData.daily_price) * 20),
      };

      if (!payload.image_url) {
        delete payload.image_url;
      }

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

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await apiFetch(`/vehicles/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
      fetchVehicles();
    } catch (err) {
      console.error('Failed to update vehicle status:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this vehicle from the fleet?')) return;
    try {
      await apiFetch(`/vehicles/${id}`, {
        method: 'DELETE'
      });
      fetchVehicles();
    } catch (err: any) {
      alert(err.message || 'Failed to delete vehicle');
    }
  };

  const handleOpenEditModal = (vehicle: any) => {
    setEditingVehicleId(vehicle.id);
    setEditFormData({
      brand: vehicle.brand || '',
      model: vehicle.model || '',
      category_id: vehicle.category_id || 1,
      year: vehicle.year || new Date().getFullYear(),
      registration_number: vehicle.registration_number || '',
      fuel_type: vehicle.fuel_type || 'petrol',
      transmission: vehicle.transmission || 'automatic',
      seats: vehicle.seats || 4,
      doors: vehicle.doors || 4,
      luggage_capacity: vehicle.luggage_capacity || 2,
      daily_price: vehicle.daily_price || '',
      weekly_price: vehicle.weekly_price || '',
      monthly_price: vehicle.monthly_price || '',
      description: vehicle.description || '',
      status: vehicle.status || 'available',
      image_url: vehicle.primary_image || (vehicle.images && vehicle.images[0] ? vehicle.images[0].image_url : '') || ''
    });
    setEditError('');
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
    if (!editingVehicleId) return;
    setEditLoading(true);
    setEditError('');

    try {
      const payload: any = {
        ...editFormData,
        category_id: Number(editFormData.category_id),
        year: Number(editFormData.year),
        seats: Number(editFormData.seats),
        doors: Number(editFormData.doors),
        luggage_capacity: Number(editFormData.luggage_capacity),
        daily_price: Number(editFormData.daily_price),
        weekly_price: Number(editFormData.weekly_price || Number(editFormData.daily_price) * 6),
        monthly_price: Number(editFormData.monthly_price || Number(editFormData.daily_price) * 20),
      };

      if (!payload.image_url) {
        delete payload.image_url;
      }

      const res = await apiFetch(`/vehicles/${editingVehicleId}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });

      if (res.success) {
        setIsEditModalOpen(false);
        setEditingVehicleId(null);
        fetchVehicles();
      } else {
        throw new Error(res.message || 'Failed to update vehicle');
      }
    } catch (err: any) {
      setEditError(err.message || 'Failed to update vehicle');
    } finally {
      setEditLoading(false);
    }
  };

  const filteredVehicles = vehicles.filter(v => 
    `${v.brand} ${v.model} ${v.registration_number}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-drivex-text italic uppercase tracking-wider mb-2">Fleet Management</h1>
          <p className="text-drivex-text-muted text-sm">Manage live vehicles in your database. Any vehicle added here is instantly visible to customers.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchVehicles}
            className="flex items-center gap-2 px-4 py-2 bg-drivex-card border border-drivex-border hover:border-drivex-accent text-drivex-text rounded-sm text-xs font-bold uppercase tracking-wider transition-all"
          >
            <RefreshCw size={14} className={fetching ? 'animate-spin text-drivex-accent' : ''} />
            Refresh
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-drivex-accent text-drivex-text-inverse font-bold uppercase tracking-widest text-xs hover:bg-drivex-accent-hover shadow-md transition-all rounded-sm shrink-0"
          >
            <Plus size={16} />
            Add New Vehicle
          </button>
        </div>
      </div>

      <div className="bg-drivex-card border border-drivex-border rounded-2xl overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-drivex-border flex flex-col md:flex-row gap-4 justify-between items-center bg-drivex-sidebar">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-drivex-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search vehicles by brand, model, or plate..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-drivex-card border border-drivex-border rounded-lg pl-10 pr-4 py-2 text-sm text-drivex-text placeholder-gray-500 focus:outline-none focus:border-drivex-accent focus:ring-1 focus:ring-drivex-accent transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-drivex-sidebar border-b border-drivex-border">
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Vehicle Details</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Specs</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Price/Day</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle, i) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    key={vehicle.id} 
                    className="border-b border-drivex-border hover:bg-drivex-card transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-12 rounded-lg flex items-center justify-center shrink-0 border border-drivex-border overflow-hidden bg-drivex-sidebar">
                          {vehicle.primary_image ? (
                            <img src={vehicle.primary_image} alt={vehicle.model} className="w-full h-full object-cover" />
                          ) : (
                            <CarFront size={22} className="text-drivex-accent" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-drivex-text mb-0.5">{vehicle.brand} {vehicle.model} ({vehicle.year})</p>
                          <p className="text-xs text-drivex-text-muted font-mono">{vehicle.registration_number}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1 text-xs text-drivex-text-muted">
                        <span className="capitalize">{vehicle.transmission} • {vehicle.fuel_type}</span>
                        <span>{vehicle.seats} Seats • {vehicle.category_name || 'Vehicle'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm font-bold text-drivex-text">${vehicle.daily_price}</td>
                    <td className="py-4 px-6">
                      <select
                        value={vehicle.status}
                        onChange={(e) => handleStatusChange(vehicle.id, e.target.value)}
                        className={`text-xs font-bold uppercase tracking-wider rounded-lg px-2.5 py-1.5 border focus:outline-none transition-colors cursor-pointer dark:[color-scheme:dark] [color-scheme:light] ${
                          vehicle.status === 'available' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                          vehicle.status === 'rented' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          vehicle.status === 'maintenance' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                          'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}
                      >
                        <option value="available" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Available</option>
                        <option value="rented" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Rented</option>
                        <option value="maintenance" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Maintenance</option>
                        <option value="inactive" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Inactive</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => handleOpenEditModal(vehicle)}
                          className="p-2 text-drivex-text-muted hover:text-drivex-accent hover:bg-drivex-accent/10 rounded-lg transition-colors" 
                          title="Edit Vehicle"
                        >
                          <Pencil size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(vehicle.id)}
                          className="p-2 text-drivex-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" 
                          title="Delete Vehicle"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-drivex-text-muted">
                    <div className="flex flex-col items-center justify-center">
                      <CarFront size={40} className="text-drivex-border mb-3" />
                      <p className="text-base font-bold text-drivex-text mb-1">No Vehicles in Fleet</p>
                      <p className="text-xs text-drivex-text-muted max-w-sm mb-4">
                        {searchTerm ? 'No vehicles match your search filter.' : 'Your fleet is currently empty. Click "Add New Vehicle" to add a car to your database.'}
                      </p>
                      {!searchTerm && (
                        <button 
                          onClick={() => setIsAddModalOpen(true)}
                          className="px-6 py-2.5 bg-drivex-accent text-drivex-text-inverse font-bold text-xs uppercase tracking-widest rounded-sm"
                        >
                          Add Your First Vehicle
                        </button>
                      )}
                    </div>
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
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsAddModalOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-drivex-sidebar border border-drivex-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-drivex-border bg-drivex-card">
                <h2 className="text-xl font-bold text-drivex-text uppercase tracking-widest">Add New Vehicle</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="text-drivex-text-muted hover:text-drivex-text transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 bg-drivex-bg">
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-medium">
                    {error}
                  </div>
                )}
                <form id="add-vehicle-form" onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Photo Upload Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Vehicle Image URL</label>
                    <div className="flex items-center gap-4 bg-drivex-card border border-drivex-border rounded-lg px-4 py-2 focus-within:border-drivex-accent transition-all">
                      <ImageIcon size={18} className="text-drivex-text-muted shrink-0" />
                      <input 
                        type="url" 
                        name="image_url" 
                        value={formData.image_url} 
                        onChange={handleInputChange} 
                        placeholder="https://images.unsplash.com/photo-..." 
                        className="w-full bg-transparent text-drivex-text placeholder:text-drivex-text-muted/60 outline-none py-1 text-sm" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Brand *</label>
                      <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} required placeholder="e.g. BMW, Toyota, Tesla" className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text placeholder:text-drivex-text-muted/60 focus:border-drivex-accent outline-none text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Model *</label>
                      <input type="text" name="model" value={formData.model} onChange={handleInputChange} required placeholder="e.g. 5 Series, Model 3" className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text placeholder:text-drivex-text-muted/60 focus:border-drivex-accent outline-none text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Registration No (License Plate) *</label>
                      <input type="text" name="registration_number" value={formData.registration_number} onChange={handleInputChange} required placeholder="e.g. ABC-1234" className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text placeholder:text-drivex-text-muted/60 focus:border-drivex-accent outline-none text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Daily Rental Price ($) *</label>
                      <input type="number" step="0.01" name="daily_price" value={formData.daily_price} onChange={handleInputChange} required placeholder="0.00" className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text placeholder:text-drivex-text-muted/60 focus:border-drivex-accent outline-none text-sm" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Category</label>
                      <select name="category_id" value={formData.category_id} onChange={handleInputChange} className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text focus:border-drivex-accent outline-none text-sm cursor-pointer dark:[color-scheme:dark] [color-scheme:light]">
                        <option value="1" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Luxury</option>
                        <option value="2" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Economy</option>
                        <option value="3" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Compact</option>
                        <option value="4" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Mid-size</option>
                        <option value="5" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">SUV</option>
                        <option value="6" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Van</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Year</label>
                      <input type="number" name="year" value={formData.year} onChange={handleInputChange} className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text placeholder:text-drivex-text-muted/60 focus:border-drivex-accent outline-none text-sm" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Fuel Type</label>
                      <select name="fuel_type" value={formData.fuel_type} onChange={handleInputChange} className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text focus:border-drivex-accent outline-none text-sm cursor-pointer dark:[color-scheme:dark] [color-scheme:light]">
                        <option value="petrol" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Petrol</option>
                        <option value="diesel" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Diesel</option>
                        <option value="electric" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Electric</option>
                        <option value="hybrid" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Hybrid</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Transmission</label>
                      <select name="transmission" value={formData.transmission} onChange={handleInputChange} className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text focus:border-drivex-accent outline-none text-sm cursor-pointer dark:[color-scheme:dark] [color-scheme:light]">
                        <option value="automatic" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Automatic</option>
                        <option value="manual" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Manual</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Seats</label>
                      <input type="number" name="seats" value={formData.seats} onChange={handleInputChange} className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text placeholder:text-drivex-text-muted/60 focus:border-drivex-accent outline-none text-sm" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Status</label>
                      <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text focus:border-drivex-accent outline-none text-sm cursor-pointer dark:[color-scheme:dark] [color-scheme:light]">
                        <option value="available" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Available</option>
                        <option value="maintenance" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Maintenance</option>
                        <option value="inactive" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Inactive</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-drivex-border bg-drivex-card flex justify-end gap-4">
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-2.5 bg-transparent border border-drivex-border text-drivex-text font-bold uppercase tracking-widest text-xs hover:bg-drivex-card-hover transition-all rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  form="add-vehicle-form"
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-drivex-accent text-drivex-text-inverse font-bold uppercase tracking-widest text-xs hover:bg-drivex-accent-hover shadow-md transition-all rounded-lg disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Vehicle'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Vehicle Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsEditModalOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-drivex-sidebar border border-drivex-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-drivex-border bg-drivex-card">
                <div>
                  <h2 className="text-xl font-bold text-drivex-text uppercase tracking-widest">Edit Vehicle</h2>
                  <p className="text-xs text-drivex-text-muted mt-0.5">Update specifications and pricing in database</p>
                </div>
                <button onClick={() => setIsEditModalOpen(false)} className="text-drivex-text-muted hover:text-drivex-text transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 bg-drivex-bg">
                {editError && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-medium">
                    {editError}
                  </div>
                )}
                <form id="edit-vehicle-form" onSubmit={handleEditSubmit} className="space-y-6">
                  
                  {/* Photo Upload Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Vehicle Image URL</label>
                    <div className="flex items-center gap-4 bg-drivex-card border border-drivex-border rounded-lg px-4 py-2 focus-within:border-drivex-accent transition-all">
                      <ImageIcon size={18} className="text-drivex-text-muted shrink-0" />
                      <input 
                        type="url" 
                        name="image_url" 
                        value={editFormData.image_url} 
                        onChange={handleEditInputChange} 
                        placeholder="https://images.unsplash.com/photo-..." 
                        className="w-full bg-transparent text-drivex-text placeholder:text-drivex-text-muted/60 outline-none py-1 text-sm" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Brand *</label>
                      <input type="text" name="brand" value={editFormData.brand} onChange={handleEditInputChange} required placeholder="e.g. BMW, Toyota, Tesla" className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text placeholder:text-drivex-text-muted/60 focus:border-drivex-accent outline-none text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Model *</label>
                      <input type="text" name="model" value={editFormData.model} onChange={handleEditInputChange} required placeholder="e.g. 5 Series, Model 3" className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text placeholder:text-drivex-text-muted/60 focus:border-drivex-accent outline-none text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Registration No (License Plate) *</label>
                      <input type="text" name="registration_number" value={editFormData.registration_number} onChange={handleEditInputChange} required placeholder="e.g. ABC-1234" className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text placeholder:text-drivex-text-muted/60 focus:border-drivex-accent outline-none text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Daily Rental Price ($) *</label>
                      <input type="number" step="0.01" name="daily_price" value={editFormData.daily_price} onChange={handleEditInputChange} required placeholder="0.00" className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text placeholder:text-drivex-text-muted/60 focus:border-drivex-accent outline-none text-sm" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Category</label>
                      <select name="category_id" value={editFormData.category_id} onChange={handleEditInputChange} className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text focus:border-drivex-accent outline-none text-sm cursor-pointer dark:[color-scheme:dark] [color-scheme:light]">
                        <option value="1" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Luxury</option>
                        <option value="2" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Economy</option>
                        <option value="3" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Compact</option>
                        <option value="4" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Mid-size</option>
                        <option value="5" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">SUV</option>
                        <option value="6" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Van</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Year</label>
                      <input type="number" name="year" value={editFormData.year} onChange={handleEditInputChange} className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text placeholder:text-drivex-text-muted/60 focus:border-drivex-accent outline-none text-sm" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Fuel Type</label>
                      <select name="fuel_type" value={editFormData.fuel_type} onChange={handleEditInputChange} className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text focus:border-drivex-accent outline-none text-sm cursor-pointer dark:[color-scheme:dark] [color-scheme:light]">
                        <option value="petrol" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Petrol</option>
                        <option value="diesel" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Diesel</option>
                        <option value="electric" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Electric</option>
                        <option value="hybrid" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Hybrid</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Transmission</label>
                      <select name="transmission" value={editFormData.transmission} onChange={handleEditInputChange} className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text focus:border-drivex-accent outline-none text-sm cursor-pointer dark:[color-scheme:dark] [color-scheme:light]">
                        <option value="automatic" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Automatic</option>
                        <option value="manual" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Manual</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Seats</label>
                      <input type="number" name="seats" value={editFormData.seats} onChange={handleEditInputChange} className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text placeholder:text-drivex-text-muted/60 focus:border-drivex-accent outline-none text-sm" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Doors</label>
                      <input type="number" name="doors" value={editFormData.doors} onChange={handleEditInputChange} className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text placeholder:text-drivex-text-muted/60 focus:border-drivex-accent outline-none text-sm" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Luggage Capacity (Bags)</label>
                      <input type="number" name="luggage_capacity" value={editFormData.luggage_capacity} onChange={handleEditInputChange} className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text placeholder:text-drivex-text-muted/60 focus:border-drivex-accent outline-none text-sm" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Status</label>
                      <select name="status" value={editFormData.status} onChange={handleEditInputChange} className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text focus:border-drivex-accent outline-none text-sm cursor-pointer dark:[color-scheme:dark] [color-scheme:light]">
                        <option value="available" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Available</option>
                        <option value="rented" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Rented</option>
                        <option value="maintenance" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Maintenance</option>
                        <option value="inactive" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Inactive</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-drivex-border bg-drivex-card flex justify-end gap-4">
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-2.5 bg-transparent border border-drivex-border text-drivex-text font-bold uppercase tracking-widest text-xs hover:bg-drivex-card-hover transition-all rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  form="edit-vehicle-form"
                  type="submit"
                  disabled={editLoading}
                  className="px-6 py-2.5 bg-drivex-accent text-drivex-text-inverse font-bold uppercase tracking-widest text-xs hover:bg-drivex-accent-hover shadow-md transition-all rounded-lg disabled:opacity-50"
                >
                  {editLoading ? 'Updating...' : 'Update Vehicle'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
