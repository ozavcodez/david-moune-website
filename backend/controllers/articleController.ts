import { Request, Response } from 'express';
import { body, validationResult, query } from 'express-validator';
import Article from '../models/Article';
import { uploadImage, deleteImage } from '../utils/imageUpload';

export const createArticle = [
  // Validation
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('excerpt').notEmpty().withMessage('Excerpt is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('category').isIn(['news', 'events', 'education', 'healthcare', 'research']).withMessage('Invalid category'),

  async (req: any, res: Response): Promise<void> => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { title, content, excerpt, author, category, tags, published } = req.body;

      // Create article
      const article = new Article({
        title,
        content,
        excerpt,
        author,
        category,
        tags: tags || [],
        published: published || false
      });

      await article.save();

      res.status(201).json({
        message: 'Article created successfully',
        article
      });
    } catch (error) {
      console.error('Create article error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
];

export const getAllArticles = [
  // Validation
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('category').optional().isIn(['news', 'events', 'education', 'healthcare', 'research']).withMessage('Invalid category'),
  query('published').optional().isBoolean().withMessage('Published must be boolean'),

  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const category = req.query.category as string;
      const published = req.query.published as string;

      // Build filter
      const filter: any = {};
      if (category) filter.category = category;
      if (published !== undefined) filter.published = published === 'true';

      // Get articles
      const articles = await Article.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-content');

      // Get total count
      const total = await Article.countDocuments(filter);

      res.json({
        articles,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get articles error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
];

export const getArticleBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const article = await Article.findOne({ slug });
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    // Only return unpublished articles for authenticated users
    if (!article.published) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    res.json(article);
  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateArticle = [
  // Validation
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('content').optional().notEmpty().withMessage('Content cannot be empty'),
  body('excerpt').optional().notEmpty().withMessage('Excerpt cannot be empty'),
  body('category').optional().isIn(['news', 'events', 'education', 'healthcare', 'research']).withMessage('Invalid category'),

  async (req: any, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { slug } = req.params;
      const updates = req.body;

      const article = await Article.findOne({ slug });
      if (!article) {
        res.status(404).json({ message: 'Article not found' });
        return;
      }

      // Update article
      Object.keys(updates).forEach(key => {
        if (updates[key] !== undefined) {
          (article as any)[key] = updates[key];
        }
      });

      await article.save();

      res.json({
        message: 'Article updated successfully',
        article
      });
    } catch (error) {
      console.error('Update article error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
];

export const deleteArticle = async (req: any, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const article = await Article.findOne({ slug });
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    // Delete featured image from Cloudinary if exists
    if (article.featuredImage) {
      try {
        const publicId = article.featuredImage.split('/').pop()?.split('.')[0];
        if (publicId) {
          await deleteImage(publicId);
        }
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }

    await Article.findByIdAndDelete(article._id);

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const uploadArticleImage = async (req: any, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No image file provided' });
      return;
    }

    const result = await uploadImage(req.file.buffer, {
      folder: 'articles',
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