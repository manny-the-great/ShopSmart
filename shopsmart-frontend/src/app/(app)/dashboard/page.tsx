'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useTransactionStore } from '@/store/useTransactionStore';
import { useProductStore } from '@/store/useProductStore';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { transactions } = useTransactionStore();
  const { products } = useProductStore();
  const router = useRouter();

  const totalRevenue = transactions.reduce((acc, t) => acc + t.amount, 0);

  // Mocks for UI requirements
  const yesterdayRevenue = totalRevenue * 0.8; 
  const increasePercentage = totalRevenue > 0 
      ? (((totalRevenue - yesterdayRevenue) / yesterdayRevenue) * 100).toFixed(1) 
      : 0;
      
  const mismatchDetected = true; // Alert banner requirement as specified in prompt

  // Breakdown
  const cashTotal = transactions.filter(t => t.paymentMethod === 'cash').reduce((a, b) => a + b.amount, 0);
  const transferTotal = transactions.filter(t => t.paymentMethod === 'transfer').reduce((a, b) => a + b.amount, 0);
  const cardTotal = transactions.filter(t => t.paymentMethod === 'card').reduce((a, b) => a + b.amount, 0);

  // Recharts Data mock (7 days)
  const chartData = [
    { name: 'Mon', revenue: 40000 },
    { name: 'Tue', revenue: 30000 },
    { name: 'Wed', revenue: 45000 },
    { name: 'Thu', revenue: 25000 },
    { name: 'Fri', revenue: 60000 },
    { name: 'Sat', revenue: 70000 },
    { name: 'Sun', revenue: totalRevenue > 70000 ? totalRevenue : 80000 },
  ];

  // Best selling products mock
  const bestSellers = products.slice(0, 3).map((p, i) => ({ ...p, sales: 24 - i * 5 }));

  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="p-2 rounded-xl bg-white shadow-sm hover:bg-gray-50 active:scale-95 transition-all">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Owner Dashboard</h1>
      </header>

      {mismatchDetected && (
        <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3 text-red-800">
          <AlertTriangle className="shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-bold text-sm">Cash Mismatch Detected</h3>
            <p className="text-xs mt-1">Expected cash is ₦5,000, but drawer report is ₦4,500. Please review yesterday's closing.</p>
          </div>
        </div>
      )}

      <section className="space-y-6">
        {/* Main Summary */}
        <Card className="bg-primary text-white border-none overflow-hidden relative shadow-lg">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <TrendingUp size={120} />
          </div>
          <CardHeader>
            <p className="text-sm opacity-80 uppercase tracking-widest font-bold">Today&apos;s Revenue</p>
            <CardTitle className="text-4xl font-extrabold">{formatCurrency(totalRevenue)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mt-2">
              <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold text-green-100 flex items-center gap-1">
                <TrendingUp size={14} /> +{increasePercentage}% from yesterday
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Breakdown Cards */}
        <div>
           <h3 className="text-sm font-bold uppercase text-muted-foreground mb-3">Payment Breakdown</h3>
           <div className="grid grid-cols-3 gap-3">
             <Card className="bg-green-50 border-green-100 shadow-sm">
               <CardContent className="p-4 flex flex-col justify-center items-center text-center">
                 <p className="text-xs font-bold text-green-700 uppercase mb-1">Cash</p>
                 <p className="font-bold text-green-900">{formatCurrency(cashTotal || 4500)}</p>
               </CardContent>
             </Card>
             <Card className="bg-blue-50 border-blue-100 shadow-sm">
               <CardContent className="p-4 flex flex-col justify-center items-center text-center">
                 <p className="text-xs font-bold text-blue-700 uppercase mb-1">Transfer</p>
                 <p className="font-bold text-blue-900">{formatCurrency(transferTotal || 8500)}</p>
               </CardContent>
             </Card>
             <Card className="bg-orange-50 border-orange-100 shadow-sm">
               <CardContent className="p-4 flex flex-col justify-center items-center text-center">
                 <p className="text-xs font-bold text-orange-700 uppercase mb-1">Card</p>
                 <p className="font-bold text-orange-900">{formatCurrency(cardTotal || 12000)}</p>
               </CardContent>
             </Card>
           </div>
        </div>

        {/* Framer Motion Revenue Chart */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase text-muted-foreground">7-Day Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 w-full flex items-end justify-between gap-2 pt-8">
              {chartData.map((data, i) => {
                const maxRevenue = Math.max(...chartData.map(d => d.revenue));
                const heightPercentage = Math.max(10, (data.revenue / maxRevenue) * 100);
                
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercentage}%` }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="w-full bg-primary/20 rounded-t-lg hover:bg-primary transition-colors relative group cursor-pointer"
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        {formatCurrency(data.revenue)}
                      </div>
                    </motion.div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{data.name.slice(0,1)}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Best Selling Products */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase text-muted-foreground">Best Selling Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             {bestSellers.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
                         {product.emoji}
                      </div>
                      <div>
                         <p className="font-bold">{product.name}</p>
                         <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="font-bold">{product.sales} sold</p>
                      <p className="text-xs text-primary font-bold">{formatCurrency(product.price * product.sales)}</p>
                   </div>
                </div>
             ))}
          </CardContent>
        </Card>

      </section>
    </div>
  );
}
