import { requireAuth } from "@/lib/requireAuth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Only admin allowed
  await requireAuth(["admin"]);

  return <>{children}</>;
}