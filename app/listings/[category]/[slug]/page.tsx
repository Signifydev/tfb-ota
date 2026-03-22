import { getListingBySlug } from "@/services/listings";
import Image from "next/image";
import BookingSection from "@/components/BookingSection";

export default async function ListingDetailPage({
  params,
}: {
  params: { category: string; slug: string }; // ✅ FIXED (no Promise)
}) {
  const { slug, category } = await params; // ✅ FIXED (no await)

  const listing = await getListingBySlug(slug);

  if (!listing) {
    return <div className="p-10">Listing not found</div>;
  }

  // ✅ FIXED: safer check (no dependency on category)
  const isStay = listing.rooms?.length > 0;

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
        </div>

        {(listing.listing_images || []).slice(1, 5).map((img: any, i: number) => (
          <div key={i} className="relative h-[220px] rounded-2xl overflow-hidden">
            <Image src={img.image_url} alt="Listing" fill className="object-cover" />
          </div>
        ))}

      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-1">{listing.title}</h1>
        <p className="text-gray-500 mb-8">
          {listing.city}, {listing.state}
        </p>

        <div className="space-y-10">

          {/* ABOUT */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              About this stay
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {listing.description ||
                "Enjoy a premium stay experience with comfort, scenic views, and top-class amenities."}
            </p>
          </div>

          {/* ✅ BOOKING SECTION (ONLY FOR STAYS) */}
          {isStay && (
            <BookingSection
              rooms={listing.rooms || []}
              basePrice={listing.base_price}
              listingId={listing.id}
            />
          )}

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