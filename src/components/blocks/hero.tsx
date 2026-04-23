import Image from "next/image";
import { TypographyHeading } from "../ui/typography/heading/typography-heading";

// TODO: implement hero
// Copy: An Opinionated Guide to London's Best Small Creative Businesses

export default function Hero() {
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();

  return (
    <div className="relative h-content overflow-clip mt-(--height-header)">
      <TypographyHeading
        tag="h2"
        variant="headline"
        className="absolute top-0 right-0 z-10"
      >
        <span className="block">{month}</span>
        <span className="block">{year}</span>
      </TypographyHeading>

      <Image
        src="/images/hong-nguyen-FO-zQd7Wqio-unsplash.jpg"
        alt=""
        fill
        sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"}
        className="h-full w-full object-cover"
        loading="eager"
      />
    </div>
  );
}
