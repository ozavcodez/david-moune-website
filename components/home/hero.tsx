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
          src="/african-children-smiling-education-classroom-warm-.jpg"
          alt=""
          className="h-full w-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
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
              The David Mone Foundation is committed to ending Sickle Cell Disease through research and advocacy, while
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div className="flex flex-col items-center gap-2 text-background/60 animate-bounce">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-background/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 rounded-full bg-accent animate-pulse" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 text-background" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  )
}
