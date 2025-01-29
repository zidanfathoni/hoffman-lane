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
import { Eye, EyeOff } from "lucide-react"


const AddUsersDialog: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState(1)

  const [response, setResponse] = useState<GetUserResponse>();
  const [dataUsersById, setDataUsersById] = useState<DataUsersById | null>(null);
  const [loadingUsersById, setLoadingUsersById] = useState<boolean>(true);
  const [emptyDataUsersById, setEmptyDataUsersById] = useState<boolean>(false);
  const [errorUsersById, setErrorUsersById] = useState<string | null>(null);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDataUsersById();

  }

  const addDataUsersById = async () => {
    setLoadingUsersById(true);
    try {
      const response = await api.post(`/users/register`,
        JSON.stringify({
          email: email,
          username: username,
          password: password,
          role: role

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
        <DialogTitle>Add Users</DialogTitle>
        <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
      </DialogHeader>
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
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <div className="relative col-span-3">
              <Input
                id="password"
                className="col-span-3"
                placeholder="Password"
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? "Hide password" : "Show password"}
                aria-pressed={isVisible}
                aria-controls="password"
              >
                {isVisible ? (
                  <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Eye size={16} strokeWidth={2} aria-hidden="true" />
                )}
              </button>
            </div>
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

      <DialogFooter>
        <Button
          onClick={submitHandler}
        >Save changes</Button>
      </DialogFooter>
    </DialogContent>
  )
}


export default AddUsersDialog