import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchVehicles, type Vehicle, type SearchParams } from '../lib/api';
import { VehicleCard } from '../components/vehicles/VehicleCard';
import { Button } from '../components/ui/Button';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Local filter states
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState('recommended');

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      
      const params: SearchParams = {
        pickupLocation: searchParams.get('pickupLocation') || '',
        returnLocation: searchParams.get('returnLocation') || '',
        pickupDate: searchParams.get('pickupDate') || '',
        pickupTime: searchParams.get('pickupTime') || '',
        returnDate: searchParams.get('returnDate') || '',
        returnTime: searchParams.get('returnTime') || '',
        category: category,
      };

      const results = await searchVehicles(params);
      
      // Simulate sorting on frontend if backend doesn't support it yet
      let sorted = [...results];
      if (sortBy === 'price-low') sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
      if (sortBy === 'price-high') sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
      // 'newest' and 'recommended' could depend on id or specific flags
      
      setVehicles(sorted);
      setLoading(false);
    };

    fetchVehicles();
  }, [searchParams, category, sortBy]);

  const updateFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    if (category) newParams.set('category', category);
    else newParams.delete('category');
    
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-[#08090B] pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-32 glassmorphism p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-heading font-bold text-white mb-6">Filters</h2>
            
            <div className="flex flex-col gap-6">
              {/* Category Filter */}
              <div>
                <label className="text-xs text-white/60 uppercase tracking-widest font-medium mb-3 block">Category</label>
                <div className="flex flex-col gap-2">
                  {['suv', 'luxury', 'sport', 'sedan', 'compact', 'minivan'].map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${category === cat ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-white/20 group-hover:border-white/50'}`}>
                        {category === cat && <div className="w-2 h-2 bg-black rounded-sm" />}
                      </div>
                      <span className="text-sm text-white/80 uppercase">{cat}</span>
                      <input 
                        type="radio" 
                        name="category" 
                        value={cat} 
                        checked={category === cat}
                        onChange={(e) => setCategory(e.target.value)}
                        className="hidden"
                      />
                    </label>
                  ))}
                  <button 
                    onClick={() => setCategory('')} 
                    className="text-xs text-white/40 text-left mt-2 hover:text-white/80"
                  >
                    Clear Category
                  </button>
                </div>
              </div>

              {/* Apply Button */}
              <Button onClick={updateFilters} className="w-full mt-4">Apply Filters</Button>
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-white">
              Available Vehicles
              <span className="text-white/40 text-lg ml-4 font-normal">{vehicles.length} found</span>
            </h1>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-sm py-2 px-4 text-white text-sm focus:outline-none focus:border-[#D4AF37] [color-scheme:dark]"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Fleet</option>
            </select>
          </div>

          {loading ? (
            <div className="w-full h-64 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : vehicles.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {vehicles.map(vehicle => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="glassmorphism rounded-xl p-12 text-center border-white/10">
              <h3 className="text-2xl font-heading text-white mb-4">No vehicles available</h3>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                We couldn't find any vehicles matching your exact criteria for the selected dates. 
                Please try adjusting your filters or changing your dates.
              </p>
              <Button variant="outline" onClick={() => window.history.back()}>Go Back</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
