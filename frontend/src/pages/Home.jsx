import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Home = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Cinematic GSAP entrance animation
    const tl = gsap.timeline();
    
    tl.fromTo(heroRef.current, 
      { filter: 'blur(20px)', scale: 1.1 },
      { filter: 'blur(0px)', scale: 1, duration: 2, ease: 'power3.out' }
    );
    
    tl.fromTo(textRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' },
      "-=1.5"
    );
  }, []);

  return (
    <div className="w-full">
      {/* Cinematic Hero */}
      <section className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#08090B]">
        {/* Abstract 3D/Cinematic Background Placeholder */}
        <motion.div 
          style={{ y, opacity }}
          ref={heroRef}
          className="absolute inset-0 z-0"
        >
          {/* A highly atmospheric placeholder image until 3D is built */}
          <img 
            src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50 grayscale mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/40 to-[#08090B]/80" />
          <div className="absolute inset-0 cinematic-gradient opacity-60" />
        </motion.div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 w-full max-w-5xl" ref={textRef}>
          <div className="overflow-hidden mb-4">
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic">
              Move <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-drivex-accent)] to-[#00B8CC]">Beyond</span>
            </h1>
          </div>
          <div className="overflow-hidden mb-12">
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
              Experience the pinnacle of automotive engineering. Premium vehicle rentals for those who demand excellence.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 overflow-hidden pt-4">
            <Link to="/vehicles">
              <Button size="lg" className="w-48">Explore Fleet</Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" size="lg" className="w-48">Discover DRIVEX</Button>
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-50"
        >
          <span className="text-xs uppercase tracking-widest text-[var(--color-drivex-accent)] mb-2">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-drivex-accent)] to-transparent" />
        </motion.div>
      </section>

      {/* Featured Fleet Section */}
      <section className="py-32 bg-[#08090B] relative z-20">
        <Container>
          <SectionHeading 
            title="Excellence in Motion" 
            subtitle="Curated Selection" 
            centered 
          />
          
          {/* Abstract Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-16">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="md:col-span-8 h-[400px] relative rounded-xl overflow-hidden group cursor-pointer"
            >
              <img src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=2071&auto=format&fit=crop" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-3xl font-bold text-white mb-2">Sports Division</h3>
                <p className="text-[var(--color-drivex-accent)] tracking-widest uppercase text-sm">Unleash Performance</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="md:col-span-4 h-[400px] relative rounded-xl overflow-hidden group cursor-pointer"
            >
              <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-bold text-white mb-2">Luxury Class</h3>
                <p className="text-[var(--color-drivex-accent)] tracking-widest uppercase text-sm">Arrive in Style</p>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/vehicles">
              <Button variant="outline">View All Categories</Button>
            </Link>
          </div>
        </Container>
      </section>
      
      {/* Values Section */}
      <section className="py-32 bg-[#0A0B0E] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] cinematic-gradient opacity-30 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <Container relative z-10>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: '01', title: 'Seamless Booking', desc: 'A frictionless digital experience from selection to ignition.' },
              { num: '02', title: 'Immaculate Fleet', desc: 'Every vehicle is meticulously maintained to showroom standards.' },
              { num: '03', title: 'White Glove Service', desc: 'Premium concierge delivery and 24/7 dedicated support.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="border-l border-white/10 pl-6"
              >
                <span className="text-[var(--color-drivex-accent)] font-black text-2xl italic mb-4 block">{feature.num}</span>
                <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
