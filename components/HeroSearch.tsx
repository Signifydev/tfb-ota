"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DayPicker, DateRange } from "react-day-picker";
import { differenceInDays, format } from "date-fns";
import "react-day-picker/dist/style.css";

export default function HeroSearch() {
  const router = useRouter();
  const calendarRef = useRef<HTMLDivElement>(null);

  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(1);

  const [range, setRange] = useState<DateRange | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);

  // ✅ Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Auto close when both dates selected
  useEffect(() => {
    if (range?.from && range?.to) {
      setTimeout(() => setShowCalendar(false), 300);
    }
  }, [range]);

  const handleSearch = () => {
    if (!location || !range?.from || !range?.to) return;

    const params = new URLSearchParams({
      location,
      checkIn: range.from.toISOString(),
      checkOut: range.to.toISOString(),
      guests: guests.toString(),
    });

    router.push(`/listings/stays?${params.toString()}`);
  };

  const nights =
    range?.from && range?.to
      ? differenceInDays(range.to, range.from)
      : 0;

  return (
    <div className="relative z-20 w-full max-w-5xl bg-white shadow-2xl rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-center gap-3 md:gap-0">

      {/* LOCATION */}
      <div className="flex-1 px-4 w-full">
        <label className="text-xs text-gray-500">Location</label>
        <input
          type="text"
          placeholder="Where are you going?"
          className="w-full outline-none text-sm font-medium text-black placeholder-gray-400"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* DIVIDER */}
      <div className="hidden md:block h-10 w-px bg-gray-200"></div>

      {/* ✅ DATE RANGE */}
      <div className="flex-1 px-4 w-full relative" ref={calendarRef}>
        <label className="text-xs text-gray-500">Check-in / Check-out</label>

        <div
          onClick={() => setShowCalendar(true)}
          className="cursor-pointer text-sm font-medium text-black"
        >
          {range?.from && range?.to ? (
            <>
              {format(range.from, "dd MMM")} → {format(range.to, "dd MMM")}
              <span className="ml-2 text-gray-500 text-xs">
                ({nights} night{nights > 1 && "s"})
              </span>
            </>
          ) : (
            "Select dates"
          )}
        </div>

        {/* ✅ PREMIUM CALENDAR */}
        {showCalendar && (
          <div className="absolute top-14 left-0 z-50 bg-white border border-gray-200 shadow-2xl rounded-2xl p-4">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={setRange}
              numberOfMonths={2}
              showOutsideDays
              disabled={{ before: new Date() }}
              className="text-black"
              modifiersClassNames={{
                selected: "bg-black text-white",
                range_start: "bg-black text-white",
                range_end: "bg-black text-white",
                range_middle: "bg-gray-200 text-black",
              }}
            />
          </div>
        )}
      </div>

      {/* DIVIDER */}
      <div className="hidden md:block h-10 w-px bg-gray-200"></div>

      {/* GUESTS */}
      <div className="flex-1 px-4 w-full">
        <label className="text-xs text-gray-500">Guests</label>
        <select
          className="w-full outline-none text-sm font-medium text-black"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
        >
          {[1,2,3,4,5,6].map(num => (
            <option key={num} value={num}>
              {num} Adult{num > 1 && "s"}
            </option>
          ))}
        </select>
      </div>

      {/* SEARCH BUTTON */}
      <div className="w-full md:w-auto px-2">
        <button
          onClick={handleSearch}
          className="w-full md:w-auto bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium transition"
        >
          Search
        </button>
      </div>

    </div>
  );
}