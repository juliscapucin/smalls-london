import { redirect } from "next/navigation";

import { getBusinessesByUserId } from "@/services/supabase/lib";
import { getCurrentUser } from "@/services/supabase/lib/getCurrentUser";

import { PageWrapper } from "@/components/layout";
import { BusinessForm, BusinessList } from "@/components/businesses";

export default async function Page() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/auth/login");
  }
  const businesses = await getBusinessesByUserId(currentUser.id);

  return (
    <PageWrapper>
      <BusinessForm currentUser={currentUser} />
      <BusinessList businesses={businesses} />
    </PageWrapper>
  );
}
