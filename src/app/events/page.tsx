import { getCurrentUser } from "@/lib/get-current-user";

import PageWrapper from "@/components/page-wrapper";
import { TypographyHeading } from "@/components/ui/typography-heading";

export default async function Page() {
  const currentUser = await getCurrentUser();

  return (
    <PageWrapper>
      <TypographyHeading tag="h1" className="mt-20">
        All Events
      </TypographyHeading>
      <p>Events List</p>
    </PageWrapper>
  );
}
