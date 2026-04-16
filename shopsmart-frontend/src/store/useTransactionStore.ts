import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction } from '@/types';

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  clearTransactions: () => void;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN001',
    amount: 4500,
    paymentMethod: 'cash',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    cashier: 'Adaeze',
    cashierId: 'staff-2',
    receiptNumber: 'SS-00234',
    items: [
      { id: '7', name: 'Bottled Water', price: 300, category: 'Drinks', emoji: '💧', stock: 48, stockStatus: 'in_stock', quantity: 3 },
      { id: '2', name: 'Wheat Bread Loaf', price: 800, category: 'Bakery', emoji: '🍞', stock: 12, stockStatus: 'in_stock', quantity: 1 },
      { id: '8', name: 'Indomie Noodles', price: 450, category: 'Pantry', emoji: '🍜', stock: 3, stockStatus: 'low_stock', quantity: 6 },
    ],
  },
  {
    id: 'TXN002',
    amount: 12000,
    paymentMethod: 'card',
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    cashier: 'Adaeze',
    cashierId: 'staff-2',
    receiptNumber: 'SS-00233',
    items: [
      { id: '5', name: 'Arabica Coffee', price: 4500, category: 'Pantry', emoji: '☕', stock: 8, stockStatus: 'in_stock', quantity: 1 },
      { id: '9', name: 'Groundnut Oil', price: 3500, category: 'Pantry', emoji: '🫙', stock: 15, stockStatus: 'in_stock', quantity: 1 },
      { id: '4', name: 'Eggs (Crate of 12)', price: 2000, category: 'Dairy', emoji: '🥚', stock: 4, stockStatus: 'low_stock', quantity: 2 },
    ],
  },
  {
    id: 'TXN003',
    amount: 8500,
    paymentMethod: 'transfer',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    cashier: 'Emeka',
    cashierId: 'staff-3',
    receiptNumber: 'SS-00232',
    items: [
      { id: '1', name: 'Fresh Whole Milk', price: 1200, category: 'Dairy', emoji: '🥛', stock: 24, stockStatus: 'in_stock', quantity: 2 },
      { id: '10', name: 'Coca-Cola (Can)', price: 500, category: 'Drinks', emoji: '🥤', stock: 36, stockStatus: 'in_stock', quantity: 4 },
      { id: '3', name: 'Apple Juice', price: 1500, category: 'Drinks', emoji: '🧃', stock: 18, stockStatus: 'in_stock', quantity: 3 },
    ],
  },
  {
    id: 'TXN004',
    amount: 3200,
    paymentMethod: 'cash',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    cashier: 'Adaeze',
    cashierId: 'staff-2',
    receiptNumber: 'SS-00231',
    items: [
      { id: '7', name: 'Bottled Water', price: 300, category: 'Drinks', emoji: '💧', stock: 48, stockStatus: 'in_stock', quantity: 2 },
      { id: '8', name: 'Indomie Noodles', price: 450, category: 'Pantry', emoji: '🍜', stock: 3, stockStatus: 'low_stock', quantity: 4 },
      { id: '2', name: 'Wheat Bread Loaf', price: 800, category: 'Bakery', emoji: '🍞', stock: 12, stockStatus: 'in_stock', quantity: 2 },
    ],
  },
  {
    id: 'TXN005',
    amount: 22000,
    paymentMethod: 'transfer',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    cashier: 'Emeka',
    cashierId: 'staff-3',
    receiptNumber: 'SS-00230',
    items: [
      { id: '9', name: 'Groundnut Oil', price: 3500, category: 'Pantry', emoji: '🫙', stock: 15, stockStatus: 'in_stock', quantity: 4 },
      { id: '5', name: 'Arabica Coffee', price: 4500, category: 'Pantry', emoji: '☕', stock: 8, stockStatus: 'in_stock', quantity: 2 },
    ],
  },
];

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: MOCK_TRANSACTIONS,
      addTransaction: (t) =>
        set((state) => ({ transactions: [t, ...state.transactions] })),
      clearTransactions: () => set({ transactions: [] }),
    }),
    { name: 'shopsmart-transactions' }
  )
);
