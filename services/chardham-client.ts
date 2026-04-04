import { supabase } from "@/lib/supabase/client";

export async function getChardhamBySlug(slug: string) {
  if (!slug) return null;

  const { data, error } = await supabase
    .from("chardham_packages")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("❌ Chardham fetch error:", error.message);
    return null;
  }

  return data;
}