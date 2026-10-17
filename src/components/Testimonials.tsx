import React, { useState } from 'react';
import { TESTIMONIALS } from '../data';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? TESTIMONIALS.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === TESTIMONIALS.length - 1 ? 0 : prevIdx + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials-section" className="py-20 bg-brand-white relative overflow-hidden">
      {/* Wave shape separator top */}
      <div className="absolute top-0 left-0 right-0 z-10 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-10 w-full fill-brand-dark">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,53.05,22,79.51,32.74,157.3,64.24,242.06,69.58,321.39,56.44Z" />
        </svg>
      </div>

      {/* Decorative quotes background */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 text-neutral-100 dark:text-neutral-50/5 font-display text-[200px] leading-none pointer-events-none select-none font-black opacity-30">
        “
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-teal mb-3">
            Real Reviews, Real Trust
          </span>
          <h2 className="font-display text-3xl font-black tracking-tight text-brand-dark sm:text-5xl">
            Loved in Warri City
          </h2>
          <p className="mt-4 text-gray-500 text-sm sm:text-base font-light">
            We measure our success by the smiles on our customers' faces and the pristine crispness of their garments. Here is what Warri residents have to say.
          </p>
        </div>

        {/* Carousel Slider */}
        <div className="max-w-4xl mx-auto relative px-4">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl bg-white p-8 md:p-12 border border-brand-teal/15 shadow-xl relative"
            >
              <Quote className="absolute top-6 right-8 h-10 w-10 text-brand-teal/10 rotate-180" />

              {/* Star Rating */}
              <div className="flex gap-1 text-amber-400 mb-6">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>

              {/* Comment Content */}
              <blockquote className="font-display text-lg sm:text-xl font-medium text-brand-dark leading-relaxed italic">
                "{current.content}"
              </blockquote>

              {/* Profile info */}
              <div className="mt-8 flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  referrerPolicy="no-referrer"
                  className="h-14 w-14 rounded-full object-cover border-2 border-brand-teal/35 shadow-md"
                />
                <div>
                  <h4 className="font-display font-bold text-base text-brand-dark">{current.name}</h4>
                  <p className="text-xs text-brand-teal font-medium uppercase tracking-wider">{current.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider controls */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              id="testimonial-prev-btn"
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white border border-brand-teal/10 text-brand-dark hover:bg-brand-teal/10 hover:text-brand-teal transition-all cursor-pointer shadow-sm"
              title="Previous Testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              id="testimonial-next-btn"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-dark text-white hover:bg-brand-teal transition-all cursor-pointer shadow-md"
              title="Next Testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
