import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

export const CinematicSequence = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // We can animate the HTML text opacity/transforms using GSAP ScrollTrigger
    const sections = gsap.utils.toArray('.scene-section') as HTMLElement[];
    
    sections.forEach((section, i) => {
      // The first scene is already visible on load
      if (i === 0) return;

      const textElement = section.querySelector('.scene-text');
      if (textElement) {
        gsap.fromTo(textElement, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0,
            scrollTrigger: {
              trigger: section,
              start: 'top center',
              end: 'center center',
              scrub: 1,
            }
          }
        );

        gsap.to(textElement, {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: section,
            start: 'center center',
            end: 'bottom center',
            scrub: 1,
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} id="cinematic-sequence" className="relative w-full z-10 pointer-events-none">
      {/* SCENE 01: Hero (MOVE BEYOND) */}
      <section className="scene-section relative w-full h-[150vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-10 max-w-7xl mx-auto w-full pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="scene-text max-w-2xl mt-20"
          >
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] font-heading font-bold text-white tracking-tighter">
              MOVE <br />
              <span className="text-[#D4AF37] relative inline-block">
                BEYOND.
                <div className="absolute inset-0 bg-[#D4AF37]/20 blur-3xl -z-10 rounded-full" />
              </span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-white/70 max-w-md font-light leading-relaxed">
              Premium vehicles. Seamless rentals. Unforgettable journeys.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="px-10 pointer-events-auto">EXPLORE VEHICLES</Button>
              <Button size="lg" variant="outline" className="px-10 pointer-events-auto">START YOUR JOURNEY</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SCENE 02: BUILT FOR THE CITY */}
      <section className="scene-section relative w-full h-[150vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center items-end px-6 md:px-10 max-w-7xl mx-auto w-full text-right pointer-events-auto">
          <div className="scene-text max-w-xl">
            <h2 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight">
              BUILT FOR <br /> THE <span className="text-[#D4AF37]">CITY.</span>
            </h2>
            <p className="mt-6 text-lg text-white/70 font-light">
              Navigate urban environments with unparalleled grace. Our vehicles are engineered to turn city streets into your personal runway.
            </p>
          </div>
        </div>
      </section>

      {/* SCENE 03: DESIGNED FOR THE JOURNEY */}
      <section className="scene-section relative w-full h-[150vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-10 max-w-7xl mx-auto w-full pointer-events-auto">
          <div className="scene-text max-w-xl">
            <h2 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight">
              DESIGNED FOR <br /> THE <span className="text-[#D4AF37]">JOURNEY.</span>
            </h2>
            <p className="mt-6 text-lg text-white/70 font-light">
              Experience the open road with advanced driver assistance, premium comfort, and range that takes you further.
            </p>
          </div>
        </div>
      </section>

      {/* SCENE 04: READY WHEN YOU ARE */}
      <section className="scene-section relative w-full h-[100vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center items-center px-6 md:px-10 max-w-7xl mx-auto w-full text-center pointer-events-auto">
          <div className="scene-text max-w-2xl flex flex-col items-center">
            <h2 className="text-5xl md:text-8xl font-heading font-bold text-white tracking-tight mb-8">
              READY WHEN <br /> <span className="text-[#D4AF37]">YOU ARE.</span>
            </h2>
            <Button size="lg" className="px-12 py-6 text-lg">BOOK YOUR RENTAL NOW</Button>
          </div>
        </div>
      </section>
    </div>
  );
};
