/**
 * Types and interfaces for FreshWave Laundry website
 */

export interface LaundryService {
  id: string;
  name: string;
  description: string;
  priceDescription: string;
  image: string;
  iconName: string;
  benefits: string[];
  duration: string;
}

export interface AccessoryProduct {
  id: string;
  name: string;
  description: string;
  price: number; // in Nigerian Naira (₦)
  image: string;
  category: 'detergents' | 'softeners' | 'care' | 'storage';
  rating: number;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  volume?: string; // e.g. "1 Litre", "15 pods"
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface HowItWorksStep {
  stepNumber: number;
  title: string;
  description: string;
  iconName: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  billing: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface BookingData {
  name: string;
  phone: string;
  address: string;
  serviceType: string;
  pickupDate: string;
  pickupTime: string;
  specialInstructions: string;
}
