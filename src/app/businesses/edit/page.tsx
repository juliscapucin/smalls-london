import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/get-current-user";
import { getAllBusinesses } from "@/app/businesses/_lib/getAllBusinesses";

import BusinessList from "@/app/businesses/_components/business-list";
import PageWrapper from "@/components/page-wrapper";
import { Heading } from "@/components/ui/heading";

export default async function Page() {
  const businesses = await getAllBusinesses();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/auth/login");
  }

  return (
    <PageWrapper>
      <Heading tag="h1" className="mt-20">
        Edit Businesses
      </Heading>
      <BusinessList businesses={businesses} currentUser={currentUser} />
    </PageWrapper>
  );
}
