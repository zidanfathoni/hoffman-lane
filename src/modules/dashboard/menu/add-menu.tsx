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
import { Checkbox } from "@/components/atoms/checkbox"


interface CategoryData {
  id: number
  name: string
  description: string
}

const AddMenuDialog: React.FC = () => {
  const cdnImage = process.env.NEXT_PUBLIC_CDN_URL + "/assets/";
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [upload_menu, setUploadMenu] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null)
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

  const [loadingMenuById, setLoadingMenuById] = useState<boolean>(true);
  const [emptyDataMenuById, setEmptyDataMenuById] = useState<boolean>(false);
  const [errorMenuById, setErrorMenuById] = useState<string | null>(null);

  const [responseCategory, setResponseCategory] = useState<GetCategoryResponse>();
  const [dataCategory, setDataCategory] = useState<DataCategory[]>([]);
  const [loadingCategory, setLoadingCategory] = useState<boolean>(true);
  const [emptyCategory, setEmptyCategory] = useState<boolean>(false);
  const [errorCategory, setErrorCategory] = useState<string | null>(null);


  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setSelectedFile(file);
  //     setUploadMenu(URL.createObjectURL(file));
  //     console.log("Selected file:", file);
  //   }
  // };
  const handleSelectChange = (id: number, name: string) => {
    console.log("Selected category:", id, name);
    setSelectedCategoryId(id);
    setSelectedCategoryName(name);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setSelectedFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadMenu(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const toggleSelected = (value: boolean) => {
    setStatus(value);
  }

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDataMenuById();

  }

  const addDataMenuById = async () => {
    setLoadingMenuById(true);
    const formData = new FormData();
    console.log("selectedFile", selectedFile);
    if (selectedFile) {
      formData.append("name", name);
      formData.append("idKategori", selectedCategory?.id.toString() || '');
      formData.append("description", description);
      formData.append("price", price.toString());
      formData.append(
        "upload_menu",
        selectedFile
      );
      formData.append("status", status.toString());

      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      console.log("upload_menu:", selectedFile);

      try {
        const response = await api.post(`/menu`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        ); // ganti '/endpoint' dengan endpoint yang sesuai
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
        <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
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
              onValueChange={(value) => {
                console.log("Selected category:", value);
                setSelectedCategoryName(value);
                //search category id by name
                const category = dataCategory.find((category) => category.name === value);
                if (category) {
                  setSelectedCategory(category);
                }
              }}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {dataCategory.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.name}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <Input id="image" type="file" accept="image/*" onChange={handleFileChange}
              className="col-span-3" />
          </div>
          <div
            className="flex items-end justify-end"
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Recommended?
            </Label>
            <div className="relative col-span-3">
              <Checkbox id="status"
                defaultChecked={status}
                onCheckedChange={toggleSelected}
                className="peer h-4 w-4 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent checked:text-white"
              />
              <label
                htmlFor="status"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-3"
              >
                Check if this menu is recommended
              </label>
            </div>
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