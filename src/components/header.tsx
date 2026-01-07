import { getCategories } from "@/lib/get-categories";

import { DesktopMenu } from "@/components/desktop-menu";
import { MobileMenu } from "./mobile-menu";
import { Category } from "@/types/category";

export type NavItem =
  | { type: "link"; label: string; href: string }
  | { type: "group"; label: string; path: string; items: Category[] };

export async function Header() {
  const businessCategories = await getCategories("business_categories");
  const eventCategories = await getCategories("event_categories");

  const navItems: NavItem[] = [
    { type: "link", label: "Home", href: "/" },
    {
      type: "group",
      label: "Businesses",
      path: "businesses",
      items: [...businessCategories],
    },
    {
      type: "group",
      label: "Events",
      path: "events",
      items: [...eventCategories],
    },
  ];

  return (
    <header>
      <DesktopMenu
        businessCategories={businessCategories}
        eventCategories={eventCategories}
      />
      <MobileMenu navItems={navItems} />
    </header>
  );
}
