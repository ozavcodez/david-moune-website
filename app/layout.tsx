import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "David Mone Foundation | Ending Sickle Cell Disease & Empowering Education",
  description:
    "David Mone Foundation is dedicated to ending Sickle Cell Disease through research, advocacy, and improved care, while providing access to quality education for all children globally.",
  keywords: [
    "Sickle Cell Disease",
    "SCD",
    "Education",
    "NGO",
    "Foundation",
    "Africa",
    "Children",
    "Health",
    "Research",
  ],
  authors: [{ name: "David Mone Foundation" }],
  openGraph: {
    title: "David Mone Foundation",
    description: "Ending Sickle Cell Disease & Empowering Education Globally",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#8B4513",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
