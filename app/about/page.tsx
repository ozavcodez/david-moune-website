import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { OurStory } from "@/components/about/our-story"
import { MissionVision } from "@/components/about/mission-vision"
import { TeamSection } from "@/components/about/team-section"
import { Partners } from "@/components/about/partners"
import { Timeline } from "@/components/about/timeline"

export const metadata: Metadata = {
  title: "About Us | David Mone Foundation",
  description:
    "Learn about David Mone Foundation's mission to end Sickle Cell Disease and provide quality education access. Meet our team and discover our story.",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AboutHero />
        <OurStory />
        <MissionVision />
        {/* <Timeline /> */}
        {/* <TeamSection /> */}
        <Partners />
      </main>
      <Footer />
    </div>
  )
}
