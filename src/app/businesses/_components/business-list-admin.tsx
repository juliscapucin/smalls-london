"use client";

import { useState } from "react";
import { deleteBusiness } from "@/app/businesses/_actions/business";
import BusinessModal from "@/app/businesses/_components/business-modal";
import { Business } from "@/app/businesses/_types/business";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

type BusinessListProps = {
  businesses: Business[];
};

export default function BusinessListAdmin({ businesses }: BusinessListProps) {
  const [businessToEdit, setBusinessToEdit] = useState<Business | null>(null);

  const handleEdit = (business: Business) => {
    setBusinessToEdit(business);
  };

  return (
    <>
      {businessToEdit && (
        <BusinessModal
          business={businessToEdit}
          onClose={() => setBusinessToEdit(null)}
        />
      )}
      <div>
        {businesses.length === 0 ? (
          <p className="text-foreground">No businesses found.</p>
        ) : (
          businesses.map((business) => (
            <div
              className="space-y-8 border-t border-secondary pt-8 mb-8 first:mt-16"
              key={business.id}
            >
              <div className="max-w-prose space-y-4">
                <Heading tag="h3" variant="title">
                  {business.name}
                </Heading>
                <p>{business.description}</p>
                <p className="capitalize">Category: {business.category}</p>
              </div>
              <div className="space-x-8">
                <Button
                  variant="secondary"
                  onClick={() => handleEdit(business)}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => business.id && deleteBusiness(business.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
