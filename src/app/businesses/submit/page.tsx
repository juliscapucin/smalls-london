import { PageWrapper } from "@/components/page-wrapper";
import { TypographyHeading } from "@/components/ui/typography-heading";

export default function Page() {
  return (
    <PageWrapper>
      <TypographyHeading tag="h1" variant="headline">
        Submit a Business
      </TypographyHeading>
      <p>
        Please fill out the form below to submit your business to our directory
      </p>
    </PageWrapper>
  );
}
