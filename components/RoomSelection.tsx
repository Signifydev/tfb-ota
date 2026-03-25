"use client";

import { useState } from "react";
import Image from "next/image";


export default function RoomSelection({
  rooms,
  selectedRoom,
  setSelectedRoom,
}: {
  rooms: any[];
  selectedRoom: any;
  setSelectedRoom: (room: any) => void;
}) {
  

  return (
    <div>

      <h2 className="text-xl font-semibold mb-5">
        Choose your room
      </h2>

      <div className="space-y-5">

        {rooms.map((room) => {
          const isSelected = selectedRoom?.id === room.id;

          return (
            <div
              key={room.id}
              className={`flex flex-col md:flex-row bg-white rounded-2xl border transition overflow-hidden cursor-pointer
                ${isSelected ? "border-black shadow-md" : "hover:shadow-md"}
              `}
              onClick={() => setSelectedRoom(room)}
            >

              {/* IMAGE */}
              <div className="relative w-full md:w-56 h-44">
                <Image
                  src={
                    room.images?.[0] ||
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945"
                  }
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* DETAILS */}
              <div className="flex-1 p-5 flex justify-between">

                <div>
                  <h3 className="font-semibold text-lg">
                    {room.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Max {room.capacity} guests
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    {room.amenities?.join(", ")}
                  </p>

                  {isSelected && (
                    <p className="text-xs text-green-600 mt-2 font-medium">
                      ✓ Selected
                    </p>
                  )}
                </div>

                {/* PRICE */}
                <div className="text-right flex flex-col justify-between">
                  <p className="font-bold text-xl">
                    ₹{room.price}
                    <span className="text-sm text-gray-500">
                      {" "} / night
                    </span>
                  </p>

                  <button
                    className={`mt-3 px-5 py-2 rounded-lg text-sm font-medium transition
                      ${isSelected
                        ? "bg-black text-white"
                        : "border border-black text-black hover:bg-black hover:text-white"
                      }`}
                  >
                    {isSelected ? "Selected" : "Select Room"}
                  </button>
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* ✅ SHOW SELECTED ROOM */}
      {selectedRoom && (
        <div className="mt-6 p-4 border rounded-xl bg-gray-50">
          <p className="text-sm">
            Selected Room:{" "}
            <span className="font-semibold">
              {selectedRoom.name}
            </span>{" "}
            (₹{selectedRoom.price}/night)
          </p>
        </div>
      )}
    </div>
  );
}