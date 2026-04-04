"use client";

import { useState } from "react";

export default function TourPackageSection({ listing }: any) {

  const data = listing.expedition_data;
  const pkg = data?.packages?.[0];

  const [selectedVariant, setSelectedVariant] = useState(pkg?.variants?.[0]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [openDay, setOpenDay] = useState<number | null>(1);
  const [pax, setPax] = useState(1);

  if (!data || !pkg) return null;

  const totalPrice = (selectedVariant?.price || 0) * pax;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 mt-10">

      {/* LEFT CONTENT */}
      <div className="lg:col-span-7 space-y-8">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold">{pkg.name}</h2>
          <p className="text-gray-500">{pkg.route}</p>
          <p className="text-sm text-gray-400">{pkg.duration}</p>
        </div>

        {/* VARIANTS */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-3">Select Package</h3>

          <div className="grid grid-cols-2 gap-3">
            {pkg.variants?.map((v: any, i: number) => {
              const isSelected = selectedVariant?.name === v.name;

              return (
                <div
                  key={i}
                  onClick={() => setSelectedVariant(v)}
                  className={`cursor-pointer border rounded-xl p-3 flex justify-between transition ${
                    isSelected
                      ? "border-black bg-black text-white"
                      : "hover:border-black"
                  }`}
                >
                  <span>{v.name}</span>
                  <span className="font-semibold">₹{v.price}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🔥 ACCORDION ITINERARY */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-4">Day-wise Itinerary</h3>

          <div className="space-y-3">

            {pkg.itinerary?.map((day: any) => {

              const isOpen = openDay === day.day;

              return (
                <div
                  key={day.day}
                  className="border rounded-xl overflow-hidden transition"
                >

                  {/* HEADER */}
                  <button
                    onClick={() => setOpenDay(isOpen ? null : day.day)}
                    className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <span className="font-medium">
                      Day {day.day}: {day.title}
                    </span>

                    <span className="text-xl">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {/* CONTENT WITH ANIMATION */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "max-h-40 opacity-100 p-4"
                        : "max-h-0 opacity-0 px-4"
                    } overflow-hidden`}
                  >
                    <p className="text-gray-600 text-sm">
                      {day.description}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>
        </div>

        {/* INCLUSIONS / EXCLUSIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <h3 className="font-semibold text-green-700 mb-3">✔ Inclusions</h3>
            <ul className="space-y-2 text-sm text-green-800">
              {data.inclusions?.map((i: string, idx: number) => (
                <li key={idx}>✔ {i}</li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <h3 className="font-semibold text-red-700 mb-3">✘ Exclusions</h3>
            <ul className="space-y-2 text-sm text-red-800">
              {data.exclusions?.map((e: string, idx: number) => (
                <li key={idx}>✘ {e}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* 🔥 RIGHT BOOKING BOX */}
      <div className="lg:col-span-3">
        <div className="sticky top-[120px] bg-white rounded-2xl shadow p-6 space-y-4">

          <h3 className="text-lg font-semibold">Book This Tour</h3>

          {/* VARIANT */}
          <div>
            <label className="text-sm font-medium">Package</label>
            <select
              className="w-full border p-2 rounded mt-1"
              onChange={(e) => {
                const v = pkg.variants.find((x: any) => x.name === e.target.value);
                setSelectedVariant(v);
              }}
            >
              {pkg.variants.map((v: any, i: number) => (
                <option key={i} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          {/* DATE */}
          {pkg.departure_dates?.length > 0 && (
            <div>
              <label className="text-sm font-medium">Select Date</label>
              <select
                className="w-full border p-2 rounded mt-1"
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="">Choose Date</option>
                {pkg.departure_dates.map((d: string, i: number) => (
                  <option key={i}>{d}</option>
                ))}
              </select>
            </div>
          )}

          {/* PAX */}
          <div>
            <label className="text-sm font-medium">Guests</label>
            <div className="flex items-center gap-3 mt-1">

              <button
                onClick={() => setPax(Math.max(1, pax - 1))}
                className="px-3 py-1 border rounded"
              >
                -
              </button>

              <span>{pax}</span>

              <button
                onClick={() => setPax(pax + 1)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>

            </div>
          </div>

          {/* PRICE */}
          <div className="border-t pt-3">
            <p className="text-sm text-gray-500">Total Price</p>
            <h2 className="text-2xl font-bold">
              ₹{totalPrice}
            </h2>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => {
              console.log({
                listingId: listing.id,
                variant: selectedVariant,
                date: selectedDate,
                pax,
                totalPrice
              });
            }}
            className="w-full bg-black text-white py-3 rounded-lg font-medium"
          >
            Book Now
          </button>

        </div>
      </div>

    </div>
  );
}