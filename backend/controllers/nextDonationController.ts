import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import mongoose from 'mongoose';
import Donation from '../models/Donation';

export interface PaystackWebhookEvent {
  event: string;
  data: {
    id: number;
    status: string;
    reference: string;
    amount: number;
    currency: string;
    metadata: {
      donor_email: string;
      donor_first_name: string;
      donor_last_name: string;
      program: string;
      frequency: string;
    };
    customer: {
      email: string;
      first_name: string;
      last_name: string;
      phone: string;
    };
  };
}

export async function initializePayment(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      amount,
      email,
      firstName,
      lastName,
      phone,
      program,
      frequency,
      currency,
      callbackUrl
    } = body;

    const normalizedCurrency = String(currency || 'NGN').toUpperCase();
    const normalizedAmount = Number(amount);

    // Validate required fields
    if (!normalizedAmount || !email || !firstName || !lastName) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!['NGN', 'USD'].includes(normalizedCurrency)) {
      return NextResponse.json(
        { message: 'Unsupported currency' },
        { status: 400 }
      );
    }

    // Validate amount (minimum 100 smallest units = $1 or ₦1)
    if (normalizedAmount < 100) {
      return NextResponse.json(
        { message: 'Minimum donation is 1.00 in the selected currency' },
        { status: 400 }
      );
    }

    // Ensure Paystack secret key is configured
    const paystackKey = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackKey) {
      return NextResponse.json(
        { message: 'Paystack secret key is not configured. Set PAYSTACK_SECRET_KEY in your environment.' },
        { status: 500 }
      );
    }

    const tempDonationId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const tempTransactionId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    let tempDonation: any = null;

    if (mongoose.connection.readyState === 1) {
      tempDonation = new Donation({
        amount: normalizedAmount,
        currency: normalizedCurrency,
        email,
        firstName,
        lastName,
        phone,
        program: program || 'general',
        frequency: frequency || 'one-time',
        status: 'pending',
        paystackReference: tempDonationId,
        transactionId: tempTransactionId
      });

      try {
        await tempDonation.save();
      } catch (dbError) {
        console.warn('Donation save skipped because MongoDB persistence is unavailable.');
        tempDonation = null;
      }
    }

    // Prepare Paystack request
    const paystackData = {
      amount: normalizedAmount,
      email,
      firstname: firstName,
      lastname: lastName,
      phone,
      currency: normalizedCurrency,
      metadata: {
        donor_email: email,
        donor_first_name: firstName,
        donor_last_name: lastName,
        program: program || 'general',
        frequency: frequency || 'one-time',
        currency: normalizedCurrency,
        donationId: tempDonation?._id?.toString() || tempDonationId
      },
      callback_url: callbackUrl || `${process.env.FRONTEND_URL || 'http://localhost:3000'}/donate/success`,
      channels: ['card', 'bank', 'ussd']
    };

    // Call Paystack API
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      paystackData,
      {
        headers: {
          Authorization: `Bearer ${paystackKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.status) {
      if (tempDonation) {
        try {
          tempDonation.paystackReference = response.data.data.reference;
          await tempDonation.save();
        } catch (dbError) {
          console.warn('Donation reference update skipped because MongoDB persistence is unavailable.');
        }
      }

      return NextResponse.json({
        status: true,
        message: 'Payment initialized',
        data: {
          authorization_url: response.data.data.authorization_url,
          reference: response.data.data.reference,
          donationId: tempDonation?._id?.toString() || tempDonationId
        }
      });
    } else {
      if (tempDonation) {
        try {
          await Donation.findByIdAndDelete(tempDonation._id);
        } catch (dbError) {
          console.warn('Donation cleanup skipped because MongoDB persistence is unavailable.');
        }
      }
      return NextResponse.json(
        { message: 'Failed to initialize payment' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Payment initialization error:', error);

    if (error.response?.status === 403 && normalizedCurrency === 'USD') {
      return NextResponse.json(
        {
          message: 'USD payments are currently unavailable with the configured Paystack account.',
          details: 'Please switch to NGN for now or contact support to enable USD payments.'
        },
        { status: 403 }
      );
    }

    // Check if it's an Axios error with a response from Paystack
    if (error.response && error.response.data) {
      const responseMessage = error.response.data?.message || error.response.data;
      return NextResponse.json(
        {
          message: 'Paystack error',
          details: responseMessage
        },
        { status: error.response.status || 500 }
      );
    }

    // Fallback for other errors
    return NextResponse.json(
      { message: 'Server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function verifyPayment(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const reference = pathname.split('/').pop();

    if (!reference) {
      return NextResponse.json(
        { message: 'Reference is required' },
        { status: 400 }
      );
    }

    // Call Paystack verification API
    const paystackKeyVerify = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackKeyVerify) {
      return NextResponse.json(
        { message: 'Paystack secret key is not configured. Set PAYSTACK_SECRET_KEY in your environment.' },
        { status: 500 }
      );
    }

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${paystackKeyVerify}`
        }
      }
    );

    if (response.data.status && response.data.data.status === 'success') {
      const transaction = response.data.data;

      if (mongoose.connection.readyState === 1) {
        const donation = await Donation.findOne({
          paystackReference: reference
        });

        if (!donation) {
          return NextResponse.json(
            { message: 'Donation record not found' },
            { status: 404 }
          );
        }

        donation.status = 'success';
        donation.transactionId = transaction.id.toString();
        donation.paymentMethod = transaction.channel as 'card' | 'bank-transfer' | 'ussd';
        donation.metadata = {
          ...donation.metadata,
          paystackData: transaction
        };

        await donation.save();

        return NextResponse.json({
          status: true,
          message: 'Payment verified successfully',
          data: {
            donationId: donation._id,
            amount: donation.amount,
            status: donation.status,
            transactionId: donation.transactionId
          }
        });
      }

      return NextResponse.json({
        status: true,
        message: 'Payment verified successfully',
        data: {
          donationId: reference,
          amount: transaction.amount || 0,
          status: 'success',
          transactionId: transaction.id.toString()
        }
      });
    } else {
      if (mongoose.connection.readyState === 1) {
        const donation = await Donation.findOne({
          paystackReference: reference
        });

        if (donation) {
          donation.status = 'failed';
          await donation.save();
        }
      }

      return NextResponse.json(
        {
          status: false,
          message: 'Payment verification failed'
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function handleWebhook(request: NextRequest) {
  try {
    const event: PaystackWebhookEvent = await request.json();

    if (mongoose.connection.readyState !== 1) {
      return NextResponse.json({ message: 'Webhook processed in test mode' });
    }

    switch (event.event) {
      case 'charge.success':
        const donation = await Donation.findOne({
          paystackReference: event.data.reference
        });

        if (donation) {
          donation.status = 'success';
          donation.transactionId = event.data.id.toString();
          donation.paymentMethod = event.data.metadata.payment_channel as 'card' | 'bank-transfer' | 'ussd';
          await donation.save();
        }
        break;

      case 'charge.failed':
        const failedDonation = await Donation.findOne({
          paystackReference: event.data.reference
        });

        if (failedDonation) {
          failedDonation.status = 'failed';
          await failedDonation.save();
        }
        break;
    }

    return NextResponse.json({ message: 'Webhook processed' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function getDonationStats(request: NextRequest) {
  try {
    // Verify JWT token for admin access
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { message: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { message: 'Access token required' },
        { status: 401 }
      );
    }

    // Decode JWT token to verify admin access
    const jwt = await import('jsonwebtoken');
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || '') as {
        userId: string;
        role?: string;
      };
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 403 }
      );
    }

    // // Check if user has admin role
    // const User = (await import('../../models/User')).default;
    // const user = await User.findById(decoded.userId).select('role');
    // if (!user || user.role !== 'admin') {
    //   return NextResponse.json(
    //     { message: 'Admin access required' },
    //     { status: 403 }
    //   );
    // }

    const DonationModel = (await import('../models/Donation')).default;
    const stats = await DonationModel.aggregate([
      { $match: { status: 'success' } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          totalDonations: { $sum: 1 },
          avgAmount: { $avg: '$amount' }
        }
      }
    ]);

    const programStats = await DonationModel.aggregate([
      { $match: { status: 'success' } },
      {
        $group: {
          _id: '$program',
          count: { $sum: 1 },
          total: { $sum: '$amount' }
        }
      }
    ]);

    return NextResponse.json({
      overall: stats[0] || { totalAmount: 0, totalDonations: 0, avgAmount: 0 },
      byProgram: programStats
    });
  } catch (error) {
    console.error('Donation stats error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}