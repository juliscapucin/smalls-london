import { redirect } from "next/navigation";
import { getCurrentUser } from "@/services/supabase/lib/getCurrentUser";
import { getUserById } from "@/services/supabase/lib/getUserById";

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
