"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle } from "lucide-react"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-accent/30 bg-accent/5 p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="relative">
          <CheckCircle className="h-12 w-12 text-accent animate-in zoom-in duration-700" />
          <div className="absolute inset-0 h-12 w-12 text-accent animate-ping opacity-20" />
        </div>
        <h3 className="mt-4 font-semibold text-foreground">Message Sent!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you for reaching out. We'll get back to you within 1-2 business days.
        </p>
        <Button onClick={() => setSubmitted(false)} className="mt-6 btn-shine" variant="outline">
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contactFirstName" className="text-sm font-medium">
            First Name
          </Label>
          <Input id="contactFirstName" required className="input-focus transition-shadow" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactLastName" className="text-sm font-medium">
            Last Name
          </Label>
          <Input id="contactLastName" required className="input-focus transition-shadow" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactEmail" className="text-sm font-medium">
          Email
        </Label>
        <Input id="contactEmail" type="email" required className="input-focus transition-shadow" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactPhone" className="text-sm font-medium">
          Phone Number (Optional)
        </Label>
        <Input id="contactPhone" type="tel" className="input-focus transition-shadow" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject" className="text-sm font-medium">
          Subject
        </Label>
        <Select>
          <SelectTrigger className="input-focus transition-shadow">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Inquiry</SelectItem>
            <SelectItem value="donation">Donation Question</SelectItem>
            <SelectItem value="volunteer">Volunteer Opportunity</SelectItem>
            <SelectItem value="partnership">Partnership Interest</SelectItem>
            <SelectItem value="media">Media/Press Inquiry</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactMessage" className="text-sm font-medium">
          Message
        </Label>
        <Textarea
          id="contactMessage"
          rows={5}
          placeholder="How can we help you?"
          required
          className="input-focus transition-shadow resize-none"
        />
      </div>
      <Button type="submit" size="lg" className="w-full btn-shine hover-lift">
        Send Message
      </Button>
    </form>
  )
}
