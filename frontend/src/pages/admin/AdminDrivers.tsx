import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle, Search, Plus, Trash2, Phone, X, RefreshCw, Pencil } from 'lucide-react';
import { apiFetch } from '../../services/api';

export const AdminDrivers = () => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDriverId, setEditingDriverId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    license_number: '',
    license_expiry: '',
    status: 'available'
  });

  const [editFormData, setEditFormData] = useState({
    name: '',
    phone: '',
    license_number: '',
    license_expiry: '',
    status: 'available'
  });

  const [submitting, setSubmitting] = useState(false);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [editError, setEditError] = useState('');

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/admin/drivers');
      if (res.success && res.data) {
        setDrivers(res.data);
      }
    } catch (err) {
      console.error('Error fetching drivers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddDriver = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await apiFetch('/admin/drivers', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      if (res.success) {
        setIsModalOpen(false);
        setFormData({ name: '', phone: '', license_number: '', license_expiry: '', status: 'available' });
        fetchDrivers();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to add driver');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to remove this driver?')) return;
    try {
      await apiFetch(`/admin/drivers/${id}`, { method: 'DELETE' });
      fetchDrivers();
    } catch (err) {
      console.error('Failed to delete driver:', err);
    }
  };

  const handleOpenEditModal = (driver: any) => {
    setEditingDriverId(driver.id);
    const rawExpiry = driver.license_expiry ? String(driver.license_expiry).split('T')[0] : '';
    setEditFormData({
      name: driver.name || '',
      phone: driver.phone || '',
      license_number: driver.license_number || '',
      license_expiry: rawExpiry,
      status: driver.status || 'available'
    });
    setEditError('');
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e: any) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
    if (!editingDriverId) return;
    setEditSubmitting(true);
    setEditError('');

    try {
      const res = await apiFetch(`/admin/drivers/${editingDriverId}`, {
        method: 'PUT',
        body: JSON.stringify(editFormData)
      });
      if (res.success) {
        setIsEditModalOpen(false);
        setEditingDriverId(null);
        fetchDrivers();
      } else {
        throw new Error(res.message || 'Failed to update driver');
      }
    } catch (err: any) {
      setEditError(err.message || 'Failed to update driver');
    } finally {
      setEditSubmitting(false);
    }
  };

  const filteredDrivers = drivers.filter(d => 
    (d.name && d.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (d.phone && d.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (d.license_number && d.license_number.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-drivex-text italic uppercase tracking-wider mb-2">Driver Roster</h1>
          <p className="text-drivex-text-muted text-sm">Manage professional chauffeurs saved in your database.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchDrivers}
            className="flex items-center gap-2 px-4 py-2 bg-drivex-card border border-drivex-border hover:border-drivex-accent text-drivex-text rounded-sm text-xs font-bold uppercase tracking-wider transition-all"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin text-drivex-accent' : ''} />
            Refresh
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-drivex-accent text-drivex-text-inverse font-bold uppercase tracking-widest text-xs hover:bg-drivex-accent-hover shadow-md transition-all rounded-sm shrink-0"
          >
            <Plus size={16} /> Add New Driver
          </button>
        </div>
      </div>

      <div className="bg-drivex-card border border-drivex-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-drivex-border flex flex-col md:flex-row gap-4 justify-between items-center bg-drivex-sidebar">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-drivex-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search drivers by name, phone, or license..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-drivex-card border border-drivex-border rounded-lg pl-10 pr-4 py-2 text-sm text-drivex-text placeholder-gray-500 focus:outline-none focus:border-drivex-accent focus:ring-1 focus:ring-drivex-accent transition-all" 
            />
          </div>
        </div>

        {filteredDrivers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredDrivers.map((driver, i) => (
              <motion.div 
                key={driver.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.05 }} 
                className="bg-drivex-card border border-drivex-border rounded-xl p-6 group hover:border-drivex-accent/50 transition-colors shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-drivex-accent to-purple-500 p-0.5">
                      <div className="w-full h-full bg-drivex-card rounded-full flex items-center justify-center">
                        <UserCircle size={24} className="text-drivex-accent" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-drivex-text font-bold">{driver.name}</h3>
                      <p className="text-xs text-drivex-text-muted">License: {driver.license_number}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    driver.status === 'available' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    driver.status === 'on_duty' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                    'bg-drivex-accent/20 text-drivex-accent border border-drivex-accent/30'
                  }`}>
                    {driver.status}
                  </span>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-drivex-text-muted">
                    <Phone size={14} className="text-drivex-accent" /> {driver.phone}
                  </div>
                  {driver.license_expiry && (
                    <div className="text-xs text-drivex-text-muted">
                      Expiry: {new Date(driver.license_expiry).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between border-t border-drivex-border pt-4">
                  <span className="text-xs text-drivex-text-muted font-mono">ID: #{driver.id}</span>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleOpenEditModal(driver)}
                      className="p-1.5 text-drivex-text-muted hover:text-drivex-accent transition-colors"
                      title="Edit Driver"
                    >
                      <Pencil size={15} />
                    </button>
                    <button 
                      onClick={() => handleDelete(driver.id)}
                      className="p-1.5 text-drivex-text-muted hover:text-red-400 transition-colors"
                      title="Remove Driver"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-drivex-text-muted">
            <UserCircle size={40} className="mx-auto mb-3 text-drivex-border" />
            <p className="text-base font-bold text-drivex-text mb-1">No Drivers Found</p>
            <p className="text-xs text-drivex-text-muted max-w-sm mx-auto mb-4">
              {searchTerm ? 'No drivers matched your search.' : 'You have not added any drivers yet. Click "Add New Driver" to add one to your database.'}
            </p>
            {!searchTerm && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2 bg-drivex-accent text-drivex-text-inverse font-bold text-xs uppercase tracking-widest rounded-sm"
              >
                Add Driver
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add Driver Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-drivex-sidebar border border-drivex-border rounded-2xl shadow-2xl overflow-hidden p-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-drivex-border mb-6">
                <h2 className="text-xl font-bold text-drivex-text uppercase tracking-wider">Add New Driver</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-drivex-text-muted hover:text-drivex-text">
                  <X size={20} />
                </button>
              </div>

              {error && (
                <div className="p-3 mb-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handleAddDriver} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest block mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="e.g. John Miller" 
                    className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-2.5 text-drivex-text placeholder:text-drivex-text-muted/60 focus:border-drivex-accent outline-none text-sm" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest block mb-1">Phone Number *</label>
                  <input 
                    type="text" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="e.g. +1 555-0192" 
                    className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-2.5 text-drivex-text placeholder:text-drivex-text-muted/60 focus:border-drivex-accent outline-none text-sm" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest block mb-1">Driver's License Number *</label>
                  <input 
                    type="text" 
                    name="license_number" 
                    value={formData.license_number} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="e.g. DL-8899123" 
                    className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-2.5 text-drivex-text placeholder:text-drivex-text-muted/60 focus:border-drivex-accent outline-none text-sm" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest block mb-1">License Expiry Date</label>
                  <input 
                    type="date" 
                    name="license_expiry" 
                    value={formData.license_expiry} 
                    onChange={handleInputChange} 
                    className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-2.5 text-drivex-text focus:border-drivex-accent outline-none text-sm dark:[color-scheme:dark]" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest block mb-1">Initial Status</label>
                  <select 
                    name="status" 
                    value={formData.status} 
                    onChange={handleInputChange}
                    className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-2.5 text-drivex-text focus:border-drivex-accent outline-none text-sm cursor-pointer"
                  >
                    <option value="available" className="bg-drivex-card text-drivex-text">Available</option>
                    <option value="on_duty" className="bg-drivex-card text-drivex-text">On Duty</option>
                    <option value="inactive" className="bg-drivex-card text-drivex-text">Inactive</option>
                  </select>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="px-4 py-2 text-sm text-drivex-text-muted hover:text-drivex-text"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="px-6 py-2.5 bg-drivex-accent text-drivex-text-inverse font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-drivex-accent-hover transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : 'Add Driver'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Driver Modal */}
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
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-drivex-sidebar border border-drivex-border rounded-xl shadow-2xl p-6 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-drivex-border mb-4">
                <h3 className="text-lg font-bold text-drivex-text uppercase tracking-wider">Edit Driver Profile</h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-drivex-text-muted hover:text-drivex-text">
                  <X size={20} />
                </button>
              </div>

              {editError && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs font-semibold">
                  {editError}
                </div>
              )}

              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest block mb-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={editFormData.name} 
                    onChange={handleEditInputChange} 
                    required 
                    className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-2.5 text-drivex-text focus:border-drivex-accent outline-none text-sm" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest block mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    name="phone" 
                    value={editFormData.phone} 
                    onChange={handleEditInputChange} 
                    required 
                    className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-2.5 text-drivex-text focus:border-drivex-accent outline-none text-sm" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest block mb-1">Driving License Number</label>
                  <input 
                    type="text" 
                    name="license_number" 
                    value={editFormData.license_number} 
                    onChange={handleEditInputChange} 
                    required 
                    className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-2.5 text-drivex-text focus:border-drivex-accent outline-none text-sm" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest block mb-1">License Expiry Date</label>
                  <input 
                    type="date" 
                    name="license_expiry" 
                    value={editFormData.license_expiry} 
                    onChange={handleEditInputChange} 
                    className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-2.5 text-drivex-text focus:border-drivex-accent outline-none text-sm dark:[color-scheme:dark]" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest block mb-1">Status</label>
                  <select 
                    name="status" 
                    value={editFormData.status} 
                    onChange={handleEditInputChange}
                    className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-2.5 text-drivex-text focus:border-drivex-accent outline-none text-sm cursor-pointer"
                  >
                    <option value="available" className="bg-drivex-card text-drivex-text">Available</option>
                    <option value="on_duty" className="bg-drivex-card text-drivex-text">On Duty</option>
                    <option value="inactive" className="bg-drivex-card text-drivex-text">Inactive</option>
                  </select>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsEditModalOpen(false)} 
                    className="px-4 py-2 text-sm text-drivex-text-muted hover:text-drivex-text"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={editSubmitting}
                    className="px-6 py-2.5 bg-drivex-accent text-drivex-text-inverse font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-drivex-accent-hover transition-all disabled:opacity-50"
                  >
                    {editSubmitting ? 'Updating...' : 'Update Driver'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
