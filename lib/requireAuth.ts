import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireAuth(allowedRoles?: string[]) {
  const supabase = await createClient();

  // ✅ Get logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ❌ Not logged in
  if (!user) {
    redirect("/login");
  }

  // ✅ Get user profile (with role)
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  // ❌ No profile found
  if (error || !profile) {
    redirect("/login");
  }

  // ❌ Role not allowed
  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    switch (profile.role) {
      case "admin":
        redirect("/admin");
      case "operations":
        redirect("/operations");
      case "sales":
        redirect("/sales");
      default:
        redirect("/dashboard");
    }
  }

  // ✅ Return user + profile
  return { user, profile };
}