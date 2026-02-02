import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../backend/config/database';
import { getArticleBySlug } from '../../../../backend/controllers/nextArticleController';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  await connectDB();
  
  try {
    // Create a modified request with the slug in the URL
    const url = new URL(request.url);
    url.pathname = `/api/articles/${params.slug}`;
    
    const modifiedRequest = new NextRequest(url, request);
    return await getArticleBySlug(modifiedRequest);
  } catch (error) {
    console.error('Article GET API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
