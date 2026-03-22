import { getUserWithRole } from "@/lib/supabase/getUser";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const data = await getUserWithRole();

  if (!data?.user) redirect("/login");
  if (!data.profile || data.profile.role !== "customer") {
  redirect("/");
}


  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Welcome to your dashboard
      </h2>

      <p className="text-gray-600">
        Manage bookings, wishlist and profile here.
      </p>
    </div>
  );
}