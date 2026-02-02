import { Request, Response } from 'express';
import axios from 'axios';
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

export const initializePayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      amount,
      email,
      firstName,
      lastName,
      phone,
      program,
      frequency,
      callbackUrl
    } = req.body;

    // Validate required fields
    if (!amount || !email || !firstName || !lastName) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: 'Invalid email format' });
      return;
    }

    // Validate amount (minimum 100 kobo = 1 NGN)
    if (amount < 100) {
      res.status(400).json({ message: 'Minimum donation is 1 NGN' });
      return;
    }

    // Create a temporary donation record
    const tempDonation = new Donation({
      amount,
      email,
      firstName,
      lastName,
      phone,
      program: program || 'general',
      frequency: frequency || 'one-time',
      status: 'pending',
      paystackReference: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      transactionId: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });

    await tempDonation.save();

    // Prepare Paystack request
    const paystackData = {
      amount,
      email,
      firstname: firstName,
      lastname: lastName,
      phone,
      metadata: {
        donor_email: email,
        donor_first_name: firstName,
        donor_last_name: lastName,
        program: program || 'general',
        frequency: frequency || 'one-time',
        donationId: tempDonation._id
      },
      callback_url: callbackUrl || `${process.env.FRONTEND_URL}/donate/success`,
      channels: ['card', 'bank', 'ussd']
    };

    // Call Paystack API
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      paystackData,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.status) {
      // Update donation with Paystack reference
      tempDonation.paystackReference = response.data.data.reference;
      await tempDonation.save();

      res.json({
        status: true,
        message: 'Payment initialized',
        data: {
          authorization_url: response.data.data.authorization_url,
          reference: response.data.data.reference,
          donationId: tempDonation._id
        }
      });
    } else {
      // Delete temporary donation if Paystack fails
      await Donation.findByIdAndDelete(tempDonation._id);
      res.status(500).json({ message: 'Failed to initialize payment' });
    }
  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reference } = req.params;

    if (!reference) {
      res.status(400).json({ message: 'Reference is required' });
      return;
    }

    // Call Paystack verification API
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    if (response.data.status && response.data.data.status === 'success') {
      const transaction = response.data.data;

      // Find the donation record
      const donation = await Donation.findOne({
        paystackReference: reference
      });

      if (!donation) {
        res.status(404).json({ message: 'Donation record not found' });
        return;
      }

      // Update donation status
      donation.status = 'success';
      donation.transactionId = transaction.id.toString();
      donation.paymentMethod = transaction.channel as 'card' | 'bank-transfer' | 'ussd';
      donation.metadata = {
        ...donation.metadata,
        paystackData: transaction
      };

      await donation.save();

      res.json({
        status: true,
        message: 'Payment verified successfully',
        data: {
          donationId: donation._id,
          amount: donation.amount,
          status: donation.status,
          transactionId: donation.transactionId
        }
      });
    } else {
      // Update donation status to failed
      const donation = await Donation.findOne({
        paystackReference: reference
      });

      if (donation) {
        donation.status = 'failed';
        await donation.save();
      }

      res.status(400).json({
        status: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const handleWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    const event: PaystackWebhookEvent = req.body;

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

    res.status(200).json({ message: 'Webhook processed' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getDonationStats = async (req: any, res: Response): Promise<void> => {
  try {
    const stats = await Donation.aggregate([
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

    const programStats = await Donation.aggregate([
      { $match: { status: 'success' } },
      {
        $group: {
          _id: '$program',
          count: { $sum: 1 },
          total: { $sum: '$amount' }
        }
      }
    ]);

    res.json({
      overall: stats[0] || { totalAmount: 0, totalDonations: 0, avgAmount: 0 },
      byProgram: programStats
    });
  } catch (error) {
    console.error('Donation stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};