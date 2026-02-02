"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function ImpactStats() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our Foundation's
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Story</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Founded with a vision to transform lives through education and healthcare, we've been dedicated to creating lasting impact in communities across Nigeria. Our journey began with a simple belief: every child deserves the opportunity to thrive.
              </p>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              From establishing schools in rural communities to pioneering comprehensive Sickle Cell Disease care programs, we've grown into a beacon of hope. Through research, advocacy, and direct community engagement, we continue to build bridges toward a healthier, more educated future for all.
            </p>
            
            <div className="pt-4">
              <Button asChild size="lg" className="group">
                <Link href="/about">
                  Discover Our Story
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/ngo-15.jpg"
                alt="Children in classroom"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
