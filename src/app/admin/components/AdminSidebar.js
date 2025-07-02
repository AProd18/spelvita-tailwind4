"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

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
  const [unseenCount, setUnseenCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUnseen = async () => {
      try {
        const res = await fetch("/api/admin/orders/unseen");
        const data = await res.json();
        setUnseenCount(data.unseenCount || 0);
      } catch (err) {
        console.error(
          "Greška prilikom učitavanja broja novih porudžbina:",
          err
        );
      }
    };

    fetchUnseen();
  }, []);

  useEffect(() => {
    if (pathname === "/admin/orders") {
      setUnseenCount(0);
    }
  }, [pathname]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 bg-[color:var(--color-dark-olive)] text-white p-2 rounded-full md:hidden"
        aria-label="Otvori meni"
      >
        <MenuIcon />
      </button>

      <aside
        className={`bg-[color:var(--color-dark-olive)] w-64 h-screen p-8 flex flex-col justify-between
          fixed top-0 left-0 z-50 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 text-white"
          aria-label="Zatvori meni"
        >
          <CloseIcon />
        </button>

        <div>
          <h1 className="text-2xl font-extrabold mb-10 text-[color:var(--color-cornsilk)] select-none">
            Admin Centar
          </h1>

          <div className="mb-8">
            <Link
              href="/"
              className="block px-4 py-3 font-semibold rounded-md text-[color:var(--color-cornsilk)] hover:bg-[color:var(--color-laurel-green)] transition-colors duration-300"
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
                  className={`px-4 py-3 rounded-md transition-colors duration-300 ${
                    isActive
                      ? "bg-[color:var(--color-laurel-green)] text-[color:var(--color-cornsilk)]"
                      : "text-[color:var(--color-cornsilk)] hover:bg-[color:var(--color-laurel-green)]"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2 w-full whitespace-nowrap">
                    <span className="truncate">{label}</span>
                    {href === "/admin/orders" && unseenCount > 0 && (
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                        {unseenCount}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-[color:var(--color-danger)] text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-[color:var(--color-danger-dark)] shadow-md hover:shadow-lg transition-all duration-300"
        >
          Odjavi se
        </button>
      </aside>
    </>
  );
}
