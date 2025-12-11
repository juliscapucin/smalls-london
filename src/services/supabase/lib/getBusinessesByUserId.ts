import { createClient } from "@/services/supabase/server";

export const getBusinessesByUserId = async (userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", userId)
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching businesses:", error.message);
    return [];
  }

  return data;
};
