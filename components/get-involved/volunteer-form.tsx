"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle } from "lucide-react"

export function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mt-6 flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="relative">
          <CheckCircle className="h-12 w-12 text-accent animate-in zoom-in duration-700" />
          <div className="absolute inset-0 h-12 w-12 text-accent animate-ping opacity-20" />
        </div>
        <h4 className="mt-4 font-semibold text-foreground">Thank You!</h4>
        <p className="mt-2 text-sm text-muted-foreground">We've received your application and will be in touch soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium">
            First Name
          </Label>
          <Input id="firstName" required className="input-focus transition-shadow" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium">
            Last Name
          </Label>
          <Input id="lastName" required className="input-focus transition-shadow" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
        <Input id="email" type="email" required className="input-focus transition-shadow" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium">
          Phone Number
        </Label>
        <Input id="phone" type="tel" className="input-focus transition-shadow" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="interest" className="text-sm font-medium">
          Area of Interest
        </Label>
        <Select>
          <SelectTrigger className="input-focus transition-shadow">
            <SelectValue placeholder="Select an area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="healthcare">Healthcare Volunteer</SelectItem>
            <SelectItem value="education">Education Mentor</SelectItem>
            <SelectItem value="outreach">Community Outreach</SelectItem>
            <SelectItem value="admin">Administrative Support</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium">
          Tell us about yourself
        </Label>
        <Textarea
          id="message"
          rows={4}
          placeholder="Share your background, skills, and why you want to volunteer..."
          className="input-focus transition-shadow resize-none"
        />
      </div>
      <Button type="submit" size="lg" className="w-full btn-shine hover-lift">
        Submit Application
      </Button>
    </form>
  )
}
