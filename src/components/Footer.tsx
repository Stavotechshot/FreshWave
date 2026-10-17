import React from 'react';
import { Waves, Phone, Mail, MapPin, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigateToTab: (tab: string) => void;
  onBookClick: () => void;
}

export default function Footer({ onNavigateToTab, onBookClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="app-footer" className="bg-brand-dark text-white pt-16 pb-8 relative overflow-hidden border-t border-brand-teal/20">
      
      {/* Decorative Wave SVG on top of footer */}
      <div className="absolute top-0 left-0 right-0 z-10 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-4 w-full fill-white/5">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,53.05,22,79.51,32.74,157.3,64.24,242.06,69.58,321.39,56.44Z" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigateToTab('home')}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal text-white">
                <Waves className="h-5 w-5" />
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

            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm">
              FreshWave Laundry is Warri's gold-standard eco-friendly cleaning provider. We elevate laundry care from a chore to a luxury service, combining skin-safe formulas, meticulous steam ironing, and door-to-door convenience.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full bg-brand-teal/10 border border-brand-teal/20 px-3 py-1 text-[10px] font-bold text-brand-teal">
              <Sparkles className="h-3 w-3 animate-spin-slow" /> Eco-Safe Certified Solver
            </div>
          </div>

          {/* Quick Links Col (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-brand-aqua">
              Explore Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-light">
              <li>
                <button onClick={() => onNavigateToTab('services')} className="hover:text-brand-teal transition-colors">
                  Wash & Fold regular items
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTab('services')} className="hover:text-brand-teal transition-colors">
                  Delicate Suit Dry Cleaning
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTab('services')} className="hover:text-brand-teal transition-colors">
                  Doorstep Express Delivery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTab('accessories')} className="hover:text-brand-teal transition-colors">
                  Eco-friendly Detergents & Care
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Directory Col (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-brand-aqua">
              FreshWave Headquarters
            </h4>
            <ul className="space-y-3.5 text-xs text-gray-400 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4.5 w-4.5 text-brand-teal shrink-0" />
                <span>24 GRA Avenue, Effurun-Warri, Delta State, Nigeria</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4.5 w-4.5 text-brand-teal shrink-0" />
                <span>+234 816 345 6789</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4.5 w-4.5 text-brand-teal shrink-0" />
                <span>hello@freshwavelaundry.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-light">
          <div>
            &copy; {currentYear} FreshWave Premium Laundry Services Ltd. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-brand-teal transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-brand-teal transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#support" className="hover:text-brand-teal transition-colors">Warri Support Desk</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
