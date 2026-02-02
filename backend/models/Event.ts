import { Schema, model, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  content: string;
  startDate: Date;
  endDate?: Date;
  location: string;
  featuredImage?: string;
  registrationLink?: string;
  isVirtual: boolean;
  status: 'draft' | 'published' | 'cancelled';
  attendees: string[];
  maxAttendees?: number;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  location: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String
  },
  registrationLink: {
    type: String
  },
  isVirtual: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled'],
    default: 'draft'
  },
  attendees: [{
    type: String,
    trim: true
  }],
  maxAttendees: {
    type: Number
  }
}, {
  timestamps: true
});

// Auto-generate slug from title
EventSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
 
});

export default model<IEvent>('Event', EventSchema);