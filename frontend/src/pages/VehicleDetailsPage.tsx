import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { getVehicleById, type Vehicle } from '../lib/api';
import { VehicleViewer } from '../components/vehicles/VehicleViewer';
import { BookingSummary } from '../components/booking/BookingSummary';
import { 
  Users, 
  Fuel, 
  Settings, 
  Briefcase, 
  DoorOpen, 
  Calendar, 
  ArrowLeft,
  Gauge,
  Zap,
  Flame,
  Sparkles,
  Activity,
  Volume2,
  Check,
  SlidersHorizontal
} from 'lucide-react';
import { motion } from 'framer-motion';

const FLAGSHIP_SPECS: Record<string, any> = {
  'porsche': {
    acceleration: '3.0s',
    horsepower: '518 HP',
    topSpeed: '296 km/h',
    accelPercent: 92,
    hpPercent: 78,
    exhaustNote: 'High-Revving 9,000 RPM Symphony',
    soundProfile: 'Active Titanium Sport Exhaust with Dual Central Pipes',
    modes: {
      sport: 'Active Downforce Wing tilted 14°, PDK lightning 0.1s shifts',
      comfort: 'PASM active dampening softened for smooth coastal cruising',
      track: 'Full aerodynamic DRS activated, launch control standing by'
    }
  },
  'g63': {
    acceleration: '4.5s',
    horsepower: '585 HP',
    topSpeed: '240 km/h',
    accelPercent: 75,
    hpPercent: 84,
    exhaustNote: 'Deep Thunderous V8 Rumble with Dual Side-Pipes',
    soundProfile: 'Side-Exit Dual Sports Exhaust (Switchable Acoustic Flaps)',
    modes: {
      sport: 'Adaptive damping tightened, side-exhaust valves fully open',
      comfort: 'Burmester 3D audio acoustic isolation with double-glazed glass',
      track: 'Triple electronic differential locks, Low-Range gearing enabled'
    }
  },
  'm8': {
    acceleration: '3.1s',
    horsepower: '617 HP',
    topSpeed: '305 km/h',
    accelPercent: 90,
    hpPercent: 88,
    exhaustNote: 'Bavarian Twin-Turbo V8 Roar with Pop & Crackle',
    soundProfile: 'M Sport Dual Exhaust with Flap Control System',
    modes: {
      sport: 'M xDrive rear-biased AWD mode with Active M Differential',
      comfort: 'Executive lounge adaptive suspension with gesture control',
      track: 'Pure 100% RWD switchable mode with M Track cooling'
    }
  },
  'defender': {
    acceleration: '5.2s',
    horsepower: '518 HP',
    topSpeed: '240 km/h',
    accelPercent: 68,
    hpPercent: 78,
    exhaustNote: 'Throaty Supercharger Whine & V8 Bellow',
    soundProfile: 'Quad Outboard Exhaust Pipes with V8 Tuning',
    modes: {
      sport: 'Dynamic mode with active electronic air suspension lower 20mm',
      comfort: 'Configurable Terrain Response with 900mm wading depth',
      track: 'Rock crawl & deep sand dune terrain mapping active'
    }
  },
  'plaid': {
    acceleration: '1.99s',
    horsepower: '1,020 HP',
    topSpeed: '322 km/h',
    accelPercent: 99,
    hpPercent: 100,
    exhaustNote: 'Hyper-EV Sonic Jet Turbine Acoustic Wave',
    soundProfile: 'DriveX Custom Spatial Audio Experience (22 Speakers)',
    modes: {
      sport: 'Plaid Track Mode with lateral G-meter & torque distribution',
      comfort: 'Full Autopilot Assist, whisper-silent triple-pane acoustic glass',
      track: 'Cheetah Stance: battery thermal pre-conditioning & max launch'
    }
  },
  'rs7': {
    acceleration: '3.3s',
    horsepower: '621 HP',
    topSpeed: '305 km/h',
    accelPercent: 88,
    hpPercent: 89,
    exhaustNote: 'RS Sport Dual Oval Exhaust Growl',
    soundProfile: 'RS Dynamic Exhaust with Acoustic Tuning',
    modes: {
      sport: 'RS1 / RS2 custom steering wheel buttons for instant surge',
      comfort: 'Dynamic all-wheel steering and cylinder-on-demand efficiency',
      track: 'Quattro sport differential, carbon-ceramic 440mm brakes'
    }
  }
};

const getVehicleTelemetry = (v: Vehicle) => {
  const query = `${v.brand || ''} ${v.model || ''} ${v.name || ''}`.toLowerCase();
  for (const [key, val] of Object.entries(FLAGSHIP_SPECS)) {
    if (query.includes(key)) {
      return val;
    }
  }
  
  const isElectric = (v.fuel_type || v.fuel || '').toLowerCase() === 'electric';
  const isSuv = (v.category || '').toLowerCase().includes('suv');

  return {
    acceleration: isElectric ? '2.1s' : (isSuv ? '6.8s' : '4.8s'),
    horsepower: isElectric ? '670 HP' : (isSuv ? '340 HP' : '385 HP'),
    topSpeed: isElectric ? '250 km/h' : (isSuv ? '220 km/h' : '260 km/h'),
    accelPercent: isElectric ? 95 : 65,
    hpPercent: isElectric ? 85 : 60,
    exhaustNote: isElectric ? 'Whisper-Silent EV Jet Sound' : 'Tuned Performance Sound System',
    soundProfile: 'DriveX Premium Acoustic Sound Package',
    modes: {
      sport: 'Enhanced throttle response and sports transmission shift points',
      comfort: 'Optimized suspension dampening and low-noise cruising',
      track: 'Maximum power delivery and stability control assist'
    }
  };
};

export const VehicleDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [drivingMode, setDrivingMode] = useState<'sport' | 'comfort' | 'track'>('sport');

  // Extract dates from URL if the user came from the search page
  const [pickupDate, setPickupDate] = useState(searchParams.get('pickupDate') || '');
  const [returnDate, setReturnDate] = useState(searchParams.get('returnDate') || '');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const fetchVehicle = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const data = await getVehicleById(id);
        setVehicle(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load vehicle details');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040508] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00E5FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-[#040508] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-widest italic mb-4">{error || 'Vehicle not found'}</h1>
        <button 
          onClick={() => window.history.back()}
          className="text-[#00E5FF] hover:text-white transition-colors uppercase tracking-widest text-sm font-bold border-b border-[#00E5FF] hover:border-white pb-1"
        >
          Return to Fleet
        </button>
      </div>
    );
  }

  const telemetry = getVehicleTelemetry(vehicle);

  return (
    <div className="min-h-screen bg-[#040508]">
      <div className="flex flex-col lg:flex-row">
        
        {/* Left Side: 3D Viewer or Image Gallery */}
        <div className="w-full lg:w-3/5 lg:sticky lg:top-0 lg:h-screen z-10 border-b lg:border-b-0 lg:border-r border-white/5">
          <VehicleViewer vehicle={vehicle} />
        </div>

        {/* Right Side: Specifications, Telemetry, and Booking */}
        <div className="w-full lg:w-2/5 min-h-screen pt-8 sm:pt-12 lg:pt-32 pb-24 sm:pb-32 px-4 sm:px-6 md:px-12 z-20 text-white">
          
          {/* Navigation Back link */}
          <div className="mb-6">
            <Link 
              to="/vehicles" 
              className="inline-flex items-center gap-2 text-xs font-bold text-white/60 hover:text-[#00E5FF] uppercase tracking-widest transition-colors"
            >
              <ArrowLeft size={14} /> Back to Fleet Catalog
            </Link>
          </div>

          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <span className="px-3 py-1 bg-[#00E5FF] text-black text-[10px] font-bold tracking-widest uppercase rounded-sm">
                {vehicle.category}
              </span>
              <span className="text-white/40 text-xs tracking-widest uppercase">
                {vehicle.year}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-2 leading-tight">
              {vehicle.brand} <span className="text-[#00E5FF]">{vehicle.name || vehicle.model}</span>
            </h1>
          </motion.div>

          <div className="my-6 sm:my-8 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

          {/* 1. PERFORMANCE TELEMETRY HUD */}
          <div className="mb-8 p-5 bg-[#08090B] rounded-xl border border-white/10 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00E5FF] block border-b border-white/10 pb-2">
              Performance Telemetry & Output
            </span>

            {/* 0-100 km/h Sprint */}
            <div>
              <div className="flex justify-between items-baseline mb-1 text-xs">
                <span className="text-gray-400 flex items-center gap-1.5 uppercase font-medium">
                  <Zap size={13} className="text-[#00E5FF]" /> 0-100 km/h Sprint
                </span>
                <span className="text-base font-black text-white font-mono">{telemetry.acceleration}</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${telemetry.accelPercent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-[#00E5FF] rounded-full"
                />
              </div>
            </div>

            {/* Horsepower */}
            <div>
              <div className="flex justify-between items-baseline mb-1 text-xs">
                <span className="text-gray-400 flex items-center gap-1.5 uppercase font-medium">
                  <Gauge size={13} className="text-amber-400" /> Peak Output
                </span>
                <span className="text-base font-black text-white font-mono">{telemetry.horsepower}</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${telemetry.hpPercent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                />
              </div>
            </div>

            {/* Velocity & Sound */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
              <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Top Velocity</span>
                <span className="text-sm font-black text-white font-mono">{telemetry.topSpeed}</span>
              </div>
              <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Exhaust Note</span>
                <span className="text-xs font-bold text-white truncate block flex items-center gap-1">
                  <Volume2 size={12} className="text-[#00E5FF] shrink-0" /> {telemetry.exhaustNote}
                </span>
              </div>
            </div>
          </div>

          {/* 2. DRIVING MODE SELECTOR */}
          <div className="mb-8 p-5 bg-[#08090B] rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                <SlidersHorizontal size={12} /> Test Driving Dynamics
              </span>
              <span className="text-[10px] text-[#00E5FF] font-mono uppercase tracking-wider">
                {drivingMode.toUpperCase()} ENGAGED
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setDrivingMode('sport')}
                className={`py-2 px-3 rounded-md text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                  drivingMode === 'sport'
                    ? 'bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Flame size={13} /> Sport+
              </button>
              <button
                onClick={() => setDrivingMode('comfort')}
                className={`py-2 px-3 rounded-md text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                  drivingMode === 'comfort'
                    ? 'bg-gradient-to-r from-cyan-600 to-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Sparkles size={13} /> Comfort
              </button>
              <button
                onClick={() => setDrivingMode('track')}
                className={`py-2 px-3 rounded-md text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                  drivingMode === 'track'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Activity size={13} /> Track
              </button>
            </div>

            <p className="text-xs text-gray-300 mt-3 bg-white/[0.03] p-2.5 rounded border border-white/5 flex items-center gap-2">
              <Check size={14} className="text-[#00E5FF] shrink-0" />
              <span>{telemetry.modes[drivingMode]}</span>
            </p>
          </div>

          {/* 3. TECHNICAL SPECIFICATIONS GRID */}
          <div className="mb-10 sm:mb-12">
            <h2 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Technical Specifications</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              
              <div className="flex flex-col p-3 sm:p-4 bg-[#08090B] rounded-lg border border-white/5">
                <Users className="text-[#00E5FF] mb-2 sm:mb-3" size={18} />
                <span className="text-white text-base sm:text-lg font-bold">{vehicle.seats}</span>
                <span className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-widest mt-1">Seats</span>
              </div>
              
              <div className="flex flex-col p-3 sm:p-4 bg-[#08090B] rounded-lg border border-white/5">
                <Settings className="text-[#00E5FF] mb-2 sm:mb-3" size={18} />
                <span className="text-white text-base sm:text-lg font-bold">{vehicle.transmission}</span>
                <span className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-widest mt-1">Transmission</span>
              </div>

              <div className="flex flex-col p-3 sm:p-4 bg-[#08090B] rounded-lg border border-white/5">
                <Fuel className="text-[#00E5FF] mb-2 sm:mb-3" size={18} />
                <span className="text-white text-base sm:text-lg font-bold truncate">{vehicle.fuel || vehicle.fuel_type}</span>
                <span className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-widest mt-1">Fuel</span>
              </div>

              <div className="flex flex-col p-3 sm:p-4 bg-[#08090B] rounded-lg border border-white/5">
                <DoorOpen className="text-[#00E5FF] mb-2 sm:mb-3" size={18} />
                <span className="text-white text-base sm:text-lg font-bold">{vehicle.doors || 4}</span>
                <span className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-widest mt-1">Doors</span>
              </div>

              <div className="flex flex-col p-3 sm:p-4 bg-[#08090B] rounded-lg border border-white/5">
                <Briefcase className="text-[#00E5FF] mb-2 sm:mb-3" size={18} />
                <span className="text-white text-base sm:text-lg font-bold">{vehicle.luggage || 2}</span>
                <span className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-widest mt-1">Luggage Bags</span>
              </div>

              <div className="flex flex-col p-3 sm:p-4 bg-[#08090B] rounded-lg border border-white/5">
                <Calendar className="text-[#00E5FF] mb-2 sm:mb-3" size={18} />
                <span className="text-white text-base sm:text-lg font-bold">{vehicle.year}</span>
                <span className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-widest mt-1">Model Year</span>
              </div>

            </div>
          </div>

          {/* Features List */}
          {vehicle.features && vehicle.features.length > 0 && (
            <div className="mb-10 sm:mb-12">
              <h2 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Premium Equipment</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-6">
                {vehicle.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 sm:gap-3 text-white/80 text-xs sm:text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] mt-1.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Booking Summary Section */}
          <div className="mt-8">
            <BookingSummary 
              vehicle={vehicle} 
              pickupDate={pickupDate}
              setPickupDate={setPickupDate}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
            />
          </div>

        </div>
      </div>
    </div>
  );
};
