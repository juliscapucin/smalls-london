import { redirect } from "next/navigation";

import { getBusinessesByUserId } from "../_lib/getBusinessesByUserId";
import { getCurrentUser } from "@/lib/get-current-user";

import PageWrapper from "@/components/page-wrapper";
import { TypographyHeading } from "@/components/ui/typography-heading";
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
      <TypographyHeading tag="h1" className="mt-20">
        Businesses
      </TypographyHeading>
      <BusinessForm />
      <BusinessList businesses={businesses} currentUser={currentUser} />
    </PageWrapper>
  );
}
