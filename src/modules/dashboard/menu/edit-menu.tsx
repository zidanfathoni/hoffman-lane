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
import { GetMenuResponse } from "@/lib/interface/menu/get-menu"
import { DataMenuById, GetMenuByIdResponse } from "@/lib/interface/menu/get-menu-byId"
import { DataCategory, GetCategoryResponse } from "@/lib/interface/category/get-category"
import { Checkbox } from "@/components/atoms/checkbox"

interface EditMenuDialogProps {
  isOpen: boolean
  id: number
}
interface CategoryData {
  id: number
  name: string
  description: string
}

const EditMenuDialog: React.FC<EditMenuDialogProps> = ({ isOpen, id }) => {
  const cdnImage = process.env.NEXT_PUBLIC_CDN_URL + "/assets/";
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [upload_menu, setUploadMenu] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null)
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

  const [response, setResponse] = useState<GetMenuResponse>();
  const [dataMenuById, setDataMenuById] = useState<DataMenuById | null>(null);
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

  const toggleSelected = (value: boolean) => {
    setStatus(value);
  }



  const fetchDataMenuById = async () => {
    setLoadingMenuById(true);
    try {
      const response = await api.get<GetMenuByIdResponse>(`/menu/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }); // ganti '/endpoint' dengan endpoint yang sesuai
      setDataMenuById(response.data.data);
      setName(response.data.data.name);
      setDescription(response.data.data.description);
      setPrice(response.data.data.price);
      setUploadMenu(cdnImage + response.data.data.upload_menu);
      setSelectedCategory(
        {
          id: response.data.data.category.idKategori,
          name: response.data.data.category.name,
          description: response.data.data.category.description
        }
      )
      setSelectedCategoryName(response.data.data.category.name);
      setSelectedCategoryId(response.data.data.category.idKategori);
      console.log("upload_menu", upload_menu);
      setStatus(response.data.data.status);
      setCategory(response.data.data.category.name);
    } catch (error) {
      setErrorMenuById('Failed to fetch data');
    } finally {
      setLoadingMenuById(false);
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

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateDataMenuById();

  }

  const updateDataMenuById = async () => {
    // setLoadingMenuById(true);
    const formData = new FormData();

    formData.append("name", name);
    formData.append("idKategori", selectedCategory?.id.toString() || '');
    formData.append("description", description);
    formData.append("price", price.toString());
    if (selectedFile) {
      formData.append("upload_menu", selectedFile);
    } else {
      formData.append("upload_menu", '');
    }
    formData.append("status", status.toString());

    try {
      const response = await api.put(`/menu/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }); // ganti '/endpoint' dengan endpoint yang sesuai
      setDataMenuById(response.data.data);
    } catch (error) {
      setErrorMenuById('Failed to fetch data');
    } finally {
      setLoadingMenuById(false);
      // close dialog
      window.location.reload();

    }

  };

  useEffect(() => {
    if (isOpen) {
      fetchDataMenuById();
      fetchDataCategory();
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
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
      </DialogHeader>
      {
        loadingMenuById ?
          <div>Loading...</div> :
          emptyDataMenuById ?
            <div>No data</div> :
            errorMenuById ?
              <div>{errorMenuById}</div> :
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
      }

      <DialogFooter>
        <Button
          onClick={submitHandler}
        >Save changes</Button>
      </DialogFooter>
    </DialogContent>
  )
}


export default EditMenuDialog