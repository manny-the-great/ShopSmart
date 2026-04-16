import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

export function formatShortDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 9).toUpperCase();
}

export function generateReceiptNumber(): string {
  const prefix = 'SS';
  const number = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `${prefix}-${number}`;
}

export function getStockStatusLabel(status: string): string {
  switch (status) {
    case 'in_stock': return 'In Stock';
    case 'low_stock': return 'Low Stock';
    case 'out_of_stock': return 'Out of Stock';
    default: return 'Unknown';
  }
}

export function getStockStatusColor(status: string): string {
  switch (status) {
    case 'in_stock': return 'text-green-700 bg-green-50';
    case 'low_stock': return 'text-orange-700 bg-orange-50';
    case 'out_of_stock': return 'text-red-700 bg-red-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

export function computeStockStatus(stock: number): 'in_stock' | 'low_stock' | 'out_of_stock' {
  if (stock <= 0) return 'out_of_stock';
  if (stock <= 5) return 'low_stock';
  return 'in_stock';
}
