import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../backend/config/database';
import { 
  createEvent, 
  getAllEvents, 
  getEventBySlug, 
  updateEvent, 
  deleteEvent,
  registerForEvent
} from '../../../backend/controllers/nextEventController';

export async function GET(request: NextRequest) {
  await connectDB();
  
  const { pathname } = new URL(request.url);
  
  try {
    // Check if this is a specific event request (e.g., /api/events/some-slug)
    const pathParts = pathname.split('/');
    if (pathParts.length > 3 && pathParts[3] && !pathname.includes('/register')) { // If there's a slug after /events/
      return await getEventBySlug(request);
    } else {
      // Otherwise, return all events
      return await getAllEvents(request);
    }
  } catch (error) {
    console.error('Events GET API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await connectDB();
  
  const { pathname } = new URL(request.url);
  
  try {
    // Check if this is a registration request (e.g., /api/events/some-slug/register)
    if (pathname.includes('/register')) {
      return await registerForEvent(request);
    } else {
      // Check if this is a protected route by verifying JWT
      const authHeader = request.headers.get('authorization');
      if (!authHeader) {
        return NextResponse.json(
          { message: 'Authorization required' },
          { status: 401 }
        );
      }
      
      return await createEvent(request);
    }
  } catch (error) {
    console.error('Events POST API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  await connectDB();
  
  try {
    // Check if this is a protected route by verifying JWT
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { message: 'Authorization required' },
        { status: 401 }
      );
    }
    
    return await updateEvent(request);
  } catch (error) {
    console.error('Events PUT API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  await connectDB();
  
  try {
    // Check if this is a protected route by verifying JWT
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { message: 'Authorization required' },
        { status: 401 }
      );
    }
    
    return await deleteEvent(request);
  } catch (error) {
    console.error('Events DELETE API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}