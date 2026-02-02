"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Animated } from "@/hooks/use-scroll-animation"

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image with enhanced overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop&q=80"
          alt="Children learning in classroom"
          className="h-full w-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
      </div>

      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-float" />
      <div
        className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-accent/5 blur-2xl animate-float"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:px-8 lg:py-40 w-full">
        <div className="max-w-2xl">
          <Animated animation="fade-right" delay={0}>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 backdrop-blur-sm border border-accent/30">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground">
                Transforming Lives Through Health & Education
              </p>
            </div>
          </Animated>

          <Animated animation="fade-right" delay={150}>
            <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-background sm:text-5xl lg:text-6xl text-balance leading-tight">
              Building a Future Where <span className="text-accent">Every Child</span> Thrives
            </h1>
          </Animated>

          <Animated animation="fade-right" delay={300}>
            <p className="mt-6 text-lg leading-relaxed text-background/90 max-w-xl">
              David Mone Foundation is committed to ending Sickle Cell Disease through research and advocacy, while
              ensuring every child has access to quality education.
            </p>
          </Animated>

          <Animated animation="fade-up" delay={450}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 btn-hover shadow-lg shadow-accent/25 text-base px-8"
              >
                <Link href="/donate">
                  Make a Donation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-background/10 text-background border-background/30 hover:bg-background/20 hover:text-background btn-hover backdrop-blur-sm text-base px-8"
              >
                <Link href="/about">Learn Our Story</Link>
              </Button>
            </div>
          </Animated>

          {/* <Animated animation="fade-up" delay={600}>
            <div className="mt-16 flex flex-wrap gap-8 pt-8 border-t border-background/20">
              {[
                { value: "50K+", label: "Lives Impacted" },
                { value: "6", label: "States Reached" },
                { value: "15+", label: "Partners" },
              ].map((stat) => (
                <div key={stat.label} className="text-background">
                  <p className="text-3xl font-serif font-bold text-accent">{stat.value}</p>
                  <p className="text-sm text-background/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </Animated> */}
        </div>
      </div>


    </section>
  )
}
