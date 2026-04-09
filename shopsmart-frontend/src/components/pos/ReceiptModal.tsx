'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';
import { Transaction } from '@/types';

interface ReceiptModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export default function ReceiptModal({ transaction, onClose }: ReceiptModalProps) {
  if (!transaction) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-xs"
        >
          <Card className="p-6 bg-white overflow-hidden relative">
            {/* Scalloped top edge effect */}
            <div className="flex flex-col items-center gap-2 mb-6 border-b border-dashed pb-6">
              <h2 className="text-xl font-black uppercase tracking-tighter italic">ShopSmart</h2>
              <p className="text-[10px] text-muted-foreground uppercase text-center font-bold">
                Trans ID: {transaction.id}<br />
                {new Date(transaction.timestamp).toLocaleString()}<br />
                Cashier: {transaction.cashier}
              </p>
            </div>

            <div className="space-y-4 mb-8">
               <div className="flex justify-between items-center">
                  <span className="text-sm font-bold uppercase">Total Amount</span>
                  <span className="text-2xl font-black">{formatCurrency(transaction.amount)}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">Payment Method</span>
                  <span className="text-[10px] font-bold uppercase">{transaction.paymentMethod}</span>
               </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button onClick={onClose} className="w-full">Done</Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Printer size={14} /> Print
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 size={14} /> Share
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
