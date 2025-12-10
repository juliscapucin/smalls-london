import { createClient } from "@/services/supabase/client";

export async function getCurrentUser() {
  const supabase = await createClient();
  return (await supabase.auth.getUser()).data.user;
}
