import { Button } from "@/components/atoms";
import { GetMenuResponse } from "@/lib/interface/menu/get-menu";
import { useState } from "react";



interface CategoryListProps {
  id: number | undefined,
  category: { id: number, name: string }[],
  onClick?: (id: number) => void

}


const CategoryList: React.FC<CategoryListProps> = ({ id, category, onClick }) => {
  const [dataCategory, setDataCategory] = useState<GetMenuResponse>();
  return (
    <div className="mt-8 pb-12">
      <div className="flex flex-wrap gap-3 items-center justify-center">
        <Button
          key={0}
          variant={id === 0 ? "default" : "outline"}
          className="px-10 mx-1 shadow-md"
          onClick={() => {
            if (onClick) {
              onClick(0);
            }
          }}
        >
          All Menu
        </Button>
        {category.map((category) => (
          <Button
            key={category.id}
            variant={id === category.id ? "default" : "outline"}
            className="px-10 mx-1 shadow-md"
            onClick={() => {
              if (onClick) {
                onClick(category.id);
                //change dataCategory.active


                console.log(category.id);
              }
            }}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;