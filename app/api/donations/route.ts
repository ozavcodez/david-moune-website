import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../backend/config/database';
import { initializePayment, verifyPayment, handleWebhook, getDonationStats } from '../../../backend/controllers/nextDonationController';

export async function POST(request: NextRequest) {
  await connectDB();
  
  const { pathname } = new URL(request.url);
  const pathParts = pathname.split('/');
  const action = pathParts[pathParts.length - 1];

  try {
    switch (action) {
      case 'webhook':
        return await handleWebhook(request);
      default:
        return await initializePayment(request);
    }
  } catch (error) {
    console.error('Donation API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  await connectDB();
  
  const { pathname } = new URL(request.url);
  const pathParts = pathname.split('/');
  const reference = pathParts[pathParts.length - 1];

  try {
    // Check if this is the webhook stats endpoint
    if (pathname.endsWith('/webhook/stats')) {
      return NextResponse.json(
        { message: 'Stats endpoint not found' },
        { status: 404 }
      );
    }
    
    // If it's not a reference, it might be a stats request
    if (reference === 'stats') {
      return await getDonationStats(request);
    }
    
    // Otherwise, treat as reference verification
    return await verifyPayment(request);
  } catch (error) {
    console.error('Donation API GET error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}