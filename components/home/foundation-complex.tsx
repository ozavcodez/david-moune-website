"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Heart, BookOpen, Users, Building2, GraduationCap, ArrowRight } from "lucide-react";

const complexComponents = [
  {
    icon: Building2,
    title: "Foundation Building",
    description: "Central hub for administration and coordination of all foundation activities.",
    image: "/ngo-1.jpg",
    color: "from-blue-500/20 to-primary/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    icon: Heart,
    title: "Hospital",
    description: "Specialized healthcare facility focusing on Sickle Cell Disease treatment and research.",
    image: "/african-female-doctor-portrait-professional.jpg",
    color: "from-rose-500/20 to-primary/20",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-600",
  },
  {
    icon: GraduationCap,
    title: "Sport-Integrated School",
    description: "Innovative educational approach combining academics with sports development for holistic growth.",
    image: "/african-children-in-classroom-learning-education-s.jpg",
    color: "from-amber-500/20 to-primary/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
  {
    icon: Users,
    title: "Orphanage",
    description: "Safe haven for vulnerable children with specialized care and educational opportunities.",
    image: "/african-mother-portrait-smiling.jpg",
    color: "from-emerald-500/20 to-primary/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    icon: BookOpen,
    title: "Research Center",
    description: "Cutting-edge facility advancing knowledge in Sickle Cell Disease and educational methodologies.",
    image: "/professional-african-man-researcher-scientist-port.jpg",
    color: "from-purple-500/20 to-primary/20",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
  },
];

export function FoundationComplex() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % complexComponents.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + complexComponents.length) % complexComponents.length);
  };

  // Show 3 cards at a time
  const visibleCards = [
    complexComponents[currentIndex],
    complexComponents[(currentIndex + 1) % complexComponents.length],
    complexComponents[(currentIndex + 2) % complexComponents.length],
  ];

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-secondary relative overflow-hidden" id="complex">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-morph" />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-morph"
        style={{ animationDelay: "4s" }}
      />

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <span className="text-sm font-medium text-primary">Our Vision</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Building a <span className="text-accent">Transformative</span> Complex
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive ecosystem combining healthcare, education, research, and community support under one vision: 
            empowering every child to succeed regardless of their background or abilities.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-accent/50"
            aria-label="Previous slide"
          >
            <ArrowRight className="h-5 w-5 text-foreground rotate-180" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-accent/50"
            aria-label="Next slide"
          >
            <ArrowRight className="h-5 w-5 text-foreground" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12">
            {visibleCards.map((component, index) => (
              <div
                key={`${component.title}-${currentIndex}-${index}`}
                className={`group relative h-full rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${component.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Image section with parallax effect */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={component.image}
                    alt={component.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                </div>

                {/* Content section */}
                <div className="relative p-8">
                  {/* Icon with animated ring */}
                  <div className="relative inline-block mb-6">
                    <div
                      className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl ${component.iconBg} border border-current/10`}
                    >
                      <component.icon className={`h-8 w-8 ${component.iconColor}`} />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {component.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">{component.description}</p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {complexComponents.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-primary' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 bg-card rounded-3xl p-8 border border-border/50">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
              Our Revolutionary Sport-Integrated School Concept
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Traditional education systems often limit children based on academic performance alone. Our innovative school 
              recognizes that intellect comes in many forms. Whether a child excels in science, art, music, robotics, 
              technical skills, or sports, every talent deserves recognition and development. Through partnerships with 
              sports agencies, clubs, and organizations both internationally and locally, we create pathways for students 
              to pursue their passions and achieve success in their chosen fields.
            </p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Swimming Pool", icon: "🏊" },
                { label: "Basketball Court", icon: "🏀" },
                { label: "Football Pitch", icon: "⚽" },
                { label: "Gymnastics", icon: "🤸" },
              ].map((facility, idx) => (
                <div key={facility.label} className="flex flex-col items-center p-3 rounded-lg bg-secondary">
                  <span className="text-2xl">{facility.icon}</span>
                  <span className="text-xs mt-1 text-muted-foreground">{facility.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}