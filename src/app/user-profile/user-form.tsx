"use client";

import { useState } from "react";

import { PageWrapper } from "@/components/layout";
import { createClient } from "@/services/supabase/client";
import { Tables, TablesUpdate } from "@/services/supabase/types/database";
import { User } from "@supabase/supabase-js";

type UserFormProps = {
  user: Tables<"users"> | null;
  currentUser: User;
};

export default function UserForm({ user, currentUser }: UserFormProps) {
  const [newUser, setNewUser] = useState<TablesUpdate<"users">>({
    full_name: user?.full_name || "",
    email: currentUser.email || "",
    phone: user?.phone || null,
  });

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser.id) return;

    const { error } = await supabase
      .from("users")
      .update({ full_name: newUser.full_name })
      .eq("id", currentUser.id)
      .single();

    if (error) {
      console.error("Error updating user:", error.message);
    } else {
      alert("Profile updated successfully!");
    }
  };

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit}>
        <h1 className="heading-headline mb-6">User Profile</h1>
        <div className="mb-4">
          <label className="block text-body mb-2">
            Full Name
            <input
              type="text"
              name="full-name"
              className="form-input w-full"
              required
              value={newUser.full_name || ""}
              onChange={(e) => {
                setNewUser({ ...newUser, full_name: e.target.value });
              }}
            />
          </label>
          <label className="block text-body mb-2">
            Email
            <input
              type="email"
              name="email"
              className="form-input w-full"
              required
              value={newUser.email || ""}
              onChange={(e) => {
                setNewUser({ ...newUser, email: e.target.value });
              }}
            />
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </PageWrapper>
  );
}
