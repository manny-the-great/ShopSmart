import React from 'react';
import BottomNav from "../../components/shared/BottomNav";
import OfflineIndicator from "../../components/shared/OfflineIndicator";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-md mx-auto bg-[var(--background)] min-h-screen shadow-2xl relative overflow-x-hidden">
      {children}
      <BottomNav />
      <OfflineIndicator />
    </div>
  );
}
