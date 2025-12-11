import { createClient } from "@/services/supabase/server";

export const getAllBusinesses = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("businesses").select("*");

  if (error) {
    console.error("Error fetching all businesses:", error.message);
    return [];
  }

  return data;
};
