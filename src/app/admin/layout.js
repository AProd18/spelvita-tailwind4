"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "📊 Statistika" },
  { href: "/admin/availability", label: "🌾 Dostupnost" },
  { href: "/admin/orders", label: "🧾 Porudžbine" },
  { href: "/admin/users", label: "👤 Korisnici" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[color:var(--color-cornsilk)] text-[color:var(--color-dark-olive)]">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-[color:var(--color-dark-olive)] p-8 flex flex-col">
        <h1 className="text-3xl font-extrabold mb-10 text-[color:var(--color-cornsilk)] select-none">
          Admin Panel
        </h1>

        <nav className="flex flex-col space-y-4 text-lg font-semibold">
          {navItems.map(({ href, label }) => {
            const isActive =
              pathname === href ||
              (href !== "/admin" && pathname?.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-3 rounded-md transition-colors duration-300
                  ${
                    isActive
                      ? "bg-[color:var(--color-laurel-green)] text-[color:var(--color-cornsilk)]"
                      : "text-[color:var(--color-cornsilk)] hover:bg-[color:var(--color-laurel-green)] hover:text-[color:var(--color-cornsilk)]"
                  }
                `}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Optional: Dodaj footer ili logout dugme ovde */}
      </aside>

      {/* Main content area */}
      <main className="flex-1 ml-64 p-12 overflow-auto">{children}</main>
    </div>
  );
}
