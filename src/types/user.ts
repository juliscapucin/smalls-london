import { Tables } from "@/services/supabase/types/database";

export type User = Tables<"users">;

export type UpdateUser = Partial<Tables<"users">>;
