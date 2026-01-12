import * as React from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import { AuthButton } from "@/app/auth/_components/auth-button";
import { Logo } from "@/components/logo";
import { IconChevronDown } from "@/components/icons/icon-chevron-down";
import { SearchInput } from "./search-input";
import type { NavItem } from "./header";

const classnames = {
  root: "fixed hidden lg:flex justify-between items-center h-header z-20 top-0 left-0 right-0 px-2 bg-background border-b-2 border-b-secondary",
  list: "hidden md:flex justify-center items-center gap-4 list-none p-1",
  item: "flex justify-center items-center",
  trigger:
    "group flex select-none items-center justify-between gap-0.5 rounded-full border-2 border-transparent hover:border-foreground px-3 py-2 text-foreground outline-none hover:bg-accent focus-visible:border-foreground focus-visible:bg-accent",
  chevronIcon: "relative mt-px ml-1 group-data-[state=open]:rotate-180",
  link: "block select-none rounded-full border-2 border-transparent hover:border-foreground px-3 py-2 text-foreground no-underline outline-none hover:bg-accent focus-visible:border-foreground focus-visible:bg-accent",
  content:
    "absolute top-[58px] min-w-[245px] bg-background border-2 border-foreground rounded-lg p-2 origin-[top_center] data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in data-[motion=from-end]:animate-enter-from-right data-[motion=from-start]:animate-enter-from-left data-[motion=to-end]:animate-exit-to-right data-[motion=to-start]:animate-exit-to-left",
  indicator:
    "top-[49px] left-0 z-20 flex items-end justify-center overflow-hidden transition-[width,transform_200ms_ease] data-[state=hidden]:animate-fade-out data-[state=visible]:animate-fade-in",
};

type MenuDesktopProps = {
  navItems: NavItem[];
};

export async function MenuDesktop({ navItems }: MenuDesktopProps) {
  // TODO: add test checking if click opens the dropdown + correct items are shown
  return (
    <NavigationMenu.Root className={classnames.root}>
      <NavigationMenu.Link href="/" aria-label="Smalls.London logo — Homepage">
        <Logo />
      </NavigationMenu.Link>

      <NavigationMenu.List className={classnames.list}>
        {navItems.map((item) => {
          return (
            <NavigationMenu.Item className={classnames.item}>
              <NavigationMenu.Trigger className={classnames.trigger}>
                {item.label}
                <IconChevronDown className={classnames.chevronIcon} />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={classnames.content}>
                <ul className="w-full list-none">
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

        <NavigationMenuIndicator />
      </NavigationMenu.List>

      <React.Suspense>
        <AuthButton />
      </React.Suspense>
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
          <span className="mb-[5px] font-medium leading-[1.2] text-foreground capitalize">
            {children}
          </span>
        </Link>
      </NavigationMenu.Link>
    </li>
  )
);

const NavigationMenuIndicator = () => {
  return (
    <NavigationMenu.Indicator className={classnames.indicator}>
      <svg
        width="23"
        height="14"
        viewBox="0 0 23 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.1504 2.31738L21.1513 11.3174C21.1513 11.3174 21.1504 11.8174 21.1504 13.8174C18.6504 13.8174 5.15039 13.8174 1.15039 13.8174C1.1505 11.352 1.15131 11.3174 1.15131 11.3174L11.1504 2.31738Z"
          fill="#F5F3EA"
        />
        <path
          d="M21.6504 10.3174L11.1504 1.31738L0.650391 10.3174"
          stroke="#302634"
          stroke-width="2"
        />
      </svg>
    </NavigationMenu.Indicator>
  );
};
