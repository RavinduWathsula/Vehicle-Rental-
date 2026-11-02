import React, { useEffect, useState } from 'react';
import { type BookingPayload, getExtras, type Extra, getPublicDrivers, type PublicDriver } from '../../../lib/api';
import { Button } from '../../ui/Button';
import { Check, Shield, Users, Baby, Map, UserCheck, ShieldCheck } from 'lucide-react';

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
  const [drivers, setDrivers] = useState<PublicDriver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [extrasRes, driversRes] = await Promise.all([
          getExtras(),
          getPublicDrivers()
        ]);
        setAvailableExtras(extrasRes || []);
        setDrivers(driversRes || []);
      } catch (err) {
        console.error('Failed to load extras or drivers', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleExtra = (id: string) => {
    const current = data.extras || [];
    const updated = current.includes(id)
      ? current.filter(e => e !== id)
      : [...current, id];
    updateData({ extras: updated });
  };

  const handleSelectDriver = (driver: PublicDriver) => {
    if (data.driverId === driver.id) {
      // Toggle off
      updateData({ driverId: null, driver: null });
    } else {
      updateData({
        driverId: driver.id,
        driver: {
          id: driver.id,
          name: driver.name,
          phone: driver.phone,
          profile_image: driver.profile_image
        }
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">Enhance Your Journey</h2>
      <p className="text-white/50 mb-6 sm:mb-8 text-xs sm:text-sm">Select optional add-ons and professional chauffeurs to customize your rental experience.</p>

      {loading ? (
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="flex-1 space-y-6 sm:space-y-8 overflow-y-auto pr-1">
          {/* Extras List */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#00E5FF] mb-3 sm:mb-4">Add-ons & Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {availableExtras.map((extra) => {
                const isSelected = (data.extras || []).includes(extra.id);
                return (
                  <div
                    key={extra.id}
                    onClick={() => toggleExtra(extra.id)}
                    className={`relative flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border cursor-pointer transition-all duration-300 ${isSelected
                        ? 'border-[#00E5FF] bg-[#00E5FF]/5 shadow-[0_0_15px_rgba(0,229,255,0.1)]'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 ${isSelected ? 'bg-[#00E5FF] text-black' : 'bg-white/10 text-white/50'
                      }`}>
                      {iconMap[extra.icon] || <Check size={20} />}
                    </div>

                    <div className="flex-1 min-w-0 pr-6">
                      <h4 className="font-bold text-white text-sm sm:text-base">{extra.name}</h4>
                      <p className="text-xs text-white/50 line-clamp-1">{extra.description}</p>
                      <span className="text-xs text-[#00E5FF] font-medium mt-1 block">
                        +LKR {Number(extra.pricePerDay || extra.price).toLocaleString()} / day
                      </span>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors shrink-0 ${isSelected ? 'border-[#00E5FF] bg-[#00E5FF]' : 'border-white/20'
                      }`}>
                      {isSelected && <Check size={12} className="text-black stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Professional Chauffeur Selection */}
          {drivers.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#00E5FF] flex items-center gap-2">
                  <UserCheck size={16} />
                  <span>Select a Professional Chauffeur (Optional)</span>
                </h3>
                {data.driverId && (
                  <button
                    onClick={() => updateData({ driverId: null, driver: null })}
                    className="text-[11px] text-red-400 hover:text-red-300 uppercase tracking-wider font-semibold"
                  >
                    Clear Chauffeur
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {drivers.map((drv) => {
                  const isSelected = data.driverId === drv.id;
                  return (
                    <div
                      key={drv.id}
                      onClick={() => handleSelectDriver(drv)}
                      className={`relative flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all duration-300 ${isSelected
                          ? 'border-[#00E5FF] bg-[#00E5FF]/10 shadow-[0_0_15px_rgba(0,229,255,0.15)] ring-1 ring-[#00E5FF]'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                    >
                      {/* Driver Profile Picture */}
                      <div className="relative shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#00E5FF] overflow-hidden bg-white/10 flex items-center justify-center shadow-md">
                          {drv.profile_image ? (
                            <img
                              src={drv.profile_image}
                              alt={drv.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-white text-base">
                              {drv.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-[#08090B]" />
                      </div>

                      {/* Driver Details */}
                      <div className="flex-1 min-w-0 pr-4">
                        <h4 className={`font-bold text-sm truncate ${isSelected ? 'text-[#00E5FF]' : 'text-white'}`}>
                          {drv.name}
                        </h4>
                        <p className="text-[11px] text-white/50 truncate">{drv.phone}</p>
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-green-400 font-semibold uppercase tracking-wider">
                          <ShieldCheck size={12} />
                          <span>Verified</span>
                        </div>
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
            </div>
          )}
        </div>
      )}

      <div className="mt-6 sm:mt-8 flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4 border-t border-white/10">
        <button onClick={prev} className="text-white/60 hover:text-white transition-colors text-xs sm:text-sm font-medium tracking-wide py-2.5 text-center">
          BACK TO VEHICLE
        </button>
        <Button onClick={next} className="w-full sm:w-auto px-6 sm:px-10">CONTINUE TO DETAILS</Button>
      </div>
    </div>
  );
};
