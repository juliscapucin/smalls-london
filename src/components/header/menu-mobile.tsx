"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
// Customized Shadcn UI Sheet and Accordion components
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Logo } from "@/components/logo";
import { SearchInput } from "./search-input";

import type { NavItem } from "./header";
import type { Category } from "@/types/category";

type MobileMenuProps = {
  navItems: NavItem[];
};

export function MobileMenu({ navItems }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const mobileNavItems = [
    { label: "Home", path: "/", items: undefined },
    ...navItems,
  ];

  console.log(mobileNavItems);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between h-header px-2 bg-background border-b-2 border-b-secondary lg:hidden z-20">
        <Link href="/" aria-label="Smalls.London logo — Homepage">
          <Logo />
        </Link>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <BurgerIcon />
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent side="right" className="w-80 max-w-[85vw] min-w-[350px]">
        <nav className="mt-(--height-header) flex flex-col gap-2">
          <div className="border-b-2 border-foreground pb-8">
            <h3 className="px-2">Search</h3>
            <SearchInput />
          </div>
          <Accordion type="single" collapsible>
            {mobileNavItems.map((item) => {
              if (!item.items) {
                return <NavItem item={item} />;
              } else if (item.items && item.items.length > 0) {
                return (
                  <AccordionItem
                    value={item.label}
                    className="first-of-type:border-t-2 border-foreground"
                  >
                    <AccordionTrigger className="py-2 px-3 hover:bg-accent hover:rounded-full focus-within:bg-accent focus-within:rounded-full focus-within:mx-1">
                      {item.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-1">
                        {item.items?.map((category: Category) => (
                          // Wrap each NavItem with SheetClose to close the sheet on navigation
                          <SheetClose asChild key={category.name}>
                            <NavItem
                              item={{
                                label: category.label,
                                path: `${item.path}/category/${category.name}`,
                                isGroup: true,
                              }}
                            />
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              }
            })}
          </Accordion>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

type NavItemProps = {
  item: { label: string; path: string; isGroup?: boolean };
};

const NavItem = ({ item }: NavItemProps) => {
  return (
    <Link
      key={item.label}
      href={item.path}
      className={`block py-2 px-3 hover:bg-accent hover:rounded-full focus-within:bg-accent focus-within:rounded-full focus-within:mx-1 transition-all transition-300 ${
        item.isGroup ? "" : "mb-2"
      }`}
    >
      {item.label}
    </Link>
  );
};

const BurgerIcon = () => {
  return (
    <div
      className="size-6 flex flex-col justify-center gap-1.5 relative"
      aria-hidden="true"
    >
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="h-0.5 w-full bg-foreground rounded-full"
        ></div>
      ))}
    </div>
  );
};
