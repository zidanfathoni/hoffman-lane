"use client"

import { Calendar } from "lucide-react"
import { Button } from "@/components/atoms/button"
import { Card, CardContent } from "@/components/atoms/card"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import Image from "next/image"

export default function ReservationSection() {
  return (
    <section
      id="reservation"
      key="reservation"
    >
      <div className="container mx-auto px-4 py-8 grid gap-8 lg:grid-cols-2 lg:gap-12 lg:py-12">
        <div className="relative aspect-square lg:aspect-auto">
          <Image
            src="/images/booking.svg"
            alt="Elegant dining table with white flowers and candles"
            fill
            className="rounded-lg object-cover"
            priority
          />
        </div>
        <Card className="border-none shadow-none">
          <CardContent className="space-y-4 p-0">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <Input id="date" type="date" className="pr-10" />
                <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="Enter your phone number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="people">Many People ?</Label>
              <Input id="people" type="number" min="1" placeholder="Number of guests" />
            </div>
            <Button className="w-full bg-[#C2C1B4] hover:bg-[#B1B0A4] text-black">Book Now</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

