import { Router } from 'express';
import multer from 'multer';
import { 
  createEvent, 
  getAllEvents, 
  getEventBySlug, 
  updateEvent, 
  deleteEvent,
  registerForEvent,
  uploadEventImage
} from '../controllers/eventController';
import { authenticateToken, requireEditor } from '../middleware/auth';

const router = Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Public routes
router.get('/', getAllEvents);
router.get('/:slug', getEventBySlug);
router.post('/:slug/register', registerForEvent);

// Protected routes
router.post('/', authenticateToken, requireEditor, createEvent);
router.put('/:slug', authenticateToken, requireEditor, updateEvent);
router.delete('/:slug', authenticateToken, requireEditor, deleteEvent);
router.post('/upload-image', authenticateToken, requireEditor, upload.single('image'), uploadEventImage);

export default router;