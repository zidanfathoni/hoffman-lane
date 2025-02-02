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


const AddStokDialog: React.FC = () => {
  const cdnImage = process.env.NEXT_PUBLIC_CDN_URL + "/assets/";
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [stok, setStok] = useState<string>('');

  const [loadingStok, setLoadingStok] = useState<boolean>(true);
  const [emptyStok, setEmptyStok] = useState<boolean>(false);
  const [errorStok, setErrorStok] = useState<string | null>(null);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDataStok();

  }

  const addDataStok = async () => {
    setLoadingStok(true);
    try {
      const response = await api.post(`/stok/`,
        JSON.stringify({
          name: name,
          price: price,
          stok: stok,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }); // ganti '/endpoint' dengan endpoint yang sesuai
    } catch (error) {
      setErrorStok('Failed to fetch data');
    } finally {
      setLoadingStok(false);
      // close dialog
      window.location.reload();

    }
  };

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Add Stok</DialogTitle>
        <DialogDescription>Make changes to your stok here. Click save when you&apos;re done.</DialogDescription>
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
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              defaultValue={price}
              onChange={(e) => setPrice(e.target.value)}
              className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stok" className="text-right">
              Stok
            </Label>
            <Input
              id="stok"
              defaultValue={stok}
              onChange={(e) => setStok(e.target.value)}
              className="col-span-3" />
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


export default AddStokDialog