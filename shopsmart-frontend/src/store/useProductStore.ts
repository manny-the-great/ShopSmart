import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, StockStatus } from '@/types';
import { computeStockStatus } from '@/lib/utils';

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  updateStock: (id: string, quantity: number) => void;
  deleteProduct: (id: string) => void;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Fresh Whole Milk',
    price: 1200,
    category: 'Dairy',
    emoji: '🥛',
    stock: 24,
    stockStatus: 'in_stock',
    description: 'Fresh pasteurized whole milk, 1L',
    sku: 'DAI-001',
  },
  {
    id: '2',
    name: 'Wheat Bread Loaf',
    price: 800,
    category: 'Bakery',
    emoji: '🍞',
    stock: 12,
    stockStatus: 'in_stock',
    description: 'Soft whole wheat bread, large loaf',
    sku: 'BAK-001',
  },
  {
    id: '3',
    name: 'Apple Juice',
    price: 1500,
    category: 'Drinks',
    emoji: '🧃',
    stock: 18,
    stockStatus: 'in_stock',
    description: 'Natural apple juice, no added sugar, 500ml',
    sku: 'DRK-001',
  },
  {
    id: '4',
    name: 'Eggs (Crate of 12)',
    price: 2000,
    category: 'Dairy',
    emoji: '🥚',
    stock: 4,
    stockStatus: 'low_stock',
    description: 'Fresh farm eggs, crate of 12',
    sku: 'DAI-002',
  },
  {
    id: '5',
    name: 'Arabica Coffee',
    price: 4500,
    category: 'Pantry',
    emoji: '☕',
    stock: 8,
    stockStatus: 'in_stock',
    description: 'Premium arabica coffee beans, 250g',
    sku: 'PAN-001',
  },
  {
    id: '6',
    name: 'Tomatoes (Pack)',
    price: 500,
    category: 'Vegetables',
    emoji: '🍅',
    stock: 0,
    stockStatus: 'out_of_stock',
    description: 'Fresh red tomatoes, pack of 6',
    sku: 'VEG-001',
  },
  {
    id: '7',
    name: 'Bottled Water',
    price: 300,
    category: 'Drinks',
    emoji: '💧',
    stock: 48,
    stockStatus: 'in_stock',
    description: 'Pure table water, 75cl',
    sku: 'DRK-002',
  },
  {
    id: '8',
    name: 'Indomie Noodles',
    price: 450,
    category: 'Pantry',
    emoji: '🍜',
    stock: 3,
    stockStatus: 'low_stock',
    description: 'Indomie instant noodles, chicken flavor',
    sku: 'PAN-002',
  },
  {
    id: '9',
    name: 'Groundnut Oil',
    price: 3500,
    category: 'Pantry',
    emoji: '🫙',
    stock: 15,
    stockStatus: 'in_stock',
    description: 'Refined groundnut oil, 2L bottle',
    sku: 'PAN-003',
  },
  {
    id: '10',
    name: 'Coca-Cola (Can)',
    price: 500,
    category: 'Drinks',
    emoji: '🥤',
    stock: 36,
    stockStatus: 'in_stock',
    description: 'Coca-Cola original can, 330ml',
    sku: 'DRK-003',
  },
];

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: INITIAL_PRODUCTS,
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      updateStock: (id, quantity) =>
        set((state) => ({
          products: state.products.map((p) => {
            if (p.id !== id) return p;
            const newStock = Math.max(0, quantity);
            return {
              ...p,
              stock: newStock,
              stockStatus: computeStockStatus(newStock),
            };
          }),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
    }),
    { name: 'shopsmart-products' }
  )
);
