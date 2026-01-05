import Link from "next/link";
import { Suspense } from "react";
import { AuthButton } from "@/app/auth/_components/auth-button";
import Logo from "./logo";

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 right-0 flex justify-center border-b border-b-foreground/10 h-header z-50 bg-primary">
      <div className="w-full max-w-desktop flex justify-between items-center p-3 px-5 text-body-tablet">
        <Link href={"/"} className="uppercase font-bold">
          <Logo />
        </Link>
        <Link href={"/businesses"} className="uppercase">
          Explore
        </Link>
        <Link href={"/businesses/beauty"} className="uppercase">
          Beauty
        </Link>
        <Suspense>
          <AuthButton />
        </Suspense>
      </div>
    </nav>
  );
}
