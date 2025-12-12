"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, CreditCard, Heart, GraduationCap, Microscope, Shield } from "lucide-react"

interface Program {
  id: string
  iconId: "heart" | "graduation-cap" | "microscope" | "shield"
  title: string
  description: string
}

const programs: Program[] = [
  {
    id: "sickle-cell-disease",
    iconId: "heart",
    title: "Sickle Cell Disease",
    description: "Patient support, awareness, and treatment access",
  },
  {
    id: "education-access",
    iconId: "graduation-cap",
    title: "Education Access",
    description: "Scholarships, schools, and learning resources",
  },
  {
    id: "research",
    iconId: "microscope",
    title: "Research",
    description: "Funding groundbreaking SCD research",
  },
  {
    id: "where-needed-most",
    iconId: "shield",
    title: "Where Needed Most",
    description: "Support our highest priority needs",
  },
]

function ProgramIcon({ iconId, className }: { iconId: Program["iconId"]; className?: string }) {
  switch (iconId) {
    case "heart":
      return <Heart className={className} />
    case "graduation-cap":
      return <GraduationCap className={className} />
    case "microscope":
      return <Microscope className={className} />
    case "shield":
      return <Shield className={className} />
  }
}

const amounts = ["25", "50", "100", "250", "500", "1000"]

export function DonationForm() {
  const [amount, setAmount] = useState("100")
  const [customAmount, setCustomAmount] = useState("")
  const [frequency, setFrequency] = useState("one-time")
  const [program, setProgram] = useState("where-needed-most")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const effectiveAmount = customAmount || amount

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-accent/30 bg-accent/5 p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="relative">
          <CheckCircle className="h-16 w-16 text-accent animate-in zoom-in duration-700" />
          <div className="absolute inset-0 h-16 w-16 text-accent animate-ping opacity-20" />
        </div>
        <h3 className="mt-6 font-serif text-2xl font-bold text-foreground">Thank You!</h3>
        <p className="mt-3 text-muted-foreground">
          Your donation of ${effectiveAmount} will make a real difference. You'll receive a confirmation email shortly.
        </p>
        <Button onClick={() => setSubmitted(false)} className="mt-6 btn-shine" variant="outline">
          Make Another Donation
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border-2 border-border p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <h2 className="font-serif text-2xl font-bold text-foreground">Make a Donation</h2>

      {/* Frequency */}
      <div className="mt-6">
        <Label className="text-sm font-semibold">Donation Frequency</Label>
        <div className="mt-3 flex gap-2">
          {["one-time", "monthly"].map((freq) => (
            <button
              key={freq}
              type="button"
              onClick={() => setFrequency(freq)}
              className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                frequency === freq
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "bg-secondary text-secondary-foreground hover:bg-muted hover:scale-102"
              }`}
            >
              {freq === "one-time" ? "One-Time" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      {/* Amount */}
      <div className="mt-6">
        <Label className="text-sm font-semibold">Select Amount</Label>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {amounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => {
                setAmount(amt)
                setCustomAmount("")
              }}
              className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                amount === amt && !customAmount
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "bg-secondary text-secondary-foreground hover:bg-muted hover:scale-102 hover:shadow-sm"
              }`}
            >
              ${amt}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <Label htmlFor="custom" className="text-xs font-medium text-muted-foreground">
            Or enter custom amount
          </Label>
          <div className="relative mt-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
            <Input
              id="custom"
              type="number"
              min="1"
              placeholder="Enter amount"
              className="pl-8 input-focus transition-all"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value)
                setAmount("")
              }}
            />
          </div>
        </div>
      </div>

      {/* Program */}
      <div className="mt-6">
        <Label className="text-sm font-semibold">Direct Your Gift</Label>
        <RadioGroup value={program} onValueChange={setProgram} className="mt-3 space-y-2">
          {programs.map((prog) => (
            <label
              key={prog.id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                program === prog.id
                  ? "border-primary bg-primary/10 shadow-md scale-[1.02]"
                  : "border-border hover:bg-secondary hover:border-primary/30 hover:shadow-sm"
              }`}
            >
              <RadioGroupItem value={prog.id} />
              <ProgramIcon iconId={prog.iconId} className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{prog.title}</p>
                <p className="text-xs text-muted-foreground">{prog.description}</p>
              </div>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Personal Info */}
      <div className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="donorFirstName" className="text-sm font-medium">
              First Name
            </Label>
            <Input id="donorFirstName" required className="input-focus transition-shadow" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="donorLastName" className="text-sm font-medium">
              Last Name
            </Label>
            <Input id="donorLastName" required className="input-focus transition-shadow" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="donorEmail" className="text-sm font-medium">
            Email
          </Label>
          <Input id="donorEmail" type="email" required className="input-focus transition-shadow" />
        </div>
      </div>

      {/* Payment (simulated) */}
      <div className="mt-6 rounded-lg bg-secondary/50 border border-border p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CreditCard className="h-4 w-4" />
          <span className="font-medium">Secure payment processing</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Payment will be securely processed. You'll be redirected to complete your donation.
        </p>
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full btn-shine hover-lift shadow-lg hover:shadow-xl">
        Donate ${effectiveAmount || "0"} {frequency === "monthly" && "Monthly"}
      </Button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Your donation is tax-deductible. You will receive a receipt via email.
      </p>
    </form>
  )
}
