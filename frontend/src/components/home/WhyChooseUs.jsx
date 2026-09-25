import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Award, Headphones } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-8 h-8 text-[#00E5FF]" />,
    title: "Uncompromising Safety",
    description: "Every vehicle undergoes rigorous multi-point inspections and maintenance before and after every single rental."
  },
  {
    icon: <Clock className="w-8 h-8 text-[#00E5FF]" />,
    title: "Instant Processing",
    description: "Skip the counter. Our digital-first approach means you can book, verify, and drive away in minutes."
  },
  {
    icon: <Award className="w-8 h-8 text-[#00E5FF]" />,
    title: "Pristine Fleet",
    description: "We only offer latest-model vehicles that are meticulously detailed to showroom condition for your arrival."
  },
  {
    icon: <Headphones className="w-8 h-8 text-[#00E5FF]" />,
    title: "24/7 Concierge",
    description: "Dedicated support team and roadside assistance available around the clock to ensure peace of mind."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-transparent via-[#00E5FF]/5 to-transparent skew-y-6 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#00E5FF] font-bold tracking-[0.3em] uppercase text-sm mb-4">The DriveX Standard</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00E5FF]">Us</span>
            </h3>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              We don't just rent cars; we curate driving experiences. Discover what makes DRIVEX the premier choice for automotive excellence.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 md:p-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-[#00E5FF]/50 transition-all duration-500 relative overflow-hidden"
            >
              {/* Hover Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00E5FF]/20 rounded-full blur-[50px] group-hover:bg-[#00E5FF]/40 transition-colors duration-500 pointer-events-none" />
              
              <div className="mb-6 inline-block p-4 bg-black/50 rounded-xl border border-white/5 shadow-xl">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3 tracking-wide">{feature.title}</h4>
              <p className="text-gray-400 leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
