import { Button } from "@/components/atoms/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/atoms/dialog"
import { useEffect, useState } from "react"
import { api } from "@/lib"
import { toast } from "@/components/atoms/use-toast"

interface EditReservationDialogProps {
  isOpen: boolean
  id: number
}

const DeleteReservationDialog: React.FC<EditReservationDialogProps> = ({ isOpen, id }) => {
  const [loadingReservationById, setLoadingReservationById] = useState<boolean>(true);
  const [errorReservationById, setErrorReservationById] = useState<string | null>(null);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteDataReservationById();

  }

  const deleteDataReservationById = async () => {
    setLoadingReservationById(true);
    try {
      const response = await api.delete(`/reservation/${id}`,
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
      setErrorReservationById('Failed to fetch data');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete Data',
      });
    } finally {
      setLoadingReservationById(false);
      // close dialog
      window.location.reload();

    }
  };


  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Delete Reservation</DialogTitle>
        <DialogDescription>Really want to delete this Reservation? Click delete when you&apos;re done.</DialogDescription>
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


export default DeleteReservationDialog