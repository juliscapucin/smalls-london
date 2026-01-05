import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/get-current-user";
import { getAllBusinesses } from "@/app/businesses/_lib/getAllBusinesses";

import BusinessListAdmin from "@/app/businesses/_components/business-list-admin";
import PageWrapper from "@/components/page-wrapper";

export default async function Page() {
  const businesses = await getAllBusinesses();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/auth/login");
  }

  return (
    <PageWrapper>
      <BusinessListAdmin businesses={businesses} />
    </PageWrapper>
  );
}
