import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '../utils/imageUpload';
import Article from '../models/Article';

export async function createArticle(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, excerpt, author, category, tags, published } = body;

    // Validation
    if (!title || !content || !excerpt || !author || !category) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Category validation
    const validCategories = ['news', 'events', 'education', 'healthcare', 'research'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { message: 'Invalid category' },
        { status: 400 }
      );
    }

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

    return NextResponse.json({
      message: 'Article created successfully',
      article
    });

  } catch (error) {
    console.error('Create article error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function getAllArticles(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const publishedParam = searchParams.get('published');

    // Build filter
    const filter: any = {};
    if (category) filter.category = category;
    if (publishedParam !== undefined) filter.published = publishedParam === 'true';

    // Get articles
    const articles = await Article.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-content'); // Don't return full content for listing

    // Get total count
    const total = await Article.countDocuments(filter);

    return NextResponse.json({
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
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function getArticleBySlug(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const slug = pathname.split('/').pop();

    if (!slug) {
      return NextResponse.json(
        { message: 'Slug is required' },
        { status: 400 }
      );
    }

    const article = await Article.findOne({ slug });
    if (!article) {
      return NextResponse.json(
        { message: 'Article not found' },
        { status: 404 }
      );
    }

    // Only return published articles
    if (!article.published) {
      return NextResponse.json(
        { message: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(article);

  } catch (error) {
    console.error('Get article error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function updateArticle(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const slug = pathname.split('/').pop();
    const body = await request.json();

    if (!slug) {
      return NextResponse.json(
        { message: 'Slug is required' },
        { status: 400 }
      );
    }

    const article = await Article.findOne({ slug });
    if (!article) {
      return NextResponse.json(
        { message: 'Article not found' },
        { status: 404 }
      );
    }

    // Update article
    Object.keys(body).forEach(key => {
      if (body[key] !== undefined) {
        (article as any)[key] = body[key];
      }
    });

    await article.save();

    return NextResponse.json({
      message: 'Article updated successfully',
      article
    });

  } catch (error) {
    console.error('Update article error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function deleteArticle(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const slug = pathname.split('/').pop();

    if (!slug) {
      return NextResponse.json(
        { message: 'Slug is required' },
        { status: 400 }
      );
    }

    const article = await Article.findOne({ slug });
    if (!article) {
      return NextResponse.json(
        { message: 'Article not found' },
        { status: 404 }
      );
    }

    await Article.findByIdAndDelete(article._id);

    return NextResponse.json({ message: 'Article deleted successfully' });

  } catch (error) {
    console.error('Delete article error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}