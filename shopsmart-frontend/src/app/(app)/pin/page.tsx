'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Delete, ShieldCheck, User } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

const PAD = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

export default function PinPage() {
  const router = useRouter();
  const { login, staff } = useAuthStore();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleKey = (key: string) => {
    if (key === 'del') {
      setPin((p) => p.slice(0, -1));
      setError(false);
      return;
    }
    if (key === '') return;
    if (pin.length >= 4) return;
    const next = pin + key;
    setPin(next);
    setError(false);

    if (next.length === 4) {
      setTimeout(() => {
        const success = login(next);
        if (success) {
          router.push('/home');
        } else {
          setError(true);
          setShake(true);
          setTimeout(() => {
            setPin('');
            setShake(false);
          }, 600);
        }
      }, 150);
    }
  };

  useEffect(() => {
    const handleKb = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleKey(e.key);
      if (e.key === 'Backspace') handleKey('del');
    };
    window.addEventListener('keydown', handleKb);
    return () => window.removeEventListener('keydown', handleKb);
  }, [pin]);

  // Get unique roles for display
  const vendorCount = staff.filter((s) => s.role === 'vendor').length;
  const attendantCount = staff.filter((s) => s.role === 'attendant').length;

  return (
    <div className="min-h-screen bg-[#F8F8F5] flex flex-col items-center justify-center px-5">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-[#22C55E] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
          <span className="text-white font-black text-3xl">S</span>
        </div>
        <h1 className="text-2xl font-black text-[#111827]">ShopSmart</h1>
        <p className="text-gray-400 text-sm mt-1">Enter your PIN to continue</p>
      </motion.div>

      {/* PIN card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-xs bg-white rounded-3xl shadow-sm border border-[#e8e8e4] p-8"
      >
        <div className="flex items-center justify-center mb-2">
          <ShieldCheck size={18} className="text-[#22C55E] mr-2" />
          <span className="text-sm font-semibold text-gray-600">Secure PIN Login</span>
        </div>

        {/* Dots */}
        <motion.div
          animate={shake ? { x: [-8, 8, -8, 8, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center gap-4 my-7"
        >
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: pin.length > i ? 1.2 : 1,
                backgroundColor: error
                  ? '#EF4444'
                  : pin.length > i
                  ? '#22C55E'
                  : '#e8e8e4',
              }}
              transition={{ duration: 0.15 }}
              className="w-4 h-4 rounded-full"
            />
          ))}
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-sm text-red-500 font-medium mb-4"
            >
              Incorrect PIN. Try again.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-3">
          {PAD.map((key, i) => (
            <button
              key={i}
              onClick={() => handleKey(key)}
              disabled={key === ''}
              className={`h-14 rounded-2xl font-bold text-xl transition-all active:scale-90 select-none ${
                key === ''
                  ? 'invisible'
                  : key === 'del'
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center'
                  : 'bg-[#F8F8F5] text-[#111827] hover:bg-green-50 hover:text-[#22C55E]'
              }`}
            >
              {key === 'del' ? <Delete size={22} /> : key}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Hint - who can log in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center gap-2 bg-white border border-[#e8e8e4] rounded-2xl px-5 py-3 shadow-sm">
          <User size={15} className="text-gray-400" />
          <span className="text-sm text-gray-500">
            <strong className="text-[#111827]">{vendorCount}</strong> vendor
            {vendorCount !== 1 ? 's' : ''} &middot;{' '}
            <strong className="text-[#111827]">{attendantCount}</strong> attendant
            {attendantCount !== 1 ? 's' : ''}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Demo: Vendor PIN <strong>1234</strong> · Attendant PINs <strong>5678</strong>, <strong>9012</strong>
        </p>
      </motion.div>
    </div>
  );
}
