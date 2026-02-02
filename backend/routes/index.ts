import { Router } from 'express';
import authRoutes from './auth';
import donationRoutes from './donations';
import articleRoutes from './articles';
import eventRoutes from './events';

const router = Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/donations', donationRoutes);
router.use('/articles', articleRoutes);
router.use('/events', eventRoutes);

export default router;