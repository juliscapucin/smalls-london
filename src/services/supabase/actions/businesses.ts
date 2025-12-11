import {
  businessSchema,
  InsertBusiness,
} from "@/services/supabase/schemas/businesses";
import { getCurrentUser } from "@/services/supabase/lib/getCurrentUser";
import { createClient } from "@/services/supabase/server";

export async function createBusiness(unsafeData: InsertBusiness) {
  const { success, data } = businessSchema.safeParse(unsafeData);
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
