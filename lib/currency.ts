// Currency conversion utilities for donations
export interface CurrencyConfig {
  rate: number; // USD to NGN exchange rate
  lastUpdated: string;
  source: string;
}

// Current exchange rate (update this regularly or use an API)
export const CURRENCY_CONFIG: CurrencyConfig = {
  rate: 1500, // 1 USD = 1500 NGN (approximate)
  lastUpdated: "2024-01-15",
  source: "Manual - Update regularly"
};

export function convertUSDToNGN(usdAmount: number): number {
  return usdAmount * CURRENCY_CONFIG.rate;
}

export function formatCurrency(amount: number, currency: 'USD' | 'NGN' = 'USD'): string {
  if (currency === 'NGN') {
    return `₦${amount.toLocaleString()}`;
  }
  return `$${amount.toLocaleString()}`;
}

export function getExchangeRateInfo(): string {
  return `1 USD = ${CURRENCY_CONFIG.rate.toLocaleString()} NGN (Last updated: ${CURRENCY_CONFIG.lastUpdated})`;
}