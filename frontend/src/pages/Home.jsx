import React from 'react';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';

const Home = () => {
  return (
    <div className="w-full">
      {/* 3D Hero Placeholder */}
      <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#08090B] via-[#08090B]/50 to-[#08090B]" />
        {/* The Canvas for 3D model will go here */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center z-10 px-4">
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic mb-4">
              Move <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-drivex-accent)] to-[#00B8CC]">Beyond</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Experience the pinnacle of automotive engineering. Premium vehicle rentals for those who demand excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Fleet Placeholder */}
      <section className="py-24 bg-[#0A0B0E]">
        <Container>
          <SectionHeading title="Featured Fleet" subtitle="Our Collection" centered />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="h-64 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
              <span className="text-gray-500">Vehicle Card 1</span>
            </div>
            <div className="h-64 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
              <span className="text-gray-500">Vehicle Card 2</span>
            </div>
            <div className="h-64 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
              <span className="text-gray-500">Vehicle Card 3</span>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
