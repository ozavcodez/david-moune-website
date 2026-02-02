import { Router } from 'express';
import multer from 'multer';
import { 
  createArticle, 
  getAllArticles, 
  getArticleBySlug, 
  updateArticle, 
  deleteArticle,
  uploadArticleImage
} from '../controllers/articleController';
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
router.get('/', getAllArticles);
router.get('/:slug', getArticleBySlug);

// Protected routes
router.post('/', authenticateToken, requireEditor, createArticle);
router.put('/:slug', authenticateToken, requireEditor, updateArticle);
router.delete('/:slug', authenticateToken, requireEditor, deleteArticle);
router.post('/upload-image', authenticateToken, requireEditor, upload.single('image'), uploadArticleImage);

export default router;