import { create } from 'zustand';
import { Transaction } from '@/types';

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [
    { id: '1', amount: 4500, paymentMethod: 'cash', timestamp: '2024-04-09T08:30:00Z', cashier: 'Manny' },
    { id: '2', amount: 12000, paymentMethod: 'card', timestamp: '2024-04-09T09:15:00Z', cashier: 'Manny' },
  ],
  addTransaction: (t) => set((state) => ({ transactions: [t, ...state.transactions] })),
}));
