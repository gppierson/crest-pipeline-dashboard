import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function calculateCommission(price: number, rate: number, share: number): number {
  // Calculate base commission
  const baseCommission = price * (rate / 100);

  // Deduct 25% brokerage fee
  const afterBrokerageFee = baseCommission * 0.75;

  // Apply agent's share
  return afterBrokerageFee * (share / 100);
}
