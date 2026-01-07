import { getAllBusinesses } from "@/app/businesses/_lib/getAllBusinesses";

import BusinessList from "@/app/businesses/_components/business-list";
import PageWrapper from "@/components/page-wrapper";
import { Heading } from "@/components/ui/heading";

type PageProps = {
  params: {
    category: string;
  };
};

export default async function Page(props: PageProps) {
  const params = await props.params;
  const category = params.category;
  const businesses = await getAllBusinesses(category);

  return (
    <PageWrapper>
      <Heading tag="h1" className="mt-20 capitalize">
        {category}
      </Heading>
      <BusinessList businesses={businesses} />
    </PageWrapper>
  );
}
