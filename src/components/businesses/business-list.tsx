"use client";

import { useState } from "react";
import {
  deleteBusiness,
  updateBusiness,
} from "@/services/supabase/actions/businesses";
import { Tables } from "@/services/supabase/types/database";
import { BusinessModal } from "@/components/businesses";

type BusinessListProps = {
  businesses: Tables<"businesses">[];
};

export default function BusinessList({ businesses }: BusinessListProps) {
  const [businessToEdit, setBusinessToEdit] =
    useState<Tables<"businesses"> | null>(null);

  const handleDelete = async (id: string) => {
    const { errorMessage } = await deleteBusiness(id);

    if (errorMessage) {
      alert("Error deleting business: " + errorMessage);
    } else {
      alert("Business deleted successfully!");
      location.reload();
    }
  };

  const handleEdit = (business: Tables<"businesses">) => {
    setBusinessToEdit(business);
  };

  const handleSave = async (
    id: string,
    newBusiness: Partial<Tables<"businesses">>
  ) => {
    const { errorMessage } = await updateBusiness(id, newBusiness);
    if (errorMessage) {
      alert("Error editing business: " + errorMessage);
    } else {
      alert("Business edited successfully!");
      location.reload();
      setBusinessToEdit(null);
    }
  };

  return (
    <>
      {businessToEdit && (
        <BusinessModal
          business={businessToEdit}
          onClose={() => setBusinessToEdit(null)}
          onSave={handleSave}
        />
      )}
      <div className="space-y-8">
        <h2 className="heading-headline mt-20">Businesses</h2>
        {businesses.length === 0 ? (
          <p className="text-foreground">No businesses found.</p>
        ) : (
          businesses.map((business) => (
            <div className="flex justify-between" key={business.id}>
              <div>
                <h3 className="heading-title">{business.name}</h3>
                <p>{business.description}</p>
              </div>
              <div className="space-x-8">
                <button onClick={() => handleEdit(business)}>Edit</button>
                <button onClick={() => handleDelete(business.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
