import React, { useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';

import HeroScene from '../components/home/3d/HeroScene';
import HeroUI from '../components/home/HeroUI';
import CinematicSections from '../components/home/CinematicSections';
import FindYourRide from '../components/home/FindYourRide';
import ExperienceCategories from '../components/home/ExperienceCategories';
import BookingSection from '../components/home/BookingSection';
import FinalCTA from '../components/home/FinalCTA';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setScrollValue(latest);
    });
  }, [scrollYProgress]);

  return (
    <div className="w-full bg-[#040508] text-white">
      {/* 
        The 3D Scene is fixed to the viewport background for the early sections.
        We adjust its z-index and pointer-events to let UI handle clicks.
      */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <HeroScene scrollProgress={scrollValue} />
      </div>

      {/* Main content wrapper */}
      <div className="relative z-10">
        <HeroUI />
        
        {/* Cinematic scroll texts that overlay the fixed 3D background */}
        <CinematicSections />
        
        {/* Further sections have solid backgrounds to cover the 3D scene when scrolled down */}
        <FindYourRide />
        <ExperienceCategories />
        <BookingSection />
        <FinalCTA />
      </div>
    </div>
  );
};

export default Home;
