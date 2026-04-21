import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const headingVariants = cva("font-brand uppercase", {
  variants: {
    variant: {
      display:
        "text-display-small md:text-display-medium lg:text-display-large leading-display-small md:leading-display-medium lg:leading-display-large tracking-display-small md:tracking-display-medium lg:tracking-display-large font-black",
      headline:
        "text-headline-small md:text-headline-medium lg:text-headline-large leading-headline-small md:leading-headline-medium lg:leading-headline-large tracking-headline-small md:tracking-headline-medium lg:tracking-headline-large font-black",
      title:
        "text-title-small md:text-title-medium lg:text-title-large leading-title-small md:leading-title-medium lg:leading-title-large tracking-title-small md:tracking-title-medium lg:tracking-title-large font-regular",
    },
    color: {
      default: "text-foreground",
      inverted: "text-background",
    },
  },
  defaultVariants: {
    variant: "headline",
    color: "default",
  },
});

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    tag: HeadingTag;
    children: React.ReactNode;
  };

function TypographyHeading({
  tag,
  className,
  variant,
  color,
  children,
  ...props
}: HeadingProps) {
  const Tag = tag;

  return (
    <Tag
      className={cn(headingVariants({ variant, color }), className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

export { TypographyHeading, headingVariants };
