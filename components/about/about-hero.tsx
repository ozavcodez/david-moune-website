"use client"

import { useEffect, useState } from "react"

export function AboutHero() {
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden bg-foreground py-24 lg:py-32">
      {/* Animated morphing background shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl animate-morph" />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-accent rounded-full blur-3xl animate-morph"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-3xl">
          <p
            className="text-sm font-medium uppercase tracking-wider text-primary opacity-0 animate-blur-in"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            About Us
          </p>

          <h1
            className="mt-4 font-serif text-4xl font-bold text-background sm:text-5xl lg:text-6xl text-balance opacity-0 animate-blur-in"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            A Foundation Built on{" "}
            <span className="relative inline-block">
              <span className="text-accent">Hope</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-accent/50 rounded-full" />
            </span>{" "}
            and Action
            <span className={`inline-block w-1 h-12 bg-accent ml-2 ${showCursor ? "opacity-100" : "opacity-0"}`} />
          </h1>

          <p
            className="mt-6 text-lg text-background/80 leading-relaxed opacity-0 animate-blur-in"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            The David Mone Foundation was established with a singular purpose: to create lasting change in the lives of
            those affected by Sickle Cell Disease and to ensure every child has access to quality education.
          </p>

          {/* Animated decorative elements */}
          <div
            className="mt-10 flex gap-6 opacity-0 animate-blur-in"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-bounce-scale"
                style={{ animationDuration: "3s", animationIterationCount: "infinite" }}
              >
                <span className="text-2xl">❤️</span>
              </div>
              <span className="text-background/70 text-sm">Compassion</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center animate-bounce-scale"
                style={{ animationDuration: "3s", animationDelay: "1s", animationIterationCount: "infinite" }}
              >
                <span className="text-2xl">📚</span>
              </div>
              <span className="text-background/70 text-sm">Education</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-bounce-scale"
                style={{ animationDuration: "3s", animationDelay: "2s", animationIterationCount: "infinite" }}
              >
                <span className="text-2xl">🌍</span>
              </div>
              <span className="text-background/70 text-sm">Impact</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
