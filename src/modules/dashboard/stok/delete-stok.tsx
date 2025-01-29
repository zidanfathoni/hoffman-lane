import { Button } from "@/components/atoms/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/atoms/dialog"
import { useEffect, useState } from "react"
import { api } from "@/lib"
import { toast } from "@/components/atoms/use-toast"

interface EditStokDialogProps {
  isOpen: boolean
  id: number
}

const DeleteStokDialog: React.FC<EditStokDialogProps> = ({ isOpen, id }) => {
  const [loadingStokById, setLoadingStokById] = useState<boolean>(true);
  const [errorStokById, setErrorStokById] = useState<string | null>(null);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteDataStokById();

  }

  const deleteDataStokById = async () => {
    setLoadingStokById(true);
    try {
      const response = await api.delete(`/stok/${id}`,
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
      setErrorStokById('Failed to fetch data');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete Data',
      });
    } finally {
      setLoadingStokById(false);
      // close dialog
      window.location.reload();

    }
  };


  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Delete Stok</DialogTitle>
        <DialogDescription>Really want to delete this Stok? Click delete when you're done.</DialogDescription>
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


export default DeleteStokDialog