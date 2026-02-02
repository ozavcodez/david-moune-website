# Article System Setup and Usage

## Overview
The article details page has been fixed and a seed script has been created to generate sample articles for testing.

## Files Created/Updated

### 1. API Client (`lib/api-client.ts`)
- Provides functions to fetch articles from the API
- `getArticleBySlug(slug)` - Fetches a single article by its slug
- `getAllArticles(params)` - Fetches all articles with optional filters

### 2. Article Seed Script (`scripts/seed-articles.ts`)
- Generates 6 sample articles covering different categories:
  - Education initiatives
  - Foundation complex construction
  - Sickle cell research
  - Sport-integrated school program
  - Fundraising gala event
  - Research partnerships

### 3. Dynamic API Route (`app/api/articles/[slug]/route.ts`)
- Handles individual article requests by slug
- Properly routes requests to the backend controller

### 4. Package.json
- Added `seed:articles` script command
- Added `tsx` dev dependency for running TypeScript scripts

### 5. Environment Variables (`.env.example`)
- Template for required environment variables
- Copy to `.env.local` and update with your values

## Setup Instructions

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   copy .env.example .env.local
   ```
2. Update the MongoDB URI in `.env.local` with your database connection string

### Step 3: Start MongoDB
Make sure MongoDB is running on your local machine or use a cloud MongoDB instance (MongoDB Atlas).

### Step 4: Seed Sample Articles
Run the seed script to generate sample articles:
```bash
npm run seed:articles
```

This will create 6 sample articles in your database.

### Step 5: Start the Development Server
```bash
npm run dev
```

## Testing the Article Details Page

Once the server is running, you can test the article details page by visiting:

- http://localhost:3000/articles/v0-foundation-launches-new-educational-initiative-in-rural-communities
- http://localhost:3000/articles/breaking-ground-v0-foundation-complex-construction-begins
- http://localhost:3000/articles/advancing-sickle-cell-research-new-partnerships-and-breakthroughs
- http://localhost:3000/articles/sport-integrated-school-program-shows-remarkable-results
- http://localhost:3000/articles/annual-fundraising-gala-a-night-of-impact-and-inspiration
- http://localhost:3000/articles/research-partnership-collaboration-with-global-health-institute

## Article Structure

Each article includes:
- **Title** - Main headline
- **Slug** - URL-friendly identifier (auto-generated from title)
- **Excerpt** - Short summary for listings
- **Content** - Full HTML content
- **Author** - Article author name
- **Category** - One of: news, events, education, healthcare, research
- **Tags** - Array of relevant tags
- **Featured Image** - Header image URL
- **Published** - Publication status
- **Timestamps** - Created and updated dates

## Troubleshooting

### Issue: Database Connection Error
**Solution**: Ensure MongoDB is running and the `MONGODB_URI` in `.env.local` is correct.

### Issue: Article Not Found
**Solution**: 
1. Verify the article slug matches one from the seed script
2. Ensure articles were successfully seeded (check database)
3. Confirm the article's `published` field is set to `true`

### Issue: TypeError or Build Errors
**Solution**: 
1. Run `npm install` to ensure all dependencies are installed
2. Delete `.next` folder and rebuild: `rm -rf .next && npm run build`

## Next Steps

- Access the articles from the News page: http://localhost:3000/news
- Add authentication to create/edit articles through an admin dashboard
- Implement image upload functionality for featured images
- Add comments or social sharing features
