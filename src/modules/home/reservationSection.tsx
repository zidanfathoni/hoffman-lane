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
<<<<<<< HEAD
  const [people, setPeople] = useState<string>('');
=======
  const [manyPeople, setManyPeople] = useState<string>('');
  const [room, setRoom] = useState<string>('');
>>>>>>> 83461a0 (update fix)

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    //check if all field is filled
<<<<<<< HEAD
    if (name === '' || date === '' || time === '' || phone === '' || people === '') {
=======
    if (name === '' || date === '' || time === '' || phone === '' || manyPeople === '' || room === '') {
>>>>>>> 83461a0 (update fix)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please fill all fields',
      });
      return;
    }
<<<<<<< HEAD
    console.log(name, date, time, phone, people);
=======
>>>>>>> 83461a0 (update fix)
    await bookTable();
  }

  const bookTable = async () => {
    try {
      const response = await api.post(`/reservation/`,
        JSON.stringify({
          name: name,
          date: date,
          time: time,
          phone: phone,
<<<<<<< HEAD
          people: people,
=======
          manyPeople: manyPeople,
          room: room,
>>>>>>> 83461a0 (update fix)
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
      // window.location.reload();
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
<<<<<<< HEAD
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
=======
              <Label htmlFor="manyPeople">Many People ?</Label>
              <Input
                id="manyPeople"
                type="number"
                min="1"
                placeholder="Number of guests"
                value={manyPeople}
                onChange={(e) => setManyPeople(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="room">Choose your Room</Label>
              <select
                id="room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full bg-white p-2 border rounded"
              >
                <option value="">Select a room</option>
                <option value="VIP Rooms">VIP Rooms</option>
                <option value="Glass House Indoor">Glass House Indoor</option>
                <option value="Semi Outdoor">Semi Outdoor</option>
                <option value="Indoor Bar">Indoor Bar</option>
              </select>
            </div>
>>>>>>> 83461a0 (update fix)
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

