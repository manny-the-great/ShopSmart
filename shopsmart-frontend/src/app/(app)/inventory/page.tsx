'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';
import { formatCurrency, getStockStatusColor, getStockStatusLabel, generateId, computeStockStatus } from '@/lib/utils';
import { Product } from '@/types';
import {
  ArrowLeft,
  Plus,
  Search,
  Package,
  Edit3,
  Trash2,
  X,
  ChevronDown,
  AlertTriangle,
  TrendingDown,
} from 'lucide-react';

const CATEGORIES = ['Dairy', 'Drinks', 'Bakery', 'Pantry', 'Vegetables', 'Other'];
const EMOJIS = ['🥛', '🍞', '🧃', '🥚', '☕', '🍅', '💧', '🍜', '🫙', '🥤', '🛒', '🎁', '🍎', '🥩', '🧀'];

const EMPTY_PRODUCT: Omit<Product, 'id'> = {
  name: '',
  price: 0,
  category: 'Dairy',
  emoji: '🛒',
  stock: 0,
  stockStatus: 'in_stock',
  description: '',
  sku: '',
};

export default function InventoryPage() {
  const router = useRouter();
  const { products, addProduct, updateProduct, updateStock, deleteProduct } = useProductStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(EMPTY_PRODUCT);
  const [stockEditId, setStockEditId] = useState<string | null>(null);
  const [newStockValue, setNewStockValue] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || p.stockStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const lowStockCount = products.filter((p) => p.stockStatus === 'low_stock').length;
  const outOfStockCount = products.filter((p) => p.stockStatus === 'out_of_stock').length;
  const inStockCount = products.filter((p) => p.stockStatus === 'in_stock').length;

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(EMPTY_PRODUCT);
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name.trim() || formData.price <= 0) return;
    const stockStatus = computeStockStatus(formData.stock);
    if (editingProduct) {
      updateProduct(editingProduct.id, { ...formData, stockStatus });
    } else {
      addProduct({ id: generateId(), ...formData, stockStatus });
    }
    setShowModal(false);
  };

  const handleStockUpdate = (id: string) => {
    const val = parseInt(newStockValue);
    if (!isNaN(val) && val >= 0) {
      updateStock(id, val);
    }
    setStockEditId(null);
    setNewStockValue('');
  };

  return (
    <div className="min-h-screen bg-[#F8F8F5] pb-24">
      {/* Header */}
      <div className="bg-white px-5 pt-10 pb-5 border-b border-[#e8e8e4]">
        <div className="flex items-center gap-4 mb-5">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-[#F8F8F5] border border-[#e8e8e4]"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <p className="text-xs text-gray-400 font-medium">Vendor Only</p>
            <h1 className="text-xl font-black text-[#111827]">Inventory</h1>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <button
            onClick={() => setFilterStatus(filterStatus === 'in_stock' ? 'all' : 'in_stock')}
            className={`rounded-xl p-3 text-center transition-all ${
              filterStatus === 'in_stock' ? 'bg-green-500 text-white' : 'bg-green-50'
            }`}
          >
            <p className={`text-xl font-black ${filterStatus === 'in_stock' ? 'text-white' : 'text-green-700'}`}>{inStockCount}</p>
            <p className={`text-xs font-semibold ${filterStatus === 'in_stock' ? 'text-green-100' : 'text-green-600'}`}>In Stock</p>
          </button>
          <button
            onClick={() => setFilterStatus(filterStatus === 'low_stock' ? 'all' : 'low_stock')}
            className={`rounded-xl p-3 text-center transition-all ${
              filterStatus === 'low_stock' ? 'bg-orange-500 text-white' : 'bg-orange-50'
            }`}
          >
            <p className={`text-xl font-black ${filterStatus === 'low_stock' ? 'text-white' : 'text-orange-700'}`}>{lowStockCount}</p>
            <p className={`text-xs font-semibold ${filterStatus === 'low_stock' ? 'text-orange-100' : 'text-orange-600'}`}>Low Stock</p>
          </button>
          <button
            onClick={() => setFilterStatus(filterStatus === 'out_of_stock' ? 'all' : 'out_of_stock')}
            className={`rounded-xl p-3 text-center transition-all ${
              filterStatus === 'out_of_stock' ? 'bg-red-500 text-white' : 'bg-red-50'
            }`}
          >
            <p className={`text-xl font-black ${filterStatus === 'out_of_stock' ? 'text-white' : 'text-red-700'}`}>{outOfStockCount}</p>
            <p className={`text-xs font-semibold ${filterStatus === 'out_of_stock' ? 'text-red-100' : 'text-red-600'}`}>Out</p>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#F8F8F5] border border-[#e8e8e4] text-sm focus:outline-none focus:ring-2 focus:ring-[#22C55E]/20 focus:border-[#22C55E]"
          />
        </div>
      </div>

      {/* Product List */}
      <div className="px-5 py-4 space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Package size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 font-medium">No products found</p>
          </div>
        ) : (
          filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="bg-white rounded-2xl border border-[#e8e8e4] p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                {/* Emoji */}
                <div className="w-12 h-12 rounded-xl bg-[#F8F8F5] flex items-center justify-center text-2xl flex-shrink-0">
                  {product.emoji}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#111827] text-sm truncate">{product.name}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-2 flex-shrink-0 ${getStockStatusColor(product.stockStatus)}`}>
                      {getStockStatusLabel(product.stockStatus)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{product.category} · {product.sku}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <p className="text-sm font-black text-[#22C55E]">{formatCurrency(product.price)}</p>
                    
                    {/* Stock inline edit */}
                    {stockEditId === product.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={newStockValue}
                          onChange={(e) => setNewStockValue(e.target.value)}
                          placeholder={`${product.stock}`}
                          autoFocus
                          className="w-16 h-6 text-xs px-2 rounded-lg border border-[#e8e8e4] focus:outline-none focus:ring-1 focus:ring-[#22C55E]"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleStockUpdate(product.id);
                            if (e.key === 'Escape') { setStockEditId(null); setNewStockValue(''); }
                          }}
                        />
                        <button
                          onClick={() => handleStockUpdate(product.id)}
                          className="text-[10px] bg-[#22C55E] text-white px-2 py-0.5 rounded-md font-bold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => { setStockEditId(null); setNewStockValue(''); }}
                          className="text-[10px] text-gray-400"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setStockEditId(product.id); setNewStockValue(String(product.stock)); }}
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#22C55E] transition-colors"
                      >
                        <Package size={11} />
                        <span className="font-semibold">{product.stock} units</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => openEditModal(product)}
                    className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Stock warning bar */}
              {(product.stockStatus === 'low_stock' || product.stockStatus === 'out_of_stock') && (
                <div className={`mt-3 flex items-center gap-2 p-2 rounded-xl text-xs font-medium ${
                  product.stockStatus === 'out_of_stock'
                    ? 'bg-red-50 text-red-700'
                    : 'bg-orange-50 text-orange-700'
                }`}>
                  <AlertTriangle size={13} />
                  {product.stockStatus === 'out_of_stock'
                    ? 'Out of stock — No sales possible'
                    : `Only ${product.stock} unit${product.stock !== 1 ? 's' : ''} remaining`}
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* FAB */}
      <button
        onClick={openAddModal}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-[#22C55E] text-white shadow-xl shadow-green-200 flex items-center justify-center active:scale-95 transition-transform z-40"
      >
        <Plus size={28} />
      </button>

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-end"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="bg-white w-full max-w-md mx-auto rounded-t-3xl overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-[#e8e8e4] flex items-center justify-between">
                <h2 className="text-xl font-black text-[#111827]">
                  {editingProduct ? 'Edit Product' : 'Add Product'}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-xl bg-[#F8F8F5]">
                  <X size={20} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Emoji picker */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                    Icon
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {EMOJIS.map((e) => (
                      <button
                        key={e}
                        onClick={() => setFormData((f) => ({ ...f, emoji: e }))}
                        className={`w-10 h-10 rounded-xl text-2xl flex items-center justify-center transition-all ${
                          formData.emoji === e ? 'bg-[#22C55E]/20 ring-2 ring-[#22C55E]' : 'bg-[#F8F8F5]'
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Product Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Fresh Whole Milk"
                    value={formData.name}
                    onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                    className="w-full h-12 px-4 rounded-xl border border-[#e8e8e4] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#22C55E]/20 focus:border-[#22C55E]"
                  />
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Price (₦) *</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={formData.price || ''}
                      onChange={(e) => setFormData((f) => ({ ...f, price: Number(e.target.value) }))}
                      className="w-full h-12 px-4 rounded-xl border border-[#e8e8e4] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#22C55E]/20 focus:border-[#22C55E]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Stock Qty</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={formData.stock || ''}
                      onChange={(e) => {
                        const stock = Number(e.target.value);
                        setFormData((f) => ({ ...f, stock, stockStatus: computeStockStatus(stock) }));
                      }}
                      className="w-full h-12 px-4 rounded-xl border border-[#e8e8e4] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#22C55E]/20 focus:border-[#22C55E]"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Category</label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData((f) => ({ ...f, category: e.target.value }))}
                      className="w-full h-12 px-4 rounded-xl border border-[#e8e8e4] text-sm font-medium bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#22C55E]/20 focus:border-[#22C55E]"
                    >
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* SKU */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">SKU (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. DAI-001"
                    value={formData.sku ?? ''}
                    onChange={(e) => setFormData((f) => ({ ...f, sku: e.target.value }))}
                    className="w-full h-12 px-4 rounded-xl border border-[#e8e8e4] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#22C55E]/20 focus:border-[#22C55E]"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Description (optional)</label>
                  <textarea
                    placeholder="Brief product description..."
                    value={formData.description ?? ''}
                    onChange={(e) => setFormData((f) => ({ ...f, description: e.target.value }))}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-[#e8e8e4] text-sm font-medium resize-none focus:outline-none focus:ring-2 focus:ring-[#22C55E]/20 focus:border-[#22C55E]"
                  />
                </div>

                <button
                  onClick={handleSave}
                  className="w-full py-4 bg-[#22C55E] text-white font-black rounded-2xl hover:bg-[#16a34a] transition-colors shadow-lg shadow-green-100"
                >
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
