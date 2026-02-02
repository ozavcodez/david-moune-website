import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, articles } from '@/lib/articles-data';
import { Calendar, User, Tag, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';

// Define the props type for the page
type NewsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'News Not Found',
    };
  }

  return {
    title: `${article.title} | V0 Foundation`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: `https://your-domain.com/news/${slug}`,
    },
  };
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  // Get article from static data
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      {/* Back Navigation */}
      <div className="bg-background border-b border-border sticky top-0 z-10 backdrop-blur-sm bg-background/95">
        <div className="container mx-auto px-4 py-4 max-w-5xl">
          <Link 
            href="/news" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16 max-w-5xl">
        {/* Article Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground capitalize font-bold shadow-lg">
              <Tag className="h-3.5 w-3.5" />
              {article.category}
            </span>
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(article.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            {article.author && (
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                {article.author}
              </span>
            )}
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-black text-foreground mb-8 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light border-l-4 border-primary pl-6 py-2">
            {article.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl relative group">
            <img 
              src={article.featuredImage} 
              alt={article.title}
              className="w-full h-[400px] lg:h-[600px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {/* Article Content with better spacing and embedded images */}
        <article className="prose prose-lg lg:prose-xl max-w-none
          prose-headings:font-black prose-headings:text-foreground prose-headings:scroll-mt-24
          prose-h2:text-3xl lg:prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b-4 prose-h2:border-primary/30 prose-h2:font-black
          prose-h3:text-2xl lg:prose-h3:text-3xl prose-h3:text-foreground prose-h3:mt-16 prose-h3:mb-6 prose-h3:font-black
          prose-p:text-muted-foreground prose-p:leading-[2] prose-p:mb-10 prose-p:text-lg lg:prose-p:text-xl
          prose-ul:my-10 prose-ul:space-y-4 prose-ul:bg-secondary/30 prose-ul:p-8 prose-ul:rounded-2xl prose-ul:border-2 prose-ul:border-border
          prose-li:text-muted-foreground prose-li:text-lg lg:prose-li:text-xl prose-li:leading-[1.8] prose-li:marker:text-primary prose-li:pl-2
          prose-strong:text-foreground prose-strong:font-black prose-strong:text-xl lg:prose-strong:text-2xl
          prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline">
          
          {/* Parse and inject images at specific points */}
          <div dangerouslySetInnerHTML={{ __html: article.content.replace(
            /<h2>Historical Context<\/h2>/,
            `<h2>Historical Context</h2>
            <div class="not-prose my-16">
              <div class="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=600&fit=crop" 
                  alt="Sports and education integration"
                  class="w-full h-96 object-cover"
                />
              </div>
              <p class="text-center text-sm text-muted-foreground mt-4 italic font-medium">Sports play a vital role in fostering peace, development, and community building worldwide</p>
            </div>`
          ).replace(
            /<h2>Recent Highlights<\/h2>/,
            `<div class="not-prose my-16">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=700&h=500&fit=crop" 
                    alt="Youth sports development"
                    class="w-full h-80 object-cover"
                  />
                </div>
                <div class="rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=700&h=500&fit=crop" 
                    alt="Community engagement through sports"
                    class="w-full h-80 object-cover"
                  />
                </div>
              </div>
              <p class="text-center text-sm text-muted-foreground mt-4 italic font-medium">Youth development and community engagement through integrated sports programs</p>
            </div>
            <h2>Recent Highlights</h2>`
          ).replace(
            /<h2>Our Plan<\/h2>/,
            `<div class="not-prose my-16">
              <div class="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&h=600&fit=crop" 
                  alt="School sports facilities"
                  class="w-full h-96 object-cover"
                />
              </div>
              <p class="text-center text-sm text-muted-foreground mt-4 italic font-medium">Investing in world-class sports facilities and infrastructure for student development</p>
            </div>
            <h2>Our Plan</h2>`
          ) }} />
        </article>

        {/* Call to Action */}
        <div className="mt-20 p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20">
          <h3 className="text-2xl lg:text-3xl font-black text-foreground mb-4">Join Our Mission</h3>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Help us transform lives through sports and education. Your support can make a real difference in communities across Africa.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/donate"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:shadow-lg transition-all hover:scale-105"
            >
              Support Our Work
            </Link>
            <Link 
              href="/get-involved"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-full font-bold border-2 border-border hover:bg-secondary/80 transition-all"
            >
              Get Involved
            </Link>
          </div>
        </div>

        {/* Author Section */}
        {article.author && (
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-secondary to-secondary/50 border-2 border-border shadow-lg">
            <div className="flex items-start gap-6">
              <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-3xl font-black text-primary-foreground">
                  {article.author.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">About the Author</h3>
                <p className="text-2xl font-black text-foreground mb-2">{article.author}</p>
                <p className="text-muted-foreground font-medium">President, David Mone Foundation</p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Leading initiatives in sports integration, youth development, and educational excellence across Africa.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <footer className="mt-16 pt-8 border-t-2 border-border">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Related Topics</h3>
            <div className="flex flex-wrap gap-3">
              {article.tags.map((tag: string, index: number) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground rounded-full text-sm font-bold transition-all cursor-pointer border border-border"
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
