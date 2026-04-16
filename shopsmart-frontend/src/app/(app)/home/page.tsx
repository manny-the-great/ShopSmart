'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useProductStore } from '@/store/useProductStore';
import { useTransactionStore } from '@/store/useTransactionStore';
import { formatCurrency, getStockStatusColor, getStockStatusLabel } from '@/lib/utils';
import {
  Bell,
  LogOut,
  TrendingUp,
  ShoppingCart,
  Package,
  BarChart3,
  Search,
  ChevronRight,
  Zap,
  AlertTriangle,
} from 'lucide-react';

const CATEGORIES = ['All', 'Dairy', 'Drinks', 'Bakery', 'Pantry', 'Vegetables'];

export default function HomePage() {
  const router = useRouter();
  const { currentUser, logout } = useAuthStore();
  const { products } = useProductStore();
  const { transactions } = useTransactionStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const isVendor = currentUser?.role === 'vendor';

  // Today's revenue
  const today = new Date().toDateString();
  const todayTxns = transactions.filter((t) => new Date(t.timestamp).toDateString() === today);
  const todayRevenue = todayTxns.reduce((a, b) => a + b.amount, 0);

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Trending (most expensive / in stock)
  const trendingProducts = [...products]
    .filter((p) => p.stockStatus !== 'out_of_stock')
    .sort((a, b) => b.price - a.price)
    .slice(0, 5);

  // Low stock alert
  const lowStockCount = products.filter((p) => p.stockStatus === 'low_stock' || p.stockStatus === 'out_of_stock').length;

  const handleLogout = () => {
    logout();
    router.push('/pin');
  };

  const greetingHour = new Date().getHours();
  const greeting =
    greetingHour < 12 ? 'Good morning' : greetingHour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-screen bg-[#F8F8F5]">
      {/* Header */}
      <div className="bg-white px-5 pt-10 pb-5 border-b border-[#e8e8e4]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#22C55E] flex items-center justify-center shadow-md shadow-green-200">
              <span className="text-white font-black text-xl">
                {currentUser?.name?.charAt(0) ?? 'U'}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">{greeting} 👋</p>
              <p className="font-bold text-[#111827]">{currentUser?.name ?? 'User'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {lowStockCount > 0 && isVendor && (
              <div className="relative">
                <button className="p-2 rounded-xl bg-orange-50 text-orange-500">
                  <Bell size={20} />
                </button>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {lowStockCount}
                </span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-11 pr-4 rounded-2xl bg-[#F8F8F5] border border-[#e8e8e4] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#22C55E]/20 focus:border-[#22C55E] transition-all"
          />
        </div>
      </div>

      <div className="px-5 py-5 space-y-7">
        {/* Vendor Summary Cards (vendor only) */}
        {isVendor && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-3 gap-3"
          >
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-white rounded-2xl p-4 border border-[#e8e8e4] hover:border-[#22C55E] transition-all text-left active:scale-95"
            >
              <BarChart3 size={20} className="text-[#22C55E] mb-2" />
              <p className="text-xs text-gray-400 font-medium">Today</p>
              <p className="text-base font-black text-[#111827] mt-0.5 leading-tight">
                {formatCurrency(todayRevenue || 48200)}
              </p>
            </button>

            <button
              onClick={() => router.push('/inventory')}
              className="bg-white rounded-2xl p-4 border border-[#e8e8e4] hover:border-orange-300 transition-all text-left active:scale-95"
            >
              <Package size={20} className="text-orange-500 mb-2" />
              <p className="text-xs text-gray-400 font-medium">Products</p>
              <p className="text-base font-black text-[#111827] mt-0.5">{products.length}</p>
            </button>

            <button
              onClick={() => router.push('/transactions')}
              className="bg-white rounded-2xl p-4 border border-[#e8e8e4] hover:border-blue-300 transition-all text-left active:scale-95"
            >
              <TrendingUp size={20} className="text-blue-500 mb-2" />
              <p className="text-xs text-gray-400 font-medium">Sales</p>
              <p className="text-base font-black text-[#111827] mt-0.5">{transactions.length}</p>
            </button>
          </motion.div>
        )}

        {/* Low stock alert */}
        {isVendor && lowStockCount > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onClick={() => router.push('/inventory')}
            className="w-full bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-center gap-3 text-left active:scale-[0.99]"
          >
            <AlertTriangle size={20} className="text-orange-500 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-orange-800">
                {lowStockCount} product{lowStockCount !== 1 ? 's' : ''} need restocking
              </p>
              <p className="text-xs text-orange-600 mt-0.5">Tap to update inventory</p>
            </div>
            <ChevronRight size={16} className="text-orange-400" />
          </motion.button>
        )}

        {/* Quick actions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#111827]">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push('/pos')}
              className="bg-[#22C55E] text-white rounded-2xl p-5 flex items-center gap-3 active:scale-95 transition-transform shadow-md shadow-green-100"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <ShoppingCart size={20} />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm">New Sale</p>
                <p className="text-green-100 text-xs">Start POS</p>
              </div>
            </button>

            {isVendor ? (
              <button
                onClick={() => router.push('/inventory')}
                className="bg-white border border-[#e8e8e4] rounded-2xl p-5 flex items-center gap-3 active:scale-95 transition-transform"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <Package size={20} className="text-orange-500" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-[#111827]">Inventory</p>
                  <p className="text-gray-400 text-xs">Manage stock</p>
                </div>
              </button>
            ) : (
              <div className="bg-white border border-[#e8e8e4] rounded-2xl p-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Zap size={20} className="text-blue-500" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-[#111827]">{todayTxns.length} Sales</p>
                  <p className="text-gray-400 text-xs">Today</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trending Products – horizontal scroll */}
        {trendingProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#111827]">Trending Products</h2>
              <button className="text-xs text-[#22C55E] font-semibold flex items-center gap-1">
                See all <ChevronRight size={14} />
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-5 px-5">
              {trendingProducts.map((product, i) => (
                <motion.button
                  key={product.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  onClick={() => router.push('/pos')}
                  className="flex-shrink-0 w-32 bg-white rounded-2xl border border-[#e8e8e4] overflow-hidden active:scale-95 transition-all hover:border-[#22C55E]/40 text-left"
                >
                  <div className="h-24 bg-gradient-to-br from-green-50 to-[#F8F8F5] flex items-center justify-center text-4xl">
                    {product.emoji}
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-[#111827] truncate">{product.name}</p>
                    <p className="text-xs text-[#22C55E] font-bold mt-1">{formatCurrency(product.price)}</p>
                    <span
                      className={`mt-1.5 inline-block text-[9px] font-bold px-2 py-0.5 rounded-full ${getStockStatusColor(product.stockStatus)}`}
                    >
                      {getStockStatusLabel(product.stockStatus)}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Category filter */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#111827]">All Products</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5 mb-5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#22C55E] text-white shadow-sm shadow-green-200'
                    : 'bg-white border border-[#e8e8e4] text-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product, i) => (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                onClick={() => router.push('/pos')}
                className="bg-white rounded-2xl border border-[#e8e8e4] overflow-hidden active:scale-95 transition-all hover:border-[#22C55E]/40 text-left"
              >
                <div className="h-28 bg-gradient-to-br from-[#F8F8F5] to-white flex items-center justify-center text-5xl relative">
                  {product.emoji}
                  {product.stockStatus === 'out_of_stock' && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                      <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-bold text-[#111827] truncate">{product.name}</p>
                  <p className="text-xs text-gray-400 mb-1.5">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-[#22C55E]">{formatCurrency(product.price)}</p>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${getStockStatusColor(product.stockStatus)}`}
                    >
                      {product.stock > 0 ? `${product.stock} left` : 'Out'}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-gray-500 font-medium">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
