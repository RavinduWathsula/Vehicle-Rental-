import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Edit,
  Trash2
} from 'lucide-react';

const mockCustomers = [
  { id: 'CUST-001', name: 'Alex Johnson', email: 'alex@example.com', phone: '+1 (555) 123-4567', totalSpent: '$12,450', status: 'Active', tier: 'Platinum', joinDate: '2022-03-15' },
  { id: 'CUST-002', name: 'Sarah Williams', email: 'sarah.w@example.com', phone: '+1 (555) 987-6543', totalSpent: '$8,200', status: 'Active', tier: 'Gold', joinDate: '2022-08-22' },
  { id: 'CUST-003', name: 'Michael Chen', email: 'm.chen@example.com', phone: '+1 (555) 456-7890', totalSpent: '$1,500', status: 'Suspended', tier: 'Silver', joinDate: '2023-01-10' },
  { id: 'CUST-004', name: 'Emma Davis', email: 'emma.d@example.com', phone: '+1 (555) 234-5678', totalSpent: '$4,100', status: 'Active', tier: 'Gold', joinDate: '2023-05-05' },
  { id: 'CUST-005', name: 'James Wilson', email: 'james.w@example.com', phone: '+1 (555) 876-5432', totalSpent: '$24,800', status: 'Active', tier: 'Diamond', joinDate: '2021-11-30' },
];

export const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-drivex-text italic uppercase tracking-wider mb-2">Customer Directory</h1>
          <p className="text-drivex-text-muted text-sm">Manage customer accounts, tiers, and view their rental history.</p>
        </div>
      </div>

      <div className="bg-drivex-card border border-drivex-border rounded-2xl overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-drivex-border flex flex-col md:flex-row gap-4 justify-between items-center bg-drivex-sidebar">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-drivex-text-muted" size={18} />
            <input 
              type="text"
              placeholder="Search customers by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-drivex-card border border-drivex-border rounded-lg pl-10 pr-4 py-2 text-sm text-drivex-text placeholder-gray-500 focus:outline-none focus:border-drivex-accent focus:ring-1 focus:ring-drivex-accent transition-all"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-drivex-card hover:bg-drivex-card-hover border border-drivex-border rounded-lg text-sm font-bold text-drivex-text transition-colors w-full md:w-auto justify-center">
              <Filter size={16} />
              Filter
            </button>
            <select className="bg-drivex-card border border-drivex-border rounded-lg px-4 py-2 text-sm font-bold text-drivex-text focus:outline-none focus:border-drivex-accent transition-all w-full md:w-auto">
              <option value="all">All Tiers</option>
              <option value="diamond">Diamond</option>
              <option value="platinum">Platinum</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-drivex-sidebar border-b border-drivex-border">
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Customer Info</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Contact</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Join Date</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Tier / Status</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Total Spent</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map((customer, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={customer.id} 
                  className="border-b border-drivex-border hover:bg-drivex-card transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-drivex-card border border-drivex-border rounded-full flex items-center justify-center shrink-0 border border-drivex-border">
                        <Users size={18} className="text-drivex-text-muted" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-drivex-text mb-0.5">{customer.name}</p>
                        <p className="text-xs text-drivex-text-muted">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs text-drivex-text-muted">
                        <Mail size={12} className="text-drivex-accent" /> {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-drivex-text-muted">
                        <Phone size={12} className="text-drivex-accent" /> {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-drivex-text-muted">
                    {customer.joinDate}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col items-start gap-2">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                        customer.tier === 'Diamond' ? 'bg-drivex-accent/20 text-drivex-accent border border-drivex-accent/30' :
                        customer.tier === 'Platinum' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                        customer.tier === 'Gold' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-gray-500/20 text-drivex-text-muted border border-gray-500/30'
                      }`}>
                        {customer.tier}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs font-bold ${
                        customer.status === 'Active' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {customer.status === 'Active' ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                        {customer.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-drivex-text">
                    {customer.totalSpent}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-drivex-text-muted hover:text-drivex-accent hover:bg-drivex-accent/10 rounded-lg transition-colors" title="Edit Customer">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-drivex-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Suspend Account">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 text-drivex-text-muted hover:text-drivex-text rounded-lg transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-drivex-border flex items-center justify-between bg-black/20 text-xs text-drivex-text-muted">
          <p>Showing 1 to 5 of 8,459 customers</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-drivex-card border border-drivex-border rounded hover:bg-drivex-card-hover hover:text-drivex-text transition-colors">Previous</button>
            <button className="px-3 py-1 bg-drivex-accent/20 text-drivex-accent border border-drivex-accent/30 rounded">1</button>
            <button className="px-3 py-1 bg-drivex-card border border-drivex-border rounded hover:bg-drivex-card-hover hover:text-drivex-text transition-colors">2</button>
            <button className="px-3 py-1 bg-drivex-card border border-drivex-border rounded hover:bg-drivex-card-hover hover:text-drivex-text transition-colors">3</button>
            <button className="px-3 py-1 bg-drivex-card border border-drivex-border rounded hover:bg-drivex-card-hover hover:text-drivex-text transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
