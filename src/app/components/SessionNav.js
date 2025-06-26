"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { PersonOutline } from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";

export default function SessionNav() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session) {
    return (
      <li>
        <Link
          href="/login"
          className="hover:text-[color:var(--color-laurel-green)] transition-colors flex items-center space-x-1"
        >
          <PersonOutline fontSize="small" />
          <span>Prijava / Registracija</span>
        </Link>
      </li>
    );
  }

  return (
    <li className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center space-x-1 hover:text-[color:var(--color-laurel-green)] transition-colors focus:outline-none cursor-pointer"
      >
        <PersonOutline fontSize="small" />
        <span>{session.user.name || "Profil"}</span>
      </button>

      {dropdownOpen && (
        <ul
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 bg-[color:var(--color-dark-olive)] border border-[color:var(--color-laurel-green)] rounded shadow-lg text-[color:var(--color-cornsilk)] z-50"
        >
          <li>
            <Link
              href="/moje-porudzbine"
              className="block px-4 py-2 hover:bg-[color:var(--color-laurel-green)] hover:text-[color:var(--color-dark-olive)] transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              Moje porudžbine
            </Link>
          </li>

          {session.user.role === "admin" && (
            <li>
              <Link
                href="/admin"
                className="block px-4 py-2 hover:bg-[color:var(--color-laurel-green)] hover:text-[color:var(--color-dark-olive)] transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                Kontrolni centar
              </Link>
            </li>
          )}

          <li>
            <button
              onClick={() => {
                signOut();
                setDropdownOpen(false);
              }}
              className="w-full text-left text-red-500 px-4 py-2 hover:bg-[color:var(--color-laurel-green)] hover:text-[color:var(--color-dark-olive)] transition-colors uppercase cursor-pointer"
            >
              Odjavi se
            </button>
          </li>
        </ul>
      )}
    </li>
  );
}
