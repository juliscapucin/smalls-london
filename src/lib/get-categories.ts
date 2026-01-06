import { createClient } from "@/services/supabase/server";

async function getCategories(
  table: "business_categories" | "event_categories"
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("business_categories")
    .select("*");

  if (error) {
    console.error(`Error fetching ${table}:`, error.message);
    console.log("error");
    return null;
  }

  return data;
}

export const getBusinessCategories = () => getCategories("business_categories");

export const getEventCategories = () => getCategories("event_categories");
