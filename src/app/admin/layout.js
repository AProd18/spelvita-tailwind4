import AdminSidebar from "@/app/admin/components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[color:var(--color-cornsilk)] text-[color:var(--color-dark-olive)]">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-12 overflow-auto">{children}</main>
    </div>
  );
}
