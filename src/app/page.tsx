import { Hero } from "@/components";
import { PageWrapper } from "@/components/layout";
import { Navbar } from "@/components";

export default function Home() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <Hero />
      </PageWrapper>
    </>
  );
}
