import React from 'react';
import { motion } from 'framer-motion';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import Input from '../components/Input';
import Button from '../components/Button';

const Contact = () => {
  return (
    <div className="w-full pt-20 pb-32">
      <Container>
        <SectionHeading title="Get in Touch" subtitle="Contact DRIVEX" centered />
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">Experience <br/>Premium Support</h3>
            <p className="text-gray-400 mb-10 leading-relaxed">
              Whether you are looking to book your next luxury vehicle, have questions about our fleet, or require concierge assistance, our dedicated team is available 24/7.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <svg className="w-5 h-5 text-[var(--color-drivex-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Email Us</h4>
                  <p className="text-gray-400">concierge@drivex.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <svg className="w-5 h-5 text-[var(--color-drivex-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Call Us</h4>
                  <p className="text-gray-400">+1 (800) 555-DRIVE</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <svg className="w-5 h-5 text-[var(--color-drivex-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Visit HQ</h4>
                  <p className="text-gray-400">100 Luxury Way<br/>Beverly Hills, CA 90210</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard>
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <Input label="Full Name" placeholder="John Doe" />
                <Input label="Email Address" type="email" placeholder="john@example.com" />
                
                <div className="w-full flex flex-col gap-1">
                  <label className="text-sm text-gray-300 font-medium ml-1">Message</label>
                  <textarea 
                    className="w-full bg-[#1A1B20] border border-white/10 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-drivex-accent)] focus:ring-1 focus:ring-[var(--color-drivex-accent)] transition-all min-h-[120px]"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <Button className="w-full mt-4">Send Message</Button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
