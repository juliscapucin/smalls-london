import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const linkClassnames = "underline-offset-4 underline";

function InternalLink(props: React.ComponentProps<typeof Link>) {
  const { className, ...rest } = props;
  return (
    <Link {...rest} className={cn(linkClassnames, className)}>
      {props.children}
    </Link>
  );
}

function ExternalLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { className, ...rest } = props;
  return (
    <a
      {...rest}
      className={cn(linkClassnames, className)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  );
}

export { InternalLink, ExternalLink, linkClassnames };
