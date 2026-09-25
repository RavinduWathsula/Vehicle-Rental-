import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "James Wilson",
    role: "CEO, TechVentures",
    text: "The absolute best rental experience I've ever had. The G-Wagon was in flawless condition, and the concierge delivery to my hotel was seamless.",
    rating: 5
  },
  {
    name: "Sarah Chen",
    role: "Creative Director",
    text: "DriveX doesn't just rent cars; they provide an entire premium experience. Booking the Porsche 911 for my weekend getaway was effortless.",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Entrepreneur",
    text: "I needed a reliable but luxurious vehicle for a week of client meetings. The Range Rover exceeded expectations. Exceptional service from start to finish.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#00E5FF] font-bold tracking-[0.3em] uppercase text-sm mb-4">Client Feedback</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
              Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Excellence</span>
            </h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-[#08090B] p-8 rounded-2xl border border-white/5 relative"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#00E5FF]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 font-light italic leading-relaxed mb-8 text-sm">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white font-bold">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <h5 className="text-white font-bold text-sm">{t.name}</h5>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
