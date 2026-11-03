import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Car, 
  User, 
  Phone, 
  ShieldCheck, 
  Copy, 
  Check, 
  Printer, 
  CheckCircle2, 
  XCircle, 
  AlertCircle 
} from 'lucide-react';
import type { CustomerBooking } from '../../lib/api';

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: CustomerBooking | null;
  onCancelRequest?: (booking: CustomerBooking) => void;
}

export const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  isOpen,
  onClose,
  booking,
  onCancelRequest,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !booking) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(booking.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active Journey
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            <Calendar size={12} />
            Upcoming
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <CheckCircle2 size={12} />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/15 text-red-400 border border-red-500/30">
            <XCircle size={12} />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-500/15 text-gray-400 border border-gray-500/30">
            {status}
          </span>
        );
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-2xl bg-[var(--sidebar)] border border-[var(--border)] rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header Image */}
          <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black">
            <img
              src={booking.vehicle.imageUrl}
              alt={booking.vehicle.name}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--sidebar)] via-[var(--sidebar)]/40 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition-colors z-20 cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Vehicle Details Overlay */}
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-bold mb-1">
                  {booking.vehicle.brand}
                </p>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {booking.vehicle.name}
                </h2>
              </div>
              <div>{getStatusBadge(booking.status)}</div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Booking Reference Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[var(--card)] border border-[var(--border)] rounded-xl">
              <div>
                <span className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider block mb-0.5">
                  Booking Reference
                </span>
                <span className="text-sm font-mono font-bold text-[var(--text)] tracking-wider">
                  {booking.id}
                </span>
              </div>
              <button
                onClick={handleCopyId}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--sidebar)] hover:bg-[var(--card-hover)] text-[var(--text)] border border-[var(--border)] transition-colors cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy Ref'}
              </button>
            </div>

            {/* Schedule & Route Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pickup */}
              <div className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                  <MapPin size={14} /> Pickup Point
                </div>
                <p className="text-base font-bold text-[var(--text)]">
                  {booking.pickupLocation || 'Downtown Headquarters'}
                </p>
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] pt-1 border-t border-[var(--border)]/50">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-[var(--accent)]" />
                    {new Date(booking.pickupDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-[var(--accent)]" />
                    {booking.pickupTime}
                  </span>
                </div>
              </div>

              {/* Return */}
              <div className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                  <MapPin size={14} /> Return Point
                </div>
                <p className="text-base font-bold text-[var(--text)]">
                  {booking.returnLocation || 'Downtown Headquarters'}
                </p>
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] pt-1 border-t border-[var(--border)]/50">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-[var(--accent)]" />
                    {new Date(booking.returnDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-[var(--accent)]" />
                    {booking.returnTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Assigned Driver (if any) */}
            {booking.driver && (
              <div className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[var(--sidebar)] border border-[var(--accent)]/30 shrink-0 flex items-center justify-center">
                    {booking.driver.profileImage ? (
                      <img src={booking.driver.profileImage} alt={booking.driver.name} className="w-full h-full object-cover" />
                    ) : (
                      <User size={22} className="text-[var(--accent)]" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent)]">
                      Private Chauffeur
                    </span>
                    <h4 className="text-sm font-bold text-[var(--text)]">{booking.driver.name}</h4>
                    {booking.driver.phone && (
                      <p className="text-xs text-[var(--text-muted)] font-mono">{booking.driver.phone}</p>
                    )}
                  </div>
                </div>
                {booking.driver.phone && (
                  <a
                    href={`tel:${booking.driver.phone}`}
                    className="p-2.5 rounded-xl bg-[var(--accent)]/10 hover:bg-[var(--accent)] text-[var(--accent)] hover:text-white transition-colors"
                    title="Call Chauffeur"
                  >
                    <Phone size={18} />
                  </a>
                )}
              </div>
            )}

            {/* Price & Protection Details */}
            <div className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-3">
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-400" /> Comprehensive Fleet Insurance
                </span>
                <span className="font-semibold text-emerald-400">Included</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>VIP 24/7 Roadside Assistance</span>
                <span className="font-semibold text-emerald-400">Included</span>
              </div>
              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold">
                    Total Amount Paid / Due
                  </span>
                  <p className="text-2xl font-black text-[var(--accent)]">
                    LKR {booking.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[var(--sidebar)] hover:bg-[var(--card-hover)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text)] transition-colors cursor-pointer"
                >
                  <Printer size={15} /> Print Invoice
                </button>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-end gap-3 pt-2">
              {booking.status === 'upcoming' && onCancelRequest && (
                <button
                  onClick={() => {
                    onClose();
                    onCancelRequest(booking);
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-red-500 hover:bg-red-500/10 border border-red-500/30 transition-colors cursor-pointer"
                >
                  Cancel Booking
                </button>
              )}
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] transition-colors cursor-pointer shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

