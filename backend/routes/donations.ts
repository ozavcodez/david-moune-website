import { Router } from 'express';
import multer from 'multer';
import { 
  initializePayment, 
  verifyPayment, 
  handleWebhook, 
  getDonationStats 
} from '../controllers/donationController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Public routes
router.post('/initialize', initializePayment);
router.get('/verify/:reference', verifyPayment);
router.post('/webhook', handleWebhook);

// Protected routes
router.get('/stats', authenticateToken, requireAdmin, getDonationStats);

export default router;