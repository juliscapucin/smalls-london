import * as React from "react";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    variant?: "display" | "headline" | "title";
    children: React.ReactNode;
  };

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva(
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        display:
          "text-display-mobile md:text-display-tablet lg:text-display-desktop leading-display font-bold",
        headline:
          "text-headline-mobile md:text-headline-tablet lg:text-headline-desktop font-medium leading-headline",
        title:
          "text-title-mobile md:text-title-tablet lg:text-title-desktop leading-title",
      },
    },
    defaultVariants: {
      variant: "headline",
    },
  }
);

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ tag, className, variant, children, ...props }, ref) => {
    const Tag = tag;

    return (
      <Tag
        className={cn(headingVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = "Heading";

export { Heading, headingVariants };
