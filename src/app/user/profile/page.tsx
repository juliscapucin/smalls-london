import { redirect } from "next/navigation";
import { getCurrentUser, getUserById } from "@/lib/user";

import PageWrapper from "@/components/page-wrapper";
import UserForm from "../_components/user-form";

export default async function Page() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/auth/login");
  }

  const user = await getUserById(currentUser.id);

  return (
    <PageWrapper>
      <UserForm user={user} currentUser={currentUser} />
    </PageWrapper>
  );
}
