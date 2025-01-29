import { ArrowRight, Search } from "lucide-react";

import { Button } from "@/components/atoms/button";
import CategoryList from "@/components/molecules/menu/category-list";
import MenuList from "@/components/molecules/menu/menu-list";
import { DataCategory, GetCategoryResponse } from "@/lib/interface/category/get-category";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios/instance";
import { DataMenu, GetMenuResponse } from "@/lib/interface/menu/get-menu";
import LoadingComponents from "@/components/atoms/loading";
import { Input } from "@/components/atoms/input";

const categories = [
  { id: 1, name: "New Menu" },
  { id: 2, name: "Main Course" },
  { id: 3, name: "Brunch" },
  { id: 4, name: "Salad" },
  { id: 5, name: "Pasta" },
  { id: 6, name: "Dessert" },
  { id: 7, name: "Drinks" },
  { id: 8, name: "Snacks" },
  { id: 9, name: "Specials" },
  { id: 10, name: "All" },
]

const posts = [
  {
    id: 1,
    title: "Duis sem sem, gravida vel porttitor eu, volutpat ut arcu",
    summary:
      "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
    label: "Ut varius dolor turpis",
    author: "Jane Doe",
    published: "1 Jan 2024",
    href: "#",
    image: "/images/logo.svg",
  },
  {
    id: 2,
    title: "Duis sem sem, gravida vel porttitor eu, volutpat ut arcu",
    summary:
      "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
    label: "Ut varius dolor turpis",
    author: "Jane Doe",
    published: "1 Jan 2024",
    href: "#",
    image: "/images/logo.svg",
  },
  {
    id: 3,
    title: "Duis sem sem, gravida vel porttitor eu, volutpat ut arcu",
    summary:
      "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
    label: "Ut varius dolor turpis",
    author: "Jane Doe",
    published: "1 Jan 2024",
    href: "#",
    image: "/images/logo.svg",
  },
];

const MenuModules = () => {
  const [categoriesId, setCategoriesId] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [dataCategory, setDataCategory] = useState<DataCategory[]>([]);
  const [data, setData] = useState<GetMenuResponse>();
  const [loadingCategory, setLoadingCategory] = useState<boolean>(true);
  const [emptyDataCategory, setEmptyDataCategory] = useState<boolean>(false);
  const [errorCategory, setErrorCategory] = useState<string | null>(null);

  const [dataMenu, setDataMenu] = useState<DataMenu[]>([]);
  const [loadingMenu, setLoadingMenu] = useState<boolean>(true);
  const [emptyDataMenu, setEmptyDataMenu] = useState<boolean>(false);
  const [errorMenu, setErrorMenu] = useState<string | null>(null);


  const fetchDataCategory = async () => {
    try {
      const response = await api.get<GetCategoryResponse>(`/category`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }); // ganti '/endpoint' dengan endpoint yang sesuai
      setDataCategory(response.data.data);
      if (response.data.data.length === 0) {
        setEmptyDataCategory(true);
      } else {
        setEmptyDataCategory(false);
      }
    } catch (error) {
      setErrorCategory('Failed to fetch data');
    } finally {
      setLoadingCategory(false);
    }
  };

  const fetchDataMenu = async () => {
    try {
      const response = await api.get<GetMenuResponse>(`/menu`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          "kategori": categoriesId,
          "search": search
        }
      }); // ganti '/endpoint' dengan endpoint yang sesuai
      setDataMenu(response.data.data);
      setData(response.data);
      if (response.data.data.length === 0) {
        setEmptyDataMenu(true);
      } else {
        setEmptyDataMenu(false);
      }
    } catch (error) {
      setErrorMenu('Failed to fetch data');
    } finally {
      setLoadingMenu(false);
    }
  };

  useEffect(() => {
    fetchDataCategory();
    fetchDataMenu();
  }, [categoriesId, search]);

  const handlePageClick = (page: number) => {
    // Logika untuk menangani perubahan halaman
    console.log('Page clicked:', page);
    setData(prev => prev ? { ...prev, page } : undefined);
    // Lakukan fetching data untuk halaman baru di sini
  };

  return (
    <div className="items-center lg:px-16">
      {
        loadingCategory ? (
          <LoadingComponents height={20} />
        ) : errorCategory ? (
          <p>{errorCategory}</p>
        ) : emptyDataCategory ? (
          <p>No data</p>
        ) : <CategoryList
          id={categoriesId}
          category={dataCategory}
          onClick={(id) => {
            setCategoriesId(id);
            console.log('Category clicked:', id);

          }
          }

        />
      }
      {
        loadingMenu ? (
          <LoadingComponents height={20} />
        ) : errorMenu ? (
          <p>{errorMenu}</p>
        ) : emptyDataMenu ? (
          <p>No data</p>
        ) : <div>
          <div className="relative">
            <Input
              id={categoriesId.toString()}
              className="peer pe-9 ps-9"
              placeholder="Search..."
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <Search size={16} strokeWidth={2} />
            </div>
          </div>
          <MenuList menu={dataMenu} />
        </div>
      }
      {/* <div className="flex justify-center">
        <Button variant="outline" className="px-10 border-black">
          Show More
        </Button>
      </div> */}
    </div>
  );
};

export default MenuModules;