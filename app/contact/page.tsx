import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact/contact-form"
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | David Mone Foundation",
  description:
    "Get in touch with David Mone Foundation. We're here to answer your questions about our programs, partnerships, and ways to get involved.",
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: ["info@davidmonefoundation.org", "partnerships@davidmonefoundation.org"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+234 123 456 7890", "+234 098 765 4321"],
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["15 Foundation Way", "Victoria Island, Lagos", "Nigeria"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Monday - Friday: 9:00 AM - 5:00 PM", "Saturday: 10:00 AM - 2:00 PM"],
  },
]

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
]

const departments = [
  { name: "General Inquiries", email: "info@davidmonefoundation.org" },
  { name: "Donations & Giving", email: "donate@davidmonefoundation.org" },
  { name: "Volunteer Opportunities", email: "volunteer@davidmonefoundation.org" },
  { name: "Partnerships", email: "partnerships@davidmonefoundation.org" },
  { name: "Media & Press", email: "media@davidmonefoundation.org" },
  { name: "Research Inquiries", email: "research@davidmonefoundation.org" },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-foreground py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Contact Us</p>
              <h1 className="mt-4 font-serif text-4xl font-bold text-background sm:text-5xl text-balance">
                We'd Love to Hear From You
              </h1>
              <p className="mt-6 text-lg text-background/80 leading-relaxed">
                Have questions about our programs, want to partner with us, or interested in supporting our mission?
                Reach out and our team will get back to you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Form */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">Send Us a Message</h2>
                <p className="mt-2 text-muted-foreground">
                  Fill out the form below and we'll respond within 1-2 business days.
                </p>
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">Contact Information</h2>
                <div className="mt-6 space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        {item.details.map((detail, index) => (
                          <p key={index} className="text-sm text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-8">
                  <h3 className="font-semibold text-foreground">Follow Us</h3>
                  <div className="mt-3 flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        aria-label={social.name}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div className="mt-8">
                  <h3 className="font-semibold text-foreground">Our Location</h3>
                  <div className="mt-3 aspect-[4/3] overflow-hidden rounded-lg bg-secondary">
                    <img
                      src="/lagos-nigeria-map-location.jpg"
                      alt="Map showing Lagos, Nigeria location"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Department Contacts */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Department Contacts</h2>
              <p className="mt-4 text-muted-foreground">
                For specific inquiries, reach out directly to the relevant department.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {departments.map((dept) => (
                <div key={dept.name} className="rounded-lg bg-card p-4 border border-border">
                  <h3 className="font-semibold text-foreground">{dept.name}</h3>
                  <a href={`mailto:${dept.email}`} className="mt-1 text-sm text-primary hover:underline break-all">
                    {dept.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Frequently Asked Questions</h2>
            </div>
            <div className="mt-12 space-y-4">
              {[{
                  question: "How can I donate to the Foundation?",
                  answer:
                    "You can donate online through our secure donation page, via bank transfer, or by check. Visit our Donate page for all options.",
                  image: "/ngo-14.jpg",
                },
                {
                  question: "How do I volunteer with the Foundation?",
                  answer:
                    "Visit our Get Involved page to see current volunteer opportunities and submit an application. We'll match you with opportunities based on your skills and interests.",
                  image: "/african-man-educator-portrait.jpg",
                },
                {
                  question: "Can my organization partner with the Foundation?",
                  answer:
                    "Yes! We welcome partnerships with healthcare providers, educational institutions, corporations, and other NGOs. Contact our partnerships team to discuss opportunities.",
                  image: "/community-gathering-african-village-children-educa.jpg",
                },
                {
                  question: "How is my donation used?",
                  answer:
                    "90% of all donations go directly to our programs. You can view our annual reports for detailed financial breakdowns and impact metrics.",
                  image: "/ngo-18.jpg",
                },
              ].map((faq, index) => (
                <div key={faq.question} className="rounded-lg border border-border p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg">
                      <img
                        src={faq.image || "/placeholder.svg"}
                        alt="FAQ image"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{faq.question}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
