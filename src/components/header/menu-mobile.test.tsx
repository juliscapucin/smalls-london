import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MenuMobile } from "./menu-mobile";
import type { NavItem } from "./header";

const navItems: NavItem[] = [
  {
    label: "Businesses",
    path: "/businesses",
    items: [
      { id: "1", name: "design", label: "Design" },
      { id: "2", name: "beauty", label: "Beauty" },
    ],
  },
  {
    label: "Events",
    path: "/events",
    items: [
      { id: "3", name: "music", label: "Music" },
      { id: "4", name: "art", label: "Art" },
    ],
  },
];

describe("MenuMobile", () => {
  beforeEach(() => {
    global.innerWidth = 375;
    global.innerHeight = 667;
    global.dispatchEvent(new Event("resize"));
  });

  it("opens and closes the mobile menu", async () => {
    render(<MenuMobile navItems={navItems} />);
    const user = userEvent.setup();

    expect(
      screen.queryByRole("navigation", { name: /mobile menu/i }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /open menu/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("navigation", { name: /mobile menu/i }),
      ).toBeVisible();
    });

    await user.click(screen.getByLabelText(/close/i));

    await waitFor(() => {
      expect(
        screen.queryByRole("navigation", { name: /mobile menu/i }),
      ).not.toBeInTheDocument();
    });
  });

  it("shows category links when opened", async () => {
    render(<MenuMobile navItems={navItems} />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /open menu/i }));

    await waitFor(() => {
      const mobileMenu = screen.getByRole("navigation", {
        name: /mobile menu/i,
      });

      expect(within(mobileMenu).getByText("Businesses")).toBeVisible();
      expect(within(mobileMenu).getByText("Events")).toBeVisible();
    });
  });

  it("updates the search input value", async () => {
    render(<MenuMobile navItems={navItems} />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    const searchInput = await screen.findByRole("textbox", { name: /search/i });

    await user.type(searchInput, "summer markets");

    expect(searchInput).toHaveValue("summer markets");
  });

  it("renders the logo link to homepage", async () => {
    render(<MenuMobile navItems={navItems} />);

    const logoLink = screen.getByRole("link", {
      name: /smalls.london logo — homepage/i,
    });
    expect(logoLink).toBeVisible();
    expect(logoLink).toHaveAttribute("href", "/");
  });
});
