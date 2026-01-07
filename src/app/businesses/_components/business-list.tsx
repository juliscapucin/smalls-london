"use client";

import { useState } from "react";

import { deleteBusiness } from "@/app/businesses/_actions/business";
import BusinessModal from "@/app/businesses/_components/business-modal";
import { Business } from "@/app/businesses/_types/business";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { User } from "@/types/user";

type BusinessListProps = {
  businesses: Business[];
  currentUser: User | null;
};

export default function BusinessList({
  businesses,
  currentUser,
}: BusinessListProps) {
  const [businessToEdit, setBusinessToEdit] = useState<Business | null>(null);

  const handleEdit = (business: Business) => {
    setBusinessToEdit(business);
  };

  return (
    <>
      <div>
        {businesses.length === 0 ? (
          <p className="text-foreground">No businesses found.</p>
        ) : (
          businesses.map((business) => (
            <div
              className="space-y-8 border-t border-foreground pt-8 mb-8 first:mt-16"
              key={business.id}
            >
              <div className="max-w-prose space-y-4">
                <Heading tag="h3" variant="title">
                  {business.name}
                </Heading>
                <p>{business.description}</p>
                <p className="capitalize">Category: {business.category}</p>
              </div>
              {currentUser?.role === "admin" && (
                <Dialog onOpenChange={() => setBusinessToEdit(business)}>
                  <BusinessModal business={businessToEdit} />
                  <div className="space-x-8">
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        onClick={() => handleEdit(business)}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <Button
                      onClick={() => business.id && deleteBusiness(business.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Dialog>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
