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

const sdgs = [
  {
    number: 3,
    title: "Good Health and Well-being",
    description: "Ensuring healthy lives and promoting well-being through our Sickle Cell Disease programs",
    color: "bg-[#4C9F38]",
    icon: "/sdg.jpeg"
  },
  {
    number: 4,
    title: "Quality Education",
    description: "Providing inclusive and equitable quality education through our school integration programs",
    color: "bg-[#C5192D]",
    icon: "/sdg.jpeg"
  },
  {
    number: 5,
    title: "Gender Equality",
    description: "Achieving gender equality and empowering all women and girls in our communities",
    color: "bg-[#FF3A21]",
    icon: "/sdg.jpeg"
  },
  {
    number: 9,
    title: "Industry, Innovation and Infrastructure",
    description: "Building resilient infrastructure and fostering innovation in healthcare and education",
    color: "bg-[#FD6925]",
    icon: "/sdg.jpeg"
  },
  {
    number: 13,
    title: "Climate Action",
    description: "Taking urgent action to combat climate change and its impacts in our communities",
    color: "bg-[#3F7E44]",
    icon: "/sdg.jpeg"
  },
]

export function Partners() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 })
  const [sdgRef, sdgVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 })
  const [reportsRef, reportsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 })

  return (
    <>
      {/* UN SDGs Section */}
      <section ref={sdgRef} className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 to-background" id="sdgs">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div
            className={`text-center opacity-0 ${sdgVisible ? "animate-blur-in" : ""}`}
            style={{ animationFillMode: "forwards" }}
          >
            <p className="text-sm font-medium uppercase tracking-wider text-primary">UN Sustainable Development Goals</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Contributing to Global Development
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Our work aligns with the United Nations Sustainable Development Goals, addressing critical global challenges.
            </p>
          </div>

          {/* SDG Goals List First */}
          <div 
            className={`mt-12 opacity-0 ${sdgVisible ? "animate-blur-in" : ""}`}
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {sdgs.map((sdg, index) => (
                <div
                  key={sdg.number}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300`}
                >
                  <div className={`${sdg.color} text-white font-black text-xl px-3 py-1 rounded-full flex-shrink-0`}>
                    {sdg.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-foreground leading-tight">
                      {sdg.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Width SDG Image Below */}
          <div 
            className={`mt-12 opacity-0 ${sdgVisible ? "animate-blur-in" : ""}`}
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          >
            <img 
              src="/sdg.jpeg" 
              alt="UN Sustainable Development Goals"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* UN Partnership Badge */}
          <div 
            className={`mt-12 text-center opacity-0 ${sdgVisible ? "animate-blur-in" : ""}`}
            style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border-2 border-primary/20">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">UN</span>
              </div>
              <span className="text-sm font-bold text-foreground">Aligned with United Nations SDG Framework</span>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      {/* <section ref={ref} className="py-16 lg:py-24 overflow-hidden" id="partners">
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
      </section> */}
    </>
  )
}
