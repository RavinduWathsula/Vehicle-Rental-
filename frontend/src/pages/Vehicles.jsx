import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SlidersHorizontal, 
  ChevronDown, 
  RotateCcw, 
  Search, 
  Sparkles, 
  Car, 
  ShieldCheck, 
  ArrowUpDown, 
  LayoutGrid, 
  ListFilter,
  Fuel,
  Gauge,
  Users,
  Compass,
  Zap,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Container from '../components/Container';
import VehicleCard from '../components/VehicleCard';
import Loading from '../components/Loading';
import { vehicleService } from '../services/vehicleService';

const CATEGORIES = [
  { id: 'All', label: 'All Fleet', icon: Compass },
  { id: 'Luxury', label: 'Luxury', icon: Sparkles },
  { id: 'SUV', label: 'SUVs & 4x4', icon: Car },
  { id: 'Sports', label: 'Sports & Exotic', icon: Zap },
  { id: 'Economy', label: 'Economy', icon: Gauge },
  { id: 'Compact', label: 'Compact', icon: Car },
  { id: 'Mid-size', label: 'Executive Sedan', icon: Car },
  { id: 'Van', label: 'Passenger Vans', icon: Users },
];

const TRANSMISSIONS = ['All', 'Automatic', 'Manual'];
const FUEL_TYPES = ['All', 'Petrol', 'Diesel', 'Hybrid', 'Electric'];
const SEAT_OPTIONS = ['All', '2', '4', '5', '7+'];
const AVAILABILITY = ['All', 'Available', 'Reserved'];

// Curated Signature Fleet fallback (prevents empty screen if backend DB has 0 items or offline)
const FALLBACK_FLEET = [
  {
    id: 'porsche-gt3',
    brand: 'Porsche',
    model: '911 GT3 RS',
    year: 2024,
    category_name: 'Sports',
    category: 'sports',
    daily_price: 350.00,
    transmission: 'automatic',
    fuel_type: 'petrol',
    seats: 2,
    doors: 2,
    luggage_capacity: 2,
    status: 'available',
    primary_image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    description: 'Track-bred naturally aspirated 4.0L flat-six producing 518 hp.'
  },
  {
    id: 'mercedes-g63',
    brand: 'Mercedes-Benz',
    model: 'G63 AMG V8 BiTurbo',
    year: 2024,
    category_name: 'SUV',
    category: 'suv',
    daily_price: 280.00,
    transmission: 'automatic',
    fuel_type: 'petrol',
    seats: 5,
    doors: 5,
    luggage_capacity: 5,
    status: 'available',
    primary_image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80',
    description: 'Iconic luxury off-roader with handcrafted twin-turbo V8.'
  },
  {
    id: 'bmw-m8',
    brand: 'BMW',
    model: 'M8 Competition Gran Coupe',
    year: 2024,
    category_name: 'Luxury',
    category: 'luxury',
    daily_price: 220.00,
    transmission: 'automatic',
    fuel_type: 'petrol',
    seats: 5,
    doors: 4,
    luggage_capacity: 4,
    status: 'available',
    primary_image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    description: '617-hp twin-turbo V8 executive supercar with carbon interior.'
  },
  {
    id: 'defender-110',
    brand: 'Land Rover',
    model: 'Defender 110 V8',
    year: 2024,
    category_name: 'SUV',
    category: 'suv',
    daily_price: 210.00,
    transmission: 'automatic',
    fuel_type: 'petrol',
    seats: 7,
    doors: 5,
    luggage_capacity: 6,
    status: 'available',
    primary_image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    description: 'Supercharged V8 capable of dominating both Colombo streets and Yala terrain.'
  },
  {
    id: 'audi-rs7',
    brand: 'Audi',
    model: 'RS7 Sportback Performance',
    year: 2024,
    category_name: 'Luxury',
    category: 'luxury',
    daily_price: 195.00,
    transmission: 'automatic',
    fuel_type: 'petrol',
    seats: 5,
    doors: 4,
    luggage_capacity: 4,
    status: 'available',
    primary_image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
    description: 'Quattro all-wheel drive, ceramic brakes, and sweeping sportback silhouette.'
  },
  {
    id: 'tesla-plaid',
    brand: 'Tesla',
    model: 'Model S Plaid (1020 HP)',
    year: 2024,
    category_name: 'Luxury',
    category: 'luxury',
    daily_price: 175.00,
    transmission: 'automatic',
    fuel_type: 'electric',
    seats: 5,
    doors: 4,
    luggage_capacity: 4,
    status: 'available',
    primary_image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    description: 'Tri-motor all-electric hypercar with 0-100 km/h in 1.99s.'
  },
  {
    id: 'mustang-darkhorse',
    brand: 'Ford',
    model: 'Mustang Dark Horse V8',
    year: 2024,
    category_name: 'Sports',
    category: 'sports',
    daily_price: 145.00,
    transmission: 'manual',
    fuel_type: 'petrol',
    seats: 4,
    doors: 2,
    luggage_capacity: 2,
    status: 'available',
    primary_image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
    description: '5.0L Coyote V8 with 6-speed Tremec manual transmission.'
  },
  {
    id: 'prado-txl',
    brand: 'Toyota',
    model: 'Land Cruiser Prado TX-L',
    year: 2024,
    category_name: 'SUV',
    category: 'suv',
    daily_price: 130.00,
    transmission: 'automatic',
    fuel_type: 'diesel',
    seats: 7,
    doors: 5,
    luggage_capacity: 6,
    status: 'available',
    primary_image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    description: 'Legendary 7-seater durability with refrigerator and terrain select.'
  },
  {
    id: 'transit-vip',
    brand: 'Ford',
    model: 'Transit VIP Shuttle (12-Seater)',
    year: 2023,
    category_name: 'Van',
    category: 'van',
    daily_price: 120.00,
    transmission: 'manual',
    fuel_type: 'diesel',
    seats: 12,
    doors: 4,
    luggage_capacity: 8,
    status: 'available',
    primary_image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
    description: 'High-roof 12-passenger coach with individual recliners and dual AC.'
  },
  {
    id: 'rav4-hybrid',
    brand: 'Toyota',
    model: 'RAV4 Hybrid AWD',
    year: 2024,
    category_name: 'SUV',
    category: 'suv',
    daily_price: 90.00,
    transmission: 'automatic',
    fuel_type: 'hybrid',
    seats: 5,
    doors: 5,
    luggage_capacity: 5,
    status: 'available',
    primary_image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    description: 'Ultra-efficient hybrid AWD with elevated ride height and panoramic roof.'
  },
  {
    id: 'camry-hybrid',
    brand: 'Toyota',
    model: 'Camry Hybrid Executive',
    year: 2024,
    category_name: 'Mid-size',
    category: 'mid-size',
    daily_price: 75.00,
    transmission: 'automatic',
    fuel_type: 'hybrid',
    seats: 5,
    doors: 4,
    luggage_capacity: 4,
    status: 'available',
    primary_image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'Plush executive sedan with rear passenger climate controls and whisper quiet cabin.'
  },
  {
    id: 'golf-rline',
    brand: 'Volkswagen',
    model: 'Golf R-Line (Manual)',
    year: 2023,
    category_name: 'Compact',
    category: 'compact',
    daily_price: 55.00,
    transmission: 'manual',
    fuel_type: 'petrol',
    seats: 5,
    doors: 4,
    luggage_capacity: 3,
    status: 'available',
    primary_image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
    description: 'German driving dynamics with 6-speed manual and sport suspension.'
  },
  {
    id: 'fit-ehev',
    brand: 'Honda',
    model: 'Fit e:HEV Hybrid',
    year: 2023,
    category_name: 'Economy',
    category: 'economy',
    daily_price: 48.00,
    transmission: 'automatic',
    fuel_type: 'hybrid',
    seats: 5,
    doors: 4,
    luggage_capacity: 3,
    status: 'available',
    primary_image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    description: 'City runabout with 24 km/L fuel efficiency and magic seating system.'
  },
  {
    id: 'yaris-grsport',
    brand: 'Toyota',
    model: 'Yaris GR Sport City',
    year: 2023,
    category_name: 'Economy',
    category: 'economy',
    daily_price: 45.00,
    transmission: 'automatic',
    fuel_type: 'petrol',
    seats: 5,
    doors: 4,
    luggage_capacity: 2,
    status: 'available',
    primary_image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80',
    description: 'Nimble, fuel-efficient city runner with touchscreen and safety sense.'
  }
];

const Vehicles = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isDashboard = location.pathname.startsWith('/dashboard');

  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Search & Sorting States
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPriceFilter, setMaxPriceFilter] = useState(400);

  // Filter States (Initialize category from URL query if present)
  const initialCategory = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeTransmission, setActiveTransmission] = useState('All');
  const [activeFuel, setActiveFuel] = useState('All');
  const [activeSeats, setActiveSeats] = useState('All');
  const [activeAvailability, setActiveAvailability] = useState('All');

  // Ensure page always starts scrolled to the very top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Sync category state if URL param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      const match = CATEGORIES.find(c => c.id.toLowerCase() === cat.toLowerCase());
      if (match) setActiveCategory(match.id);
    }
  }, [searchParams]);

  // Load Vehicles with automatic fallback to Signature Fleet
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await vehicleService.getVehicles();
        const list = data?.data || data || [];
        
        // If backend returned vehicles, use them; if empty, use the signature fleet
        if (Array.isArray(list) && list.length > 0) {
          setVehicles(list);
        } else {
          setVehicles(FALLBACK_FLEET);
        }
      } catch (err) {
        // In case of network error, seamlessly use the fallback fleet so user never sees a broken screen
        setVehicles(FALLBACK_FLEET);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // Filter & Search Logic
  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter(v => {
        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchBrand = (v.brand || '').toLowerCase().includes(q);
          const matchModel = (v.model || v.name || '').toLowerCase().includes(q);
          const matchCategory = (v.category_name || v.category || '').toLowerCase().includes(q);
          if (!matchBrand && !matchModel && !matchCategory) return false;
        }

        // Category Match
        if (activeCategory !== 'All') {
          const cat = (v.category_name || v.category || '').toLowerCase();
          const target = activeCategory.toLowerCase();
          if (target === 'sports') {
            if (!cat.includes('sport') && !(v.model || '').toLowerCase().includes('gt') && !(v.brand || '').toLowerCase().includes('porsche')) {
              return false;
            }
          } else if (target === 'compact') {
            if (!cat.includes('compact') && !cat.includes('golf')) return false;
          } else if (target === 'mid-size') {
            if (!cat.includes('mid') && !cat.includes('sedan') && !cat.includes('camry') && !cat.includes('accord')) return false;
          } else {
            if (!cat.includes(target)) return false;
          }
        }
        
        // Transmission Match
        if (activeTransmission !== 'All') {
          const t = (v.transmission || '').toLowerCase();
          if (t !== activeTransmission.toLowerCase()) return false;
        }
        
        // Fuel Match
        if (activeFuel !== 'All') {
          const f = (v.fuel_type || v.fuel || '').toLowerCase();
          if (f !== activeFuel.toLowerCase()) return false;
        }
        
        // Seats Match
        if (activeSeats !== 'All') {
          const s = v.seats || 4;
          if (activeSeats === '7+') {
            if (s < 7) return false;
          } else if (activeSeats === '2') {
            if (s !== 2) return false;
          } else {
            if (s.toString() !== activeSeats) return false;
          }
        }

        // Price Slider Match
        const price = parseFloat(v.daily_price || v.pricePerDay || 0);
        if (price > maxPriceFilter) return false;

        // Availability Match
        if (activeAvailability !== 'All') {
          if (activeAvailability.toLowerCase() === 'available') {
            if (v.status !== 'available') return false;
          } else if (activeAvailability.toLowerCase() === 'reserved') {
            if (v.status === 'available') return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = parseFloat(a.daily_price || a.pricePerDay || 0);
        const priceB = parseFloat(b.daily_price || b.pricePerDay || 0);

        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'seats') return (b.seats || 4) - (a.seats || 4);
        return 0; // featured
      });
  }, [vehicles, searchQuery, activeCategory, activeTransmission, activeFuel, activeSeats, activeAvailability, maxPriceFilter, sortBy]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeCategory !== 'All') count++;
    if (activeTransmission !== 'All') count++;
    if (activeFuel !== 'All') count++;
    if (activeSeats !== 'All') count++;
    if (activeAvailability !== 'All') count++;
    if (maxPriceFilter < 400) count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [activeCategory, activeTransmission, activeFuel, activeSeats, activeAvailability, maxPriceFilter, searchQuery]);

  const resetFilters = () => {
    setActiveCategory('All');
    setActiveTransmission('All');
    setActiveFuel('All');
    setActiveSeats('All');
    setActiveAvailability('All');
    setMaxPriceFilter(400);
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className={`w-full ${isDashboard ? 'pt-2 pb-16' : 'pt-20 sm:pt-24 pb-24 sm:pb-32'} min-h-screen bg-[var(--bg)] transition-colors duration-300`}>
      
      {/* High-Tech Fleet Command Header */}
      <Container className="mb-6 sm:mb-8 px-4">
        <div className="relative bg-gradient-to-r from-[var(--sidebar)] via-[var(--card)] to-[var(--sidebar)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 overflow-hidden shadow-lg">
          {/* Ambient Glowing Highlights */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  Live Showroom • {filteredVehicles.length} Machines Ready
                </span>
                <span className="text-xs font-semibold text-[var(--text-muted)] hidden sm:inline">
                  • 24/7 VIP Concierge Support
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text)] tracking-tight uppercase">
                EXOTIC & LUXURY <span className="text-[var(--accent)]">FLEET</span>
              </h1>
              
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Precision-engineered performance supercars, executive sedans, and high-clearance luxury SUVs. Each vehicle is pristine, comprehensively insured, and ready for island-wide delivery.
              </p>
            </div>

            {/* Quick Filter Counters */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-[var(--sidebar)] p-3 rounded-2xl border border-[var(--border)] text-right">
                <p className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Active Selection</p>
                <p className="text-lg font-black text-[var(--accent)]">
                  {filteredVehicles.length} <span className="text-xs font-normal text-[var(--text-muted)]">Vehicles</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Interactive Category Carousel with Vehicle Counts */}
      <Container className="mb-6 sm:mb-8 px-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory.toLowerCase() === cat.id.toLowerCase();

            // Count for category badge
            const count = vehicles.filter(v => {
              if (cat.id === 'All') return true;
              const vCat = (v.category_name || v.category || '').toLowerCase();
              return vCat.includes(cat.id.toLowerCase());
            }).length;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (cat.id === 'All') {
                    setSearchParams({});
                  } else {
                    setSearchParams({ category: cat.id.toLowerCase() });
                  }
                }}
                className={`relative shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[var(--accent)] text-[var(--text-inverse)] border-[var(--accent)] shadow-md shadow-[var(--accent)]/20'
                    : 'bg-[var(--card)] hover:bg-[var(--card-hover)] text-[var(--text-muted)] hover:text-[var(--text)] border-[var(--border)]'
                }`}
              >
                <Icon size={14} className={isSelected ? 'text-[var(--text-inverse)]' : 'text-[var(--accent)]'} />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isSelected ? 'bg-black/30 text-white' : 'bg-[var(--sidebar)] text-[var(--text-muted)]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Container>

      {/* Main Grid & Filters Area */}
      <Container className="px-4">
        
        {/* Search, Sort & Quick Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 bg-[var(--sidebar)] p-4 rounded-2xl border border-[var(--border)] shadow-sm">
          
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search model, brand, engine or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all shadow-inner"
            />
          </div>

          <div className="flex items-center gap-3 shrink-0 justify-between md:justify-end">
            
            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-[var(--card)] px-3 py-1.5 rounded-xl border border-[var(--border)]">
              <ArrowUpDown size={14} className="text-[var(--accent)]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-bold uppercase tracking-wider text-[var(--text)] focus:outline-none cursor-pointer border-none"
              >
                <option value="featured">Featured Fleet</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="seats">Most Seats</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="xl:hidden px-3.5 py-2 bg-[var(--accent)] text-[var(--text-inverse)] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <SlidersHorizontal size={14} />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            {/* Clear Filters if active */}
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw size={13} /> Reset
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          
          {/* Cockpit Filters Console Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className={`w-full xl:w-80 shrink-0 ${showMobileFilters ? 'block mb-6' : 'hidden xl:block'}`}
          >
            <div className="bg-[var(--sidebar)] border border-[var(--border)] rounded-3xl p-6 sticky top-24 shadow-sm space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                    <SlidersHorizontal size={16} />
                  </div>
                  <h3 className="text-xs font-black text-[var(--text)] uppercase tracking-widest">
                    Fleet Filters
                  </h3>
                </div>

                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-[var(--accent)] hover:underline font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw size={12} /> Clear ({activeFilterCount})
                  </button>
                )}
              </div>

              {/* Price Range Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[var(--text-muted)] uppercase tracking-wider">Max Daily Rate</span>
                  <span className="font-black text-[var(--accent)] font-mono">${maxPriceFilter} / day</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="400"
                  step="10"
                  value={maxPriceFilter}
                  onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] h-1.5 bg-[var(--card)] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-mono">
                  <span>$45/day</span>
                  <span>$400+/day</span>
                </div>
              </div>

              {/* Transmission Filter */}
              <div className="space-y-2 pt-2 border-t border-[var(--border)]/60">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  Transmission Dynamic
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {TRANSMISSIONS.map(t => (
                    <button
                      key={t}
                      onClick={() => setActiveTransmission(t)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer border text-center ${
                        activeTransmission === t
                          ? 'bg-[var(--accent)] text-[var(--text-inverse)] border-[var(--accent)] shadow-sm'
                          : 'bg-[var(--card)] hover:bg-[var(--card-hover)] text-[var(--text-muted)] hover:text-[var(--text)] border-[var(--border)]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fuel / Engine Filter */}
              <div className="space-y-2 pt-2 border-t border-[var(--border)]/60">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  Powertrain / Fuel
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {FUEL_TYPES.map(f => (
                    <button
                      key={f}
                      onClick={() => setActiveFuel(f)}
                      className={`py-1.5 px-3 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                        activeFuel === f
                          ? 'bg-[var(--accent)] text-[var(--text-inverse)] border-[var(--accent)] shadow-sm'
                          : 'bg-[var(--card)] hover:bg-[var(--card-hover)] text-[var(--text-muted)] hover:text-[var(--text)] border-[var(--border)]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating Capacity */}
              <div className="space-y-2 pt-2 border-t border-[var(--border)]/60">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  Seating Capacity
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {SEAT_OPTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => setActiveSeats(s)}
                      className={`py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer border text-center ${
                        activeSeats === s
                          ? 'bg-[var(--accent)] text-[var(--text-inverse)] border-[var(--accent)] shadow-sm'
                          : 'bg-[var(--card)] hover:bg-[var(--card-hover)] text-[var(--text-muted)] hover:text-[var(--text)] border-[var(--border)]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-2 pt-2 border-t border-[var(--border)]/60">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  Status in Garage
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {AVAILABILITY.map(a => (
                    <button
                      key={a}
                      onClick={() => setActiveAvailability(a)}
                      className={`py-2 px-1 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border text-center ${
                        activeAvailability === a
                          ? 'bg-[var(--accent)] text-[var(--text-inverse)] border-[var(--accent)] shadow-sm'
                          : 'bg-[var(--card)] hover:bg-[var(--card-hover)] text-[var(--text-muted)] hover:text-[var(--text)] border-[var(--border)]'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* VIP Concierge Inclusions Badge */}
              <div className="p-4 bg-gradient-to-br from-cyan-950/20 to-[var(--card)] border border-[var(--accent)]/30 rounded-2xl space-y-2">
                <p className="text-xs font-bold text-[var(--text)] flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-emerald-400" /> DriveX Guarantee
                </p>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  Every reservation includes full CDW insurance, 24/7 roadside dispatch, and free cancellation up to 24 hours.
                </p>
              </div>

            </div>
          </motion.aside>

          {/* Vehicle Grid Area */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="h-[450px] flex flex-col items-center justify-center space-y-4">
                <Loading />
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                  Loading Luxury Fleet...
                </p>
              </div>
            ) : filteredVehicles.length === 0 ? (
              /* High-Tech Creative Empty State with instant recovery */
              <motion.div 
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[var(--sidebar)] border border-[var(--border)] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-sm"
              >
                <div className="w-20 h-20 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center mx-auto text-[var(--accent)] shadow-inner">
                  <Car size={32} />
                </div>

                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-2xl font-black text-[var(--text)] uppercase tracking-wide">
                    NO FLEET MATCH FOUND
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    We could not find vehicles in our fleet matching your exact criteria: <strong className="text-[var(--text)] font-semibold">{searchQuery ? `"${searchQuery}" • ` : ''}{activeCategory !== 'All' ? `${activeCategory} • ` : ''}{activeTransmission !== 'All' ? `${activeTransmission} • ` : ''}Under ${maxPriceFilter}$/day</strong>.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button 
                    onClick={resetFilters} 
                    className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] font-bold uppercase tracking-widest text-xs transition-all rounded-xl shadow-lg shadow-[var(--accent)]/20 cursor-pointer flex items-center gap-2"
                  >
                    <RotateCcw size={14} /> Clear All Filters
                  </button>

                  <button
                    onClick={() => {
                      resetFilters();
                      setActiveCategory('Sports');
                    }}
                    className="px-6 py-3 bg-[var(--card)] hover:bg-[var(--card-hover)] border border-[var(--border)] text-[var(--text)] font-bold uppercase tracking-widest text-xs transition-colors rounded-xl cursor-pointer"
                  >
                    View Supercars
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Vehicle Showcase Grid */
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

        </div>

      </Container>
    </div>
  );
};

export default Vehicles;
