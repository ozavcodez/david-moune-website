import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { XCircle, RefreshCw, MessageCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Donation Cancelled | David Mone Foundation",
  description: "Your donation was not completed. Please try again.",
}

export default function DonationCancelPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="text-center">
            {/* Cancel Icon */}
            <div className="relative mx-auto mb-8 h-24 w-24">
              <div className="absolute inset-0 rounded-full bg-red-100 animate-ping opacity-20" />
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-red-500">
                <XCircle className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Cancel Message */}
            <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Donation Not Completed
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Your donation was not processed. This could be due to payment cancellation,
              network issues, or other reasons. Don't worry - no charges were made to your account.
            </p>

            {/* What Happened */}
            <div className="mt-12 rounded-lg bg-secondary p-8">
              <h3 className="font-semibold text-foreground mb-4">What happened?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    You may have cancelled the payment process
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    There was a network connection issue
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Your payment method was declined
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="btn-shine">
                <Link href="/donate">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Support
                </Link>
              </Button>
            </div>

            {/* Help Info */}
            <div className="mt-12 rounded-lg border border-border p-6 text-left">
              <h3 className="font-semibold text-foreground mb-2">Need help with your donation?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you're having trouble completing your donation or have questions about payment methods,
                our team is here to help.
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <p><strong>Email:</strong> donate@davidmonefoundation.org</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Hours:</strong> Monday - Friday, 9 AM - 5 PM EST</p>
              </div>
            </div>

            {/* Alternative Ways */}
            <div className="mt-8">
              <h3 className="font-semibold text-foreground mb-4">Other Ways to Donate</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-medium text-foreground mb-2">Bank Transfer</h4>
                  <p className="text-xs text-muted-foreground">
                    Direct bank transfer to our account
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-medium text-foreground mb-2">Check by Mail</h4>
                  <p className="text-xs text-muted-foreground">
                    Send a check to our mailing address
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-medium text-foreground mb-2">Corporate Matching</h4>
                  <p className="text-xs text-muted-foreground">
                    Double your impact through employer matching
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}