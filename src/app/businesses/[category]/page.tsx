import { getAllBusinesses } from "@/app/businesses/_lib/getAllBusinesses";

import BusinessList from "@/app/businesses/_components/business-list";
import PageWrapper from "@/components/page-wrapper";

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
      <h1 className="mt-32 capitalize">{category}</h1>
      <BusinessList businesses={businesses} />
    </PageWrapper>
  );
}
