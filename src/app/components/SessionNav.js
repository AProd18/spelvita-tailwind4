"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { PersonOutline } from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SessionNav({ closeMobileMenu = () => {} }) {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchUnread() {
      try {
        const res = await fetch("/api/order/unread");
        const data = await res.json();
        setUnreadCount(data.unreadCount);
      } catch (err) {
        console.error("Greska kod fetch notifikacija:", err);
      }
    }

    if (session?.user) {
      fetchUnread();
    }
  }, [session]);

  useEffect(() => {
    if (pathname === "/moje-porudzbine") {
      setUnreadCount(0);
    }
  }, [pathname]);

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
          onClick={closeMobileMenu}
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
              className="block px-4 py-2 hover:bg-[color:var(--color-laurel-green)] hover:text-[color:var(--color-dark-olive)] transition-colors relative"
              onClick={() => {
                setDropdownOpen(false);
                closeMobileMenu();
              }}
            >
              Moje porudžbine
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center text-xs font-bold px-2 py-1 bg-yellow-400 text-black rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>
          </li>

          {session.user.role === "admin" && (
            <li>
              <Link
                href="/admin"
                className="block px-4 py-2 hover:bg-[color:var(--color-laurel-green)] hover:text-[color:var(--color-dark-olive)] transition-colors"
                onClick={() => {
                  setDropdownOpen(false);
                  closeMobileMenu();
                }}
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
                closeMobileMenu();
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
