import { createClient } from "@/lib/supabase/server";

export async function getHomepageSections() {

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("homepage_sections")
    .select("*");

  if (error) {
    console.error("Error fetching homepage sections:", error);
    return [];
  }

  return data || [];
}