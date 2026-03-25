import { supabase } from "@/lib/supabase/client";

/* =========================
   GET LISTINGS BY CATEGORY (CLIENT)
========================= */
export async function getListingsByCategoryClient(categorySlug: string) {

  console.log("🔍 Fetching category slug:", categorySlug);

  // 1. Get category
  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("id, slug")
    .eq("slug", categorySlug)
    .maybeSingle();

  if (categoryError || !category) {
    console.error("❌ Category error:", categoryError?.message);
    return [];
  }

  // 2. Get listings
  const { data, error } = await supabase
    .from("listings")
    .select(`
      id,
      title,
      slug,
      price,
      city,
      state,
      rating,
      listing_images (
        image_url
      )
    `)
    .eq("category_id", category.id)
    .eq("is_published", true); // ✅ FIXED

  if (error) {
    console.error("❌ Listings error:", error.message);
    return [];
  }

  return data || [];
}