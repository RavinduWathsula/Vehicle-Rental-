import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  ShieldCheck, 
  Copy, 
  Check, 
  Printer, 
  CheckCircle2, 
  XCircle 
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            <Calendar size={11} />
            Upcoming
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <CheckCircle2 size={11} />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-500/15 text-red-400 border border-red-500/30">
            <XCircle size={11} />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gray-500/15 text-gray-400 border border-gray-500/30">
            {status}
          </span>
        );
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window with Maximum Height and Flex Column Layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-xl md:max-w-2xl max-h-[90vh] flex flex-col bg-[var(--sidebar)] border border-[var(--border)] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header Image & Overview - Compact & Sleek */}
          <div className="relative h-32 sm:h-40 w-full overflow-hidden bg-black shrink-0">
            <img
              src={booking.vehicle.imageUrl}
              alt={booking.vehicle.name}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--sidebar)] via-[var(--sidebar)]/50 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition-colors z-20 cursor-pointer shadow-md"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* Vehicle Details Overlay */}
            <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-widest text-[var(--accent)] font-bold mb-0.5 truncate">
                  {booking.vehicle.brand}
                </p>
                <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight truncate leading-tight">
                  {booking.vehicle.name}
                </h2>
              </div>
              <div className="shrink-0">{getStatusBadge(booking.status)}</div>
            </div>
          </div>

          {/* Scrollable Modal Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-3.5">
            
            {/* Booking Reference Bar */}
            <div className="flex items-center justify-between gap-3 p-3 bg-[var(--card)] border border-[var(--border)] rounded-xl">
              <div>
                <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider block">
                  Booking Reference
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-[var(--text)] tracking-wider">
                  {booking.id}
                </span>
              </div>
              <button
                onClick={handleCopyId}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--sidebar)] hover:bg-[var(--card-hover)] text-[var(--text)] border border-[var(--border)] transition-colors cursor-pointer"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                {copied ? 'Copied' : 'Copy Ref'}
              </button>
            </div>

            {/* Schedule & Route Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {/* Pickup */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-[var(--card)] border border-[var(--border)] space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
                  <MapPin size={13} /> Pickup Point
                </div>
                <p className="text-xs sm:text-sm font-bold text-[var(--text)] truncate">
                  {booking.pickupLocation || 'Downtown Headquarters'}
                </p>
                <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pt-1.5 border-t border-[var(--border)]/50">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-[var(--accent)]" />
                    {new Date(booking.pickupDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1 font-mono font-medium">
                    <Clock size={12} className="text-[var(--accent)]" />
                    {booking.pickupTime}
                  </span>
                </div>
              </div>

              {/* Return */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-[var(--card)] border border-[var(--border)] space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
                  <MapPin size={13} /> Return Point
                </div>
                <p className="text-xs sm:text-sm font-bold text-[var(--text)] truncate">
                  {booking.returnLocation || 'Downtown Headquarters'}
                </p>
                <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pt-1.5 border-t border-[var(--border)]/50">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-[var(--accent)]" />
                    {new Date(booking.returnDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1 font-mono font-medium">
                    <Clock size={12} className="text-[var(--accent)]" />
                    {booking.returnTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Assigned Driver (if any) */}
            {booking.driver && (
              <div className="p-3 sm:p-3.5 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-[var(--sidebar)] border border-[var(--accent)]/30 shrink-0 flex items-center justify-center">
                    {booking.driver.profileImage ? (
                      <img src={booking.driver.profileImage} alt={booking.driver.name} className="w-full h-full object-cover" />
                    ) : (
                      <User size={18} className="text-[var(--accent)]" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[var(--accent)] block">
                      Private Chauffeur
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[var(--text)] truncate">{booking.driver.name}</h4>
                    {booking.driver.phone && (
                      <p className="text-[11px] text-[var(--text-muted)] font-mono">{booking.driver.phone}</p>
                    )}
                  </div>
                </div>
                {booking.driver.phone && (
                  <a
                    href={`tel:${booking.driver.phone}`}
                    className="p-2 sm:p-2.5 rounded-xl bg-[var(--accent)]/10 hover:bg-[var(--accent)] text-[var(--accent)] hover:text-white transition-colors shrink-0"
                    title="Call Chauffeur"
                  >
                    <Phone size={15} />
                  </a>
                )}
              </div>
            )}

            {/* Price & Protection Details */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-[var(--card)] border border-[var(--border)] space-y-2">
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-emerald-400" /> Comprehensive Fleet Insurance
                </span>
                <span className="font-semibold text-emerald-400">Included</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>VIP 24/7 Roadside Assistance</span>
                <span className="font-semibold text-emerald-400">Included</span>
              </div>
              <div className="pt-2.5 border-t border-[var(--border)] flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold block">
                    Total Amount Paid / Due
                  </span>
                  <p className="text-lg sm:text-2xl font-black text-[var(--accent)]">
                    LKR {booking.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--sidebar)] hover:bg-[var(--card-hover)] border border-[var(--border)] rounded-lg text-xs font-bold text-[var(--text)] transition-colors cursor-pointer shrink-0"
                >
                  <Printer size={13} /> Print Invoice
                </button>
              </div>
            </div>

          </div>

          {/* Pinned Bottom Actions Bar - Always 100% visible, never cut off! */}
          <div className="p-3 sm:p-4 border-t border-[var(--border)] bg-[var(--sidebar)]/95 backdrop-blur-md flex items-center justify-between gap-3 shrink-0">
            <div className="text-xs text-[var(--text-muted)]">
              Status: <span className="text-[var(--text)] font-bold uppercase">{booking.status}</span>
            </div>

            <div className="flex items-center gap-2">
              {booking.status === 'upcoming' && onCancelRequest && (
                <button
                  onClick={() => {
                    onClose();
                    onCancelRequest(booking);
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-red-500 hover:bg-red-500/10 border border-red-500/30 transition-colors cursor-pointer"
                >
                  Cancel Booking
                </button>
              )}
              <button
                onClick={onClose}
                className="px-5 sm:px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] transition-colors cursor-pointer shadow-md"
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
