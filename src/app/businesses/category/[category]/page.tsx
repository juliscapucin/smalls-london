import { getAllBusinesses } from "@/app/businesses/_lib/getAllBusinesses";

import BusinessList from "@/app/businesses/_components/business-list";
import { PageWrapper } from "@/components/page-wrapper";
import { TypographyHeading } from "@/components/ui/typography-heading";
import { getCurrentUser } from "@/lib/get-current-user";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const businesses = await getAllBusinesses(category);
  const currentUser = await getCurrentUser();

  if (!category) {
    return <PageWrapper>No category specified</PageWrapper>;
  }

  return (
    <PageWrapper>
      <TypographyHeading tag="h1" className="mt-20 capitalize">
        {category}
      </TypographyHeading>
      <BusinessList businesses={businesses} currentUser={currentUser} />
    </PageWrapper>
  );
}
