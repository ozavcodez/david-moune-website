import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../backend/config/database';
import { createArticle, getAllArticles, getArticleBySlug, updateArticle, deleteArticle } from '../../../backend/controllers/nextArticleController';

export async function GET(request: NextRequest) {
  await connectDB();
  
  const { pathname } = new URL(request.url);
  
  try {
    // Check if this is a specific article request (e.g., /api/articles/some-slug)
    const pathParts = pathname.split('/');
    if (pathParts.length > 3 && pathParts[3]) { // If there's a slug after /articles/
      return await getArticleBySlug(request);
    } else {
      // Otherwise, return all articles
      return await getAllArticles(request);
    }
  } catch (error) {
    console.error('Articles GET API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await connectDB();
  
  try {
    // Check if this is a protected route by verifying JWT
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { message: 'Authorization required' },
        { status: 401 }
      );
    }
    
    return await createArticle(request);
  } catch (error) {
    console.error('Articles POST API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  await connectDB();
  
  try {
    // Check if this is a protected route by verifying JWT
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { message: 'Authorization required' },
        { status: 401 }
      );
    }
    
    return await updateArticle(request);
  } catch (error) {
    console.error('Articles PUT API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  await connectDB();
  
  try {
    // Check if this is a protected route by verifying JWT
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { message: 'Authorization required' },
        { status: 401 }
      );
    }
    
    return await deleteArticle(request);
  } catch (error) {
    console.error('Articles DELETE API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}