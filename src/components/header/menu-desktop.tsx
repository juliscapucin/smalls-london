"use client";

import * as React from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import { Logo } from "@/components/logo";
import { IconChevronDown } from "@/components/icons/icon-chevron-down";
import { IconMenuIndicator } from "@/components/icons/icon-menu-indicator";
import { SearchInput } from "./search-input";
import type { NavItem } from "./header";

const classnames = {
  root: "fixed hidden lg:flex justify-between items-center h-header z-20 top-0 left-0 right-0 px-2 bg-background border-b-2 border-b-secondary",
  list: "hidden md:flex justify-center items-center gap-4 list-none",
  item: "flex justify-center items-center",
  trigger:
    "group flex select-none items-center justify-between gap-0.5 rounded-full border-2 border-transparent hover:border-foreground px-3 py-2 text-foreground outline-none hover:bg-accent focus-visible:border-foreground focus-visible:bg-accent",
  chevronIcon: "relative mt-px ml-1 group-data-[state=open]:rotate-180",
  link: "block select-none rounded-full border-2 border-transparent hover:border-foreground px-3 py-2 text-foreground no-underline outline-none hover:bg-accent focus-visible:border-foreground focus-visible:bg-accent",
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
  const [open, setOpen] = React.useState(false);

  // TODO: add test checking if click opens the dropdown + correct items are shown
  return (
    <NavigationMenu.Root className={classnames.root}>
      <NavigationMenu.Link href="/" aria-label="Smalls.London logo — Homepage">
        <Logo />
      </NavigationMenu.Link>
      <NavigationMenu.List className={classnames.list}>
        {navItems.map((item) => {
          return (
            <NavigationMenu.Item className={classnames.item} key={item.label}>
              <NavigationMenu.Trigger
                className={classnames.trigger}
                onClick={(e) => e.preventDefault()}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                data-state={open ? "open" : "closed"}
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

        <NavigationMenu.Item className={classnames.item}>
          <NavigationMenu.Trigger className={classnames.trigger}>
            Search
            <IconChevronDown className={classnames.chevronIcon} />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className={classnames.content}>
            <SearchInput />
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Indicator className={classnames.indicator}>
          <IconMenuIndicator />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
      {/* Slot to render Menu Auth Button */}
      {children}
    </NavigationMenu.Root>
  );
}

type NavigationItemProps = {
  item: NavItem;
};

const NavigationItem = React.forwardRef<HTMLLIElement, NavigationItemProps>(
  ({ item }, forwardedRef) => {
    const [open, setOpen] = React.useState(false);

    return (
      <NavigationMenu.Item
        className={classnames.item}
        key={item.label}
        ref={forwardedRef}
      >
        <NavigationMenu.Trigger
          className={classnames.trigger}
          onClick={(e) => e.preventDefault()}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          data-state={open ? "open" : "closed"}
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
  }
);

NavigationItem.displayName = "NavigationItem";

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
          <span className="mb-[5px] font-medium leading-[1.2] text-foreground capitalize">
            {children}
          </span>
        </Link>
      </NavigationMenu.Link>
    </li>
  )
);
