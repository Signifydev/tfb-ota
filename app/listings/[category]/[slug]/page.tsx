"use client";

import { useState, useEffect } from "react";
import { getListingBySlugClient } from "@/services/listings-client";
import Image from "next/image";
import BookingSection from "@/components/BookingSection";
import { useParams } from "next/navigation";

export default function ListingDetailPage() {

  const params = useParams();
  const slug = params.slug as string;
  const category = params.category as string;

  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [activeSection, setActiveSection] = useState("overview");
  const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
const [listing, setListing] = useState<any>(null);

  useEffect(() => {
  const fetchListing = async () => {
    const data = await getListingBySlugClient(slug);
    setListing(data);
  };

  fetchListing();
}, [slug]);

useEffect(() => {
  const handleScroll = () => {
    const sections = ["overview", "rooms", "amenities", "location"];

    for (let id of sections) {
      const element = document.getElementById(id);

      if (element) {
        const rect = element.getBoundingClientRect();

        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(id);
          break;
        }
      }
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  if (!listing) {
    return <div className="p-10">Listing not found</div>;
  }

  // ✅ FIXED: safer check (no dependency on category)
  const isStay = listing.rooms?.length > 0;

  if (!listing) {
  return <div className="p-10">Loading...</div>;
}

  return (
    <main className="pt-[120px] pb-16 bg-gray-50">

      {/* ✅ IMAGE GALLERY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 px-6 mb-8">

        <div className="relative md:col-span-2 md:row-span-2 h-[460px] rounded-2xl overflow-hidden">
          <Image
            src={
              listing.listing_images?.[0]?.image_url ||
              "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            }
            alt={listing.title}
            fill
            className="object-cover"
          />
          <button className="absolute bottom-3 right-3 bg-white text-black text-sm px-3 py-1 rounded-lg shadow">
  View all photos
</button>
        </div>

        {(listing.listing_images || []).slice(1, 5).map((img: any, i: number) => (
          <div key={i} className="relative h-[220px] rounded-2xl overflow-hidden">
            <Image src={img.image_url} alt="Listing" fill className="object-cover" />
          </div>
        ))}

      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6">
        {/* ✅ STICKY NAVIGATION */}
<div className="sticky top-[80px] z-40 bg-white border-b mb-8">

  <div className="flex gap-6 text-sm font-medium overflow-x-auto">

    <button
  onClick={() => scrollToSection("overview")}
  className={`py-4 border-b-2 ${
    activeSection === "overview"
      ? "border-black text-black"
      : "border-transparent text-gray-500"
  }`}
>
  Overview
</button>

<button
  onClick={() => scrollToSection("rooms")}
  className={`py-4 border-b-2 ${
    activeSection === "rooms"
      ? "border-black text-black"
      : "border-transparent text-gray-500"
  }`}
>
  Rooms
</button>

<button
  onClick={() => scrollToSection("amenities")}
  className={`py-4 border-b-2 ${
    activeSection === "amenities"
      ? "border-black text-black"
      : "border-transparent text-gray-500"
  }`}
>
  Amenities
</button>

<button
  onClick={() => scrollToSection("location")}
  className={`py-4 border-b-2 ${
    activeSection === "location"
      ? "border-black text-black"
      : "border-transparent text-gray-500"
  }`}
>
  Location
</button>

  </div>

</div>

        <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>

{/* ✅ KEY INFO BAR */}
<div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-6">

  {/* ⭐ Rating */}
  {listing.rating && (
    <span className="flex items-center gap-1 font-medium text-black">
      ⭐ {listing.rating}
      {listing.reviews_count && (
        <span className="text-gray-500">({listing.reviews_count} reviews)</span>
      )}
    </span>
  )}

  {/* 📍 Location */}
  <span>
    {listing.city}, {listing.state}
  </span>

  {/* 🏨 Property Type */}
  {listing.property_type && (
    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
      {listing.property_type}
    </span>
  )}

</div>

{/* ✅ QUICK AMENITIES PREVIEW */}
<div className="flex flex-wrap gap-2 mb-8">
  {(listing.amenities || []).slice(0, 5).map((a: string, i: number) => (
    <span
      key={i}
      className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full"
    >
      ✔ {a}
    </span>
  ))}
</div>

        <div className="space-y-10">

          {/* ABOUT */}
          <div id="overview">
            <h2 className="text-xl font-semibold mb-3">
              About this stay
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {listing.description ||
                "Enjoy a premium stay experience with comfort, scenic views, and top-class amenities."}
            </p>
          </div>

          {/* ✅ AMENITIES SECTION */}
{listing.amenities && listing.amenities.length > 0 && (
  <div id="amenities">
    <h2 className="text-xl font-semibold mb-4">Amenities</h2>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {listing.amenities.map((a: string, i: number) => (
        <div
          key={i}
          className="flex items-center gap-2 text-gray-700 text-sm"
        >
          <span>✔</span>
          <span>{a}</span>
        </div>
      ))}
    </div>
  </div>
)}

          {/* ✅ BOOKING + ROOMS LAYOUT */}
{isStay && (
  <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 mt-10">

    {/* LEFT - ROOMS (70%) */}
    <div id="rooms" className="lg:col-span-7">
      <h2 className="text-2xl font-bold mb-6">
        Choose your Room
      </h2>

      <div className="space-y-6">
        {(listing.rooms || []).map((room: any, i: number) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row gap-4"
          >
            {/* Room Image */}
            <div className="relative w-full md:w-[220px] h-[160px] rounded-xl overflow-hidden">
              <Image
                src={
                  room.images?.[0] ||
                  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
                }
                alt={room.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Room Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{room.name}</h3>

              <p className="text-gray-500 text-sm mb-2">
                {room.description || "Comfortable stay with modern amenities"}
              </p>

              <p className="text-sm text-gray-600">
                Capacity: {room.capacity || 2} Guests
              </p>

              <div className="mt-3 flex items-center justify-between">

  <div>
    <p className="font-semibold text-lg">
      ₹{room.price}
      <span className="text-sm text-gray-500"> / night</span>
    </p>

    <div className="flex gap-2 mt-1 text-xs">
      <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
        Free Cancellation
      </span>

      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
        Breakfast Included
      </span>
    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="flex flex-col items-end gap-2">

    {/* 🔥 SELECT BUTTON */}
    <button
      onClick={() => setSelectedRoom(room)}
      className={`px-4 py-2 rounded-lg text-sm font-medium ${
        selectedRoom?.name === room.name
          ? "bg-green-600 text-white"
          : "bg-black text-white"
      }`}
    >
      {selectedRoom?.name === room.name ? "Selected" : "Select Room"}
    </button>

    {/* URGENCY */}
    <span className="text-xs text-red-500 font-medium">
      Only few rooms left
    </span>

  </div>

</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* RIGHT - STICKY BOOKING (30%) */}
    <div className="lg:col-span-3">
      <div className="sticky top-[120px]">
        <BookingSection
  rooms={listing.rooms || []}
  basePrice={selectedRoom?.price || listing.base_price}
  selectedRoom={selectedRoom}
  listingId={listing.id}
/>
      </div>
    </div>

  </div>
)}
<div id="location" className="mt-10">

  <h2 className="text-xl font-semibold mb-4">
    Location
  </h2>

  <p className="text-gray-600 mb-4">
    {listing.city}, {listing.state}
  </p>

  {/* ✅ MATCH OTHER SECTIONS */}
  <div className="bg-white rounded-2xl shadow overflow-hidden">

    <div className="w-full h-[350px]">
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps?q=${listing.city},${listing.state}&output=embed`}
      />
    </div>

  </div>

</div>

          {/* 🚀 BIKE EXPEDITION SECTION */}
          {listing.expedition_data && (
            <div className="mt-10">

              <h2 className="text-2xl font-bold mb-6">
                Bike Expedition Packages
              </h2>

              {listing.expedition_data.packages?.map((pkg: any, index: number) => (
                <div
                  key={index}
                  className="mb-8 p-4 bg-white rounded-xl shadow"
                >

                  <h3 className="text-xl font-semibold">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.route}</p>

                  {/* Variants */}
                  <h4 className="font-semibold">Variants</h4>
                  {pkg.variants?.map((v: any, i: number) => (
                    <p key={i}>
                      {v.name} - ₹{v.price}
                    </p>
                  ))}

                  {/* Departures */}
                  <h4 className="font-semibold mt-4">Departure Dates</h4>
                  {pkg.departures?.map((d: string, i: number) => (
                    <p key={i}>{d}</p>
                  ))}

                  {/* Itinerary */}
                  {pkg.itinerary && (
                    <>
                      <h4 className="font-semibold mt-4">Itinerary</h4>
                      {pkg.itinerary.map((day: any) => (
                        <p key={day.day}>
                          Day {day.day}: {day.title}
                        </p>
                      ))}
                    </>
                  )}

                </div>
              ))}

              {/* Inclusions */}
              {listing.expedition_data.inclusions && (
                <>
                  <h3 className="text-xl font-semibold mt-6">Inclusions</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    {listing.expedition_data.inclusions.map((i: string, idx: number) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                </>
              )}

              {/* Exclusions */}
              {listing.expedition_data.exclusions && (
                <>
                  <h3 className="text-xl font-semibold mt-6">Exclusions</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    {listing.expedition_data.exclusions.map((e: string, idx: number) => (
                      <li key={idx}>{e}</li>
                    ))}
                  </ul>
                </>
              )}

            </div>
          )}

        </div>

      </div>
      

    </main>
  );
}