"use client";

import { Business } from "@/app/businesses/_types/business";
import { Heading } from "@/components/ui/heading";

type BusinessListProps = {
  businesses: Business[];
};

export default function BusinessList({ businesses }: BusinessListProps) {
  return (
    <div className="space-y-16">
      {businesses.length === 0 ? (
        <p className="text-foreground">No businesses found.</p>
      ) : (
        businesses.map((business) => (
          <div className="space-y-8" key={business.id}>
            <div className="max-w-prose space-y-4">
              <Heading tag="h3" variant="title">
                {business.name}
              </Heading>
              <p>{business.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
