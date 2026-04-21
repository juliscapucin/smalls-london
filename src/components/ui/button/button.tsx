import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textSize = {
  xs: "text-label-small leading-label-small tracking-label-small",
  sm: "text-label-small leading-label-small tracking-label-small",
  md: "text-label-medium leading-label-medium tracking-label-medium",
  lg: "text-label-large leading-label-large tracking-label-large",
};

const classVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-3xl border-2 border-transparent font-p-p-frama font-normal transition-colors disabled:pointer-events-none cursor-pointer uppercase",
  {
    variants: {
      variant: {
        primary:
          "bg-button-primary-background text-button-primary-foreground hover:bg-button-primary-hover-background active:bg-button-primary-active-background focus-visible:bg-button-primary-hover-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:bg-button-primary-disabled-background disabled:text-button-primary-disabled-foreground",
        secondary:
          "border-button-secondary-border bg-button-secondary-background text-button-secondary-foreground hover:bg-button-secondary-hover-background active:bg-button-secondary-active-background focus-visible:bg-button-secondary-hover-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:bg-button-secondary-disabled-background disabled:text-button-secondary-disabled-foreground disabled:border-button-secondary-disabled-foreground",
        ghost:
          "bg-button-ghost-background text-button-ghost-foreground hover:bg-button-ghost-hover-background hover:border-button-ghost-border active:bg-button-ghost-active-background active:border-button-ghost-border focus-visible:bg-button-ghost-active-background focus-visible:border-button-ghost-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:text-button-ghost-disabled-foreground",
      },
      size: {
        icon: "size-10 aspect-square",
        xs: "h-6 px-2",
        sm: "h-8 px-4",
        md: "h-10 px-4",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof classVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, disabled, type, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type ?? "button"}
        disabled={disabled}
        className={cn(classVariants({ variant, size }), className)}
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

export { Button, classVariants };
