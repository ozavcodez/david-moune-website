# V0 Foundation Website Backend Implementation Plan

## Overview
This document outlines the complete backend implementation for the V0 Foundation website with full CMS capabilities, Paystack integration, and admin dashboard.

## Tech Stack
- **Frontend**: Next.js 16 + React 19 + TypeScript
- **Backend**: Next.js API Routes (App Router)
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcrypt
- **Payments**: Paystack API
- **Image Storage**: Cloudinary
- **Validation**: express-validator

## Features to Implement

### 1. Authentication System
- [x] User model with roles (admin/editor)
- [x] Registration endpoint
- [x] Login endpoint
- [x] JWT token generation
- [x] Protected route middleware
- [ ] Password reset functionality

### 2. Content Management
#### Articles
- [x] Article model with SEO fields
- [x] CRUD operations
- [x] Image upload to Cloudinary
- [x] Draft/published workflow
- [x] Category system
- [x] Tagging system

#### Events
- [x] Event model with registration
- [x] CRUD operations
- [x] Event registration system
- [x] Virtual/in-person event support
- [x] Attendee management

### 3. Payment System
- [x] Donation model
- [x] Paystack integration
- [x] Payment initialization
- [x] Payment verification
- [x] Webhook handling
- [x] Donation statistics

### 4. Admin Dashboard
- [ ] User management
- [ ] Content management interface
- [ ] Donation analytics
- [ ] Event management
- [ ] Media library

### 5. Public APIs
- [ ] Article listing and viewing
- [ ] Event listing and viewing
- [ ] Donation processing
- [ ] Newsletter subscription

## File Structure

```
project/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── route.ts          # Authentication endpoints
│   │   │   └── [...next]/route.ts # Catch-all for auth sub-routes
│   │   ├── articles/
│   │   │   ├── route.ts          # Articles CRUD
│   │   │   └── [slug]/route.ts   # Individual article
│   │   ├── events/
│   │   │   ├── route.ts          # Events CRUD
│   │   │   └── [slug]/route.ts   # Individual event
│   │   ├── donations/
│   │   │   ├── route.ts          # Donation processing
│   │   │   ├── [reference]/route.ts # Payment verification
│   │   │   └── webhook/route.ts  # Paystack webhook
│   │   └── admin/
│   │       └── stats/route.ts    # Admin statistics
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard
│   └── articles/
│       └── [slug]/page.tsx       # Article viewer page
├── backend/
│   ├── models/
│   │   ├── User.ts
│   │   ├── Article.ts
│   │   ├── Event.ts
│   │   └── Donation.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── articleController.ts
│   │   ├── eventController.ts
│   │   └── donationController.ts
│   ├── middleware/
│   │   └── auth.ts
│   ├── utils/
│   │   └── imageUpload.ts
│   └── config/
│       └── database.ts
└── lib/
    └── api-client.ts             # Frontend API client
```

## Implementation Steps

### Phase 1: Database & Models (Completed)
- [x] Set up MongoDB connection
- [x] Create all data models
- [x] Install dependencies

### Phase 2: Authentication API
- [ ] Create Next.js API routes for auth
- [ ] Implement JWT middleware
- [ ] Test authentication flow

### Phase 3: Content APIs
- [ ] Create articles API routes
- [ ] Create events API routes
- [ ] Implement image upload functionality
- [ ] Test CRUD operations

### Phase 4: Payment Integration
- [ ] Create donations API routes
- [ ] Implement Paystack webhook
- [ ] Test payment flow

### Phase 5: Frontend Pages
- [ ] Create article viewer page
- [ ] Create admin dashboard
- [ ] Integrate with backend APIs

### Phase 6: Testing & Deployment
- [ ] Test all API endpoints
- [ ] Test frontend integration
- [ ] Deploy to production

## Environment Variables Needed

```env
# Database
MONGODB_URI=mongodb://localhost:27017/v0-foundation

# Authentication
JWT_SECRET=your-jwt-secret-here

# Paystack
PAYSTACK_SECRET_KEY=your-paystack-secret-key
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your-paystack-public-key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Application
FRONTEND_URL=http://localhost:3000
```

## Security Considerations
- [ ] Rate limiting
- [ ] Input validation
- [ ] CORS configuration
- [ ] Helmet.js security headers
- [ ] XSS protection
- [ ] CSRF protection

## Next Steps
1. Create Next.js API routes for each feature
2. Implement frontend pages (article viewer, admin dashboard)
3. Test the complete workflow
4. Add error handling and logging
5. Optimize performance