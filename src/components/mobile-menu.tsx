"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
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

import type { NavItem } from "./header";
import type { Category } from "@/types/category";

type MobileMenuProps = {
  navItems: NavItem[];
};

export function MobileMenu({ navItems }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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

      <SheetContent side="right" className="w-80 max-w-[85vw]">
        <nav className="mt-6 flex flex-col gap-2">
          {navItems.map((item) => {
            if (item.type === "link") {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2"
                >
                  {item.label}
                </Link>
              );
            } else if (item.type === "group") {
              return (
                <Accordion key={item.label} type="single" collapsible>
                  <AccordionItem value={item.label}>
                    <AccordionTrigger className="px-4">
                      {item.label}
                    </AccordionTrigger>
                    <AccordionContent className="px-2">
                      <div className="flex flex-col gap-1">
                        {item.items.map((category: Category) => (
                          <SheetClose asChild key={category.name}>
                            <Link
                              href={`/${item.path}/category/${category.name}`}
                              className="px-4 py-2 hover:bg-accent rounded-full"
                            >
                              {category.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            }
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function BurgerIcon() {
  return (
    <div
      className="h-12 w-6 flex flex-col justify-center gap-1.5 relative"
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
}
