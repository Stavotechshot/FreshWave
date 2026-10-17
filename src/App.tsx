import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesShowcase from './components/ServicesShowcase';
import HowItWorks from './components/HowItWorks';
import AccessoriesShop from './components/AccessoriesShop';
import PricingPackages from './components/PricingPackages';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BookingFormModal from './components/BookingFormModal';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [initialServiceForModal, setInitialServiceForModal] = useState<string>('wash-fold');

  const handleOpenBookingWithService = (serviceId: string) => {
    setInitialServiceForModal(serviceId);
    setIsBookingOpen(true);
  };

  const handleSelectPackage = (packageId: string) => {
    // Map package ID to approximate service type for form initialization
    if (packageId === 'premium-senator') {
      setInitialServiceForModal('dry-cleaning');
    } else {
      setInitialServiceForModal('wash-fold');
    }
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-white font-sans text-brand-dark antialiased">
      {/* Global Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onBookClick={() => handleOpenBookingWithService('wash-fold')}
      />

      {/* Main Page Layout Wrapper with Tab Animations */}
      <main className="relative">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Cinematic Bubbles Hero */}
              <Hero
                onBookClick={() => handleOpenBookingWithService('wash-fold')}
                onNavigateToTab={(tab) => {
                  setActiveTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
              
              {/* Home Services Summary */}
              <ServicesShowcase
                onBookService={handleOpenBookingWithService}
                onNavigateToTab={(tab) => {
                  setActiveTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
              
              {/* Simple 3-step Clean Process */}
              <HowItWorks onBookClick={() => handleOpenBookingWithService('wash-fold')} />
              
              {/* Package plans and counters */}
              <PricingPackages onSelectPackage={handleSelectPackage} />
              
              {/* Trust & Testimonial Carousel */}
              <Testimonials />
              
              {/* Contact and Maps overview */}
              <ContactSection />
            </motion.div>
          )}

          {activeTab === 'services' && (
            <motion.div
              key="services-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <ServicesShowcase
                standalone
                onBookService={handleOpenBookingWithService}
                onNavigateToTab={(tab) => {
                  setActiveTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </motion.div>
          )}

          {activeTab === 'how-it-works' && (
            <motion.div
              key="how-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <HowItWorks
                standalone
                onBookClick={() => handleOpenBookingWithService('wash-fold')}
              />
            </motion.div>
          )}

          {activeTab === 'accessories' && (
            <motion.div
              key="accessories-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <AccessoriesShop standalone />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <ContactSection standalone />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Brand Footer */}
      <Footer
        onNavigateToTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onBookClick={() => handleOpenBookingWithService('wash-fold')}
      />

      {/* Global Floating Pulse Ring WhatsApp Link */}
      <FloatingWhatsApp />

      {/* 3-Step Wizard Booking Drawer/Modal */}
      <BookingFormModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialServiceType={initialServiceForModal}
      />
    </div>
  );
}
