import { Button } from "@/components/atoms/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/atoms/dialog"
import { useEffect, useState } from "react"
import { DataUsersById, GetUserByIdResponse } from "@/lib/interface/users/get-users-byId"
import { api } from "@/lib"
import { GetUserResponse } from "@/lib/interface/users/get-users"
import { toast } from "@/components/atoms/use-toast"

interface EditUsersDialogProps {
  isOpen: boolean
  id: number
}

const DeleteUsersDialog: React.FC<EditUsersDialogProps> = ({ isOpen, id }) => {
  const [loadingUsersById, setLoadingUsersById] = useState<boolean>(true);
  const [errorUsersById, setErrorUsersById] = useState<string | null>(null);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteDataUsersById();

  }

  const deleteDataUsersById = async () => {
    setLoadingUsersById(true);
    try {
      const response = await api.delete(`/users/${id}`,
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
      setErrorUsersById('Failed to fetch data');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete Data',
      });
    } finally {
      setLoadingUsersById(false);
      // close dialog
      window.location.reload();

    }
  };


  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Delete Users</DialogTitle>
        <DialogDescription>Really want to delete this user? Click delete when you&apos;re done.</DialogDescription>
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


export default DeleteUsersDialog