import React, { useState } from 'react';
import { ACCESSORIES } from '../data';
import { AccessoryProduct } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Star, Info, MessageSquare, Check, X, Tag } from 'lucide-react';

interface AccessoriesShopProps {
  standalone?: boolean;
}

export default function AccessoriesShop({ standalone = false }: AccessoriesShopProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<AccessoryProduct | null>(null);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'detergents', label: 'Detergents' },
    { id: 'softeners', label: 'Softeners & Dryer sheets' },
    { id: 'storage', label: 'Wardrobe Storage' },
    { id: 'care', label: 'Special Care' }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? ACCESSORIES
    : ACCESSORIES.filter(p => p.category === selectedCategory);

  const handleOrderWhatsApp = (product: AccessoryProduct) => {
    const businessNumber = '+2348163456789';
    const formattedPrice = `₦${product.price.toLocaleString()}`;
    const orderMessage = `🛒 *FRESHWAVE SUPPLY ORDER* 🛒\n\n` +
      `Hello FreshWave Laundry, I would like to order this premium accessory from your catalog:\n\n` +
      `📦 *Product:* ${product.name}\n` +
      `📏 *Size/Volume:* ${product.volume || 'N/A'}\n` +
      `💵 *Price:* ${formattedPrice}\n\n` +
      `Please let me know how we can schedule payment and delivery within Warri City. Thank you!`;

    const encoded = encodeURIComponent(orderMessage);
    window.open(`https://wa.me/${businessNumber.replace('+', '')}?text=${encoded}`, '_blank');
  };

  return (
    <section id="accessories-shop-section" className={`py-20 bg-brand-white relative ${standalone ? 'pt-28' : ''}`}>
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-brand-aqua/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-teal mb-3">
            Garment Longevity Supplies
          </span>
          <h2 className="font-display text-3xl font-black tracking-tight text-brand-dark sm:text-5xl">
            Accessories & Care Shop
          </h2>
          <p className="mt-4 text-gray-500 text-sm sm:text-base font-light">
            Preserve the pristine look, feel, and fragrance of your native wears and premium linens. Direct delivery straight to your doorstep across Warri City.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-brand-teal text-white shadow-md'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                id={`product-card-${product.id}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-4 border border-brand-teal/10 shadow-md hover:shadow-xl transition-all"
              >
                <div>
                  {/* Photo container */}
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-gray-100 mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Category tag */}
                    <span className="absolute top-3 left-3 rounded-full bg-brand-dark/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-brand-aqua backdrop-blur-md">
                      {product.category}
                    </span>

                    {/* Vol tag */}
                    {product.volume && (
                      <span className="absolute bottom-3 right-3 rounded-full bg-brand-teal/90 px-2.5 py-1 text-[9px] font-bold text-white">
                        {product.volume}
                      </span>
                    )}
                  </div>

                  {/* Title & ratings */}
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-display font-bold text-base text-brand-dark group-hover:text-brand-teal transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0 text-amber-400 text-xs">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="font-bold text-brand-dark">{product.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                    {product.description}
                  </p>
                </div>

                {/* Pricing & details button */}
                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Price</span>
                    <span className="font-display font-extrabold text-lg text-brand-dark">
                      ₦{product.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      id={`info-btn-${product.id}`}
                      onClick={() => setSelectedProduct(product)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal hover:bg-brand-teal hover:text-white transition-colors cursor-pointer"
                      title="Product Details"
                    >
                      <Info className="h-4.5 w-4.5" />
                    </button>
                    
                    <button
                      type="button"
                      id={`buy-btn-${product.id}`}
                      onClick={() => handleOrderWhatsApp(product)}
                      className="flex items-center gap-1.5 rounded-xl bg-brand-coral px-4 py-2 text-xs font-bold text-white hover:bg-brand-coral/90 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" /> Order
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* PRODUCT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div id="product-detail-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/70 p-4 backdrop-blur-sm">
            <motion.div
              id="product-detail-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-brand-teal/10 flex flex-col md:flex-row"
            >
              <button
                id="close-product-modal"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 rounded-full bg-brand-white/90 p-1.5 text-brand-dark/80 hover:bg-brand-teal/10 hover:text-brand-teal transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Photo section */}
              <div className="md:w-1/2 h-56 md:h-auto relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 md:bg-transparent"></div>
              </div>

              {/* Text content */}
              <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between">
                <div>
                  <span className="inline-block rounded bg-brand-teal/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-brand-teal mb-3">
                    {selectedProduct.category}
                  </span>
                  
                  <h3 className="font-display text-xl font-bold text-brand-dark leading-snug">
                    {selectedProduct.name}
                  </h3>

                  {/* Pricing and vol */}
                  <div className="my-4 flex items-baseline gap-2">
                    <span className="font-display text-2xl font-black text-brand-dark">
                      ₦{selectedProduct.price.toLocaleString()}
                    </span>
                    {selectedProduct.volume && (
                      <span className="text-xs text-gray-500">
                        / {selectedProduct.volume}
                      </span>
                    )}
                  </div>

                  {/* Stock and rating badges */}
                  <div className="flex gap-3 mb-4">
                    <span className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                      <Star className="h-3.5 w-3.5 fill-current text-amber-400" /> {selectedProduct.rating} / 5
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-semibold">
                      <span className={`inline-block h-2 w-2 rounded-full ${selectedProduct.stockStatus === 'In Stock' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                      <span className={selectedProduct.stockStatus === 'In Stock' ? 'text-emerald-600' : 'text-amber-600'}>{selectedProduct.stockStatus}</span>
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed mb-6">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    id="modal-wa-order-btn"
                    onClick={() => {
                      handleOrderWhatsApp(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-coral py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-coral/95 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="h-4.5 w-4.5" /> Order on WhatsApp
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-full rounded-xl border border-gray-200 py-2.5 text-[11px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    Back to Catalog
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
