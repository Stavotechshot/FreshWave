import React from 'react';
import { motion } from 'motion/react';

export default function FloatingWhatsApp() {
  const businessNumber = '+2348163456789'; // Realistic Nigeria Phone number for Warri
  const message = 'Hello FreshWave Laundry, I would like to make an inquiry about your premium services in Warri City.';
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${businessNumber.replace('+', '')}?text=${encodedMessage}`;

  const handleWhatsAppClick = () => {
    // Trigger Google Analytics / Gtag event
    if (typeof window !== 'undefined') {
      const win = window as any;
      if (win.gtag) {
        win.gtag('event', 'whatsapp_button_click', {
          event_category: 'Lead Generation',
          event_label: 'WhatsApp Floating Button',
        });
      }
      
      // Support standard Google Tag Manager (dataLayer) push
      const dataLayer = win.dataLayer || [];
      dataLayer.push({
        event: 'whatsapp_button_click',
        timestamp: new Date().toISOString()
      });
      win.dataLayer = dataLayer;

      // Dispatch custom window event
      const customEvent = new CustomEvent('whatsapp_button_click', {
        detail: { timestamp: new Date().toISOString() }
      });
      window.dispatchEvent(customEvent);
    }
    console.log("Analytics event 'whatsapp_button_click' triggered successfully");
  };

  return (
    <motion.div
      id="floating-whatsapp-container"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring' }}
    >
      {/* Hidden-by-default hover text label */}
      <span className="pointer-events-none select-none rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl border border-white/10 translate-x-2 group-hover:translate-x-0">
        Chat with us
      </span>

      <motion.a
        id="whatsapp-floating-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl hover:bg-emerald-600 transition-colors"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Pulsing ring 1 */}
        <span className="absolute -inset-2 rounded-full border-2 border-emerald-500/40 animate-ping pointer-events-none" />
        {/* Pulsing ring 2 */}
        <span className="absolute -inset-4 rounded-full border border-emerald-500/20 animate-pulse pointer-events-none" />
        
        {/* SVG custom styled WhatsApp icon */}
        <svg
          className="h-7 w-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </motion.div>
  );
}
