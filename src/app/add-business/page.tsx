"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { redirect } from "next/navigation";

import { PageWrapper } from "@/components/layout";
import { createClient } from "@/services/supabase/client";
import { Tables } from "@/services/supabase/types/database";

import { useCurrentUser } from "@/services/supabase/hooks/useCurrentUser";

export default function Page() {
  const [businesses, setBusinesses] = useState<Tables<"businesses">[]>([]);
  const [newBusiness, setNewBusiness] = useState({
    name: "",
    description: "",
    owner_id: "",
  });

  const currentUser = useCurrentUser();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("businesses").insert(newBusiness);

    if (error) {
      console.error("Error adding business:", error.message);
    }
    setNewBusiness({ name: "", description: "", owner_id: "" });
  };

  const fetchBusinesses = useEffectEvent(async () => {
    const { data, error } = await supabase.from("businesses").select("*");
    if (error) {
      console.error("Error fetching businesses:", error.message);
      return;
    }
    return data;
  });

  useEffect(() => {
    fetchBusinesses().then((data) => {
      if (data) {
        setBusinesses(data);
      }
    });
  }, []);

  if (!currentUser.user) {
    redirect("/auth/login");
  }

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit}>
        <h1 className="heading-headline mb-6">Add Business</h1>
        <div className="mb-4">
          <label htmlFor="business-name" className="block text-body mb-2">
            Business Name
          </label>
          <input
            type="text"
            id="business-name"
            name="business-name"
            className="form-input w-full"
            required
            onChange={(e) => {
              e.preventDefault();

              setNewBusiness((prev) => ({
                ...prev,
                business_name: e.target.value,
              }));
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="business-description"
            className="block text-body mb-2"
          >
            Business Description
          </label>
          <textarea
            id="business-description"
            name="business-description"
            className="form-input w-full h-32"
            required
            onChange={(e) => {
              e.preventDefault();
              setNewBusiness((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div>
        <h2>Businesses</h2>
        {businesses &&
          businesses.map((business) => (
            <div key={business.name}>
              <h3>{business.name}</h3>
              <p>{business.description}</p>
            </div>
          ))}
      </div>
    </PageWrapper>
  );
}
