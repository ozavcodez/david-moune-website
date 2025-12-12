"use client"

import { useEffect, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { TrendingUp, Heart, School, Globe } from "lucide-react"

const stats = [
  {
    value: 50000,
    suffix: "+",
    label: "Lives Impacted",
    description: "Across Nigeria and Sub-Saharan Africa",
    backDescription: "Through healthcare access, education programs, and community support initiatives.",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
  },
  {
    value: 120,
    suffix: "+",
    label: "Schools Supported",
    description: "Providing quality education",
    backDescription: "Equipped with learning materials, trained teachers, and modern infrastructure.",
    icon: School,
    color: "from-amber-500 to-orange-600",
  },
  {
    value: 25000,
    suffix: "+",
    label: "SCD Patients Helped",
    description: "Through care and advocacy",
    backDescription: "Receiving treatment support, counseling, and community resources.",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-600",
  },
  {
    value: 15,
    suffix: "",
    label: "Countries Reached",
    description: "Expanding our global impact",
    backDescription: "Building partnerships and extending our mission across Africa and beyond.",
    icon: Globe,
    color: "from-blue-500 to-indigo-600",
  },
]

function AnimatedNumber({ value, suffix, shouldAnimate }: { value: number; suffix: string; shouldAnimate: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldAnimate) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value, shouldAnimate])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

function FlipCard({ stat, index, isVisible }: { stat: (typeof stats)[0]; index: number; isVisible: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className={`group relative h-72 transition-all duration-700 ease-out cursor-pointer perspective-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full backface-hidden" style={{ backfaceVisibility: "hidden" }}>
          <div className="h-full p-8 rounded-3xl bg-card border border-border/50 shadow-sm overflow-hidden flex flex-col justify-center items-center text-center">
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />

            {/* Icon */}
            <div
              className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg mb-6 animate-wobble`}
            >
              <stat.icon className="h-8 w-8 text-white" />
            </div>

            {/* Number */}
            <p className="font-serif text-5xl font-bold text-primary mb-2">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} shouldAnimate={isVisible} />
            </p>

            {/* Label */}
            <p className="font-semibold text-foreground text-lg mb-2">{stat.label}</p>

            {/* Description */}
            <p className="text-sm text-muted-foreground">{stat.description}</p>

            {/* Flip hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/60 flex items-center gap-1">
              <span>Hover to flip</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div
            className={`h-full p-8 rounded-3xl bg-gradient-to-br ${stat.color} shadow-xl overflow-hidden flex flex-col justify-center items-center text-center`}
          >
            {/* Decorative circles */}
            <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10" />
            <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/10" />

            {/* Icon */}
            <div className="inline-flex p-4 rounded-2xl bg-white/20 shadow-lg mb-6">
              <stat.icon className="h-8 w-8 text-white" />
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl font-bold text-white mb-4">{stat.label}</h3>

            {/* Back description */}
            <p className="text-white/90 text-sm leading-relaxed">{stat.backDescription}</p>

            {/* Decorative line */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ImpactStats() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-secondary relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-morph" />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-morph"
        style={{ animationDelay: "4s" }}
      />

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative">
        <div
          className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <span className="text-sm font-medium text-primary">Our Impact</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Making a Measurable
            <span className="block mt-2 text-accent">Difference</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Hover over cards to see more details</p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <FlipCard key={stat.label} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}
