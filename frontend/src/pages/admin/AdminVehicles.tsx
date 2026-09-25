import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CarFront, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const mockVehicles = [
  { id: 'V-001', name: 'Porsche 911 GT3 RS', category: 'Sports', price: '$850/day', status: 'Available', trips: 42, rating: 4.9 },
  { id: 'V-002', name: 'Mercedes G63 AMG', category: 'Luxury SUV', price: '$650/day', status: 'Rented', trips: 128, rating: 4.8 },
  { id: 'V-003', name: 'Lamborghini Urus', category: 'Luxury SUV', price: '$950/day', status: 'Maintenance', trips: 36, rating: 5.0 },
  { id: 'V-004', name: 'Range Rover Sport', category: 'SUV', price: '$450/day', status: 'Available', trips: 215, rating: 4.7 },
  { id: 'V-005', name: 'Ferrari F8 Tributo', category: 'Supercar', price: '$1200/day', status: 'Available', trips: 18, rating: 5.0 },
  { id: 'V-006', name: 'Rolls Royce Phantom', category: 'Ultra Luxury', price: '$1500/day', status: 'Rented', trips: 24, rating: 4.9 },
];

export const AdminVehicles = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white italic uppercase tracking-wider mb-2">Fleet Management</h1>
          <p className="text-gray-400 text-sm">Manage your vehicles, track their status, and add new inventory.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#00E5FF] text-black font-bold uppercase tracking-widest text-xs hover:bg-white hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all rounded-sm shrink-0">
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
              placeholder="Search vehicles by name or ID..."
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
              <option value="all">All Categories</option>
              <option value="sports">Sports</option>
              <option value="suv">SUV</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/40 border-b border-white/10">
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Vehicle Details</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Price/Day</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Stats</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockVehicles.map((vehicle, i) => (
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
                        <p className="text-sm font-bold text-white mb-0.5">{vehicle.name}</p>
                        <p className="text-xs text-gray-500">{vehicle.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-300">
                    <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs">
                      {vehicle.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-white">{vehicle.price}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      vehicle.status === 'Available' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      vehicle.status === 'Rented' ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20' :
                      'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    }`}>
                      {vehicle.status === 'Available' && <CheckCircle2 size={12} />}
                      {vehicle.status === 'Rented' && <CarFront size={12} />}
                      {vehicle.status === 'Maintenance' && <XCircle size={12} />}
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-400"><strong className="text-white">{vehicle.trips}</strong> trips</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <strong className="text-yellow-400">{vehicle.rating}</strong> ★
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 rounded-lg transition-colors" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Delete">
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
          <p>Showing 1 to 6 of 245 entries</p>
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
