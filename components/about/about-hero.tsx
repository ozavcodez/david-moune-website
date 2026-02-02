"use client"

import { useEffect, useState } from "react"
import { Heart, Users, TrendingUp, Sparkles } from "lucide-react"
import Image from "next/image"

export function AboutHero() {
  const [activeCard, setActiveCard] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Split background - Image right, color left */}
      <div className="absolute inset-0">
        {/* Left - Gradient using site colors */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-br from-[#0a2f35] via-primary to-[#134752]" />
        
        {/* Right - Image */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=1200&fit=crop"
            alt="Foundation impact"
            width={1200}
            height={1200}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0a2f35]/40 to-[#0a2f35]" />
        </div>
      </div>

      {/* Animated particles using accent gold */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-accent/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 50}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-8 text-white">
            {/* Animated badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 backdrop-blur-md border border-accent/20">
              <Sparkles className="h-4 w-4 text-accent animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-widest text-accent">Our Story</span>
            </div>

            {/* Main heading */}
            <h1 className="font-serif text-5xl lg:text-7xl font-black leading-tight">
              <span className="block text-white">Empowering</span>
              <span className="block mt-2 bg-gradient-to-r from-accent via-primary-foreground to-accent bg-clip-text text-transparent">
                Africa's Future
              </span>
              <span className="block mt-2 text-accent/90">Together</span>
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
              Since 2010, we've been transforming lives through innovative healthcare solutions and quality education programs across the continent.
            </p>

            {/* Animated value cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Heart, label: "Healthcare", desc: "50,000+ lives", color: "from-rose-400 to-pink-400" },
                { icon: Users, label: "Education", desc: "120+ schools", color: "from-accent to-primary-foreground" },
                { icon: TrendingUp, label: "Impact", desc: "15+ years", color: "from-blue-400 to-indigo-400" },
                { icon: Sparkles, label: "Innovation", desc: "45 centers", color: "from-accent to-primary-foreground" },
              ].map((item, index) => {
                const Icon = item.icon
                const isActive = index === activeCard
                return (
                  <div
                    key={item.label}
                    className={`relative p-6 rounded-2xl backdrop-blur-md border transition-all duration-500 ${
                      isActive
                        ? "bg-white/20 border-white/40 scale-105 shadow-2xl"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {/* Gradient glow */}
                    {isActive && (
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-20 blur-xl`} />
                    )}
                    
                    <div className="relative">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} mb-3 ${
                        isActive ? "animate-bounce" : ""
                      }`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">{item.label}</h3>
                      {/* <p className="text-sm text-slate-300">{item.desc}</p> */}
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute top-3 right-3">
                        <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${item.color} animate-ping`} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Mission statement */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-accent/20 via-primary/20 to-accent/10 backdrop-blur-lg border border-white/20">
              <div className="absolute -top-4 left-8">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-primary-foreground flex items-center justify-center shadow-lg">
                  <Heart className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-lg font-medium text-white/90 italic leading-relaxed">
                "Every life we touch, every student we educate, every community we serve brings us closer to a healthier, brighter Africa."
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-accent to-primary-foreground" />
                <span className="text-sm font-bold text-accent uppercase tracking-wider">David Mone Foundation</span>
              </div>
            </div>
          </div>

          {/* Right - Empty space for image background */}
          <div className="hidden lg:block" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }
      `}</style>
    </section>
  )
}