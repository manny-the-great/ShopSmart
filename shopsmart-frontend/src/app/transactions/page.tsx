'use client';

import React, { useState } from 'react';
import { useTransactionStore } from '@/store/useTransactionStore';
import { formatCurrency } from '@/lib/utils';
import { ArrowLeft, Filter, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { PaymentMethod } from '@/types';

export default function TransactionsPage() {
  const { transactions } = useTransactionStore();
  const router = useRouter();
  const [filter, setFilter] = useState<PaymentMethod | 'all'>('all');

  const filtered = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.paymentMethod === filter);

  return (
    <div className="min-h-screen bg-background p-6">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 rounded-xl bg-white shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Transactions</h1>
        </div>
        <button className="p-2 rounded-xl bg-white shadow-sm">
          <Search size={20} />
        </button>
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
        {['all', 'cash', 'transfer', 'card'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-bold capitalize transition-colors whitespace-nowrap",
              filter === f ? "bg-primary text-white" : "bg-white text-muted-foreground shadow-sm"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        {filtered.map((t) => (
          <Card key={t.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center",
                t.paymentMethod === 'cash' ? "bg-cash/10 text-cash" :
                t.paymentMethod === 'card' ? "bg-card/10 text-card" : "bg-transfer/10 text-transfer"
              )}>
                <span className="text-xs font-bold uppercase">{t.paymentMethod.charAt(0)}</span>
              </div>
              <div>
                <p className="font-bold">{formatCurrency(t.amount)}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {t.cashier}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-extrabold uppercase bg-muted px-2 py-1 rounded text-muted-foreground">
                Success
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
