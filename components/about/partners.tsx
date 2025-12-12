"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const partners = [
  { name: "World Health Organization", logo: "/generic-health-organization-symbol.png" },
  { name: "UNICEF", logo: "/unicef-logo.png" },
  { name: "Gates Foundation", logo: "/gates-foundation-logo.jpg" },
  { name: "African Union", logo: "/african-union-logo.jpg" },
  { name: "Federal Ministry of Health", logo: "/nigeria-health-ministry-logo.jpg" },
  {
    name: "Federal Ministry of Education",
    logo: "/nigeria-education-ministry-logo.jpg",
  },
]

export function Partners() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 })
  const [reportsRef, reportsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 })

  return (
    <section ref={ref} className="py-16 lg:py-24 overflow-hidden" id="partners">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div
          className={`text-center opacity-0 ${isVisible ? "animate-blur-in" : ""}`}
          style={{ animationFillMode: "forwards" }}
        >
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Our Partners</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Working Together for Change
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We collaborate with leading organizations to maximize our impact and reach.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className={`flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:scale-125 cursor-pointer opacity-0 ${
                isVisible ? "animate-pop" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
            >
              <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="h-12 w-auto object-contain" />
            </div>
          ))}
        </div>

        <div
          ref={reportsRef}
          className={`mt-16 rounded-2xl bg-secondary p-8 text-center opacity-0 ${reportsVisible ? "animate-parallax" : ""}`}
          style={{ animationFillMode: "forwards" }}
          id="reports"
        >
          <h3 className="font-serif text-xl font-semibold text-foreground">Annual Reports & Transparency</h3>
          <p className="mt-2 text-muted-foreground">
            We believe in full transparency. Access our annual reports, financial statements, and impact assessments.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {["2024", "2023", "2022", "2021"].map((year, index) => (
              <a
                key={year}
                href="#"
                className={`rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 transition-all duration-300 opacity-0 ${
                  reportsVisible ? "animate-pop" : ""
                }`}
                style={{ animationDelay: `${index * 100 + 400}ms`, animationFillMode: "forwards" }}
              >
                {year} Annual Report
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
