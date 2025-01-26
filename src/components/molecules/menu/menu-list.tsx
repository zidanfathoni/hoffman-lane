import { Button } from "@/components/atoms";


interface MenuListProps {
  menu: {
    id: number,
    name: string,
    description: string,
    price: number,
    upload_menu: string,
    status: boolean,
    category: {
      idKategori: number, name: string, description: string
    },
  }[],
}

const MenuList: React.FC<MenuListProps> = ({ menu }) => {
  const cdnImage = process.env.NEXT_PUBLIC_CDN_URL + "/assets/";
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 mb-5">
      {menu.map((post) => (
        console.log('cdn image', cdnImage + post.upload_menu),
        <div
          key={post.id}
          className="flex flex-col overflow-clip py-4"
        >
          <div className="bg-primary/20 rounded-3xl overflow-hidden">
            <img
              src={cdnImage + post.upload_menu}
              alt={post.name}
              className="aspect-[16/9] h-full w-full object-cover object-center rounded-3xl border border-border"
            />
          </div>
          <div className="px-4 pb-2 pt-2 md:px-6 md:py-4 lg:px-8 lg:pt-6">
            <div className=" grid grid-cols-[2fr_1fr]">
              <p className="mb-3 text-sm md:mb-4 lg:mb-6">
                {post.name}
              </p>
              <p className="mb-3 text-sm md:mb-4 lg:mb-6 justify-end text-end">
                Rp. {post.price}
              </p>
            </div>
            <p className="mb-3 text-muted-foreground md:mb-4 lg:mb-6 text-sm md:text-base">
              {post.description}
            </p>
          </div>
          <Button
            className="w-full rounded-2xl"
            onClick={(e) => {
              // Add to cart post.href

              e.preventDefault();
            }}
          >Add to Cart</Button>
        </div>
      ))}
    </div>
  );
}

export default MenuList;