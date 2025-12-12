"use client"

import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "The David Mone Foundation changed my daughter's life. With their support, she now receives proper treatment for her Sickle Cell Disease and can attend school regularly.",
    author: "Amara Okonkwo",
    role: "Parent, Lagos",
    image: "/african-woman-portrait-professional.jpg",
  },
  {
    quote:
      "Thanks to the education program, I was able to complete my secondary education and am now pursuing a degree in nursing. I want to give back to my community.",
    author: "Emmanuel Adeyemi",
    role: "Scholarship Recipient",
    image: "/young-african-man-student-portrait.jpg",
  },
  {
    quote:
      "As a healthcare partner, we've seen firsthand how the Foundation's advocacy work has improved SCD awareness and patient outcomes in our region.",
    author: "Dr. Ngozi Eze",
    role: "Partner Hospital Director",
    image: "/african-female-doctor-portrait-professional.jpg",
  },
  {
    quote:
      "The Foundation's commitment to ending Sickle Cell Disease has brought hope to thousands of families. Their research initiatives are truly groundbreaking.",
    author: "Prof. Adaeze Nwosu",
    role: "Medical Researcher",
    image: "/african-professor-woman-portrait.jpg",
  },
  {
    quote:
      "Education transforms lives. Through this program, I've watched children who had no hope discover their potential and dream of brighter futures.",
    author: "Chukwudi Obi",
    role: "School Principal",
    image: "/african-man-educator-portrait.jpg",
  },
  {
    quote:
      "My son was diagnosed with SCD at birth. The Foundation's support network connected us with resources we didn't know existed. We're forever grateful.",
    author: "Blessing Adekunle",
    role: "Parent, Abuja",
    image: "/african-mother-portrait-smiling.jpg",
  },
]

const duplicatedTestimonials = [...testimonials, ...testimonials]

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="flex-shrink-0 w-[400px] mx-4">
      <div className="relative h-full p-8 rounded-3xl bg-background border border-border/50 hover:border-accent/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
        {/* Decorative quote */}
        <Quote className="absolute top-6 right-6 h-12 w-12 text-accent/20 group-hover:text-accent/40 transition-colors duration-300" />

        {/* Gradient accent line */}
        <div className="absolute top-0 left-8 right-8 h-1 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <p className="text-foreground leading-relaxed text-lg relative z-10 mb-8">"{testimonial.quote}"</p>

        <div className="flex items-center gap-4 mt-auto">
          <div className="relative">
            <img
              src={testimonial.image || "/placeholder.svg"}
              alt={testimonial.author}
              className="h-14 w-14 rounded-full object-cover ring-2 ring-background shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div>
            <p className="font-semibold text-foreground">{testimonial.author}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-primary relative overflow-hidden">
      {/* Decorative background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, oklch(0.78 0.12 85 / 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, oklch(0.78 0.12 85 / 0.2) 0%, transparent 40%)`,
          }}
        />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-16 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6">
            <span className="text-sm font-medium text-primary-foreground">Stories of Impact</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground tracking-tight">
            Voices From Our Community
          </h2>
        </div>

        <div className="relative mb-8">
          <div className="flex animate-marquee">
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="flex animate-marquee-reverse">
            {duplicatedTestimonials.reverse().map((testimonial, index) => (
              <TestimonialCard key={`row2-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  )
}
