import { getCategories } from "@/lib/get-categories";

import { MenuDesktop } from "./menu-desktop";
import { MenuMobile } from "./menu-mobile";
import { Category } from "@/types/category";

export type NavItem = {
  label: string;
  path: string;
  items?: Category[];
};

export async function Header() {
  const businessCategories = await getCategories("business_categories");
  const eventCategories = await getCategories("event_categories");

  // TODO: test if items are rendering correctly (query mock data)

  // Might add this to DB later
  const navItems: NavItem[] = [
    {
      label: "Businesses",
      path: "/businesses",
      items: [...businessCategories],
    },
    { label: "Events", path: "/events", items: [...eventCategories] },
  ];

  return (
    <header>
      <MenuDesktop navItems={navItems} />
      <MenuMobile navItems={navItems} />
    </header>
  );
}
