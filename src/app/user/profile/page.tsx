import Link from "next/link";
import { redirect } from "next/navigation";

import { getUserById } from "@/lib/get-user-by-id";
import { getCurrentUser } from "@/lib/get-current-user";

import PageWrapper from "@/components/page-wrapper";
import UserForm from "../_components/user-form";
import { getBusinessesByUserId } from "@/app/businesses/_lib/getBusinessesByUserId";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/auth/login");
  }

  const user = await getUserById(currentUser.id);

  return (
    <PageWrapper>
      <UserForm user={user} currentUser={currentUser} />
      <Button variant={"secondary"} className="mt-6">
        <Link href="/businesses/edit">Edit Businesses</Link>
      </Button>
      <Button className="ml-6">
        <Link href="/businesses/add">Add Businesses</Link>
      </Button>
    </PageWrapper>
  );
}
