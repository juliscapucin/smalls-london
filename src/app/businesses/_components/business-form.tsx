"use client";

import { useState } from "react";

import { createClient } from "@/services/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

type BusinessFormProps = {
  currentUser: User;
};

export default function BusinessForm({ currentUser }: BusinessFormProps) {
  const router = useRouter();
  const [newBusiness, setNewBusiness] = useState({
    name: "",
    description: "",
  });

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser.id) return;

    if (newBusiness.name) {
      const { error } = await supabase
        .from("businesses")
        .insert({
          name: newBusiness.name,
          description: newBusiness.description,
          owner_id: currentUser.id,
        })
        .single();

      if (error) {
        console.error("Error creating business:", error.message);
      } else {
        alert("Business created successfully!");
        location.reload();
      }
      return;
    }

    const { error } = await supabase
      .from("businesses")
      .update({ name: newBusiness.name, description: newBusiness.description })
      .eq("owner_id", currentUser.id)
      .single();

    if (error) {
      console.error("Error updating business:", error.message);
    } else {
      alert("Profile updated successfully!");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="heading-headline mb-6">Business Profile</h1>
      <div className="mb-4">
        <label className="block text-body mb-2">
          Full Name
          <input
            type="text"
            name="full-name"
            className="form-input w-full"
            required
            minLength={1}
            value={newBusiness.name}
            onChange={(e) => {
              setNewBusiness({ ...newBusiness, name: e.target.value });
            }}
          />
        </label>
        <label className="block text-body mb-2">
          Description
          <input
            type="text"
            name="description"
            className="form-input w-full"
            required
            value={newBusiness.description}
            onChange={(e) => {
              setNewBusiness({ ...newBusiness, description: e.target.value });
            }}
          />
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        Update Profile
      </button>
    </form>
  );
}
