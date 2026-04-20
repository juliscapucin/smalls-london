"use client";

// Customized Radix UI Navigation Menu component

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import { Logo } from "@/components/logo";
import { IconChevronDown } from "@/components/icons/icon-chevron-down";
import { IconMenuIndicator } from "@/components/icons/icon-menu-indicator";
import { SearchInput } from "./search-input";
import type { NavItem } from "./header";

const classnames = {
  root: "fixed hidden lg:flex justify-between items-center h-header z-20 top-0 left-0 right-0 px-2 bg-background border-b-2 border-b-foreground-subtle",
  list: "hidden md:flex justify-center items-center gap-4 list-none",
  item: "flex justify-center items-center",
  trigger:
    "group flex select-none items-center justify-between gap-0.5 rounded-full border-2 border-transparent hover:border-foreground px-3 py-2 text-foreground outline-none hover:bg-accent-1 focus-visible:border-foreground focus-visible:bg-accent-1",
  chevronIcon: "relative mt-px ml-1 group-data-[state=open]:rotate-180",
  link: "block select-none rounded-full border-2 border-transparent hover:border-foreground px-3 py-2 text-foreground no-underline outline-none hover:bg-accent-1 focus-visible:border-foreground focus-visible:bg-accent-1",
  content:
    "absolute top-[58px] min-w-[245px] bg-background border-2 border-foreground rounded-lg p-2 origin-[top_center] data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in",
  indicator:
    "top-[49px] left-0 z-20 flex items-end justify-center overflow-hidden transition-[width,transform_200ms_ease] data-[state=hidden]:animate-fade-out data-[state=visible]:animate-fade-in",
};

type MenuDesktopProps = {
  navItems: NavItem[];
  children?: React.ReactNode;
};

export function MenuDesktop({ navItems, children }: MenuDesktopProps) {
  // TODO: add test checking if click opens the dropdown + correct items are shown

  const [open, setOpen] = useState<string>(""); // Customised state to manage open menu item

  return (
    <NavigationMenu.Root
      value={open}
      onValueChange={setOpen}
      className={classnames.root}
      aria-label="Desktop Menu"
    >
      <NavigationMenu.Link href="/" aria-label="Smalls.London logo — Homepage">
        <Logo />
      </NavigationMenu.Link>
      <NavigationMenu.List className={classnames.list}>
        {navItems.map((item) => {
          return (
            <NavigationMenu.Item
              className={classnames.item}
              key={item.label}
              value={item.label}
            >
              <NavigationMenu.Trigger
                className={classnames.trigger}
                onClick={(e) => e.preventDefault()}
                onFocus={() => setOpen(item.label)}
              >
                {item.label}
                <IconChevronDown className={classnames.chevronIcon} />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={classnames.content}>
                <ul className="w-full">
                  <ListItem href={item.path}>All</ListItem>
                  {item.items?.map((category) => (
                    <ListItem
                      key={category.name}
                      href={`${item.path}/category/${category.name}`}
                    >
                      {category.label}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          );
        })}

        <NavigationMenu.Item className={classnames.item} value="search">
          <NavigationMenu.Trigger
            className={classnames.trigger}
            onClick={(e) => e.preventDefault()}
            onFocus={() => setOpen("search")}
          >
            Search
            <IconChevronDown className={classnames.chevronIcon} />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className={classnames.content}
            onFocusOutside={() => setOpen("")}
          >
            <SearchInput />
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className={classnames.indicator}>
          <IconMenuIndicator />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
      {/* Slot to render Menu Auth Button (server component) */}
      {children}
    </NavigationMenu.Root>
  );
}

type ListItemProps = {
  children?: React.ReactNode;
  href: string;
} & React.ComponentProps<"a">;

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ children, href, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <Link
          href={href}
          className={classnames.link}
          {...props}
          ref={forwardedRef}
        >
          <span className="mb-1.25 font-medium leading-[1.2] text-foreground capitalize">
            {children}
          </span>
        </Link>
      </NavigationMenu.Link>
    </li>
  ),
);
