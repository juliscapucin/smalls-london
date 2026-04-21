import BusinessList from "@/app/businesses/_components/business-list";
import { PageWrapper } from "@/components/page-wrapper";
import { TypographyHeading } from "@/components/ui/typography/heading/typography-heading";

export default async function Page({
  params,
}: {
  params: Promise<{ searchString: string }>;
}) {
  const { searchString } = await params;
  const decodedSearchString = decodeURIComponent(searchString);

  return (
    <PageWrapper>
      <TypographyHeading tag="h1">
        {`Search results for "${decodedSearchString}"`}
      </TypographyHeading>
      <p>To be implemented</p>
    </PageWrapper>
  );
}
