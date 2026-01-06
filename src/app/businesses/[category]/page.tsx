import { getAllBusinesses } from "@/app/businesses/_lib/getAllBusinesses";

import BusinessList from "@/app/businesses/_components/business-list";
import PageWrapper from "@/components/page-wrapper";
import { TypographyHeading } from "@/components/ui/typography-heading";

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
      <TypographyHeading tag="h1" className="mt-20 capitalize">
        {category}
      </TypographyHeading>
      <BusinessList businesses={businesses} />
    </PageWrapper>
  );
}
