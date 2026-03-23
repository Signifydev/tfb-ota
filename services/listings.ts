import { createClient } from "@/lib/supabase/server";

/* =========================
   GET LISTINGS BY CATEGORY
========================= */
export async function getListingsByCategory(categorySlug: string) {
  const supabase = await createClient();

  console.log("🔍 Fetching category slug:", categorySlug);

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("id, slug")
    .eq("slug", categorySlug)
    .maybeSingle();

  if (categoryError || !category) {
    console.error("❌ Category error:", categoryError?.message);
    return [];
  }

  const { data, error } = await supabase
    .from("listings")
    .select(`
      id,
      title,
      slug,
      price,
      city,
      state,
      categories (slug)
    `)
    .eq("category_id", category.id)
    .eq("is_published", true); // ✅ FIXED

  if (error) {
    console.error("❌ Listings fetch error:", error.message);
    return [];
  }

  console.log("✅ Listings fetched:", data?.length);

  return data || [];
}

/* =========================
   GET SINGLE LISTING
========================= */
export async function getListingBySlug(slug: string) {
  const supabase = await createClient();

  console.log("🔍 Fetching listing slug:", slug);

  const { data: listing, error } = await supabase
    .from("listings")
    .select(`
      *,
      listing_images (
        image_url
      )
    `)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle(); // ✅ safer

  if (error) {
    console.error("❌ Listing fetch error:", error.message);
    return null;
  }

  if (!listing) {
    console.error("❌ Listing NOT FOUND:", slug);
    return null;
  }

  console.log("✅ Listing found:", listing.id);

  // ✅ Fetch rooms safely
  const { data: rooms, error: roomsError } = await supabase
    .from("rooms")
    .select("*")
    .eq("listing_id", listing.id);

  if (roomsError) {
    console.error("❌ Rooms fetch error:", roomsError.message);
  }

  console.log("✅ Rooms found:", rooms?.length);

  return {
    ...listing,
    rooms: rooms || [],
  };
}