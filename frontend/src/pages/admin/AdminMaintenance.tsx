import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Search, Plus, Filter, MoreVertical, Edit, Trash2, CheckCircle2, AlertTriangle, Clock, X } from 'lucide-react';

const mockMaintenance = [
  { id: 'MNT-128', vehicle: 'Porsche 911 GT3 RS', type: 'Routine Service', startDate: '2023-11-01', cost: '$1,200', status: 'Scheduled' },
  { id: 'MNT-129', vehicle: 'Lamborghini Urus', type: 'Tire Replacement', startDate: '2023-10-25', cost: '$3,800', status: 'In Progress' },
  { id: 'MNT-130', vehicle: 'Mercedes G63 AMG', type: 'Inspection', startDate: '2023-10-15', cost: '$450', status: 'Completed' },
];

export const AdminMaintenance = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-drivex-text italic uppercase tracking-wider mb-2">Maintenance Log</h1>
          <p className="text-drivex-text-muted text-sm">Schedule and track vehicle maintenance, repairs, and inspections.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-drivex-accent text-drivex-text-inverse font-bold uppercase tracking-widest text-xs hover:bg-drivex-accent-hover hover:bg-drivex-accent-hover shadow-md transition-all rounded-sm shrink-0"
        >
          <Plus size={16} /> Schedule Maintenance
        </button>
      </div>

      <div className="bg-drivex-card border border-drivex-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-drivex-border flex flex-col md:flex-row gap-4 justify-between items-center bg-drivex-sidebar">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-drivex-text-muted" size={18} />
            <input type="text" placeholder="Search maintenance records..." className="w-full bg-drivex-card border border-drivex-border rounded-lg pl-10 pr-4 py-2 text-sm text-drivex-text placeholder-gray-500 focus:outline-none focus:border-drivex-accent focus:ring-1 focus:ring-drivex-accent transition-all" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-drivex-sidebar border-b border-drivex-border">
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Record ID / Vehicle</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Type</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Cost</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockMaintenance.map((record, i) => (
                <motion.tr key={record.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="border-b border-drivex-border hover:bg-drivex-card transition-colors group">
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm font-bold text-drivex-text mb-0.5">{record.vehicle}</p>
                      <p className="text-xs text-drivex-text-muted">{record.id}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-drivex-text-muted">{record.type}</td>
                  <td className="py-4 px-6 text-sm text-drivex-text-muted">{record.startDate}</td>
                  <td className="py-4 px-6 text-sm font-bold text-drivex-text">{record.cost}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      record.status === 'Completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      record.status === 'In Progress' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                      'bg-drivex-accent/10 text-drivex-accent border border-drivex-accent/20'
                    }`}>
                      {record.status === 'Completed' && <CheckCircle2 size={12} />}
                      {record.status === 'In Progress' && <Wrench size={12} />}
                      {record.status === 'Scheduled' && <Clock size={12} />}
                      {record.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-drivex-text-muted hover:text-drivex-accent hover:bg-drivex-accent/10 rounded-lg transition-colors"><Edit size={16} /></button>
                      <button className="p-2 text-drivex-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-[#08090B] border border-drivex-border rounded-2xl shadow-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-drivex-text uppercase tracking-widest">Schedule Maintenance</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="text-drivex-text-muted hover:text-drivex-text"><X size={24} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Select Vehicle</label>
                  <select className="w-full mt-1 bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text focus:border-drivex-accent outline-none">
                    <option>Porsche 911 GT3 RS</option>
                    <option>Lamborghini Urus</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Maintenance Type</label>
                  <select className="w-full mt-1 bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text focus:border-drivex-accent outline-none">
                    <option>Routine Service</option>
                    <option>Repair</option>
                    <option>Inspection</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-drivex-text-muted uppercase tracking-widest">Date</label>
                  <input type="date" className="w-full mt-1 bg-drivex-card border border-drivex-border rounded-lg px-4 py-3 text-drivex-text focus:border-drivex-accent outline-none" />
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="w-full py-3 bg-drivex-accent text-drivex-text-inverse font-bold uppercase tracking-widest rounded-lg mt-4">Save Record</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
