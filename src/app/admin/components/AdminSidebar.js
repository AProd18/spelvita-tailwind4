"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin", label: "📊 Statistika" },
  { href: "/admin/availability", label: "🌾 Dostupnost" },
  { href: "/admin/orders", label: "🧾 Porudžbine" },
  { href: "/admin/experiences", label: "📝 Iskustva" },
  { href: "/admin/users", label: "👤 Korisnici" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-[color:var(--color-dark-olive)] p-8 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-extrabold mb-10 text-[color:var(--color-cornsilk)] select-none">
          Admin Centar
        </h1>

        <div className="mb-8">
          <Link
            href="/"
            className="block px-4 py-3 font-semibold rounded-md text-[color:var(--color-cornsilk)] hover:bg-[color:var(--color-laurel-green)] hover:text-[color:var(--color-cornsilk)] transition-colors duration-300"
          >
            🏠 Početna strana
          </Link>
        </div>

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
      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-[color:var(--color-danger)] text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-[color:var(--color-danger-dark)] shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        Odjavi se
      </button>
    </aside>
  );
}
