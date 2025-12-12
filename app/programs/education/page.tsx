"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, School, Users, Award, ArrowRight, MapPin } from "lucide-react"
import { Animated, StaggeredContainer, useScrollAnimation } from "@/hooks/use-scroll-animation"

const initiatives = [
  {
    icon: Award,
    title: "Scholarships",
    description:
      "Providing full and partial scholarships to enable children from disadvantaged backgrounds to attend school.",
  },
  {
    icon: School,
    title: "School Infrastructure",
    description: "Building and renovating schools, providing furniture, and improving learning environments.",
  },
  {
    icon: Users,
    title: "Teacher Training",
    description: "Professional development programs to enhance teaching quality and student outcomes.",
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description: "Supplying textbooks, learning materials, and digital resources to students and schools.",
  },
]

const impactAreas = [
  { region: "Lagos State", schools: 35, students: 8500 },
  { region: "Ogun State", schools: 25, students: 6200 },
  { region: "Oyo State", schools: 20, students: 5100 },
  { region: "Kano State", schools: 18, students: 4800 },
  { region: "Rivers State", schools: 12, students: 3200 },
  { region: "Kaduna State", schools: 10, students: 2200 },
]

export default function EducationPage() {
  const [statsRef, statsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 })
  const [impactRef, impactVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero - Added slide-in animations */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/african-children-classroom-education-learning.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/75" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
            <div className="max-w-2xl">
              <Animated animation="fade-right" delay={0}>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                    <GraduationCap className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <p className="text-sm font-medium uppercase tracking-wider text-background/80">Education Program</p>
                </div>
              </Animated>
              <Animated animation="fade-right" delay={150}>
                <h1 className="mt-6 font-serif text-4xl font-bold text-background sm:text-5xl text-balance">
                  Education for Every Child
                </h1>
              </Animated>
              <Animated animation="fade-right" delay={300}>
                <p className="mt-6 text-lg text-background/90 leading-relaxed">
                  We believe education is a fundamental right. Our programs work to ensure every child has access to
                  quality learning opportunities, regardless of their circumstances.
                </p>
              </Animated>
              <Animated animation="fade-up" delay={450}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/donate">
                      Support Education
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-transparent text-background border-background/30 hover:bg-background/10 hover:text-background"
                  >
                    <Link href="#impact">View Our Impact</Link>
                  </Button>
                </div>
              </Animated>
            </div>
          </div>
        </section>

        {/* The Challenge - Added alternating slide animations */}
        <section className="py-16 lg:py-24 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <Animated animation="fade-right">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wider text-primary">The Challenge</p>
                  <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                    244 Million Children Out of School
                  </h2>
                  <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      According to UNESCO, 244 million children and youth worldwide are not in school. In Sub-Saharan
                      Africa, the situation is particularly acute, with millions of children unable to access basic
                      education.
                    </p>
                    <p>
                      Poverty, gender discrimination, conflict, and lack of infrastructure are among the key barriers
                      preventing children from attending school. Without education, these children face limited
                      opportunities and perpetuated cycles of poverty.
                    </p>
                    <p>
                      Our Education Access Program addresses these challenges through a multi-faceted approach that
                      tackles both immediate needs and systemic barriers.
                    </p>
                  </div>
                </div>
              </Animated>
              <div ref={statsRef} className="grid grid-cols-2 gap-4">
                {[
                  { value: "244M", label: "Out of school globally" },
                  { value: "98M", label: "In Sub-Saharan Africa" },
                  { value: "60%", label: "Are girls" },
                  { value: "40%", label: "Drop out before completion" },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`rounded-lg bg-secondary p-6 text-center transition-all duration-700 ${
                      statsVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <p className="font-serif text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Initiatives - Added staggered zoom animations */}
        <section className="bg-secondary py-16 lg:py-24 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Animated animation="fade-up" className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Our Approach</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                How We're Creating Change
              </h2>
            </Animated>
            <StaggeredContainer animation="zoom-in" staggerDelay={150} className="mt-12 grid gap-8 md:grid-cols-2">
              {initiatives.map((initiative) => (
                <div
                  key={initiative.title}
                  className="flex gap-4 rounded-lg bg-card p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <initiative.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{initiative.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{initiative.description}</p>
                  </div>
                </div>
              ))}
            </StaggeredContainer>
          </div>
        </section>

        {/* Impact Map - Added staggered fade-left animations */}
        <section className="py-16 lg:py-24 overflow-hidden" id="impact">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Animated animation="fade-up" className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Our Reach</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Where We're Making Impact
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Our education programs currently operate across six states in Nigeria, with plans to expand to
                additional regions.
              </p>
            </Animated>
            <StaggeredContainer
              animation="fade-left"
              staggerDelay={100}
              className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {impactAreas.map((area) => (
                <div
                  key={area.region}
                  className="rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">{area.region}</h3>
                  </div>
                  <div className="mt-4 flex justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Schools</p>
                      <p className="font-semibold text-foreground">{area.schools}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Students</p>
                      <p className="font-semibold text-foreground">{area.students.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </StaggeredContainer>
          </div>
        </section>

        {/* Success Stories - Added staggered zoom animations */}
        <section className="bg-accent py-16 lg:py-24 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Animated animation="fade-down" className="text-center text-accent-foreground">
              <p className="text-sm font-medium uppercase tracking-wider opacity-80">Success Stories</p>
              <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">Transforming Lives Through Education</h2>
            </Animated>
            <StaggeredContainer animation="zoom-in" staggerDelay={150} className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Chidinma Obi",
                  story:
                    "A scholarship recipient who is now studying medicine. She dreams of returning to her community as a doctor.",
                  image: "/young-african-girl-student-portrait.jpg",
                },
                {
                  name: "Yusuf Ibrahim",
                  story:
                    "Once an out-of-school child, Yusuf is now top of his class and aspires to become an engineer.",
                  image: "/young-african-boy-student-portrait.jpg",
                },
                {
                  name: "Grace Adebayo",
                  story:
                    "Our teacher training program helped Grace transform her classroom, improving student outcomes by 40%.",
                  image: "/african-teacher-woman-portrait.jpg",
                },
              ].map((story) => (
                <div
                  key={story.name}
                  className="rounded-lg bg-background p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.name}
                    className="h-48 w-full rounded-lg object-cover"
                  />
                  <h3 className="mt-4 font-semibold text-foreground">{story.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{story.story}</p>
                </div>
              ))}
            </StaggeredContainer>
          </div>
        </section>

        {/* Impact Numbers - Added animated stats */}
        <section ref={impactRef} className="bg-foreground py-16 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 text-center md:grid-cols-4">
              {[
                { value: "30,000+", label: "Students Supported" },
                { value: "120+", label: "Partner Schools" },
                { value: "5,000+", label: "Scholarships Awarded" },
                { value: "500+", label: "Teachers Trained" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-background transition-all duration-700 ${
                    impactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <p className="font-serif text-4xl font-bold">{stat.value}</p>
                  <p className="mt-2 text-sm text-background/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Added zoom-in animation */}
        <section className="py-16 lg:py-24 overflow-hidden">
          <Animated animation="zoom-in" className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Help a Child Get an Education</h2>
            <p className="mt-4 text-muted-foreground">
              Your support can change a child's life. Whether through donations, volunteering, or advocacy, you can make
              education accessible for more children.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent">
                <Link href="/get-involved">Get Involved</Link>
              </Button>
            </div>
          </Animated>
        </section>
      </main>
      <Footer />
    </div>
  )
}
