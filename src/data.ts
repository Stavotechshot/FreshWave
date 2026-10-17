import { LaundryService, AccessoryProduct, Testimonial, HowItWorksStep, PricingPackage } from './types';

export const SERVICES: LaundryService[] = [
  {
    id: 'wash-fold',
    name: 'Wash & Fold',
    description: 'Perfect for regular everyday garments, activewear, bedsheets, and towels. Cleaned with premium, skin-safe eco-detergents and folded to perfection.',
    priceDescription: 'From ₦800 / kg',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebd01?q=80&w=600&auto=format&fit=crop',
    iconName: 'Sparkles',
    benefits: [
      'Eco-friendly deep steam washing',
      'Careful sorting by color and fabric type',
      'Hypoallergenic detergent options available',
      'Professional, ultra-neat folding layout'
    ],
    duration: '24-Hour Standard Turnaround'
  },
  {
    id: 'dry-cleaning',
    name: 'Dry Cleaning',
    description: 'Specialized chemical-free solvent treatment for delicate garments like suits, wedding gowns, traditional lace, silk, and heavy woolens.',
    priceDescription: 'From ₦2,500 / garment',
    image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?q=80&w=600&auto=format&fit=crop',
    iconName: 'Shirt',
    benefits: [
      'Premium fabric-safe solvents used',
      'Individual item stain pre-treatment',
      'Perfect steam press crease alignment',
      'Returned on hangers in dust bags'
    ],
    duration: '48-Hour Professional Care'
  },
  {
    id: 'pickup-delivery',
    name: 'Pickup & Delivery',
    description: 'Full-service doorstep collection and delivery across Warri City. Sit back, relax, and let us handle the logistics in custom-branded transit bags.',
    priceDescription: '₦1,500 Flat Rate (Warri & Environs)',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop',
    iconName: 'Truck',
    benefits: [
      'Real-time GPS delivery updates',
      'Contactless pickup/drop-off options',
      'Secure transit bags provided',
      'Covering GRA, Effurun, Enerhen, Airport Rd'
    ],
    duration: 'Scheduled Convenience'
  },
  {
    id: 'accessories-shop',
    name: 'Accessories Shop',
    description: 'A curated selection of premium laundry care supplies to extend the lifespan of your garments and keep your home wardrobe smelling tropical.',
    priceDescription: 'Accessories from ₦2,800',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=600&auto=format&fit=crop',
    iconName: 'ShoppingBag',
    benefits: [
      'Velvet non-slip velvet hangers',
      'Luxury concentrated fabric softeners',
      'Eco-friendly multi-surface garment care',
      'Heavy-duty canvas breathable storage bags'
    ],
    duration: 'Instant Direct Purchase'
  }
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    stepNumber: 1,
    title: 'Schedule Pick Up',
    description: 'Select your preferred service package, pick-up date, and time slot using our simple booking form or via WhatsApp.',
    iconName: 'CalendarDays'
  },
  {
    stepNumber: 2,
    title: 'We Collect & Clean',
    description: 'Our Delivery Champion collects your items. Our master launders pre-treat, deep clean, dry, and iron with extreme attention to detail.',
    iconName: 'ConciergeBell'
  },
  {
    stepNumber: 3,
    title: 'Delivered Fresh',
    description: 'Your clothes are returned to your doorstep in Warri City looking, feeling, and smelling completely refreshed within 24-48 hours.',
    iconName: 'Sparkles'
  }
];

export const ACCESSORIES: AccessoryProduct[] = [
  {
    id: 'eco-pods',
    name: 'Premium Eco Detergent Pods',
    description: 'Highly concentrated, pre-measured laundry capsules with dual-chamber action. Easily removes tough red mud and oil stains typical of Delta terrain without fading fabrics.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=600&auto=format&fit=crop',
    category: 'detergents',
    rating: 4.8,
    stockStatus: 'In Stock',
    volume: 'Pack of 20 Pods'
  },
  {
    id: 'lavender-softener',
    name: 'Luxury Lavender Fabric Softener',
    description: 'Infused with organic French lavender oils and tropical conditioning agents. Relaxes fabric fibers, eliminates static cling, and leaves a high-end therapeutic scent.',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600&auto=format&fit=crop',
    category: 'softeners',
    rating: 4.9,
    stockStatus: 'In Stock',
    volume: '1.2 Litres'
  },
  {
    id: 'velvet-hangers',
    name: 'Velvet Non-Slip Garment Hangers',
    description: 'Ultra-slim profile velvet hangers designed to preserve the shoulder structure of delicate linen suits, lace dresses, and heavy native attire while maximizing closet space.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=600&auto=format&fit=crop',
    category: 'storage',
    rating: 4.7,
    stockStatus: 'In Stock',
    volume: '10-Pack Black Velvet'
  },
  {
    id: 'canvas-garment-bags',
    name: 'Breathable Suit & Dress Garment Bags',
    description: 'High-quality cotton canvas dust covers with heavy-duty full zippers. Keeps moisture, dust, and moths far away from your premium senator wear, traditional attire, and gowns.',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600&auto=format&fit=crop',
    category: 'storage',
    rating: 4.6,
    stockStatus: 'Low Stock',
    volume: '2-Pack Medium & Large'
  },
  {
    id: 'scented-sheets',
    name: 'FreshWave Tropical Dryer Sheets',
    description: 'Fragrant dryer and drawer sheets designed for Nigerian wardrobes. Simply slip a sheet between your folded senator native wear to repel stuffiness and keep a fresh laundry aroma.',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=600&auto=format&fit=crop',
    category: 'softeners',
    rating: 4.5,
    stockStatus: 'In Stock',
    volume: 'Pack of 40 Sheets'
  },
  {
    id: 'cedar-blocks',
    name: 'Organic Cedar Moth Repellents',
    description: '100% natural aromatic Eastern Red Cedar blocks. Releases a subtle forest fragrance that naturally protects expensive fabrics like cotton lace, silk, and woolens in drawers.',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?q=80&w=600&auto=format&fit=crop',
    category: 'care',
    rating: 4.8,
    stockStatus: 'In Stock',
    volume: '12-Pack Blocks'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Okiemute P.',
    role: 'Corporate Professional, Effurun GRA',
    content: 'FreshWave has restored my weekends! I used to waste half of Saturday doing heavy laundry. Their scheduled pickup and 24-hour turnaround is seamless. My corporate shirts return looking razor-sharp and folded perfectly.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 't2',
    name: 'Dr. Ese E.',
    role: 'Consultant, Delta State University Teaching Hospital',
    content: "I am extremely particular about hygiene and the whitening of my medical scrubs. FreshWave's eco-detergents keep my whites blindingly white without any chemical odor. Absolute trust in their delicate handling.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 't3',
    name: 'Amanda O.',
    role: 'Mother of 3, Enerhen Road',
    content: "With three hyperactive kids, laundry was an endless nightmare. The flat-rate pickup and delivery has been a lifesaver. Everything comes back packaged separately in fragrance-fresh bags. I recommend them to all busy moms!",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 't4',
    name: 'Tari E.',
    role: 'Entrepreneur & Designer, Airport Road',
    content: "Their dry cleaning is truly premium. Traditional lace and rich hand-embroidered Senator attire require delicate care, and they deliver precisely that. I also bought their velvet hangers which are fantastic for my wardrobe.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
  }
];

export const PACKAGES: PricingPackage[] = [
  {
    id: 'pay-by-kg',
    name: 'Eco-Weight Wash',
    price: '₦800',
    billing: 'per Kilogram',
    description: 'Perfect for regular casual clothes, t-shirts, shorts, trousers, bedsheets, and towels.',
    features: [
      'Standard wash & fold care',
      'Deep hypoallergenic detergent wash',
      'Fabric softening treatment included',
      'Delivered in custom eco-transit bags',
      '24-Hour standard delivery'
    ]
  },
  {
    id: 'premium-senator',
    name: 'Royal Care Suit',
    price: '₦12,500',
    billing: 'monthly bundle (5 outfits)',
    description: 'Tailored for professionals who wear native senator apparel, traditional lace, or executive suits.',
    features: [
      'Delicate chemical-free solvent dry cleaning',
      'Exclusive steam iron crease profiling',
      'Dust-resistant breathable canvas garment bags',
      'Complimentary velvet hangers provided',
      'Priority pickup & express return'
    ],
    isPopular: true
  },
  {
    id: 'family-fresh',
    name: 'Family Wave Bundle',
    price: '₦28,000',
    billing: 'monthly subscription',
    description: 'All-inclusive home linen and apparel solution designed to relieve busy households completely.',
    features: [
      'Up to 40kg of standard laundry per month',
      'Unlimited scheduled pickup & deliveries',
      'Separate color sorting and special-care wash',
      'Express turnaround (12 hours when requested)',
      '10% Discount on all accessories shop items'
    ]
  }
];
