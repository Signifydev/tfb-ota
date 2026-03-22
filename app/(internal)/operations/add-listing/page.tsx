"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AddListingPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("stay");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const { error } = await supabase.from("listings").insert({
      title,
      category,
      price: Number(price),
      status: "draft",
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Listing created!");
      setTitle("");
      setPrice("");
    }

    setLoading(false);
  };

  return (
    <div className="p-10 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">
        Add Listing
      </h1>

      <div className="space-y-4">
        <input
          placeholder="Title"
          className="w-full border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="w-full border p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="stay">Stay</option>
          <option value="tour">Tour Package</option>
          <option value="bike">Bike Expedition</option>
        </select>

        <input
          placeholder="Price"
          type="number"
          className="w-full border p-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-black text-white p-2"
        >
          {loading ? "Saving..." : "Save Listing"}
        </button>
      </div>
    </div>
  );
}