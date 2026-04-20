"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/app/auth/_components/logout-button";
import type { JwtPayload } from "@supabase/supabase-js";
import { useScreenSize } from "@/hooks/useScreenSize";
import { User } from "@/types/user";

type AuthButtonProps = {
  variant: "desktop" | "mobile";
  user: User | JwtPayload | undefined;
  firstname?: string;
};

export function AuthButton({
  variant = "desktop",
  user,
  firstname,
}: AuthButtonProps) {
  const { isDesktop } = useScreenSize();

  if (variant === "desktop" && !isDesktop) {
    return null;
  } else if (variant === "mobile" && isDesktop) {
    return null;
  }

  const email = user?.email ?? "";
  const firstLetter = firstname
    ? firstname.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase();

  return user ? (
    <div
      className={`flex items-center gap-4 ${
        variant === "mobile" ? "mx-auto mt-8" : "flex-row"
      }`}
    >
      <Button variant="primary" size="md">
        <Link
          href="/user/profile"
          className="font-primary text-xl"
          aria-label="Go to User profile"
        >
          {firstLetter}
        </Link>
      </Button>
      <span className="hidden lg:block max-w-40 truncate">
        Hi, {firstname || email}
      </span>
      <LogoutButton />
    </div>
  ) : (
    <div className={`flex gap-2 ${variant === "mobile" ? "mx-auto mt-8" : ""}`}>
      <Button size="lg" variant="secondary">
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button size="lg" variant="primary">
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
