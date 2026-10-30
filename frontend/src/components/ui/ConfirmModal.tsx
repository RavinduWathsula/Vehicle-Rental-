import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X, RefreshCw } from 'lucide-react';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  item?: {
    title?: string;
    subtitle?: string;
    badge?: string;
    imageUrl?: string;
  } | null;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Deletion',
  message = 'Are you sure you want to proceed? This action cannot be undone.',
  confirmText = 'Delete Permanently',
  cancelText = 'Cancel',
  isLoading = false,
  item = null,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Animated Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={() => !isLoading && onClose()}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md bg-drivex-sidebar border border-red-500/30 rounded-2xl shadow-[0_20px_60px_-15px_rgba(239,68,68,0.25)] overflow-hidden p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Red Glow on Top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-red-500/15 blur-2xl pointer-events-none rounded-full" />

            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={isLoading}
              className="absolute top-4 right-4 p-1.5 text-drivex-text-muted hover:text-drivex-text rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50"
              title="Close"
            >
              <X size={18} />
            </button>

            {/* Header with Warning Icon */}
            <div className="flex flex-col items-center text-center pt-2">
              <div className="relative mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                  <AlertTriangle size={30} className="animate-pulse" />
                </div>
                <div className="absolute -inset-1 rounded-2xl border border-red-500/20 blur-sm pointer-events-none" />
              </div>

              <h3 className="text-xl font-black text-drivex-text tracking-wide uppercase font-heading">
                {title}
              </h3>
              <p className="text-xs text-drivex-text-muted mt-2 max-w-sm leading-relaxed">
                {message}
              </p>
            </div>

            {/* Item Preview Card (If provided) */}
            {item && (
              <div className="mt-5 p-3.5 bg-drivex-card border border-drivex-border/80 rounded-xl flex items-center gap-3.5 shadow-inner">
                {item.imageUrl ? (
                  <div className="w-14 h-12 rounded-lg overflow-hidden shrink-0 border border-drivex-border bg-black/40">
                    <img
                      src={item.imageUrl}
                      alt={item.title || 'Item'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 text-red-400 font-bold text-sm">
                    <Trash2 size={20} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-drivex-text truncate">
                      {item.title}
                    </p>
                    {item.badge && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-drivex-sidebar text-drivex-accent border border-drivex-accent/30 shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.subtitle && (
                    <p className="text-xs text-drivex-text-muted truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Warning Note */}
            <div className="mt-4 px-3 py-2 rounded-lg bg-red-500/5 border border-red-500/15 flex items-center gap-2 text-[11px] text-red-400/90">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 animate-ping" />
              <span>This record will be permanently deleted from the database.</span>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="w-1/2 py-2.5 px-4 rounded-lg border border-drivex-border text-xs font-bold uppercase tracking-wider text-drivex-text hover:bg-white/5 transition-all disabled:opacity-50"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className="w-1/2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 group"
              >
                {isLoading ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={14} className="group-hover:scale-110 transition-transform" />
                    <span>{confirmText}</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

