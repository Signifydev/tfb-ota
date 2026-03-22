"use client";

import { supabase } from "@/lib/supabase/auth";
import { useRouter } from "next/navigation";

export default function DashboardTopbar() {

  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (

    <div className="flex items-center justify-between bg-white border-b px-8 py-4">

      <h1 className="text-lg font-semibold">
        Customer Dashboard
      </h1>

      <div className="flex items-center gap-4">

        <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full"
        />

        <button
          onClick={logout}
          className="text-sm bg-black text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>

  );
}