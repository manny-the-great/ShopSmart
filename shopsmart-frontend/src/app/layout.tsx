import React from 'react';
import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "../components/shared/BottomNav";
import OfflineIndicator from "../components/shared/OfflineIndicator";

export const metadata: Metadata = {
  title: "ShopSmart POS",
  description: "Modern Mobile POS",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="max-w-md mx-auto bg-background min-h-screen shadow-2xl relative overflow-x-hidden">
          {children}
          <BottomNav />
          <OfflineIndicator />
        </main>
      </body>
    </html>
  );
}
