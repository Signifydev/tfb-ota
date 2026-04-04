"use client";

import { useEffect, useState } from "react";
import { getActivityBySlugClient } from "@/services/listings-client";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ActivityDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [activity, setActivity] = useState<any>(null);
  const [activeSection, setActiveSection] = useState("overview");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActivityBySlugClient(slug);
      setActivity(data);
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "inclusions", "exclusions", "location"];

      for (let id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ LOADING
  if (!activity) {
    return <div className="p-10">Loading activity...</div>;
  }

  return (
    <main className="pt-[120px] pb-16 bg-gray-50">

      {/* 🔥 IMAGE GALLERY (Same as stays) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 px-6 mb-8">

        <div className="relative md:col-span-2 md:row-span-2 h-[460px] rounded-2xl overflow-hidden">
          <Image
            src={activity.image_url || "https://images.unsplash.com/photo-1501785888041-af3ef285b470"}
            alt={activity.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {(activity.gallery || []).slice(0, 4).map((img: string, i: number) => (
          <div key={i} className="relative h-[220px] rounded-2xl overflow-hidden">
            <Image src={img} alt="Activity" fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6">

        {/* 🔥 STICKY NAV */}
        <div className="sticky top-[80px] z-40 bg-white border-b mb-8">
          <div className="flex gap-6 text-sm font-medium overflow-x-auto">

            {["overview", "inclusions", "exclusions", "location"].map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className={`py-4 border-b-2 ${
                  activeSection === sec
                    ? "border-black text-black"
                    : "border-transparent text-gray-500"
                }`}
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </button>
            ))}

          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-2">{activity.title}</h1>

        {/* 🔥 INFO BAR */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-6">

          <span>📍 {activity.location}</span>

          {activity.duration && (
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
              ⏱ {activity.duration}
            </span>
          )}

          {activity.difficulty && (
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
              🔥 {activity.difficulty}
            </span>
          )}

          {activity.group_size && (
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
              👥 {activity.group_size}
            </span>
          )}

        </div>

        {/* PRICE */}
        <div className="mb-8">
          <p className="text-2xl font-bold">
            ₹{activity.selling_price}
            <span className="text-sm text-gray-500"> / person</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 space-y-10">

            {/* OVERVIEW */}
            <div id="overview">
              <h2 className="text-xl font-semibold mb-3">About this activity</h2>
              <p className="text-gray-600 leading-relaxed">
                {activity.description || "Experience an exciting adventure with safety and fun."}
              </p>
            </div>

            {/* INCLUSIONS */}
            {activity.inclusions?.length > 0 && (
              <div id="inclusions">
                <h2 className="text-xl font-semibold mb-3">Inclusions</h2>
                <ul className="space-y-2">
                  {activity.inclusions.map((item: string, i: number) => (
                    <li key={i}>✔ {item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* EXCLUSIONS */}
            {activity.exclusions?.length > 0 && (
              <div id="exclusions">
                <h2 className="text-xl font-semibold mb-3">Exclusions</h2>
                <ul className="space-y-2">
                  {activity.exclusions.map((item: string, i: number) => (
                    <li key={i}>❌ {item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* LOCATION */}
            <div id="location">
              <h2 className="text-xl font-semibold mb-3">Location</h2>
              <p className="text-gray-600 mb-4">{activity.location}</p>

              <div className="bg-white rounded-2xl shadow overflow-hidden">
                <div className="w-full h-[350px]">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    src={`https://www.google.com/maps?q=${activity.location}&output=embed`}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT BOOKING CARD */}
          <div className="lg:col-span-3">
            <div className="sticky top-[120px] bg-white p-6 rounded-2xl shadow">

              <p className="text-2xl font-bold mb-4">
                ₹{activity.selling_price}
              </p>

              <button className="w-full bg-black text-white py-3 rounded-lg">
                Book Now
              </button>

              <p className="text-xs text-gray-500 mt-2 text-center">
                Instant confirmation
              </p>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}