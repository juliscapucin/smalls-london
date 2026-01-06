import { createClient } from "@/services/supabase/server";

async function getCategories(
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

export const getBusinessCategories = () => getCategories("business_categories");

export const getEventCategories = () => getCategories("event_categories");
