import * as React from "react";
import NextLink from "next/link";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textClassnames = "uppercase";

type LinkVariant = "default" | "footer" | "inline";

const classVariants = cva("", {
  variants: {
    variant: {
      default:
        "inline-flex items-center justify-center rounded-[25px] border-2 border-transparent bg-background px-5 py-2 text-foreground hover:border-foreground hover:bg-accent-1 active:border-foreground active:bg-background focus-visible:border-foreground focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:border-foreground disabled:bg-background",
      footer:
        "inline-flex items-center justify-center rounded-full border-2 border-transparent px-2.5 py-1.5 text-foreground hover:underline hover:decoration-1 hover:underline-offset-2 active:underline active:decoration-1 active:underline-offset-2 focus-visible:border-ring focus-visible:underline focus-visible:decoration-1 focus-visible:underline-offset-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:border-ring disabled:underline disabled:decoration-1 disabled:underline-offset-2",
      inline:
        "inline-flex items-center justify-center rounded-full border-2 border-transparent px-2.5 py-1.5 text-muted-foreground underline decoration-1 underline-offset-2 hover:text-foreground active:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type LinkProps = React.ComponentProps<typeof NextLink> & {
  variant?: LinkVariant;
};

function Link(props: LinkProps) {
  const { className, variant, ...rest } = props;
  return (
    <NextLink
      {...rest}
      className={cn(textClassnames, classVariants({ variant }), className)}
    >
      {props.children}
    </NextLink>
  );
}

export { Link, classVariants, type LinkVariant };
