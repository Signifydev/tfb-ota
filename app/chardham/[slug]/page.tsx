"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getChardhamBySlug } from "@/services/chardham-client";

export default function ChardhamDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [data, setData] = useState<any>(null);
  const [activeSection, setActiveSection] = useState("overview");

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getChardhamBySlug(slug);
      setData(res);
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "itinerary", "inclusions", "exclusions"];

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

  if (!data) return <div className="p-10">Loading...</div>;

  return (
    <main className="pt-[120px] pb-16 bg-gray-50">

      {/* HERO */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 px-6 mb-8">
        <div className="relative md:col-span-2 md:row-span-2 h-[460px] rounded-2xl overflow-hidden">
          <Image src={data.image_url} alt={data.title} fill className="object-cover" />
        </div>

        {(data.gallery || []).slice(0, 4).map((img: string, i: number) => (
          <div key={i} className="relative h-[220px] rounded-xl overflow-hidden">
            <Image src={img} alt="Gallery" fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* NAV */}
        <div className="sticky top-[80px] bg-white border-b mb-6 flex gap-6 text-sm">
          {["overview", "itinerary", "inclusions", "exclusions"].map((sec) => (
            <button key={sec} onClick={() => scrollToSection(sec)}>
              {sec}
            </button>
          ))}
        </div>

        <h1 className="text-3xl font-bold">{data.title}</h1>

        <p className="text-gray-500 mb-4">
          📍 {data.location} • 🗓 {data.duration}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-7 space-y-10">

            {/* OVERVIEW */}
            <div id="overview">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p>{data.description}</p>
            </div>

            {/* ITINERARY */}
            <div id="itinerary">
              <h2 className="text-xl font-semibold">Itinerary</h2>
              {data.itinerary?.map((day: any) => (
                <div key={day.day}>
                  <p><strong>Day {day.day}:</strong> {day.title}</p>
                </div>
              ))}
            </div>

            {/* INCLUSIONS */}
            <div id="inclusions">
              <h2 className="text-xl font-semibold">Inclusions</h2>
              {data.inclusions?.map((i: string, idx: number) => (
                <p key={idx}>✔ {i}</p>
              ))}
            </div>

            {/* EXCLUSIONS */}
            <div id="exclusions">
              <h2 className="text-xl font-semibold">Exclusions</h2>
              {data.exclusions?.map((i: string, idx: number) => (
                <p key={idx}>❌ {i}</p>
              ))}
            </div>

          </div>

          {/* RIGHT */}
          <div className="lg:col-span-3">
            <div className="sticky top-[120px] bg-white p-6 rounded-xl shadow">
              <p className="text-2xl font-bold mb-4">₹{data.price}</p>
              <button className="w-full bg-black text-white py-3 rounded-lg">
                Book Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}