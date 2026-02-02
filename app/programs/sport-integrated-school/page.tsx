import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { GraduationCap, Heart, Trophy, Users, Building2, BookOpen } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sport-Integrated School | David Mone Foundation",
  description:
    "Innovative educational approach combining academics with sports development for holistic growth. Empowering every child to succeed regardless of their background or academic performance.",
};

const facilities = [
  { name: "Indoor Swimming Pool", icon: "🏊‍♂️", description: "State-of-the-art aquatic training facility" },
  { name: "Basketball Court", icon: "🏀", description: "Professional-grade court for skill development" },
  { name: "Mini Football Pitch", icon: "⚽", description: "Dedicated space for football training" },
  { name: "Athletics Track", icon: "🏃", description: "Track for running and field events" },
  { name: "Gymnastics Hall", icon: "🤸‍♀️", description: "Equipment for artistic and rhythmic gymnastics" },
  { name: "Multi-Purpose Courts", icon: "🏸", description: "Facilities for badminton, tennis, and volleyball" },
];

const partnershipBenefits = [
  {
    title: "International Scholarships",
    description: "Partnerships with global sports academies and universities for student advancement",
    icon: "🌍",
  },
  {
    title: "Professional Pathways",
    description: "Direct connections to professional leagues and sports organizations",
    icon: "🏆",
  },
  {
    title: "Career Development",
    description: "Holistic support for transitioning from youth to professional sports careers",
    icon: "💼",
  },
  {
    title: "Academic Excellence",
    description: "Balanced curriculum ensuring strong academic foundations alongside sports training",
    icon: "📚",
  },
];

export default function SportIntegratedSchoolPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/building.jpeg" alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-foreground/75" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Innovation in Education</p>
              <h1 className="mt-4 font-serif text-4xl font-bold text-background sm:text-5xl text-balance">
                Sport-<span className="text-accent">Integrated</span> School
              </h1>
              <p className="mt-6 text-lg text-background/80 leading-relaxed">
                Where every child succeeds, regardless of academic performance. Recognizing that intellect comes in many forms, 
                we create pathways for students to excel in sports, academics, arts, and technical skills.
              </p>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                  Addressing Educational Challenges
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Traditional education systems often discourage children who don't excel academically. Many children in our 
                  communities don't see the value of education because they feel limited by their academic performance. 
                  Our revolutionary approach changes this narrative.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary text-sm">✓</span>
                    </div>
                    <p className="text-muted-foreground">
                      <span className="font-medium">Not everyone excels in traditional academics</span> - but everyone has talents worth developing
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary text-sm">✓</span>
                    </div>
                    <p className="text-muted-foreground">
                      <span className="font-medium">Sports offer alternative pathways to success</span> - scholarships, professional careers, and personal growth
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary text-sm">✓</span>
                    </div>
                    <p className="text-muted-foreground">
                      <span className="font-medium">Partnerships create global opportunities</span> - connecting our students to international sports networks
                    </p>
                  </div>
                </div>
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl group">
                <img
                  src="/ngo-14.jpg"
                  alt="Children engaged in learning"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Solution */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Our Revolutionary Approach
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                A school where academic achievement isn't the only measure of success. We recognize multiple forms of intelligence 
                and talent, creating equal opportunities for all children to thrive.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: GraduationCap, title: "Academic Excellence", description: "Strong foundational education for all students" },
                { icon: Trophy, title: "Sports Development", description: "Professional coaching and training facilities" },
                { icon: Heart, title: "Holistic Growth", description: "Focus on emotional and social development" },
                { icon: Users, title: "Community Connection", description: "Partnerships with local and international organizations" },
              ].map((item, index) => (
                <div key={item.title} className="rounded-2xl bg-card p-6 border border-border text-center group hover:shadow-lg transition-all">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                World-Class Sports Facilities
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                State-of-the-art infrastructure designed to nurture athletic talent and promote physical well-being
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {facilities.map((facility) => (
                <div key={facility.name} className="rounded-2xl bg-card p-6 border border-border group hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-3xl">{facility.icon}</div>
                    <div>
                      <h3 className="font-semibold text-foreground">{facility.name}</h3>
                      <p className="text-sm text-muted-foreground">{facility.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnerships Benefits */}
        {/* <section className="bg-primary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
                Partnership Advantages
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/90 max-w-3xl mx-auto">
                Through strategic collaborations, we create direct pathways for our students to advance in their chosen sports careers
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {partnershipBenefits.map((benefit) => (
                <div key={benefit.title} className="rounded-2xl bg-background p-6 border border-border/30">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 text-4xl">{benefit.icon}</div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{benefit.title}</h3>
                      <p className="mt-2 text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* How It Works */}
        {/* <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Our Process
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                From identifying talent to achieving professional success
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { 
                  step: 1, 
                  title: "Talent Identification", 
                  description: "Assessing students' strengths in various sports and academic areas" 
                },
                { 
                  step: 2, 
                  title: "Skill Development", 
                  description: "Professional coaching and training programs tailored to individual talents" 
                },
                { 
                  step: 3, 
                  title: "Partnership Activation", 
                  description: "Connecting with sports agencies and organizations for opportunities" 
                },
                { 
                  step: 4, 
                  title: "Career Advancement", 
                  description: "Securing scholarships and professional pathways for top performers" 
                },
              ].map((step) => (
                <div key={step.step} className="text-center">
                  <div className="mx-auto flex h-16 w-16 rounded-full bg-primary/10 items-center justify-center text-primary font-bold text-lg border-2 border-primary/20">
                    {step.step}
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Call to Action */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Be Part of Our Revolution
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Join us in transforming education by supporting our Sport-Integrated School initiative. 
              Together, we can ensure every child has the opportunity to succeed.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/donate">
                  Support Our Vision
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}