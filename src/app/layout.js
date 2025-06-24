import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import HideOnAdminWrapper from "./HideOnAdminWrapper";
import { Providers } from "./providers";

export const metadata = {
  title: "Elixirspelte – Sok od spelte",
  description: "Prirodni sok od zelenog žita, direktno sa naše farme.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <body className="bg-[color:var(--color-cornsilk)] text-[color:var(--color-dark-olive)] font-sans">
        <Providers>
          <HideOnAdminWrapper>{children}</HideOnAdminWrapper>
        </Providers>
      </body>
    </html>
  );
}
