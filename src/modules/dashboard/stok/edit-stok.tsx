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
import { DataStokById, GetStokByIdResponse } from "@/lib/interface/stok/get-stok-byId"

interface EditStokDialogProps {
  isOpen: boolean
  id: number
}

const EditStokDialog: React.FC<EditStokDialogProps> = ({ isOpen, id }) => {
  const cdnImage = process.env.NEXT_PUBLIC_CDN_URL + "/assets/";
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [stok, setStok] = useState<string>('');

  const [response, setResponse] = useState<GetStokByIdResponse>();
  const [dataStokById, setDataStokById] = useState<DataStokById | null>(null);
  const [loadingStokById, setLoadingStokById] = useState<boolean>(true);
  const [emptyDataStokById, setEmptyDataStokById] = useState<boolean>(false);
  const [errorStokById, setErrorStokById] = useState<string | null>(null);

  const fetchDataStokById = async () => {
    setLoadingStokById(true);
    try {
      const response = await api.get<GetStokByIdResponse>(`/stok/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }); // ganti '/endpoint' dengan endpoint yang sesuai
      setDataStokById(response.data.data);
      setName(response.data.data.name);
      setPrice(response.data.data.price.toString());
      setStok(response.data.data.stok.toString());
    } catch (error) {
      setErrorStokById('Failed to fetch data');
    } finally {
      setLoadingStokById(false);
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateDataStokById();

  }

  const updateDataStokById = async () => {
    setLoadingStokById(true);
    try {
      const response = await api.put(`/stok/${id}`,
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
      setDataStokById(response.data.data);
    } catch (error) {
      setErrorStokById('Failed to fetch data');
    } finally {
      setLoadingStokById(false);
      // close dialog
      window.location.reload();

    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDataStokById();
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
        <DialogTitle>Edit Stok</DialogTitle>
        <DialogDescription>Make changes to your Stok here. Click save when you&apos;re done.</DialogDescription>
      </DialogHeader>
      {
        loadingStokById ?
          <div>Loading...</div> :
          emptyDataStokById ?
            <div>No data</div> :
            errorStokById ?
              <div>{errorStokById}</div> :
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
      }

      <DialogFooter>
        <Button
          onClick={submitHandler}
        >Save changes</Button>
      </DialogFooter>
    </DialogContent>
  )
}


export default EditStokDialog