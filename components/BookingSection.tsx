"use client";

import { useState } from "react";
import RoomSelection from "./RoomSelection";

export default function BookingSection({ rooms, price, listingId, selectedRoom }: any) {
  

const handleSubmit = async (e: any) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const payload = {
  listing_id: listingId,
  room_name: selectedRoom?.name || "Not Selected",
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
    <div className="flex flex-col gap-6"> 

      <div className="flex flex-col gap-6">

  

  {/* BOOKING FORM */}
  <div className="bg-white border rounded-2xl shadow-md p-6">

    <p className="text-2xl font-bold mb-4">
      ₹{selectedRoom?.price || price}
      <span className="text-sm text-gray-500"> / night</span>
    </p>

    {selectedRoom && (
  <div className="mb-4 p-3 rounded-lg border bg-green-50">

    <p className="text-sm text-gray-600">Selected Room</p>

    <p className="font-semibold text-green-700">
      {selectedRoom.name}
    </p>

    <p className="text-xs text-gray-500">
      ₹{selectedRoom.price} / night
    </p>

  </div>
)}

{!selectedRoom && (
  <div className="mb-4 text-sm text-red-500">
    Please select a room to continue
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
        name="email"
        type="email"
        placeholder="Email"
        className="w-full border rounded-lg px-3 py-2 text-sm"
      />

      <input
        name="check_in"
        type="date"
        className="w-full border rounded-lg px-3 py-2 text-sm"
      />

      <input
        name="guests"
        type="number"
        placeholder="Guests"
        className="w-full border rounded-lg px-3 py-2 text-sm"
      />

      <input
        type="hidden"
        value={selectedRoom?.name || ""}
        name="room_type"
      />

      <button
  disabled={!selectedRoom}
  className={`w-full py-3 rounded-xl font-medium ${
    selectedRoom
      ? "bg-black text-white"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  {selectedRoom ? "Request Booking" : "Select a Room First"}
</button>

    </form>

  </div>

</div>

    </div>
  );
}