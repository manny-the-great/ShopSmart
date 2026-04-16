'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';
import { useCartStore } from '@/store/useCartStore';
import { useTransactionStore } from '@/store/useTransactionStore';
import { useAuthStore } from '@/store/useAuthStore';
import { formatCurrency, generateId, generateReceiptNumber } from '@/lib/utils';
import { Product, CartItem, PaymentMethod } from '@/types';
import {
  Search,
  Minus,
  Plus,
  X,
  Banknote,
  Smartphone,
  CreditCard,
  CheckCircle2,
  User,
  Trash2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const CATEGORIES = ['All', 'Dairy', 'Drinks', 'Bakery', 'Pantry', 'Vegetables'];

const PAYMENT_METHODS: { method: PaymentMethod; label: string; icon: React.ElementType; color: string; activeColor: string }[] = [
  { method: 'cash', label: 'Cash', icon: Banknote, color: 'bg-green-50 text-green-700 border-green-100', activeColor: 'bg-[#22C55E] text-white border-[#22C55E]' },
  { method: 'transfer', label: 'Transfer', icon: Smartphone, color: 'bg-blue-50 text-blue-700 border-blue-100', activeColor: 'bg-blue-600 text-white border-blue-600' },
  { method: 'card', label: 'Card', icon: CreditCard, color: 'bg-orange-50 text-orange-700 border-orange-100', activeColor: 'bg-orange-500 text-white border-orange-500' },
];

export default function POSPage() {
  const router = useRouter();
  const { products } = useProductStore();
  const { items, addToCart, removeFromCart, decreaseQuantity, clearCart, getTotal, getItemCount } = useCartStore();
  const { addTransaction } = useTransactionStore();
  const { currentUser } = useAuthStore();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('cash');
  const [cartExpanded, setCartExpanded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<{ items: CartItem[]; total: number; method: PaymentMethod; number: string } | null>(null);

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch && p.stockStatus !== 'out_of_stock';
  });

  const total = getTotal();
  const itemCount = getItemCount();

  const getCartQty = (productId: string) => {
    return items.find((i) => i.id === productId)?.quantity ?? 0;
  };

  const handleConfirmSale = useCallback(() => {
    if (items.length === 0) return;
    const receiptNumber = generateReceiptNumber();
    const currentItems = [...items];
    const currentTotal = total;

    addTransaction({
      id: generateId(),
      amount: currentTotal,
      paymentMethod: selectedPayment,
      timestamp: new Date().toISOString(),
      cashier: currentUser?.name ?? 'Attendant',
      cashierId: currentUser?.id,
      items: currentItems,
      receiptNumber,
    });

    setLastReceipt({ items: currentItems, total: currentTotal, method: selectedPayment, number: receiptNumber });
    clearCart();
    setShowSuccess(true);
  }, [items, total, selectedPayment, currentUser, addTransaction, clearCart]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F5] relative">
      {/* ── TOP SECTION ── */}
      <div className="bg-white border-b border-[#e8e8e4] sticky top-0 z-30">
        {/* Header */}
        <div className="px-5 pt-10 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#22C55E]/10 flex items-center justify-center">
                <User size={18} className="text-[#22C55E]" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium leading-none">Cashier</p>
                <p className="text-sm font-bold text-[#111827]">{currentUser?.name ?? 'Attendant'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Current Total</p>
              <motion.p
                key={total}
                initial={{ scale: 0.9, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl font-black text-[#111827]"
              >
                {formatCurrency(total)}
              </motion.p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#F8F8F5] border border-[#e8e8e4] text-sm focus:outline-none focus:ring-2 focus:ring-[#22C55E]/20 focus:border-[#22C55E] transition-all"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#22C55E] text-white shadow-sm'
                    : 'bg-[#F8F8F5] text-gray-500 border border-[#e8e8e4]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRODUCT GRID ── */}
      <div className="flex-1 p-4 pb-52">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📦</p>
            <p className="text-gray-500 font-medium">No products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => {
              const qty = getCartQty(product.id);
              const inCart = qty > 0;
              return (
                <motion.button
                  key={product.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(product)}
                  className={`relative bg-white rounded-2xl border-2 overflow-hidden text-left transition-all ${
                    inCart ? 'border-[#22C55E] shadow-md shadow-green-100' : 'border-[#e8e8e4]'
                  }`}
                >
                  <div className="h-24 bg-gradient-to-br from-[#F8F8F5] to-white flex items-center justify-center text-4xl">
                    {product.emoji}
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-[#111827] truncate">{product.name}</p>
                    <p className="text-sm font-black text-[#22C55E] mt-0.5">{formatCurrency(product.price)}</p>
                  </div>

                  {/* Quantity badge */}
                  {inCart && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#22C55E] text-white text-xs font-black flex items-center justify-center shadow-sm"
                    >
                      {qty}
                    </motion.div>
                  )}

                  {/* Low stock badge */}
                  {product.stockStatus === 'low_stock' && (
                    <div className="absolute top-2 left-2 bg-orange-100 text-orange-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      Low
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── BOTTOM PANEL ── */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#e8e8e4] z-30 shadow-2xl">
        {/* Cart Toggle */}
        {items.length > 0 && (
          <button
            onClick={() => setCartExpanded(!cartExpanded)}
            className="w-full flex items-center justify-between px-5 py-3 border-b border-[#e8e8e4]"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </span>
            </div>
            {cartExpanded ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronUp size={18} className="text-gray-400" />}
          </button>
        )}

        {/* Cart Items (expandable) */}
        <AnimatePresence>
          {cartExpanded && items.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden max-h-48 overflow-y-auto"
            >
              <div className="px-4 py-2 space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className="text-xl">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate">{item.name}</p>
                      <p className="text-xs text-[#22C55E] font-bold">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-6 h-6 rounded-full bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center"
                      >
                        <Plus size={10} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center ml-1"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment methods */}
        <div className="px-4 pt-3 pb-1">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Payment Method</p>
          <div className="grid grid-cols-3 gap-2">
            {PAYMENT_METHODS.map(({ method, label, icon: Icon, color, activeColor }) => (
              <button
                key={method}
                onClick={() => setSelectedPayment(method)}
                className={`flex flex-col items-center gap-1 py-2 rounded-xl border font-semibold text-xs transition-all ${
                  selectedPayment === method ? activeColor : color
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <div className="px-4 pb-4 pt-2">
          <button
            onClick={handleConfirmSale}
            disabled={items.length === 0}
            className={`w-full py-4 rounded-2xl font-black text-base transition-all ${
              items.length > 0
                ? 'bg-[#22C55E] text-white hover:bg-[#16a34a] active:scale-[0.98] shadow-lg shadow-green-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {items.length > 0
              ? `Confirm Sale · ${formatCurrency(total)}`
              : 'Tap products to add'}
          </button>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="w-full mt-2 py-2 text-xs text-gray-400 font-medium flex items-center justify-center gap-1"
            >
              <X size={12} /> Clear cart
            </button>
          )}
        </div>
      </div>

      {/* ── SUCCESS RECEIPT MODAL ── */}
      <AnimatePresence>
        {showSuccess && lastReceipt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-md rounded-t-3xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center pulse-ring">
                  <CheckCircle2 size={36} className="text-[#22C55E]" />
                </div>
              </div>

              <h2 className="text-2xl font-black text-center text-[#111827] mb-1">Sale Confirmed! 🎉</h2>
              <p className="text-gray-400 text-center text-sm mb-6">Receipt #{lastReceipt.number}</p>

              <div className="bg-[#F8F8F5] rounded-2xl p-4 mb-4 space-y-2">
                {lastReceipt.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.emoji} {item.name} × {item.quantity}
                    </span>
                    <span className="font-bold">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-[#e8e8e4] pt-2 flex justify-between font-black text-[#111827]">
                  <span>Total</span>
                  <span className="text-[#22C55E] text-xl">{formatCurrency(lastReceipt.total)}</span>
                </div>
                <div className="text-xs text-gray-400 capitalize">
                  Payment: {lastReceipt.method}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 rounded-2xl border border-[#e8e8e4] font-semibold text-sm text-gray-600 hover:bg-gray-50">
                  🖨️ Print
                </button>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="py-3 rounded-2xl bg-[#22C55E] text-white font-bold text-sm"
                >
                  New Sale
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
