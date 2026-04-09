'use client';

import React from 'react';
import ProductGrid from '@/components/pos/ProductGrid';
import CartSummary from '@/components/pos/CartSummary';
import PaymentButtons from '@/components/pos/PaymentButtons';
import { useCartStore } from '@/store/useCartStore';
import { formatCurrency } from '@/lib/utils';
import { Search, User } from 'lucide-react';

export default function PosPage() {
  const { getTotal } = useCartStore();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Header Section */}
      <div className="bg-white p-6 pt-12 rounded-b-[32px] shadow-sm flex flex-col gap-6 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User size={20} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Cashier</p>
              <p className="font-bold text-sm">Manny</p>
            </div>
          </div>
          <button className="p-2 rounded-xl border">
            <Search size={20} className="text-muted-foreground" />
          </button>
        </div>

        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Current Total</p>
          <h1 className="text-5xl font-extrabold text-foreground mt-1">
            {formatCurrency(getTotal())}
          </h1>
        </div>

        {/* Categories / Tabs - simplified */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['All Items', 'Drinks', 'Pantry', 'Fresh'].map((cat, i) => (
            <button
              key={cat}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors",
                i === 0 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <ProductGrid />
      <CartSummary />
      <PaymentButtons />
    </div>
  );
}

// Utility to merge classes in this context
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
