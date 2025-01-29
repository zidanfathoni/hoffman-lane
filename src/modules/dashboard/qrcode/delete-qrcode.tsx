import { Button } from "@/components/atoms/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/atoms/dialog"
import { useEffect, useState } from "react"
import { api } from "@/lib"
import { toast } from "@/components/atoms/use-toast"

interface EditQrCodeDialogProps {
  isOpen: boolean
  id: number
}

const DeleteQrCodeDialog: React.FC<EditQrCodeDialogProps> = ({ isOpen, id }) => {
  const [loadingQrCodeById, setLoadingQrCodeById] = useState<boolean>(true);
  const [errorQrCodeById, setErrorQrCodeById] = useState<string | null>(null);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteDataQrCodeById();

  }

  const deleteDataQrCodeById = async () => {
    setLoadingQrCodeById(true);
    try {
      const response = await api.delete(`/qrcode/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }); // ganti '/endpoint' dengan endpoint yang sesuai
      toast({
        title: 'Success',
        description: `Delete Success`,
      });
    } catch (error) {
      setErrorQrCodeById('Failed to fetch data');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete Data',
      });
    } finally {
      setLoadingQrCodeById(false);
      // close dialog
      window.location.reload();

    }
  };


  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Delete QrCode</DialogTitle>
        <DialogDescription>Really want to delete this QrCode? Click delete when you're done.</DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button
          onClick={submitHandler}
          className="bg-red-500 hover:bg-primary"
        >Delete</Button>
      </DialogFooter>
    </DialogContent>
  )
}


export default DeleteQrCodeDialog