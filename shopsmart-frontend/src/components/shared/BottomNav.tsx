'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutGrid, ShoppingBag, History, PieChart } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/pin' || pathname === '/') return null;

  const navItems = [
    { icon: LayoutGrid, label: 'POS', path: '/pos' },
    { icon: ShoppingBag, label: 'Catalogue', path: '/products' },
    { icon: History, label: 'History', path: '/transactions' },
    { icon: PieChart, label: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t flex items-center justify-around px-2 z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all",
              isActive ? "text-primary scale-110" : "text-muted-foreground"
            )}
          >
            <item.icon size={24} fill={isActive ? "currentColor" : "none"} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
