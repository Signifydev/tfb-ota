"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  role: string;
};

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { name: "My Bookings", href: "/dashboard/bookings", icon: "flight" },
  { name: "Booking History", href: "/dashboard/history", icon: "history" },
  { name: "Wishlist", href: "/dashboard/wishlist", icon: "favorite" },
  { name: "Profile", href: "/dashboard/profile", icon: "person" },
];

export default function DashboardSidebar({ role }: Props) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      <h2 className="text-xl font-bold mb-10">
        TFB Dashboard
      </h2>

      <nav className="space-y-4">
        {menu.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                active
                  ? "bg-[#f4b400] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <span className="material-symbols-outlined">
                {item.icon}
              </span>

              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}