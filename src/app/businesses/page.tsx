import { getAllBusinesses } from "@/app/businesses/_lib/getAllBusinesses";
import { getCurrentUser } from "@/lib/get-current-user";

import PageWrapper from "@/components/page-wrapper";
import { Heading } from "@/components/ui/heading";
import BusinessList from "./_components/business-list";

export default async function Page() {
  const businesses = await getAllBusinesses();
  const currentUser = await getCurrentUser();

  return (
    <PageWrapper>
      <Heading tag="h1" className="mt-20">
        All Businesses
      </Heading>
      <BusinessList businesses={businesses} currentUser={currentUser} />
    </PageWrapper>
  );
}
