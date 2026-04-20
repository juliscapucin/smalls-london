import * as React from "react";
import NextLink from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textClassnames =
  "font-p-p-frama text-subline-small leading-label-large tracking-label-large uppercase";

const linkVariants = cva("", {
  variants: {
    variant: {
      default:
        "inline-flex items-center justify-center rounded-[25px] border-2 border-transparent bg-background px-5 py-2 text-foreground hover:border-foreground hover:bg-accent-1 active:border-foreground active:bg-background focus-visible:border-foreground focus-visible:bg-background focus-visible:shadow-[0_0_0_2px_var(--ring)]",
      footer:
        "inline-flex items-center justify-center rounded-full border-2 border-transparent px-2.5 py-1.5 text-foreground hover:underline hover:decoration-1 hover:underline-offset-2 active:underline active:decoration-1 active:underline-offset-2 focus-visible:border-ring focus-visible:underline focus-visible:decoration-1 focus-visible:underline-offset-2",
      inline:
        "inline-flex items-center justify-center rounded-full border-2 border-transparent px-2.5 py-1.5 text-muted-foreground underline decoration-1 underline-offset-2 hover:text-foreground active:text-foreground focus-visible:border-ring focus-visible:text-foreground",
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

type LinkVariants = VariantProps<typeof linkVariants>;

export type LinkVariant = NonNullable<LinkVariants["variant"]>;
type LinkProps = React.ComponentProps<typeof NextLink> & {
  variant?: LinkVariants["variant"];
};

function Link(props: LinkProps) {
  const { className, variant, ...rest } = props;
  return (
    <NextLink
      {...rest}
      className={cn(
        textClassnames,
        linkVariants({ variant }),
        "focus-visible:outline-none",
        className,
      )}
    >
      {props.children}
    </NextLink>
  );
}

export { Link, linkClassnames };
