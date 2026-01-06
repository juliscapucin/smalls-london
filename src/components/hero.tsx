import Image from "next/image";
import { TypographyHeading } from "./ui/typography-heading";

export default function Hero() {
  return (
    <>
      <div className="block h-40 bg-accent-green" aria-hidden="true"></div>
      <div className="relative h-content overflow-clip">
        <TypographyHeading
          tag="h1"
          variant="display"
          className="absolute top-0 max-w-prose text-wrap bg-accent-orange z-10"
        >
          An Opinionated Guide to London's Best Small Businesses
        </TypographyHeading>
        <Image
          src="/images/hong-nguyen-FO-zQd7Wqio-unsplash.jpg"
          alt="Hero Image"
          fill
          sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"}
          className="h-full w-full object-cover"
        />
      </div>
    </>
  );
}
