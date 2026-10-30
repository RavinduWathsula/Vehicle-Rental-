import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  RefreshCw,
  UserCheck
} from 'lucide-react';
import { apiFetch } from '../../services/api';
import { ConfirmModal } from '../../components/ui/ConfirmModal';

export const AdminCustomers = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deletingCustomer, setDeletingCustomer] = useState<any | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/admin/customers');
      if (res.success && res.data) {
        setCustomers(res.data);
      }
    } catch (err) {
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await apiFetch(`/admin/customers/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      fetchCustomers();
    } catch (err) {
      console.error('Failed to update customer status:', err);
    }
  };

  const handleDelete = (customer: any) => {
    setDeletingCustomer(customer);
  };

  const confirmDeleteCustomer = async () => {
    if (!deletingCustomer) return;
    setDeleteLoading(true);
    try {
      await apiFetch(`/admin/customers/${deletingCustomer.id}`, {
        method: 'DELETE'
      });
      setDeletingCustomer(null);
      fetchCustomers();
    } catch (err: any) {
      console.error('Failed to delete customer:', err);
      setDeletingCustomer(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredCustomers = customers.filter((c) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      (c.name && c.name.toLowerCase().includes(term)) ||
      (c.email && c.email.toLowerCase().includes(term)) ||
      (c.phone && c.phone.toLowerCase().includes(term)) ||
      String(c.id).includes(term);

    const matchesStatus = statusFilter === 'all' || (c.status && c.status.toLowerCase() === statusFilter);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-drivex-text italic uppercase tracking-wider mb-2">Customer Directory</h1>
          <p className="text-drivex-text-muted text-sm">Real registered customer accounts from your database.</p>
        </div>
        <button 
          onClick={fetchCustomers}
          className="flex items-center gap-2 px-4 py-2 bg-drivex-card border border-drivex-border hover:border-drivex-accent text-drivex-text rounded-sm text-xs font-bold uppercase tracking-wider transition-all"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin text-drivex-accent' : ''} />
          Refresh
        </button>
      </div>

      <div className="bg-drivex-card border border-drivex-border rounded-2xl overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-drivex-border flex flex-col md:flex-row gap-4 justify-between items-center bg-drivex-sidebar">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-drivex-text-muted" size={18} />
            <input 
              type="text"
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-drivex-card border border-drivex-border rounded-lg pl-10 pr-4 py-2 text-sm text-drivex-text placeholder-gray-500 focus:outline-none focus:border-drivex-accent focus:ring-1 focus:ring-drivex-accent transition-all"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-drivex-card border border-drivex-border rounded-lg px-4 py-2 text-sm font-bold text-drivex-text focus:outline-none focus:border-drivex-accent transition-all w-full md:w-auto"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-drivex-sidebar border-b border-drivex-border">
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Customer Info</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Contact</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Join Date</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Activity</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer, i) => {
                  const joinDate = customer.created_at ? new Date(customer.created_at).toLocaleDateString() : 'N/A';
                  const status = customer.status || 'active';

                  return (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      key={customer.id} 
                      className="border-b border-drivex-border hover:bg-drivex-card transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-drivex-sidebar border border-drivex-border rounded-full flex items-center justify-center shrink-0">
                            <Users size={18} className="text-drivex-accent" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-drivex-text mb-0.5">{customer.name}</p>
                            <p className="text-xs text-drivex-text-muted">User ID: #{customer.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-xs text-drivex-text">
                            <Mail size={12} className="text-drivex-accent" /> {customer.email}
                          </div>
                          {customer.phone && (
                            <div className="flex items-center gap-2 text-xs text-drivex-text-muted">
                              <Phone size={12} className="text-drivex-text-muted" /> {customer.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-drivex-text-muted font-medium">
                        {joinDate}
                      </td>
                      <td className="py-4 px-6">
                        <select 
                          value={status}
                          onChange={(e) => handleStatusChange(customer.id, e.target.value)}
                          className={`text-xs font-bold uppercase tracking-wider rounded-lg px-2.5 py-1.5 border focus:outline-none transition-colors cursor-pointer dark:[color-scheme:dark] [color-scheme:light] ${
                            status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                            status === 'suspended' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                            'bg-orange-500/10 text-orange-400 border-orange-500/20'
                          }`}
                        >
                          <option value="active" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Active</option>
                          <option value="suspended" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Suspended</option>
                          <option value="inactive" className="bg-white text-slate-900 dark:bg-[#16181D] dark:text-white">Inactive</option>
                        </select>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm font-bold text-drivex-text mb-0.5">
                          LKR {parseFloat(customer.total_spent || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-xs text-drivex-text-muted">
                          {customer.total_bookings || 0} booking{(customer.total_bookings || 0) === 1 ? '' : 's'}
                        </p>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button 
                          onClick={() => handleDelete(customer)}
                          className="p-2 text-drivex-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete Customer Account"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-drivex-text-muted">
                    <div className="flex flex-col items-center justify-center">
                      <UserCheck size={36} className="text-drivex-border mb-3" />
                      <p className="text-base font-bold text-drivex-text mb-1">No Customers Found</p>
                      <p className="text-xs text-drivex-text-muted max-w-sm">
                        {searchTerm || statusFilter !== 'all' 
                          ? 'No registered customers matched your search.' 
                          : 'No customers registered yet. When users sign up on the website, they will appear here.'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Customer Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingCustomer}
        onClose={() => !deleteLoading && setDeletingCustomer(null)}
        onConfirm={confirmDeleteCustomer}
        isLoading={deleteLoading}
        title="Delete Customer Account"
        message="Are you sure you want to permanently delete this customer profile? The user will no longer be able to log in."
        confirmText="Delete Account"
        item={deletingCustomer ? {
          title: deletingCustomer.name,
          subtitle: `${deletingCustomer.email} • ${deletingCustomer.phone || 'No phone'}`,
          badge: deletingCustomer.status,
        } : null}
      />
    </div>
  );
};
