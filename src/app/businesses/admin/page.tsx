import { getAllBusinesses } from "@/app/businesses/_lib/getAllBusinesses";

import BusinessListAdmin from "@/app/businesses/_components/business-list-admin";
import PageWrapper from "@/components/page-wrapper";

export default async function Page() {
  const businesses = await getAllBusinesses();

  return (
    <PageWrapper>
      <BusinessListAdmin businesses={businesses} />
    </PageWrapper>
  );
}
