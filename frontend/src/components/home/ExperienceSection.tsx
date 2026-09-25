import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const experiences = [
  {
    id: 'city',
    title: 'CITY',
    description: 'Fast. Flexible. Effortless.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop',
    category: 'compact',
  },
  {
    id: 'adventure',
    title: 'ADVENTURE',
    description: 'Ready for the road beyond the city.',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
    category: 'suv',
  },
  {
    id: 'luxury',
    title: 'LUXURY',
    description: 'Travel differently.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop',
    category: 'luxury',
  },
  {
    id: 'family',
    title: 'FAMILY',
    description: 'More space. More comfort. More memories.',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop',
    category: 'minivan',
  },
];

export const ExperienceSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full bg-[#08090B] py-24 md:py-32 z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight"
        >
          CHOOSE YOUR <br />
          <span className="text-[#D4AF37]">EXPERIENCE.</span>
        </motion.h2>
      </div>

      <div className="w-full max-w-[100rem] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row h-[800px] md:h-[600px] gap-4 w-full">
          {experiences.map((exp, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={exp.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(0)}
                layout
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1],
                  layout: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                }}
                className={cn(
                  "relative h-full overflow-hidden rounded-sm cursor-pointer group flex-1 md:min-w-[100px]",
                  isHovered ? "md:grow-[3]" : "md:grow-[1]"
                )}
                onClick={() => {
                  // Future navigation to vehicle listing
                  console.log(`Navigating to /vehicles?category=${exp.category}`);
                }}
              >
                {/* Background Image with Parallax-like scale effect on hover */}
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                  style={{ backgroundImage: `url(${exp.image})` }}
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                />
                
                {/* Gradients for text readability */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-b from-transparent via-[#08090B]/20 to-[#08090B] transition-opacity duration-700",
                  isHovered ? "opacity-80" : "opacity-60"
                )} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="relative z-10 flex flex-col">
                    <motion.div
                      layout="position"
                      className="flex items-center gap-4 mb-2"
                    >
                      <h3 className="text-3xl md:text-4xl font-heading font-bold text-white tracking-widest whitespace-nowrap">
                        {exp.title}
                      </h3>
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center hidden md:flex"
                          >
                            <ArrowRight size={20} className="text-black" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isHovered ? "auto" : 0,
                        opacity: isHovered ? 1 : 0
                      }}
                      className="overflow-hidden md:hidden"
                    >
                      <p className="text-white/80 font-light mt-2 pb-4">
                        {exp.description}
                      </p>
                    </motion.div>

                    {/* Desktop Description */}
                    <div className="hidden md:block">
                      <AnimatePresence>
                        {isHovered && (
                          <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="text-white/80 font-light text-lg whitespace-nowrap"
                          >
                            {exp.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
