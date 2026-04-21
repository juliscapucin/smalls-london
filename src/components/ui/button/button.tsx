import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textSize = {
  xs: "text-label-small leading-label-small tracking-label-small",
  sm: "text-label-small leading-label-small tracking-label-small",
  md: "text-label-medium leading-label-medium tracking-label-medium",
  lg: "text-label-large leading-label-large tracking-label-large",
};

// Exporting state styles for use in stories forced state matrix
export const buttonStateStyles = {
  primary: {
    hover: "bg-button-primary-hover-background",
    active: "bg-button-primary-active-background",
    focus: "bg-button-primary-hover-background ring-2 ring-ring ring-offset-2",
    disabled:
      "bg-button-primary-disabled-background text-button-primary-disabled-foreground",
  },
  secondary: {
    hover: "bg-button-secondary-hover-background",
    active: "bg-button-secondary-active-background",
    focus:
      "bg-button-secondary-hover-background ring-2 ring-ring ring-offset-2",
    disabled:
      "bg-button-secondary-disabled-background text-button-secondary-disabled-foreground border-button-secondary-disabled-foreground",
  },
  ghost: {
    hover: "bg-button-ghost-hover-background border-button-ghost-border",
    active: "bg-button-ghost-active-background border-button-ghost-border",
    focus:
      "bg-button-ghost-active-background border-button-ghost-border ring-2 ring-ring ring-offset-2",
    disabled: "text-button-ghost-disabled-foreground",
  },
} as const;

type ButtonVariant = keyof typeof buttonStateStyles;

function prefixClasses(prefix: string, classnames: string) {
  return classnames
    .split(" ")
    .filter(Boolean)
    .map((classname) => `${prefix}:${classname}`)
    .join(" ");
}

function getInteractionClasses(variant: ButtonVariant) {
  const styles = buttonStateStyles[variant];
  return [
    prefixClasses("hover", styles.hover),
    prefixClasses("active", styles.active),
    prefixClasses("focus-visible", styles.focus),
    prefixClasses("disabled", styles.disabled),
  ].join(" ");
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-3xl border-2 border-transparent font-p-p-frama font-normal transition-colors disabled:pointer-events-none cursor-pointer uppercase",
  {
    variants: {
      variant: {
        primary: `bg-button-primary-background text-button-primary-foreground ${getInteractionClasses("primary")}`,
        secondary: `border-button-secondary-border bg-button-secondary-background text-button-secondary-foreground ${getInteractionClasses("secondary")}`,
        ghost: `bg-button-ghost-background text-button-ghost-foreground ${getInteractionClasses("ghost")}`,
      },
      size: {
        icon: "size-10 aspect-square",
        xs: "h-6 px-2",
        sm: "h-8 px-4",
        md: "h-10 px-4",
        lg: "h-12 px-6",
      },
      state: {
        default: "",
        hover: "",
        active: "",
        focus: "",
        disabled: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      state: "default",
    },
  },
);

export type ButtonState = "default" | "hover" | "active" | "focus" | "disabled";

export interface ButtonProps
  extends
    React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, disabled, type, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type ?? "button"}
        disabled={disabled}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        <span className={cn(textSize[size as keyof typeof textSize])}>
          {children}
        </span>
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
