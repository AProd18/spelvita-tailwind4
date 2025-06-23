// src/app/admin/layout.js
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)] p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-2 text-sm">
          <Link href="/admin" className="hover:underline">
            📊 Statistika
          </Link>
          <Link href="/admin/availability" className="hover:underline">
            🌾 Dostupnost
          </Link>
          <Link href="/admin/orders" className="hover:underline">
            🧾 Porudžbine
          </Link>
          <Link href="/admin/users" className="hover:underline">
            👤 Korisnici
          </Link>
        </nav>
      </aside>

      {/* Glavni sadržaj */}
      <main className="flex-1 p-10 bg-[color:var(--color-cornsilk)] text-[color:var(--color-dark-olive)]">
        {children}
      </main>
    </div>
  );
}
