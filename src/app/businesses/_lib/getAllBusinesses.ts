import { createClient } from "@/services/supabase/server";

const handleError = (error: any) => {
  console.error("Error fetching businesses:", error.message);
  return [];
};

export const getAllBusinesses = async (category?: string) => {
  const supabase = await createClient();

  if (category) {
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("category", category);

    if (error) {
      return handleError(error);
    }
    return data;
  }

  const { data, error } = await supabase.from("businesses").select("*");
  if (error) {
    return handleError(error);
  }
  return data;
};
