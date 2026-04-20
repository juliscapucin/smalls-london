"use client";

import { useState } from "react";

import { PageWrapper } from "@/components/page-wrapper";
import { createClient } from "@/services/supabase/client";
import { UpdateUser } from "@/types/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { Label } from "@/components/ui/label";

type UserFormProps = {
  currentUser: UpdateUser;
};

export default function UserForm({ currentUser }: UserFormProps) {
  const [newUser, setNewUser] = useState<UpdateUser>({
    full_name: currentUser?.full_name || "",
    email: currentUser.email || "",
    phone: currentUser?.phone || null,
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
      // TODO: Implement toaster notification
      alert("Profile updated successfully!");
    }
  };

  return (
    <form className="max-w-prose" onSubmit={handleSubmit}>
      <h1 className="heading-headline mb-6">User Profile</h1>
      <div className="mb-4">
        <Label className="block mb-2">
          Full Name
          <Input
            type="text"
            name="full-name"
            className="w-full"
            required
            value={newUser.full_name || ""}
            onChange={(e) => {
              setNewUser({ ...newUser, full_name: e.target.value });
            }}
          />
        </Label>
        <Label className="block text-body mb-2">
          Email
          <Input
            type="email"
            name="email"
            className="w-full"
            required
            value={newUser.email || ""}
            onChange={(e) => {
              setNewUser({ ...newUser, email: e.target.value });
            }}
          />
        </Label>
      </div>

      <Button type="submit">Update Profile</Button>
    </form>
  );
}
