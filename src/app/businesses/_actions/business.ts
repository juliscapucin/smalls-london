"use server";

import { Business } from "../_types/business";
import {
  createBusinessSchema,
  updateBusinessSchema,
} from "../_schemas/business";
import { Tables } from "@/services/supabase/types/database";
import { getCurrentUser } from "@/lib/get-current-user";
import { createClient } from "@/services/supabase/server";

export async function createBusiness(unsafeData: Business) {
  const { success, data } = createBusinessSchema.safeParse(unsafeData);
  if (!success) {
    return { error: true, message: "Invalid business data" };
  }

  const user = await getCurrentUser();
  if (user === null) {
    return { error: true, message: "User not authenticated" };
  }

  const supabase = await createClient();

  const { data: business, error } = await supabase
    .from("businesses")
    .insert({
      ...data,
      owner_id: user.id,
    })
    .select()
    .single();

  if (error) {
    return { error: true, message: error.message };
  }

  return { error: false, data: business };
}

export async function deleteBusiness(businessId: string) {
  const user = await getCurrentUser();
  if (user === null) {
    return { error: true, message: "User not authenticated" };
  }

  const supabase = await createClient();

  console.log(businessId, user.id);

  const { error } = await supabase
    .from("businesses")
    .delete()
    .eq("id", businessId)
    .eq("owner_id", user.id);

  if (error) {
    return { error: true, errorMessage: error.message };
  }

  return { error: false };
}

export async function updateBusiness(
  businessId: string,
  unsafeData: Partial<Tables<"businesses">>
) {
  const { success, data } = updateBusinessSchema
    .partial()
    .safeParse(unsafeData);
  if (!success) {
    return { error: true, message: "Invalid business data" };
  }

  const user = await getCurrentUser();
  if (user === null) {
    return { error: true, message: "User not authenticated" };
  }

  const supabase = await createClient();

  const { data: business, error } = await supabase
    .from("businesses")
    .update({
      ...data,
    })
    .eq("id", businessId)
    .eq("owner_id", user.id)
    .select()
    .single();

  if (error) {
    return { error: true, errorMessage: error.message };
  }

  return { error: false, data: business };
}
