import * as React from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { getCategories } from "@/lib/get-categories";

import { AuthButton } from "@/app/auth/_components/auth-button";
import { Logo } from "@/components/logo";

const classnames = {
  root: "fixed h-header z-20 top-0 left-0 right-0 px-2 flex justify-between items-center bg-background border-b-2 border-b-secondary",
  list: "hidden md:flex justify-center items-center gap-4 list-none p-1",
  item: "flex justify-center items-center",
  trigger:
    "group flex select-none items-center justify-between gap-0.5 rounded-full border-2 border-transparent hover:border-foreground px-3 py-2 text-foreground outline-none hover:bg-accent focus-visible:border-foreground focus-visible:bg-accent",
  chevronIcon:
    "relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180",
  link: "block select-none rounded-full border-2 border-transparent hover:border-foreground px-3 py-2 text-foreground no-underline outline-none hover:bg-accent focus-visible:border-foreground focus-visible:bg-accent",
  content:
    "absolute top-[58px] min-w-[245px] bg-background border-2 border-foreground rounded-lg p-2 origin-[top_center] data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in data-[motion=from-end]:animate-enter-from-right data-[motion=from-start]:animate-enter-from-left data-[motion=to-end]:animate-exit-to-right data-[motion=to-start]:animate-exit-to-left",
  indicator:
    "top-[48px] left-0 z-20 flex items-end justify-center overflow-hidden transition-[width,transform_200ms_ease] data-[state=hidden]:animate-fade-out data-[state=visible]:animate-fade-in",
  focus: "focus-visible:ring-ring focus-visible:ring-2",
};

const HeaderMenu = async () => {
  const businessCategories = await getCategories("business_categories");
  const eventCategories = await getCategories("event_categories");

  return (
    <header>
      <div className="hidden lg:flex">
        <NavigationMenu.Root className={classnames.root}>
          <NavigationMenu.Link href="/">
            <Logo />
          </NavigationMenu.Link>

          <NavigationMenu.List className={classnames.list}>
            <NavigationMenu.Item className={classnames.item}>
              <NavigationMenu.Trigger
                className={cn(classnames.trigger, classnames.focus)}
              >
                Businesses{" "}
                <ChevronDownIcon
                  className={classnames.chevronIcon}
                  aria-hidden
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={classnames.content}>
                <ul className="w-full list-none">
                  <ListItem href="/businesses">All</ListItem>
                  {businessCategories.map((category) => (
                    <ListItem
                      key={category.name}
                      href={`/businesses/category/${category.name}`}
                    >
                      {category.label}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item className={classnames.item}>
              <NavigationMenu.Trigger
                className={cn(classnames.trigger, classnames.focus)}
              >
                Events{" "}
                <ChevronDownIcon
                  className={classnames.chevronIcon}
                  aria-hidden
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={classnames.content}>
                <ul className="w-full list-none">
                  <ListItem href="/events">All</ListItem>
                  {eventCategories.map((category) => (
                    <ListItem
                      key={category.name}
                      href={`/events/category/${category.name}`}
                    >
                      {category.label}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item className={classnames.item}>
              <NavigationMenu.Trigger
                className={cn(classnames.trigger, classnames.focus)}
              >
                Search{" "}
                <ChevronDownIcon
                  className={classnames.chevronIcon}
                  aria-hidden
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={classnames.content}>
                <ul className="w-full list-none">
                  {["businesses", "events"].map((category) => (
                    <ListItem key={category} href={`/${category}/search`}>
                      {category}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Indicator className={classnames.indicator}>
              <svg
                width="23"
                height="15"
                viewBox="0 0 23 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.8195 1.3457L22.6448 11.0957C22.6448 11.0957 22.6448 10.0594 22.6448 14.3457C20.1448 14.3457 5.12615 14.7561 0.994141 14.3457C0.994255 11.8457 0.994141 11.0957 0.994141 11.0957L11.8195 1.3457Z"
                  fill="#F5F3EA"
                />
                <path
                  d="M22.3206 11.0957L11.4952 1.3457L0.669922 11.0957"
                  stroke="#302634"
                  strokeWidth="2"
                />
              </svg>
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <React.Suspense>
            <AuthButton />
          </React.Suspense>
        </NavigationMenu.Root>
      </div>
      <div className="lg:hidden"></div>
    </header>
  );
};

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
          className={cn(classnames.link, classnames.focus)}
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

export { HeaderMenu };
