import { Request, Response } from 'express';
import { body, validationResult, query } from 'express-validator';
import Event from '../models/Event';
import { uploadImage, deleteImage } from '../utils/imageUpload';

export const createEvent = [
  // Validation
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('startDate').isISO8601().withMessage('Start date must be a valid date'),
  body('location').notEmpty().withMessage('Location is required'),
  body('status').optional().isIn(['draft', 'published', 'cancelled']).withMessage('Invalid status'),

  async (req: any, res: Response): Promise<void> => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

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
      } = req.body;

      // Validate date logic
      if (endDate && new Date(startDate) >= new Date(endDate)) {
        res.status(400).json({ message: 'End date must be after start date' });
        return;
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

      res.status(201).json({
        message: 'Event created successfully',
        event
      });
    } catch (error) {
      console.error('Create event error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
];

export const getAllEvents = [
  // Validation
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['draft', 'published', 'cancelled']).withMessage('Invalid status'),
  query('upcoming').optional().isBoolean().withMessage('Upcoming must be boolean'),

  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string;
      const upcoming = req.query.upcoming === 'true';

      // Build filter
      const filter: any = {};
      if (status) filter.status = status;
      if (upcoming) {
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

      res.json({
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
      res.status(500).json({ message: 'Server error' });
    }
  }
];

export const getEventBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const event = await Event.findOne({ slug });
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    // Only return unpublished events for authenticated users
    if (event.status !== 'published') {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    res.json(event);
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateEvent = [
  // Validation
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('startDate').optional().isISO8601().withMessage('Start date must be a valid date'),
  body('status').optional().isIn(['draft', 'published', 'cancelled']).withMessage('Invalid status'),

  async (req: any, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { slug } = req.params;
      const updates = req.body;

      const event = await Event.findOne({ slug });
      if (!event) {
        res.status(404).json({ message: 'Event not found' });
        return;
      }

      // Validate date logic if updating dates
      if (updates.startDate || updates.endDate) {
        const newStartDate = updates.startDate ? new Date(updates.startDate) : event.startDate;
        const newEndDate = updates.endDate ? new Date(updates.endDate) : event.endDate;
        
        if (newEndDate && newStartDate >= newEndDate) {
          res.status(400).json({ message: 'End date must be after start date' });
          return;
        }
      }

      // Update event
      Object.keys(updates).forEach(key => {
        if (updates[key] !== undefined) {
          if (key === 'startDate' || key === 'endDate') {
            (event as any)[key] = new Date(updates[key]);
          } else {
            (event as any)[key] = updates[key];
          }
        }
      });

      await event.save();

      res.json({
        message: 'Event updated successfully',
        event
      });
    } catch (error) {
      console.error('Update event error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
];

export const deleteEvent = async (req: any, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const event = await Event.findOne({ slug });
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    // Delete featured image from Cloudinary if exists
    if (event.featuredImage) {
      try {
        const publicId = event.featuredImage.split('/').pop()?.split('.')[0];
        if (publicId) {
          await deleteImage(publicId);
        }
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }

    await Event.findByIdAndDelete(event._id);

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const registerForEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }

    const event = await Event.findOne({ slug });
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    if (event.status !== 'published') {
      res.status(400).json({ message: 'Event is not published' });
      return;
    }

    if (event.startDate < new Date()) {
      res.status(400).json({ message: 'Event has already started' });
      return;
    }

    if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
      res.status(400).json({ message: 'Event is full' });
      return;
    }

    if (event.attendees.includes(email)) {
      res.status(400).json({ message: 'Already registered for this event' });
      return;
    }

    event.attendees.push(email);
    await event.save();

    res.json({ message: 'Successfully registered for event' });
  } catch (error) {
    console.error('Event registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const uploadEventImage = async (req: any, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No image file provided' });
      return;
    }

    const result = await uploadImage(req.file.buffer, {
      folder: 'events',
      format: 'webp'
    });

    res.json({
      message: 'Image uploaded successfully',
      url: result.url,
      publicId: result.publicId
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};