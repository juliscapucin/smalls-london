import * as React from "react";
import NextLink from "next/link";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textClassnames = "uppercase";

// Exporting state styles for use in stories forced state matrix
export const linkStateStyles = {
  default: {
    hover: "border-foreground bg-accent-1",
    active: "border-foreground bg-background",
    focus: "border-foreground bg-background ring-2 ring-ring ring-offset-2",
    disabled: "border-foreground bg-background",
  },
  footer: {
    hover: "underline decoration-1 underline-offset-2",
    active: "underline decoration-1 underline-offset-2",
    focus:
      "border-ring underline decoration-1 underline-offset-2 ring-2 ring-ring ring-offset-2",
    disabled: "border-ring underline decoration-1 underline-offset-2",
  },
  inline: {
    hover: "text-foreground",
    active: "text-foreground",
    focus: "border-ring text-foreground ring-2 ring-ring ring-offset-2",
    disabled: "border-ring text-foreground",
  },
} as const;

export type LinkVariant = keyof typeof linkStateStyles;
type LinkStateKey = keyof (typeof linkStateStyles)["default"];
export type LinkState = "default" | LinkStateKey;

function prefixClasses(prefix: string, classnames: string) {
  return classnames
    .split(" ")
    .filter(Boolean)
    .map((classname) => `${prefix}:${classname}`)
    .join(" ");
}

function getInteractionClasses(variant: LinkVariant) {
  const styles = linkStateStyles[variant];
  return cn(
    prefixClasses("hover", styles.hover),
    prefixClasses("active", styles.active),
    prefixClasses("focus-visible", styles.focus),
    prefixClasses("disabled", styles.disabled),
  );
}

const linkVariants = cva("", {
  variants: {
    variant: {
      default: `inline-flex items-center justify-center rounded-[25px] border-2 border-transparent bg-background px-5 py-2 text-foreground ${getInteractionClasses("default")}`,
      footer: `inline-flex items-center justify-center rounded-full border-2 border-transparent px-2.5 py-1.5 text-foreground ${getInteractionClasses("footer")}`,
      inline: `inline-flex items-center justify-center rounded-full border-2 border-transparent px-2.5 py-1.5 text-muted-foreground underline decoration-1 underline-offset-2 ${getInteractionClasses("inline")}`,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const linkClassnames = cn(
  textClassnames,
  "text-foreground underline decoration-1 underline-offset-2",
);

type LinkProps = React.ComponentProps<typeof NextLink> & {
  variant?: LinkVariant;
};

function Link(props: LinkProps) {
  const { className, variant, ...rest } = props;
  return (
    <NextLink
      {...rest}
      className={cn(textClassnames, linkVariants({ variant }), className)}
    >
      {props.children}
    </NextLink>
  );
}

export { Link, linkClassnames };
