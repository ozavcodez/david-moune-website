"use client"

import { Target, Eye, Heart } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const items = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To end Sickle Cell Disease through research, advocacy, and improved patient care, while ensuring every child has access to quality education regardless of their circumstances.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "A world where Sickle Cell Disease no longer claims lives and where every child can pursue their dreams through education, building stronger communities and a brighter future.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Compassion, integrity, collaboration, and excellence guide everything we do. We believe in treating every individual with dignity and working together for lasting impact.",
  },
]

export function MissionVision() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 })

  return (
    <section ref={ref} className="bg-secondary py-16 lg:py-24 overflow-hidden" id="mission">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item.title}
              className={`text-center group opacity-0 ${isVisible ? "animate-flip-up" : ""}`}
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: "forwards" }}
            >
              {/* Icon with heartbeat animation */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 group-hover:animate-heartbeat">
                <item.icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
              </div>

              <h3 className="mt-4 font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              {/* Animated underline */}
              <div className="mx-auto mt-2 h-0.5 w-0 bg-accent group-hover:w-16 transition-all duration-500 rounded-full" />

              <p className="mt-4 text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
