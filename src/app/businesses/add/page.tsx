import { redirect } from "next/navigation";

import { getBusinessesByUserId } from "../_lib/getBusinessesByUserId";
import { getCurrentUser } from "@/lib/get-current-user";

import PageWrapper from "@/components/page-wrapper";
import { Heading } from "@/components/ui/heading";
import BusinessForm from "../_components/business-form";
import BusinessList from "../_components/business-list-admin";

export default async function Page() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/auth/login");
  }
  const businesses = await getBusinessesByUserId(currentUser.id);

  return (
    <PageWrapper>
      <Heading tag="h1" className="mt-20">
        Add Businesses
      </Heading>
      <BusinessForm />
      <BusinessList businesses={businesses} />
    </PageWrapper>
  );
}
