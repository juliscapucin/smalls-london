import type { Meta, StoryObj } from "@storybook/react";
import Link from "next/link";

import { MenuDesktop } from "./menu-desktop";
import { MenuMobile } from "./menu-mobile";
import type { NavItem } from "./header";
import { Button } from "@/components/ui/button";

type HeaderStoryArgs = {
  isAuthenticated: boolean;
};

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
  args: {
    isAuthenticated: false,
  },
  argTypes: {
    isAuthenticated: {
      control: "boolean",
      description: "Toggle between signed-out and signed-in auth buttons",
    },
  },
  decorators: [
    (Story) => (
      <div className="gutter-stable bg-background text-foreground">
        <Story />
      </div>
    ),
  ],
  globals: {
    backgrounds: {
      value: "light",
    },
  },
} satisfies Meta<HeaderStoryArgs>;

export default meta;

type Story = StoryObj<HeaderStoryArgs>;

type MockAuthButtonsProps = {
  isAuthenticated: boolean;
  variant: "desktop" | "mobile";
};

function MockAuthButtons({ isAuthenticated, variant }: MockAuthButtonsProps) {
  if (isAuthenticated) {
    return (
      <div className={`flex items-center gap-2 ${variant === "mobile" ? "mx-auto mt-8" : ""}`}>
        <Button variant="primary" size="md" aria-label="Go to User profile">
          <Link href="/user/profile">J</Link>
        </Button>
        <span className="hidden lg:block">Hi, Jules</span>
        <Button variant="secondary" size="md">
          Log out
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex gap-2 ${variant === "mobile" ? "mx-auto mt-8" : ""}`}>
      <Button size="lg" variant="secondary">
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button size="lg" variant="primary">
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}

export const MenuDesktopStory: Story = {
  name: "Menu Desktop",
  render: ({ isAuthenticated }) => (
    <div className="h-80">
      <MenuDesktop navItems={navItems}>
        <MockAuthButtons isAuthenticated={isAuthenticated} variant="desktop" />
      </MenuDesktop>
    </div>
  ),
  globals: {
    viewport: { value: "desktop", isRotated: false },
  },
};

export const MenuMobileStory: Story = {
  name: "Menu Mobile",
  render: ({ isAuthenticated }) => (
    <div className="@container h-80">
      <MenuMobile navItems={navItems}>
        <MockAuthButtons isAuthenticated={isAuthenticated} variant="mobile" />
      </MenuMobile>
    </div>
  ),
  globals: {
    viewport: { value: "mobile1", isRotated: false },
  },
};

export const AuthenticatedDesktop: Story = {
  name: "Authenticated (Desktop)",
  args: {
    isAuthenticated: true,
  },
  render: MenuDesktopStory.render,
  globals: {
    viewport: { value: "desktop", isRotated: false },
  },
};

export const AuthenticatedMobile: Story = {
  name: "Authenticated (Mobile)",
  args: {
    isAuthenticated: true,
  },
  render: MenuMobileStory.render,
  globals: {
    viewport: { value: "mobile1", isRotated: false },
  },
};
