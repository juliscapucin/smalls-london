import { Suspense } from "react";

import { getCategories } from "@/lib/get-categories";

import { MenuDesktop } from "./menu-desktop";
import { MenuMobile } from "./menu-mobile";
import { AuthButton } from "@/app/auth/_components/auth-button";
import { Category } from "@/types/category";
import { createClient } from "@/services/supabase/server";
import { getUserById } from "@/lib/get-user-by-id";

export type NavItem = {
  label: string;
  path: string;
  items?: Category[];
};
// TODO: test if items are rendering correctly (query mock data)

export async function Header() {
  const businessCategories = await getCategories("business_categories");
  const eventCategories = await getCategories("event_categories");

  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  // Get user info from the token claims
  const user = await data?.claims;
  let firstname;

  if (user && user.sub) {
    // Fetch additional user details from the users database
    const userDetails = await getUserById(user.sub);
    firstname = userDetails?.full_name
      ? userDetails.full_name.split(" ")[0]
      : undefined;
  }

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
      <MenuDesktop navItems={navItems}>
        <Suspense>
          <AuthButton variant="desktop" user={user} firstname={firstname} />
        </Suspense>
      </MenuDesktop>
      <MenuMobile navItems={navItems}>
        <Suspense>
          <AuthButton variant="mobile" user={user} firstname={firstname} />
        </Suspense>
      </MenuMobile>
    </header>
  );
}
