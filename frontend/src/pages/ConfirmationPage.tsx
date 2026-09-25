import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ConfirmationPage = () => {
  const { referenceId } = useParams<{ referenceId: string }>();

  return (
    <div className="min-h-screen bg-[#08090B] pt-32 pb-24 px-6 md:px-10 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-2xl glassmorphism rounded-2xl p-8 md:p-12 text-center border border-[#00E5FF]/30 cinematic-shadow relative overflow-hidden"
      >
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#00E5FF]/20 blur-[100px] -z-10" />

        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
          className="w-20 h-20 bg-[#00E5FF] rounded-full mx-auto flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(212,175,55,0.4)]"
        >
          <CheckCircle size={40} className="text-black" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2 tracking-tight">
          JOURNEY CONFIRMED
        </h1>
        <p className="text-white/60 mb-10 text-lg font-light">
          Your premium vehicle has been successfully reserved.
        </p>

        <div className="bg-black/40 border border-white/10 rounded-xl p-6 mb-10 max-w-sm mx-auto">
          <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">Booking Reference</p>
          <p className="text-3xl font-mono text-[#00E5FF] font-bold tracking-wider">{referenceId}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="outline" className="w-full sm:w-auto px-8 py-6 flex items-center gap-2">
              <Home size={18} />
              RETURN HOME
            </Button>
          </Link>
          <Button className="w-full sm:w-auto px-8 py-6 flex items-center gap-2">
            <FileText size={18} />
            VIEW MY BOOKING
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
