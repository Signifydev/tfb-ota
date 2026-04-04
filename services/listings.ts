import { createClient } from "@/lib/supabase/server";

/* =========================
   GET LISTINGS BY CATEGORY
========================= */
export async function getListingsByCategory(categorySlug: string) {
  const supabase = await createClient();

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

  // 2. Fetch listings
  const { data: listings, error: listingsError } = await supabase
    .from("listings")
    .select(`
      id,
      title,
      slug,
      price,
      city,
      state,
      categories (slug),
      listing_images (
        image_url
      )
    `)
    .eq("category_id", category.id)
    .eq("is_published", true);

  if (listingsError) {
    console.error("❌ Listings fetch error:", listingsError.message);
  }

  // 3. Fetch activities if category is adventures
  let activities: any[] = [];

  if (categorySlug === "adventures") {
    const { data: activitiesData, error: activitiesError } = await supabase
      .from("activities")
      .select("*")
      .eq("is_active", true);

    if (activitiesError) {
      console.error("❌ Activities fetch error:", activitiesError.message);
    }

    activities = (activitiesData || []).map((item) => {
      let gallery = item.gallery;

      // Fix JSON string issue
      if (typeof gallery === "string") {
        try {
          gallery = JSON.parse(gallery);
        } catch (err) {
          console.error("❌ Gallery parse failed:", gallery);
          gallery = [];
        }
      }

      return {
        id: item.id,
        title: item.title,
        slug: item.slug,
        price: item.selling_price,
        city: item.location,
        state: "",
        categories: { slug: "adventures" },
        type: "activity",

        listing_images:
          Array.isArray(gallery) && gallery.length > 0
            ? gallery.map((url: string) => ({ image_url: url }))
            : item.image_url
            ? [{ image_url: item.image_url }]
            : [],
      };
    });
  }

  // 4. Add type to listings
  const formattedListings = (listings || []).map((item) => ({
    ...item,
    type: "listing",
  }));

  // 5. Merge both
  const finalData = [...formattedListings, ...activities];

  console.log("✅ Final merged data:", finalData.length);

  return finalData;
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
    .maybeSingle();

  if (error) {
    console.error("❌ Listing fetch error:", error.message);
    return null;
  }

  if (!listing) {
    console.error("❌ Listing NOT FOUND:", slug);
    return null;
  }

  console.log("✅ Listing found:", listing.id);

  // Fetch rooms
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

/* =========================
   GET ACTIVITIES
========================= */
export async function getActivities() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("is_active", true);

  if (error) {
    console.error("❌ Activities fetch error:", error.message);
    return [];
  }

  return data || [];
}

/* =========================
   GET SINGLE ACTIVITY (FIXED)
========================= */
export async function getActivityBySlug(slug: string) {
  const supabase = await createClient();

  console.log("🔍 Incoming slug:", slug);

  if (!slug) return null;

  const cleanSlug = slug.trim().toLowerCase();

  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("slug", cleanSlug) // ✅ FIXED
    .eq("is_active", true)
    .maybeSingle(); // ✅ FIXED

  console.log("📦 Query result:", data);
  console.log("❌ Error:", error);

  if (error) return null;

  if (!data) return null;

  return data; // ✅ FIXED
}