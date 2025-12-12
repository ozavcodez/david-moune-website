"use client"

import { Linkedin, Twitter } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const team = [
  {
    name: "David Mone",
    role: "Founder & Executive Director",
    bio: "A passionate advocate for healthcare equity and education access with over 15 years of experience in nonprofit leadership.",
    image: "/professional-african-man-executive-portrait.jpg",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Dr. Chioma Nwosu",
    role: "Medical Director",
    bio: "Hematologist specializing in Sickle Cell Disease with extensive research experience across West Africa.",
    image: "/professional-african-woman-doctor-portrait.jpg",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Oluwaseun Adebayo",
    role: "Director of Education Programs",
    bio: "Former educator with a passion for creating equitable learning opportunities for underserved communities.",
    image: "/professional-african-man-educator-portrait.jpg",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Amina Hassan",
    role: "Director of Operations",
    bio: "Operations expert with experience managing large-scale humanitarian programs across multiple countries.",
    image: "/professional-african-woman-executive-portrait.jpg",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Dr. Emeka Okafor",
    role: "Research Lead",
    bio: "Leading our research initiatives and partnerships with academic institutions globally.",
    image: "/professional-african-man-researcher-scientist-port.jpg",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Fatima Bello",
    role: "Communications Director",
    bio: "Storyteller and communications strategist dedicated to amplifying the voices of those we serve.",
    image: "/professional-african-woman-communications-portrait.jpg",
    linkedin: "#",
    twitter: "#",
  },
]

export function TeamSection() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1 })

  return (
    <section ref={ref} className="bg-secondary py-16 lg:py-24 overflow-hidden" id="team">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div
          className={`text-center opacity-0 ${isVisible ? "animate-blur-in" : ""}`}
          style={{ animationFillMode: "forwards" }}
        >
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Our Team</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Meet the People Behind Our Mission
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Our dedicated team brings together expertise in healthcare, education, research, and nonprofit management.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`group rounded-2xl bg-card p-6 text-center shadow-sm border border-border hover:shadow-xl transition-all duration-500 hover:-translate-y-2 opacity-0 ${
                isVisible ? "animate-elastic" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
            >
              {/* Image with spiral animation on hover */}
              <div className="mx-auto h-32 w-32 overflow-hidden rounded-full ring-4 ring-primary/10 group-hover:ring-accent/30 transition-all duration-500">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                />
              </div>

              <h3 className="mt-4 font-semibold text-foreground group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <p className="text-sm text-accent">{member.role}</p>
              <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>

              {/* Social links with swing animation */}
              <div className="mt-4 flex justify-center gap-3">
                <a
                  href={member.linkedin}
                  className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10 animate-wobble"
                  aria-label={`${member.name}'s LinkedIn`}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={member.twitter}
                  className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10 animate-wobble"
                  aria-label={`${member.name}'s Twitter`}
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>

              {/* Animated border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent/20 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
