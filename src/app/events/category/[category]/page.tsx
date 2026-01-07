import { PageWrapper } from "@/components/page-wrapper";
import { TypographyHeading } from "@/components/ui/typography-heading";
import { getCurrentUser } from "@/lib/get-current-user";

type PageProps = {
  params: {
    category: string;
  };
};

export default async function Page(props: PageProps) {
  const params = await props.params;
  const category = params.category;

  if (!category) {
    return <PageWrapper>No category specified</PageWrapper>;
  }

  return (
    <PageWrapper>
      <TypographyHeading tag="h1" className="mt-20 capitalize">
        {category}
      </TypographyHeading>
      <p>Events List</p>
    </PageWrapper>
  );
}
