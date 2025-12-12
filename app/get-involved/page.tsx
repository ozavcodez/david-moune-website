import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { VolunteerForm } from "@/components/get-involved/volunteer-form"
import { Users, Heart, Briefcase, Calendar, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Get Involved | David Mone Foundation",
  description:
    "Join the David Mone Foundation as a volunteer, partner, or supporter. Make a difference in the fight against Sickle Cell Disease and for education access.",
}

const volunteerOpportunities = [
  {
    title: "Healthcare Volunteer",
    location: "Lagos, Nigeria",
    commitment: "10+ hours/month",
    description: "Support SCD patients at partner hospitals and community health events.",
  },
  {
    title: "Education Mentor",
    location: "Multiple Locations",
    commitment: "4+ hours/week",
    description: "Mentor students and provide academic support at partner schools.",
  },
  {
    title: "Community Outreach",
    location: "Nationwide",
    commitment: "Flexible",
    description: "Help organize awareness campaigns and community events.",
  },
  {
    title: "Administrative Support",
    location: "Remote",
    commitment: "5+ hours/week",
    description: "Support our team with data entry, communications, and coordination.",
  },
]

const partnershipTypes = [
  {
    icon: Briefcase,
    title: "Corporate Partnership",
    description: "Partner with us through CSR initiatives, employee giving programs, or sponsorships.",
  },
  {
    icon: Heart,
    title: "Healthcare Partnership",
    description: "Join our network of hospitals and clinics providing SCD care and screenings.",
  },
  {
    icon: Users,
    title: "Academic Partnership",
    description: "Collaborate on research, student programs, or educational initiatives.",
  },
]

export default function GetInvolvedPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-foreground py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Get Involved</p>
              <h1 className="mt-4 font-serif text-4xl font-bold text-background sm:text-5xl text-balance">
                Be Part of the Change
              </h1>
              <p className="mt-6 text-lg text-background/80 leading-relaxed">
                There are many ways to support our mission. Whether you volunteer your time, partner with us, or spread
                the word, your contribution makes a real difference.
              </p>
            </div>
          </div>
        </section>

        {/* Ways to Help */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Volunteer",
                  description: "Give your time and skills to support our programs and events.",
                  href: "#volunteer",
                },
                {
                  title: "Donate",
                  description: "Your financial support funds research, education, and patient care.",
                  href: "/donate",
                },
                {
                  title: "Partner",
                  description: "Join us as a corporate, healthcare, or academic partner.",
                  href: "#partner",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-lg border border-border p-8 text-center hover:border-primary hover:shadow-sm transition-all"
                >
                  <h3 className="font-serif text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Volunteer Section */}
        <section className="bg-secondary py-16 lg:py-24" id="volunteer">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-primary">Volunteer</p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">Join Our Team</h2>
                <p className="mt-4 text-muted-foreground">
                  Our volunteers are the backbone of our work. From healthcare support to education mentoring, there are
                  opportunities for everyone to contribute.
                </p>

                <div className="mt-8 space-y-4">
                  {volunteerOpportunities.map((opp) => (
                    <div key={opp.title} className="rounded-lg bg-card p-4 border border-border">
                      <h4 className="font-semibold text-foreground">{opp.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{opp.description}</p>
                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {opp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {opp.commitment}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="rounded-lg bg-card p-6 shadow-sm border border-border">
                  <h3 className="font-serif text-xl font-semibold text-foreground">Volunteer Sign Up</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Fill out this form and we'll be in touch about volunteer opportunities.
                  </p>
                  <VolunteerForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Section */}
        <section className="py-16 lg:py-24" id="partner">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Partnership</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">Partner With Us</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                We work with organizations across sectors to maximize our impact. Explore partnership opportunities.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {partnershipTypes.map((type) => (
                <div key={type.title} className="rounded-lg border border-border p-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <type.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{type.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{type.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-lg bg-secondary p-8 text-center">
              <h3 className="font-serif text-xl font-semibold text-foreground">Interested in Partnering?</h3>
              <p className="mt-2 text-muted-foreground">
                Contact our partnerships team to discuss how we can work together.
              </p>
              <Button asChild className="mt-6">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Events */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center text-primary-foreground">
              <p className="text-sm font-medium uppercase tracking-wider opacity-80">Upcoming Events</p>
              <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">Join Our Events</h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "World Sickle Cell Day",
                  date: "June 19, 2025",
                  location: "Lagos, Nigeria",
                  type: "Awareness Event",
                },
                {
                  title: "Annual Gala Fundraiser",
                  date: "September 15, 2025",
                  location: "Abuja, Nigeria",
                  type: "Fundraiser",
                },
                {
                  title: "Education Access Summit",
                  date: "November 8, 2025",
                  location: "Virtual",
                  type: "Conference",
                },
              ].map((event) => (
                <div key={event.title} className="rounded-lg bg-background p-6">
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {event.type}
                  </span>
                  <h3 className="mt-3 font-semibold text-foreground">{event.title}</h3>
                  <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {event.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4 w-full bg-transparent">
                    Register
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
