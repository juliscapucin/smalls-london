import { createClient } from "@/services/supabase/server";

export async function getCategories(
  table: "business_categories" | "event_categories"
) {
  const supabase = await createClient();

  const { data, error } = await supabase.from(table).select("*");

  if (error) {
    console.error(`Error fetching ${table}:`, error.message);
    return [];
  }

  return data;
}
