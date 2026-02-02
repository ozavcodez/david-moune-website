import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from './config/database';

// Import Express controllers
import { registerUser, loginUser, getProfile } from './controllers/authController';
import { initializePayment, verifyPayment, handleWebhook, getDonationStats } from './controllers/donationController';
import { createArticle, getAllArticles, getArticleBySlug, updateArticle, deleteArticle } from './controllers/articleController';
import { createEvent, getAllEvents, getEventBySlug, updateEvent, deleteEvent } from './controllers/eventController';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { api } = req.query;
  const path = Array.isArray(api) ? api.join('/') : api || '';
  
  // Add Express-like properties to req/res
  (req as any).params = {};
  
  try {
    // Auth routes
    if (path.startsWith('auth')) {
      const authPath = path.substring(4);
      switch (req.method) {
        case 'POST':
          if (authPath === '/register') {
            // Handle registerUser middleware array
            return await new Promise((resolve) => {
              const middlewareArray = registerUser as any[];
              let index = 0;
              const next = () => {
                if (index < middlewareArray.length) {
                  const fn = middlewareArray[index++];
                  if (typeof fn === 'function') {
                    fn(req as any, res as any, next);
                  } else {
                    next();
                  }
                }
              };
              next();
            });
          } else if (authPath === '/login') {
            // Handle loginUser middleware array
            return await new Promise((resolve) => {
              const middlewareArray = loginUser as any[];
              let index = 0;
              const next = () => {
                if (index < middlewareArray.length) {
                  const fn = middlewareArray[index++];
                  if (typeof fn === 'function') {
                    fn(req as any, res as any, next);
                  } else {
                    next();
                  }
                }
              };
              next();
            });
          }
          break;
        case 'GET':
          if (authPath === '/profile') {
            // Mock authentication for now
            (req as any).user = { id: 'mock-user-id' };
            return await getProfile(req as any, res as any);
          }
          break;
      }
      return res.status(404).json({ message: 'Auth endpoint not found' });
    }

    // Donations routes
    if (path.startsWith('donations')) {
      const donationPath = path.substring(9);
      switch (req.method) {
        case 'POST':
          if (donationPath === '/initialize') {
            return await initializePayment(req as any, res as any);
          } else if (donationPath === '/webhook') {
            return await handleWebhook(req as any, res as any);
          }
          break;
        case 'GET':
          if (donationPath && donationPath.startsWith('/verify/')) {
            (req as any).params.reference = donationPath.substring(8);
            return await verifyPayment(req as any, res as any);
          } else if (donationPath === '/stats') {
            return await getDonationStats(req as any, res as any);
          }
          break;
      }
      return res.status(404).json({ message: 'Donation endpoint not found' });
    }

    // Articles routes
    if (path.startsWith('articles')) {
      const articlePath = path.substring(8);
      switch (req.method) {
        case 'POST':
          // Handle createArticle middleware array
          return await new Promise((resolve) => {
            const middlewareArray = createArticle as any[];
            let index = 0;
            const next = () => {
              if (index < middlewareArray.length) {
                const fn = middlewareArray[index++];
                if (typeof fn === 'function') {
                  fn(req as any, res as any, next);
                } else {
                  next();
                }
              }
            };
            next();
          });
        case 'GET':
          if (articlePath && articlePath !== '/') {
            (req as any).params.slug = articlePath.substring(1);
            return await getArticleBySlug(req as any, res as any);
          }
          // For getAllArticles, we need to handle the array middleware
          return await new Promise((resolve) => {
            const middlewareArray = getAllArticles as any[];
            let index = 0;
            const next = () => {
              if (index < middlewareArray.length) {
                const fn = middlewareArray[index++];
                if (typeof fn === 'function') {
                  fn(req as any, res as any, next);
                } else {
                  next();
                }
              }
            };
            next();
          });
        case 'PUT':
          // Handle updateArticle middleware array
          return await new Promise((resolve) => {
            const middlewareArray = updateArticle as any[];
            let index = 0;
            const next = () => {
              if (index < middlewareArray.length) {
                const fn = middlewareArray[index++];
                if (typeof fn === 'function') {
                  fn(req as any, res as any, next);
                } else {
                  next();
                }
              }
            };
            next();
          });
        case 'DELETE':
          return await deleteArticle(req as any, res as any);
      }
      return res.status(404).json({ message: 'Article endpoint not found' });
    }

    // Events routes
    if (path.startsWith('events')) {
      const eventPath = path.substring(6);
      switch (req.method) {
        case 'POST':
          // Handle createEvent middleware array
          return await new Promise((resolve) => {
            const middlewareArray = createEvent as any[];
            let index = 0;
            const next = () => {
              if (index < middlewareArray.length) {
                const fn = middlewareArray[index++];
                if (typeof fn === 'function') {
                  fn(req as any, res as any, next);
                } else {
                  next();
                }
              }
            };
            next();
          });
        case 'GET':
          if (eventPath && eventPath !== '/') {
            (req as any).params.slug = eventPath.substring(1);
            return await getEventBySlug(req as any, res as any);
          }
          // For getAllEvents, we need to handle the array middleware
          return await new Promise((resolve) => {
            const middlewareArray = getAllEvents as any[];
            let index = 0;
            const next = () => {
              if (index < middlewareArray.length) {
                const fn = middlewareArray[index++];
                if (typeof fn === 'function') {
                  fn(req as any, res as any, next);
                } else {
                  next();
                }
              }
            };
            next();
          });
        case 'PUT':
          // Handle updateEvent middleware array
          return await new Promise((resolve) => {
            const middlewareArray = updateEvent as any[];
            let index = 0;
            const next = () => {
              if (index < middlewareArray.length) {
                const fn = middlewareArray[index++];
                if (typeof fn === 'function') {
                  fn(req as any, res as any, next);
                } else {
                  next();
                }
              }
            };
            next();
          });
        case 'DELETE':
          return await deleteEvent(req as any, res as any);
      }
      return res.status(404).json({ message: 'Event endpoint not found' });
    }

    return res.status(404).json({ message: 'API endpoint not found' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}