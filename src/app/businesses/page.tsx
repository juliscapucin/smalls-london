import { getAllBusinesses } from "@/app/businesses/_lib/getAllBusinesses";

import BusinessList from "@/app/businesses/_components/business-list";
import PageWrapper from "@/components/page-wrapper";
import Head from "next/head";
import { Heading } from "@/components/ui/heading";

export default async function Page() {
  const businesses = await getAllBusinesses();

  return (
    <PageWrapper>
      <Heading tag="h1" className="mt-20">
        All Businesses
      </Heading>
      <BusinessList businesses={businesses} />
    </PageWrapper>
  );
}
