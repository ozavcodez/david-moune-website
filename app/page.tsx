import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/home/hero"
import { ImpactStats } from "@/components/home/impact-stats"
import { MissionOverview } from "@/components/home/mission-overview"
import { Testimonials } from "@/components/home/testimonials"
import { CTASection } from "@/components/home/cta-section"
import { Newsletter } from "@/components/home/newsletter"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ImpactStats />
        <MissionOverview />
        <Testimonials />
        <CTASection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
