import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, MessageSquare, ArrowDown, ChevronRight, Check } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onNavigateToTab: (tab: string) => void;
}

export default function Hero({ onBookClick, onNavigateToTab }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeCounter, setActiveCounter] = useState({ customers: 0, turnaround: 0, rating: 0 });

  // Custom high-performance bubble & ripple simulation on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Bubble class definition
    class Bubble {
      x: number;
      y: number;
      radius: number;
      speed: number;
      sway: number;
      swaySpeed: number;
      opacity: number;
      hue: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.radius = Math.random() * 15 + 4;
        this.speed = Math.random() * 1.5 + 0.5;
        this.sway = Math.random() * 2 * Math.PI;
        this.swaySpeed = Math.random() * 0.02 + 0.005;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.hue = Math.random() * 30 + 175; // aqua-teal colors (175 to 205)
      }

      update() {
        this.y -= this.speed;
        this.sway += this.swaySpeed;
        this.x += Math.sin(this.sway) * 0.5;

        // Reset if off-screen
        if (this.y < -50) {
          this.y = height + Math.random() * 50;
          this.x = Math.random() * width;
          this.opacity = Math.random() * 0.4 + 0.1;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        // Gradient for glossy bubble effect
        const grad = c.createRadialGradient(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          this.radius * 0.1,
          this.x,
          this.y,
          this.radius
        );

        // Beautiful glassmorphic shine colors
        grad.addColorStop(0, `hsla(${this.hue}, 90%, 90%, ${this.opacity + 0.3})`);
        grad.addColorStop(0.4, `hsla(${this.hue}, 85%, 65%, ${this.opacity * 0.4})`);
        grad.addColorStop(1, `hsla(${this.hue}, 100%, 45%, ${this.opacity * 0.1})`);

        c.fillStyle = grad;
        c.shadowColor = `hsla(${this.hue}, 100%, 60%, 0.2)`;
        c.shadowBlur = 8;
        c.fill();

        // Highlight sheen point
        c.beginPath();
        c.arc(this.x - this.radius * 0.35, this.y - this.radius * 0.35, this.radius * 0.15, 0, Math.PI * 2);
        c.fillStyle = 'rgba(255, 255, 255, 0.7)';
        c.fill();

        c.restore();
      }
    }

    const bubbles: Bubble[] = Array.from({ length: 28 }, () => new Bubble());

    // Wave ripples
    let waveOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw dark ocean-teal gradient background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#091B1B'); // very deep teal
      bgGrad.addColorStop(0.5, '#0E2828');
      bgGrad.addColorStop(1, '#1A2E2E'); // match brand dark
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw soft water ripples at bottom
      waveOffset += 0.005;
      ctx.fillStyle = 'rgba(11, 191, 191, 0.03)';
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        const y = height - 120 + Math.sin(x * 0.005 + waveOffset) * 20 + Math.cos(x * 0.002 + waveOffset * 0.5) * 10;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Second layer of ripples
      ctx.fillStyle = 'rgba(6, 214, 160, 0.02)';
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        const y = height - 80 + Math.cos(x * 0.004 + waveOffset * 1.5) * 15 + Math.sin(x * 0.003 - waveOffset) * 12;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Update and Draw Bubbles
      bubbles.forEach((b) => {
        b.update();
        b.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Simple counting-up effect for hero metrics
  useEffect(() => {
    const duration = 2000; // ms
    const steps = 50;
    const stepTime = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setActiveCounter({
        customers: Math.round((580 / steps) * currentStep),
        turnaround: Math.round((3 / steps) * currentStep),
        rating: parseFloat(((4.9 / steps) * currentStep).toFixed(1))
      });

      if (currentStep >= steps) {
        setActiveCounter({ customers: 580, turnaround: 3, rating: 4.9 });
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  const businessNumber = '+2348163456789';
  const whatsappGreeting = encodeURIComponent("Hello FreshWave Laundry, I'm visiting your website and would love to ask about booking options.");

  return (
    <section id="hero-section" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" />

      {/* Modern Wave SVG Divider at the absolute bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-16 w-full fill-brand-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,53.05,22,79.51,32.74,157.3,64.24,242.06,69.58,321.39,56.44Z" />
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-aqua backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-brand-coral animate-spin-slow" /> Nigeria's Leading Eco-Premium Laundry
        </motion.div>

        {/* Oversized Dynamic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-6 font-display text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Fresh Clothes,
          <br />
          <span className="bg-gradient-to-r from-brand-teal via-brand-aqua to-brand-coral bg-clip-text text-transparent drop-shadow-sm">
            Zero Effort.
          </span>
        </motion.h1>

        {/* Subtitle / Promise */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 max-w-2xl text-base text-gray-300 md:text-lg lg:text-xl font-light leading-relaxed"
        >
          Experience laundry like never before. FreshWave delivers world-class, garment-saving care straight to your doorstep in <span className="font-semibold text-white">Warri City</span>.
        </motion.p>

        {/* Action Button Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <motion.button
            id="hero-book-cta"
            onClick={onBookClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 rounded-full bg-brand-coral px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-brand-coral/30 hover:bg-brand-coral/95 cursor-pointer"
          >
            <Calendar className="h-4.5 w-4.5" /> Book a Pickup
          </motion.button>

          <motion.a
            id="hero-whatsapp-cta"
            href={`https://wa.me/${businessNumber.replace('+', '')}?text=${whatsappGreeting}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 rounded-full border-2 border-brand-teal/40 bg-white/5 backdrop-blur-md px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-brand-teal/15 hover:border-brand-teal transition-all"
          >
            <MessageSquare className="h-4.5 w-4.5 text-brand-aqua" /> Chat on WhatsApp
          </motion.a>
        </motion.div>

        {/* Trust Indicators / Counters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 grid grid-cols-3 gap-6 sm:gap-12 md:gap-20 rounded-2xl bg-brand-dark/40 border border-white/5 p-6 backdrop-blur-md max-w-3xl w-full"
        >
          <div className="text-center">
            <div className="font-display text-2xl font-extrabold text-brand-teal sm:text-4xl">
              {activeCounter.customers}+
            </div>
            <div className="mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400">
              Happy Clients
            </div>
          </div>
          <div className="text-center border-x border-white/10">
            <div className="font-display text-2xl font-extrabold text-brand-aqua sm:text-4xl">
              {activeCounter.turnaround}-Hour
            </div>
            <div className="mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400">
              Express Option
            </div>
          </div>
          <div className="text-center">
            <div className="font-display text-2xl font-extrabold text-brand-coral sm:text-4xl">
              {activeCounter.rating}★
            </div>
            <div className="mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400">
              Google Rating
            </div>
          </div>
        </motion.div>

        {/* Scroll helper */}
        <div className="mt-12 animate-bounce cursor-pointer hidden sm:block" onClick={() => onNavigateToTab('services')}>
          <ArrowDown className="mx-auto h-5 w-5 text-gray-400 hover:text-brand-aqua transition-colors" />
        </div>
      </div>
    </section>
  );
}
