import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import AuthGuard from "@/components/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar role="customer" />

        <div className="flex-1">
          <DashboardTopbar />

          <main className="p-8">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}