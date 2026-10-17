import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Calendar, Clock, MapPin, User, Phone, Sparkles, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { BookingData } from '../types';

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceType?: string;
}

export default function BookingFormModal({ isOpen, onClose, initialServiceType = 'wash-fold' }: BookingFormModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    phone: '',
    address: '',
    serviceType: initialServiceType,
    pickupDate: '',
    pickupTime: '',
    specialInstructions: ''
  });
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const businessNumber = '+2348163456789';

  const servicesMap: Record<string, string> = {
    'wash-fold': 'Wash & Fold (Regular Care)',
    'dry-cleaning': 'Dry Cleaning (Premium Care)',
    'pickup-delivery': 'Special Doorstep Delivery',
    'accessories-shop': 'Accessories / Store Order'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.name.trim()) return 'Please enter your full name.';
      if (!formData.phone.trim()) return 'Please enter your phone number.';
      if (formData.phone.replace(/[^0-9]/g, '').length < 8) return 'Please enter a valid phone number.';
    } else if (step === 2) {
      if (!formData.address.trim()) return 'Please enter your pickup address in Warri.';
      if (!formData.pickupDate) return 'Please select a pickup date.';
      if (!formData.pickupTime) return 'Please select a preferred pickup time slot.';
    }
    return '';
  };

  const nextStep = () => {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError('');
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }

    // Generate WhatsApp Message
    const formattedDate = new Date(formData.pickupDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const waMessage = `✨ *FRESHWAVE LAUNDRY BOOKING* ✨\n\n` +
      `Hello FreshWave, I'd like to book a premium laundry pickup!\n\n` +
      `👤 *Customer Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `🧺 *Service Type:* ${servicesMap[formData.formDataKey || formData.serviceType] || formData.serviceType}\n` +
      `📍 *Pickup Address:* ${formData.address}\n` +
      `📅 *Preferred Date:* ${formattedDate}\n` +
      `🕒 *Time Window:* ${formData.pickupTime}\n` +
      `💬 *Instructions:* ${formData.specialInstructions || 'None provided'}\n\n` +
      `Please confirm my booking slot. Thank you!`;

    const encodedMsg = encodeURIComponent(waMessage);
    const whatsappUrl = `https://wa.me/${businessNumber.replace('+', '')}?text=${encodedMsg}`;

    setIsSubmitted(true);

    // Open WhatsApp after a brief beautiful delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 2200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/60 p-4 backdrop-blur-sm">
        <motion.div
          id="booking-modal-card"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-brand-teal/20"
        >
          {/* Header background pattern */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-teal via-brand-aqua to-brand-coral"></div>

          {/* Close button */}
          <button
            id="close-booking-modal"
            onClick={onClose}
            className="absolute top-5 right-5 z-10 rounded-full bg-brand-white/80 p-2 text-brand-dark/70 hover:bg-brand-teal/10 hover:text-brand-teal transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {!isSubmitted ? (
            <div className="p-6 md:p-8">
              {/* Title */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-semibold text-brand-teal">
                  <Sparkles className="h-3 w-3 animate-spin" /> Premium Booking Engine
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-brand-dark">
                  Book Your Fresh Pickup
                </h3>
                <p className="text-sm text-gray-500">
                  We collect, clean, and deliver in Warri City.
                </p>
              </div>

              {/* Step indicator */}
              <div className="mb-6 flex items-center justify-between">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex flex-1 items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                        step === num
                          ? 'bg-brand-teal text-white ring-4 ring-brand-teal/20'
                          : step > num
                          ? 'bg-brand-aqua text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {step > num ? '✓' : num}
                    </div>
                    {num < 3 && (
                      <div
                        className={`mx-2 h-1 flex-1 rounded transition-colors ${
                          step > num ? 'bg-brand-aqua' : 'bg-gray-100'
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Error Box */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-600 border border-red-100"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* STEP 1: Contact Details */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark/75 mb-1.5">
                        Your Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute top-3.5 left-3.5 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Okiemute Paul"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-brand-dark placeholder-gray-400 outline-none focus:border-brand-teal focus:bg-white focus:ring-1 focus:ring-brand-teal transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark/75 mb-1.5">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute top-3.5 left-3.5 h-4 w-4 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. 08163456789"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-brand-dark placeholder-gray-400 outline-none focus:border-brand-teal focus:bg-white focus:ring-1 focus:ring-brand-teal transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark/75 mb-1.5">
                        Service Selected
                      </label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-brand-dark outline-none focus:border-brand-teal focus:bg-white focus:ring-1 focus:ring-brand-teal transition-all"
                      >
                        <option value="wash-fold">Wash & Fold (₦800/kg)</option>
                        <option value="dry-cleaning">Dry Cleaning (₦2,500/piece)</option>
                        <option value="pickup-delivery">Express Delivery Booking</option>
                        <option value="accessories-shop">Laundry Supplies Order</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Address & Timing */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark/75 mb-1.5">
                        Pickup Address in Warri
                      </label>
                      <div className="relative">
                        <MapPin className="absolute top-3.5 left-3.5 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="e.g. Block D3, GRA Phase 1, Warri"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-brand-dark placeholder-gray-400 outline-none focus:border-brand-teal focus:bg-white focus:ring-1 focus:ring-brand-teal transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark/75 mb-1.5">
                          Pickup Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute top-3.5 left-3.5 h-4 w-4 text-gray-400" />
                          <input
                            type="date"
                            name="pickupDate"
                            value={formData.pickupDate}
                            onChange={handleInputChange}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-brand-dark outline-none focus:border-brand-teal focus:bg-white focus:ring-1 focus:ring-brand-teal transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark/75 mb-1.5">
                          Time Slot
                        </label>
                        <div className="relative">
                          <Clock className="absolute top-3.5 left-3.5 h-4 w-4 text-gray-400" />
                          <select
                            name="pickupTime"
                            value={formData.pickupTime}
                            onChange={handleInputChange}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-brand-dark outline-none focus:border-brand-teal focus:bg-white focus:ring-1 focus:ring-brand-teal transition-all"
                            required
                          >
                            <option value="">Select slot</option>
                            <option value="Morning (8:00 AM - 11:00 AM)">Morning (8-11 AM)</option>
                            <option value="Midday (11:00 AM - 2:00 PM)">Midday (11 AM-2 PM)</option>
                            <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2-5 PM)</option>
                            <option value="Evening (5:00 PM - 7:00 PM)">Evening (5-7 PM)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Special Instructions */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark/75 mb-1.5">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        name="specialInstructions"
                        value={formData.specialInstructions}
                        onChange={handleInputChange}
                        placeholder="e.g., Heavy starch for native senator fabrics, separate delicate laces, or ring door bell on arrival."
                        rows={3}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-brand-dark placeholder-gray-400 outline-none focus:border-brand-teal focus:bg-white focus:ring-1 focus:ring-brand-teal transition-all resize-none"
                      ></textarea>
                    </div>

                    {/* Order summary card */}
                    <div className="rounded-2xl bg-brand-white p-4 border border-brand-teal/10 space-y-2">
                      <h4 className="text-xs font-bold uppercase text-brand-teal tracking-widest">
                        Booking Summary
                      </h4>
                      <div className="grid grid-cols-2 gap-y-1.5 text-xs text-gray-600">
                        <span className="font-medium">Name:</span>
                        <span className="text-right text-brand-dark font-semibold">{formData.name}</span>
                        
                        <span className="font-medium">Service:</span>
                        <span className="text-right text-brand-dark font-semibold">{servicesMap[formData.serviceType]}</span>
                        
                        <span className="font-medium">Pickup Time:</span>
                        <span className="text-right text-brand-dark font-semibold">{formData.pickupDate} ({formData.pickupTime.split(' ')[0]})</span>

                        <span className="font-medium">Address:</span>
                        <span className="text-right text-brand-dark font-semibold truncate max-w-[150px] inline-block">{formData.address}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" /> Back
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-brand-teal py-3 text-sm font-semibold text-white hover:bg-brand-teal-dark shadow-md hover:shadow-lg transition-all"
                    >
                      Continue <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand-coral py-3 text-sm font-bold text-white hover:bg-brand-coral/95 shadow-md hover:shadow-lg transition-all"
                    >
                      <MessageSquare className="h-4 w-4" /> Confirm & Send WhatsApp
                    </button>
                  )}
                </div>
              </form>
            </div>
          ) : (
            /* Submission Success screen */
            <div className="p-8 text-center flex flex-col items-center justify-center space-y-6">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [1, 1.15, 1], opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-aqua/15 text-brand-aqua"
              >
                <CheckCircle2 className="h-12 w-12" />
              </motion.div>

              <div>
                <h3 className="font-display text-2xl font-bold text-brand-dark">
                  Booking Initialized!
                </h3>
                <p className="mt-2 text-sm text-gray-500 max-w-sm">
                  We are launching WhatsApp on your device to confirm your pickup slot with our dispatcher. A digital confirmation receipt has also been queued.
                </p>
              </div>

              {/* Receipt mockup */}
              <div className="w-full rounded-2xl bg-brand-white p-5 text-left border border-brand-aqua/20 space-y-2.5">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-[10px] font-bold uppercase text-brand-teal tracking-wider">FreshWave Dispatcher</span>
                  <span className="text-xs bg-brand-aqua/10 text-brand-aqua px-2 py-0.5 rounded-full font-bold font-mono">QUEUED</span>
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Ticket ID:</span>
                    <span className="font-mono font-semibold text-brand-dark">FW-{(Math.random() * 10000).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Client:</span>
                    <span className="font-semibold text-brand-dark">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>City:</span>
                    <span className="font-semibold text-brand-dark">Warri, Nigeria</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-400 flex items-center gap-1.5 animate-pulse">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500"></span> Redirecting to WhatsApp...
              </div>

              <button
                onClick={onClose}
                className="w-full rounded-xl bg-gray-100 py-2.5 text-xs font-semibold text-brand-dark hover:bg-gray-200 transition-colors"
              >
                Close Window
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
