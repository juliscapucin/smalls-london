"use client";

import { useState } from "react";
import {
  deleteBusiness,
  updateBusiness,
} from "@/app/businesses/_actions/business";
import BusinessModal from "@/app/businesses/_components/business-modal";
import { Business } from "@/app/businesses/_types/business";

type BusinessListProps = {
  businesses: Business[];
};

export default function BusinessList({ businesses }: BusinessListProps) {
  return (
    <div className="space-y-16">
      <h2 className="mt-20">Businesses</h2>
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
