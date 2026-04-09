'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PinPage() {
  const [pin, setPin] = useState<string>('');
  const router = useRouter();

  const handlePress = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        // Mock auth success
        setTimeout(() => router.push('/pos'), 300);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">ShopSmart</h1>
          <p className="text-muted-foreground">Enter your staff PIN</p>
        </div>

        {/* PIN Indicators */}
        <div className="flex gap-4">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={cn(
                "w-4 h-4 rounded-full border-2 transition-colors",
                pin.length > i ? "bg-primary border-primary" : "border-muted"
              )}
              animate={pin.length > i ? { scale: [1, 1.2, 1] } : {}}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-[280px]">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handlePress(num)}
              className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-2xl font-semibold active:bg-primary active:text-white transition-colors"
            >
              {num}
            </button>
          ))}
          <div className="w-16 h-16" />
          <button
            onClick={() => handlePress('0')}
            className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-2xl font-semibold active:bg-primary active:text-white transition-colors"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="w-16 h-16 rounded-full flex items-center justify-center text-muted-foreground active:text-foreground"
          >
            <Delete />
          </button>
        </div>
      </div>
    </div>
  );
}
