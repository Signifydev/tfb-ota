"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type ListingCardProps = {
  listing: any;
};

export default function ListingCard({ listing }: ListingCardProps) {
  const images =
    listing.listing_images?.length > 0
      ? listing.listing_images.map((img: any) => img.image_url)
      : ["https://images.unsplash.com/photo-1501785888041-af3ef285b470"];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const location = `${listing.city}, ${listing.state}`;

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev: number) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev: number) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Link
      href={
        listing.type === "activity"
          ? `/activities/${listing.slug}`
          : `/listings/${listing.category_slug}/${listing.slug}`
      }
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">

        {/* IMAGE CAROUSEL */}
        <div className="relative h-56 overflow-hidden">
          <div
  className="flex h-full transition-transform duration-500 ease-in-out will-change-transform"
  style={{
    transform: `translateX(-${currentIndex * 100}%)`,
  }}
>
  {images.map((img: string, i: number) => (
    <div key={i} className="relative min-w-full h-full">
      <Image
        src={img}
        alt={listing.title}
        
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500"
        priority={i === 0}
      />
    </div>
    
  ))}
</div>

          {/* LEFT ARROW */}
          {images.length > 1 && (
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow"
            >
              ◀
            </button>
          )}

          {/* RIGHT ARROW */}
          {images.length > 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow"
            >
              ▶
            </button>
          )}

          {/* DOTS */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_: any, i: number) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

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