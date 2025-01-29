import { ArrowRight } from "lucide-react";

import { Button } from "@/components/atoms/button";
import CategoryList from "@/components/molecules/menu/category-list";
import MenuList from "@/components/molecules/menu/menu-list";
import { DataMenuRecommendation, GetMenuRecommendationResponse } from "@/lib/interface/recommendation/get-recommendation";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios/instance";
import LoadingComponents from "@/components/atoms/loading";

const posts = [
  {
    id: 1,
    name: "Duis sem sem, gravida vel porttitor eu, volutpat ut arcu",
    description:
      "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
    price: 100000,
    upload_menu: "/images/logo.svg",
    status: true,
    category: {
      idKategori: 1,
      name: "New Menu",
      description: "New Menu",
    },
  },
  {
    id: 2,
    name: "Duis sem sem, gravida vel porttitor eu, volutpat ut arcu",
    description:
      "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
    price: 100000,
    upload_menu: "/images/logo.svg",
    status: true,
    category: {
      idKategori: 1,
      name: "New Menu",
      description: "New Menu",
    },
  },
  {
    id: 3,
    name: "Duis sem sem, gravida vel porttitor eu, volutpat ut arcu",
    description:
      "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
    price: 100000,
    upload_menu: "/images/logo.svg",
    status: true,
    category: {
      idKategori: 1,
      name: "New Menu",
      description: "New Menu",
    },
  },
];

const MenuRecommendationModules = () => {
  const [dataMenu, setDataMenu] = useState<DataMenuRecommendation[]>([]);
  const [loadingMenu, setLoadingMenu] = useState<boolean>(true);
  const [emptyDataMenu, setEmptyDataMenu] = useState<boolean>(false);
  const [errorMenu, setErrorMenu] = useState<string | null>(null);


  const fetchDataMenu = async () => {
    try {
      const response = await api.get<GetMenuRecommendationResponse>(`/menu`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          "status": true
        }
      }); // ganti '/endpoint' dengan endpoint yang sesuai
      setDataMenu(response.data.data);
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
    fetchDataMenu();
  }, []);

  return (
    <div className="items-center gap-8 lg:px-16">
      {
        loadingMenu ? (
          <LoadingComponents height={20} />
        ) : errorMenu ? (
          <p>{errorMenu}</p>
        ) : emptyDataMenu ? (
          <p>No data</p>
        ) : <MenuList menu={dataMenu} />
      }

      {/* <div className="flex justify-center">
        <Button variant="outline" className="px-10 border-black">
          Show More
        </Button>
      </div> */}
    </div>
  );
};

export default MenuRecommendationModules;
