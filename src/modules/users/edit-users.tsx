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
import { DataUsersById, GetUserByIdResponse } from "@/lib/interface/users/get-users-byId"
import { api } from "@/lib"
import { GetUserResponse } from "@/lib/interface/users/get-users"

interface EditUsersDialogProps {
  isOpen: boolean
  id: number
}

const EditUsersDialog: React.FC<EditUsersDialogProps> = ({ isOpen, id }) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState(1)

  const [response, setResponse] = useState<GetUserResponse>();
  const [dataUsersById, setDataUsersById] = useState<DataUsersById | null>(null);
  const [loadingUsersById, setLoadingUsersById] = useState<boolean>(true);
  const [emptyDataUsersById, setEmptyDataUsersById] = useState<boolean>(false);
  const [errorUsersById, setErrorUsersById] = useState<string | null>(null);


  const fetchDataUsersById = async () => {
    setLoadingUsersById(true);
    try {
      const response = await api.get<GetUserByIdResponse>(`/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }); // ganti '/endpoint' dengan endpoint yang sesuai
      setDataUsersById(response.data.data);
      setUsername(response.data.data.username)
      setEmail(response.data.data.email)
      setRole(response.data.data.role)
    } catch (error) {
      setErrorUsersById('Failed to fetch data');
    } finally {
      setLoadingUsersById(false);
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateDataUsersById();

  }

  const updateDataUsersById = async () => {
    setLoadingUsersById(true);
    try {
      const response = await api.put(`/users/${id}`,
        JSON.stringify({
          email: email,
          username: username
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }); // ganti '/endpoint' dengan endpoint yang sesuai
      setDataUsersById(response.data.data);
    } catch (error) {
      setErrorUsersById('Failed to fetch data');
    } finally {
      setLoadingUsersById(false);
      // close dialog
      window.location.reload();

    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDataUsersById();
    }
  }, []);



  const onSelect = (value: string) => {
    if (value === 'admin') {
      setRole(1)
    } else {
      setRole(2)
    }

  }

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
      </DialogHeader>
      {
        loadingUsersById ?
          <div>Loading...</div> :
          emptyDataUsersById ?
            <div>No data</div> :
            errorUsersById ?
              <div>{errorUsersById}</div> :
              <form

              >
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      defaultValue={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Select
                      defaultValue={role === 1 ? "admin" : "user"}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Roles</SelectLabel>
                          <SelectItem
                            onSelect={() => onSelect('admin')}
                            value="admin">Admin</SelectItem>
                          <SelectItem
                            onSelect={() => onSelect('user')}
                            value="user">User</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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


export default EditUsersDialog