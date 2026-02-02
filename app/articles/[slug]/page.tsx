import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/api-client'; // We'll create this API client

// Define the props type for the page
type ArticlePageProps = {
  params: {
    slug: string;
  };
};

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  try {
    const article = await getArticleBySlug(params.slug);
    
    if (!article) {
      return {
        title: 'Article Not Found',
      };
    }

    return {
      title: `${article.title} | V0 Foundation`,
      description: article.excerpt,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        type: 'article',
        url: `https://your-domain.com/articles/${params.slug}`,
      },
    };
  } catch (error) {
    return {
      title: 'Article Not Found',
    };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  let article;
  
  try {
    // Fetch article data from API
    article = await getArticleBySlug(params.slug);
    
    if (!article) {
      notFound(); // This will render the not-found page
    }
  } catch (error) {
    console.error('Error fetching article:', error);
    notFound(); // This will render the not-found page
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="capitalize">{article.category}</span>
            <span>•</span>
            <time dateTime={article.createdAt}>
              {new Date(article.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {article.title}
          </h1>
          
          <p className="text-xl text-muted-foreground">
            {article.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img 
              src={article.featuredImage} 
              alt={article.title}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg prose-headings:text-foreground prose-p:text-muted-foreground max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <footer className="mt-12 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </footer>
        )}
      </div>
    </main>
  );
}