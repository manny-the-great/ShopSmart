'use client';

import React, { useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Search, Grid, List as ListIcon, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';

export default function ProductsPage() {
  const { products } = useProductStore();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background p-6">
       <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 rounded-xl bg-white shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Catalogue</h1>
        </div>
        <div className="flex bg-white rounded-xl p-1 shadow-sm">
          <button 
            onClick={() => setView('grid')}
            className={cn("p-2 rounded-lg transition-colors", view === 'grid' ? "bg-primary text-white" : "text-muted-foreground")}
          >
            <Grid size={18} />
          </button>
          <button 
            onClick={() => setView('list')}
            className={cn("p-2 rounded-lg transition-colors", view === 'list' ? "bg-primary text-white" : "text-muted-foreground")}
          >
            <ListIcon size={18} />
          </button>
        </div>
      </header>

      <div className="mb-6 relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search size={18} />
        </span>
        <input 
          type="text" 
          placeholder="Search products..." 
          className="w-full h-12 pl-12 pr-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className={cn(
        "grid gap-4",
        view === 'grid' ? "grid-cols-2" : "grid-cols-1"
      )}>
        {products.map((p) => (
          <Card key={p.id}>
            <CardContent className={cn(
              "p-4 flex",
              view === 'grid' ? "flex-col items-center text-center" : "flex-row items-center justify-between"
            )}>
              <div className={cn("flex items-center gap-4", view === 'grid' ? "flex-col" : "flex-row")}>
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-3xl">
                  {p.emoji}
                </div>
                <div className={view === 'grid' ? "mt-2" : ""}>
                  <p className="font-bold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.category}</p>
                </div>
              </div>
              <div className={view === 'grid' ? "mt-3" : ""}>
                <p className="font-bold text-primary">{formatCurrency(p.price)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-primary text-white shadow-xl flex items-center justify-center active:scale-95 transition-transform">
        <Plus size={32} />
      </button>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
