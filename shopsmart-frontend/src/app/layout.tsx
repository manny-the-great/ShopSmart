import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ShopSmart — Manage your business. Track every sale.',
  description: 'ShopSmart is the modern POS and business management platform for vendors. Track sales, manage inventory, record walk-in orders, and monitor income — all in one place.',
  keywords: ['POS', 'point of sale', 'sales tracking', 'inventory management', 'vendor management', 'Nigeria'],
  authors: [{ name: 'ShopSmart Technologies' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ShopSmart',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#22C55E',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
