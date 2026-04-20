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
      expect(button).toHaveClass("bg-button-primary-background");
      expect(button).toHaveClass("h-10");
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
      ["primary", "bg-button-primary-background"],
      ["secondary", "bg-button-secondary-background"],
      ["ghost", "bg-button-ghost-background"],
    ] as const)("applies %s variant styles", (variant, classToken) => {
      render(<Button variant={variant}>Action</Button>);

      expect(screen.getByRole("button", { name: "Action" })).toHaveClass(
        classToken,
      );
    });

    it.each([
      ["xs", "h-6"],
      ["sm", "h-8"],
      ["md", "h-10"],
      ["lg", "h-12"],
      ["icon", "size-10"],
    ] as const)("applies %s size styles", (size, classToken) => {
      render(<Button size={size}>Action</Button>);

      expect(screen.getByRole("button", { name: "Action" })).toHaveClass(
        classToken,
      );
    });

    it.each([
      ["default", "default"],
      ["hover", "hover"],
      ["active", "active"],
      ["focus", "focus"],
      ["disabled", "disabled"],
    ] as const)("applies %s state as data attribute", (state, value) => {
      render(<Button state={state}>Action</Button>);

      expect(screen.getByRole("button", { name: "Action" })).toHaveAttribute(
        "data-state",
        value,
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

    it("treats the focus state as a visual state, but keeps the button enabled", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <Button state="focus" onClick={onClick}>
          Save
        </Button>,
      );

      const button = screen.getByRole("button", { name: "Save" });
      await user.click(button);

      expect(button).toHaveAttribute("data-state", "focus");
      expect(button).not.toBeDisabled();
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("edge cases", () => {
    it("renders with base styles even when runtime-invalid variant or size values are provided", () => {
      render(
        <Button variant={"invalid-variant" as never} size={"invalid-size" as never}>
          Action
        </Button>,
      );

      const button = screen.getByRole("button", { name: "Action" });
      expect(button).toHaveClass("inline-flex");
      expect(button).toHaveClass("rounded-3xl");
    });

    it("forwards refs to the rendered element", () => {
      const ref = React.createRef<HTMLButtonElement>();

      render(<Button ref={ref}>Ref target</Button>);

      expect(ref.current).toBe(screen.getByRole("button", { name: "Ref target" }));
    });
  });
});
