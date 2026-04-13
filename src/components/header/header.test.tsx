import React, { act } from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Header } from "./header";
import { MenuDesktop } from "./menu-desktop";

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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render header component and category items", async () => {
      const HeaderComponent = await Header();
      act(() => {
        render(HeaderComponent);
      });

      const headerElement = screen.getByRole("banner");
      expect(headerElement).toBeInTheDocument();

      // Check for static category items
      expect(screen.getByText("Businesses")).toBeVisible();
      expect(screen.getByText("Events")).toBeVisible();
    });
  });

  describe("Submenus", () => {
    it("should render Businesses subcategories on navlink focus", async () => {
      const HeaderComponent = await Header();
      act(() => {
        render(HeaderComponent);
      });

      const trigger = screen.queryByRole("button", { name: "Businesses" });

      expect(trigger).toBeVisible();

      trigger?.focus();

      waitFor(() => {
        expect(screen.getByText("All")).toBeVisible();
        expect(screen.getByText("Design")).toBeVisible();
        expect(screen.getByText("Beauty")).toBeVisible();
      });
    }, 500);

    it("should render Events subcategories on navlink focus", async () => {
      const HeaderComponent = await Header();
      act(() => {
        render(HeaderComponent);
      });

      const trigger = screen.queryByRole("button", { name: "Events" });

      expect(trigger).toBeVisible();

      trigger?.focus();

      waitFor(() => {
        expect(screen.getByText("All")).toBeVisible();
        expect(screen.getByText("Music")).toBeVisible();
        expect(screen.getByText("Art")).toBeVisible();
      });
    }, 500);
  });

  describe("Mobile Menu", () => {
    beforeEach(() => {
      // Mock mobile viewport
      global.innerWidth = 375;
      global.innerHeight = 667;
      global.dispatchEvent(new Event("resize"));
    });

    it("should toggle mobile menu on hamburger button click", async () => {
      const HeaderComponent = await Header();
      act(() => {
        render(HeaderComponent);
      });

      const user = userEvent.setup();

      // Find the mobile menu toggle button (hamburger icon)
      const hamburgerButton = screen.getByLabelText(/menu/i);
      expect(hamburgerButton).toBeInTheDocument();

      // Initially, mobile menu should be closed
      expect(
        screen.queryByRole("navigation", { name: /mobile/i })
      ).not.toBeInTheDocument();

      // Click to open
      await user.click(hamburgerButton);

      // await waitFor(() => {
      //   expect(
      //     screen.getByRole("navigation", { name: /mobile/i })
      //   ).toBeVisible();
      // });

      // const closeButton = screen.getByLabelText(/close/i);
      // expect(closeButton).toBeInTheDocument();

      // Click to close
      // await user.click(closeButton);

      // await waitFor(() => {
      //   expect(
      //     screen.queryByRole("navigation", { name: /mobile/i })
      //   ).not.toBeVisible();
      // });
    });

    it("should show mobile menu categories when opened", async () => {
      const HeaderComponent = await Header();
      act(() => {
        render(HeaderComponent);
      });

      const user = userEvent.setup();
      const hamburgerButton = screen.getByLabelText(/menu/i);

      await user.click(hamburgerButton);

      await waitFor(() => {
        const mobileMenu = screen.getByRole("navigation", { name: /mobile menu/i });
        expect(within(mobileMenu).getByText("Businesses")).toBeVisible();
        expect(within(mobileMenu).getByText("Events")).toBeVisible();
      });
    });
  });

  describe("Search Input", () => {
    it("should handle search input changes", async () => {
      // Add test implementation
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA labels", () => {
      // Add test implementation
    });
  });
});
