"use client";

import { useEffect, useState } from "react";
import { getListingsByCategoryClient } from "@/services/listings-client";
import ListingCard from "@/components/ListingCard";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const categoryHero: Record<string, { title: string; image: string }> = {
  stays: {
    title: "Find the Best Stays",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  adventures: {
    title: "Explore Adventures & Activities",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  trekking: {
    title: "Trekking & Camps",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  "char-dham": {
    title: "Char Dham Yatra",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
  },
  retreats: {
    title: "Wellness Retreats",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
  },
  yoga: {
    title: "Yoga & Meditation",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
  },
  "bike-expedition": {
    title: "Bike Expeditions",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
  },
};

export default function CategoryPage() {

  const params = useParams();
  const category = params.category as string;
  const router = useRouter();
const searchParams = useSearchParams();

  const [listings, setListings] = useState<any[]>([]);
  const [filteredListings, setFilteredListings] = useState<any[]>([]);

  const [selectedCity, setSelectedCity] = useState(
  searchParams.get("city") || "All"
);

const [selectedRating, setSelectedRating] = useState(
  searchParams.get("rating") || "All"
);

const [selectedType, setSelectedType] = useState(
  searchParams.get("type") || "All"
);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(
  Number(searchParams.get("price")) || 50000
);
const [sortOption, setSortOption] = useState("recommended");
const [showFilters, setShowFilters] = useState(false);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const fetchListings = async () => {
      const data = await getListingsByCategoryClient(category);
      setListings(data || []);
      setFilteredListings(data || []);
    };

    fetchListings();
  }, [category]);



  /* ================= FILTER LOGIC ================= */

  useEffect(() => {
  let filtered = [...listings];

  // City
  if (selectedCity !== "All") {
    filtered = filtered.filter(l => l.city === selectedCity);
  }

  // Rating
  if (selectedRating !== "All") {
    filtered = filtered.filter(l => l.rating >= Number(selectedRating));
  }

  // Property Type
  if (selectedType !== "All") {
    filtered = filtered.filter(l => l.property_type === selectedType);
  }

  // Amenities
  if (selectedAmenities.length > 0) {
    filtered = filtered.filter(l =>
      selectedAmenities.every(a =>
        (l.amenities || []).includes(a)
      )
    );
  }

  // ✅ Price Filter
  filtered = filtered.filter(l => l.base_price <= maxPrice);

  // ✅ Sorting
  if (sortOption === "low-high") {
    filtered.sort((a, b) => a.base_price - b.base_price);
  }

  if (sortOption === "high-low") {
    filtered.sort((a, b) => b.base_price - a.base_price);
  }

  setFilteredListings(filtered);

}, [
  selectedCity,
  selectedRating,
  selectedType,
  selectedAmenities,
  maxPrice,
  sortOption,
  listings
]);

useEffect(() => {

  const params = new URLSearchParams();

  if (selectedCity !== "All") params.set("city", selectedCity);
  if (selectedRating !== "All") params.set("rating", selectedRating);
  if (selectedType !== "All") params.set("type", selectedType);
  if (maxPrice) params.set("price", String(maxPrice));

  router.replace(`?${params.toString()}`);

}, [selectedCity, selectedRating, selectedType, maxPrice]);
  const hero = categoryHero[category] || {
    title: "Explore Experiences",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  };

  return (
    <>
      {/* HERO */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center">

        <div className="absolute inset-0">
          <img src={hero.image} alt={hero.title} className="w-full h-full object-cover" />
        </div>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center text-white px-4 mt-20 md:mt-28">
          <h1 className="text-4xl md:text-5xl font-bold">{hero.title}</h1>
        </div>

      </section>

      {/* LISTINGS */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex gap-8">

        {/* FILTERS */}
        <div className="w-64 hidden md:block">

          <div className="bg-white p-5 rounded-xl shadow sticky top-24">

            <h3 className="font-bold mb-4">Filters</h3>
            {/* Price */}
<div className="mb-5">
  <label className="text-sm font-medium">Max Price</label>

  <input
    type="range"
    min="0"
    max="50000"
    value={maxPrice}
    onChange={(e)=>setMaxPrice(Number(e.target.value))}
    className="w-full mt-2"
  />

  <p className="text-xs mt-1">Up to ₹{maxPrice}</p>
</div>

            {/* City */}
            <div className="mb-5">
              <label className="text-sm font-medium">City</label>
              <select
                className="w-full mt-2 border p-2 rounded"
                onChange={(e)=>setSelectedCity(e.target.value)}
              >
                <option>All</option>
                {[...new Set(listings.map(l => l.city))].map((city) => (
                  <option key={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div className="mb-5">
              <label className="text-sm font-medium">Star Rating</label>
              <select
                className="w-full mt-2 border p-2 rounded"
                onChange={(e)=>setSelectedRating(e.target.value)}
              >
                <option>All</option>
                <option value="4">4★ & above</option>
                <option value="3">3★ & above</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="mb-5">
              <label className="text-sm font-medium">Property Type</label>
              <select
                className="w-full mt-2 border p-2 rounded"
                onChange={(e)=>setSelectedType(e.target.value)}
              >
                <option>All</option>
                {[...new Set(listings.map(l => l.property_type).filter(Boolean))].map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Amenities */}
            <div>
              <label className="text-sm font-medium">Amenities</label>

              <div className="mt-2 flex flex-col gap-2">
                {[...new Set(listings.flatMap(l => l.amenities || []))].map((a) => (
                  <label key={a} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      onChange={(e)=>{
                        if(e.target.checked){
                          setSelectedAmenities(prev => [...prev, a]);
                        } else {
                          setSelectedAmenities(prev => prev.filter(x => x !== a));
                        }
                      }}
                    />
                    {a}
                  </label>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* LISTINGS */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">

  {/* LEFT SIDE */}
  <div className="flex items-center gap-3">

    {/* MOBILE FILTER BUTTON */}
    <button
      onClick={()=>setShowFilters(true)}
      className="md:hidden border px-3 py-2 rounded-lg text-sm"
    >
      Filters
    </button>

    <h2 className="text-lg font-semibold">
      {filteredListings.length} Results
    </h2>

  </div>

  {/* RIGHT SIDE */}
  <select
    className="border p-2 rounded"
    onChange={(e)=>setSortOption(e.target.value)}
  >
    <option value="recommended">Recommended</option>
    <option value="low-high">Price Low → High</option>
    <option value="high-low">Price High → Low</option>
  </select>

</div>

          {filteredListings.length === 0 ? (
            <p>No listings found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing: any) => (
                <ListingCard
                  key={listing.id}
                  listing={{
                    id: listing.id,
                    title: listing.title,
                    slug: listing.slug,
                    base_price: listing.base_price,
                    city: listing.city,
                    state: listing.state,
                    category_slug: category,
                    listing_images: listing.listing_images
                  }}
                />
              ))}
            </div>
          )}

        </div>

      </div>
      {/* MOBILE FILTER DRAWER */}
{showFilters && (
  <div className="fixed inset-0 z-50 bg-black/40">

    <div className="absolute right-0 top-0 h-full w-80 bg-white p-5 overflow-y-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Filters</h3>
        <button onClick={()=>setShowFilters(false)}>✕</button>
      </div>

      {/* Price */}
      <div className="mb-5">
        <label className="text-sm font-medium">Max Price</label>

        <input
          type="range"
          min="0"
          max="50000"
          value={maxPrice}
          onChange={(e)=>setMaxPrice(Number(e.target.value))}
          className="w-full mt-2"
        />

        <p className="text-xs mt-1">Up to ₹{maxPrice}</p>
      </div>

      {/* City */}
      <div className="mb-5">
        <label className="text-sm font-medium">City</label>

        <select
          className="w-full mt-2 border p-2 rounded"
          onChange={(e)=>setSelectedCity(e.target.value)}
        >
          <option>All</option>
          {[...new Set(listings.map(l => l.city))].map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Rating */}
      <div className="mb-5">
        <label className="text-sm font-medium">Rating</label>

        <select
          className="w-full mt-2 border p-2 rounded"
          onChange={(e)=>setSelectedRating(e.target.value)}
        >
          <option>All</option>
          <option value="4">4★ & above</option>
          <option value="3">3★ & above</option>
        </select>
      </div>

      {/* Property Type */}
      <div className="mb-5">
        <label className="text-sm font-medium">Property Type</label>

        <select
          className="w-full mt-2 border p-2 rounded"
          onChange={(e)=>setSelectedType(e.target.value)}
        >
          <option>All</option>
          {[...new Set(listings.map(l => l.property_type).filter(Boolean))].map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Amenities */}
      <div>
        <label className="text-sm font-medium">Amenities</label>

        <div className="mt-2 flex flex-col gap-2">
          {[...new Set(listings.flatMap(l => l.amenities || []))].map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                onChange={(e)=>{
                  if(e.target.checked){
                    setSelectedAmenities(prev => [...prev, a]);
                  } else {
                    setSelectedAmenities(prev => prev.filter(x => x !== a));
                  }
                }}
              />
              {a}
            </label>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={()=>setShowFilters(false)}
        className="mt-6 w-full bg-black text-white py-3 rounded-lg"
      >
        Apply Filters
      </button>

    </div>
  </div>
)}
    </>
  );
}