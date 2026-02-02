declare global {
  interface Window {
    PaystackPop: any;
  }
}

interface PaystackMetadata {
  donor_email: string;
  donor_first_name: string;
  donor_last_name: string;
  program: string;
  frequency: string;
}

interface PaystackConfig {
  key: string;
  email: string;
  amount: number;
  firstname: string;
  lastname: string;
  metadata: PaystackMetadata;
  callback: (response: any) => void;
  onClose: () => void;
}

export class PaystackService {
  private publicKey: string;

  constructor() {
    this.publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';
    
    if (!this.publicKey) {
      console.warn('Paystack public key not found. Please set NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in your environment variables.');
    }
  }

  initializePayment(config: Omit<PaystackConfig, 'key'>) {
    if (typeof window === 'undefined') {
      throw new Error('Paystack can only be initialized in the browser');
    }

    if (!window.PaystackPop) {
      throw new Error('Paystack SDK not loaded. Please ensure the Paystack script is loaded.');
    }

    const paystackConfig: PaystackConfig = {
      key: this.publicKey,
      ...config
    };

    const handler = window.PaystackPop.setup(paystackConfig);
    handler.openIframe();
  }

  formatAmount(amount: string | number): number {
    // Convert to kobo (smallest currency unit) - multiply by 100
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return Math.round(numericAmount * 100);
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Create a singleton instance
export const paystackService = new PaystackService();

// Helper function to load Paystack script dynamically
export const loadPaystackScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Cannot load script on server side'));
      return;
    }

    // Check if already loaded
    if (window.PaystackPop) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v2/inline.js';
    script.async = true;
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Paystack script'));
    
    document.head.appendChild(script);
  });
};