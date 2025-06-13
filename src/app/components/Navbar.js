"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)] shadow-md">
      <nav className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">
          <Link href="/">Spelvita</Link>
        </h1>
        <ul className="flex space-x-6 text-xs font-medium uppercase">
          <li>
            <Link
              href="/about"
              className="hover:text-[color:var(--color-laurel-green)] transition-colors"
            >
              O nama
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
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
          <li>
            <Link
              href="/login"
              className="hover:text-[color:var(--color-laurel-green)] transition-colors"
            >
              Prijava
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="hover:text-[color:var(--color-laurel-green)] transition-colors"
            >
              Registracija
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
