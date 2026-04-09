import { create } from 'zustand';
import { Product } from '@/types';

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
}

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Fresh Milk', price: 1200, category: 'Dairy', emoji: '🥛' },
  { id: '2', name: 'Wheat Bread', price: 800, category: 'Bakery', emoji: '🍞' },
  { id: '3', name: 'Apple Juice', price: 1500, category: 'Drinks', emoji: '🧃' },
  { id: '4', name: 'Eggs (12)', price: 2000, category: 'Dairy', emoji: '🥚' },
  { id: '5', name: 'Coffee Beans', price: 4500, category: 'Pantry', emoji: '☕' },
  { id: '6', name: 'Tomatoes', price: 500, category: 'Veg', emoji: '🍅' },
];

export const useProductStore = create<ProductState>((set) => ({
  products: INITIAL_PRODUCTS,
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
}));
