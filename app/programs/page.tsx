"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Heart, GraduationCap, ArrowRight, Users, Globe, TrendingUp, Building2 } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const programs = [
  {
    icon: Heart,
    title: "Sickle Cell Disease Program",
    description:
      "Comprehensive support for SCD patients including awareness campaigns, research funding, treatment access, and advocacy for better healthcare policies.",
    href: "/programs/sickle-cell",
    stats: [
      { label: "Patients Supported", value: "25,000+" },
      { label: "Awareness Events", value: "500+" },
      { label: "Partner Hospitals", value: "45" },
    ],
    image: "/ngo-6.jpg",
  },
  {
    icon: GraduationCap,
    title: "Education Access Program",
    description:
      "Initiatives to reduce out-of-school children through scholarships, school infrastructure support, teacher training, and learning resources.",
    href: "/programs/education",
    stats: [
      { label: "Students Supported", value: "30,000+" },
      { label: "Schools Partnered", value: "120+" },
      { label: "Scholarships Awarded", value: "5,000+" },
    ],
    image: "/ngo-15.jpg",
  },
  {
    icon: Building2,
    title: "Foundation Complex",
    description:
      "A comprehensive ecosystem combining healthcare, education, research, and community support. Our revolutionary Sport-Integrated School recognizes that intellect comes in many forms, offering pathways for children to succeed in academics, arts, technical skills, or sports.",
    href: "/programs/sport-integrated-school",
    stats: [
      { label: "School Components", value: "5" },
      { label: "Sports Facilities", value: "6+" },
      { label: "Partnerships", value: "Global" },
    ],
    image: "/building.jpeg",
  },
]

const globalStats = [
  {
    icon: Users,
    value: "300M+",
    label: "People affected by SCD globally",
  },
  {
    icon: Globe,
    value: "244M",
    label: "Children out of school worldwide",
  },
  {
    icon: TrendingUp,
    value: "75%",
    label: "SCD cases occur in Africa",
  },
]

export default function ProgramsPage() {
  const [heroRef, heroVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 })
  const [statsRef, statsVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 })
  const [outreachRef, outreachVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 })
  const [program0Ref, program0Visible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 })
  const [program1Ref, program1Visible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 })
  const [program2Ref, program2Visible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 })
  const programRefs = [
    [program0Ref, program0Visible],
    [program1Ref, program1Visible],
    [program2Ref, program2Visible],
  ] as const

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero with skew animation */}
        <section ref={heroRef} className="relative bg-foreground py-24 lg:py-32 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/ngo-1.jpg"
              alt="Programs and initiatives"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/75" />
          </div>
          
          <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl">
              <p
                className={`text-sm font-medium uppercase tracking-wider text-primary opacity-0 ${heroVisible ? "animate-skew-in" : ""}`}
                style={{ animationFillMode: "forwards" }}
              >
                Our Programs
              </p>
              <h1
                className={`mt-4 font-serif text-4xl font-bold text-background sm:text-5xl text-balance opacity-0 ${heroVisible ? "animate-skew-in" : ""}`}
                style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
              >
                Creating Lasting Impact Through Action
              </h1>
              <p
                className={`mt-6 text-lg text-background/80 leading-relaxed opacity-0 ${heroVisible ? "animate-blur-in" : ""}`}
                style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
              >
                Our programs address two of the most pressing challenges facing communities in Africa: Sickle Cell
                Disease and lack of access to quality education.
              </p>
            </div>
          </div>
        </section>

        {/* Global Context with pop animations */}
        <section ref={statsRef} className="bg-primary py-12 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              {globalStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex items-center gap-4 text-primary-foreground opacity-0 ${
                    statsVisible ? "animate-pop" : ""
                  }`}
                  style={{ animationDelay: `${index * 150}ms`, animationFillMode: "forwards" }}
                >
                  <stat.icon className="h-10 w-10 flex-shrink-0 opacity-80 animate-wobble" />
                  <div>
                    <p className="font-serif text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-primary-foreground/80">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs with parallax and reveal animations */}
        <section className="py-16 lg:py-24 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="space-y-24">
              {programs.map((program, index) => {
                const [programRef, programVisible] = programRefs[index]

                return (
                  <div
                    key={program.title}
                    ref={programRef}
                    className={`grid gap-12 lg:grid-cols-2 lg:gap-16 items-center ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`${index % 2 === 1 ? "lg:order-2" : ""} opacity-0 ${programVisible ? "animate-skew-in" : ""}`}
                      style={{ animationFillMode: "forwards" }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 animate-heartbeat">
                          <program.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="font-serif text-3xl font-bold text-foreground">{program.title}</h2>
                      </div>
                      <p className="mt-6 text-muted-foreground leading-relaxed">{program.description}</p>

                      <div className="mt-8 grid grid-cols-3 gap-4">
                        {program.stats.map((stat, statIndex) => (
                          <div
                            key={stat.label}
                            className={`text-center rounded-lg bg-secondary p-4 opacity-0 ${programVisible ? "animate-flip-up" : ""}`}
                            style={{ animationDelay: `${statIndex * 100 + 300}ms`, animationFillMode: "forwards" }}
                          >
                            <p className="font-serif text-2xl font-bold text-primary">{stat.value}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                          </div>
                        ))}
                      </div>

                      <Button asChild className="mt-8 gap-2 btn-hover">
                        <Link href={program.href}>
                          Learn More
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>

                    <div
                      className={`relative ${index % 2 === 1 ? "lg:order-1" : ""} opacity-0 ${programVisible ? "animate-parallax" : ""}`}
                      style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
                    >
                      <div className="aspect-[4/3] overflow-hidden rounded-2xl group">
                        <img
                          src={program.image || "/placeholder.svg"}
                          alt={program.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      {/* Floating decorative element */}
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full animate-float-slow" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Community Outreach with elastic animations */}
        {/* <section ref={outreachRef} className="bg-secondary py-16 lg:py-24 overflow-hidden" id="outreach">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div
              className={`text-center opacity-0 ${outreachVisible ? "animate-blur-in" : ""}`}
              style={{ animationFillMode: "forwards" }}
            >
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Community Outreach</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Reaching Communities Where They Are
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Beyond our core programs, we engage with communities through health screenings, educational workshops,
                and awareness campaigns.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Health Screenings", value: "1,000+", description: "Annual community screenings" },
                { title: "Educational Workshops", value: "200+", description: "Training sessions held" },
                { title: "Community Events", value: "150+", description: "Awareness events yearly" },
                { title: "Volunteer Hours", value: "50,000+", description: "Hours contributed" },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className={`rounded-2xl bg-card p-6 text-center border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group opacity-0 ${
                    outreachVisible ? "animate-elastic" : ""
                  }`}
                  style={{ animationDelay: `${index * 100 + 300}ms`, animationFillMode: "forwards" }}
                >
                  <p className="font-serif text-4xl font-bold text-primary group-hover:text-accent transition-colors">
                    {item.value}
                  </p>
                  <p className="mt-2 font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>

                 
                  <div className="mt-4 mx-auto h-0.5 w-0 bg-accent group-hover:w-12 transition-all duration-500 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </section> */}
      </main>
      <Footer />
    </div>
  )
}
