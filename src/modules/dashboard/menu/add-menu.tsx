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
import { DataCategory, GetCategoryResponse } from "@/lib/interface/category/get-category"


const AddMenuDialog: React.FC = () => {
  const cdnImage = process.env.NEXT_PUBLIC_CDN_URL + "/assets/";
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [upload_menu, setUploadMenu] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

  const [loadingMenuById, setLoadingMenuById] = useState<boolean>(true);
  const [emptyDataMenuById, setEmptyDataMenuById] = useState<boolean>(false);
  const [errorMenuById, setErrorMenuById] = useState<string | null>(null);

  const [responseCategory, setResponseCategory] = useState<GetCategoryResponse>();
  const [dataCategory, setDataCategory] = useState<DataCategory[]>([]);
  const [loadingCategory, setLoadingCategory] = useState<boolean>(true);
  const [emptyCategory, setEmptyCategory] = useState<boolean>(false);
  const [errorCategory, setErrorCategory] = useState<string | null>(null);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadMenu(URL.createObjectURL(file));
      console.log("Selected file:", file);
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDataMenuById();

  }

  const addDataMenuById = async () => {
    setLoadingMenuById(true);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price.toString());
      formData.append("upload_menu", selectedFile);
      formData.append("status", status.toString());
      formData.append("category", selectedCategoryId.toString());
      try {
        const response = await api.post(`/menu/`,
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }); // ganti '/endpoint' dengan endpoint yang sesuai
      } catch (error) {
        setErrorMenuById('Failed to fetch data');
      } finally {
        setLoadingMenuById(false);
        // close dialog
        window.location.reload();

      }
    }
  };


  const fetchDataCategory = async () => {
    setLoadingCategory(true);
    try {
      const response = await api.get<GetCategoryResponse>('/category', {
        headers: {
          'Content-Type': 'application/json',
        },
      }); // ganti '/endpoint' dengan endpoint yang sesuai
      setDataCategory(response.data.data);
    } catch (error) {
      setErrorCategory('Failed to fetch data');
    } finally {
      setLoadingCategory(false);

    }
  }

  useEffect(() => {
    fetchDataCategory();
  }, []);

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Add Menu</DialogTitle>
        <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
      </DialogHeader>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              defaultValue={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select
              defaultValue={category}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {
                    dataCategory.map((category) => {
                      return (
                        <SelectItem
                          onSelect={() => {
                            setCategory(category.name);
                            setSelectedCategoryId(category.id);
                          }}
                          value={category.name}>{category.name}</SelectItem>
                      )
                    })
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <Input
              id="image"
              type="file"
              defaultValue={selectedFile?.name}
              onChange={handleFileChange}
              className="col-span-3" />
          </div>
          <div
            className=" items-end justify-end"
          >
            {
              selectedFile && (
                <img
                  src={upload_menu}
                  alt="upload_menu"
                  className="h-32"
                />
              )
            }
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


export default AddMenuDialog