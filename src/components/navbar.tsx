import Link from "next/link";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 right-0 flex justify-center border-b border-b-foreground/10 h-header z-50 bg-background">
      <div className="w-full max-w-desktop flex justify-between items-center p-3 px-5 text-body-medium">
        <Link href={"/"} className="uppercase font-bold">
          Smalls.London
        </Link>
        <Link href={"/businesses"} className="uppercase font-bold">
          Design
        </Link>
        <Link href={"/businesses"} className="uppercase font-bold">
          Beauty
        </Link>
        <Suspense>
          <AuthButton />
        </Suspense>
      </div>
    </nav>
  );
}
