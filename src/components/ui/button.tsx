import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { linkClassnames } from "@/components/ui/link";

const buttonVariants = cva(
  "inline-flex text-sm items-center justify-center gap-2 whitespace-nowrap rounded-full transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background hover:bg-accent-orange uppercase",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 uppercase",
        outline:
          "border-[2px] border-foreground bg-background hover:bg-accent hover:text-accent-foreground uppercase",
        secondary:
          "bg-accent-yellow text-foreground hover:bg-foreground/80 uppercase",
        ghost: "hover:bg-accent hover:text-accent-foreground uppercase",
        link: linkClassnames, // reuse link styles
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-10 rounded-full px-8",
        icon: "size-10 aspect-square",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
