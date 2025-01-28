import Link from "next/link";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./navigation-menu";
import { Button } from "./button";
import { Menu, MoveRight, ShoppingBasket, X } from "lucide-react";


const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("");

  const [isOpen, setOpen] = useState(false);

  const navigationItems = [
    {
      title: "Home",
      href: "/",
      description: "",
    },
    {
      title: "Menu",
      description: "",
      href: "/menu"
    },
    {
      title: "Reservation",
      description: "",
      href: "#reservation"
    },
    {
      title: "Contact",
      description: "",
      href: "#contact"
    },
  ];


  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = section.id; // Pastikan setiap section memiliki ID unik
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="flex w-full z-40 fixed top-0 left-0 bg-background">
      <div className="container relative mx-auto min-h-10 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
        <div className="flex lg:justify-start">
          <a href="#home" className="flex items-center gap-4">
            <div className="flex items-center">
              <Image
                src="/images/hoffman-logo.svg"
                alt="Next.js logo"
                width={100}
                height={100}
                priority
              />
            </div>
          </a>
        </div>
        <div className="justify-center items-center gap-4 lg:flex hidden flex-row">
          <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              {navigationItems.map((item) => (
                <div key={item.title} className="flex flex-col items-center">
                  <NavigationMenuItem>
                    <NavigationMenuLink href={item.href}>
                      <Button
                        variant="ghost"
                        className="hover:bg-primary hover:text-primary-foreground"
                      >
                        {item.title}
                      </Button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  {/* Divider */}
                  <div
                    className={`w-20 mt-2 ${activeSection === item.href.replace("#", "")
                      ? "border-t-4 border-primary"
                      : "border-t-4 border-transparent"
                      }`}
                  />

                </div>
              ))}
            </NavigationMenuList>

          </NavigationMenu>
        </div>
        <div className="flex justify-end w-full gap-2">
          <Button
            variant="ghost"
            onClick={() => (window.location.href = '/order')}>
            <ShoppingBasket className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => (window.location.href = '/auth')}
            variant="outline">
            Admin
          </Button>
        </div>
        <div className="flex w-12 shrink lg:hidden items-end justify-end">
          <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          {isOpen && (
            <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={item.href}
                      className="flex justify-between items-center"
                    >
                      <span className="text-lg">{item.title}</span>
                      <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
