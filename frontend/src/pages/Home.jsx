import React from 'react';
import NewHero from '../components/home/NewHero';
import FeaturedFleet from '../components/home/FeaturedFleet';
import WhyChooseUs from '../components/home/WhyChooseUs';
import AboutSection from '../components/home/AboutSection';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import ContactSection from '../components/home/ContactSection';
import FinalCTA from '../components/home/FinalCTA';
import { ExperienceSection } from '../components/home/ExperienceSection';

const Home = () => {
  return (
    <div className="w-full bg-[#040508] text-white">
      <div id="home">
        <NewHero />
      </div>
      
      <FeaturedFleet />
      <ExperienceSection />
      
      <div id="about">
        <WhyChooseUs />
        <AboutSection />
      </div>
      
      <div id="how-to-work">
        <HowItWorks />
      </div>
      
      <Testimonials />
      
      <div id="contact">
        <ContactSection />
      </div>
      
      <FinalCTA />
    </div>
  );
};

export default Home;
