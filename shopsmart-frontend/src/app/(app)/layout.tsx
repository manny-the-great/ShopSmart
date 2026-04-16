'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import {
  Home,
  ShoppingCart,
  Package,
  BarChart3,
  ClipboardList,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import OfflineIndicator from '@/components/shared/OfflineIndicator';

const VENDOR_TABS = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/pos', icon: ShoppingCart, label: 'POS' },
  { href: '/inventory', icon: Package, label: 'Stock' },
  { href: '/dashboard', icon: BarChart3, label: 'Sales' },
  { href: '/transactions', icon: ClipboardList, label: 'History' },
  { href: '/staff', icon: Users, label: 'Staff' },
];

const ATTENDANT_TABS = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/pos', icon: ShoppingCart, label: 'New Sale' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, isAuthenticated } = useAuthStore();
  const isVendor = currentUser?.role === 'vendor';
  const tabs = isVendor ? VENDOR_TABS : ATTENDANT_TABS;

  // Client-side auth guard — fallback if middleware cookie hasn't been set yet
  useEffect(() => {
    if (!isAuthenticated && pathname !== '/pin') {
      router.replace('/pin');
    }
  }, [isAuthenticated, pathname, router]);

  // Don't show bottom nav on pin screen
  if (pathname === '/pin') {
    return (
      <div className="max-w-md mx-auto bg-[#F8F8F5] min-h-screen relative overflow-x-hidden">
        {children}
        <OfflineIndicator />
      </div>
    );
  }

  // While redirecting / not authenticated
  if (!isAuthenticated) return null;

  return (
    <div className="max-w-md mx-auto bg-[#F8F8F5] min-h-screen shadow-2xl relative flex flex-col overflow-x-hidden">
      <div className="flex-1 overflow-y-auto pb-20">{children}</div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#e8e8e4] z-50">
        <div className={`grid h-[60px] ${isVendor ? 'grid-cols-6' : 'grid-cols-2'}`}>
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  'relative flex flex-col items-center justify-center gap-0.5 transition-colors',
                  active ? 'text-[#22C55E]' : 'text-gray-400 hover:text-gray-600'
                )}
              >
                {active && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#22C55E] rounded-full" />
                )}
                <tab.icon
                  size={active ? 19 : 18}
                  strokeWidth={active ? 2.5 : 1.8}
                />
                <span className={cn('text-[8px] font-bold uppercase tracking-tight', active ? 'text-[#22C55E]' : 'text-gray-400')}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <OfflineIndicator />
    </div>
  );
}
