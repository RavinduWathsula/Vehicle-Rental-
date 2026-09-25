import React, { useEffect, useState } from 'react';
import { type BookingPayload, getExtras, type Extra } from '../../../lib/api';
import { Button } from '../../ui/Button';
import { Check, Shield, Users, Baby, Map } from 'lucide-react';

interface Props {
  data: Partial<BookingPayload>;
  updateData: (d: Partial<BookingPayload>) => void;
  prev: () => void;
  next: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={24} />,
  users: <Users size={24} />,
  baby: <Baby size={24} />,
  map: <Map size={24} />,
};

export const StepExtras: React.FC<Props> = ({ data, updateData, prev, next }) => {
  const [availableExtras, setAvailableExtras] = useState<Extra[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExtras = async () => {
      const results = await getExtras();
      setAvailableExtras(results);
      setLoading(false);
    };
    fetchExtras();
  }, []);

  const toggleExtra = (id: string) => {
    const current = data.extras || [];
    const updated = current.includes(id) 
      ? current.filter(e => e !== id) 
      : [...current, id];
    updateData({ extras: updated });
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-heading font-bold text-white mb-2">Enhance Your Journey</h2>
      <p className="text-white/50 mb-8">Select optional add-ons to customize your rental experience.</p>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableExtras.map((extra) => {
            const isSelected = (data.extras || []).includes(extra.id);
            return (
              <div 
                key={extra.id}
                onClick={() => toggleExtra(extra.id)}
                className={`relative flex items-center gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'border-[#00E5FF] bg-[#00E5FF]/5 shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-[#00E5FF] text-black' : 'bg-white/10 text-white/50'
                }`}>
                  {iconMap[extra.icon] || <Check size={24} />}
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-bold ${isSelected ? 'text-[#00E5FF]' : 'text-white'}`}>
                    {extra.name}
                  </h4>
                  <p className="text-xs text-white/50 mt-1">{extra.description}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className={`block font-bold ${isSelected ? 'text-[#00E5FF]' : 'text-white'}`}>
                    +${extra.pricePerDay}
                  </span>
                  <span className="text-[10px] text-white/50 uppercase">/ day</span>
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <Check size={16} className="text-[#00E5FF]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-10 flex justify-between items-center">
        <button onClick={prev} className="text-white/60 hover:text-white transition-colors text-sm font-medium tracking-wide">
          BACK TO VEHICLE
        </button>
        <Button onClick={next} className="px-10">CONTINUE TO DETAILS</Button>
      </div>
    </div>
  );
};
