import { render, screen, waitFor } from "@testing-library/react";

import { MenuDesktop } from "./menu-desktop";
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

describe("MenuDesktop", () => {
  it("renders top-level navigation items", () => {
    render(<MenuDesktop navItems={navItems} />);

    expect(screen.getByRole("button", { name: "Businesses" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Events" })).toBeVisible();
  });

  it("shows Businesses submenu categories on focus", async () => {
    render(<MenuDesktop navItems={navItems} />);

    screen.getByRole("button", { name: "Businesses" }).focus();

    await waitFor(() => {
      expect(screen.getByText("All")).toBeVisible();
      expect(screen.getByText("Design")).toBeVisible();
      expect(screen.getByText("Beauty")).toBeVisible();
    });
  });

  it("shows Events submenu categories on focus", async () => {
    render(<MenuDesktop navItems={navItems} />);

    screen.getByRole("button", { name: "Events" }).focus();

    await waitFor(() => {
      expect(screen.getByText("All")).toBeVisible();
      expect(screen.getByText("Music")).toBeVisible();
      expect(screen.getByText("Art")).toBeVisible();
    });
  });

  it("renders the logo link to homepage", async () => {
    render(<MenuDesktop navItems={navItems} />);

    const logoLink = screen.getByRole("link", {
      name: /smalls.london logo — homepage/i,
    });
    expect(logoLink).toBeVisible();
    expect(logoLink).toHaveAttribute("href", "/");
  });
});
