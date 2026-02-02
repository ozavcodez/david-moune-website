import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, ArrowRight, Search } from "lucide-react"
import { getAllArticles, type Article } from "@/lib/articles-data"

export const metadata: Metadata = {
  title: "News & Updates | David Mone Foundation",
  description:
    "Stay updated with the latest news, stories, and events from David Mone Foundation's work in Sickle Cell Disease and education.",
}

const categories = ["All", "news", "events", "education", "healthcare", "research"]

export default function NewsPage() {
  // Get articles from static data
  const articles = getAllArticles();
  
  // Use first article as featured if available
  const featuredArticle = articles[0]
  const remainingArticles = articles.slice(1)
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero - Enhanced with background image */}
        <section className="relative bg-foreground py-24 lg:py-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1920&h=800&fit=crop"
              alt="News background"
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/95 to-foreground/90" />
          </div>

          {/* Animated circles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 w-64 h-64 border-4 border-primary/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute bottom-10 left-10 w-48 h-48 border-4 border-accent/20 rounded-full animate-pulse" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <p className="text-sm font-bold uppercase tracking-widest text-primary">News & Updates</p>
              </div>
              <h1 className="font-serif text-5xl font-bold text-background sm:text-6xl lg:text-7xl text-balance leading-tight">
                Stories of
                <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Impact & Change
                </span>
              </h1>
              <p className="mt-6 text-xl text-background/80 leading-relaxed">
                Stay updated with our latest news, success stories, research updates, and upcoming events.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="border-b border-border py-6">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search articles..." className="pl-10" />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                      category === "All"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-muted"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post - Enhanced */}
        {featuredArticle && (
          <section className="py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="mb-8">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-sm font-bold text-primary uppercase tracking-wider">
                  ⭐ Featured Story
                </span>
              </div>
              <Link href={`/news/${featuredArticle.slug}`} className="group block">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border-4 border-primary/20 shadow-2xl">
                    <img
                      src={featuredArticle.featuredImage || "/placeholder.svg"}
                      alt={featuredArticle.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1.5 text-xs font-bold text-primary-foreground capitalize shadow-lg">
                        {featuredArticle.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredArticle.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <h2 className="font-serif text-4xl lg:text-5xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">
                      {featuredArticle.title}
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{featuredArticle.excerpt}</p>
                    <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm group-hover:shadow-lg transition-all">
                      Read Full Story
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* All Posts - Enhanced */}
        {/* <section className="relative bg-secondary py-16 lg:py-24 overflow-hidden">
          <div className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-serif text-3xl lg:text-4xl font-black text-foreground">Latest Articles</h2>
                <p className="mt-2 text-muted-foreground">Explore more stories from our community</p>
              </div>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {remainingArticles.map((article: Article) => (
                <Link key={article.slug} href={`/news/${article.slug}`} className="group">
                  <article className="h-full rounded-2xl bg-card overflow-hidden border-2 border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={article.featuredImage || "/placeholder.svg"}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary capitalize">
                          {article.category}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">
                          {new Date(article.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h3>
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed">{article.excerpt}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <div className="mt-16 text-center">
              <Button variant="outline" size="lg" className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-8 py-6 text-base">
                Load More Articles
              </Button>
            </div>
          </div>
        </section> */}

        {/* Events Section */}
        {/* <section className="py-16 lg:py-24" id="events">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Events</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">Upcoming Events</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "World Sickle Cell Day 2025",
                  date: "June 19, 2025",
                  time: "9:00 AM - 5:00 PM",
                  location: "Lagos, Nigeria",
                  type: "Awareness Event",
                },
                {
                  title: "Annual Gala Fundraiser",
                  date: "September 15, 2025",
                  time: "6:00 PM",
                  location: "Abuja, Nigeria",
                  type: "Fundraiser",
                },
                {
                  title: "Education Access Summit",
                  date: "November 8, 2025",
                  time: "10:00 AM - 4:00 PM",
                  location: "Virtual Event",
                  type: "Conference",
                },
              ].map((event) => (
                <div key={event.title} className="rounded-lg border border-border p-6">
                  <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    {event.type}
                  </span>
                  <h3 className="mt-3 font-semibold text-foreground">{event.title}</h3>
                  <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <p>{event.date}</p>
                    <p>{event.time}</p>
                    <p>{event.location}</p>
                  </div>
                  <Button size="sm" className="mt-4 w-full">
                    Register
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Newsletter */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">Stay Informed</h2>
            <p className="mt-4 text-primary-foreground/80">
              Subscribe to our newsletter for the latest updates, stories, and ways to get involved.
            </p>
            <form className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 sm:justify-center">
              <Input
                type="email"
                placeholder="Enter your email"
                className="sm:w-80 bg-primary-foreground text-foreground"
              />
              <Button variant="secondary">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
