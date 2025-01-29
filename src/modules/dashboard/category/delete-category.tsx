import { Button } from "@/components/atoms/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/atoms/dialog"
import { useEffect, useState } from "react"
import { api } from "@/lib"
import { toast } from "@/components/atoms/use-toast"

interface EditCategoryDialogProps {
  isOpen: boolean
  id: number
}

const DeleteCategoryDialog: React.FC<EditCategoryDialogProps> = ({ isOpen, id }) => {
  const [loadingCategoryById, setLoadingCategoryById] = useState<boolean>(true);
  const [errorCategoryById, setErrorCategoryById] = useState<string | null>(null);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteDataCategoryById();

  }

  const deleteDataCategoryById = async () => {
    setLoadingCategoryById(true);
    try {
      const response = await api.delete(`/category/${id}`,
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
      setErrorCategoryById('Failed to fetch data');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete Data',
      });
    } finally {
      setLoadingCategoryById(false);
      // close dialog
      window.location.reload();

    }
  };


  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogDescription>Really want to delete this Category? Click delete when you're done.</DialogDescription>
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


export default DeleteCategoryDialog