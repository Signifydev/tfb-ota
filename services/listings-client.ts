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

  // 2. Fetch listings (OLD)
  const { data: listings, error: listingsError } = await supabase
    .from("listings")
    .select(`
      id,
      title,
      slug,
      price,
      city,
      state,
      rating,
      listing_images (image_url)
    `)
    .eq("category_id", category.id)
    .eq("is_published", true);

  if (listingsError) {
    console.error("❌ Listings error:", listingsError.message);
  }

  // 3. Fetch activities (NEW)
  let activities: any[] = [];

  if (categorySlug === "adventures") {
    const { data: activitiesData, error: activitiesError } = await supabase
      .from("activities")
      .select("*")
      .eq("is_active", true);

    if (activitiesError) {
      console.error("❌ Activities error:", activitiesError.message);
    }

    activities = (activitiesData || []).map((item) => ({
  id: item.id,
  title: item.title,
  slug: item.slug,
  price: item.selling_price,
  city: item.location,
  state: "",
  categories: { slug: "adventures" },
  type: "activity",

  listing_images: item.gallery?.length
    ? item.gallery.map((url: string) => ({ image_url: url }))
    : [],
}));
  }

  // 4. Add type to listings
  const formattedListings = (listings || []).map((item) => ({
    ...item,
    type: "listing",
  }));

  // 5. Merge both
  const finalData = [...formattedListings, ...activities];

  console.log("✅ FINAL DATA:", finalData.length);

  return finalData;
}
/* =========================
   GET SINGLE LISTING (CLIENT)
========================= */
export async function getListingBySlugClient(slug: string) {

  const { data, error } = await supabase
    .from("listings")
    .select(`
      *,
      listing_images(*),
      rooms(*)
    `)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("❌ Listing fetch error:", error.message);
    return null;
  }

  return data;
}