import Image from "next/image";
import Link from "next/link";

type ListingCardProps = {
  listing: any;
};

export default function ListingCard({ listing }: ListingCardProps) {
  const image =
    listing.listing_images?.[0]?.image_url ||
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470";

  const location = `${listing.city}, ${listing.state}`;

  return (
    <Link href={`/listings/${listing.category_slug}/${listing.slug}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">

        {/* IMAGE */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={image}
            alt={listing.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* RATING */}
          <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-xs font-bold text-green-600 shadow">
            {listing.rating || 4.5} ★
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5">
          <h3 className="font-bold text-lg mb-1">
            {listing.title}
          </h3>

          <p className="text-slate-500 text-sm mb-3">
            {location}
          </p>

          <div className="flex justify-between items-center pt-4 border-t">

            <span className="text-[#f4b400] font-extrabold text-lg">
              ₹{listing.price?.toLocaleString()}
              <span className="text-sm text-slate-400 font-normal">
                {" "} / night
              </span>
            </span>

            <span className="text-sm font-bold hover:text-[#f4b400] transition-colors">
              Book Now
            </span>

          </div>
        </div>
      </div>
    </Link>
  );
}