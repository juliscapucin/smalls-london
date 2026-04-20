import type { Meta, StoryObj } from "@storybook/react";

import { MenuDesktop } from "./menu-desktop";
import { MenuMobile } from "./menu-mobile";
import type { NavItem } from "./header";

const navItems: NavItem[] = [
  {
    label: "Businesses",
    path: "/businesses",
    items: [
      { id: "1", name: "homeware", label: "Homeware" },
      { id: "2", name: "fashion", label: "Fashion" },
      { id: "3", name: "food-drink", label: "Food & Drink" },
    ],
  },
  {
    label: "Events",
    path: "/events",
    items: [
      { id: "4", name: "markets", label: "Markets" },
      { id: "5", name: "workshops", label: "Workshops" },
      { id: "6", name: "community", label: "Community" },
    ],
  },
];

const meta = {
  title: "Components/Header",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="gutter-stable bg-background text-foreground">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const MenuDesktopStory: Story = {
  name: "Menu Desktop",
  render: () => (
    <div className="h-80 bg-background">
      <MenuDesktop navItems={navItems}>
        <div className="text-sm">Auth slot</div>
      </MenuDesktop>
    </div>
  ),
  globals: {
    viewport: { value: "desktop", isRotated: false },
  },
};

export const MenuMobileStory: Story = {
  name: "Menu Mobile",
  render: () => (
    <div className="@container h-80 bg-background">
      <MenuMobile navItems={navItems}>
        <div className="text-sm px-2">Auth slot</div>
      </MenuMobile>
    </div>
  ),
  globals: {
    viewport: { value: "mobile1", isRotated: false },
  },
};
