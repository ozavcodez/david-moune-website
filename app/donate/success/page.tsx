import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle, Heart, Share2 } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Donation Successful | David Mone Foundation",
  description: "Thank you for your generous donation to David Mone Foundation.",
}

export default function DonationSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="text-center">
            {/* Success Icon */}
            <div className="relative mx-auto mb-8 h-24 w-24">
              <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-20" />
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-green-500">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Thank You for Your Donation!
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Your generous contribution will make a real difference in our fight against Sickle Cell Disease
              and our efforts to provide quality education for children in Africa.
            </p>

            {/* Impact Summary */}
            <div className="mt-12 rounded-lg bg-secondary p-8">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Heart className="h-5 w-5" />
                <span className="font-semibold">Your Impact</span>
              </div>
              <p className="mt-4 text-muted-foreground">
                A receipt has been sent to your email. Your donation supports our programs and helps us
                continue our mission to end Sickle Cell Disease and ensure every child has access to education.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="btn-shine">
                <Link href="/donate">
                  Make Another Donation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">
                  Learn More About Our Work
                </Link>
              </Button>
            </div>

            {/* Social Share */}
            <div className="mt-12">
              <p className="text-sm text-muted-foreground mb-4">Share your support</p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on Facebook
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on Twitter
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-12 rounded-lg border border-border p-6 text-left">
              <h3 className="font-semibold text-foreground mb-2">Questions about your donation?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you have any questions about your donation or need a tax receipt, please contact us.
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <p><strong>Email:</strong> donate@davidmonefoundation.org</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}