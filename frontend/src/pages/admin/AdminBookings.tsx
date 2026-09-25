import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarCheck, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Trash2
} from 'lucide-react';

const mockBookings = [
  { id: 'BK-7829', customer: 'Alex Johnson', email: 'alex@example.com', vehicle: 'Porsche 911 GT3 RS', startDate: '2023-10-15', endDate: '2023-10-18', amount: '$4,200', status: 'Active', paymentStatus: 'Paid' },
  { id: 'BK-7830', customer: 'Sarah Williams', email: 'sarah.w@example.com', vehicle: 'Mercedes G63 AMG', startDate: '2023-10-16', endDate: '2023-10-20', amount: '$3,800', status: 'Pending', paymentStatus: 'Unpaid' },
  { id: 'BK-7831', customer: 'Michael Chen', email: 'm.chen@example.com', vehicle: 'Lamborghini Urus', startDate: '2023-10-14', endDate: '2023-10-15', amount: '$1,500', status: 'Completed', paymentStatus: 'Paid' },
  { id: 'BK-7832', customer: 'Emma Davis', email: 'emma.d@example.com', vehicle: 'Range Rover Sport', startDate: '2023-10-18', endDate: '2023-10-25', amount: '$2,100', status: 'Active', paymentStatus: 'Paid' },
  { id: 'BK-7833', customer: 'James Wilson', email: 'james.w@example.com', vehicle: 'Ferrari F8 Tributo', startDate: '2023-10-20', endDate: '2023-10-22', amount: '$2,400', status: 'Cancelled', paymentStatus: 'Refunded' },
];

export const AdminBookings = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white italic uppercase tracking-wider mb-2">Booking Management</h1>
          <p className="text-gray-400 text-sm">Review, approve, and manage all customer reservations.</p>
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center bg-black/60">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Search bookings by ID or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-bold text-white transition-colors w-full md:w-auto justify-center">
              <Filter size={16} />
              Filter
            </button>
            <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm font-bold text-white focus:outline-none focus:border-[#00E5FF] transition-all w-full md:w-auto">
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/40 border-b border-white/10">
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Booking ID / Customer</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Vehicle</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Dates</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Amount / Payment</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map((booking, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={booking.id} 
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm font-bold text-white mb-0.5">{booking.id}</p>
                      <p className="text-sm text-gray-300">{booking.customer}</p>
                      <p className="text-xs text-gray-500">{booking.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-white">{booking.vehicle}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1 text-sm text-gray-300">
                      <span>{booking.startDate} to</span>
                      <span>{booking.endDate}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-bold text-white mb-1">{booking.amount}</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                      booking.paymentStatus === 'Paid' ? 'bg-green-500/20 text-green-400' :
                      booking.paymentStatus === 'Refunded' ? 'bg-gray-500/20 text-gray-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      booking.status === 'Completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      booking.status === 'Active' ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20' :
                      booking.status === 'Pending' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {booking.status === 'Completed' && <CheckCircle2 size={12} />}
                      {booking.status === 'Active' && <Clock size={12} />}
                      {booking.status === 'Pending' && <Clock size={12} />}
                      {booking.status === 'Cancelled' && <XCircle size={12} />}
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 rounded-lg transition-colors" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-colors" title="Approve">
                        <CheckCircle2 size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Cancel Booking">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-white/10 flex items-center justify-between bg-black/20 text-xs text-gray-400">
          <p>Showing 1 to 5 of 142 bookings</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white/5 border border-white/10 rounded hover:bg-white/10 hover:text-white transition-colors">Previous</button>
            <button className="px-3 py-1 bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30 rounded">1</button>
            <button className="px-3 py-1 bg-white/5 border border-white/10 rounded hover:bg-white/10 hover:text-white transition-colors">2</button>
            <button className="px-3 py-1 bg-white/5 border border-white/10 rounded hover:bg-white/10 hover:text-white transition-colors">3</button>
            <button className="px-3 py-1 bg-white/5 border border-white/10 rounded hover:bg-white/10 hover:text-white transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
