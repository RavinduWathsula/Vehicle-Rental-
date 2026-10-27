import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarCheck, 
  Search, 
  Filter, 
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  RefreshCw,
  Car
} from 'lucide-react';
import { apiFetch } from '../../services/api';

export const AdminBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/admin/bookings');
      if (res.success && res.data) {
        setBookings(res.data);
      }
    } catch (err) {
      console.error('Error fetching admin bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await apiFetch(`/admin/bookings/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ booking_status: newStatus })
      });
      // Refresh
      fetchBookings();
    } catch (err) {
      console.error('Failed to update booking status:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await apiFetch(`/admin/bookings/${id}`, {
        method: 'DELETE'
      });
      fetchBookings();
    } catch (err) {
      console.error('Failed to delete booking:', err);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      (b.booking_reference && b.booking_reference.toLowerCase().includes(term)) ||
      (b.customer_name && b.customer_name.toLowerCase().includes(term)) ||
      (b.customer_email && b.customer_email.toLowerCase().includes(term)) ||
      (b.brand && b.brand.toLowerCase().includes(term)) ||
      (b.model && b.model.toLowerCase().includes(term));

    const matchesStatus = statusFilter === 'all' || (b.booking_status && b.booking_status.toLowerCase() === statusFilter);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-drivex-text italic uppercase tracking-wider mb-2">Booking Management</h1>
          <p className="text-drivex-text-muted text-sm">Review, approve, and manage live customer reservations from your database.</p>
        </div>
        <button 
          onClick={fetchBookings}
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
              placeholder="Search bookings by ID, customer, or vehicle..."
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
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-drivex-sidebar border-b border-drivex-border">
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Booking ID / Customer</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Vehicle</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Dates</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Amount / Payment</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-drivex-text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking, i) => {
                  const pickup = booking.pickup_datetime ? String(booking.pickup_datetime).split('T')[0] : 'N/A';
                  const ret = booking.return_datetime ? String(booking.return_datetime).split('T')[0] : 'N/A';
                  const status = booking.booking_status || 'pending';

                  return (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      key={booking.id} 
                      className="border-b border-drivex-border hover:bg-drivex-card transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-sm font-bold text-drivex-text mb-0.5">{booking.booking_reference || `BK-${booking.id}`}</p>
                          <p className="text-sm text-drivex-text font-medium">{booking.customer_name || 'Customer'}</p>
                          <p className="text-xs text-drivex-text-muted">{booking.customer_email || booking.customer_phone || ''}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm font-bold text-drivex-text">{booking.brand} {booking.model}</p>
                        {booking.registration_number && (
                          <p className="text-xs font-mono text-drivex-text-muted">{booking.registration_number}</p>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-0.5 text-xs text-drivex-text-muted font-medium">
                          <span>From: <strong className="text-drivex-text">{pickup}</strong></span>
                          <span>To: <strong className="text-drivex-text">{ret}</strong></span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm font-bold text-drivex-text mb-1">
                          ${parseFloat(booking.total_amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-drivex-sidebar text-drivex-text-muted border border-drivex-border">
                          {booking.payment_status || 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <select 
                          value={status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          className={`text-xs font-bold uppercase tracking-wider rounded-lg px-2.5 py-1.5 border focus:outline-none transition-colors cursor-pointer ${
                            status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                            status === 'active' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                            status === 'confirmed' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                            status === 'cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                            'bg-orange-500/10 text-orange-400 border-orange-500/20'
                          }`}
                        >
                          <option value="pending" className="bg-drivex-card text-drivex-text">Pending</option>
                          <option value="confirmed" className="bg-drivex-card text-drivex-text">Confirmed</option>
                          <option value="active" className="bg-drivex-card text-drivex-text">Active</option>
                          <option value="completed" className="bg-drivex-card text-drivex-text">Completed</option>
                          <option value="cancelled" className="bg-drivex-card text-drivex-text">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button 
                          onClick={() => handleDelete(booking.id)}
                          className="p-2 text-drivex-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete Booking"
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
                      <CalendarCheck size={36} className="text-drivex-border mb-3" />
                      <p className="text-base font-bold text-drivex-text mb-1">No Bookings Found</p>
                      <p className="text-xs text-drivex-text-muted max-w-sm">
                        {searchTerm || statusFilter !== 'all' 
                          ? 'No reservations matched your filter criteria.' 
                          : 'No reservations have been placed yet. When customers book through the portal, reservations will appear here in real time.'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
