import { Bookmark, LayoutGrid, LucideIcon, Settings, User, Tag, Users } from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: 'Users',
      menus: [
        {
          href: '/dashboard/users',
          label: 'Administrators',
          icon: User,
          // submenus: [
          //   {
          //     href: '/posts',
          //     label: 'All Posts',
          //   },
          //   {
          //     href: '/posts/new',
          //     label: 'New Post',
          //   },
          // ],
        },
      ],
    },
    {
      groupLabel: 'Transactions',
      menus: [
        {
          href: '/dashboard/transactions',
          label: 'Transactions',
          icon: Users,
        },
      ],
    },
    {
      groupLabel: 'Menu & Stocks',
      menus: [
        {
          href: '/dashboard/inventory',
          label: 'Stock Inventory',
          icon: Users,
        },
        {
          href: '/dashboard/category',
          label: 'Category',
          icon: Settings,
        },
        {
          href: '/dashboard/menu',
          label: 'Menu',
          icon: Tag,
        },
      ],
    },
  ];
}
