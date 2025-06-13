export default function Footer() {
  return (
    <footer className="bg-[color:var(--color-laurel-green)] text-[color:var(--color-cornsilk)] text-center py-6 mt-10">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Spelvita. Sva prava zadržana.
      </p>
    </footer>
  );
}
