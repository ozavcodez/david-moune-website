import { NextRequest, NextResponse } from 'next/server';
import Event from '../models/Event';


export async function createEvent(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      title, 
      description, 
      content, 
      startDate, 
      endDate, 
      location, 
      registrationLink, 
      isVirtual, 
      status,
      maxAttendees 
    } = body;

    // Validation
    if (!title || !description || !content || !startDate || !location) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate date format
    if (isNaN(Date.parse(startDate))) {
      return NextResponse.json(
        { message: 'Invalid start date' },
        { status: 400 }
      );
    }

    if (endDate && isNaN(Date.parse(endDate))) {
      return NextResponse.json(
        { message: 'Invalid end date' },
        { status: 400 }
      );
    }

    // Validate date logic
    if (endDate && new Date(startDate) >= new Date(endDate)) {
      return NextResponse.json(
        { message: 'End date must be after start date' },
        { status: 400 }
      );
    }

    // Status validation
    const validStatuses = ['draft', 'published', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { message: 'Invalid status' },
        { status: 400 }
      );
    }

    // Create event
    const event = new Event({
      title,
      description,
      content,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      location,
      registrationLink,
      isVirtual: isVirtual || false,
      status: status || 'draft',
      maxAttendees
    });

    await event.save();

    return NextResponse.json({
      message: 'Event created successfully',
      event
    });

  } catch (error) {
    console.error('Create event error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function getAllEvents(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const upcoming = searchParams.get('upcoming');

    // Build filter
    const filter: any = {};
    if (status) filter.status = status;
    if (upcoming === 'true') {
      filter.startDate = { $gte: new Date() };
      filter.status = 'published';
    }

    // Get events
    const events = await Event.find(filter)
      .sort({ startDate: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Get total count
    const total = await Event.countDocuments(filter);

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get events error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function getEventBySlug(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const slug = pathname.split('/').pop();

    if (!slug) {
      return NextResponse.json(
        { message: 'Slug is required' },
        { status: 400 }
      );
    }

    const event = await Event.findOne({ slug });
    if (!event) {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      );
    }

    // Only return published events
    if (event.status !== 'published') {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(event);

  } catch (error) {
    console.error('Get event error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function updateEvent(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const slug = pathname.split('/').pop();
    const body = await request.json();

    if (!slug) {
      return NextResponse.json(
        { message: 'Slug is required' },
        { status: 400 }
      );
    }

    const event = await Event.findOne({ slug });
    if (!event) {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      );
    }

    // Validate date logic if updating dates
    if (body.startDate || body.endDate) {
      const newStartDate = body.startDate ? new Date(body.startDate) : event.startDate;
      const newEndDate = body.endDate ? new Date(body.endDate) : event.endDate;
      
      if (newEndDate && newStartDate >= newEndDate) {
        return NextResponse.json(
          { message: 'End date must be after start date' },
          { status: 400 }
        );
      }
    }

    // Update event
    Object.keys(body).forEach(key => {
      if (body[key] !== undefined) {
        if (key === 'startDate' || key === 'endDate') {
          (event as any)[key] = new Date(body[key]);
        } else {
          (event as any)[key] = body[key];
        }
      }
    });

    await event.save();

    return NextResponse.json({
      message: 'Event updated successfully',
      event
    });

  } catch (error) {
    console.error('Update event error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function deleteEvent(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const slug = pathname.split('/').pop();

    if (!slug) {
      return NextResponse.json(
        { message: 'Slug is required' },
        { status: 400 }
      );
    }

    const event = await Event.findOne({ slug });
    if (!event) {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      );
    }

    await Event.findByIdAndDelete(event._id);

    return NextResponse.json({ message: 'Event deleted successfully' });

  } catch (error) {
    console.error('Delete event error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function registerForEvent(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const slug = pathname.split('/')[pathname.split('/').length - 2]; // Get slug from /api/events/[slug]/register
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    const event = await Event.findOne({ slug });
    if (!event) {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      );
    }

    if (event.status !== 'published') {
      return NextResponse.json(
        { message: 'Event is not published' },
        { status: 400 }
      );
    }

    if (event.startDate < new Date()) {
      return NextResponse.json(
        { message: 'Event has already started' },
        { status: 400 }
      );
    }

    if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
      return NextResponse.json(
        { message: 'Event is full' },
        { status: 400 }
      );
    }

    if (event.attendees.includes(email)) {
      return NextResponse.json(
        { message: 'Already registered for this event' },
        { status: 400 }
      );
    }

    event.attendees.push(email);
    await event.save();

    return NextResponse.json({ message: 'Successfully registered for event' });

  } catch (error) {
    console.error('Event registration error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}