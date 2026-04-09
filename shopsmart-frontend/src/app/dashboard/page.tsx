'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useTransactionStore } from '@/store/useTransactionStore';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, Users, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { transactions } = useTransactionStore();
  const router = useRouter();

  const totalRevenue = transactions.reduce((acc, t) => acc + t.amount, 0);
  const totalSales = transactions.length;

  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="p-2 rounded-xl bg-white shadow-sm">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Owner Dashboard</h1>
      </header>

      <section className="space-y-6">
        {/* Main Summary */}
        <Card className="bg-primary text-white border-none overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp size={120} />
          </div>
          <CardHeader>
            <p className="text-sm opacity-80 uppercase tracking-widest font-bold">Today's Revenue</p>
            <CardTitle className="text-4xl font-extrabold">{formatCurrency(totalRevenue)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mt-2">
              <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                +12.5% from yesterday
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="p-4 flex flex-row items-center justify-between pb-2">
              <p className="text-xs font-bold text-muted-foreground uppercase">Sales</p>
              <ShoppingBag size={16} className="text-primary" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">{totalSales}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4 flex flex-row items-center justify-between pb-2">
              <p className="text-xs font-bold text-muted-foreground uppercase">Customers</p>
              <Users size={16} className="text-primary" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">42</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart (Mock) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase text-muted-foreground">7-Day Revenue</CardTitle>
          </CardHeader>
          <CardContent className="h-40 flex items-end justify-between gap-2">
            {[40, 70, 45, 90, 65, 80, 100].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  className="w-full bg-primary/20 rounded-t-md hover:bg-primary transition-colors relative group"
                >
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {height}%
                   </div>
                </motion.div>
                <span className="text-[10px] font-bold text-muted-foreground">{['M','T','W','T','F','S','S'][i]}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions List Link */}
        <Card className="active:bg-muted transition-colors cursor-pointer" onClick={() => router.push('/transactions')}>
           <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold">Recent Transactions</h3>
                <p className="text-sm text-muted-foreground">View all logs</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <ArrowLeft size={20} className="rotate-180" />
              </div>
           </CardContent>
        </Card>
      </section>

      {/* Persistent Bottom Nav - I'll create a shared one later */}
    </div>
  );
}
