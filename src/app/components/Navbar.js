"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { PersonOutline } from "@mui/icons-material";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)] shadow-md">
      <nav className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">
          <Link href="/">Elixirspelte</Link>
        </h1>
        <ul className="flex space-x-6 text-xs font-medium uppercase">
          <li className="flex items-center space-x-1">
            <Link
              href="/o-nama"
              className="hover:text-[color:var(--color-laurel-green)] transition-colors"
            >
              <span>O nama</span>
            </Link>
          </li>
          <li className="flex items-center space-x-1">
            <Link
              href="/kontakt"
              className="hover:text-[color:var(--color-laurel-green)] transition-colors flex items-center space-x-1"
            >
              <span>Kontakt</span>
            </Link>
          </li>
          {/* <li className="flex items-center space-x-1">
            <Link
              href="/faq"
              className="hover:text-[color:var(--color-laurel-green)] transition-colors flex items-center space-x-1"
            >
              <span>FAQ</span>
            </Link>
          </li> */}

          {session ? (
            <>
              {session?.user?.role === "admin" && (
                <li>
                  <Link
                    href="/admin/availability"
                    className="hover:text-[color:var(--color-laurel-green)] transition-colors flex items-center space-x-1"
                  >
                    Kontrolni centar
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={() => signOut()}
                  className="hover:text-[color:var(--color-laurel-green)] transition-colors flex items-center space-x-1 uppercase  cursor-pointer"
                >
                  <span>Odjavi se</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="hover:text-[color:var(--color-laurel-green)] transition-colors flex items-center space-x-1"
                >
                  <PersonOutline fontSize="small" />{" "}
                  <span>Prijava / Registracija</span>
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/register"
                  className="hover:text-[color:var(--color-laurel-green)] transition-colors"
                >
                  Registracija
                </Link>
              </li> */}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
