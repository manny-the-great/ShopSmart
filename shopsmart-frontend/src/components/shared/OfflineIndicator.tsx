'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, RefreshCw } from 'lucide-react';

export default function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);
  const [showSyncing, setShowSyncing] = useState(false);

  useEffect(() => {
    const handleOffline = () => {
      setIsOffline(true);
      setShowSyncing(false);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setShowSyncing(true);
      setTimeout(() => setShowSyncing(false), 3000);
    };

    // Initial check
    setIsOffline(!navigator.onLine);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <AnimatePresence>
      {(isOffline || showSyncing) && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-4 py-2.5 rounded-full shadow-xl text-sm font-bold ${
            isOffline
              ? 'bg-red-500 text-white'
              : 'bg-[#22C55E] text-white'
          }`}
        >
          {isOffline ? (
            <>
              <WifiOff size={15} />
              No internet — working offline
            </>
          ) : (
            <>
              <RefreshCw size={15} className="animate-spin" />
              Syncing...
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
