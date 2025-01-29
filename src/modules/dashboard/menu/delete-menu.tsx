import { Button } from "@/components/atoms/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/atoms/dialog"
import { useEffect, useState } from "react"
import { api } from "@/lib"
import { toast } from "@/components/atoms/use-toast"

interface EditMenuDialogProps {
  isOpen: boolean
  id: number
}

const DeleteMenuDialog: React.FC<EditMenuDialogProps> = ({ isOpen, id }) => {
  const [loadingMenuById, setLoadingMenuById] = useState<boolean>(true);
  const [errorMenuById, setErrorMenuById] = useState<string | null>(null);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteDataMenuById();

  }

  const deleteDataMenuById = async () => {
    setLoadingMenuById(true);
    try {
      const response = await api.delete(`/menu/${id}`,
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
      setErrorMenuById('Failed to fetch data');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete Data',
      });
    } finally {
      setLoadingMenuById(false);
      // close dialog
      window.location.reload();

    }
  };


  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Delete Menu</DialogTitle>
        <DialogDescription>Really want to delete this menu? Click delete when you're done.</DialogDescription>
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


export default DeleteMenuDialog