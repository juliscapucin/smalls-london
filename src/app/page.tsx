import Hero from "@/components/hero";
import PageWrapper from "@/components/page-wrapper";
import Navbar from "@/components/navbar";

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
