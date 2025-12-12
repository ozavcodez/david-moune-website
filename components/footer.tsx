import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  about: [
    { name: "Our Story", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Partners", href: "/about#partners" },
    { name: "Annual Reports", href: "/about#reports" },
  ],
  programs: [
    { name: "Sickle Cell Disease", href: "/programs/sickle-cell" },
    { name: "Education Access", href: "/programs/education" },
    { name: "Research & Advocacy", href: "/programs/research" },
    { name: "Community Outreach", href: "/programs#outreach" },
  ],
  getInvolved: [
    { name: "Volunteer", href: "/get-involved#volunteer" },
    { name: "Donate", href: "/donate" },
    { name: "Partner With Us", href: "/get-involved#partner" },
    { name: "Events", href: "/news#events" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="David Mone Foundation"
                width={56}
                height={56}
                className="h-14 w-14 rounded object-cover"
              />
              <div>
                <p className="font-serif text-xl font-semibold text-primary-foreground">David Mone</p>
                <p className="text-xs text-accent tracking-widest uppercase font-medium">Foundation</p>
              </div>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/80">
              Dedicated to ending Sickle Cell Disease and providing quality education access for children across the
              globe, with a focus on Nigeria and Sub-Saharan Africa.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-semibold text-accent">About</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Links */}
          <div>
            <h3 className="font-semibold text-accent">Programs</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved Links */}
          <div>
            <h3 className="font-semibold text-accent">Get Involved</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-primary-foreground/20 pt-8 text-sm text-primary-foreground/70">
          <a
            href="mailto:info@davidmonefoundation.org"
            className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
          >
            <Mail className="h-4 w-4" />
            info@davidmonefoundation.org
          </a>
          <a
            href="tel:+2341234567890"
            className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
          >
            <Phone className="h-4 w-4" />
            +234 123 456 7890
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Lagos, Nigeria
          </span>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/20 pt-8 sm:flex-row">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} David Mone Foundation. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/60">
            <Link href="/privacy" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
