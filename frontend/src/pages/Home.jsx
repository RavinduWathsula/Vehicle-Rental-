import React from 'react';
import NewHero from '../components/home/NewHero';
import AboutSection from '../components/home/AboutSection';
import HowItWorks from '../components/home/HowItWorks';
import ContactSection from '../components/home/ContactSection';
import FinalCTA from '../components/home/FinalCTA';

const Home = () => {
  return (
    <div className="w-full bg-[#040508] text-white">
      <NewHero />
      <AboutSection />
      <HowItWorks />
      <ContactSection />
      <FinalCTA />
    </div>
  );
};

export default Home;
