import React from 'react';
import { PACKAGES } from '../data';
import { Check, Flame, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingPackagesProps {
  onSelectPackage: (packageId: string) => void;
}

export default function PricingPackages({ onSelectPackage }: PricingPackagesProps) {
  return (
    <section id="pricing-section" className="py-20 bg-brand-white relative overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-aqua/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-teal mb-3">
            Simple & Transparent Packages
          </span>
          <h2 className="font-display text-3xl font-black tracking-tight text-brand-dark sm:text-5xl">
            Flexible Care Plans
          </h2>
          <p className="mt-4 text-gray-500 text-sm sm:text-base font-light">
            No hidden fees. Choose a plan that fits your personal wardrobe, native wear rotation, or complete household laundry needs.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PACKAGES.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              id={`price-card-${pkg.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.isPopular
                  ? 'bg-brand-dark text-white ring-4 ring-brand-teal shadow-2xl scale-105 z-10'
                  : 'bg-white text-brand-dark border border-brand-teal/10 shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Popular ribbon */}
              {pkg.isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-brand-coral px-4 py-1 text-xs font-black uppercase tracking-wider text-white shadow-md">
                  <Flame className="h-3 w-3 fill-current animate-pulse" /> Most Popular
                </span>
              )}

              <div>
                {/* Header */}
                <div className="border-b border-gray-100/10 pb-6 mb-6">
                  <h3 className={`font-display text-xl font-bold ${pkg.isPopular ? 'text-brand-aqua' : 'text-brand-dark'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`mt-2 text-xs leading-relaxed ${pkg.isPopular ? 'text-gray-300' : 'text-gray-500'}`}>
                    {pkg.description}
                  </p>
                  
                  {/* Pricing */}
                  <div className="mt-5 flex items-baseline">
                    <span className="font-display text-4xl font-black tracking-tight">
                      {pkg.price}
                    </span>
                    <span className={`ml-2 text-xs font-semibold ${pkg.isPopular ? 'text-gray-400' : 'text-gray-500'}`}>
                      / {pkg.billing}
                    </span>
                  </div>
                </div>

                {/* Features checklist */}
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs">
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        pkg.isPopular ? 'bg-brand-teal/20 text-brand-aqua' : 'bg-brand-teal/10 text-brand-teal'
                      }`}>
                        <Check className="h-3 w-3 font-bold" />
                      </span>
                      <span className={pkg.isPopular ? 'text-gray-200' : 'text-gray-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                type="button"
                id={`pkg-select-btn-${pkg.id}`}
                onClick={() => onSelectPackage(pkg.id)}
                className={`w-full py-3.5 rounded-xl font-display text-xs font-extrabold uppercase tracking-widest transition-all cursor-pointer ${
                  pkg.isPopular
                    ? 'bg-brand-teal text-white hover:bg-brand-teal/90 shadow-lg shadow-brand-teal/20'
                    : 'bg-brand-dark text-white hover:bg-brand-dark/95'
                }`}
              >
                Choose This Plan
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQs and details */}
        <div className="mt-16 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
            <HelpCircle className="h-4 w-4 text-brand-teal" /> Custom corporate bundles or heavy commercial linens? <a href="#contact-section" className="text-brand-teal font-bold hover:underline">Contact our representative</a>
          </p>
        </div>

      </div>
    </section>
  );
}
