import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, ArrowRight, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "News & Updates | David Mone Foundation",
  description:
    "Stay updated with the latest news, stories, and events from the David Mone Foundation's work in Sickle Cell Disease and education.",
}

const featuredPost = {
  title: "David Mone Foundation Reaches 50,000 Lives Milestone",
  excerpt:
    "We are thrilled to announce that our programs have now positively impacted over 50,000 lives across Nigeria and Sub-Saharan Africa. This milestone represents years of dedication from our team, partners, and supporters.",
  date: "December 5, 2025",
  category: "Announcement",
  image: "/milestone-celebration-foundation-team.jpg",
  slug: "50000-lives-milestone",
}

const posts = [
  {
    title: "World Sickle Cell Day 2025: Our Awareness Campaign",
    excerpt: "This year's World Sickle Cell Day saw our largest awareness campaign yet, reaching over 100,000 people.",
    date: "June 19, 2025",
    category: "Campaign",
    image: "/sickle-cell-day-awareness-event.jpg",
    slug: "world-sickle-cell-day-2025",
  },
  {
    title: "New Partnership with University of Lagos Medical Center",
    excerpt: "We're excited to announce a new partnership that will expand SCD treatment access in Lagos State.",
    date: "May 28, 2025",
    category: "Partnership",
    image: "/partnership-announcement-medical.jpg",
    slug: "unilag-partnership",
  },
  {
    title: "Education Program Expands to Kaduna State",
    excerpt: "Our education access program now operates in six states, with the recent expansion to Kaduna.",
    date: "April 15, 2025",
    category: "Program Update",
    image: "/education-expansion-kaduna.jpg",
    slug: "kaduna-expansion",
  },
  {
    title: "Meet Chidinma: From Scholarship Recipient to Medical Student",
    excerpt: "Chidinma's journey from an out-of-school child to pursuing her dream of becoming a doctor.",
    date: "March 22, 2025",
    category: "Impact Story",
    image: "/chidinma-success-story.jpg",
    slug: "chidinma-story",
  },
  {
    title: "Research Update: New SCD Treatment Study Shows Promise",
    excerpt: "Early results from a treatment study we're funding show significant improvements in patient outcomes.",
    date: "February 10, 2025",
    category: "Research",
    image: "/research-laboratory-scd.jpg",
    slug: "treatment-study-results",
  },
  {
    title: "Annual Report 2024: Year in Review",
    excerpt: "Our comprehensive review of 2024's achievements, challenges, and the impact we've made together.",
    date: "January 15, 2025",
    category: "Report",
    image: "/annual-report-2024.jpg",
    slug: "annual-report-2024",
  },
]

const categories = ["All", "Announcement", "Campaign", "Partnership", "Program Update", "Impact Story", "Research"]

export default function NewsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-foreground py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">News & Updates</p>
              <h1 className="mt-4 font-serif text-4xl font-bold text-background sm:text-5xl text-balance">
                Stories of Impact & Change
              </h1>
              <p className="mt-6 text-lg text-background/80 leading-relaxed">
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

        {/* Featured Post */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Link href={`/news/${featuredPost.slug}`} className="group block">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="aspect-[16/10] overflow-hidden rounded-lg">
                  <img
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {featuredPost.date}
                    </span>
                  </div>
                  <h2 className="mt-4 font-serif text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{featuredPost.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* All Posts */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">Latest Articles</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.slug} href={`/news/${post.slug}`} className="group">
                  <article className="rounded-lg bg-card overflow-hidden border border-border hover:shadow-sm transition-shadow">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </div>
                      <h3 className="mt-3 font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button variant="outline" className="bg-transparent">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-16 lg:py-24" id="events">
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
        </section>

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
