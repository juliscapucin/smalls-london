import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/services/supabase/server";
import { LogoutButton } from "@/app/auth/_components/logout-button";
import { getUserById } from "@/lib/get-user-by-id";

type AuthButtonProps = {
  variant?: "desktop" | "mobile";
};

export async function AuthButton({ variant = "desktop" }: AuthButtonProps) {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  // Get user info from the token claims
  const user = await data?.claims;

  let firstName = "";
  let firstLetter = "";

  if (user && user.sub && user.email) {
    // Fetch additional user details from the users database
    const userDetails = await getUserById(user.sub);
    firstName = userDetails?.full_name
      ? userDetails.full_name.split(" ")[0]
      : "";

    firstLetter = firstName
      ? firstName.charAt(0).toUpperCase()
      : user.email.charAt(0).toUpperCase();
  }

  return user ? (
    <div
      className={`flex items-center gap-4 ${
        variant === "mobile" ? "mx-auto mt-8" : "flex-row"
      }`}
    >
      <Button variant="primary" size="icon" asChild>
        <Link
          href="/user/profile"
          className="font-primary text-xl"
          aria-label="Go to User profile"
        >
          {firstLetter}
        </Link>
      </Button>{" "}
      <span className="hidden lg:block max-w-40 truncate">
        Hi, {firstName || user.email}
      </span>
      <LogoutButton />
    </div>
  ) : (
    <div className={`flex gap-2 ${variant === "mobile" ? "mx-auto mt-8" : ""}`}>
      <Button asChild size="lg" variant="outline">
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="lg" variant="primary">
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
