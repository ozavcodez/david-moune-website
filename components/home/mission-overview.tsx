"use client"

import Link from "next/link"
import { Heart, GraduationCap, ArrowRight, Sparkles } from "lucide-react"
import { Animated } from "@/hooks/use-scroll-animation"

const missions = [
  {
    icon: Heart,
    title: "End Sickle Cell Disease",
    description:
      "Through groundbreaking research, patient advocacy, and improved access to treatment, we're working to eliminate the burden of Sickle Cell Disease on families worldwide.",
    href: "/programs/sickle-cell",
    stats: "300M+",
    statsLabel: "affected globally",
    image: "/medical-research-laboratory-sickle-cell-healthcare.jpg",
    color: "from-rose-500/20 to-primary/20",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-600",
  },
  {
    icon: GraduationCap,
    title: "Education for All",
    description:
      "We believe every child deserves access to quality education. Our programs help reduce the number of out-of-school children and provide resources for lifelong learning.",
    href: "/programs/education",
    stats: "244M",
    statsLabel: "children out of school",
    image: "/african-children-in-classroom-learning-education-s.jpg",
    color: "from-amber-500/20 to-primary/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
]

export function MissionOverview() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-delayed" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative">
        <Animated animation="fade-up" className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary">Our Mission</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Two Pillars of
            <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Transformative Change
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            We focus on two critical areas that affect millions of lives across Africa and beyond.
          </p>
        </Animated>

        <div className="grid gap-8 lg:grid-cols-2">
          {missions.map((mission, index) => (
            <Animated key={mission.title} animation={index === 0 ? "fade-right" : "fade-left"} delay={index * 200}>
              <Link href={mission.href} className="group block">
                <div className="relative h-full rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10">
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${mission.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Image section with parallax effect */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={mission.image || "/placeholder.svg"}
                      alt={mission.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                    {/* Floating stats badge */}
                    <div className="absolute top-4 right-4 px-4 py-2 rounded-2xl bg-background/90 backdrop-blur-md border border-border/50 shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                      <p className="text-2xl font-bold text-primary">{mission.stats}</p>
                      <p className="text-xs text-muted-foreground">{mission.statsLabel}</p>
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="relative p-8">
                    {/* Icon with animated ring */}
                    <div className="relative inline-block mb-6">
                      <div
                        className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl ${mission.iconBg} border border-current/10`}
                      >
                        <mission.icon className={`h-8 w-8 ${mission.iconColor}`} />
                      </div>
                      <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                      {mission.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed mb-6">{mission.description}</p>

                    {/* Animated CTA */}
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <span className="relative">
                        Explore Program
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                      </span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Link>
            </Animated>
          ))}
        </div>
      </div>
    </section>
  )
}
