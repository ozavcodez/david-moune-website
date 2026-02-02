"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Heart, Users, Microscope, Megaphone, Building, ArrowRight, AlertCircle, Download } from "lucide-react"
import { Animated, StaggeredContainer, useScrollAnimation } from "@/hooks/use-scroll-animation"

const initiatives = [
  {
    icon: Users,
    title: "Patient Support",
    description:
      "Direct assistance to SCD patients including treatment access, counseling, and family support services.",
  },
  {
    icon: Microscope,
    title: "Research Funding",
    description: "Supporting groundbreaking research into treatments, therapies, and potential cures for SCD.",
  },
  {
    icon: Megaphone,
    title: "Awareness Campaigns",
    description: "Educational initiatives to increase understanding of SCD symptoms, prevention, and care.",
  },
  {
    icon: Building,
    title: "Healthcare Partnerships",
    description: "Working with hospitals and clinics to improve SCD treatment infrastructure and training.",
  },
]

const facts = [
  "Sickle Cell Disease affects approximately 300 million people worldwide",
  "Every year, 300,000 babies are born with SCD globally",
  "75% of SCD cases occur in Sub-Saharan Africa",
  "Nigeria has the highest burden of SCD in the world",
  "With proper care, people with SCD can live full, productive lives",
  "Early screening can significantly improve outcomes for SCD patients",
]

export default function SickleCellPage() {
  const [impactRef, impactVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero - Added slide-in animations */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/ngo-6.jpg" alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-foreground/75" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
            <div className="max-w-2xl">
              <Animated animation="fade-right" delay={0}>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                    <Heart className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <p className="text-sm font-medium uppercase tracking-wider text-background/80">Health Program</p>
                </div>
              </Animated>
              <Animated animation="fade-right" delay={150}>
                <h1 className="mt-6 font-serif text-4xl font-bold text-background sm:text-5xl text-balance">
                  Fighting Sickle Cell Disease
                </h1>
              </Animated>
              <Animated animation="fade-right" delay={300}>
                <p className="mt-6 text-lg text-background/90 leading-relaxed">
                  Our comprehensive program addresses SCD through research, patient support, awareness, and advocacy to
                  improve lives and work toward a cure.
                </p>
              </Animated>
              <Animated animation="fade-up" delay={450}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/donate">
                      Support This Program
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-transparent text-background border-background/30 hover:bg-background/10 hover:text-background"
                  >
                    <Link href="#resources">Download Resources</Link>
                  </Button>
                </div>
              </Animated>
            </div>
          </div>
        </section>

        {/* What is SCD - Added alternating slide animations */}
        <section className="py-16 lg:py-24 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <Animated animation="fade-right">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wider text-primary">Understanding SCD</p>
                  <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                    What is Sickle Cell Disease?
                  </h2>
                  <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Sickle Cell Disease is an inherited blood disorder that affects the shape of red blood cells.
                      Normal red blood cells are round and flexible, allowing them to move easily through blood vessels.
                    </p>
                    <p>
                      In SCD, red blood cells become rigid and shaped like sickles or crescent moons. These irregular
                      cells can block blood flow, causing pain, infections, and other serious complications.
                    </p>
                    <p>
                      While there is currently no universal cure, proper management and care can significantly improve
                      quality of life and life expectancy for those living with SCD.
                    </p>
                  </div>
                </div>
              </Animated>
              <Animated animation="fade-left" delay={200}>
                <div className="relative">
                  <div className="aspect-square overflow-hidden rounded-lg bg-secondary p-8">
                    <img
                      src="/ngo-6.jpg"
                      alt="Sickle Cell Disease diagram"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              </Animated>
            </div>
          </div>
        </section>

        {/* Key Facts - Added staggered fade-up animations */}
        <section className="bg-secondary py-16 lg:py-24 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Animated animation="fade-down" className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Key Facts</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Understanding the Global Impact
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Important statistics about Sickle Cell Disease worldwide
              </p>
            </Animated>
            <StaggeredContainer
              animation="fade-up"
              staggerDelay={100}
              className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {facts.map((fact, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col gap-4 rounded-3xl bg-card/50 backdrop-blur-sm p-8 border border-border/50 hover:bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  {/* Soft decorative circle */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors duration-500" />
                  
                  <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <AlertCircle className="h-6 w-6 text-primary" />
                  </div>
                  
                  <p className="relative text-base text-foreground leading-relaxed font-normal">
                    {fact}
                  </p>
                </div>
              ))}
            </StaggeredContainer>
          </div>
        </section>

        {/* Our Initiatives - Added zoom-in staggered animations with images */}
        <section className="py-16 lg:py-24 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Animated animation="fade-up" className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Our Approach</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                How We're Making Change
              </h2>
            </Animated>
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {/* Left Column - First Two Initiatives */}
              <div className="space-y-8">
                {initiatives.slice(0, 2).map((initiative, index) => (
                  <Animated
                    key={initiative.title}
                    animation="fade-right"
                    delay={index * 150}
                  >
                    <div className="group flex gap-6 rounded-2xl border-2 border-border bg-card p-8 hover:shadow-2xl hover:border-primary/50 hover:-translate-y-2 transition-all duration-300">
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <initiative.icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-foreground mb-3">{initiative.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{initiative.description}</p>
                      </div>
                    </div>
                  </Animated>
                ))}
                
                {/* Image Break 1 */}
                <Animated animation="zoom-in" delay={300}>
                  <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-border hover:shadow-2xl transition-shadow duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=400&fit=crop" 
                      alt="Healthcare support"
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Animated>
              </div>

              {/* Right Column - Image First, Then Last Two Initiatives */}
              <div className="space-y-8">
                {/* Image Break 2 */}
                <Animated animation="zoom-in" delay={150}>
                  <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-border hover:shadow-2xl transition-shadow duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop" 
                      alt="Medical research"
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Animated>

                {initiatives.slice(2, 4).map((initiative, index) => (
                  <Animated
                    key={initiative.title}
                    animation="fade-left"
                    delay={300 + index * 150}
                  >
                    <div className="group flex gap-6 rounded-2xl border-2 border-border bg-card p-8 hover:shadow-2xl hover:border-primary/50 hover:-translate-y-2 transition-all duration-300">
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <initiative.icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-foreground mb-3">{initiative.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{initiative.description}</p>
                      </div>
                    </div>
                  </Animated>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Impact Numbers - Added animated counters */}
        <section ref={impactRef} className="bg-primary py-16 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 text-center md:grid-cols-4">
              {[
                { value: "25,000+", label: "Patients Supported" },
                { value: "500+", label: "Awareness Events" },
                { value: "45", label: "Partner Hospitals" },
                { value: "$2M+", label: "Research Funded" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-primary-foreground transition-all duration-700 ${
                    impactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <p className="font-serif text-4xl font-bold">{stat.value}</p>
                  <p className="mt-2 text-sm text-primary-foreground/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

     
        {/* CTA - Added zoom-in animation */}
        <section className="bg-secondary py-16 lg:py-24 overflow-hidden">
          <Animated animation="zoom-in" className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Join the Fight Against Sickle Cell Disease
            </h2>
            <p className="mt-4 text-muted-foreground">
              Your support helps fund research, provide patient care, and raise awareness. Together, we can make a
              difference.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent">
                <Link href="/get-involved">Get Involved</Link>
              </Button>
            </div>
          </Animated>
        </section>
      </main>
      <Footer />
    </div>
  )
}
