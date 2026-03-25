"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const categories = [
  { id: "stays", icon: "bed", label: ["Stays"], href: "/listings/stays" },

  { id: "tours", icon: "travel_explore", label: ["Tour Packages"], href: "/listings/tours" },

  { id: "adventures", icon: "landscape", label: ["Adventure Activities"], href: "/listings/adventures" },

  { id: "chardham", icon: "temple_hindu", label: ["Char Dham"], href: "/listings/char-dham" },

  { id: "helicopter", icon: "helicopter", label: ["Helicopter Services"], href: "/listings/helicopter" },

  { id: "bike", icon: "two_wheeler", label: ["Bike Expedition"], href: "/listings/bike-expedition" },

  { id: "trekking", icon: "hiking", label: ["Trekking & Camps"], href: "/listings/trekking" },

  { id: "yoga", icon: "spa", label: ["Yoga & Meditation"], href: "/listings/yoga" },

  { id: "retreats", icon: "event", label: ["Retreats & Events"], href: "/listings/retreats" },

  { id: "volunteering", icon: "volunteer_activism", label: ["Volunteering"], href: "/listings/volunteering" },

  { id: "services", icon: "concierge", label: ["Services"], href: "/listings/services" },
];

export default function Header() {

  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const dotsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isDown = useRef(false);
const startX = useRef(0);
const scrollLeftPos = useRef(0);

const handleMouseDown = (e: React.MouseEvent) => {
  if (!scrollRef.current) return;
  isDown.current = true;
  startX.current = e.pageX - scrollRef.current.offsetLeft;
  scrollLeftPos.current = scrollRef.current.scrollLeft;
};

const handleMouseLeave = () => {
  isDown.current = false;
};

const handleMouseUp = () => {
  isDown.current = false;
};

const handleMouseMove = (e: React.MouseEvent) => {
  if (!isDown.current || !scrollRef.current) return;
  e.preventDefault();
  const x = e.pageX - scrollRef.current.offsetLeft;
  const walk = (x - startX.current) * 1.5; // speed
  scrollRef.current.scrollLeft = scrollLeftPos.current - walk;
};

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollLeft = () => {
  scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
};

const scrollRight = () => {
  scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
};

 

  /* ================= HEADER ONE ================= */

  const HeaderOne = (
    <div
      className={`absolute top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? "opacity-0 -translate-y-5 pointer-events-none" : "opacity-100"
      }`}
    >

      <div className="w-full bg-transparent">

        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

          <div className="flex items-center flex-shrink-0">
  <Link href="/">
    <Image
      src="/logo.png"
      alt="Travel For Benefits"
      width={120}
      height={40}
    />
  </Link>
</div>

          <div className="flex items-center gap-4">

            <Link
              href="/login"
              className="bg-[#f4b400] text-white px-6 py-2 rounded-full text-sm font-medium"
            >
              Login / Signup
            </Link>

            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="md:hidden p-2"
            >
              <span className="material-symbols-outlined text-3xl">
                menu
              </span>
            </button>

          </div>

        </div>

      </div>

      {/* Desktop Categories */}

      <div className="hidden md:block w-full bg-transparent -mt-4 pb-6">

        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-lg px-6 py-5 border border-white/30">

          <div className="flex items-center justify-between">

            {categories.map((cat) => {

              const isActive = pathname.startsWith(cat.href);

              return (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className={`group flex flex-col items-center gap-1 border-b-2 pb-1 ${
                    isActive
                      ? "border-[#f4b400]"
                      : "border-transparent hover:border-[#f4b400]"
                  }`}
                >

                  <span
                    className={`material-symbols-outlined text-[22px] ${
                      isActive
                        ? "text-[#f4b400]"
                        : "text-slate-600 group-hover:text-[#f4b400]"
                    }`}
                  >
                    {cat.icon}
                  </span>

                  <span className="text-xs font-medium text-center leading-tight">

                    {cat.label.map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}

                  </span>

                </Link>
              );
            })}

          </div>

        </div>

      </div>

    </div>
  );

  /* ================= HEADER TWO ================= */

  const HeaderTwo = (
    <div
      className={`fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b shadow-sm transition-all duration-300 ${
        isHome
  ? scrolled
    ? "opacity-100 translate-y-0"
    : "opacity-0 -translate-y-5 pointer-events-none"
  : "opacity-100 translate-y-0"
      }`}
    >

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <Link href="/">
          <Image
            src="/logo.png"
            alt="Travel For Benefits"
            width={120}
            height={40}
          />
        </Link>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center justify-center flex-1 gap-2">

          {/* Left Arrow */}
<button
  onClick={scrollLeft}
  className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg border border-gray-200 transition flex-shrink-0"
>
  <span className="material-symbols-outlined">chevron_left</span>
</button>

{/* Scrollable Menu */}
<div
  ref={scrollRef}
  onMouseDown={handleMouseDown}
  onMouseLeave={handleMouseLeave}
  onMouseUp={handleMouseUp}
  onMouseMove={handleMouseMove}
  className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing max-w-[800px]"
>
  {categories.map((cat) => {
    const isActive = pathname.startsWith(cat.href);

    return (
      <Link
        key={cat.id}
        href={cat.href}
        className={`flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap transition-all ${
          isActive
            ? "bg-[#f4b400]/10 text-[#f4b400]"
            : "hover:bg-gray-100 text-slate-700"
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">
          {cat.icon}
        </span>

        <span className="text-sm font-medium">
          {cat.label[0]}
        </span>
      </Link>
    );
  })}
</div>

{/* Right Arrow */}
<button
  onClick={scrollRight}
  className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg border border-gray-200 transition flex-shrink-0"
>
  <span className="material-symbols-outlined">chevron_right</span>
</button>
        </div>

        {/* Mobile Horizontal Menu */}

        <div className="flex md:hidden gap-6 overflow-x-auto no-scrollbar">

          {categories.map((cat) => (

            <Link
              key={cat.id}
              href={cat.href}
              className="shrink-0 text-sm font-medium whitespace-nowrap"
            >
              {cat.label[0]}
            </Link>

          ))}

        </div>

        <div className="hidden md:flex items-center flex-shrink-0">

          <Link
            href="/login"
            className="bg-[#f4b400] text-white px-5 py-2 rounded-full text-sm font-medium"
          >
            Login / Signup
          </Link>

        </div>

      </div>

    </div>
  );

  /* ================= MOBILE DRAWER ================= */

  const MobileDrawer = (

    <div
      className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${
        mobileDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={() => setMobileDrawerOpen(false)}
    >

      <div
        className={`absolute left-0 top-0 h-full w-72 bg-white shadow-xl transform transition-transform ${
          mobileDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >

        <div className="p-6 flex justify-between items-center border-b">

          <h3 className="text-lg font-semibold">
            Menu
          </h3>

          <button onClick={() => setMobileDrawerOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>

        </div>

        <div className="flex flex-col p-6 gap-5">

          {categories.map((cat) => (

            <Link
              key={cat.id}
              href={cat.href}
              onClick={() => setMobileDrawerOpen(false)}
              className="text-base font-medium text-slate-700"
            >
              {cat.label.join(" ")}
            </Link>

          ))}

        </div>

      </div>

    </div>

  );

  return (
    <>
      {isHome && HeaderOne}
      {HeaderTwo}
      {MobileDrawer}
    </>
  );
}