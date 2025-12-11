"use client";

import { deleteBusiness } from "@/services/supabase/actions/businesses";
import { Tables } from "@/services/supabase/types/database";

type BusinessListProps = {
  businesses: Tables<"businesses">[];
};

export default function BusinessList({ businesses }: BusinessListProps) {
  const handleDelete = async (id: string) => {
    const { errorMessage } = await deleteBusiness(id);

    if (errorMessage) {
      alert("Error deleting business: " + errorMessage);
    } else {
      alert("Business deleted successfully!");
      location.reload();
    }
  };

  return (
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
              <button>Edit</button>
              <button onClick={() => handleDelete(business.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
