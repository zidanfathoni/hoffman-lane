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
import { DataCategoryById, GetCategoryByIdResponse } from "@/lib/interface/category/get-category-byId"

interface EditCategoryDialogProps {
  isOpen: boolean
  id: number
}

const EditCategoryDialog: React.FC<EditCategoryDialogProps> = ({ isOpen, id }) => {
  const cdnImage = process.env.NEXT_PUBLIC_CDN_URL + "/assets/";
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [response, setResponse] = useState<GetCategoryByIdResponse>();
  const [dataCategoryById, setDataCategoryById] = useState<DataCategoryById | null>(null);
  const [loadingCategoryById, setLoadingCategoryById] = useState<boolean>(true);
  const [emptyDataCategoryById, setEmptyDataCategoryById] = useState<boolean>(false);
  const [errorCategoryById, setErrorCategoryById] = useState<string | null>(null);

  const fetchDataCategoryById = async () => {
    setLoadingCategoryById(true);
    try {
      const response = await api.get<GetCategoryByIdResponse>(`/Category/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }); // ganti '/endpoint' dengan endpoint yang sesuai
      setDataCategoryById(response.data.data);
      setName(response.data.data.name);
      setDescription(response.data.data.description);
    } catch (error) {
      setErrorCategoryById('Failed to fetch data');
    } finally {
      setLoadingCategoryById(false);
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateDataCategoryById();

  }

  const updateDataCategoryById = async () => {
    setLoadingCategoryById(true);
    try {
      const response = await api.put(`/category/${id}`,
        JSON.stringify({
          name: name,
          description: description,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }); // ganti '/endpoint' dengan endpoint yang sesuai
      setDataCategoryById(response.data.data);
    } catch (error) {
      setErrorCategoryById('Failed to fetch data');
    } finally {
      setLoadingCategoryById(false);
      // close dialog
      window.location.reload();

    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDataCategoryById();
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
        <DialogTitle>Edit Category</DialogTitle>
        <DialogDescription>Make changes to your Category here. Click save when you&apos;re done.</DialogDescription>
      </DialogHeader>
      {
        loadingCategoryById ?
          <div>Loading...</div> :
          emptyDataCategoryById ?
            <div>No data</div> :
            errorCategoryById ?
              <div>{errorCategoryById}</div> :
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
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      defaultValue={description}
                      onChange={(e) => setDescription(e.target.value)}
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


export default EditCategoryDialog