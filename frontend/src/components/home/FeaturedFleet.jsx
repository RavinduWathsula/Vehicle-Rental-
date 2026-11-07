import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Gauge, 
  Zap, 
  Shield, 
  Sparkles, 
  Fuel, 
  Users, 
  Briefcase, 
  ArrowRight, 
  Check, 
  Eye, 
  Lock, 
  Activity, 
  Flame, 
  Volume2, 
  Info, 
  X,
  ChevronRight,
  Radio,
  SlidersHorizontal
} from 'lucide-react';
import { searchVehicles } from '../../lib/api';
import { FALLBACK_FLEET } from '../../lib/fleetData';

// Handcrafted telemetry profiles for the studio showcase
const FLAGSHIP_SPECS = {
  'porsche-gt3': {
    acceleration: '3.0s',
    horsepower: '518 HP',
    topSpeed: '296 km/h',
    accelPercent: 92,
    hpPercent: 78,
    powertrain: '4.0L Naturally Aspirated Boxer-6',
    exhaustNote: 'High-Revving 9,000 RPM Symphony',
    badge: 'Track Weapon',
    soundProfile: 'Active Titanium Sport Exhaust with Dual Central Pipes',
    modes: {
      sport: 'Active Downforce Wing tilted 14°, PDK lightning 0.1s shifts',
      comfort: 'PASM active dampening softened for smooth coastal cruising',
      track: 'Full aerodynamic DRS activated, launch control ready for telemetry'
    },
    features: ['Active Aerodynamic DRS Wing', 'PCCB Carbon Ceramic Brakes', 'Alcantara Clubsport Cockpit', 'Michelin Pilot Sport Cup 2 R']
  },
  'mercedes-g63': {
    acceleration: '4.5s',
    horsepower: '585 HP',
    topSpeed: '240 km/h',
    accelPercent: 75,
    hpPercent: 84,
    powertrain: 'Handcrafted 4.0L V8 BiTurbo',
    exhaustNote: 'Deep Thunderous V8 Rumble with Dual Side-Pipes',
    badge: 'Luxury Off-Road Icon',
    soundProfile: 'Side-Exit Dual Sports Exhaust (Switchable Acoustic Flaps)',
    modes: {
      sport: 'Adaptive damping tightened, side-exhaust valves fully open',
      comfort: 'Burmester 3D audio acoustic isolation with double-glazed glass',
      track: 'Triple electronic differential locks, Low-Range gearing enabled'
    },
    features: ['Triple Differential Locks', 'Diamond-Stitched Nappa Leather', 'Burmester 3D Surround Audio', 'Side-Exit Sport Exhaust']
  },
  'bmw-m8': {
    acceleration: '3.1s',
    horsepower: '617 HP',
    topSpeed: '305 km/h',
    accelPercent: 90,
    hpPercent: 88,
    powertrain: '4.4L TwinPower Turbo V8 (617 HP)',
    exhaustNote: 'Bavarian Twin-Turbo V8 Roar with Pop & Crackle',
    badge: 'Executive Super-GT',
    soundProfile: 'M Sport Dual Exhaust with Flap Control System',
    modes: {
      sport: 'M xDrive rear-biased AWD mode with Active M Differential',
      comfort: 'Executive lounge adaptive suspension with gesture control',
      track: 'Pure 100% RWD switchable mode with M Track cooling'
    },
    features: ['Switchable M xDrive (RWD/AWD)', 'Carbon-Fiber Roof & Diffuser', 'Color Head-Up Track Display', 'BMW Laserlight System']
  },
  'defender-110': {
    acceleration: '5.2s',
    horsepower: '518 HP',
    topSpeed: '240 km/h',
    accelPercent: 68,
    hpPercent: 78,
    powertrain: '5.0L Supercharged V8',
    exhaustNote: 'Throaty Supercharger Whine & V8 Bellow',
    badge: 'Expedition Beast',
    soundProfile: 'Quad Outboard Exhaust Pipes with V8 Tuning',
    modes: {
      sport: 'Dynamic mode with active electronic air suspension lower 20mm',
      comfort: 'Configurable Terrain Response with 900mm wading depth',
      track: 'Rock crawl & deep sand dune terrain mapping active'
    },
    features: ['Terrain Response 2', 'Electronic Air Suspension', '900mm Water Wading', '7-Seat Luxury Config']
  },
  'tesla-plaid': {
    acceleration: '1.99s',
    horsepower: '1,020 HP',
    topSpeed: '322 km/h',
    accelPercent: 99,
    hpPercent: 100,
    powertrain: 'Tri-Motor All-Wheel Drive (Carbon Sleeved Rotors)',
    exhaustNote: 'Hyper-EV Sonic Jet Turbine Acoustic Wave',
    badge: 'Hyper-EV Accelerator',
    soundProfile: 'DriveX Custom Spatial Audio Experience (22 Speakers)',
    modes: {
      sport: 'Plaid Track Mode with lateral G-meter & torque distribution',
      comfort: 'Full Autopilot Assist, whisper-silent triple-pane acoustic glass',
      track: 'Cheetah Stance: battery thermal pre-conditioning & max launch'
    },
    features: ['0-100 km/h in 1.99s', 'Yoke Steering Cockpit', '17" Cinematic Gaming Display', 'Tri-Motor Vectoring']
  },
  'audi-rs7': {
    acceleration: '3.3s',
    horsepower: '621 HP',
    topSpeed: '305 km/h',
    accelPercent: 88,
    hpPercent: 89,
    powertrain: '4.0L TFSI Twin-Turbo V8 with 48V MHEV',
    exhaustNote: 'RS Sport Dual Oval Exhaust Growl',
    badge: 'Executive Sportback',
    soundProfile: 'RS Dynamic Exhaust with Acoustic Tuning',
    modes: {
      sport: 'RS1 / RS2 custom steering wheel buttons for instant surge',
      comfort: 'Dynamic all-wheel steering and cylinder-on-demand efficiency',
      track: 'Quattro sport differential, carbon-ceramic 440mm brakes'
    },
    features: ['Quattro All-Wheel Drive', 'Dynamic All-Wheel Steering', 'Matrix LED with Laser Light', 'Bang & Olufsen 3D Sound']
  }
};

const getVehicleSpecs = (v) => {
  const slug = v.slug || v.id;
  if (FLAGSHIP_SPECS[slug]) return FLAGSHIP_SPECS[slug];
  
  const isElectric = (v.fuel_type || v.fuel || '').toLowerCase() === 'electric';
  const isSuv = (v.category_name || v.category || '').toLowerCase().includes('suv');

  return {
    acceleration: isElectric ? '2.1s' : (isSuv ? '6.8s' : '4.8s'),
    horsepower: isElectric ? '670 HP' : (isSuv ? '340 HP' : '385 HP'),
    topSpeed: isElectric ? '250 km/h' : (isSuv ? '220 km/h' : '260 km/h'),
    accelPercent: isElectric ? 95 : 65,
    hpPercent: isElectric ? 85 : 60,
    powertrain: `${v.transmission || 'Automatic'} • ${v.fuel || v.fuel_type || 'Petrol'} Powertrain`,
    exhaustNote: isElectric ? 'Whisper-Silent EV Jet Sound' : 'Tuned Performance Sound System',
    badge: `${v.category_name || v.category || 'Luxury'} Class`,
    soundProfile: 'DriveX Premium Acoustic Sound Package',
    modes: {
      sport: 'Enhanced throttle response and sports transmission shift points',
      comfort: 'Optimized suspension dampening and low-noise cruising',
      track: 'Maximum power delivery and stability control assist'
    },
    features: ['Touchscreen Infotainment', 'Apple CarPlay & Android Auto', 'Reverse Camera & Parking Assist', 'Dual-Zone Climate Control']
  };
};

const CATEGORIES = [
  { id: 'all', label: 'All Fleet' },
  { id: 'sports', label: 'Sports & Supercars' },
  { id: 'suv', label: 'Luxury SUVs & 4x4' },
  { id: 'luxury', label: 'Executive Sedans' },
  { id: 'electric', label: 'Electric & Hybrid' },
];

const FeaturedFleet = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [drivingMode, setDrivingMode] = useState('sport');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [inspectVehicle, setInspectVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const data = await searchVehicles({});
        if (data && data.length >= 6) {
          setVehicles(data);
          setSelectedVehicle(data[0]);
        } else {
          // Merge with FALLBACK_FLEET so full 14-vehicle fleet is available
          const merged = (data && data.length > 0) ? [...data] : [];
          FALLBACK_FLEET.forEach(f => {
            if (!merged.some(m => String(m.id) === String(f.id) || m.slug === f.slug)) {
              merged.push({
                ...f,
                name: `${f.brand} ${f.model}`,
                imageUrl: f.primary_image || f.imageUrl,
                image_url: f.primary_image || f.imageUrl,
                pricePerDay: f.daily_price || f.pricePerDay
              });
            }
          });
          setVehicles(merged);
          setSelectedVehicle(merged[0]);
        }
      } catch (err) {
        console.warn('Using fallback fleet for studio showcase:', err);
        setVehicles(FALLBACK_FLEET);
        setSelectedVehicle(FALLBACK_FLEET[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchFleet();
  }, []);

  const handleBookVehicle = (vehicleId) => {
    const isAuth = Boolean(localStorage.getItem('drivex_token') || localStorage.getItem('drivex_user'));
    if (!isAuth) {
      navigate('/register', { 
        state: { message: 'Registration required: Please create an account or sign in to reserve this vehicle.' } 
      });
    } else {
      navigate(`/booking/${vehicleId}`);
    }
  };

  if (loading || vehicles.length === 0) {
    return (
      <section id="fleet" className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-[#00E5FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-sm tracking-widest uppercase">Initializing Fleet Studio...</p>
      </section>
    );
  }

  // Flagships for the top interactive switcher ribbon
  const flagships = vehicles.slice(0, 6);
  const currentStudioVehicle = selectedVehicle || flagships[0];
  const studioSpecs = getVehicleSpecs(currentStudioVehicle);
  const rawStudioPrice = Number(currentStudioVehicle.pricePerDay || currentStudioVehicle.daily_price || currentStudioVehicle.price_per_day || 0);
  const studioPriceLKR = rawStudioPrice < 1000 ? rawStudioPrice * 300 : rawStudioPrice;

  // Filtered vehicles for the fleet catalog explorer below
  const filteredVehicles = vehicles.filter((v) => {
    if (selectedCategory === 'all') return true;
    const cat = (v.category_name || v.category || '').toLowerCase();
    const fuel = (v.fuel_type || v.fuel || '').toLowerCase();
    if (selectedCategory === 'sports') return cat.includes('sport');
    if (selectedCategory === 'suv') return cat.includes('suv') || cat.includes('4x4');
    if (selectedCategory === 'luxury') return cat.includes('luxury') || cat.includes('sedan') || cat.includes('mid-size');
    if (selectedCategory === 'electric') return fuel.includes('electric') || fuel.includes('hybrid');
    return true;
  });

  return (
    <section id="fleet" className="py-20 sm:py-28 bg-[#040508] relative overflow-hidden text-white border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-[#9D4EDD]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-[11px] font-bold tracking-[0.3em] uppercase rounded-full mb-4">
              <Sparkles size={13} /> Interactive Cockpit & Vehicle Studio
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
              Understand <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#00E5FF]">The Machine.</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-base mt-4 font-light leading-relaxed">
              Every vehicle in the DriveX fleet is engineered with a unique character. Select any flagship below to inspect real-time performance telemetry, exhaust sound profiles, and dynamic driving modes before booking.
            </p>
          </motion.div>
        </div>

        {/* 1. INTERACTIVE FLAGSHIP CAR SELECTOR RIBBON */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00E5FF] flex items-center gap-1.5">
              <Radio size={12} className="animate-pulse" /> Select Flagship to Inspect
            </span>
            <span className="text-[11px] text-gray-500 hidden sm:inline font-mono">
              6 Flagship Models Active
            </span>
          </div>

          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
            {flagships.map((f) => {
              const isSelected = (selectedVehicle?.id === f.id) || (selectedVehicle?.slug && selectedVehicle.slug === f.slug);
              return (
                <button
                  key={f.id || f.slug}
                  onClick={() => setSelectedVehicle(f)}
                  className={`snap-start shrink-0 px-4 py-3 rounded-lg border transition-all duration-300 text-left flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#00E5FF]/10 border-[#00E5FF] text-white shadow-[0_0_20px_rgba(0,229,255,0.25)]'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-sm overflow-hidden bg-black shrink-0 border ${isSelected ? 'border-[#00E5FF]' : 'border-white/10'}`}>
                    <img 
                      src={f.primary_image || f.imageUrl || f.image_url} 
                      alt={f.brand} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 leading-none">
                      {f.brand}
                    </span>
                    <span className="block text-xs sm:text-sm font-black uppercase italic tracking-wide text-white truncate max-w-[130px] sm:max-w-[160px]">
                      {f.model || f.name}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] ml-1 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. THE INTERACTIVE STUDIO STAGE */}
        <motion.div 
          layout
          className="bg-gradient-to-br from-[#0A0D14] via-[#08090B] to-[#040508] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-5 sm:p-8 lg:p-10 mb-16 relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Visual Vehicle Showcase (Left 7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              {/* Category & Status Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {studioSpecs.badge}
                  </span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {currentStudioVehicle.year} Edition
                  </span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Fleet Ready</span>
                </div>
              </div>

              {/* Main Vehicle Image with Crossfade */}
              <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden bg-black/40 border border-white/5 group my-2">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentStudioVehicle.id || currentStudioVehicle.slug}
                    src={currentStudioVehicle.primary_image || currentStudioVehicle.imageUrl || currentStudioVehicle.image_url} 
                    alt={currentStudioVehicle.name} 
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />
                </AnimatePresence>
                
                {/* Visual Glow Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-70" />
                
                {/* Floating Exhaust / Sound Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg p-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shrink-0">
                      <Volume2 size={14} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Acoustic Exhaust Signature</span>
                      <span className="text-xs text-white font-medium truncate block">{studioSpecs.exhaustNote}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#00E5FF] shrink-0 uppercase tracking-widest hidden sm:inline">
                    Active Valves
                  </span>
                </div>
              </div>

              {/* Interactive Driving Mode Selector */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                    <SlidersHorizontal size={12} /> Test Driving Mode Profile
                  </span>
                  <span className="text-[10px] text-[#00E5FF] font-mono uppercase tracking-wider">
                    {drivingMode.toUpperCase()} ACTIVATED
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

                {/* Mode Dynamic Description */}
                <p className="text-xs text-gray-300 mt-2.5 bg-white/[0.03] p-2.5 rounded border border-white/5 flex items-center gap-2">
                  <Check size={14} className="text-[#00E5FF] shrink-0" />
                  <span>{studioSpecs.modes[drivingMode]}</span>
                </p>
              </div>
            </div>

            {/* Technical Cockpit HUD & Booking (Right 5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              {/* Title & Brand */}
              <div>
                <span className="text-[#00E5FF] font-bold text-xs uppercase tracking-[0.25em] block mb-1">
                  {currentStudioVehicle.brand}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase italic tracking-tight leading-tight">
                  {currentStudioVehicle.model || currentStudioVehicle.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-light mt-2 leading-relaxed">
                  {currentStudioVehicle.description || studioSpecs.soundProfile}
                </p>
              </div>

              {/* Live Telemetry Meters */}
              <div className="space-y-4 bg-black/40 border border-white/10 p-5 rounded-xl">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#00E5FF] block border-b border-white/10 pb-2">
                  Vehicle Performance Telemetry
                </span>

                {/* 0-100 Acceleration */}
                <div>
                  <div className="flex justify-between items-baseline mb-1 text-xs">
                    <span className="text-gray-400 flex items-center gap-1.5 uppercase font-medium">
                      <Zap size={13} className="text-[#00E5FF]" /> 0-100 km/h Sprint
                    </span>
                    <span className="text-base font-black text-white font-mono">{studioSpecs.acceleration}</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      key={`accel-${currentStudioVehicle.id}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${studioSpecs.accelPercent}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-[#00E5FF] rounded-full"
                    />
                  </div>
                </div>

                {/* Horsepower */}
                <div>
                  <div className="flex justify-between items-baseline mb-1 text-xs">
                    <span className="text-gray-400 flex items-center gap-1.5 uppercase font-medium">
                      <Gauge size={13} className="text-amber-400" /> Peak Horsepower
                    </span>
                    <span className="text-base font-black text-white font-mono">{studioSpecs.horsepower}</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      key={`hp-${currentStudioVehicle.id}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${studioSpecs.hpPercent}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Engine & Top Speed Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                  <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Top Velocity</span>
                    <span className="text-sm font-black text-white font-mono">{studioSpecs.topSpeed}</span>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Configuration</span>
                    <span className="text-sm font-black text-white font-mono">
                      {currentStudioVehicle.transmission} • {currentStudioVehicle.seats} Seats
                    </span>
                  </div>
                </div>
              </div>

              {/* Engineering Highlights Pills */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">
                  Key Dynamic Highlights
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {studioSpecs.features.map((feat, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 bg-white/5 border border-white/10 text-gray-300 rounded text-[11px] font-medium flex items-center gap-1"
                    >
                      <Check size={11} className="text-[#00E5FF]" /> {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Action Box */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-baseline mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">Daily All-Inclusive Rate</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-white">LKR {studioPriceLKR.toLocaleString()}</span>
                      <span className="text-xs text-[#00E5FF] font-mono">(${rawStudioPrice}/day)</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest text-right">
                    Zero Security Deposit <br /> with VIP Verification
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setInspectVehicle(currentStudioVehicle)}
                    className="py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider text-xs rounded-sm transition-colors border border-white/10 flex items-center justify-center gap-1.5"
                  >
                    <Info size={14} /> Full Telemetry
                  </button>
                  <button
                    onClick={() => handleBookVehicle(currentStudioVehicle.id)}
                    className="py-3 px-4 bg-[#00E5FF] hover:bg-white text-black font-black uppercase tracking-wider text-xs rounded-sm transition-all shadow-[0_0_25px_rgba(0,229,255,0.4)] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Book Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </motion.div>


        {/* 3. FULL FLEET EXPLORER WITH CATEGORY SWITCHER */}
        <div className="mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-[#00E5FF] font-bold text-xs uppercase tracking-[0.3em] block mb-1">
                Browse Complete Showroom
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase italic tracking-tight">
                Our Premier <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Fleet Gallery</span>
              </h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                      : 'bg-white/5 text-gray-400 hover:text-white border border-white/5 hover:border-white/20'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredVehicles.map((vehicle, index) => {
              const rawPrice = Number(vehicle.daily_price || vehicle.pricePerDay || vehicle.price_per_day || 0);
              const priceLKR = rawPrice < 1000 ? rawPrice * 300 : rawPrice;
              const specs = getVehicleSpecs(vehicle);

              return (
                <motion.div
                  key={vehicle.id || vehicle.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group bg-[#08090B] border border-white/10 hover:border-[#00E5FF]/40 rounded-xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Photo Container */}
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-black/60">
                    <div className="absolute top-3.5 left-3.5 z-20 flex gap-2">
                      <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-white border border-white/10 rounded-sm">
                        {vehicle.category_name || vehicle.category || 'Luxury'}
                      </span>
                      <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold uppercase tracking-wider rounded-sm">
                        Available
                      </span>
                    </div>

                    <img 
                      src={vehicle.primary_image || vehicle.imageUrl || vehicle.image_url} 
                      alt={vehicle.name}
                      className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-80" />

                    {/* Quick Performance Strip */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-gray-300 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                      <span className="text-[#00E5FF] font-bold">0-100: {specs.acceleration}</span>
                      <span>Power: {specs.horsepower}</span>
                      <span>Max: {specs.topSpeed}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3 gap-2">
                        <div className="min-w-0">
                          <span className="text-[#00E5FF] text-[10px] font-bold uppercase tracking-widest block">
                            {vehicle.brand}
                          </span>
                          <h4 className="text-lg font-black text-white italic uppercase tracking-wider truncate">
                            {vehicle.model || vehicle.name}
                          </h4>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="block text-xl font-black text-white">LKR {priceLKR.toLocaleString()}</span>
                          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                            (${rawPrice}/day)
                          </span>
                        </div>
                      </div>

                      {/* Specs Badge Pills */}
                      <div className="grid grid-cols-3 gap-2 mb-4 pt-3 border-t border-white/5">
                        <div className="text-center p-2 bg-white/5 rounded-sm">
                          <span className="block text-xs font-bold text-white mb-0.5">{vehicle.seats || 4}</span>
                          <span className="block text-[8px] text-gray-400 uppercase tracking-widest">Seats</span>
                        </div>
                        <div className="text-center p-2 bg-white/5 rounded-sm">
                          <span className="block text-xs font-bold text-white mb-0.5">{vehicle.transmission?.substring(0, 4)}</span>
                          <span className="block text-[8px] text-gray-400 uppercase tracking-widest">Trans</span>
                        </div>
                        <div className="text-center p-2 bg-white/5 rounded-sm">
                          <span className="block text-xs font-bold text-white mb-0.5 truncate">{vehicle.fuel || vehicle.fuel_type || 'Petrol'}</span>
                          <span className="block text-[8px] text-gray-400 uppercase tracking-widest">Fuel</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        onClick={() => setInspectVehicle(vehicle)}
                        className="py-2.5 text-center bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase tracking-widest text-[11px] transition-colors rounded-sm flex items-center justify-center gap-1"
                      >
                        <Eye size={13} /> Quick Inspect
                      </button>
                      <button
                        onClick={() => handleBookVehicle(vehicle.id)}
                        className="py-2.5 text-center bg-[#00E5FF] hover:bg-white text-black font-black uppercase tracking-widest text-[11px] transition-all rounded-sm shadow-[0_0_15px_rgba(0,229,255,0.3)] flex items-center justify-center gap-1 cursor-pointer"
                      >
                        Book Now <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* View Full Catalog Link */}
          <div className="mt-12 text-center">
            <Link
              to="/vehicles"
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black font-black uppercase tracking-widest text-xs sm:text-sm rounded-sm transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.2)]"
            >
              Explore Complete 14-Vehicle Inventory <ChevronRight size={16} />
            </Link>
          </div>
        </div>

      </div>

      {/* 4. INSTANT VEHICLE INSPECTOR MODAL */}
      <AnimatePresence>
        {inspectVehicle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0A0D14] border border-white/15 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative text-white shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setInspectVehicle(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="mb-4">
                <span className="text-[#00E5FF] font-bold text-xs uppercase tracking-[0.25em] block">
                  {inspectVehicle.brand}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white">
                  {inspectVehicle.model || inspectVehicle.name}
                </h3>
              </div>

              {/* Vehicle Image */}
              <div className="relative h-56 sm:h-72 rounded-xl overflow-hidden bg-black/60 mb-6 border border-white/10">
                <img 
                  src={inspectVehicle.primary_image || inspectVehicle.imageUrl || inspectVehicle.image_url} 
                  alt={inspectVehicle.name}
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Description */}
              <p className="text-sm text-gray-300 font-light leading-relaxed mb-6 bg-white/[0.02] p-4 rounded-lg border border-white/5">
                {inspectVehicle.description || 'Precision luxury performance vehicle maintained in impeccable condition with certified island-wide roadside support and full insurance.'}
              </p>

              {/* Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Sprint</span>
                  <span className="text-sm font-black text-white font-mono">{getVehicleSpecs(inspectVehicle).acceleration}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Output</span>
                  <span className="text-sm font-black text-white font-mono">{getVehicleSpecs(inspectVehicle).horsepower}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Seats</span>
                  <span className="text-sm font-black text-white font-mono">{inspectVehicle.seats || 4} Passengers</span>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Gearbox</span>
                  <span className="text-sm font-black text-white font-mono">{inspectVehicle.transmission}</span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Daily Rental Rate</span>
                  <span className="text-2xl font-black text-white">
                    LKR {((Number(inspectVehicle.daily_price || inspectVehicle.pricePerDay || 0) < 1000)
                      ? Number(inspectVehicle.daily_price || inspectVehicle.pricePerDay || 0) * 300 
                      : Number(inspectVehicle.daily_price || inspectVehicle.pricePerDay || 0)).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    to={`/vehicles/${inspectVehicle.id}`}
                    className="flex-1 sm:flex-initial px-5 py-3 text-center bg-white/10 hover:bg-white/20 text-white font-bold uppercase text-xs tracking-wider rounded-sm transition-colors border border-white/10"
                  >
                    View Page
                  </Link>
                  <button
                    onClick={() => {
                      setInspectVehicle(null);
                      handleBookVehicle(inspectVehicle.id);
                    }}
                    className="flex-1 sm:flex-initial px-6 py-3 text-center bg-[#00E5FF] hover:bg-white text-black font-black uppercase text-xs tracking-wider rounded-sm transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                  >
                    Reserve Now
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default FeaturedFleet;
