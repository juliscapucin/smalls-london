import Image from "next/image";
import { TypographyHeading } from "../ui/typography-heading";

// TODO: implement hero
// Copy: An Opinionated Guide to London's Best Small Creative Businesses

export default function Hero() {
  return (
    <div className="relative h-content overflow-clip mt-(--height-header)">
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <TypographyHeading
          tag="h1"
          variant="display"
          className="max-w-desktop mx-auto"
        >
          To be implemented
        </TypographyHeading>
        <div
          className="absolute inset-0 bg-accent-2 -z-1"
          aria-hidden="true"
        ></div>
      </div>
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
