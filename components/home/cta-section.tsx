"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Users, Mail, ChevronLeft, ChevronRight } from "lucide-react"
import { Animated } from "@/hooks/use-scroll-animation"

const actions = [
  {
    icon: Heart,
    title: "Donate",
    description:
      "Your contribution directly funds research, education, and patient care. Every dollar makes a difference in someone's life.",
    href: "/donate",
    gradient: "from-rose-500 to-pink-600",
    bgGradient: "from-rose-500/10 to-pink-600/10",
  },
  {
    icon: Users,
    title: "Volunteer",
    description:
      "Join our network of dedicated volunteers making change happen. Share your skills and time to transform communities.",
    href: "/get-involved#volunteer",
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-500/10 to-teal-600/10",
  },
  {
    icon: Mail,
    title: "Stay Updated",
    description: "Subscribe to our newsletter for the latest news, impact stories, and opportunities to get involved.",
    href: "#newsletter",
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-500/10 to-orange-600/10",
  },
]

export function CTASection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % actions.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToNext = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev + 1) % actions.length)
  }

  const goToPrev = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev - 1 + actions.length) % actions.length)
  }

  return (
    <section className="py-20 lg:py-32 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative">
        <Animated animation="fade-up" className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Join Us in Making a<span className="block mt-2 text-accent">Difference</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Every action counts. Whether you donate, volunteer, or simply spread the word, you become part of a movement
            that transforms lives.
          </p>
        </Animated>

        <div className="relative max-w-4xl mx-auto perspective-1000">
          {/* Navigation buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 z-20 p-3 rounded-full bg-background border border-border shadow-lg hover:shadow-xl hover:border-accent transition-all duration-300 group"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 z-20 p-3 rounded-full bg-background border border-border shadow-lg hover:shadow-xl hover:border-accent transition-all duration-300 group"
            aria-label="Next card"
          >
            <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
          </button>

          {/* Cards container */}
          <div className="relative h-[400px] md:h-[350px]">
            {actions.map((action, index) => {
              const offset = index - activeIndex
              const isActive = index === activeIndex
              const isPrev = offset === -1 || (activeIndex === 0 && index === actions.length - 1)
              const isNext = offset === 1 || (activeIndex === actions.length - 1 && index === 0)

              let transform = "translateX(0) scale(0.8)"
              let opacity = 0
              let zIndex = 0

              if (isActive) {
                transform = "translateX(0) scale(1) rotateY(0deg)"
                opacity = 1
                zIndex = 10
              } else if (isPrev) {
                transform = "translateX(-60%) scale(0.85) rotateY(15deg)"
                opacity = 0.5
                zIndex = 5
              } else if (isNext) {
                transform = "translateX(60%) scale(0.85) rotateY(-15deg)"
                opacity = 0.5
                zIndex = 5
              }

              return (
                <div
                  key={action.title}
                  className="absolute inset-0 transition-all duration-700 ease-out transform-style-3d"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                  }}
                >
                  <div
                    className={`h-full rounded-3xl p-8 md:p-12 bg-gradient-to-br ${action.bgGradient} border border-border/50 shadow-2xl backdrop-blur-sm`}
                  >
                    {/* Decorative gradient orb */}
                    <div
                      className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${action.gradient} opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3`}
                    />

                    <div className="relative z-10 h-full flex flex-col">
                      {/* Icon */}
                      <div
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${action.gradient} shadow-lg w-fit mb-8`}
                      >
                        <action.icon className="h-8 w-8 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">{action.title}</h3>

                      <p className="text-lg text-muted-foreground leading-relaxed mb-8 flex-grow">
                        {action.description}
                      </p>

                      {/* CTA Button */}
                      <Button
                        asChild
                        size="lg"
                        className={`bg-gradient-to-r ${action.gradient} hover:opacity-90 text-white border-0 shadow-lg group w-fit`}
                      >
                        <Link href={action.href} className="gap-3">
                          Get Started
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center gap-3 mt-8">
            {actions.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setActiveIndex(index)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-8 bg-accent" : "w-2 bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            {isAutoPlaying ? "Auto-playing" : "Paused"}
            <button onClick={() => setIsAutoPlaying(!isAutoPlaying)} className="ml-2 text-accent hover:underline">
              {isAutoPlaying ? "Pause" : "Resume"}
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}
