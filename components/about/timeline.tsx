"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const milestones = [
  {
    year: "2015",
    title: "Foundation Established",
    description: "David Mone Foundation officially registered and began operations in Lagos, Nigeria.",
  },
  {
    year: "2016",
    title: "First SCD Awareness Campaign",
    description: "Launched our inaugural Sickle Cell awareness campaign reaching over 10,000 people.",
  },
  {
    year: "2018",
    title: "Education Program Launch",
    description: "Expanded mission to include education access, partnering with 20 schools.",
  },
  {
    year: "2020",
    title: "Research Partnership",
    description: "Established research collaborations with leading medical institutions.",
  },
  {
    year: "2022",
    title: "Regional Expansion",
    description: "Extended programs to 5 additional countries in Sub-Saharan Africa.",
  },
  {
    year: "2024",
    title: "50,000 Lives Impacted",
    description: "Reached milestone of positively impacting 50,000 lives through our programs.",
  },
]

export function Timeline() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1 })

  return (
    <section ref={ref} className="py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div
          className={`text-center opacity-0 ${isVisible ? "animate-blur-in" : ""}`}
          style={{ animationFillMode: "forwards" }}
        >
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Our Journey</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">Key Milestones</h2>
        </div>

        <div className="mt-12">
          <div className="relative">
            {/* Animated timeline line */}
            <div
              className={`absolute left-4 top-0 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2 ${isVisible ? "animate-draw-line" : "h-0"}`}
              style={{ height: isVisible ? "100%" : "0" }}
            />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot with pulse animation */}
                  <div
                    className={`absolute left-4 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground md:left-1/2 opacity-0 ${
                      isVisible ? "animate-zoom-rotate" : ""
                    }`}
                    style={{ animationDelay: `${index * 200 + 300}ms`, animationFillMode: "forwards" }}
                  >
                    {milestone.year.slice(2)}
                  </div>

                  {/* Content with fold-down animation */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"} opacity-0 ${
                      isVisible ? "animate-fold-down" : ""
                    }`}
                    style={{ animationDelay: `${index * 200}ms`, animationFillMode: "forwards" }}
                  >
                    <div className="rounded-lg bg-card p-6 shadow-sm border border-border hover:shadow-lg hover:border-accent/50 transition-all duration-300 group">
                      <p className="text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                        {milestone.year}
                      </p>
                      <h3 className="mt-1 font-semibold text-foreground">{milestone.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{milestone.description}</p>

                      {/* Animated accent line on hover */}
                      <div className="mt-4 h-0.5 bg-accent/0 group-hover:bg-accent/50 transition-all duration-300 w-0 group-hover:w-full rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
