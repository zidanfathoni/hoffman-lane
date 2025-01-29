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
import { DataReservationById, GetReservationByIdResponse } from "@/lib/interface/reservation/get-reservation-byId"

interface EditReservationDialogProps {
  isOpen: boolean
  id: number
}

const EditReservationDialog: React.FC<EditReservationDialogProps> = ({ isOpen, id }) => {
  const cdnImage = process.env.NEXT_PUBLIC_CDN_URL + "/assets/";
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [phone, setPhone] = useState<number>(0);
  const [manyPeople, setManyPeople] = useState<string>('');

  const [response, setResponse] = useState<GetReservationByIdResponse>();
  const [dataReservationById, setDataReservationById] = useState<DataReservationById | null>(null);
  const [loadingReservationById, setLoadingReservationById] = useState<boolean>(true);
  const [emptyDataReservationById, setEmptyDataReservationById] = useState<boolean>(false);
  const [errorReservationById, setErrorReservationById] = useState<string | null>(null);

  const fetchDataReservationById = async () => {
    setLoadingReservationById(true);
    try {
      const response = await api.get<GetReservationByIdResponse>(`/reservation/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }); // ganti '/endpoint' dengan endpoint yang sesuai
      setDataReservationById(response.data.data);
      setName(response.data.data.name);
      setDate(response.data.data.date);
      setTime(response.data.data.time);
      setPhone(response.data.data.phone);
      setManyPeople(response.data.data.manyPeople);
    } catch (error) {
      setErrorReservationById('Failed to fetch data');
    } finally {
      setLoadingReservationById(false);
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateDataReservationById();

  }

  const updateDataReservationById = async () => {
    setLoadingReservationById(true);
    try {
      const response = await api.put(`/reservation/${id}`,
        JSON.stringify({
          name: name,
          date: date,
          time: time,
          phone: phone,
          manyPeople: manyPeople,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }); // ganti '/endpoint' dengan endpoint yang sesuai
      setDataReservationById(response.data.data);
    } catch (error) {
      setErrorReservationById('Failed to fetch data');
    } finally {
      setLoadingReservationById(false);
      // close dialog
      window.location.reload();

    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDataReservationById();
    }
  }, []);



  // const onSelect = (value: string) => {
  //   if (value === 'admin') {
  //     setRole(1)
  //   } else {
  //     setRole(2)
  //   }

  // }

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Edit Reservation</DialogTitle>
        <DialogDescription>Make changes to your Reservation here. Click save when you're done.</DialogDescription>
      </DialogHeader>
      {
        loadingReservationById ?
          <div>Loading...</div> :
          emptyDataReservationById ?
            <div>No data</div> :
            errorReservationById ?
              <div>{errorReservationById}</div> :
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
                </div>
              </form>
      }

      <DialogFooter>
        <Button
          onClick={submitHandler}
        >Save changes</Button>
      </DialogFooter>
    </DialogContent>
  )
}


export default EditReservationDialog