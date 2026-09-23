import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CinematicSections = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  const texts = [
    "MOVE BEYOND.",
    "BUILT FOR THE CITY.",
    "DESIGNED FOR THE JOURNEY.",
    "READY WHEN YOU ARE."
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      sectionsRef.current.forEach((section, i) => {
        const text = section.querySelector('.cinematic-text');
        
        gsap.fromTo(text, 
          { 
            opacity: 0, 
            y: 100, 
            scale: 0.9,
            filter: 'blur(10px)'
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top center+=20%",
              end: "center center",
              scrub: 1,
            }
          }
        );

        // Fade out when scrolling past
        gsap.to(text, {
          opacity: 0,
          y: -100,
          scale: 1.1,
          filter: 'blur(10px)',
          ease: "power3.in",
          scrollTrigger: {
            trigger: section,
            start: "center center",
            end: "bottom center-=20%",
            scrub: 1,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 bg-transparent pointer-events-none">
      {/* Spacer to allow the 3D hero to stay pinned/fixed underneath */}
      <div className="h-screen w-full" />
      
      {texts.map((text, index) => (
        <section 
          key={index}
          ref={el => sectionsRef.current[index] = el}
          className="h-screen w-full flex items-center justify-center relative overflow-hidden"
        >
          {/* Subtle background gradient for contrast, fading in and out */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#040508]/80 to-transparent z-0" />
          
          <h2 className="cinematic-text text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase italic text-center z-10 px-4">
            {text}
          </h2>
        </section>
      ))}
    </div>
  );
};

export default CinematicSections;
