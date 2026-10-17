import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const API_KEY =
  (
    process.env.GOOGLE_MAPS_PLATFORM_KEY ||
    (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
    (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
    ''
  ).trim();

// Google Maps API keys can have different prefixes (such as AIza, AQ, etc.) and lengths.
// We screen out empty values and dummy templates.
const isGoogleMapsKeyValid = (key: string): boolean => {
  if (!key) return false;
  const normalized = key.trim().toLowerCase();
  if (normalized.includes('your_api_key') || normalized.includes('placeholder') || normalized.includes('dummy')) {
    return false;
  }
  return key.trim().length >= 20;
};

const hasValidKey = isGoogleMapsKeyValid(API_KEY);

interface ContactSectionProps {
  standalone?: boolean;
}

export default function ContactSection({ standalone = false }: ContactSectionProps) {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const businessNumber = '+2348163456789';
  const encodedGreeting = encodeURIComponent("Hello FreshWave Laundry, I'd like to ask a general question about your services.");

  return (
    <section id="contact-section" className={`py-20 bg-brand-white relative ${standalone ? 'pt-28' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-teal mb-3">
            Get in Touch
          </span>
          <h2 className="font-display text-3xl font-black tracking-tight text-brand-dark sm:text-5xl">
            Contact FreshWave
          </h2>
          <p className="mt-4 text-gray-500 text-sm sm:text-base font-light">
            Have inquiries about fabric care, pickup slots, or custom subscriptions? Reach out to our customer champions. We are here to support you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Column 1: Info & Map (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="rounded-2xl bg-white p-5 border border-brand-teal/10 shadow-sm flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-brand-dark">Our Location</h4>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                    24 GRA Avenue, Effurun-Warri,<br />Delta State, Nigeria
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 border border-brand-teal/10 shadow-sm flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-aqua/10 text-brand-aqua">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-brand-dark">Call or Text</h4>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                    +234 816 345 6789<br />+234 810 999 8888
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 border border-brand-teal/10 shadow-sm flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-coral/10 text-brand-coral">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-brand-dark">Email Support</h4>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                    hello@freshwavelaundry.com<br />support@freshwave.com
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 border border-brand-teal/10 shadow-sm flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-dark/10 text-brand-dark">
                  <Clock className="h-5 w-5 text-brand-dark" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-brand-dark">Working Hours</h4>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed font-semibold text-emerald-600">
                    Mon - Sat: 7am - 7pm<br />Sunday: 12pm - 5pm
                  </p>
                </div>
              </div>

            </div>

            {/* REAL GOOGLE MAP OR STYLED SPLASH IF KEY MISSING */}
            {!hasValidKey ? (
              <div className="rounded-3xl border border-brand-teal/15 bg-neutral-50 p-6 shadow-inner relative overflow-hidden h-96 flex flex-col items-center justify-center text-center">
                <div className="max-w-md space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-black text-lg text-brand-dark">
                    Google Maps API Key Required
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    To view our interactive GRA Warri HQ location, please provide a Google Maps Platform API key.
                  </p>
                  <div className="text-left bg-white border border-brand-teal/10 rounded-2xl p-4 space-y-2 text-[11px] text-gray-600 shadow-sm">
                    <p><strong>Step 1:</strong> Get a key at <a href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" target="_blank" rel="noopener noreferrer" className="text-brand-teal font-bold hover:underline">Google Maps Platform</a></p>
                    <p><strong>Step 2:</strong> Open <strong>Settings</strong> (⚙️ gear icon, top-right) → <strong>Secrets</strong></p>
                    <p><strong>Step 3:</strong> Name it <code>GOOGLE_MAPS_PLATFORM_KEY</code> and paste your key</p>
                  </div>
                  <p className="text-[10px] text-brand-teal font-semibold animate-pulse">
                    The app will rebuild and activate the interactive map automatically!
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-brand-teal/15 shadow-md overflow-hidden h-96 relative">
                <APIProvider apiKey={API_KEY} version="weekly">
                  <Map
                    defaultCenter={{ lat: 5.5539, lng: 5.7601 }}
                    defaultZoom={15}
                    mapId="DEMO_MAP_ID"
                    internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <AdvancedMarker position={{ lat: 5.5539, lng: 5.7601 }} title="FreshWave Laundry GRA HQ">
                      <Pin background="#0ea5e9" glyphColor="#fff" borderColor="#0369a1" />
                    </AdvancedMarker>
                  </Map>
                </APIProvider>
                {/* Float tag on the map */}
                <div className="absolute top-4 left-4 rounded-xl bg-white/95 backdrop-blur-md px-3.5 py-2.5 border border-brand-teal/15 shadow-lg flex flex-col pointer-events-none z-10">
                  <span className="block text-[9px] font-bold uppercase tracking-widest text-brand-teal">Service Range</span>
                  <p className="text-xs font-extrabold text-brand-dark">All Warri City, Effurun, GRA, Airport Rd</p>
                </div>
              </div>
            )}

          </div>

          {/* Column 2: Message Form (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white p-6 md:p-8 border border-brand-teal/10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-teal to-brand-aqua"></div>

              <h3 className="font-display text-xl font-bold text-brand-dark mb-1">
                Drop us a Line
              </h3>
              <p className="text-xs text-gray-400 mb-6 font-light">
                Send an offline memo and we will reply within 2 hours.
              </p>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark/70 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g., Okiemute Paul"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-brand-dark placeholder-gray-400 outline-none focus:border-brand-teal focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark/70 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g., okiemute@gmail.com"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-brand-dark placeholder-gray-400 outline-none focus:border-brand-teal focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-dark/70 mb-1.5">
                        Message
                      </label>
                      <textarea
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="How can we assist you with your premium garments today?"
                        rows={4}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-brand-dark placeholder-gray-400 outline-none focus:border-brand-teal focus:bg-white transition-all resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-dark py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-dark/95 transition-all cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5 text-brand-aqua" /> Send Message
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center flex flex-col items-center justify-center space-y-4"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-brand-dark">Message Dispatched!</h4>
                      <p className="mt-1.5 text-xs text-gray-500 max-w-xs leading-relaxed">
                        Thank you for contacting FreshWave, <strong>{formState.name}</strong>. Our Warri-based front desk has received your ticket and is preparing a dispatch response.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Immediate response?</span>
                <a
                  id="contact-wa-link"
                  href={`https://wa.me/${businessNumber.replace('+', '')}?text=${encodedGreeting}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:underline"
                >
                  <MessageSquare className="h-3.5 w-3.5" /> Chat dispatcher
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
