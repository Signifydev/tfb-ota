import { getHomepageSections } from "@/services/homepage";
import { getListingsByCategory } from "@/services/listings";
import ListingCard from "@/components/ListingCard";
import HeroSearch from "@/components/HeroSearch";
import Image from "next/image";

export default async function HomePage() {

  const sections = await getHomepageSections();

  const listingsData: Record<string, any[]> = {};

  for (const section of sections) {
    if (section.type === "listing_grid" && section.category_slug) {
      listingsData[section.category_slug] =
        await getListingsByCategory(section.category_slug);
    }
  }

  // Separate testimonials (we push it to bottom)
  const testimonialSection = sections.find(s => s.type === "testimonials");

  return (
    <main>

      {/* ✅ HERO FULL WIDTH */}
      {sections.map((section: any) => {
        if (section.type === "hero") {
          return (
            <section
  key={section.id}
  className="relative w-full min-h-[80vh] md:min-h-[90vh] flex items-center justify-center"
>

  {/* ✅ BACKGROUND IMAGE */}
  <div className="absolute inset-0">
  <Image
    src="https://res.cloudinary.com/dunva5eod/image/upload/v1774100102/hero1_hpoxez.jpg"
    alt="Travel"
    fill
    priority
    className="object-cover"
  />
</div>

  {/* ✅ DARK OVERLAY (IMPORTANT FOR TEXT VISIBILITY) */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

  {/* ✅ CONTENT */}
  <div className="relative z-10 text-center px-4 mt-20 md:mt-28 text-white">

    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      Discover Incredible Travel Experiences
    </h1>

    <p className="mb-8 text-gray-200">
      Adventures, stays, treks and spiritual journeys across India
    </p>

    <div className="flex justify-center">
      <HeroSearch />
    </div>

  </div>

</section>
          );
        }
        return null;
      })}

      {/* ✅ MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6">

        {sections.map((section: any) => {

          if (section.type === "listing_grid") {

            const listings = listingsData[section.category_slug] || [];

            return (
              <section key={section.id} className="py-12">

                <h2 className="text-2xl font-bold mb-6">
                  {section.title}
                </h2>

                {/* ✅ 4 CARDS PER ROW */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                  {listings.slice(0, 8).map((listing: any) => (
                    <ListingCard
  key={listing.id}
  listing={{
    id: listing.id,
    title: listing.title,
    slug: listing.slug,
    price: listing.price, // ✅ FIXED
    city: listing.city,
    state: listing.state,
    category_slug: section.category_slug,
    listing_images: listing.listing_images
  }}
/>
                  ))}

                </div>

              </section>
            );
          }

          if (section.type === "cta") {
            return (
              <section key={section.id} className="py-20 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Start Your Next Journey Today
                </h2>

                <button className="bg-black text-white px-6 py-3 rounded-lg">
                  Explore Packages
                </button>
              </section>
            );
          }

          return null;
        })}

      </div>

      {/* ✅ TESTIMONIALS ALWAYS AT BOTTOM */}
      {testimonialSection && (
        <section className="py-16 bg-gray-100 text-center mt-10">
          <h2 className="text-2xl font-bold mb-6">
            Testimonials
          </h2>

          <p>Customer testimonials will appear here</p>
        </section>
      )}

    </main>
  );
}