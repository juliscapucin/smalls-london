import { redirect } from "next/navigation";

import { getBusinessesByUserId } from "../_lib/getBusinessesByUserId";
import { getCurrentUser } from "@/lib/get-current-user";

import PageWrapper from "@/components/page-wrapper";
import BusinessForm from "../_components/business-form";
import BusinessList from "../_components/business-list";

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
