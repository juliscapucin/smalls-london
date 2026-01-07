import { Tables } from "@/services/supabase/types/database";

export type Category =
  | Tables<"business_categories">
  | Tables<"event_categories">;
