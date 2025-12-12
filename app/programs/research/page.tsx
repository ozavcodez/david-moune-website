import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Microscope, FileText, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Research & Advocacy | David Mone Foundation",
  description: "Explore our research initiatives and advocacy work for Sickle Cell Disease and education policy.",
}

const researchAreas = [
  {
    title: "SCD Treatment Research",
    description: "Funding clinical trials and research into new treatment options and potential cures.",
    partners: ["University of Lagos", "Johns Hopkins University", "WHO Research Network"],
  },
  {
    title: "Epidemiological Studies",
    description: "Understanding SCD prevalence and patterns across different regions and populations.",
    partners: ["CDC Africa", "African Academy of Sciences", "National Institute of Health"],
  },
  {
    title: "Education Effectiveness",
    description: "Research into what educational interventions work best in resource-limited settings.",
    partners: ["UNESCO", "Education Research Institute", "World Bank"],
  },
  {
    title: "Policy Analysis",
    description: "Evaluating healthcare and education policies to inform advocacy efforts.",
    partners: ["Brookings Institution", "African Policy Institute", "UNDP"],
  },
]

const publications = [
  {
    title: "Sickle Cell Disease in Nigeria: A Comprehensive Analysis",
    journal: "African Journal of Hematology",
    year: "2024",
    type: "Research Paper",
  },
  {
    title: "Improving Education Access in Rural Africa",
    journal: "International Education Review",
    year: "2024",
    type: "Policy Brief",
  },
  {
    title: "Community-Based SCD Screening Programs",
    journal: "Global Health Action",
    year: "2023",
    type: "Research Paper",
  },
  {
    title: "The Economic Impact of Out-of-School Children",
    journal: "Development Economics Quarterly",
    year: "2023",
    type: "Working Paper",
  },
]

export default function ResearchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-foreground py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                  <Microscope className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="text-sm font-medium uppercase tracking-wider text-background/80">Research & Advocacy</p>
              </div>
              <h1 className="mt-6 font-serif text-4xl font-bold text-background sm:text-5xl text-balance">
                Evidence-Based Change
              </h1>
              <p className="mt-6 text-lg text-background/80 leading-relaxed">
                Our research and advocacy work ensures our programs are effective and contributes to global knowledge on
                SCD and education access.
              </p>
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Research Focus</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">Our Research Areas</h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {researchAreas.map((area) => (
                <div key={area.title} className="rounded-lg border border-border p-6">
                  <h3 className="font-semibold text-foreground text-lg">{area.title}</h3>
                  <p className="mt-2 text-muted-foreground">{area.description}</p>
                  <div className="mt-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-primary">Partners</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {area.partners.map((partner) => (
                        <span
                          key={partner}
                          className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
                        >
                          {partner}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Publications</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">Recent Research</h2>
            </div>
            <div className="mt-12 space-y-4">
              {publications.map((pub) => (
                <a
                  key={pub.title}
                  href="#"
                  className="flex items-center justify-between rounded-lg bg-card p-6 border border-border hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <FileText className="h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                      <h3 className="font-medium text-foreground">{pub.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {pub.journal} • {pub.year}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="hidden sm:inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {pub.type}
                    </span>
                    <ExternalLink className="h-5 w-5 text-muted-foreground" />
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline" className="bg-transparent">
                View All Publications
              </Button>
            </div>
          </div>
        </section>

        {/* Advocacy */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-primary">Advocacy</p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                  Driving Policy Change
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Our advocacy work focuses on influencing policy at local, national, and international levels to
                    improve outcomes for SCD patients and out-of-school children.
                  </p>
                  <p>Key advocacy achievements include:</p>
                </div>
                <ul className="mt-4 space-y-3">
                  {[
                    "Contributed to Nigeria's National SCD Control Program development",
                    "Advocated for increased education budget allocation in 3 states",
                    "Supported universal newborn SCD screening legislation",
                    "Established partnerships with 15 government ministries",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src="/advocacy-meeting-professional-conference-africa.jpg"
                  alt="Advocacy meeting"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">Support Our Research</h2>
            <p className="mt-4 text-primary-foreground/80">
              Research funding enables us to develop evidence-based solutions and advocate for effective policies.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-8">
              <Link href="/donate">Fund Research</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
