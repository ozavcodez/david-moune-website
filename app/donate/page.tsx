import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DonationForm } from "@/components/donate/donation-form"
import { Heart, GraduationCap, Microscope, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Donate | David Mone Foundation",
  description:
    "Support the David Mone Foundation's work to end Sickle Cell Disease and provide education access for children in Africa.",
}

const impactExamples = [
  { amount: "$25", impact: "Provides school supplies for one child for a year" },
  { amount: "$50", impact: "Funds SCD screening for 10 community members" },
  { amount: "$100", impact: "Supports one month of treatment for an SCD patient" },
  { amount: "$250", impact: "Sponsors a scholarship for one student for a term" },
  { amount: "$500", impact: "Funds teacher training for 5 educators" },
  { amount: "$1,000", impact: "Supports research equipment and supplies" },
]

const programs = [
  {
    icon: Heart,
    title: "Sickle Cell Disease",
    description: "Patient support, awareness, and treatment access",
  },
  {
    icon: GraduationCap,
    title: "Education Access",
    description: "Scholarships, schools, and learning resources",
  },
  {
    icon: Microscope,
    title: "Research",
    description: "Funding groundbreaking SCD research",
  },
  {
    icon: Shield,
    title: "Where Needed Most",
    description: "Support our highest priority needs",
  },
]

export default function DonatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center text-primary-foreground">
              <h1 className="font-serif text-4xl font-bold sm:text-5xl text-balance">Make a Difference Today</h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/90">
                Your donation directly supports our programs to end Sickle Cell Disease and ensure every child has
                access to quality education.
              </p>
            </div>
          </div>
        </section>

        {/* Donation Form Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Form */}
              <div className="order-2 lg:order-1">
                <DonationForm />
              </div>

              {/* Impact Info */}
              <div className="order-1 lg:order-2">
                <h2 className="font-serif text-2xl font-bold text-foreground">Your Impact</h2>
                <p className="mt-3 text-muted-foreground">
                  Every contribution, regardless of size, makes a difference.
                </p>

                <div className="mt-8 space-y-3">
                  {impactExamples.map((example) => (
                    <div key={example.amount} className="flex items-center gap-4 rounded-lg border border-border p-4">
                      <span className="font-serif text-xl font-bold text-primary">{example.amount}</span>
                      <span className="text-sm text-muted-foreground">{example.impact}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-lg bg-secondary p-6">
                  <h3 className="font-semibold text-foreground">Why Donate to Us?</h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                      90% of donations go directly to programs
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                      Transparent reporting and accountability
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                      Tax-deductible contributions
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                      Regular impact updates for donors
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Ways to Give */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Other Ways to Give</h2>
              <p className="mt-4 text-muted-foreground">
                Beyond online donations, there are many ways to support our work.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Monthly Giving",
                  description: "Become a sustaining donor with a recurring monthly gift.",
                },
                {
                  title: "Corporate Matching",
                  description: "Double your impact through employer matching programs.",
                },
                {
                  title: "Legacy Giving",
                  description: "Include the Foundation in your estate planning.",
                },
                {
                  title: "In-Kind Donations",
                  description: "Donate supplies, equipment, or services.",
                },
              ].map((option) => (
                <div key={option.title} className="rounded-lg bg-card p-6 border border-border">
                  <h3 className="font-semibold text-foreground">{option.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{option.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground">
                For questions about giving options, contact us at{" "}
                <a href="mailto:donate@davidmonefoundation.org" className="text-primary hover:underline">
                  donate@davidmonefoundation.org
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
