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


const AddQrCodeDialog: React.FC = () => {
  const cdnImage = process.env.NEXT_PUBLIC_CDN_URL + "/assets/";
  const [table, setTable] = useState<string>('');
  const [imageQr, setImageQr] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [loadingQrCode, setLoadingQrCode] = useState<boolean>(true);
  const [emptyQrCode, setEmptyQrCode] = useState<boolean>(false);
  const [errorQrCode, setErrorQrCode] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImageQr(URL.createObjectURL(file));
      console.log("Selected file:", file);
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDataQrCode();

  }

  const addDataQrCode = async () => {
    setLoadingQrCode(true);
    try {
      const response = await api.post(`/qrcode/`,
        JSON.stringify({
          table: table,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }); // ganti '/endpoint' dengan endpoint yang sesuai
    } catch (error) {
      setErrorQrCode('Failed to fetch data');
    } finally {
      setLoadingQrCode(false);
      // close dialog
      window.location.reload();

    }
  };

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Add QrCode</DialogTitle>
        <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
      </DialogHeader>
      <form

      >
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="table" className="text-right">
              Table
            </Label>
            <Input
              id="name"
              defaultValue={table}
              onChange={(e) => setTable(e.target.value)}
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


export default AddQrCodeDialog