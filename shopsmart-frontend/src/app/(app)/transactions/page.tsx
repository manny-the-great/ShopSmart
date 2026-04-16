'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTransactionStore } from '@/store/useTransactionStore';
import { useAuthStore } from '@/store/useAuthStore';
import { formatCurrency, formatShortDate } from '@/lib/utils';
import { PaymentMethod } from '@/types';
import {
  ArrowLeft,
  Search,
  Banknote,
  Smartphone,
  CreditCard,
  Filter,
  ChevronDown,
  ChevronUp,
  Receipt,
  X,
  Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const PAYMENT_FILTERS: { value: PaymentMethod | 'all'; label: string; color: string; activeColor: string }[] = [
  { value: 'all', label: 'All', color: 'bg-white border-[#e8e8e4] text-gray-600', activeColor: 'bg-[#111827] text-white border-[#111827]' },
  { value: 'cash', label: 'Cash', color: 'bg-white border-[#e8e8e4] text-gray-600', activeColor: 'bg-[#22C55E] text-white border-[#22C55E]' },
  { value: 'transfer', label: 'Transfer', color: 'bg-white border-[#e8e8e4] text-gray-600', activeColor: 'bg-blue-600 text-white border-blue-600' },
  { value: 'card', label: 'Card', color: 'bg-white border-[#e8e8e4] text-gray-600', activeColor: 'bg-orange-500 text-white border-orange-500' },
];

const METHOD_ICONS: Record<PaymentMethod, React.ElementType> = {
  cash: Banknote,
  transfer: Smartphone,
  card: CreditCard,
};

const METHOD_COLORS: Record<PaymentMethod, { icon: string; bg: string; dot: string }> = {
  cash: { icon: 'text-green-700', bg: 'bg-green-50', dot: 'bg-[#22C55E]' },
  transfer: { icon: 'text-blue-700', bg: 'bg-blue-50', dot: 'bg-blue-500' },
  card: { icon: 'text-orange-700', bg: 'bg-orange-50', dot: 'bg-orange-400' },
};

export default function TransactionsPage() {
  const router = useRouter();
  const { transactions } = useTransactionStore();
  const { staff, currentUser } = useAuthStore();

  const [paymentFilter, setPaymentFilter] = useState<PaymentMethod | 'all'>('all');
  const [attendantFilter, setAttendantFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const attendants = staff.filter((s) => s.role === 'attendant');

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchesPayment = paymentFilter === 'all' || t.paymentMethod === paymentFilter;
      const matchesAttendant = attendantFilter === 'all' || t.cashierId === attendantFilter;
      const matchesSearch =
        searchQuery === '' ||
        t.cashier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.receiptNumber ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.items?.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesPayment && matchesAttendant && matchesSearch;
    });
  }, [transactions, paymentFilter, attendantFilter, searchQuery]);

  // Summary totals
  const totalAmount = filtered.reduce((a, b) => a + b.amount, 0);
  const cashTotal = filtered.filter((t) => t.paymentMethod === 'cash').reduce((a, b) => a + b.amount, 0);
  const transferTotal = filtered.filter((t) => t.paymentMethod === 'transfer').reduce((a, b) => a + b.amount, 0);
  const cardTotal = filtered.filter((t) => t.paymentMethod === 'card').reduce((a, b) => a + b.amount, 0);

  // Group by date
  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    filtered.forEach((t) => {
      const d = new Date(t.timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let key: string;
      if (d.toDateString() === today.toDateString()) key = 'Today';
      else if (d.toDateString() === yesterday.toDateString()) key = 'Yesterday';
      else key = d.toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });

      if (!groups[key]) groups[key] = [];
      groups[key].push(t);
    });
    return groups;
  }, [filtered]);

  return (
    <div className="min-h-screen bg-[#F8F8F5] pb-24">
      {/* Header */}
      <div className="bg-white px-5 pt-10 pb-4 border-b border-[#e8e8e4] sticky top-0 z-30">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-[#F8F8F5] border border-[#e8e8e4]"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-medium">Vendor Only</p>
            <h1 className="text-xl font-black text-[#111827]">Transaction History</h1>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all',
              showFilters
                ? 'bg-[#22C55E] text-white border-[#22C55E]'
                : 'bg-[#F8F8F5] border-[#e8e8e4] text-gray-600'
            )}
          >
            <Filter size={14} />
            Filter
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search receipt, cashier, product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-10 rounded-xl bg-[#F8F8F5] border border-[#e8e8e4] text-sm focus:outline-none focus:ring-2 focus:ring-[#22C55E]/20 focus:border-[#22C55E]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Payment filter pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {PAYMENT_FILTERS.map(({ value, label, color, activeColor }) => (
            <button
              key={value}
              onClick={() => setPaymentFilter(value)}
              className={cn(
                'flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold border transition-all',
                paymentFilter === value ? activeColor : color
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Attendant filter (expanded) */}
        <AnimatePresence>
          {showFilters && attendants.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-3"
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Filter by Attendant
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setAttendantFilter('all')}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-bold border transition-all',
                    attendantFilter === 'all'
                      ? 'bg-[#111827] text-white border-[#111827]'
                      : 'bg-white border-[#e8e8e4] text-gray-600'
                  )}
                >
                  All Staff
                </button>
                {attendants.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAttendantFilter(a.id)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-bold border transition-all',
                      attendantFilter === a.id
                        ? 'bg-[#111827] text-white border-[#111827]'
                        : 'bg-white border-[#e8e8e4] text-gray-600'
                    )}
                  >
                    {a.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-5 py-4 space-y-5">
        {/* Summary strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-[#e8e8e4] p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {filtered.length} Transaction{filtered.length !== 1 ? 's' : ''}
            </p>
            <p className="text-lg font-black text-[#111827]">{formatCurrency(totalAmount)}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-green-50 rounded-xl py-2">
              <p className="font-black text-green-800">{formatCurrency(cashTotal)}</p>
              <p className="text-green-600 font-semibold mt-0.5">Cash</p>
            </div>
            <div className="bg-blue-50 rounded-xl py-2">
              <p className="font-black text-blue-800">{formatCurrency(transferTotal)}</p>
              <p className="text-blue-600 font-semibold mt-0.5">Transfer</p>
            </div>
            <div className="bg-orange-50 rounded-xl py-2">
              <p className="font-black text-orange-800">{formatCurrency(cardTotal)}</p>
              <p className="text-orange-600 font-semibold mt-0.5">Card</p>
            </div>
          </div>
        </motion.div>

        {/* Transaction list grouped by date */}
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-16">
            <Receipt size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 font-medium">No transactions found</p>
            <p className="text-gray-300 text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          Object.entries(grouped).map(([date, txns]) => (
            <div key={date}>
              {/* Date label */}
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={13} className="text-gray-400" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{date}</p>
                <div className="flex-1 h-px bg-[#e8e8e4]" />
                <p className="text-xs font-bold text-gray-400">
                  {formatCurrency(txns.reduce((a, b) => a + b.amount, 0))}
                </p>
              </div>

              <div className="space-y-2">
                {txns.map((t, i) => {
                  const MethodIcon = METHOD_ICONS[t.paymentMethod];
                  const colors = METHOD_COLORS[t.paymentMethod];
                  const isExpanded = expandedId === t.id;

                  return (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      className="bg-white rounded-2xl border border-[#e8e8e4] overflow-hidden shadow-sm"
                    >
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : t.id)}
                        className="w-full flex items-center gap-3 p-4 text-left"
                      >
                        {/* Icon */}
                        <div className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                          <MethodIcon size={20} className={colors.icon} />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-[#111827]">{t.cashier}</p>
                            {t.receiptNumber && (
                              <span className="text-[10px] text-gray-400 font-mono">#{t.receiptNumber}</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {new Date(t.timestamp).toLocaleTimeString('en-NG', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                            {' · '}
                            {t.items?.length ?? 0} item{(t.items?.length ?? 0) !== 1 ? 's' : ''}
                          </p>
                        </div>

                        {/* Amount & chevron */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="text-right">
                            <p className="text-base font-black text-[#111827]">{formatCurrency(t.amount)}</p>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${colors.bg} ${colors.icon}`}>
                              {t.paymentMethod}
                            </span>
                          </div>
                          {isExpanded ? (
                            <ChevronUp size={16} className="text-gray-400" />
                          ) : (
                            <ChevronDown size={16} className="text-gray-400" />
                          )}
                        </div>
                      </button>

                      {/* Expanded items */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 border-t border-[#e8e8e4]">
                              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mt-3 mb-2">
                                Items
                              </p>
                              <div className="space-y-1.5">
                                {(t.items ?? []).map((item) => (
                                  <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                      {item.emoji} {item.name}{' '}
                                      <span className="text-gray-400">× {item.quantity}</span>
                                    </span>
                                    <span className="font-bold text-[#111827]">
                                      {formatCurrency(item.price * item.quantity)}
                                    </span>
                                  </div>
                                ))}
                                <div className="flex justify-between pt-2 border-t border-[#e8e8e4] font-black">
                                  <span className="text-gray-600 text-sm">Total</span>
                                  <span className="text-[#22C55E]">{formatCurrency(t.amount)}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
