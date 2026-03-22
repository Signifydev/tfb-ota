import { createClient } from "@/lib/supabase/server";

export async function getUserWithRole() {
  const supabase = await createClient();

const {
  data: { user },
} = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
  console.error(error);
}

return { user, profile };

}