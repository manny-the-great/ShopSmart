'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Banknote, CreditCard, ArrowRightLeft } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useTransactionStore } from '@/store/useTransactionStore';
import { PaymentMethod, Transaction } from '@/types';
import { useRouter } from 'next/navigation';
import ReceiptModal from './ReceiptModal';

export default function PaymentButtons() {
  const { getTotal, clearCart } = useCartStore();
  const { addTransaction } = useTransactionStore();
  const router = useRouter();
  const [receipt, setReceipt] = useState<Transaction | null>(null);

  const handlePayment = (method: PaymentMethod) => {
    const amount = getTotal();
    if (amount <= 0) return;

    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      amount,
      paymentMethod: method,
      timestamp: new Date().toISOString(),
      cashier: 'Manny',
    };

    addTransaction(newTransaction);
    setReceipt(newTransaction);
    clearCart();
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 grid grid-cols-4 gap-3 z-50">
        <Button variant="cash" className="flex-col h-16 gap-1" onClick={() => handlePayment('cash')}>
          <Banknote size={20} />
          <span className="text-[10px] font-bold uppercase">Cash</span>
        </Button>
        <Button variant="transfer" className="flex-col h-16 gap-1" onClick={() => handlePayment('transfer')}>
          <ArrowRightLeft size={20} />
          <span className="text-[10px] font-bold uppercase">Trans</span>
        </Button>
        <Button variant="card" className="flex-col h-16 gap-1" onClick={() => handlePayment('card')}>
          <CreditCard size={20} />
          <span className="text-[10px] font-bold uppercase">Card</span>
        </Button>
        <Button variant="default" className="flex-col h-16 gap-1" onClick={() => router.push('/dashboard')}>
          <span className="text-xl font-bold">...</span>
          <span className="text-[10px] font-bold uppercase">More</span>
        </Button>
      </div>

      <ReceiptModal 
        transaction={receipt} 
        onClose={() => setReceipt(null)} 
      />
    </>
  );
}

