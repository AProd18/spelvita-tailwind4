"use client";

import { useState } from "react";
import Link from "next/link";
import SessionNav from "./SessionNav";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)] shadow-md">
      <nav className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center relative">
        <h1 className="text-xl font-bold tracking-wide">
          <Link href="/">Elixirspelte</Link>
        </h1>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[color:var(--color-cornsilk)] focus:outline-none"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <ul
          className={`flex-col md:flex-row md:flex items-center space-y-4 md:space-y-0 md:space-x-6 text-xs font-medium uppercase absolute md:static top-16 left-0 w-full md:w-auto bg-[color:var(--color-dark-olive)] px-4 md:px-0 py-4 md:py-0 z-50 transition-all duration-300 ease-in-out ${
            menuOpen ? "flex" : "hidden md:flex"
          }`}
        >
          <li>
            <Link
              href="/o-nama"
              className="hover:text-[color:var(--color-laurel-green)] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              O nama
            </Link>
          </li>
          <li>
            <Link
              href="/kontakt"
              className="hover:text-[color:var(--color-laurel-green)] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Kontakt
            </Link>
          </li>
          <li className="text-[color:var(--color-laurel-green)] select-none hidden md:block">
            |
          </li>
          <SessionNav closeMobileMenu={() => setMenuOpen(false)} />
        </ul>
      </nav>
    </header>
  );
}
