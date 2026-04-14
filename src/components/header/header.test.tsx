import { act } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Header } from "./header";

// Network requests are handled by MSW (Mock Service Worker)
// in mocks/handlers.ts and vitest.setup.ts

// Only mock Next.js cookies since it's not a network request
vi.mock("next/headers", () => ({
  cookies: vi.fn(() => ({
    getAll: vi.fn(() => []),
    set: vi.fn(),
    get: vi.fn(),
  })),
}));

describe("Header Component", () => {
  it("renders desktop and mobile menu entry points", async () => {
    const HeaderComponent = await Header();
    act(() => {
      render(HeaderComponent);
    });
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: /desktop menu/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /open menu/i }),
    ).toBeInTheDocument();
  });

  it("renders the auth links on desktop viewport", async () => {
    global.innerWidth = 1280;
    global.innerHeight = 800;
    global.dispatchEvent(new Event("resize"));

    const HeaderComponent = await Header();
    act(() => {
      render(HeaderComponent);
    });

    const signInButton = screen.getByRole("link", { name: /sign in/i });
    expect(signInButton).toBeVisible();
    expect(signInButton).toHaveAttribute("href", "/auth/login");

    const signUpButton = screen.getByRole("link", { name: /sign up/i });
    expect(signUpButton).toBeVisible();
    expect(signUpButton).toHaveAttribute("href", "/auth/sign-up");
  });

  it("renders the auth links on mobile viewport", async () => {
    global.innerWidth = 375;
    global.innerHeight = 667;
    global.dispatchEvent(new Event("resize"));

    const HeaderComponent = await Header();
    act(() => {
      render(HeaderComponent);
    });

    const burgerButton = screen.getByRole("button", { name: /open menu/i });
    await userEvent.click(burgerButton);

    await waitFor(() => {
      expect(
        screen.getByRole("navigation", { name: /mobile menu/i }),
      ).toBeVisible();
    });

    const mobileMenu = screen.getByRole("navigation", { name: /mobile menu/i });

    const signInButton = within(mobileMenu).getByRole("link", {
      name: /sign in/i,
    });
    expect(signInButton).toBeVisible();
    expect(signInButton).toHaveAttribute("href", "/auth/login");

    const signUpButton = within(mobileMenu).getByRole("link", {
      name: /sign up/i,
    });
    expect(signUpButton).toBeVisible();
    expect(signUpButton).toHaveAttribute("href", "/auth/sign-up");
  });
});
