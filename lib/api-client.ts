// API client for fetching data from the backend

// For server-side requests, use absolute URL based on environment
// For client-side, use relative URLs
function getApiUrl() {
  // Check if we're on the server
  if (typeof window === 'undefined') {
    // Server-side: use localhost with the port from env or default
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  }
  // Client-side: use relative URL
  return '/api';
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/articles/${slug}`, {
      cache: 'no-store', // Ensure fresh data on each request
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch article');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function getAllArticles(params?: {
  page?: number;
  limit?: number;
  category?: string;
  published?: boolean;
}) {
  try {
    const apiUrl = getApiUrl();
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.category) searchParams.set('category', params.category);
    if (params?.published !== undefined) searchParams.set('published', params.published.toString());

    const response = await fetch(`${apiUrl}/articles?${searchParams.toString()}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { articles: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } };
  }
}
