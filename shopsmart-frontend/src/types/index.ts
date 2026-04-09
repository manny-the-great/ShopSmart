export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  emoji: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type PaymentMethod = 'cash' | 'transfer' | 'card';

export interface Transaction {
  id: string;
  amount: number;
  paymentMethod: PaymentMethod;
  timestamp: string;
  cashier: string;
}
