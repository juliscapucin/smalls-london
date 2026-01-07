import BusinessList from "@/app/businesses/_components/business-list";
import PageWrapper from "@/components/page-wrapper";
import { TypographyHeading } from "@/components/ui/typography-heading";

export default async function Page() {
  return (
    <PageWrapper>
      <TypographyHeading tag="h1" className="mt-20 capitalize">
        Search Businesses
      </TypographyHeading>
      <BusinessList businesses={[]} />
    </PageWrapper>
  );
}
