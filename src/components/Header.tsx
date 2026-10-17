import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Waves, Menu, X, CalendarCheck, PhoneCall } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBookClick: () => void;
}

export default function Header({ activeTab, setActiveTab, onBookClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'accessories', label: 'Accessories & Shop' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    // Smooth scroll to top when changing primary view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-brand-dark/95 backdrop-blur-md py-3 shadow-lg border-b border-brand-teal/20 text-white'
            : 'bg-transparent py-5 text-white'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              id="header-logo-container"
              onClick={() => handleNavClick('home')}
              className="flex cursor-pointer items-center gap-2 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-teal to-brand-aqua text-white shadow-md group-hover:rotate-12 transition-transform">
                <Waves className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <span className="font-display text-xl font-extrabold tracking-wider bg-gradient-to-r from-brand-teal via-brand-aqua to-white bg-clip-text text-transparent">
                  FreshWave
                </span>
                <span className="block text-[9px] uppercase tracking-widest font-bold text-brand-aqua">
                  Premium Laundry
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav id="desktop-nav" className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? scrolled
                          ? 'text-brand-aqua bg-white/5'
                          : 'text-brand-aqua bg-white/10'
                        : scrolled
                        ? 'text-gray-300 hover:text-white hover:bg-white/5'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-4 right-4 h-[2px] bg-brand-aqua"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                id="header-phone-cta"
                href="tel:+2348163456789"
                className="flex items-center gap-1.5 text-xs font-bold text-brand-aqua hover:text-white transition-colors"
              >
                <PhoneCall className="h-3.5 w-3.5" /> +234 816 345 6789
              </a>
              <motion.button
                id="header-book-cta"
                onClick={onBookClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-brand-coral px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-coral/20 hover:bg-brand-coral/90 hover:shadow-brand-coral/30 transition-all cursor-pointer"
              >
                Book a Pickup
              </motion.button>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                id="header-mobile-book-cta"
                onClick={onBookClick}
                className="rounded-full bg-brand-coral p-2 text-white shadow-md"
              >
                <CalendarCheck className="h-4 w-4" />
              </button>
              <button
                id="mobile-menu-trigger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`rounded-full p-2.5 transition-colors ${
                  scrolled ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Slide-Over */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-brand-dark/95 backdrop-blur-lg flex flex-col justify-center px-6"
          >
            <div className="space-y-6 text-center">
              <div className="flex flex-col items-center gap-2 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-teal text-white">
                  <Waves className="h-6 w-6 animate-spin-slow" />
                </div>
                <h2 className="font-display text-2xl font-black text-white">FreshWave</h2>
                <p className="text-[10px] uppercase tracking-widest text-brand-aqua font-bold">Warri, Nigeria</p>
              </div>

              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`font-display text-lg font-bold uppercase tracking-wider py-2 transition-colors ${
                      activeTab === item.id ? 'text-brand-aqua scale-105' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-4">
                <a
                  id="mobile-phone-link"
                  href="tel:+2348163456789"
                  className="flex items-center gap-2 text-sm font-bold text-brand-teal"
                >
                  <PhoneCall className="h-4 w-4" /> +234 816 345 6789
                </a>
                <button
                  id="mobile-book-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookClick();
                  }}
                  className="w-full rounded-full bg-brand-coral py-3 font-display font-bold uppercase tracking-widest text-white shadow-xl shadow-brand-coral/20"
                >
                  Book a Pickup
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
