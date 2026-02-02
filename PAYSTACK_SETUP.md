# Paystack Integration Setup

## Prerequisites

1. Create a Paystack account at [https://paystack.com](https://paystack.com)
2. Get your API keys from the Paystack dashboard

## Setup Instructions

### 1. Environment Variables

Update the `.env.local` file with your actual Paystack keys:

```env
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_actual_public_key_here
PAYSTACK_SECRET_KEY=sk_live_your_actual_secret_key_here
```

For testing, you can use test keys:
```env
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_test_public_key_here
PAYSTACK_SECRET_KEY=sk_test_your_test_secret_key_here
```

### 2. Key Features Implemented

- ✅ Dynamic Paystack script loading
- ✅ Form validation (amount, email)
- ✅ Secure payment processing
- ✅ Transaction metadata collection
- ✅ Loading states and user feedback
- ✅ Success/error handling
- ✅ Responsive UI with Tailwind CSS

### 3. How It Works

1. User fills donation form with amount, frequency, and personal details
2. On submit, Paystack payment modal opens
3. User completes payment on Paystack's secure platform
4. Upon successful payment, user sees confirmation screen
5. Transaction reference is logged (ready for backend verification)

### 4. Next Steps for Production

To fully implement in production, you should:

1. **Backend Verification**: Create an API endpoint to verify transactions using Paystack's verify endpoint
2. **Database Storage**: Store successful donations in your database
3. **Email Notifications**: Send automated receipts to donors
4. **Webhook Handling**: Set up Paystack webhooks for automatic payment notifications
5. **Security**: Move secret key handling to backend only

### 5. Test Cards

For testing, use these Paystack test cards:
- **Success**: 4084084084084081 (any future expiry date, any 3-digit CVV)
- **Failure**: 5060506050605060 (any future expiry date, any 3-digit CVV)

### 6. Customization

You can customize:
- Payment button text and styling
- Success/failure messages
- Metadata collected
- Callback behavior
- Form fields and validation

The integration is now ready for testing!