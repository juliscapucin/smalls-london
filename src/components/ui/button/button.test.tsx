import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "./button";

describe("Button", () => {
  describe("rendering defaults", () => {
    it("renders a native button with default variant and size styles", () => {
      render(<Button>Save</Button>);

      const button = screen.getByRole("button", { name: "Save" });

      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
      expect(button).toHaveClass("inline-flex");
      expect(button).toHaveClass("bg-foreground");
      expect(button).toHaveClass("h-9");
    });

    it("merges consumer className with component classes", () => {
      render(<Button className="custom-class">Save</Button>);

      const button = screen.getByRole("button", { name: "Save" });
      expect(button).toHaveClass("custom-class");
      expect(button).toHaveClass("inline-flex");
    });
  });

  describe("variants and sizes", () => {
    it.each([
      ["primary", "bg-foreground"],
      ["secondary", "bg-accent-yellow"],
      ["destructive", "bg-destructive"],
      ["outline", "border-[2px]"],
      ["ghost", "hover:bg-accent"],
      ["link", "underline"],
    ] as const)("applies %s variant styles", (variant, classToken) => {
      render(<Button variant={variant}>Action</Button>);

      expect(screen.getByRole("button", { name: "Action" })).toHaveClass(
        classToken,
      );
    });

    it.each([
      ["default", "h-9"],
      ["sm", "h-8"],
      ["lg", "h-10"],
      ["icon", "size-10"],
    ] as const)("applies %s size styles", (size, classToken) => {
      render(<Button size={size}>Action</Button>);

      expect(screen.getByRole("button", { name: "Action" })).toHaveClass(
        classToken,
      );
    });
  });

  describe("native props and interactions", () => {
    it("forwards native button attributes", () => {
      render(
        <Button type="submit" aria-label="Submit form">
          Submit
        </Button>,
      );

      const button = screen.getByRole("button", { name: "Submit form" });
      expect(button).toHaveAttribute("type", "submit");
    });

    it("calls onClick when enabled", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(<Button onClick={onClick}>Save</Button>);
      await user.click(screen.getByRole("button", { name: "Save" }));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <Button disabled onClick={onClick}>
          Save
        </Button>,
      );
      const button = screen.getByRole("button", { name: "Save" });
      await user.click(button);

      expect(button).toBeDisabled();
      expect(button).toHaveClass("disabled:pointer-events-none");
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("asChild behavior and edge cases", () => {
    it("renders child element with forwarded classes and props when asChild is true", () => {
      render(
        <Button asChild variant="link">
          <a href="/account">Account</a>
        </Button>,
      );

      const link = screen.getByRole("link", { name: "Account" });
      expect(link).toHaveAttribute("href", "/account");
      expect(link).toHaveClass("inline-flex");
      expect(link).toHaveClass("underline");
    });

    it("renders with base styles even when runtime-invalid variant or size values are provided", () => {
      render(
        <Button variant={"invalid-variant" as never} size={"invalid-size" as never}>
          Action
        </Button>,
      );

      const button = screen.getByRole("button", { name: "Action" });
      expect(button).toHaveClass("inline-flex");
      expect(button).toHaveClass("rounded-full");
    });

    it("renders without crashing when asChild is true and no child is provided", () => {
      const { container } = render(<Button asChild />);

      expect(container).toBeEmptyDOMElement();
    });

    it("forwards refs to the rendered element", () => {
      const ref = React.createRef<HTMLButtonElement>();

      render(<Button ref={ref}>Ref target</Button>);

      expect(ref.current).toBe(screen.getByRole("button", { name: "Ref target" }));
    });
  });
});
