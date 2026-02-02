import { Schema, model, Document } from 'mongoose';

export interface IDonation extends Document {
  amount: number;
  currency: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  program: string;
  frequency: 'one-time' | 'monthly' | 'quarterly' | 'yearly';
  paystackReference: string;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'bank-transfer' | 'ussd';
  transactionId: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema = new Schema<IDonation>({
  amount: {
    type: Number,
    required: true,
    min: 100 // Minimum donation in kobo
  },
  currency: {
    type: String,
    default: 'NGN'
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  program: {
    type: String,
    required: true,
    enum: ['general', 'education', 'healthcare', 'research', 'orphanage', 'sickle-cell']
  },
  frequency: {
    type: String,
    enum: ['one-time', 'monthly', 'quarterly', 'yearly'],
    default: 'one-time'
  },
  paystackReference: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'bank-transfer', 'ussd']
  },
  transactionId: {
    type: String,
    required: true
  },
  metadata: {
    type: Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Index for better query performance
DonationSchema.index({ email: 1 });
DonationSchema.index({ status: 1 });
DonationSchema.index({ createdAt: -1 });

export default model<IDonation>('Donation', DonationSchema);