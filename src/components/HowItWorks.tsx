import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data';
import { CalendarDays, Truck, Sparkles, ChevronRight, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface HowItWorksProps {
  onBookClick: () => void;
  standalone?: boolean;
}

export default function HowItWorks({ onBookClick, standalone = false }: HowItWorksProps) {
  
  const getIcon = (iconName: string) => {
    const iconClass = "h-8 w-8 text-brand-teal";
    switch (iconName) {
      case 'CalendarDays':
        return <CalendarDays className={iconClass} />;
      case 'ConciergeBell':
        return <Truck className={iconClass} />;
      case 'Sparkles':
        return <Sparkles className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  return (
    <section id="how-it-works-section" className={`py-20 bg-brand-dark text-white relative overflow-hidden ${standalone ? 'pt-28' : ''}`}>
      {/* Wave SVG shape divider at the top */}
      {!standalone && (
        <div className="absolute top-0 left-0 right-0 z-10 w-full overflow-hidden leading-[0] transform rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-10 w-full fill-brand-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,53.05,22,79.51,32.74,157.3,64.24,242.06,69.58,321.39,56.44Z" />
          </svg>
        </div>
      )}

      {/* Cybernetic bubble lights in the dark background */}
      <div className="absolute -top-40 left-1/3 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-brand-aqua/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block rounded-full bg-brand-teal/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-aqua mb-3">
            Simple 3-Step Process
          </span>
          <h2 className="font-display text-3xl font-black tracking-tight text-white sm:text-5xl">
            How FreshWave Works
          </h2>
          <p className="mt-4 text-gray-300 text-sm sm:text-base font-light">
            We've completely re-engineered laundry care to make it frictionless, pristine, and rapid. Here is how your garments go from soiled to supreme.
          </p>
        </div>

        {/* Steps Grid with Connectors */}
        <div className="relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-brand-teal via-brand-aqua to-brand-coral -translate-y-12 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <motion.div
                key={step.stepNumber}
                id={`how-step-${step.stepNumber}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Timeline node */}
                <div className="relative mb-8">
                  {/* Outer spinning ring */}
                  <div className="absolute -inset-3 rounded-full border border-dashed border-brand-teal/40 group-hover:rotate-180 duration-1000 transition-transform"></div>
                  
                  {/* Main circular body */}
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-brand-dark/90 border-2 border-brand-teal text-brand-teal shadow-xl group-hover:scale-110 group-hover:border-brand-aqua group-hover:text-brand-aqua transition-all duration-300">
                    {getIcon(step.iconName)}

                    {/* Step badge */}
                    <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand-coral font-display text-sm font-black text-white shadow-md">
                      0{step.stepNumber}
                    </span>
                  </div>
                </div>

                {/* Text section */}
                <h3 className="font-display text-xl font-bold text-white group-hover:text-brand-aqua transition-colors">
                  {step.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating bottom promise bars */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
            <Clock className="h-6 w-6 text-brand-aqua shrink-0 mt-1" />
            <div>
              <h4 className="font-display font-bold text-sm text-white">Express Delivery Options</h4>
              <p className="mt-1 text-xs text-gray-400 font-light leading-relaxed">
                Need it fast? We offer 3-Hour dry-press options and 12-Hour standard wash returns for critical client needs in Warri GRA and Effurun.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
            <ShieldCheck className="h-6 w-6 text-brand-teal shrink-0 mt-1" />
            <div>
              <h4 className="font-display font-bold text-sm text-white">100% Damage Protection</h4>
              <p className="mt-1 text-xs text-gray-400 font-light leading-relaxed">
                We handle premium Senators, lace dresses, and silks with certified care tags. In the ultra-rare event of any damage, we replace the garment instantly.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <motion.button
            id="how-it-works-book-btn"
            onClick={onBookClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-full bg-brand-coral px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-brand-coral/20 hover:bg-brand-coral/90 cursor-pointer"
          >
            Schedule Your First Pickup Now <ChevronRight className="h-4 w-4" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
