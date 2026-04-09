'use client';

import React from 'react';
import { useProductStore } from '@/store/useProductStore';
import { useCartStore } from '@/store/useCartStore';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function ProductGrid() {
  const { products } = useProductStore();
  const { addToCart, items } = useCartStore();

  return (
    <div className="grid grid-cols-2 gap-4 p-4 pb-32">
      {products.map((product) => {
        const cartItem = items.find(i => i.id === product.id);
        const quantity = cartItem?.quantity || 0;

        return (
          <motion.div
            key={product.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
          >
            <Card className="flex flex-col items-center justify-center p-4 h-40 relative overflow-hidden group">
              {quantity > 0 && (
                <div className="absolute top-2 right-2 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                  {quantity}
                </div>
              )}
              <span className="text-4xl mb-2">{product.emoji}</span>
              <h3 className="font-semibold text-center leading-tight line-clamp-2">{product.name}</h3>
              <p className="text-sm text-primary font-bold mt-1">
                {formatCurrency(product.price)}
              </p>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
