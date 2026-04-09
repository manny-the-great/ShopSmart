'use client';

import React from 'react';
import { useCartStore } from '@/store/useCartStore';
import { formatCurrency } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartSummary() {
  const { items, getTotal } = useCartStore();
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-24 left-4 right-4 bg-primary text-white p-4 rounded-2xl flex items-center justify-between shadow-lg px-6"
    >
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-lg">
          <ShoppingCart size={20} />
        </div>
        <div>
          <p className="text-xs opacity-70">Total ({totalItems} items)</p>
          <p className="text-xl font-bold">{formatCurrency(getTotal())}</p>
        </div>
      </div>
      <button className="text-sm font-bold bg-white text-primary px-4 py-2 rounded-xl">
        View Cart
      </button>
    </motion.div>
  );
}
