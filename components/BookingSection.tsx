"use client";

import { useState } from "react";
import RoomSelection from "./RoomSelection";

export default function BookingSection({ rooms, basePrice, listingId }: any) {
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

const handleSubmit = async (e: any) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const payload = {
  listing_id: listingId,
  room_name: selectedRoom?.name || "",
  full_name: formData.get("full_name"),
  phone: formData.get("phone"),
  email: formData.get("email"),
  check_in: formData.get("check_in"),
  guests: Number(formData.get("guests")),
  special_request: formData.get("special_request") || "",
};

  const res = await fetch("/api/bookings", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

console.log("API RESPONSE:", data);

if (data.success) {
  alert("Booking request sent!");
} else {
  alert(data.error || "Something went wrong");
}
};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

      {/* LEFT → ROOM SELECTION */}
      <div className="lg:col-span-2">
        <RoomSelection
          rooms={rooms}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
        />
      </div>

      {/* RIGHT → BOOKING FORM */}
      <div>
        <div className="bg-white border rounded-2xl shadow-md p-6 sticky top-28">

          <p className="text-2xl font-bold mb-4">
            ₹{selectedRoom?.price || basePrice}
            <span className="text-sm text-gray-500">
              {" "} / night
            </span>
          </p>

          {/* ✅ SHOW SELECTED ROOM */}
          {selectedRoom && (
            <div className="mb-4 text-sm bg-gray-100 p-3 rounded-lg">
              Selected: <strong>{selectedRoom.name}</strong>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
  name="full_name"
  type="text"
  placeholder="Full Name"
  className="w-full border rounded-lg px-3 py-2 text-sm"
/>

            <input
  name="phone"
  type="tel"
  placeholder="Phone Number"
  className="w-full border rounded-lg px-3 py-2 text-sm"
/>

            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />

            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />

            <input
              type="number"
              placeholder="Guests"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />

            {/* ✅ HIDDEN FIELD */}
            <input
              type="hidden"
              value={selectedRoom?.name || ""}
              name="room_type"
            />

            <button className="w-full bg-black text-white py-3 rounded-xl font-medium">
              Request Booking
            </button>

          </form>

        </div>
      </div>

    </div>
  );
}