"use client";

import { Business } from "@/app/businesses/_types/business";

type BusinessListProps = {
  businesses: Business[];
};

export default function BusinessList({ businesses }: BusinessListProps) {
  return (
    <div className="space-y-16">
      <h1 className="mt-20">Businesses</h1>
      {businesses.length === 0 ? (
        <p className="text-foreground">No businesses found.</p>
      ) : (
        businesses.map((business) => (
          <div className="space-y-8" key={business.id}>
            <div className="max-w-prose space-y-4">
              <h3 className="heading-title">{business.name}</h3>
              <p>{business.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
