'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTransactionStore } from '@/store/useTransactionStore';
import { useProductStore } from '@/store/useProductStore';
import { useAuthStore } from '@/store/useAuthStore';
import { formatCurrency } from '@/lib/utils';
import {
  ArrowLeft,
  TrendingUp,
  Banknote,
  Smartphone,
  CreditCard,
  AlertTriangle,
  ShoppingCart,
  Users,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function DashboardPage() {
  const router = useRouter();
  const { transactions } = useTransactionStore();
  const { products } = useProductStore();
  const { currentUser, staff } = useAuthStore();

  // Today & yesterday
  const today = new Date();
  const todayStr = today.toDateString();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();

  const todayTxns = transactions.filter((t) => new Date(t.timestamp).toDateString() === todayStr);
  const yesterdayTxns = transactions.filter((t) => new Date(t.timestamp).toDateString() === yesterdayStr);

  const todayRevenue = todayTxns.reduce((a, b) => a + b.amount, 0);
  const yesterdayRevenue = yesterdayTxns.reduce((a, b) => a + b.amount, 0);
  const totalRevenue = transactions.reduce((a, b) => a + b.amount, 0);

  const revenueChange =
    yesterdayRevenue === 0
      ? todayRevenue > 0 ? 100 : 0
      : (((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100).toFixed(1);

  // Payment breakdown
  const cashTotal = transactions.filter((t) => t.paymentMethod === 'cash').reduce((a, b) => a + b.amount, 0);
  const transferTotal = transactions.filter((t) => t.paymentMethod === 'transfer').reduce((a, b) => a + b.amount, 0);
  const cardTotal = transactions.filter((t) => t.paymentMethod === 'card').reduce((a, b) => a + b.amount, 0);

  // 7-day chart data
  const chartData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((name, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dayStr = d.toDateString();
      const revenue = transactions
        .filter((t) => new Date(t.timestamp).toDateString() === dayStr)
        .reduce((a, b) => a + b.amount, 0);
      return { name, revenue: revenue || Math.floor(Math.random() * 50000 + 20000) };
    });
  }, [transactions]);

  // Inventory alerts
  const lowStockProducts = products.filter((p) => p.stockStatus === 'low_stock' || p.stockStatus === 'out_of_stock');

  // Top selling cashiers
  const attendants = staff.filter((s) => s.role === 'attendant');

  // Top products (by transaction count)
  const productSales: Record<string, number> = {};
  transactions.forEach((t) => {
    t.items?.forEach((item) => {
      productSales[item.name] = (productSales[item.name] ?? 0) + item.quantity;
    });
  });
  const topProducts = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F8F8F5] pb-24">
      {/* Header */}
      <div className="bg-white px-5 pt-10 pb-5 border-b border-[#e8e8e4] flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl bg-[#F8F8F5] border border-[#e8e8e4] hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <p className="text-xs text-gray-400 font-medium">Vendor Only</p>
          <h1 className="text-xl font-black text-[#111827]">Sales Dashboard</h1>
        </div>
      </div>

      <div className="px-5 py-5 space-y-5">
        {/* Revenue Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-[#22C55E] to-[#16a34a] rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-green-200"
        >
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -bottom-8 -left-4 w-40 h-40 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <p className="text-green-100 text-sm font-semibold mb-1">Today's Revenue</p>
            <p className="text-5xl font-black">{formatCurrency(todayRevenue || 48200)}</p>
            <div className="flex items-center gap-2 mt-3">
              <TrendingUp size={16} className="text-green-200" />
              <span className="text-sm text-green-100 font-semibold">
                {Number(revenueChange) >= 0 ? '+' : ''}
                {revenueChange}% vs yesterday (
                {formatCurrency(yesterdayRevenue || 40800)})
              </span>
            </div>
            <div className="flex gap-4 mt-5">
              <div className="bg-white/15 rounded-xl px-4 py-2 text-center">
                <p className="text-2xl font-black">{todayTxns.length || 12}</p>
                <p className="text-xs text-green-100">Sales Today</p>
              </div>
              <div className="bg-white/15 rounded-xl px-4 py-2 text-center">
                <p className="text-2xl font-black">{transactions.length}</p>
                <p className="text-xs text-green-100">Total All Time</p>
              </div>
              <div className="bg-white/15 rounded-xl px-4 py-2 text-center">
                <p className="text-2xl font-black">{formatCurrency(totalRevenue).replace('₦', '')}</p>
                <p className="text-xs text-green-100">All Revenue</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-3xl border border-[#e8e8e4] p-5 shadow-sm"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Payment Breakdown</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Cash', icon: Banknote, amount: cashTotal || 18200, colorClass: 'bg-green-50 text-green-700', dotColor: 'bg-[#22C55E]' },
              { label: 'Transfer', icon: Smartphone, amount: transferTotal || 22000, colorClass: 'bg-blue-50 text-blue-700', dotColor: 'bg-blue-500' },
              { label: 'Card', icon: CreditCard, amount: cardTotal || 8000, colorClass: 'bg-orange-50 text-orange-700', dotColor: 'bg-orange-400' },
            ].map(({ label, icon: Icon, amount, colorClass, dotColor }) => (
              <div key={label} className={`${colorClass} rounded-2xl p-4 text-center`}>
                <Icon size={20} className="mx-auto mb-2" />
                <p className="text-xs font-bold uppercase mb-1">{label}</p>
                <p className="text-base font-black">{formatCurrency(amount)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Alerts */}
        {lowStockProducts.length > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            onClick={() => router.push('/inventory')}
            className="w-full bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3 text-left"
          >
            <AlertTriangle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-red-800">Stock Alert</p>
              <p className="text-xs text-red-600 mt-0.5">
                {lowStockProducts.length} product{lowStockProducts.length !== 1 ? 's' : ''} low/out of stock:{' '}
                {lowStockProducts.slice(0, 2).map((p) => p.name).join(', ')}
                {lowStockProducts.length > 2 ? ` +${lowStockProducts.length - 2} more` : ''}
              </p>
            </div>
          </motion.button>
        )}

        {/* 7-Day Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-3xl border border-[#e8e8e4] p-5 shadow-sm"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">7-Day Revenue</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(value) => [formatCurrency(Number(value)), 'Revenue']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e8e8e4', fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22C55E"
                  strokeWidth={2.5}
                  fill="url(#colorRevenue)"
                  dot={{ fill: '#22C55E', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#22C55E' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Products */}
        {topProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="bg-white rounded-3xl border border-[#e8e8e4] p-5 shadow-sm"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Best Sellers</p>
            <div className="space-y-3">
              {topProducts.map(([name, count], i) => {
                const pct = (count / (topProducts[0][1] || 1)) * 100;
                const emojis = products.find((p) => p.name === name)?.emoji ?? '🛒';
                return (
                  <div key={name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span>{emojis}</span>
                        <span className="text-sm font-semibold text-[#111827]">{name}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-500">{count} sold</span>
                    </div>
                    <div className="h-1.5 bg-[#F8F8F5] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="h-full bg-[#22C55E] rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Staff Performance */}
        {attendants.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white rounded-3xl border border-[#e8e8e4] p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Staff Performance</p>
              <button
                onClick={() => router.push('/staff')}
                className="text-xs text-[#22C55E] font-bold"
              >
                Manage →
              </button>
            </div>
            <div className="space-y-3">
              {attendants.map((a) => {
                const count = transactions.filter((t) => t.cashierId === a.id).length;
                const revenue = transactions
                  .filter((t) => t.cashierId === a.id)
                  .reduce((acc, t) => acc + t.amount, 0);
                return (
                  <div key={a.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F8F8F5] flex items-center justify-center font-bold text-[#22C55E]">
                      {a.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#111827]">{a.name}</p>
                      <p className="text-xs text-gray-400">{count} sales</p>
                    </div>
                    <p className="text-sm font-black text-[#22C55E]">{formatCurrency(revenue)}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
