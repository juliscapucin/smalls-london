import { getAllBusinesses } from "./_lib/getAllBusinesses";

import BusinessList from "./_components/business-list";
import PageWrapper from "@/components/page-wrapper";

export default async function Page() {
  const businesses = await getAllBusinesses();

  return (
    <PageWrapper>
      <BusinessList businesses={businesses} />
    </PageWrapper>
  );
}
