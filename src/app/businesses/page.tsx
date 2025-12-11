import BusinessList from "@/components/businesses/business-list";
import { PageWrapper } from "@/components/layout";
import { getAllBusinesses } from "@/services/supabase/lib";

export default async function Page() {
  const businesses = await getAllBusinesses();

  return (
    <PageWrapper>
      <BusinessList businesses={businesses} />
    </PageWrapper>
  );
}
