"use client";

import { useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SessionNav from "./SessionNav";

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-[color:var(--color-cornsilk)] focus:outline-none"
      >
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-[color:var(--color-dark-olive)] text-xs font-medium uppercase flex flex-col space-y-4 px-4 py-4 z-50">
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
          <SessionNav closeMobileMenu={() => setMenuOpen(false)} />
        </ul>
      )}
    </>
  );
}
