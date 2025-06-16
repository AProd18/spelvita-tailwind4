"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)] shadow-md">
      <nav className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">
          <Link href="/">Spelvita</Link>
        </h1>
        <ul className="flex space-x-6 text-xs font-medium uppercase">
          <li>
            <Link
              href="/o-nama"
              className="hover:text-[color:var(--color-laurel-green)] transition-colors"
            >
              O nama
            </Link>
          </li>
          <li>
            <Link
              href="/kontakt"
              className="hover:text-[color:var(--color-laurel-green)] transition-colors"
            >
              Kontakt
            </Link>
          </li>
          <li>
            <Link
              href="/faq"
              className="hover:text-[color:var(--color-laurel-green)] transition-colors"
            >
              FAQ
            </Link>
          </li>

          {session ? (
            <>
              {session?.user?.role === "admin" && (
                <li>
                  <Link
                    href="/admin/availability"
                    className="hover:text-[color:var(--color-laurel-green)] transition-colors"
                  >
                    Admin Panel
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={() => signOut()}
                  className="hover:text-[color:var(--color-laurel-green)] transition-colors uppercase"
                >
                  Odjavi se
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="hover:text-[color:var(--color-laurel-green)] transition-colors"
                >
                  Pristup nalogu
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
