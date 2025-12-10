import {
  Business,
  businessSchema,
} from "@/services/supabase/schemas/businesses";
import { getCurrentUser } from "@/services/supabase/lib/getCurrentUser";
import { createClient } from "@/services/supabase/client";

export async function createBusiness(unsafeData: Business) {
  const { success, data } = businessSchema.safeParse(unsafeData);
  if (!success) {
    return { error: true, message: "Invalid business data" };
  }

  const user = await getCurrentUser();
  if (user === null) {
    return { error: true, message: "User not authenticated" };
  }

  const supabase = await createClient();

  supabase.from("Businesses").insert({
    ...data,
    owner_id: user.id,
  });

  return data;
}
