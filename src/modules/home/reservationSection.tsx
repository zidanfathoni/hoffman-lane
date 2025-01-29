"use client"

import { Calendar } from "lucide-react"
import { Button } from "@/components/atoms/button"
import { Card, CardContent } from "@/components/atoms/card"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import Image from "next/image"
import { useState } from "react"
import { api } from "@/lib"
import { toast } from "@/components/atoms/use-toast"

export default function ReservationSection() {
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [people, setPeople] = useState<string>('');

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    //check if all field is filled
    if (name === '' || date === '' || time === '' || phone === '' || people === '') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please fill all fields',
      });
      return;
    }
    console.log(name, date, time, phone, people);
    // await bookTable();
  }

  const bookTable = async () => {
    try {
      const response = await api.post(`/reservation/`,
        JSON.stringify({
          name: name,
          date: date,
          time: time,
          phone: phone,
          people: people,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }); // ganti '/endpoint' dengan endpoint yang sesuai
      toast({
        title: 'Success',
        description: `Reservation Success`,
      });
    } catch (error) {
      console.log('Failed to fetch data');
    } finally {
      // close dialog
      window.location.reload();
    }
  };

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
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  className="pr-10"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="people">Many People ?</Label>
              <Input
                id="people"
                type="number"
                min="1"
                placeholder="Number of guests"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
              />
            </div>
            <Button
              className="w-full bg-[#C2C1B4] hover:bg-[#B1B0A4] text-black"
              onClick={submitHandler}>
              Book Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

