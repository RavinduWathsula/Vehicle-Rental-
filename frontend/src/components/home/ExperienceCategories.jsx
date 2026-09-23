import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'CITY',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=2000&auto=format&fit=crop',
    desc: 'Agile & Efficient'
  },
  {
    name: 'ADVENTURE',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
    desc: 'Conquer Any Terrain'
  },
  {
    name: 'LUXURY',
    image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2070&auto=format&fit=crop',
    desc: 'Ultimate Refinement'
  },
  {
    name: 'FAMILY',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070&auto=format&fit=crop',
    desc: 'Space & Comfort'
  }
];

const ExperienceCategories = () => {
  return (
    <section className="py-24 bg-[#040508] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-12">
          Choose Your <span className="text-[var(--color-drivex-accent)]">Experience.</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-[600px]">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative group overflow-hidden rounded-xl cursor-pointer"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              
              <div className="absolute bottom-8 left-6">
                <h3 className="text-3xl font-black text-white italic tracking-tight">{cat.name}</h3>
                <p className="text-[var(--color-drivex-accent)] uppercase tracking-widest text-xs mt-1 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {cat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceCategories;
