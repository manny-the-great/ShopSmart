export type PaymentMethod = 'cash' | 'transfer' | 'card';
export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';
export type UserRole = 'vendor' | 'attendant';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  emoji: string;
  image?: string;
  stock: number;
  stockStatus: StockStatus;
  description?: string;
  sku?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Transaction {
  id: string;
  amount: number;
  paymentMethod: PaymentMethod;
  timestamp: string;
  cashier: string;
  cashierId?: string;
  items: CartItem[];
  note?: string;
  receiptNumber?: string;
}

export interface Staff {
  id: string;
  name: string;
  pin: string;
  role: UserRole;
  avatar?: string;
  salesCount?: number;
  totalRevenue?: number;
  createdAt: string;
  active: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  logo?: string;
  pin: string;
  createdAt: string;
}

export interface ChartData {
  name: string;
  revenue: number;
  cash?: number;
  transfer?: number;
  card?: number;
}
