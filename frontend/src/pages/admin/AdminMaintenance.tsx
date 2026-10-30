import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Search, Plus, Trash2, CheckCircle2, Clock, X, RefreshCw } from 'lucide-react';
import { apiFetch } from '../../services/api';
import { ConfirmModal } from '../../components/ui/ConfirmModal';

export const AdminMaintenance = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [deletingRecord, setDeletingRecord] = useState<any | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [formData, setFormData] = useState({
    vehicle_id: '',
    maintenance_type: 'routine',
    description: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    cost: '',
    status: 'scheduled',
    notes: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [mRes, vRes] = await Promise.all([
        apiFetch('/admin/maintenance'),
        apiFetch('/admin/vehicles')
      ]);

      if (mRes.success && mRes.data) {
        setRecords(mRes.data);
      }
      if (vRes.success && vRes.data) {
        setVehicles(vRes.data);
        if (vRes.data.length > 0 && !formData.vehicle_id) {
          setFormData(prev => ({ ...prev, vehicle_id: String(vRes.data[0].id) }));
        }
      }
    } catch (err) {
      console.error('Error fetching maintenance data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSchedule = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const payload = {
        ...formData,
        vehicle_id: Number(formData.vehicle_id),
        cost: Number(formData.cost) || 0
      };

      const res = await apiFetch('/admin/maintenance', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (res.success) {
        setIsAddModalOpen(false);
        setFormData({
          vehicle_id: vehicles.length > 0 ? String(vehicles[0].id) : '',
          maintenance_type: 'routine',
          description: '',
          start_date: new Date().toISOString().split('T')[0],
          end_date: '',
          cost: '',
          status: 'scheduled',
          notes: ''
        });
        fetchData();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to schedule maintenance');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await apiFetch(`/admin/maintenance/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
      fetchData();
    } catch (err) {
      console.error('Failed to update maintenance status:', err);
    }
  };

  const handleDelete = (record: any) => {
    setDeletingRecord(record);
  };

  const confirmDeleteRecord = async () => {
    if (!deletingRecord) return;
    setDeleteLoading(true);
    try {
      await apiFetch(`/admin/maintenance/${deletingRecord.id}`, { method: 'DELETE' });
      setDeletingRecord(null);
      fetchData();
    } catch (err: any) {
      console.error('Failed to delete record:', err);
      setDeletingRecord(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredRecords = records.filter(r => 
    (r.brand && r.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (r.model && r.model.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (r.registration_number && r.registration_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (r.description && r.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-drivex-text italic uppercase tracking-wider mb-2">Maintenance Log</h1>
          <p className="text-drivex-text-muted text-sm">Schedule and track vehicle maintenance and repairs in your database.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 bg-drivex-card border border-drivex-border hover:border-drivex-accent text-drivex-text rounded-sm text-xs font-bold uppercase tracking-wider transition-all"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin text-drivex-accent' : ''} />
            Refresh
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            disabled={vehicles.length === 0}
            className="flex items-center gap-2 px-6 py-2.5 bg-drivex-accent text-drivex-text-inverse font-bold uppercase tracking-widest text-xs hover:bg-drivex-accent-hover shadow-md transition-all rounded-sm shrink-0 disabled:opacity-50"
          >
            <Plus size={16} /> Schedule Maintenance
          </button>
        </div>
      </div>

      <div className="bg-drivex-card border border-drivex-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-drivex-border flex flex-col md:flex-row gap-4 justify-between items-center bg-drivex-sidebar">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-drivex-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search maintenance records..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-drivex-card border border-drivex-border rounded-lg pl-10 pr-4 py-2 text-sm text-drivex-text placeholder-gray-500 focus:outline-none focus:border-drivex-accent focus:ring-1 focus:ring-drivex-accent transition-all" 
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-drivex-sidebar border-b border-drivex-border">
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Vehicle</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Type / Notes</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Start Date</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Cost</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record, i) => (
                  <motion.tr 
                    key={record.id} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: i * 0.04 }} 
                    className="border-b border-drivex-border hover:bg-drivex-card transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-sm font-bold text-drivex-text mb-0.5">{record.brand} {record.model}</p>
                        <p className="text-xs text-drivex-text-muted font-mono">{record.registration_number}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-bold text-drivex-text capitalize">{record.maintenance_type}</p>
                      {record.description && <p className="text-xs text-drivex-text-muted">{record.description}</p>}
                    </td>
                    <td className="py-4 px-6 text-sm text-drivex-text-muted font-medium">
                      {record.start_date ? new Date(record.start_date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-4 px-6 text-sm font-bold text-drivex-text">
                      LKR {parseFloat(record.cost || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 px-6">
                      <select 
                        value={record.status}
                        onChange={(e) => handleStatusChange(record.id, e.target.value)}
                        className={`text-xs font-bold uppercase tracking-wider rounded-lg px-2.5 py-1.5 border focus:outline-none transition-colors cursor-pointer dark:[color-scheme:dark] [color-scheme:light] ${
                          record.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                          record.status === 'in_progress' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                          'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}
                      >
                        <option value="scheduled" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Scheduled</option>
                        <option value="in_progress" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">In Progress</option>
                        <option value="completed" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Completed</option>
                        <option value="cancelled" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => handleDelete(record)}
                        className="p-2 text-drivex-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-drivex-text-muted">
                    <div className="flex flex-col items-center justify-center">
                      <Wrench size={36} className="text-drivex-border mb-3" />
                      <p className="text-base font-bold text-drivex-text mb-1">No Maintenance Records</p>
                      <p className="text-xs text-drivex-text-muted max-w-sm mb-4">
                        {vehicles.length === 0 
                          ? 'Add vehicles to your fleet first before scheduling maintenance.' 
                          : 'No service records scheduled yet. Click "Schedule Maintenance" to log vehicle repairs or routine inspections.'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Maintenance Modal */}
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
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              className="relative w-full max-w-lg bg-drivex-sidebar border border-drivex-border rounded-2xl shadow-2xl p-6"
            >
              <div className="flex justify-between items-center pb-4 border-b border-drivex-border mb-6">
                <h2 className="text-xl font-bold text-drivex-text uppercase tracking-wider">Schedule Maintenance</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="text-drivex-text-muted hover:text-drivex-text">
                  <X size={20} />
                </button>
              </div>

              {error && (
                <div className="p-3 mb-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handleSchedule} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest block mb-1">Select Vehicle *</label>
                  <select 
                    name="vehicle_id"
                    value={formData.vehicle_id}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-2.5 text-drivex-text focus:border-drivex-accent outline-none text-sm"
                  >
                    {vehicles.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.brand} {v.model} ({v.registration_number})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest block mb-1">Maintenance Type *</label>
                  <select 
                    name="maintenance_type"
                    value={formData.maintenance_type}
                    onChange={handleInputChange}
                    className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-2.5 text-drivex-text focus:border-drivex-accent outline-none text-sm"
                  >
                    <option value="routine">Routine Service</option>
                    <option value="repair">Repair</option>
                    <option value="inspection">Inspection</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest block mb-1">Start Date *</label>
                    <input 
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-2.5 text-drivex-text focus:border-drivex-accent outline-none text-sm dark:[color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest block mb-1">Estimated Cost (LKR)</label>
                    <input 
                      type="number"
                      name="cost"
                      value={formData.cost}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-2.5 text-drivex-text focus:border-drivex-accent outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest block mb-1">Description / Reason</label>
                  <input 
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="e.g. Brake pad change, oil change"
                    className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-2.5 text-drivex-text focus:border-drivex-accent outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest block mb-1">Status</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-drivex-card border border-drivex-border rounded-lg px-4 py-2.5 text-drivex-text focus:border-drivex-accent outline-none text-sm dark:[color-scheme:dark] [color-scheme:light]"
                  >
                    <option value="scheduled" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Scheduled</option>
                    <option value="in_progress" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">In Progress</option>
                    <option value="completed" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Completed</option>
                  </select>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsAddModalOpen(false)} 
                    className="px-4 py-2 text-sm text-drivex-text-muted hover:text-drivex-text"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="px-6 py-2.5 bg-drivex-accent text-drivex-text-inverse font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-drivex-accent-hover transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Scheduling...' : 'Save Schedule'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Maintenance Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingRecord}
        onClose={() => !deleteLoading && setDeletingRecord(null)}
        onConfirm={confirmDeleteRecord}
        isLoading={deleteLoading}
        title="Delete Maintenance Record"
        message="Are you sure you want to remove this service record from maintenance history?"
        confirmText="Delete Record"
        item={deletingRecord ? {
          title: deletingRecord.description || 'Service Entry',
          subtitle: `${deletingRecord.brand} ${deletingRecord.model} (${deletingRecord.registration_number})`,
          badge: deletingRecord.status,
        } : null}
      />
    </div>
  );
};
