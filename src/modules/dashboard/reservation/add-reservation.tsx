import { Button } from "@/components/atoms/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/atoms/dialog"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select"
import { api } from "@/lib"
import { Eye, EyeOff } from "lucide-react"


const AddReservationDialog: React.FC = () => {
  const cdnImage = process.env.NEXT_PUBLIC_CDN_URL + "/assets/";
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [phone, setPhone] = useState<number>(0);
  const [manyPeople, setManyPeople] = useState<string>('');
  const [room, setRoom] = useState<string>('');


  const [loadingReservation, setLoadingReservation] = useState<boolean>(true);
  const [emptyReservation, setEmptyReservation] = useState<boolean>(false);
  const [errorReservation, setErrorReservation] = useState<string | null>(null);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDataReservation();

  }

  const addDataReservation = async () => {
    setLoadingReservation(true);
    try {
      const response = await api.post(`/reservation/`,
        JSON.stringify({
          name: name,
          date: date,
          time: time,
          phone: phone,
          manyPeople: manyPeople,
          room: room,

        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }); // ganti '/endpoint' dengan endpoint yang sesuai
    } catch (error) {
      setErrorReservation('Failed to fetch data');
    } finally {
      setLoadingReservation(false);
      // close dialog
      window.location.reload();

    }
  };

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Add Reservation</DialogTitle>
        <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
      </DialogHeader>
      <form

      >
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              defaultValue={date}
              onChange={(e) => setDate(e.target.value)}
              className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <Input
              id="time"
              type="time"
              defaultValue={time}
              onChange={(e) => setTime(e.target.value)}
              className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              defaultValue={phone}
              onChange={(e) => setPhone(parseInt(e.target.value))}
              className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="manyPeople" className="text-right">
              Many People
            </Label>
            <Input
              id="manyPeople"
              type="number"
              defaultValue={manyPeople}
              onChange={(e) => setManyPeople(e.target.value)}
              className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="manyPeople" className="text-right">
              Choose your Room
            </Label>
            <select
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="col-span-3 bg-white p-2 border rounded"
            >
              <option value="">Select a room</option>
              <option value="VIP Rooms">VIP Rooms</option>
              <option value="Glass House Indoor">Glass House Indoor</option>
              <option value="Semi Outdoor">Semi Outdoor</option>
              <option value="Indoor Bar">Indoor Bar</option>
            </select>
          </div>
        </div>
      </form>

      <DialogFooter>
        <Button
          onClick={submitHandler}
        >Save changes</Button>
      </DialogFooter>
    </DialogContent>
  )
}


export default AddReservationDialog