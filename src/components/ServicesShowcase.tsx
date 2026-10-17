import React from 'react';
import { SERVICES } from '../data';
import { LaundryService } from '../types';
import { Sparkles, Shirt, Truck, ShoppingBag, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesShowcaseProps {
  onBookService: (serviceId: string) => void;
  onNavigateToTab: (tab: string) => void;
  standalone?: boolean;
}

export default function ServicesShowcase({ onBookService, onNavigateToTab, standalone = false }: ServicesShowcaseProps) {
  
  // Dynamic icon helper to load correct Lucide icon
  const renderIcon = (iconName: string) => {
    const iconClass = "h-7 w-7 text-brand-teal";
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className={iconClass} />;
      case 'Shirt':
        return <Shirt className={iconClass} />;
      case 'Truck':
        return <Truck className={iconClass} />;
      case 'ShoppingBag':
        return <ShoppingBag className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  return (
    <section id="services-section" className={`py-20 bg-brand-white relative ${standalone ? 'pt-28' : ''}`}>
      {/* Background blobs for eco-premium feel */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-brand-aqua/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-teal mb-3">
            Our Premium Offerings
          </span>
          <h2 className="font-display text-3xl font-black tracking-tight text-brand-dark sm:text-5xl">
            World-Class Garment Care
          </h2>
          <p className="mt-4 text-gray-500 text-sm sm:text-base">
            From everyday casuals to highly delicate Senator wears, we treat every single fiber with pristine eco-friendly care. Hover or tap each card to flip and explore.
          </p>
        </div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              id={`service-card-wrapper-${service.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-[420px] w-full perspective-1000 group cursor-pointer"
            >
              {/* Inner card containing front & back */}
              <div className="relative w-full h-full duration-700 transform-style-3d group-hover:rotate-y-180 shadow-lg hover:shadow-xl rounded-3xl border border-brand-teal/10">
                
                {/* CARD FRONT */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden bg-white flex flex-col justify-between">
                  {/* Image banner */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Teal Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent"></div>
                    
                    {/* Float price tag */}
                    <div className="absolute bottom-4 left-4 bg-brand-coral text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                      {service.priceDescription}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-teal/10">
                          {renderIcon(service.iconName)}
                        </div>
                        <h3 className="font-display text-lg font-bold text-brand-dark">
                          {service.name}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-bold text-brand-teal pt-4 border-t border-gray-50/50">
                      <span>{service.duration}</span>
                      <span className="flex items-center gap-1 text-brand-coral group-hover:translate-x-1 transition-transform">
                        Flip card <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* CARD BACK */}
                <div className="absolute inset-0 w-full h-full rotate-y-180 backface-hidden rounded-3xl overflow-hidden bg-brand-dark text-white p-6 flex flex-col justify-between border border-brand-teal/40">
                  
                  {/* Header info */}
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-xl bg-brand-teal/20 text-brand-teal">
                          {renderIcon(service.iconName)}
                        </span>
                        <h4 className="font-display font-bold text-base text-brand-aqua">
                          {service.name}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-gray-400">
                        Details
                      </span>
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-3">
                      <p className="text-[11px] text-gray-300 font-light leading-relaxed">
                        What's included in this premium service tier:
                      </p>
                      <ul className="space-y-2.5">
                        {service.benefits.map((benefit, bIndex) => (
                          <li key={bIndex} className="flex items-start gap-2 text-xs text-gray-100">
                            <CheckCircle className="h-3.5 w-3.5 text-brand-aqua shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions based on card category */}
                  <div className="space-y-3">
                    <div className="text-center py-1.5 rounded bg-white/5 border border-white/5 text-[11px] font-bold text-brand-aqua font-mono">
                      {service.priceDescription}
                    </div>
                    {service.id === 'accessories-shop' ? (
                      <button
                        type="button"
                        id={`shop-cta-${service.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToTab('accessories');
                        }}
                        className="w-full rounded-2xl bg-brand-teal py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-teal/90 transition-all text-center block"
                      >
                        Browse Supplies Catalog
                      </button>
                    ) : (
                      <button
                        type="button"
                        id={`book-cta-${service.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookService(service.id);
                        }}
                        className="w-full rounded-2xl bg-brand-coral py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-coral/90 transition-all text-center block"
                      >
                        Book This Pickup
                      </button>
                    )}
                  </div>

                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
