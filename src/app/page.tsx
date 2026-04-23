import Hero from "@/components/blocks/hero";
import { CategoryHeader } from "@/components/blocks/category-header";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryHeader color="accent-3" label="An opinionated catalog" />
    </>
  );
}
