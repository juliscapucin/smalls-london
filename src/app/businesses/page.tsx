import { getAllBusinesses } from "@/app/businesses/_lib/getAllBusinesses";
import { getCurrentUser } from "@/lib/get-current-user";

import { PageWrapper } from "@/components/page-wrapper";
import { TypographyHeading } from "@/components/ui/typography-heading";
import BusinessList from "./_components/business-list";

export default async function Page() {
  const businesses = await getAllBusinesses();
  const currentUser = await getCurrentUser();

  return (
    <PageWrapper>
      <TypographyHeading tag="h1" className="mt-20">
        All Businesses
      </TypographyHeading>
      <BusinessList businesses={businesses} currentUser={currentUser} />
    </PageWrapper>
  );
}
