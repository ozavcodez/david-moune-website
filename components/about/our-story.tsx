"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function OurStory() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 })

  return (
    <section ref={ref} className="py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className={`opacity-0 ${isVisible ? "animate-skew-in" : ""}`} style={{ animationFillMode: "forwards" }}>
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Our Story</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                From Personal Experience to Global Impact
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p
                  className={`opacity-0 ${isVisible ? "animate-blur-in" : ""}`}
                  style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
                >
                  The David Mone Foundation began as a response to the profound challenges faced by families dealing
                  with Sickle Cell Disease in Nigeria and across Sub-Saharan Africa. Our founder witnessed firsthand the
                  lack of awareness, inadequate healthcare, and limited support available to those living with SCD.
                </p>
                <p
                  className={`opacity-0 ${isVisible ? "animate-blur-in" : ""}`}
                  style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
                >
                  Recognizing that health and education are fundamentally interconnected, we expanded our mission to
                  address the crisis of out-of-school children. We believe that a healthy, educated population is the
                  foundation of sustainable development.
                </p>
                <p
                  className={`opacity-0 ${isVisible ? "animate-blur-in" : ""}`}
                  style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
                >
                  Today, we work with communities, healthcare providers, educators, and government bodies to create
                  systemic change. Our approach combines direct intervention with advocacy, research, and capacity
                  building to ensure our impact is both immediate and lasting.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`relative opacity-0 ${isVisible ? "animate-parallax" : ""}`}
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-lg group">
              <img
                src="/community-gathering-african-village-children-educa.jpg"
                alt="Community gathering"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div
              className={`absolute -bottom-6 -left-6 w-48 rounded-lg bg-primary p-4 text-primary-foreground shadow-lg opacity-0 ${isVisible ? "animate-pop" : ""}`}
              style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
            >
              <p className="font-serif text-3xl font-bold">2015</p>
              <p className="text-sm text-primary-foreground/80">Year Founded</p>
            </div>

            {/* Floating decorative element */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full animate-float-slow" />
          </div>
        </div>
      </div>
    </section>
  )
}
