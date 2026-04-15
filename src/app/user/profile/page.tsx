import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/get-current-user";

import { PageWrapper } from "@/components/page-wrapper";
import UserForm from "../_components/user-form";
import { Button } from "@/components/ui/button/button";

export default async function Page() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/auth/login");
  }

  return (
    <PageWrapper>
      <UserForm currentUser={currentUser} />
      {currentUser.role === "admin" && (
        <Button className="mt-8">
          <Link href="/businesses/add">Add Businesses</Link>
        </Button>
      )}
    </PageWrapper>
  );
}
