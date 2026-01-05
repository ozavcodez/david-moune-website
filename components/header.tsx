"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "About", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Get Involved", href: "/get-involved" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a2f35] backdrop-blur-md shadow-sm border-b border-border"
          : "bg-[#0a2f35] backdrop-blur supports-backdrop-filter]:bg-background/60"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4  lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.jpg"
              alt="David Mone Foundation"
              width={80}
              height={80}
              className=" object-contain"
            />
          </div>
          
        </Link>

        {/* Desktop Navigation - Enhanced with animated underline */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-sm font-medium text-white/70 transition-colors hover:text-white group py-2 link-underline"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent transition-all hover:shadow-md"
          >
            <Link href="/get-involved">Volunteer</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90 btn-shine transition-all hover:shadow-lg"
          >
            <Link href="/donate">Donate Now</Link>
          </Button>
        </div>

        {/* Mobile menu button - Enhanced with rotation animation */}
        <button
          type="button"
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation - Enhanced with slide animation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 px-3 text-base font-medium text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4">
              <Button
                asChild
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <Link href="/get-involved">Volunteer</Link>
              </Button>
              <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90 btn-shine">
                <Link href="/donate">Donate</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
