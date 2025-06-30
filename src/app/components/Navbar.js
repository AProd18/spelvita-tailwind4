import Link from "next/link";
import dynamic from "next/dynamic";
import SessionNav from "./SessionNav";

const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });

export default function Navbar() {
  return (
    <header className="bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)] shadow-md">
      <nav className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center relative">
        <h1 className="text-xl font-bold tracking-wide">
          <Link href="/">Elixirspelte</Link>
        </h1>

        <div className="md:hidden">
          <MobileMenu />
        </div>

        <ul className="hidden md:flex items-center space-x-6 text-xs font-medium uppercase">
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
          <li className="text-[color:var(--color-laurel-green)] select-none">
            |
          </li>
          <SessionNav />
        </ul>
      </nav>
    </header>
  );
}
