import { PageWrapper } from "@/components/layout";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/services/supabase/lib/getCurrentUser";
import UserForm from "./user-form";
import { getUserById } from "@/services/supabase/lib/getUserById";

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
