import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Spelvita – Sok od spelte",
  description: "Prirodni sok od zelenog žita, direktno sa naše farme.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <body className="bg-[color:var(--color-cornsilk)] text-[color:var(--color-dark-olive)] font-sans">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-10">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
